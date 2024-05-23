'use server';

import { z } from 'zod';

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