import React from 'react';
import type { Metadata } from 'next';
import ManagementHero from '@/app/management/components/ManagementHero';
import ManagementSidebar from '@/app/management/components/ManagementSidebar';
import ManagementContentWrapper from '@/app/management/components/ManagementContentWrapper';

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
			<ManagementHero />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<ManagementSidebar />

					{/* Content Area */}
					<ManagementContentWrapper>{children}</ManagementContentWrapper>
				</div>
			</div>
		</main>
	);
};

export default ManagementLayout;
