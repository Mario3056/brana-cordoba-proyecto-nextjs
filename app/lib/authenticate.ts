'use server';

import { signOut, signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
	prevState: any, // fix this type later
	formData: FormData,
) {
	// console.log(">>>>>>>>>>>", formData, "<<<<<<<<<<<<<");
	// console.log(">>>>>>>>>>>", Object.fromEntries(formData), "<<<<<<<<<<<<<");
	// formData = Object.fromEntries(formData);
	// formData["redirectTo"] = "/admin/productos";
	// console.log(">>>>>>>>>>> New formData =", formData, "<<<<<<<<<<<<<");

	try {
		await signIn('credentials', formData);
		return { message: "Inicio de sesión exitoso" };
	} catch (error) {
		throw error;

		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					console.log(error);
					return { error: '(CredentialsSignin) Error durante inicio de sesión' }
				default:
					console.log(error);
					return { error: "(AuthError) Error durante inicio de sesión" };
			}
		} else {
			console.log(error);
			return { error: "(otro) Error durante inicio de sesión" };
		}
	}
}

export async function log_out() {
	await signOut({ redirectTo: '/admin/login', redirect: true });
}