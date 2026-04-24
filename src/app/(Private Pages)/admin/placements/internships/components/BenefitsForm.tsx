'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import type { InternshipsData, InternshipBenefit } from '@/app/(Private Pages)/actions/internships';
import { Plus, Trash2, Sparkles } from 'lucide-react';

interface BenefitsFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = ['Star', 'Award', 'Target', 'TrendingUp', 'Users', 'Lightbulb', 'Briefcase', 'GraduationCap', 'Zap', 'Trophy'];
const COLOR_OPTIONS = [
	{ value: 'from-blue-600 to-cyan-600', label: 'Blue to Cyan' },
	{ value: 'from-purple-600 to-pink-600', label: 'Purple to Pink' },
	{ value: 'from-green-600 to-emerald-600', label: 'Green to Emerald' },
	{ value: 'from-orange-600 to-red-600', label: 'Orange to Red' },
	{ value: 'from-indigo-600 to-blue-600', label: 'Indigo to Blue' },
	{ value: 'from-yellow-600 to-orange-600', label: 'Yellow to Orange' }
];

export default function BenefitsForm({ initialData, pageSlug, onChange }: BenefitsFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			benefits: initialData.benefits
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'benefits'
	});

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			onChange({
				...initialData,
				benefits: (values.benefits || []).filter((b): b is InternshipBenefit => 
					b !== undefined && !!b.icon && !!b.title && !!b.description && !!b.color
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
				benefits: values.benefits
			});

			if (result.success) {
				const freshData = await getInternshipsData();
				if (freshData) {
					form.reset({ benefits: freshData.benefits });
				}
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} else {
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		} catch (error) {
			console.error('Failed to save benefits:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6'>
			<div className='flex items-center space-x-3 border-b pb-4'>
				<Sparkles className='w-6 h-6 text-blue-600' />
				<h3 className='text-2xl font-bold'>Why Internships Benefits</h3>
			</div>

			<div className='space-y-6'>
				{fields.map((field, index) => (
					<div key={field.id} className='border rounded-lg p-4 space-y-4 bg-gray-50'>
						<div className='flex items-center justify-between'>
							<Label className='text-lg font-semibold'>Benefit {index + 1}</Label>
							<Button type='button' variant='destructive' size='sm' onClick={() => remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Icon</Label>
								<Select
									value={form.watch(`benefits.${index}.icon`)}
									onValueChange={value => form.setValue(`benefits.${index}.icon`, value)}>
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
								<Label>Color</Label>
								<Select
									value={form.watch(`benefits.${index}.color`)}
									onValueChange={value => form.setValue(`benefits.${index}.color`, value)}>
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

						<div>
							<Label>Title</Label>
							<Input {...form.register(`benefits.${index}.title`)} placeholder='Real-World Experience' />
						</div>

						<div>
							<Label>Description</Label>
							<Textarea 
								{...form.register(`benefits.${index}.description`)} 
								placeholder='Gain hands-on experience in real industry projects...'
								rows={3}
							/>
						</div>
					</div>
				))}
			</div>

			<Button
				type='button'
				variant='outline'
				onClick={() => append({ 
					icon: 'Star', 
					title: '', 
					description: '', 
					color: 'from-blue-600 to-cyan-600' 
				})}
				className='w-full'>
				<Plus className='w-4 h-4 mr-2' />
				Add Benefit
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
					{saveStatus === 'idle' && 'Save Benefits'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
