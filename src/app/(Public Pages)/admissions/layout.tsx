import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Admissions - Bhagwan Parshuram Institute of Technology',
	description:
		'Join BPIT to pursue excellence in engineering and management. Explore our programs, admission process, and scholarship opportunities.'
};

export default function AdmissionsLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return children;
}
