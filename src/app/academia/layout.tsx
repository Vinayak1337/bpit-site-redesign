import React from 'react';
import type { Metadata } from 'next';
import AcademiaHero from '@/app/academia/components/AcademiaHero';
import AcademiaSidebar from '@/app/academia/components/AcademiaSidebar';
import AcademiaContentWrapper from '@/app/academia/components/AcademiaContentWrapper';

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

const AcademiaLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			{/* Hero Section */}
			<AcademiaHero />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<AcademiaSidebar />

					{/* Content Area */}
					<AcademiaContentWrapper>{children}</AcademiaContentWrapper>
				</div>
			</div>
		</main>
	);
};

export default AcademiaLayout;
