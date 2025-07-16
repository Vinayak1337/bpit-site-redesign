import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
			}
		]
	},
	// Turbopack configuration (now stable)
	turbopack: {
		// Turbopack is now stable, no need for experimental options
	}
};

export default nextConfig;
