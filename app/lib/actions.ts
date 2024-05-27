'use server';

import { z } from 'zod';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/*
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/avif", "image/webp"];

const productSchema = z.object({
	// ...
	image: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			"Only .jpg, .jpeg, .png, .avif, and .webp formats are supported."
		)
})
*/

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

export async function createProduct(prevState: State, fd: FormData) {
	console.log("~~~~~~~~~~~~~~");
	console.log("create: ");
	console.log(fd);
	console.log("~~~~~~~~~~~~~~");
	
	// validate
	// sanitize
	// insert
	// revalidate + redirect
}

export async function editProduct(prevState: State, fd: FormData) {
	// how to ensure the image received is new? Compare hashes?
	// Even better: if the image isn't changed, there's no need to send it back
	
	console.log("~~~~~~~~~~~~~~");
	console.log("edit");
	console.log(fd);
	console.log("~~~~~~~~~~~~~~");
	
	// validate
	// sanitize
	
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect();
		const editInfo = await client.query(`UPDATE tienda.catalogo SET ... WHERE id = ${id}`);
		console.log(editInfo) // [DEBUG]
		// remember to update the modified_at timestamp to NOW()
		// e.g. UPDATE tienda.catalogo SET modified_at = NOW() WHERE id = 33595;
		await client.end();
		
		revalidatePath('/admin/productos');
		redirect('/admin/productos');
		return { message: 'Successfully edited product with ID ' + id };
	} catch (error) {
		console.error('Failed to edit product with ID ' + id + ':', error);
		return { message: 'Failed to edit product with ID ' + id, error: error};
	}
}

// call with
// const imageBlob = formData.get("image");
// const uploadedURL: string = uploadToCloudinary(imageBlob);
async function uploadToCloudinary(imageBlob: File) {
	
	console.log(imageBlob);
	// File {
	//    size: 1238357,
	//    type: 'image/jpeg',
	//    name: 'Azalea.jpg',
	//    lastModified: 1715875427808
	// }

	const publicId = Date.now();
	const cloudExtension = ".jpg";
	// const imageName = publicId + "." + image.type.split("/")[1];
	const imageName = publicId + cloudExtension;
	console.log(imageName);
	
	// https://gist.github.com/colbyfayock/f0778baf2684d49fdaace5ee37e70138
	const arrayBuffer = await imageBlob.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const dataUri = `data:${imageBlob.type};base64,${buffer.toString('base64')}`;
	
	cloudinary.uploader.upload(dataUri, {
		// https://cloudinary.com/documentation/image_upload_api_reference
		public_id: publicId,
		folder: "products",
		unique_filename: true,
		resource_type: "image",
		format: cloudExtension
	}, (err, image) => {
		// this callback function is called after the upload is done or some error has been returned
		
		if (!err) {
			console.log("~~~~~~~~~~~~~~~");
			console.log("Success?");
			console.log(image);
			console.log("To DB: ", image.secure_url);
			return image.secure_url;
			console.log("~~~~~~~~~~~~~~~");
		} else {
			console.log(err);
			return "/products/placeholder.png";
		}
	});

}