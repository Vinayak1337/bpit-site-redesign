import React from 'react';
import type { Metadata } from 'next';
import { LibraryCarousel } from '@/app/library/components/library-carousel';
import LibrarySidebar from '@/app/library/components/library-sidebar';
import LibraryContentWrapper from '@/app/library/components/library-content-wrapper';
import { LibraryQuotes } from '@/app/library/components/library-quotes';

export const metadata: Metadata = {
	title: 'Library - Bhagwan Parshuram Institute of Technology',
	description:
		'Explore BPIT Library resources, digital collections, e-books, journals, and study facilities. Access our comprehensive collection and academic support services.',
	keywords: [
		'BPIT Library',
		'Library resources',
		'Digital library',
		'E-books',
		'Academic journals',
		'Study facilities',
		'Library services',
		'Book collection',
		'Research resources',
		'Online databases'
	]
};

const LibraryLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			{/* Carousel Section - Full Width */}
			<LibraryCarousel />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<LibrarySidebar />

					{/* Content Area */}
					<LibraryContentWrapper>{children}</LibraryContentWrapper>
				</div>
			</div>

			{/* Quotes Section - Full Width */}
			<LibraryQuotes />
		</main>
	);
};

export default LibraryLayout;