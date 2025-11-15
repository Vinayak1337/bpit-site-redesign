'use client';

import { useState, useEffect } from 'react';
import Editable from '@/components/ui/Editable';
import TrainingPlacementSection from './TrainingPlacementSection';
import TrainingPlacementForm from './TrainingPlacementForm';
import {
	getTrainingPlacement,
	type TrainingPlacementData
} from '@/app/(Private Pages)/actions/training-placement';

export default function TrainingPlacementEditor() {
	const [data, setData] = useState<TrainingPlacementData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await getTrainingPlacement();
				setData(result);
			} catch (error) {
				console.error('Error fetching training placement data:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center'>
				<div className='text-slate-600'>Loading training placement data...</div>
			</div>
		);
	}

	if (!data) {
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
			formContent={
				<TrainingPlacementForm
					initialData={data}
					pageSlug="training-placement"
					onChange={setData}
				/>
			}
		>
			<TrainingPlacementSection data={data} />
		</Editable>
	);
}

