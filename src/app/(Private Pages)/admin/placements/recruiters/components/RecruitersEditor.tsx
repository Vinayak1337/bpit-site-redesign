'use client';

import { useState, useEffect, useMemo } from 'react';
import Editable from '@/components/ui/Editable';
import RecruitersSection from './RecruitersSection';
import RecruitersForm from './RecruitersForm';
import {
	getRecruitersData,
	type RecruitersData
} from '@/app/(Private Pages)/actions/recruiters';

export default function RecruitersEditor() {
	const [initialData, setInitialData] = useState<RecruitersData | null>(null);
	const [previewData, setPreviewData] = useState<RecruitersData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await getRecruitersData();
				setInitialData(result);
				setPreviewData(result);
			} catch (error) {
				console.error('Error fetching recruiters data:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	const formContent = useMemo(() => {
		if (!initialData) return null;
		return (
			<RecruitersForm
				initialData={initialData}
				pageSlug='recruiters'
				onChange={setPreviewData}
			/>
		);
	}, [initialData]);

	if (isLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center'>
				<div className='text-slate-600'>Loading recruiters data...</div>
			</div>
		);
	}

	if (!initialData || !previewData) {
		return (
			<div className='rounded-lg border border-slate-200 bg-white p-8 text-center'>
				<p className='text-slate-600'>
					No recruiters data found. Please run the seed script.
				</p>
			</div>
		);
	}

	return (
		<Editable
			label='Recruiters'
			formContent={formContent}>
			<RecruitersSection data={previewData} />
		</Editable>
	);
}
