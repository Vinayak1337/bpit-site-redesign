'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { updateTrainingPlacement, type TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

interface MetricsFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function MetricsForm({ initialData, pageSlug, onChange }: MetricsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			statisticsTitle: initialData.statisticsTitle || '',
			statisticsDescription: initialData.statisticsDescription || '',
			statistics: initialData.statistics || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'statistics'
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: TrainingPlacementData = {
					...initialData,
					statisticsTitle: values.statisticsTitle || '',
					statisticsDescription: values.statisticsDescription || '',
					statistics: (values.statistics || []).filter(Boolean) as any
				};
				onChange(updatedData);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, onChange, initialData]);

	const onSubmit = async (values: any) => {
		setSaveStatus('saving');
		startTransition(async () => {
			try {
				const updatedData: TrainingPlacementData = {
					...initialData,
					statisticsTitle: values.statisticsTitle,
					statisticsDescription: values.statisticsDescription,
					statistics: values.statistics
				};

				await updateTrainingPlacement(updatedData);
				
				if (onChange) {
					onChange(updatedData);
				}

				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} catch (error) {
				console.error('Failed to save:', error);
				setSaveStatus('error');
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='grid grid-cols-1 gap-4'>
					<FormField
						control={form.control}
						name='statisticsTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Our Impact in Numbers' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='statisticsDescription'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section Description</FormLabel>
								<FormControl>
									<Textarea {...field} rows={3} placeholder='Description...' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-lg font-semibold'>Statistics</h3>
						<Button
							type='button'
							onClick={() => append({ id: Date.now().toString(), number: '', label: '', sublabel: '' })}
							size='sm'>
							<Plus className='w-4 h-4 mr-2' />
							Add Statistic
						</Button>
					</div>

					{fields.map((field, index) => (
						<div key={field.id} className='p-4 border rounded-lg space-y-4'>
							<div className='flex items-center justify-between mb-2'>
								<h4 className='font-semibold'>Statistic {index + 1}</h4>
								<Button
									type='button'
									variant='destructive'
									size='sm'
									onClick={() => remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<FormField
									control={form.control}
									name={`statistics.${index}.number`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Number</FormLabel>
											<FormControl>
												<Input {...field} placeholder='95%' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`statistics.${index}.label`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Label</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Placement Rate' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`statistics.${index}.sublabel`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Sublabel</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Academic Year 2024' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					))}
				</div>

				<div className='flex items-center gap-3'>
					<Button type='submit' disabled={isPending}>
						{isPending ? 'Saving...' : 'Save Changes'}
					</Button>
					{saveStatus === 'saved' && (
						<span className='text-sm text-green-600'>✓ Saved successfully</span>
					)}
					{saveStatus === 'error' && (
						<span className='text-sm text-red-600'>Failed to save</span>
					)}
				</div>
			</form>
		</Form>
	);
}
