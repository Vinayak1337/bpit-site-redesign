'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import { updateTrainingPlacement, type TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

const COLOR_OPTIONS = ['blue', 'green', 'purple', 'orange'];

interface ProgramsFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function ProgramsForm({ initialData, pageSlug, onChange }: ProgramsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			trainingTitle: initialData.trainingTitle || '',
			trainingDescription: initialData.trainingDescription || '',
			trainingPrograms: initialData.trainingPrograms || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'trainingPrograms'
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: TrainingPlacementData = {
					...initialData,
					trainingTitle: values.trainingTitle || '',
					trainingDescription: values.trainingDescription || '',
					trainingPrograms: (values.trainingPrograms || []).filter(Boolean) as any
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
					trainingTitle: values.trainingTitle,
					trainingDescription: values.trainingDescription,
					trainingPrograms: values.trainingPrograms
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
						name='trainingTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Training Programs' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='trainingDescription'
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
						<h3 className='text-lg font-semibold'>Programs</h3>
						<Button
							type='button'
							onClick={() => append({ id: Date.now().toString(), title: '', description: '', duration: '', participants: '', icon: 'Users', color: 'blue' })}
							size='sm'>
							<Plus className='w-4 h-4 mr-2' />
							Add Program
						</Button>
					</div>

					{fields.map((field, index) => (
						<div key={field.id} className='p-4 border rounded-lg space-y-4'>
							<div className='flex items-center justify-between mb-2'>
								<h4 className='font-semibold'>Program {index + 1}</h4>
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
									name={`trainingPrograms.${index}.title`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Aptitude Training' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`trainingPrograms.${index}.duration`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Duration</FormLabel>
											<FormControl>
												<Input {...field} placeholder='3 months' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`trainingPrograms.${index}.participants`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Participants</FormLabel>
											<FormControl>
												<Input {...field} placeholder='500+ students' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`trainingPrograms.${index}.icon`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{SUPPORTED_ICON_NAMES.slice(0, 20).map(icon => (
														<SelectItem key={icon} value={icon}>
															{icon}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`trainingPrograms.${index}.color`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Color</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{COLOR_OPTIONS.map(color => (
														<SelectItem key={color} value={color}>
															{color}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`trainingPrograms.${index}.description`}
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea {...field} rows={3} placeholder='Program description...' />
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
