import React from 'react';
import type { Metadata } from 'next';
import AdmissionsHero from '@/app/(Public Pages)/admissions/components/AdmissionsHero';
import DynamicSidebar from '@/components/ui/DynamicSidebar';
import AdmissionsContentWrapper from '@/app/(Public Pages)/admissions/components/AdmissionsContentWrapper';
import { getAdmissionsHero } from '@/app/(Private Pages)/actions/admissions';
import { admissionsSidebarData } from '@/data/sidebar';

export const metadata: Metadata = {
	title: 'Admissions - Bhagwan Parshuram Institute of Technology',
	description:
		'Join BPIT to pursue excellence in engineering and management. Explore our programs, admission process, and scholarship opportunities.',
};

const AdmissionsLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const heroData = await getAdmissionsHero('admissions');

	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<AdmissionsHero data={heroData} />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<DynamicSidebar
						navItems={admissionsSidebarData.navItems}
						theme={admissionsSidebarData.theme}
					/>

					{/* Content Area */}
					<AdmissionsContentWrapper>
						{children}
					</AdmissionsContentWrapper>
				</div>
			</div>
		</main>
	);
};

export default AdmissionsLayout;







