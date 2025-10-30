import React from 'react';
import type { Metadata } from 'next';
import AboutHero from '@/app/(Public Pages)/about/components/AboutHero';
import DynamicSidebar from '@/components/ui/DynamicSidebar';
import AboutContentWrapper from '@/app/(Public Pages)/about/components/AboutContentWrapper';

import { aboutHeroData } from '@/data/about';
import { aboutSidebarData } from '@/data/sidebar';

export const metadata: Metadata = {
	title: 'About BPIT - Bhagwan Parshuram Institute of Technology',
	description:
		"Learn about BPIT's history, vision, mission, and leadership. Discover our commitment to excellence in engineering education and innovation.",
	keywords: [
		'About BPIT',
		'Bhagwan Parshuram Institute of Technology',
		'engineering college history',
		'Chairman message',
		'Principal message',
		'founder tribute',
		'BPIT leadership',
		'engineering education Delhi',
		'NBA accredited college',
		'GGSIPU affiliated college'
	]
};

const AboutLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			{/* Hero Section */}
			<AboutHero data={aboutHeroData} />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<DynamicSidebar
						navItems={aboutSidebarData.navItems}
						theme={aboutSidebarData.theme}
					/>

					{/* Content Area */}
					<AboutContentWrapper>{children}</AboutContentWrapper>
				</div>
			</div>
		</main>
	);
};

export default AboutLayout;
