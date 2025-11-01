import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com'
			},
			{
				protocol: 'https',
				hostname: 'logo.clearbit.com'
			},
			{
				protocol: 'https',
				hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com'
			},
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com'
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com'
			}
		]
	}
};

export default nextConfig;
