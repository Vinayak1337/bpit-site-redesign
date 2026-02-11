'use client';

import { useState } from 'react';
import EventsForm from './EventsForm';
import {
	EventsFestivalsHeader,
	EventsFestivalsGrid
} from '@/components/student-life/EventsFestivals';
import type { EventsFestivalsData } from '@/app/(Private Pages)/actions/student-life';
import Editable from '@/components/ui/Editable';

interface Props {
	initialData: EventsFestivalsData;
}

export default function EventsEditor({ initialData }: Props) {
	const [data, setData] = useState<EventsFestivalsData>(initialData);

	return (
		<div className='space-y-8'>
			<Editable
				label='Events Header'
				formContent={
					<EventsForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['header']}
					/>
				}>
				<EventsFestivalsHeader data={data} />
			</Editable>

			<Editable
				label='Events Grid'
				formContent={
					<EventsForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['events']}
					/>
				}>
				<EventsFestivalsGrid data={data} />
			</Editable>
		</div>
	);
}
