'use client';

import { useState, useEffect, useMemo } from 'react';
import Editable from '@/components/ui/Editable';
import TrainingPlacementSection from './TrainingPlacementSection';
import TrainingPlacementForm from './TrainingPlacementForm';
import {
	getTrainingPlacement,
	type TrainingPlacementData
} from '@/app/(Private Pages)/actions/training-placement';

export default function TrainingPlacementEditor() {
	const [initialData, setInitialData] = useState<TrainingPlacementData | null>(null);
	const [previewData, setPreviewData] = useState<TrainingPlacementData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await getTrainingPlacement();
				setInitialData(result);
				setPreviewData(result);
			} catch (error) {
				console.error('Error fetching training placement data:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	const formContent = useMemo(() => {
		if (!initialData) return null;
		return (
			<TrainingPlacementForm
				initialData={initialData}
				pageSlug="training-placement"
				onChange={setPreviewData}
			/>
		);
	}, [initialData]);

	if (isLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center'>
				<div className='text-slate-600'>Loading training placement data...</div>
			</div>
		);
	}

	if (!initialData || !previewData) {
		return (
			<div className='rounded-lg border border-slate-200 bg-white p-8 text-center'>
				<p className='text-slate-600'>
					No training placement data found. Please run the seed script.
				</p>
			</div>
		);
	}

	return (
		<Editable
			label="Training & Placement"
			formContent={formContent}
		>
			<TrainingPlacementSection data={previewData} />
		</Editable>
	);
}
