import React from 'react';
import type { Metadata } from 'next';
import StatutoryCommitteesHero from '@/app/statutory-committees/components/StatutoryCommitteesHero';
import DynamicSidebar from '@/components/ui/DynamicSidebar';
import StatutoryCommitteesContentWrapper from '@/app/statutory-committees/components/StatutoryCommitteesContentWrapper';

import { statutoryCommitteesSidebarData } from '@/data/sidebar';

export const metadata: Metadata = {
	title: 'Statutory Committees - Bhagwan Parshuram Institute of Technology',
	description:
		"Explore BPIT's statutory committees including IQAC, Anti-Ragging Committee, Internal Complaints Committee, and other regulatory bodies ensuring quality education and student welfare.",
	keywords: [
		'BPIT statutory committees',
		'IQAC',
		'Anti-Ragging Committee',
		'Internal Complaints Committee',
		'Gender Equality Cell',
		'Student Welfare Committee',
		'Grievance Redressal Cell',
		'quality assurance',
		'regulatory compliance',
		'student safety',
		'academic excellence'
	]
};

const StatutoryCommitteesLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<StatutoryCommitteesHero />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<DynamicSidebar
						navItems={statutoryCommitteesSidebarData.navItems}
						theme={statutoryCommitteesSidebarData.theme}
					/>

					{/* Content Area */}
					<StatutoryCommitteesContentWrapper>
						{children}
					</StatutoryCommitteesContentWrapper>
				</div>
			</div>
		</main>
	);
};

export default StatutoryCommitteesLayout;
