'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import UploadButton from '@/components/cloudinary/upload-button';
import { updateTrainingPlacement, type TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

interface TeamFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function TeamForm({ initialData, pageSlug, onChange }: TeamFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			teamTitle: initialData.teamTitle || '',
			teamDescription: initialData.teamDescription || '',
			teamMembers: initialData.teamMembers || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'teamMembers'
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: TrainingPlacementData = {
					...initialData,
					teamTitle: values.teamTitle || '',
					teamDescription: values.teamDescription || '',
					teamMembers: (values.teamMembers || []).filter(Boolean) as any
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
					teamTitle: values.teamTitle,
					teamDescription: values.teamDescription,
					teamMembers: values.teamMembers
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
						name='teamTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Our Dedicated Team' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='teamDescription'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section Description</FormLabel>
								<FormControl>
									<Textarea {...field} rows={3} placeholder='Meet our team...' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-lg font-semibold'>Team Members</h3>
						<Button
							type='button'
							onClick={() => append({ id: Date.now().toString(), name: '', position: '', qualifications: '', specialization: '', image: '' })}
							size='sm'>
							<Plus className='w-4 h-4 mr-2' />
							Add Member
						</Button>
					</div>

					{fields.map((field, index) => (
						<div key={field.id} className='p-4 border rounded-lg space-y-4'>
							<div className='flex items-center justify-between mb-2'>
								<h4 className='font-semibold'>Member {index + 1}</h4>
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
									name={`teamMembers.${index}.name`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Dr. John Doe' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`teamMembers.${index}.position`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Position</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Training Coordinator' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`teamMembers.${index}.qualifications`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Qualifications</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Ph.D., M.Tech' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`teamMembers.${index}.specialization`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Specialization</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Career Development' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`teamMembers.${index}.image`}
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Profile Image</FormLabel>
											<FormControl>
												<div className='space-y-2'>
													<Input {...field} placeholder='Image URL (optional)' />
													<UploadButton
														onUpload={(url) => field.onChange(url)}
														buttonText='Upload Image'
														className='w-full'
													/>
													{field.value && (
														<div className='mt-2'>
															<img
																src={field.value}
																alt='Preview'
																className='w-20 h-20 rounded-full object-cover border-2 border-blue-200'
															/>
														</div>
													)}
												</div>
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
