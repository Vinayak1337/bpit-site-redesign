'use client';

import { useState } from 'react';
import EventsForm from './EventsForm';
import EventsFestivals from '@/components/student-life/EventsFestivals';
import type { EventsFestivalsData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: EventsFestivalsData;
}

export default function EventsEditor({ initialData }: Props) {
	const [data, setData] = useState<EventsFestivalsData>(initialData);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Editor</h2>
				<EventsForm
					initialData={initialData}
					onChange={setData}
				/>
			</div>
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Live Preview</h2>
				<div className="border rounded-xl overflow-hidden bg-gray-50 p-4 h-fit sticky top-4 max-h-screen overflow-y-auto">
					<EventsFestivals data={data} />
				</div>
			</div>
		</div>
	);
}

