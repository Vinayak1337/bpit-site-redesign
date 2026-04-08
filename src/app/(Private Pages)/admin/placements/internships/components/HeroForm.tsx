'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { updateInternshipsData, getInternshipsData } from '@/app/(Private Pages)/actions/internships';
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';
import { Sparkles } from 'lucide-react';

interface HeroFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = ['Briefcase', 'GraduationCap', 'Users', 'Target', 'Award', 'TrendingUp', 'Zap', 'Star'];
const GRADIENT_OPTIONS = [
	{ value: 'from-blue-600 to-blue-800', label: 'Blue' },
	{ value: 'from-purple-600 to-blue-800', label: 'Purple to Blue' },
	{ value: 'from-green-600 to-blue-800', label: 'Green to Blue' },
	{ value: 'from-orange-600 to-red-800', label: 'Orange to Red' },
	{ value: 'from-pink-600 to-purple-800', label: 'Pink to Purple' },
	{ value: 'from-indigo-600 to-blue-800', label: 'Indigo to Blue' }
];

export default function HeroForm({ initialData, pageSlug, onChange }: HeroFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			icon: initialData.hero.icon,
			title: initialData.hero.title,
			subtitle: initialData.hero.subtitle,
			gradient: initialData.hero.gradient
		}
	});

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			onChange({
				...initialData,
				hero: {
					icon: values.icon || 'Briefcase',
					title: values.title || '',
					subtitle: values.subtitle || '',
					gradient: values.gradient || 'from-blue-600 to-blue-800'
				}
			});
		});
		return () => subscription.unsubscribe();
	}, [form, initialData, onChange]);

	const onSubmit = async (values: any) => {
		try {
			setSaveStatus('saving');
			const admin = await requireAdmin();

			const result = await updateInternshipsData({
				...initialData,
				hero: {
					icon: values.icon,
					title: values.title,
					subtitle: values.subtitle,
					gradient: values.gradient
				}
			}, admin.id);

			if (result.success) {
				// Fetch fresh data
				const freshData = await getInternshipsData();
				if (freshData) {
					form.reset({
						icon: freshData.hero.icon,
						title: freshData.hero.title,
						subtitle: freshData.hero.subtitle,
						gradient: freshData.hero.gradient
					});
				}
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} else {
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		} catch (error) {
			console.error('Failed to save hero:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6'>
			<div className='flex items-center space-x-3 border-b pb-4'>
				<Sparkles className='w-6 h-6 text-blue-600' />
				<h3 className='text-2xl font-bold'>Hero Section</h3>
			</div>

			<div className='space-y-4'>
				<div>
					<Label>Icon</Label>
					<Select
						value={form.watch('icon')}
						onValueChange={value => form.setValue('icon', value)}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{ICON_OPTIONS.map(icon => (
								<SelectItem key={icon} value={icon}>
									{icon}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label>Title</Label>
					<Input {...form.register('title')} placeholder='Internship Opportunities' />
				</div>

				<div>
					<Label>Subtitle</Label>
					<Textarea
						{...form.register('subtitle')}
						placeholder='Gain practical experience and kickstart your career'
						rows={3}
					/>
				</div>

				<div>
					<Label>Background Gradient</Label>
					<Select
						value={form.watch('gradient')}
						onValueChange={value => form.setValue('gradient', value)}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{GRADIENT_OPTIONS.map(option => (
								<SelectItem key={option.value} value={option.value}>
									<div className='flex items-center space-x-2'>
										<div className={`w-8 h-4 rounded bg-gradient-to-r ${option.value}`} />
										<span>{option.label}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='flex items-center gap-4'>
				<Button
					type='submit'
					className={`w-full ${
						saveStatus === 'saved'
							? 'bg-green-600 hover:bg-green-700'
							: saveStatus === 'error'
								? 'bg-red-600 hover:bg-red-700'
								: 'bg-blue-600 hover:bg-blue-700'
					}`}
					disabled={saveStatus === 'saving'}>
					{saveStatus === 'saving' && 'Saving...'}
					{saveStatus === 'saved' && '✓ Saved Successfully'}
					{saveStatus === 'error' && 'Error - Try Again'}
					{saveStatus === 'idle' && 'Save Hero Section'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
