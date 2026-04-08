'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { updateInternshipsData, getInternshipsData } from '@/app/(Private Pages)/actions/internships';
import type { InternshipsData, InternshipStat } from '@/app/(Private Pages)/actions/internships';
import { Plus, Trash2, BarChart3 } from 'lucide-react';

interface StatsFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = ['TrendingUp', 'Users', 'Building2', 'Award', 'Target', 'Star', 'Zap', 'BarChart3'];
const COLOR_OPTIONS = [
	{ value: 'from-blue-500 to-cyan-600', label: 'Blue to Cyan' },
	{ value: 'from-green-500 to-emerald-600', label: 'Green to Emerald' },
	{ value: 'from-purple-500 to-violet-600', label: 'Purple to Violet' },
	{ value: 'from-orange-500 to-red-600', label: 'Orange to Red' }
];

export default function StatsForm({ initialData, pageSlug, onChange }: StatsFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			stats: initialData.stats
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			onChange({
				...initialData,
				stats: (values.stats || []).filter((s): s is InternshipStat => 
					s !== undefined && !!s.icon && !!s.value && !!s.label && !!s.color
				)
			});
		});
		return () => subscription.unsubscribe();
	}, [form, initialData, onChange]);

	const onSubmit = async (values: any) => {
		try {
			setSaveStatus('saving');

			const result = await updateInternshipsData({
				...initialData,
				stats: values.stats
			});

			if (result.success) {
				const freshData = await getInternshipsData();
				if (freshData) {
					form.reset({ stats: freshData.stats });
				}
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} else {
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		} catch (error) {
			console.error('Failed to save stats:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6'>
			<div className='flex items-center space-x-3 border-b pb-4'>
				<BarChart3 className='w-6 h-6 text-blue-600' />
				<h3 className='text-2xl font-bold'>Stats Cards</h3>
			</div>

			<div className='space-y-6'>
				{fields.map((field, index) => (
					<div key={field.id} className='border rounded-lg p-4 space-y-4 bg-gray-50'>
						<div className='flex items-center justify-between'>
							<Label className='text-lg font-semibold'>Stat Card {index + 1}</Label>
							<Button type='button' variant='destructive' size='sm' onClick={() => remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Icon</Label>
								<Select
									value={form.watch(`stats.${index}.icon`)}
									onValueChange={value => form.setValue(`stats.${index}.icon`, value)}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{ICON_OPTIONS.map(icon => (
											<SelectItem key={icon} value={icon}>{icon}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label>Value</Label>
								<Input {...form.register(`stats.${index}.value`)} placeholder='500+' />
							</div>
							<div>
								<Label>Label</Label>
								<Input {...form.register(`stats.${index}.label`)} placeholder='Active Internships' />
							</div>
							<div>
								<Label>Color</Label>
								<Select
									value={form.watch(`stats.${index}.color`)}
									onValueChange={value => form.setValue(`stats.${index}.color`, value)}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{COLOR_OPTIONS.map(option => (
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
					</div>
				))}
			</div>

			<Button
				type='button'
				variant='outline'
				onClick={() => append({ icon: 'TrendingUp', value: '', label: '', color: 'from-blue-500 to-cyan-600' })}
				className='w-full'>
				<Plus className='w-4 h-4 mr-2' />
				Add Stat Card
			</Button>

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
					{saveStatus === 'idle' && 'Save Stats Cards'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
