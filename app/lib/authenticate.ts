'use server';

import { signOut, signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials';
				default:
					return 'Something went wrong.';
			}
		}
		throw error;
	}
}

export async function log_out() {
	await signOut({ callbackUrl: '/admin/login', redirect: true });
}