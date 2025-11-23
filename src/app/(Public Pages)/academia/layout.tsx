import React from 'react';
import type { Metadata } from 'next';
import AcademiaHero from '@/app/(Public Pages)/academia/components/AcademiaHero';
import AcademiaSidebar from '@/app/(Public Pages)/academia/components/AcademiaSidebar';
import AcademiaContentWrapper from '@/app/(Public Pages)/academia/components/AcademiaContentWrapper';
import { getAcademiaHero } from '@/app/(Private Pages)/actions/academia';

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

const AcademiaLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const heroData = await getAcademiaHero('academia');

	return (
		<main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			{/* Hero Section */}
			<AcademiaHero data={heroData} />

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
