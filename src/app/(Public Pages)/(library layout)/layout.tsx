import React from 'react';
import type { Metadata } from 'next';
import { LibraryCarousel } from './academia/library/components/library-carousel';
import DynamicSidebar from '../../../components/ui/DynamicSidebar';
import LibraryContentWrapper from './academia/library/components/library-content-wrapper';
import LibraryQuotes from './academia/library/components/library-quotes';

// Library navigation items with icon names as strings
const libraryNavItems = [
	{
		id: 'overview',
		title: 'Library Overview',
		icon: 'BookOpen',
		href: '/academia/library'
	},
	{
		id: 'information',
		title: 'Library Information',
		icon: 'Info',
		href: '/academia/library/information'
	},
	{
		id: 'collection',
		title: 'Collection',
		icon: 'BookMarked',
		href: '/academia/library/collection'
	},
	{
		id: 'services',
		title: 'Library Services',
		icon: 'Headphones',
		href: '/academia/library/services'
	},
	{
		id: 'advisory-committee',
		title: 'Advisory Committee',
		icon: 'Users',
		href: '/academia/library/advisory-committee'
	},
	{
		id: 'staff',
		title: 'Library Staff',
		icon: 'UserCheck',
		href: '/academia/library/staff'
	},
	{
		id: 'rules',
		title: 'Library Rules',
		icon: 'FileText',
		href: '/academia/library/rules'
	},
	{
		id: 'timings',
		title: 'Library Timings',
		icon: 'Clock',
		href: '/academia/library/timings'
	},
	{
		id: 'self-learning',
		title: 'Self Learning',
		icon: 'GraduationCap',
		href: '/academia/library/self-learning'
	},
	{
		id: 'digital-library',
		title: 'Digital Library',
		icon: 'Globe',
		href: '/academia/library/digital-library'
	},
	{
		id: 'delnet',
		title: 'DELNET',
		icon: 'Network',
		href: '/academia/library/delnet'
	},
	{
		id: 'ndli',
		title: 'NDLI',
		icon: 'School',
		href: '/academia/library/ndli'
	},
	{
		id: 'moocs',
		title: 'MOOCs',
		icon: 'BookOpenCheck',
		href: '/academia/library/moocs'
	},
	{
		id: 'newspapers',
		title: 'Newspapers',
		icon: 'Newspaper',
		href: '/academia/library/newspapers'
	},
	{
		id: 'photocopy-service',
		title: 'Photocopy Service',
		icon: 'Copy',
		href: '/academia/library/photocopy-service'
	},
	{
		id: 'book-acquisition',
		title: 'Book Acquisition',
		icon: 'ShoppingCart',
		href: '/academia/library/book-acquisition'
	},
	{
		id: 'weeding-out',
		title: 'Weeding Out',
		icon: 'Trash2',
		href: '/academia/library/weeding-out'
	},
	{
		id: 'e-resources',
		title: 'E-Resources',
		icon: 'Database',
		href: '/academia/library/e-resources'
	},
	{
		id: 'book-bank',
		title: 'Book Bank',
		icon: 'Bookmark',
		href: '/academia/library/book-bank'
	},
	{
		id: 'downloads',
		title: 'Downloads',
		icon: 'Download',
		href: '/academia/library/downloads'
	},
	{
		id: 'useful-links',
		title: 'Useful Links',
		icon: 'ExternalLink',
		href: '/academia/library/useful-links'
	},
	{
		id: 'contact',
		title: 'Contact Us',
		icon: 'Phone',
		href: '/academia/library/contact'
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