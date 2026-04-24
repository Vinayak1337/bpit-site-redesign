'use client';

import { useState } from 'react';
import Editable from '@/components/ui/Editable';
import NoticesList from '@/app/(Public Pages)/academia/notices-circulars/components/NoticesList';
import NoticesListForm from './NoticesListForm';
import type { NoticesData } from '@/app/(Private Pages)/actions/academia-notices-circulars';

export default function NoticesListEditor({
	initialData
}: {
	initialData: NoticesData;
}) {
	const [data, setData] = useState<NoticesData>(initialData);
	return (
		<Editable
			label='Notices List'
			presentation='dialog'
			formContent={
				<NoticesListForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<NoticesList notices={data.items} />
			</div>
		</Editable>
	);
}
