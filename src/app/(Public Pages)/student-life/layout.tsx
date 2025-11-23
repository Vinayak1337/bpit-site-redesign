import React from 'react';
import type { Metadata } from 'next';
import StudentLifeHero from '@/app/(Public Pages)/student-life/components/StudentLifeHero';
import DynamicSidebar from '@/components/ui/DynamicSidebar';
import StudentLifeContentWrapper from '@/app/(Public Pages)/student-life/components/StudentLifeContentWrapper';
import { getStudentLifeHero } from '@/app/(Private Pages)/actions/student-life';
import { studentLifeSidebarData } from '@/data/sidebar';

export const metadata: Metadata = {
	title: 'Student Life - Bhagwan Parshuram Institute of Technology',
	description:
		'Discover the vibrant student life at BPIT, including campus facilities, clubs, societies, events, and festivals.',
};

const StudentLifeLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const heroData = await getStudentLifeHero('student-life');

	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<StudentLifeHero data={heroData} />

			{/* Main Content with Sidebar */}
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Navigation */}
					<DynamicSidebar
						navItems={studentLifeSidebarData.navItems}
						theme={studentLifeSidebarData.theme}
					/>

					{/* Content Area */}
					<StudentLifeContentWrapper>
						{children}
					</StudentLifeContentWrapper>
				</div>
			</div>
		</main>
	);
};

export default StudentLifeLayout;
