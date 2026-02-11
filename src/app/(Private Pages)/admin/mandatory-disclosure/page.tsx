import React from 'react';
import { getMandatoryDisclosure } from '@/app/(Private Pages)/actions/mandatory-disclosure';
import DisclosureHeroEditor from './components/DisclosureHeroEditor';
import DisclosureItemsEditor from './components/DisclosureItemsEditor';

export default async function AdminMandatoryDisclosurePage() {
	const data = await getMandatoryDisclosure();

	return (
		<div className='min-h-screen bg-gray-50 relative'>
			{/* Admin Hint Banner */}
			<div className='bg-blue-600 text-white text-center py-2 text-sm font-medium sticky top-0 z-50 shadow-md'>
				Admin Mode: Click any section to edit
			</div>

			{/* Editable Sections mirroring the live page structure */}
			<DisclosureHeroEditor initialData={data} />
			<DisclosureItemsEditor initialData={data} />
		</div>
	);
}
