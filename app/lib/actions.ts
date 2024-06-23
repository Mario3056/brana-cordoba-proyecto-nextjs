'use server';

import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { AdminUser, Product, ProductEditFormState, ProductFormState } from '@/app/lib/types.d';
import type { PaymentInformation } from '@/app/lib/types.d';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function storePayment(paymentInfo: PaymentInformation) {
	try {
		const paymentUploadInfo = await sql`INSERT INTO tienda.mercadopago_records (paymentId, amount, status, timestamp) VALUES (
			${paymentInfo.id},
			${paymentInfo.amount * 100},
			${paymentInfo.status},
			to_timestamp(${paymentInfo.timestamp} / 1000.0)
		)`;
	} catch (error) {
		console.error('Failed to store payment information:', error);
		throw new Error('Failed to store payment information');
	}
}

export async function deleteProduct(id: string) {
	try {
		await sql`CALL tienda.DeleteProduct(${id})`;
		revalidatePath('/admin/productos');
		return { message: 'Successfully deleted product with ID ' + id };
	} catch (error) {
		console.error('Failed to delete product with ID ' + id + ':', error);
		return { message: 'Failed to delete product with ID ' + id, error: error };
	}
}

// this needs another parameter for the current pathname, since this will be called from two different places
// bind this to the pathname where it will be used *before* setting it as a form action
export async function restoreProduct(pathname: string, id: string) {
	try {
		await sql`CALL tienda.RestoreProduct(${id})`;
		revalidatePath(pathname);
		return { message: 'Successfully restored product with ID ' + id };
	} catch (error) {
		console.error('Failed to restore product with ID ' + id + ':', error);
		return { message: 'Failed to restore product with ID ' + id, error: error };
	}
}

export async function definitivelyDeleteProduct(id: string) {
	try {
		const deletionInfo = await sql`DELETE FROM tienda.deleted_products WHERE id = ${id}`;
		revalidatePath("/admin/productos_eliminados");
		return { message: 'Successfully deleted product with ID ' + id };
	} catch (error) {
		console.error('Failed to delete product with ID ' + id + ':', error);
		return { message: 'Failed to delete product with ID ' + id, error: error};
	}
}

function extractFormData(fd: FormData) {
	return {
		id: fd.get('id'),
		name: fd.get('name'),
		description: fd.get('description'),
		category: fd.get('category'),
		rating: fd.get('rating'),
		price: fd.get('price'),
		created_at: fd.get('created_at'),
		modified_at: fd.get('modified_at'),
		image: fd.get('image')
	}
}

const validFile = (file: File) => {
	return file?.size != 0 &&
		file?.name != 'undefined' &&
		file?.type != 'application/octet-stream';
}

const CreateProductSchema = z.object({
	id: z.string(),

	name: z.string({
		invalid_type_error: 'Please enter a name.',
	}).min(1, "Name must have at least 1 letter"),
	description: z.string({
		invalid_type_error: 'Please enter a description.',
	}).min(1, "Description must have at least 1 letter"),
	category: z.string({
		invalid_type_error: 'Please enter a category.',
	}).min(1, "Category must have at least 1 letter"),

	rating: z.coerce.number({
		invalid_type_error: "The product's rating must be a real number.",
	}),

	price: z.coerce
		.number()
		.gt(0, { message: 'Please enter an amount greater than $0.' })
		.transform((price) => price * 100),

	created_at: z.string(), // string?
	modified_at: z.string(), // string?

	image: z.any()
		.refine((file) => validFile(file), "Provide an image for the product. Valid formats are .jpg, .jpeg, .png, .avif, and .webp")
		.refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
	// .refine((file) => !validFile(file) || ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .jpeg, .png, .avif, and .webp formats are supported.")
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/avif", "image/webp"];

const EditProductSchema = z.object({
	id: z.string(),
	name: z.string({
		invalid_type_error: 'Please enter a name.',
	}).min(1, "Name must have at least 1 letter"),
	description: z.string({
		invalid_type_error: 'Please enter a description.',
	}).min(1, "Description must have at least 1 letter"),
	category: z.string({
		invalid_type_error: 'Please enter a category.',
	}).min(1, "Category must have at least 1 letter"),

	rating: z.coerce.number({
		invalid_type_error: "The product's rating must be a real number.",
	}),

	price: z.coerce
		.number()
		.gt(0, { message: 'Please enter an amount greater than $0.' })
		.transform((price) => price * 100),

	created_at: z.string(), // string?
	modified_at: z.string(), // string?

	image: z.object({ size: z.literal(0), name: z.literal('undefined'), type: z.literal('application/octet-stream'), lastModified: z.number() }).or(z.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			"Only .jpg, .jpeg, .png, .avif, and .webp formats are supported.")
	)
});

const SchemaForCreation = CreateProductSchema.omit({ id: true, created_at: true, modified_at: true });
const SchemaForEdition = EditProductSchema.omit({ created_at: true, modified_at: true });

export async function createProduct(productFormState: ProductFormState, fd: FormData) {
	console.log("~~~~~~~~~~~~~~");
	console.log("create: ");
	console.log(fd);
	console.log(fd.get("image"));
	console.log("~~~~~~~~~~~~~~");

	const fields = SchemaForCreation.safeParse(extractFormData(fd));
	console.log(fields);

	if (!fields.success) {
		console.log(fields.error);
		console.log(fields.error.flatten().fieldErrors);
		return {
			errors: fields.error.flatten().fieldErrors,
			message: 'Missing fields. Failed to create product.',
		};
	}

	const uploadData = await uploadToCloudinary(fields.data.image);
	const uploadedURL = await uploadData;
	console.log(uploadedURL);

	console.log(`INSERT INTO tienda.catalogo (name, description, category, rating, price, image) VALUES ('${fields.data.name}', '${fields.data.description}', '${fields.data.category}', ${fields.data.rating}, ${fields.data.price}, '${uploadedURL}')`);

	try {
		const createInfo = await sql`INSERT INTO tienda.catalogo (name, description, category, rating, price, image) VALUES (${fields.data.name}, ${fields.data.description}, ${fields.data.category}, ${fields.data.rating}, ${fields.data.price}, ${uploadedURL})`;
		// return { message: 'Successfully created product'};
	} catch (error) {
		console.error('Failed to create product: ', error);
		// return { message: 'Failed to create product', error: error};
	}

	revalidatePath('/admin/productos');
	redirect('/admin/productos');
}

const CommentFormSchema = z.object({
	id: z.string(),
	related_product_id: z.string(),
	name: z.string({
		invalid_type_error: 'Por favor ingrese un nombre.',
	}).min(1, "El nombre debe tener al menos 1 letra.").max(30, "El nombre no debe superar las 30 letras."),
	rating: z.coerce.number({
		invalid_type_error: "La puntuación debe ser un número real.",
	}),
	content: z.string({
		invalid_type_error: 'Por favor ingrese un comentario.',
	}).min(1, "El comentario debe tener al menos 1 letra.").max(120, "El comentario no debe superar las 120 letras."),
});

const CreateComment = CommentFormSchema.omit({ id: true });

export type State = {
	errors?: {
		related_product_id?: string[];
		name?: string[];
		rating?: string[];
		content?: string[];
	};
	message?: string | null;
};

export async function createComment(prevState: State, formData: FormData) {
	const validatedFields = CreateComment.safeParse({
		related_product_id: formData.get('related_product_id'),
		name: formData.get('name'),
		rating: formData.get('rating'),
		content: formData.get('content'),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Comment.',
		};
	}

	try {
		await sql`INSERT INTO tienda.comments (related_product_id, name, rating, content) VALUES (${validatedFields.data.related_product_id}, ${validatedFields.data.name}, ${validatedFields.data.rating}, ${validatedFields.data.content})`;
		revalidatePath('/producto/' + validatedFields.data.related_product_id);
		
		return { 
			message: 'Successfully created comment'
		};
	} catch (error) {
		return{
			message: 'Failed to create comment',
		};
	}
}

export async function editProduct(product: Product, productEditFormState: ProductEditFormState, fd: FormData) {
	const fields = SchemaForEdition.safeParse(extractFormData(fd));
	console.log(fields);

	if (!fields.success) {
		console.log(fields.error);
		console.log(fields.error.flatten().fieldErrors);

		return {
			errors: fields.error.flatten().fieldErrors,
			message: 'Missing fields. Failed to create product.',
		};
	}

	let uploadedURL: string;
	if (fields.data.image.size == 0) {
		// keep the original image
		uploadedURL = product.image;
	} else {
		const uploadData = await uploadToCloudinary(fields.data.image);
		uploadedURL = await uploadData;
		console.log(uploadedURL);
	}

	console.log(`UPDATE tienda.catalogo SET name = '${fields.data.name}', description = '${fields.data.description}', category = '${fields.data.category}', rating = ${fields.data.rating}, price = ${fields.data.price}, image = ${uploadedURL}, modified_at = NOW() WHERE id = ${fields.data.id}`);

	try {
		// remember to update the modified_at timestamp to NOW()
		// e.g. UPDATE tienda.catalogo SET modified_at = NOW() WHERE id = 33595;
		const editInfo = await sql`UPDATE tienda.catalogo SET name = ${fields.data.name}, description = ${fields.data.description}, category = ${fields.data.category}, rating = ${fields.data.rating}, price = ${fields.data.price}, image = ${uploadedURL}, modified_at = NOW() WHERE id = ${fields.data.id}`;
		// console.log(editInfo) // [DEBUG]
		// assert(editInfo.rowCount == 1)

		/* return { message: 'Successfully edited product with ID ' + fd.get('id') }; */
	} catch (error) {
		console.error('Failed to edit product with ID ' + fields.data.id + ':', error);
		/* return { message: 'Failed to edit product with ID ' + fd.get('id'), error: error}; */
	}

	revalidatePath('/admin/productos');
	redirect('/admin/productos');
}

// call with
// const imageBlob = formData.get("image");
// const URL_promise = await uploadToCloudinary(imageBlob);
// const uploadedURL = await URL_promise;

async function uploadToCloudinary(imageBlob: File) {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_KEY,
		api_secret: process.env.CLOUDINARY_SECRET,
		secure: true,
	});

	// console.log(imageBlob);
	// File {
	//    size: 1238357,
	//    type: 'image/jpeg',
	//    name: 'Azalea.jpg',
	//    lastModified: 1715875427808
	// }

	const publicId = Date.now();
	const cloudExtension = ".jpg";
	const imageName = publicId + "." + imageBlob.type.split("/")[1];

	// https://gist.github.com/colbyfayock/f0778baf2684d49fdaace5ee37e70138
	const arrayBuffer = await imageBlob.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const dataUri = `data:${imageBlob.type};base64,${buffer.toString('base64')}`;

	const x = await cloudinary.uploader.upload(dataUri, {
		// https://cloudinary.com/documentation/image_upload_api_reference
		public_id: publicId.toString(),
		folder: "products",
		unique_filename: true,
		resource_type: "image",
	}, (err, image) => {
		// this callback function is called after the upload is done or some error has been returned

		if (err) {
			console.log(err);
		}
	});

	return x.secure_url;
}