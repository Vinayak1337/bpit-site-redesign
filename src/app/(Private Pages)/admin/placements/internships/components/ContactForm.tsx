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
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';
import { Plus, Trash2, Phone } from 'lucide-react';

interface ContactFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = ['ArrowRight', 'Send', 'MessageCircle', 'Calendar', 'FileText', 'ExternalLink', 'PhoneCall'];
const GRADIENT_OPTIONS = [
	{ value: 'from-blue-600 to-cyan-600', label: 'Blue to Cyan' },
	{ value: 'from-purple-600 to-pink-600', label: 'Purple to Pink' },
	{ value: 'from-green-600 to-emerald-600', label: 'Green to Emerald' },
	{ value: 'from-orange-600 to-red-600', label: 'Orange to Red' },
	{ value: 'from-indigo-600 to-blue-600', label: 'Indigo to Blue' },
	{ value: 'from-yellow-600 to-orange-600', label: 'Yellow to Orange' }
];

export default function ContactForm({ initialData, pageSlug, onChange }: ContactFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm({
		defaultValues: {
			contact: initialData.contact
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'contact.buttons'
	});

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			if (values.contact) {
				onChange({
					...initialData,
					contact: values.contact as any
				});
			}
		});
		return () => subscription.unsubscribe();
	}, [form, initialData, onChange]);

	const onSubmit = async (values: any) => {
		try {
			setSaveStatus('saving');
			const admin = await requireAdmin();

			const result = await updateInternshipsData({
				...initialData,
				contact: values.contact
			}, admin.id);

			if (result.success) {
				const freshData = await getInternshipsData();
				if (freshData) {
					form.reset({ contact: freshData.contact });
				}
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} else {
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		} catch (error) {
			console.error('Failed to save contact:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6'>
			<div className='flex items-center space-x-3 border-b pb-4'>
				<Phone className='w-6 h-6 text-blue-600' />
				<h3 className='text-2xl font-bold'>Need Guidance Contact</h3>
			</div>

			<div className='space-y-4'>
				<div>
					<Label>Title</Label>
					<Input {...form.register('contact.title')} placeholder='Need Guidance?' />
				</div>

				<div>
					<Label>Subtitle</Label>
					<Textarea 
						{...form.register('contact.subtitle')} 
						placeholder='Our team is here to help you find the perfect internship opportunity.'
						rows={2}
					/>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div>
						<Label>Phone</Label>
						<Input {...form.register('contact.phone')} placeholder='+91 11 2778 1200' />
					</div>
					<div>
						<Label>Email</Label>
						<Input {...form.register('contact.email')} placeholder='placements@bpitindia.edu.in' />
					</div>
				</div>

				<div>
					<Label>Gradient</Label>
					<Select
						value={form.watch('contact.gradient')}
						onValueChange={value => form.setValue('contact.gradient', value)}>
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

			<div className='border-t pt-6'>
				<Label className='text-lg font-semibold mb-4 block'>CTA Buttons</Label>
				<div className='space-y-4'>
					{fields.map((field, index) => (
						<div key={field.id} className='border rounded-lg p-4 space-y-4 bg-gray-50'>
							<div className='flex items-center justify-between'>
								<Label className='font-semibold'>Button {index + 1}</Label>
								<Button type='button' variant='destructive' size='sm' onClick={() => remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div>
									<Label>Text</Label>
									<Input {...form.register(`contact.buttons.${index}.text`)} placeholder='Contact Us' />
								</div>
								<div>
									<Label>Icon</Label>
									<Select
										value={form.watch(`contact.buttons.${index}.icon`)}
										onValueChange={value => form.setValue(`contact.buttons.${index}.icon`, value)}>
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
								<div className='col-span-2'>
									<Label>Variant</Label>
									<Select
										value={form.watch(`contact.buttons.${index}.variant`)}
										onValueChange={value => form.setValue(`contact.buttons.${index}.variant`, value as 'primary' | 'secondary')}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='primary'>Primary (White)</SelectItem>
											<SelectItem value='secondary'>Secondary (Transparent)</SelectItem>
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
					onClick={() => append({ text: '', icon: 'ArrowRight', variant: 'primary' })}
					className='w-full mt-4'>
					<Plus className='w-4 h-4 mr-2' />
					Add Button
				</Button>
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
					{saveStatus === 'idle' && 'Save Contact Section'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
