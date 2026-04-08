'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateRecruitersData, type RecruitersData } from '@/app/(Private Pages)/actions/recruiters';

const TYPE_OPTIONS = ['MNC', 'Product Giant', 'Consulting', 'Banking', 'Unicorn', 'R&D', 'Fintech', 'Startup'];

interface PartnersFormProps {
	initialData: RecruitersData;
	pageSlug: string;
	onChange?: (data: RecruitersData) => void;
}

export default function PartnersForm({ initialData, pageSlug, onChange }: PartnersFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			recruiters: initialData.recruiters || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'recruiters'
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: RecruitersData = {
					...initialData,
					recruiters: (values.recruiters || []).filter(Boolean) as any
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
					recruiters: values.recruiters
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
				<div className='space-y-6'>
					{fields.map((field, index) => (
						<div key={field.id} className='p-4 border rounded-lg space-y-4'>
							<div className='flex items-center justify-between'>
								<h4 className='font-semibold'>Partner Company {index + 1}</h4>
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
								name={`recruiters.${index}.name`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name</FormLabel>
										<FormControl>
											<Input {...field} placeholder='Google' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name={`recruiters.${index}.type`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Type</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{TYPE_OPTIONS.map(type => (
														<SelectItem key={type} value={type}>
															{type}
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
									name={`recruiters.${index}.category`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Technology' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name={`recruiters.${index}.sector`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sector</FormLabel>
										<FormControl>
											<Input {...field} placeholder='Cloud & AI Services' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`recruiters.${index}.description`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder='Company description...' rows={3} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name={`recruiters.${index}.location`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<Input {...field} placeholder='California, USA' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`recruiters.${index}.established`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Established</FormLabel>
											<FormControl>
												<Input {...field} placeholder='1998' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name={`recruiters.${index}.website`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website URL</FormLabel>
										<FormControl>
											<Input {...field} type='url' placeholder='https://www.example.com' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`recruiters.${index}.logo`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Logo URL (Optional)</FormLabel>
										<FormControl>
											<Input {...field} type='url' placeholder='https://...' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					))}
				</div>

				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							name: '',
							logo: '',
							category: '',
							sector: '',
							location: '',
							type: 'MNC',
							established: '',
							website: '',
							description: ''
						})
					}
				>
					<Plus className='h-4 w-4 mr-2' />
					Add Partner Company
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
