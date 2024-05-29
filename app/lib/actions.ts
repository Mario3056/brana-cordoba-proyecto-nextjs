'use server';

import { z } from 'zod';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { AdminUser, Product, ProductFormState } from '@/app/lib/types.d';

import pg from 'pg'
const { Client } = pg;

export async function deleteProduct(id: string) {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect()
		const deletionInfo = await client.query(`DELETE FROM tienda.catalogo WHERE id = ${id}`);
		await client.end();
		
		// assert(deletionInfo.rowcount == 1);
		
		revalidatePath('/admin/productos');
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

const validFile = (file) => {
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
		.transform((price) => price*100),
		
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
	}).min(1, { message: (v) => "Name must have at least 1 character" }),
	description: z.string({
		invalid_type_error: 'Please enter a description.',
	}).min(1),
	category: z.string({
		invalid_type_error: 'Please enter a category.',
	}).min(1),
	
	rating: z.coerce.number({
		invalid_type_error: "The product's rating must be a real number.",
	}),
	
	price: z.coerce
		.number()
		.gt(0, { message: 'Please enter an amount greater than $0.' })
		.transform((price) => price*100),
		
	created_at: z.string(), // string?
	modified_at: z.string(), // string?
		
	image: z.object({size: z.literal(0), name: z.literal('undefined'), type: z.literal('application/octet-stream'), lastModified: z.number()}).or(z.object()
		.refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
				"Only .jpg, .jpeg, .png, .avif, and .webp formats are supported.")
		)
});

const SchemaForCreation = CreateProductSchema.omit({id: true, created_at: true, modified_at: true});
const SchemaForEdition = EditProductSchema.omit({id: true, created_at: true, modified_at: true});

export async function createProduct(prevState: ProductFormState, fd: FormData) {
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
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect();
		const createInfo = await client.query(`INSERT INTO tienda.catalogo (name, description, category, rating, price, image) VALUES ('${fields.data.name}', '${fields.data.description}', '${fields.data.category}', ${fields.data.rating}, ${fields.data.price}, '${uploadedURL}')`);
		await client.end();
		
		// return { message: 'Successfully created product'};
	} catch (error) {
		console.error('Failed to create product: ', error);
		// return { message: 'Failed to create product', error: error};
	}
	
	revalidatePath('/admin/productos');
	redirect('/admin/productos');
}

export async function editProduct(product: Product, prevState: ProductFormState, fd: FormData) {
	console.log("~~~~~~~~~~~~~~");
	console.log("edit");
	console.log(fd);
	console.log(fd.get('image'));
	console.log(fd.get('id')); // testing the hidden field in the form
	console.log("~~~~~~~~~~~~~~");
	
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
	
	console.log(`UPDATE tienda.catalogo SET name = '${fields.data.name}', description = '${fields.data.description}', category = '${fields.data.category}', rating = ${fields.data.rating}, price = ${fields.data.price}, image = ${uploadedURL}, modified_at = NOW() WHERE id = ${fd.get('id')}`);
	
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect();
		
		// remember to update the modified_at timestamp to NOW()
		// e.g. UPDATE tienda.catalogo SET modified_at = NOW() WHERE id = 33595;
		const editInfo = await client.query(`UPDATE tienda.catalogo SET name = '${fields.data.name}', description = '${fields.data.description}', category = '${fields.data.category}', rating = ${fields.data.rating}, price = ${fields.data.price}, image = '${uploadedURL}', modified_at = NOW() WHERE id = ${fd.get('id')}`);
		// console.log(editInfo) // [DEBUG]
		// assert(editInfo.rowCount == 1)
		
		await client.end();
		
		/* return { message: 'Successfully edited product with ID ' + fd.get('id') }; */
	} catch (error) {
		console.error('Failed to edit product with ID ' + fd.get('id') + ':', error);
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
	// does this have to be called every time or once per run?
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_KEY,
		api_secret: process.env.CLOUDINARY_SECRET,
		secure: true,
	});
	
	console.log(imageBlob);
	// File {
	//    size: 1238357,
	//    type: 'image/jpeg',
	//    name: 'Azalea.jpg',
	//    lastModified: 1715875427808
	// }

	const publicId = Date.now();
	const cloudExtension = ".jpg";
	const imageName = publicId + "." + imageBlob.type.split("/")[1];
	console.log(imageName);
	
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
		
		if (!err) {
			// console.log("~~~~~~~~~~~~~~~");
			// console.log("Success?");
			// console.log(image);
			// console.log("To DB: ", image.secure_url);
			// return image.secure_url;
			// console.log("~~~~~~~~~~~~~~~");
		} else {
			console.log(err);
			// return "/products/placeholder.png";
		}
	});
	
	// console.log(">>>>>>>>>>>>", x, "<<<<<<<<<<<<<");
	return x.secure_url;
}