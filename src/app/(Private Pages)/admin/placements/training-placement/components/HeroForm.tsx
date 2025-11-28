'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import { updateTrainingPlacement, type TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';

const GRADIENT_OPTIONS = [
	'from-blue-900 via-blue-800 to-blue-900',
	'from-purple-900 via-purple-800 to-purple-900',
	'from-green-900 via-green-800 to-green-900',
	'from-red-900 via-red-800 to-red-900'
];

interface HeroFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

export default function HeroForm({ initialData, pageSlug, onChange }: HeroFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			icon: initialData.hero?.icon || 'Users',
			title: initialData.hero?.title || '',
			subtitle: initialData.hero?.subtitle || '',
			gradient: initialData.hero?.gradient || GRADIENT_OPTIONS[0],
			iconColor: initialData.hero?.iconColor || 'white',
			textColor: initialData.hero?.textColor || 'white'
		}
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: TrainingPlacementData = {
					...initialData,
					hero: {
						icon: values.icon || 'Users',
						title: values.title || '',
						subtitle: values.subtitle || '',
						gradient: values.gradient || GRADIENT_OPTIONS[0],
						iconColor: values.iconColor || 'white',
						textColor: values.textColor || 'white'
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
					hero: {
						icon: values.icon,
						title: values.title,
						subtitle: values.subtitle,
						gradient: values.gradient,
						iconColor: values.iconColor,
						textColor: values.textColor
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
						name='icon'
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
						name='gradient'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background Gradient</FormLabel>
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
						name='title'
						render={({ field }) => (
							<FormItem className='md:col-span-2'>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder='About Training & Placement' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='subtitle'
						render={({ field }) => (
							<FormItem className='md:col-span-2'>
								<FormLabel>Subtitle</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Empowering students...' />
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
