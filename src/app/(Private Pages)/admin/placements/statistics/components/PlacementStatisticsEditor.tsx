'use client';

import { useState, useEffect, useMemo } from 'react';
import Editable from '@/components/ui/Editable';
import PlacementStatisticsSection from './PlacementStatisticsSection';
import PlacementStatisticsForm from './PlacementStatisticsForm';
import {
	getPlacementStatistics,
	type PlacementStatisticsData
} from '@/app/(Private Pages)/actions/placement-statistics';

export default function PlacementStatisticsEditor() {
	const [initialData, setInitialData] = useState<PlacementStatisticsData | null>(null);
	const [previewData, setPreviewData] = useState<PlacementStatisticsData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await getPlacementStatistics();
				setInitialData(result);
				setPreviewData(result);
			} catch (error) {
				console.error('Error fetching placement statistics:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	const formContent = useMemo(() => {
		if (!initialData) return null;
		return (
			<PlacementStatisticsForm
				initialData={initialData}
				pageSlug='placement-statistics'
				onChange={setPreviewData}
			/>
		);
	}, [initialData]);

	if (isLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center'>
				<div className='text-slate-600'>Loading placement statistics...</div>
			</div>
		);
	}

	if (!initialData || !previewData) {
		return (
			<div className='rounded-lg border border-slate-200 bg-white p-8 text-center'>
				<p className='text-slate-600'>
					No placement statistics data found. Please run the seed script.
				</p>
			</div>
		);
	}

	return (
		<Editable
			label='Placement Statistics'
			formContent={formContent}>
			<PlacementStatisticsSection data={previewData} />
		</Editable>
	);
}
