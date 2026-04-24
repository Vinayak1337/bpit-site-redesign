'use client';

import { useState } from 'react';
import Editable from '@/components/ui/Editable';
import CalendarEvents from '@/app/(Public Pages)/academia/academic-calendar/components/CalendarEvents';
import CalendarEventsForm from './CalendarEventsForm';
import type { CalendarEventsData } from '@/app/(Private Pages)/actions/academia-academic-calendar';

export default function CalendarEventsEditor({
	initialData
}: {
	initialData: CalendarEventsData;
}) {
	const [data, setData] = useState<CalendarEventsData>(initialData);
	return (
		<Editable
			label='Calendar Events'
			presentation='dialog'
			formContent={
				<CalendarEventsForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-6'>
				<CalendarEvents events={data.items} />
			</div>
		</Editable>
	);
}
