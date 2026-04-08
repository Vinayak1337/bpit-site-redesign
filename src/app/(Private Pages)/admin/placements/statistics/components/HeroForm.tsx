'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updatePlacementStatistics, type PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

const GRADIENT_OPTIONS = [
	'from-blue-900 via-blue-800 to-blue-900',
	'from-purple-900 via-purple-800 to-purple-900',
	'from-green-900 via-green-800 to-green-900',
	'from-red-900 via-red-800 to-red-900',
	'from-indigo-900 via-indigo-800 to-indigo-900'
];

const ICON_OPTIONS = [
	'BarChart3',
	'TrendingUp',
	'Award',
	'Target',
	'Users',
	'Building2',
	'Briefcase',
	'GraduationCap'
];

interface HeroFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange?: (data: PlacementStatisticsData) => void;
}

export default function HeroForm({ initialData, pageSlug, onChange }: HeroFormProps) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			icon: initialData.hero?.icon || 'BarChart3',
			title: initialData.hero?.title || '',
			subtitle: initialData.hero?.subtitle || '',
			gradient: initialData.hero?.gradient || GRADIENT_OPTIONS[0]
		}
	});

	// Watch for changes and update preview in real-time
	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: PlacementStatisticsData = {
					...initialData,
					hero: {
						icon: values.icon || 'BarChart3',
						title: values.title || '',
						subtitle: values.subtitle || '',
						gradient: values.gradient || GRADIENT_OPTIONS[0]
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
				const updatedData: PlacementStatisticsData = {
					...initialData,
					hero: {
						icon: values.icon,
						title: values.title,
						subtitle: values.subtitle,
						gradient: values.gradient
					}
				};

				await updatePlacementStatistics(updatedData);
				
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
									{ICON_OPTIONS.map(icon => (
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
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Placement Statistics' />
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
								<Textarea {...field} placeholder='Data-driven insights into our placement success' rows={3} />
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
