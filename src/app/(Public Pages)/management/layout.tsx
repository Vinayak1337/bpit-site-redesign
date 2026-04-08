import React from 'react';
import type { Metadata } from 'next';
import ManagementHero from '@/app/(Public Pages)/management/components/ManagementHero';
import DynamicSidebar from '@/components/ui/DynamicSidebar';
import ManagementContentWrapper from '@/app/(Public Pages)/management/components/ManagementContentWrapper';

import { managementHeroData } from '@/data/management';
import { managementSidebarData } from '@/data/sidebar';

export const metadata: Metadata = {
	title: 'Management - Bhagwan Parshuram Institute of Technology',
	description:
		"Meet BPIT's leadership team, governance structure, and management policies. Learn about our administration, leadership excellence, and institutional governance framework.",
	keywords: [
		'BPIT management',
		'leadership team',
		'governance structure',
		'administration',
		'institutional leadership',
		'management policies',
		'academic governance',
		'quality assurance',
		'educational leadership',
		'institutional excellence'
	]
};

const ManagementLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<ManagementHero data={managementHeroData} />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<DynamicSidebar
						navItems={managementSidebarData.navItems}
						theme={managementSidebarData.theme}
					/>

					{/* Content Area */}
					<ManagementContentWrapper>{children}</ManagementContentWrapper>
				</div>
			</div>
		</main>
	);
};

export default ManagementLayout;
