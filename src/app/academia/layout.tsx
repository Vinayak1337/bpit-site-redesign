import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Academia - BPIT',
	description: 'Academic programs and courses offered at Bhagwan Parshuram Institute of Technology',
	keywords: [
		'BPIT academia',
		'academic programs',
		'engineering courses',
		'BTech programs',
		'curriculum',
		'faculty',
		'departments',
		'academic excellence'
	]
};

export default function AcademiaLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
