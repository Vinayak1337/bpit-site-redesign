import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import AdvancedFooterSolidBlue from '@/components/footer/AdvancedFooterSolidBlue';
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
	title: 'BPIT - Bhagwan Parshuram Institute of Technology',
	description:
		'BPIT - A leading engineering college in Delhi offering excellent education, state-of-the-art facilities, and outstanding placement opportunities.',
	icons: {
		icon: '/favicon.ico'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
				<Header />
				{children}
				<AdvancedFooterSolidBlue />

				<EnquiryPopup />
			</body>
		</html>
	);
}
