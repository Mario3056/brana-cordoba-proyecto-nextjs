'use server';

import { z } from 'zod';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import pg from 'pg'
const { Client } = pg;
import type { AdminUser, Product } from '@/app/lib/types';

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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/avif", "image/webp"];

const ProductSchema = z.object({
	id: z.string(),
	
	name: z.string({
		invalid_type_error: 'Please enter a name.',
	}).min(1),
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
		.gt(0, { message: 'Please enter an amount greater than $0.' }),
		
	image: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
				"Only .jpg, .jpeg, .png, .avif, and .webp formats are supported.")
});

function extractFormData(fd: FormData) {
	return {
		name: fd.get('name'),
		description: fd.get('description'),
		category: fd.get('category'),
		rating: fd.get('rating'),
		price: fd.get('price'),
		image: fd.get('image')
	}
}

const FormProductSchema = ProductSchema.omit({id: true, created_at: true, modified_at: true});

export async function createProduct(prevState: State, fd: FormData) {
	console.log("~~~~~~~~~~~~~~");
	console.log("create: ");
	console.log(fd);
	console.log(fd.get("image"));
	console.log("~~~~~~~~~~~~~~");
	
	const fields = FormProductSchema.safeParse(extractFormData(fd));
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

export async function editProduct(prevState: State, fd: FormData) {
	// how to ensure the image received is new? Compare hashes?
	// If the image isn't changed, there's no need to send it back
	
	console.log("~~~~~~~~~~~~~~");
	console.log("edit");
	console.log(fd);
	console.log("~~~~~~~~~~~~~~");
	
	const fields = FormProductSchema.safeParse(extractFormData(fd));
	
	if (!fields.success) {
		return {
			errors: fields.error.flatten().fieldErrors,
			message: 'Missing fields. Failed to create product.',
		};
	}
	
	// try {
		// const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		// await client.connect();
		// const editInfo = await client.query(`UPDATE tienda.catalogo SET ... WHERE id = ${id}`);
		// console.log(editInfo) // [DEBUG]
		// // remember to update the modified_at timestamp to NOW()
		// // e.g. UPDATE tienda.catalogo SET modified_at = NOW() WHERE id = 33595;
		// await client.end();
		
		// /* return { message: 'Successfully edited product with ID ' + id }; */
	// } catch (error) {
		// console.error('Failed to edit product with ID ' + id + ':', error);
		// /* return { message: 'Failed to edit product with ID ' + id, error: error}; */
	// }
	
	// revalidatePath('/admin/productos');
	// redirect('/admin/productos');
}

// call with
// const imageBlob = formData.get("image");
// const uploadedURL: string = uploadToCloudinary(imageBlob);
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
		public_id: publicId,
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