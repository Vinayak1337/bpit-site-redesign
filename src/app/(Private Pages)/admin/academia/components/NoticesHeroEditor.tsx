'use client';

import { useState } from 'react';
import Editable from '@/components/ui/Editable';
import NoticesHero from '@/app/(Public Pages)/academia/notices-circulars/components/NoticesHero';
import NoticesHeroForm from './NoticesHeroForm';
import type { NoticesHeroData } from '@/app/(Private Pages)/actions/academia-notices-circulars';

export default function NoticesHeroEditor({
	initialData
}: {
	initialData: NoticesHeroData;
}) {
	const [data, setData] = useState<NoticesHeroData>(initialData);
	return (
		<Editable
			label='Notices Hero'
			presentation='dialog'
			formContent={
				<NoticesHeroForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<NoticesHero data={data} />
			</div>
		</Editable>
	);
}
