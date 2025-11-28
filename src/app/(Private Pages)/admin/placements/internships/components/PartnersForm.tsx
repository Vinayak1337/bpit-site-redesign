'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import UploadButton from '@/components/cloudinary/upload-button';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { updateInternshipsData, getInternshipsData } from '@/app/(Private Pages)/actions/internships';
import type { InternshipsData, InternshipOpportunity } from '@/app/(Private Pages)/actions/internships';
import { Plus, Trash2, X, Building2 } from 'lucide-react';
import Image from 'next/image';

interface PartnersFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

export default function PartnersForm({ initialData, pageSlug, onChange }: PartnersFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
	const [filters, setFilters] = useState<string[]>(initialData.filters);

	const form = useForm({
		defaultValues: {
			opportunities: initialData.opportunities
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'opportunities'
	});

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			onChange({
				...initialData,
				opportunities: (values.opportunities || []).filter((o): o is InternshipOpportunity => 
					o !== undefined && !!o.company && !!o.title
				),
				filters: filters
			});
		});
		return () => subscription.unsubscribe();
	}, [form, initialData, onChange, filters]);

	const onSubmit = async (values: any) => {
		try {
			setSaveStatus('saving');
			const admin = await requireAdmin();

			const result = await updateInternshipsData({
				...initialData,
				opportunities: values.opportunities,
				filters: filters
			}, admin.id);

			if (result.success) {
				const freshData = await getInternshipsData();
				if (freshData) {
					form.reset({ opportunities: freshData.opportunities });
					setFilters(freshData.filters);
				}
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} else {
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		} catch (error) {
			console.error('Failed to save partners:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	const handleDomainAdd = (oppIndex: number) => {
		const currentDomains = form.watch(`opportunities.${oppIndex}.domains`) || [];
		form.setValue(`opportunities.${oppIndex}.domains`, [...currentDomains, '']);
	};

	const handleDomainRemove = (oppIndex: number, domainIndex: number) => {
		const currentDomains = form.watch(`opportunities.${oppIndex}.domains`) || [];
		form.setValue(
			`opportunities.${oppIndex}.domains`,
			currentDomains.filter((_, i) => i !== domainIndex)
		);
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6 max-h-[80vh] overflow-y-auto'>
			<div className='flex items-center space-x-3 border-b pb-4'>
				<Building2 className='w-6 h-6 text-blue-600' />
				<h3 className='text-2xl font-bold'>Industry Partners & Opportunities</h3>
			</div>

			{/* Filters Section */}
			<div className='border rounded-lg p-4 bg-blue-50'>
				<Label className='text-lg font-semibold mb-3 block'>Category Filters</Label>
				<div className='space-y-2'>
					{filters.map((filter, index) => (
						<div key={index} className='flex items-center gap-2'>
							<Input
								value={filter}
								onChange={e => {
									const newFilters = [...filters];
									newFilters[index] = e.target.value;
									setFilters(newFilters);
								}}
								placeholder='e.g., IT, Marketing, Finance'
								className='flex-1'
							/>
							<Button 
								type='button' 
								variant='destructive' 
								size='sm' 
								onClick={() => setFilters(filters.filter((_, i) => i !== index))}>
								<X className='w-4 h-4' />
							</Button>
						</div>
					))}
				</div>
				<Button
					type='button'
					variant='outline'
					size='sm'
					onClick={() => setFilters([...filters, ''])}
					className='mt-2'>
					<Plus className='w-4 h-4 mr-2' />
					Add Filter
				</Button>
			</div>

			{/* Opportunities Section */}
			<div className='space-y-6'>
				<Label className='text-lg font-semibold'>Internship Opportunities</Label>
				{fields.map((field, index) => (
					<div key={field.id} className='border rounded-lg p-4 space-y-4 bg-gray-50'>
						<div className='flex items-center justify-between'>
							<Label className='text-lg font-semibold'>Opportunity {index + 1}</Label>
							<Button type='button' variant='destructive' size='sm' onClick={() => remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Company Name</Label>
								<Input {...form.register(`opportunities.${index}.company`)} placeholder='Google' />
							</div>
							<div>
								<Label>Job Title</Label>
								<Input {...form.register(`opportunities.${index}.title`)} placeholder='Software Engineer Intern' />
							</div>
							<div>
								<Label>Type</Label>
								<Input {...form.register(`opportunities.${index}.type`)} placeholder='Full-time' />
							</div>
							<div>
								<Label>Location</Label>
								<Input {...form.register(`opportunities.${index}.location`)} placeholder='Bangalore, India' />
							</div>
							<div>
								<Label>Category</Label>
								<Input {...form.register(`opportunities.${index}.category`)} placeholder='IT' />
							</div>
						</div>

						<div>
							<Label>Description</Label>
							<Textarea 
								{...form.register(`opportunities.${index}.description`)} 
								placeholder='Brief description of the internship opportunity...'
								rows={2}
							/>
						</div>

						{/* Logo Upload */}
						<div>
							<Label>Company Logo</Label>
							<div className='flex items-center gap-4 mt-2'>
								{form.watch(`opportunities.${index}.logo`) && (
									<div className='relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center'>
										<Image
											src={form.watch(`opportunities.${index}.logo`)}
											alt='Logo'
											width={80}
											height={80}
											className='object-contain'
										/>
									</div>
								)}
								<UploadButton
									onUpload={(url: string) => {
										form.setValue(`opportunities.${index}.logo`, url);
									}}
									folder='internships/logos'
								/>
							</div>
						</div>

						{/* Domains */}
						<div>
							<Label>Domains/Skills</Label>
							<div className='space-y-2 mt-2'>
								{(form.watch(`opportunities.${index}.domains`) || []).map((domain, domainIndex) => (
									<div key={domainIndex} className='flex items-center gap-2'>
										<Input
											value={domain}
											onChange={e => {
												const currentDomains = form.watch(`opportunities.${index}.domains`) || [];
												const newDomains = [...currentDomains];
												newDomains[domainIndex] = e.target.value;
												form.setValue(`opportunities.${index}.domains`, newDomains);
											}}
											placeholder='e.g., React, Python, ML'
											className='flex-1'
										/>
										<Button
											type='button'
											variant='destructive'
											size='sm'
											onClick={() => handleDomainRemove(index, domainIndex)}>
											<X className='w-4 h-4' />
										</Button>
									</div>
								))}
							</div>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => handleDomainAdd(index)}
								className='mt-2'>
								<Plus className='w-4 h-4 mr-2' />
								Add Domain
							</Button>
						</div>
					</div>
				))}
			</div>

			<Button
				type='button'
				variant='outline'
				onClick={() => append({
					company: '',
					title: '',
					type: 'Full-time',
					location: '',
					description: '',
					logo: '',
					category: '',
					domains: []
				})}
				className='w-full'>
				<Plus className='w-4 h-4 mr-2' />
				Add Opportunity
			</Button>

			<div className='flex items-center gap-4 sticky bottom-0 bg-white pt-4 border-t'>
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
					{saveStatus === 'idle' && 'Save Partners & Opportunities'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
