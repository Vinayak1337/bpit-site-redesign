import React from 'react';
import type { Metadata } from 'next';
import { LibraryCarousel } from '@/app/library/components/library-carousel';
import DynamicSidebar from '@/components/ui/DynamicSidebar';
import LibraryContentWrapper from '@/app/library/components/library-content-wrapper';
import LibraryQuotes from '@/app/library/components/library-quotes';

// Library navigation items with icon names as strings
const libraryNavItems = [
	{
		id: 'overview',
		title: 'Library Overview',
		icon: 'BookOpen',
		href: '/library'
	},
	{
		id: 'information',
		title: 'Library Information',
		icon: 'Info',
		href: '/library/information'
	},
	{
		id: 'collection',
		title: 'Collection',
		icon: 'BookMarked',
		href: '/library/collection'
	},
	{
		id: 'services',
		title: 'Library Services',
		icon: 'Headphones',
		href: '/library/services'
	},
	{
		id: 'advisory-committee',
		title: 'Advisory Committee',
		icon: 'Users',
		href: '/library/advisory-committee'
	},
	{
		id: 'staff',
		title: 'Library Staff',
		icon: 'UserCheck',
		href: '/library/staff'
	},
	{
		id: 'rules',
		title: 'Library Rules',
		icon: 'FileText',
		href: '/library/rules'
	},
	{
		id: 'timings',
		title: 'Library Timings',
		icon: 'Clock',
		href: '/library/timings'
	},
	{
		id: 'self-learning',
		title: 'Self Learning',
		icon: 'GraduationCap',
		href: '/library/self-learning'
	},
	{
		id: 'digital-library',
		title: 'Digital Library',
		icon: 'Globe',
		href: '/library/digital-library'
	},
	{
		id: 'delnet',
		title: 'DELNET',
		icon: 'Network',
		href: '/library/delnet'
	},
	{
		id: 'ndli',
		title: 'NDLI',
		icon: 'School',
		href: '/library/ndli'
	},
	{
		id: 'moocs',
		title: 'MOOCs',
		icon: 'BookOpenCheck',
		href: '/library/moocs'
	},
	{
		id: 'newspapers',
		title: 'Newspapers',
		icon: 'Newspaper',
		href: '/library/newspapers'
	},
	{
		id: 'photocopy-service',
		title: 'Photocopy Service',
		icon: 'Copy',
		href: '/library/photocopy-service'
	},
	{
		id: 'book-acquisition',
		title: 'Book Acquisition',
		icon: 'ShoppingCart',
		href: '/library/book-acquisition'
	},
	{
		id: 'weeding-out',
		title: 'Weeding Out',
		icon: 'Trash2',
		href: '/library/weeding-out'
	},
	{
		id: 'e-resources',
		title: 'E-Resources',
		icon: 'Database',
		href: '/library/e-resources'
	},
	{
		id: 'book-bank',
		title: 'Book Bank',
		icon: 'Bookmark',
		href: '/library/book-bank'
	},
	{
		id: 'downloads',
		title: 'Downloads',
		icon: 'Download',
		href: '/library/downloads'
	},
	{
		id: 'useful-links',
		title: 'Useful Links',
		icon: 'ExternalLink',
		href: '/library/useful-links'
	},
	{
		id: 'contact',
		title: 'Contact Us',
		icon: 'Phone',
		href: '/library/contact'
	}
];

// Library theme configuration
const libraryTheme = {
	primary: 'blue',
	activeGradient: 'from-blue-500/10 to-blue-600/10',
	activeBorder: 'border-blue-200',
	activeText: 'text-blue-700',
	activeIcon: 'text-blue-600',
	activeChevron: 'text-blue-600'
};

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
					<DynamicSidebar navItems={libraryNavItems} theme={libraryTheme} />

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