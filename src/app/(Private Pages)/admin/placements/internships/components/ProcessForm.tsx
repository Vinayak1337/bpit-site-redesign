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
import type { InternshipsData, ProcessStep } from '@/app/(Private Pages)/actions/internships';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

interface ProcessFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = ['CheckCircle', 'ClipboardCheck', 'UserCheck', 'FileCheck', 'Award', 'Target', 'Zap', 'Rocket', 'Calendar', 'Send'];

export default function ProcessForm({ initialData, pageSlug, onChange }: ProcessFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			process: initialData.process
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'process'
	});

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			onChange({
				...initialData,
				process: (values.process || []).filter((p): p is ProcessStep => 
					p !== undefined && !!p.title && !!p.description && !!p.icon
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
				process: values.process
			});

			if (result.success) {
				const freshData = await getInternshipsData();
				if (freshData) {
					form.reset({ process: freshData.process });
				}
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} else {
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		} catch (error) {
			console.error('Failed to save process:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6'>
			<div className='flex items-center space-x-3 border-b pb-4'>
				<CheckCircle className='w-6 h-6 text-blue-600' />
				<h3 className='text-2xl font-bold'>How Internships Work</h3>
			</div>

			<div className='space-y-6'>
				{fields.map((field, index) => (
					<div key={field.id} className='border rounded-lg p-4 space-y-4 bg-gray-50'>
						<div className='flex items-center justify-between'>
							<Label className='text-lg font-semibold'>Step {index + 1}</Label>
							<Button type='button' variant='destructive' size='sm' onClick={() => remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>

						<div>
							<Label>Icon</Label>
							<Select
								value={form.watch(`process.${index}.icon`)}
								onValueChange={value => form.setValue(`process.${index}.icon`, value)}>
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
							<Label>Title</Label>
							<Input {...form.register(`process.${index}.title`)} placeholder='Browse Opportunities' />
						</div>

						<div>
							<Label>Description</Label>
							<Textarea 
								{...form.register(`process.${index}.description`)} 
								placeholder='Explore internship opportunities from various companies...'
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
					title: '', 
					description: '', 
					icon: 'CheckCircle' 
				})}
				className='w-full'>
				<Plus className='w-4 h-4 mr-2' />
				Add Process Step
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
					{saveStatus === 'idle' && 'Save Process Steps'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
