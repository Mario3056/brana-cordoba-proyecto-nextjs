/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// example image pattern
		// https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/mtdfvxb6fc5wql8opygl.jpg
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	
		minimumCacheTTL: 86400,
	},

	// Vercel needs this to read the environment variables.
	// They also need to be set on the vercel dashboard.
	env: {
		AUTH_SECRET: process.env.AUTH_SECRET,
		CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
		CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
		CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET
	}
	
	// output: 'standalone',
};

export default nextConfig;
