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
import { updateRecruitersData, type RecruitersData } from '@/app/(Private Pages)/actions/recruiters';

const GRADIENT_OPTIONS = [
	'from-blue-900 via-blue-800 to-blue-900',
	'from-purple-900 via-purple-800 to-purple-900',
	'from-green-900 via-green-800 to-green-900',
	'from-red-900 via-red-800 to-red-900',
	'from-indigo-900 via-indigo-800 to-indigo-900'
];

interface CTAFormProps {
	initialData: RecruitersData;
	pageSlug: string;
	onChange?: (data: RecruitersData) => void;
}

export default function CTAForm({ initialData, pageSlug, onChange }: CTAFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			title: initialData.cta?.title || '',
			subtitle: initialData.cta?.subtitle || '',
			gradient: initialData.cta?.gradient || GRADIENT_OPTIONS[0],
			buttons: initialData.cta?.buttons || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'buttons'
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: RecruitersData = {
					...initialData,
					cta: {
						title: values.title || '',
						subtitle: values.subtitle || '',
						gradient: values.gradient || GRADIENT_OPTIONS[0],
						buttons: (values.buttons || []).filter(Boolean) as any
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
				const updatedData: RecruitersData = {
					...initialData,
					cta: {
						title: values.title,
						subtitle: values.subtitle,
						gradient: values.gradient,
						buttons: values.buttons
					}
				};

				await updateRecruitersData(updatedData);
				
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
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Want to Partner with BPIT?' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='subtitle'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subtitle</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder='Join our network of industry leaders' rows={3} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='gradient'
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

				<div className='space-y-4'>
					<h4 className='font-semibold'>CTA Buttons</h4>
					{fields.map((field, index) => (
						<div key={field.id} className='p-4 border rounded-lg space-y-4'>
							<div className='flex items-center justify-between'>
								<h5 className='font-medium'>Button {index + 1}</h5>
								<Button
									type='button'
									variant='ghost'
									size='sm'
									onClick={() => remove(index)}
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>

							<FormField
								control={form.control}
								name={`buttons.${index}.text`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Button Text</FormLabel>
										<FormControl>
											<Input {...field} placeholder='Contact Us' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name={`buttons.${index}.icon`}
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
													{SUPPORTED_ICON_NAMES.map(icon => (
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
									name={`buttons.${index}.variant`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Variant</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='primary'>Primary</SelectItem>
													<SelectItem value='secondary'>Secondary</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					))}
				</div>

				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							text: '',
							icon: 'Mail',
							variant: 'primary'
						})
					}
				>
					<Plus className='h-4 w-4 mr-2' />
					Add Button
				</Button>

				<div className='flex items-center space-x-2'>
					<Button type='submit' disabled={isPending}>
						{isPending ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
					</Button>
					{saveStatus === 'error' && (
						<span className='text-sm text-red-600'>Failed to save</span>
					)}
				</div>
			</form>
		</Form>
	);
}
