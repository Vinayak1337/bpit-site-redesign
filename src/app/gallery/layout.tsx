import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Photo & Video Gallery - BPIT',
	description:
		'Explore BPIT\'s comprehensive photo and video gallery showcasing campus life, academic events, cultural celebrations, technical competitions, sports activities, and memorable moments that define the BPIT experience.',
	keywords: [
		'BPIT gallery',
		'photo gallery',
		'video gallery',
		'campus life',
		'academic events',
		'cultural fest',
		'technical events',
		'sports events',
		'student activities',
		'BPIT memories',
		'engineering college gallery',
		'Delhi engineering college photos',
		'TECHNOVA',
		'convocation',
		'campus tour'
	],
	openGraph: {
		title: 'Photo & Video Gallery - BPIT',
		description:
			'Discover the vibrant campus life at BPIT through our comprehensive gallery featuring academic achievements, cultural celebrations, and memorable moments.',
		type: 'website',
		images: [
			{
				url: '/api/placeholder/1200/630',
				width: 1200,
				height: 630,
				alt: 'BPIT Gallery - Campus Life and Events'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Photo & Video Gallery - BPIT',
		description:
			'Explore the vibrant campus life, academic achievements, and cultural celebrations at BPIT through our comprehensive gallery.'
	}
};

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'ImageGallery',
	name: 'BPIT Photo & Video Gallery',
	description:
		'Comprehensive gallery showcasing campus life, academic events, cultural celebrations, and memorable moments at Bhagwan Parshuram Institute of Technology',
	publisher: {
		'@type': 'Organization',
		name: 'Bhagwan Parshuram Institute of Technology',
		url: 'https://bpitindia.com'
	},
	mainEntity: {
		'@type': 'WebSite',
		name: 'BPIT Official Website',
		url: 'https://bpitindia.com'
	}
};

export default function GalleryLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData)
				}}
			/>
			{children}
		</>
	);
}