'use server';

import { signOut, signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
	prevState: any, // fix this type later
	formData: FormData,
) {
	try {
		await signIn('credentials', formData);
		return { message: "Inicio de sesión exitoso" };
	} catch (error) {
		console.log(error);
	
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					// return 'Invalid credentials';
				default:
					// return 'Something went wrong.';
			}
		}
		
		// throw error;
		console.log(error);
		return { error: "Error durante inicio de sesión" };
	}
}

export async function log_out() {
	await signOut({ redirectTo: '/admin/login', redirect: true });
}