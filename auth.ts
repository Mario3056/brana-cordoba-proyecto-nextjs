import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import { getUser } from './app/lib/queries';
import type { AdminUser } from './app/lib/types';
import bcrypt from 'bcryptjs';

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				// nextJS introduces hidden form parameters that makes zod's validation fail.
				// Remove them to let safeParse succeed
				const newCredentials = Object.create(null);
				newCredentials["email"] = credentials.email;
				newCredentials["password"] = credentials.password;
				// console.log(newCredentials);

				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(1) })
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await getUser(email); // local queries will be harder to use with this
													   // https://github.com/vercel/next.js/discussions/35517
					if (!user) { return null; }

					const validPassword = await bcrypt.compare(password, user.password);
					if (validPassword) { return user; }
				}

				console.log("Invalid credentials");
				return null;
			},
		})
	],
});