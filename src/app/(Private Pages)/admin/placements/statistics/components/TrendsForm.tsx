'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updatePlacementStatistics, getPlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import type { PlacementStatisticsData, YearlyTrend } from '@/app/(Private Pages)/actions/placement-statistics';
import { Plus, Trash2, TrendingUp } from 'lucide-react';

interface TrendsFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange: (data: PlacementStatisticsData) => void;
}

interface TrendsFormData {
	trends: YearlyTrend[];
}

export default function TrendsForm({
	initialData,
	pageSlug,
	onChange
}: TrendsFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm<TrendsFormData>({
		defaultValues: {
			trends: initialData.yearlyTrends || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'trends'
	});

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			if (!values.trends) return;

			const yearlyTrends: YearlyTrend[] = values.trends.map(t => ({
				year: t?.year || '',
				rate: t?.rate || 0,
				avg: t?.avg || 0,
				companies: t?.companies || 0
			}));

			onChange({
				...initialData,
				yearlyTrends
			});
		});

		return () => subscription.unsubscribe();
	}, [form, initialData, onChange]);

	const onSubmit = async (values: TrendsFormData) => {
		try {
			setSaveStatus('saving');

			const yearlyTrends: YearlyTrend[] = values.trends.map(t => ({
				year: t.year,
				rate: t.rate,
				avg: t.avg,
				companies: t.companies
			}));

			const result = await updatePlacementStatistics({
				...initialData,
				yearlyTrends
			});

			if (result.success) {
				// Fetch fresh data from DB
				const freshData = await getPlacementStatistics();
				if (freshData) {
					form.reset({
						trends: freshData.yearlyTrends || []
					});
				}
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} else {
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		} catch (error) {
			console.error('Failed to save yearly trends:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6'>
			<div className='flex items-center space-x-3 border-b pb-4'>
				<TrendingUp className='w-6 h-6 text-blue-600' />
				<h3 className='text-2xl font-bold'>Yearly Trends</h3>
			</div>

			<div className='space-y-6'>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className='border rounded-lg p-4 space-y-4 bg-gray-50'>
						<div className='flex items-center justify-between'>
							<Label className='text-lg font-semibold'>Year {index + 1}</Label>
							<Button
								type='button'
								variant='destructive'
								size='sm'
								onClick={() => remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Year</Label>
								<Input
									{...form.register(`trends.${index}.year`)}
									placeholder='2024'
								/>
							</div>
							<div>
								<Label>Placement Rate (%)</Label>
								<Input
									type='number'
									step='0.1'
									{...form.register(`trends.${index}.rate`, {
										valueAsNumber: true
									})}
									placeholder='85.5'
								/>
							</div>
							<div>
								<Label>Average Package (LPA)</Label>
								<Input
									type='number'
									step='0.1'
									{...form.register(`trends.${index}.avg`, {
										valueAsNumber: true
									})}
									placeholder='6.5'
								/>
							</div>
							<div>
								<Label>Companies Visited</Label>
								<Input
									type='number'
									{...form.register(`trends.${index}.companies`, {
										valueAsNumber: true
									})}
									placeholder='120'
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<Button
				type='button'
				variant='outline'
				onClick={() =>
					append({
						year: '',
						rate: 0,
						avg: 0,
						companies: 0
					})
				}
				className='w-full'>
				<Plus className='w-4 h-4 mr-2' />
				Add Year
			</Button>

			<div className='flex items-center gap-4'>
				<Button 
					type='submit' 
					className={`w-full ${
						saveStatus === 'saved'
							? 'bg-green-600 hover:bg-green-700'
							: saveStatus === 'error'
								? 'bg-red-600 hover:bg-red-700'
								: 'bg-blue-600 hover:bg-blue-700'
					}`}
					disabled={saveStatus === 'saving'}>
					{saveStatus === 'saving' && 'Saving...'}
					{saveStatus === 'saved' && '✓ Saved Successfully'}
					{saveStatus === 'error' && 'Error - Try Again'}
					{saveStatus === 'idle' && 'Save Yearly Trends'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
