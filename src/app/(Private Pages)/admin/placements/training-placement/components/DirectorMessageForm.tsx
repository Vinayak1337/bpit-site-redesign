'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UploadButton from '@/components/cloudinary/upload-button';
import { updateTrainingPlacement, type TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

const GRADIENT_OPTIONS = [
	'from-blue-500 to-blue-700',
	'from-purple-500 to-purple-700',
	'from-green-500 to-green-700'
];

interface DirectorMessageFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function DirectorMessageForm({ initialData, pageSlug, onChange }: DirectorMessageFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			name: initialData.directorMessage?.name || '',
			position: initialData.directorMessage?.position || '',
			initials: initialData.directorMessage?.initials || '',
			gradientColor: initialData.directorMessage?.gradientColor || GRADIENT_OPTIONS[0],
			message1: initialData.directorMessage?.message1 || '',
			message2: initialData.directorMessage?.message2 || '',
			image: initialData.directorMessage?.image || ''
		}
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: TrainingPlacementData = {
					...initialData,
					directorMessage: {
						name: values.name || '',
						position: values.position || '',
						initials: values.initials || '',
						gradientColor: values.gradientColor || GRADIENT_OPTIONS[0],
						message1: values.message1 || '',
						message2: values.message2 || '',
						image: values.image || ''
					}
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
					directorMessage: {
						name: values.name,
						position: values.position,
						initials: values.initials,
						gradientColor: values.gradientColor,
						message1: values.message1,
						message2: values.message2,
						image: values.image
					}
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Prof. Name' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='position'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Position</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Director T&P' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='initials'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Initials</FormLabel>
								<FormControl>
									<Input {...field} placeholder='AK' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='gradientColor'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Gradient Color</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{GRADIENT_OPTIONS.map(gradient => (
											<SelectItem key={gradient} value={gradient}>
												{gradient}
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
						name='image'
						render={({ field }) => (
							<FormItem className='md:col-span-2'>
								<FormLabel>Director Image</FormLabel>
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
													alt='Director preview'
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

					<FormField
						control={form.control}
						name='message1'
						render={({ field }) => (
							<FormItem className='md:col-span-2'>
								<FormLabel>Message Paragraph 1</FormLabel>
								<FormControl>
									<Textarea {...field} rows={4} placeholder='First message paragraph...' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='message2'
						render={({ field }) => (
							<FormItem className='md:col-span-2'>
								<FormLabel>Message Paragraph 2</FormLabel>
								<FormControl>
									<Textarea {...field} rows={4} placeholder='Second message paragraph...' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
