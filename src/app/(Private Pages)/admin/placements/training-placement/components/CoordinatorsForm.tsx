'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { updateTrainingPlacement, type TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

interface CoordinatorsFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function CoordinatorsForm({ initialData, pageSlug, onChange }: CoordinatorsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			departmentsTitle: initialData.departmentsTitle || '',
			departmentsDescription: initialData.departmentsDescription || '',
			departments: initialData.departments || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'departments'
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: TrainingPlacementData = {
					...initialData,
					departmentsTitle: values.departmentsTitle || '',
					departmentsDescription: values.departmentsDescription || '',
					departments: (values.departments || []).filter(Boolean) as any
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
					departmentsTitle: values.departmentsTitle,
					departmentsDescription: values.departmentsDescription,
					departments: values.departments
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
						name='departmentsTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Department-wise Placement Coordinators' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='departmentsDescription'
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
						<h3 className='text-lg font-semibold'>Departments</h3>
						<Button
							type='button'
							onClick={() => append({ id: Date.now().toString(), name: '', code: '', coordinator: '', companies: '', avgPackage: '', placementRate: '' })}
							size='sm'>
							<Plus className='w-4 h-4 mr-2' />
							Add Department
						</Button>
					</div>

					{fields.map((field, index) => (
						<div key={field.id} className='p-4 border rounded-lg space-y-4'>
							<div className='flex items-center justify-between mb-2'>
								<h4 className='font-semibold'>Department {index + 1}</h4>
								<Button
									type='button'
									variant='destructive'
									size='sm'
									onClick={() => remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name={`departments.${index}.name`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Department Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Computer Science' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departments.${index}.code`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Code</FormLabel>
											<FormControl>
												<Input {...field} placeholder='CSE' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departments.${index}.coordinator`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Coordinator</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Dr. John Doe' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departments.${index}.companies`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Companies</FormLabel>
											<FormControl>
												<Input {...field} placeholder='150+' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departments.${index}.avgPackage`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Avg Package</FormLabel>
											<FormControl>
												<Input {...field} placeholder='8.5 LPA' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departments.${index}.placementRate`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Placement Rate</FormLabel>
											<FormControl>
												<Input {...field} placeholder='95%' />
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
