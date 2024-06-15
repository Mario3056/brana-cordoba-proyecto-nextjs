import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/admin/login',
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			// console.log("\n>>>>>>>>>>>>", nextUrl ,"<<<<<<<<<<<<<\n");
			const isLoggedIn = !!auth?.user;
			const isOnAdminPage = nextUrl.pathname.startsWith('/admin') && (nextUrl.pathname != "/admin/login");
			if (isOnAdminPage) {
				if (isLoggedIn) { return true; }

				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {				
				return Response.redirect(new URL("/admin/productos", nextUrl)); // return to this when more paths are added for the admin
			}
			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
	trustHost: true,
} satisfies NextAuthConfig;