import React from 'react';
import type { Metadata } from 'next';
import VisionMissionHero from '@/app/vision-mission/components/VisionMissionHero';
import DynamicSidebar from '@/components/ui/DynamicSidebar';
import VisionMissionContentWrapper from '@/app/vision-mission/components/VisionMissionContentWrapper';

import { visionMissionSidebarData } from '@/data/sidebar';

export const metadata: Metadata = {
	title: 'Vision & Mission - Bhagwan Parshuram Institute of Technology',
	description:
		"Discover BPIT's vision for educational excellence, mission to provide quality technical education, and quality policy ensuring continuous improvement in all academic processes.",
	keywords: [
		'BPIT vision',
		'BPIT mission',
		'quality policy',
		'educational excellence',
		'technical education vision',
		'engineering college mission',
		'academic quality assurance',
		'institutional goals',
		'education philosophy',
		'quality management system'
	]
};

const VisionMissionLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<VisionMissionHero />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<DynamicSidebar
						navItems={visionMissionSidebarData.navItems}
						theme={visionMissionSidebarData.theme}
					/>

					{/* Content Area */}
					<VisionMissionContentWrapper>{children}</VisionMissionContentWrapper>
				</div>
			</div>
		</main>
	);
};

export default VisionMissionLayout;
