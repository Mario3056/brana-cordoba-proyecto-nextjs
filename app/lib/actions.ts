'use server';

import { z } from 'zod';
import {v2 as cloudinary} from 'cloudinary';

/*
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/avif", "image/webp"];

const productSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .avif, and .webp formats are supported."
    )
})
*/

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
	console.log("~~~~~~~~~~~~~~");
	console.log("edit");
	console.log(fd);
	console.log("~~~~~~~~~~~~~~");
	
	// validate
	// sanitize
	// insert
	// revalidate + redirect
}

/*
async function cloudinaryForm(formData: FormData) {
	const imageBlob = formData.get("image");
	
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
		// asset_folder: "products", // doesn't seem to work?
		unique_filename: true,
		resource_type: "image",
		format: cloudExtension
	}, (err, image) => {
		// error handling
		// this callback function is called after the upload is done or some error has been returned
		
		if (!err) {
			console.log("~~~~~~~~~~~~~~~");
			console.log("Success?");
			console.log(image);
			console.log("To DB: ", image.secure_url);
			console.log("~~~~~~~~~~~~~~~");
		} else {
			console.log(err);
		}
	});

}
*/