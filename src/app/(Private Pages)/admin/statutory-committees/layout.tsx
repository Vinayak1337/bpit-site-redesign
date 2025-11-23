import React from 'react';
import DynamicSidebar from '@/components/ui/DynamicSidebar';
import { adminStatutoryCommitteesSidebarData } from '@/data/sidebar';

const AdminStatutoryCommitteesLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='flex flex-col lg:flex-row gap-8'>
			{/* Sidebar Navigation */}
			<DynamicSidebar
				navItems={adminStatutoryCommitteesSidebarData.navItems}
				theme={adminStatutoryCommitteesSidebarData.theme}
			/>

			{/* Content Area */}
			<div className='flex-1'>
				<div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden p-8'>
					{children}
				</div>
			</div>
		</div>
	);
};

export default AdminStatutoryCommitteesLayout;
