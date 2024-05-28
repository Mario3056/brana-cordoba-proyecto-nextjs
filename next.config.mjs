/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
	  // https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/mtdfvxb6fc5wql8opygl.jpg
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
