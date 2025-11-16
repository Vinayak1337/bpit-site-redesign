'use client';

import { useState, useEffect } from 'react';
import { getInternshipsData, type InternshipsData } from '@/app/(Private Pages)/actions/internships';
import Editable from '@/components/ui/Editable';
import InternshipsSection from './InternshipsSection';
import InternshipsForm from './InternshipsForm';

export default function InternshipsEditor() {
	const [data, setData] = useState<InternshipsData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const internshipsData = await getInternshipsData();
			setData(internshipsData);
			setLoading(false);
		}
		fetchData();
	}, []);

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='text-slate-600'>Loading internships data...</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='text-center'>
					<h2 className='text-xl font-semibold text-slate-900 mb-2'>
						No Data Found
					</h2>
					<p className='text-slate-600'>
						Please run the seed script to populate internships data.
					</p>
				</div>
			</div>
		);
	}

	return (
		<Editable
			label='Internships'
			formContent={
				<InternshipsForm
					initialData={data}
					pageSlug='internships'
					onChange={setData}
				/>
			}>
			<InternshipsSection data={data} />
		</Editable>
	);
}
