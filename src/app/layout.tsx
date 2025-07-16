import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer/BPITFooter';
import EnquiryPopup from '@/components/pop-up/enquiry-popup';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'BPIT - Development Site',
	description:
		'BPIT development site - not for public use. This is a redesign project.',
	keywords: [
		'BPIT',
		'Bhagwan Parshuram Institute of Technology',
		'engineering college Delhi',
		'NBA accredited college',
		'BTech programs',
		'engineering education',
		'placement opportunities',
		'technical education',
		'GGSIPU affiliated',
		'Rohini engineering college',
		'computer science engineering',
		'mechanical engineering',
		'electrical engineering',
		'electronics engineering',
		'civil engineering'
	],
	authors: [{ name: 'BPIT' }],
	creator: 'BPIT - Bhagwan Parshuram Institute of Technology',
	publisher: 'BPIT',
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false
		}
	},
	formatDetection: {
		telephone: false,
		email: false,
		address: false
	},
	icons: {
		icon: [
			{ url: '/favicon.ico?v=2' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
		],
		apple: '/apple-touch-icon.png',
		shortcut: '/favicon-16x16.png'
	},
	manifest: '/site.webmanifest',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		title: 'BPIT - Development Site',
		description: 'BPIT development site - not for public use.',
		siteName: 'BPIT Dev'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'BPIT - Development Site',
		description: 'BPIT development site - not for public use.'
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
		title: 'BPIT'
	},
	applicationName: 'BPIT Dev'
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	themeColor: '#1e3a8a'
};

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: 'BPIT Development Site',
	description: 'Development version - not for public use'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData)
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
				<Header />
				{children}
				<Footer />
				<EnquiryPopup />
			</body>
		</html>
	);
}
