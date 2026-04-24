'use client';

import { useState } from 'react';
import Editable from '@/components/ui/Editable';
import CalendarHero from '@/app/(Public Pages)/academia/academic-calendar/components/CalendarHero';
import CalendarHeroForm from './CalendarHeroForm';
import type { CalendarHeroData } from '@/app/(Private Pages)/actions/academia-academic-calendar';

export default function CalendarHeroEditor({
	initialData
}: {
	initialData: CalendarHeroData;
}) {
	const [data, setData] = useState<CalendarHeroData>(initialData);
	return (
		<Editable
			label='Academic Calendar Hero'
			presentation='dialog'
			formContent={
				<CalendarHeroForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-6'>
				<CalendarHero data={data} />
			</div>
		</Editable>
	);
}
