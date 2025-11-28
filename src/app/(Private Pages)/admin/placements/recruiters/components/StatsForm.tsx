'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import { updateRecruitersData, type RecruitersData } from '@/app/(Private Pages)/actions/recruiters';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

const COLOR_OPTIONS = [
	'from-blue-500 to-blue-700',
	'from-purple-500 to-purple-700',
	'from-green-500 to-green-700',
	'from-red-500 to-red-700',
	'from-orange-500 to-orange-700',
	'from-pink-500 to-pink-700',
	'from-indigo-500 to-indigo-700',
	'from-teal-500 to-teal-700'
];

interface StatsFormProps {
	initialData: RecruitersData;
	pageSlug: string;
	onChange?: (data: RecruitersData) => void;
}

export default function StatsForm({ initialData, pageSlug, onChange }: StatsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			stats: initialData.stats || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: RecruitersData = {
					...initialData,
					stats: (values.stats || []).filter(Boolean) as any
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
				const admin = await requireAdmin();

				const updatedData: RecruitersData = {
					...initialData,
					stats: values.stats
				};

				await updateRecruitersData(updatedData, admin.id);
				
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
				<div className='space-y-4'>
					{fields.map((field, index) => (
						<div key={field.id} className='p-4 border rounded-lg space-y-4'>
							<div className='flex items-center justify-between'>
								<h4 className='font-semibold'>Stat Card {index + 1}</h4>
								<Button
									type='button'
									variant='ghost'
									size='sm'
									onClick={() => remove(index)}
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name={`stats.${index}.icon`}
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
									name={`stats.${index}.color`}
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
							</div>

							<FormField
								control={form.control}
								name={`stats.${index}.value`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Value</FormLabel>
										<FormControl>
											<Input {...field} placeholder='500+' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`stats.${index}.label`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Label</FormLabel>
										<FormControl>
											<Input {...field} placeholder='Partner Companies' />
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
							icon: 'TrendingUp',
							value: '',
							label: '',
							color: COLOR_OPTIONS[0]
						})
					}
				>
					<Plus className='h-4 w-4 mr-2' />
					Add Stat Card
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
