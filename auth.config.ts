import type { NextAuthConfig } from 'next-auth';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const authConfig = {
	pages: {
		signIn: '/admin/login',
	},

	callbacks: {
		authorized({ auth, request }) {
			const nextUrl: URL = request.nextUrl;
			const isLoggedIn = !!auth?.user;
			const isOnAdminPage = nextUrl.pathname.startsWith('/admin') && (nextUrl.pathname != "/admin/login");
			if (isOnAdminPage) {

				// Let the user through to the page they want
				if (isLoggedIn) {
					// console.log("Admin visiting:", nextUrl.pathname);
					return true;
				}

				return false; // Redirect unauthenticated users to login page
			} else if (!isOnAdminPage && isLoggedIn) {
				// Send the authenticated user to the admin-side of the site
				return NextResponse.redirect(new URL("/admin/productos", nextUrl));
			}
			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
	trustHost: true,
} satisfies NextAuthConfig;