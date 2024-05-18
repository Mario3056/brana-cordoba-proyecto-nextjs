import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ['/((?!api|_next/static|products|_next/image|.*\\.png$).*)'],
	// https://stackoverflow.com/questions/76286726/nextjs-imageerror-unable-to-optimize-image-and-unable-to-fallback-to-upstream-i
};