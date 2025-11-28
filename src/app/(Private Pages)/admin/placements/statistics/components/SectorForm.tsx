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
import { updatePlacementStatistics, getPlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import type { PlacementStatisticsData, SectorWiseData } from '@/app/(Private Pages)/actions/placement-statistics';
import { Plus, Trash2, PieChart, X } from 'lucide-react';

interface SectorFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange: (data: PlacementStatisticsData) => void;
}

const GRADIENT_OPTIONS = [
	{ value: 'from-blue-500 to-cyan-600', label: 'Blue to Cyan' },
	{ value: 'from-green-500 to-emerald-600', label: 'Green to Emerald' },
	{ value: 'from-purple-500 to-violet-600', label: 'Purple to Violet' },
	{ value: 'from-orange-500 to-red-600', label: 'Orange to Red' },
	{ value: 'from-pink-500 to-rose-600', label: 'Pink to Rose' },
	{ value: 'from-indigo-500 to-blue-600', label: 'Indigo to Blue' }
];

interface SectorFormData {
	sectors: {
		sector: string;
		percentage: number;
		companies: string[];
		color: string;
		companyInput: string;
	}[];
}

export default function SectorForm({
	initialData,
	pageSlug,
	onChange
}: SectorFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm<SectorFormData>({
		defaultValues: {
			sectors: (initialData.sectorWiseData || []).map(s => ({
				...s,
				companyInput: ''
			}))
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'sectors'
	});

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			if (!values.sectors) return;

			const sectorWiseData: SectorWiseData[] = values.sectors.map(s => ({
				sector: s?.sector || '',
				percentage: s?.percentage || 0,
				companies: (s?.companies || []).filter((c): c is string => !!c),
				color: s?.color || 'from-blue-500 to-cyan-600'
			}));

			onChange({
				...initialData,
				sectorWiseData
			});
		});

		return () => subscription.unsubscribe();
	}, [form, initialData, onChange]);

	const onSubmit = async (values: SectorFormData) => {
		try {
			setSaveStatus('saving');

			const sectorWiseData: SectorWiseData[] = values.sectors.map(s => ({
				sector: s.sector,
				percentage: s.percentage,
				companies: (s.companies || []).filter((c): c is string => !!c),
				color: s.color
			}));

			const result = await updatePlacementStatistics({
				...initialData,
				sectorWiseData
			});

			if (result.success) {
				// Fetch fresh data from DB
				const freshData = await getPlacementStatistics();
				if (freshData) {
					form.reset({
						sectors: (freshData.sectorWiseData || []).map(s => ({
							...s,
							companyInput: ''
						}))
					});
				}
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} else {
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		} catch (error) {
			console.error('Failed to save sector-wise data:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	const addCompany = (sectorIndex: number) => {
		const input = form.getValues(`sectors.${sectorIndex}.companyInput`);
		if (!input.trim()) return;

		const companies = form.getValues(`sectors.${sectorIndex}.companies`) || [];
		companies.push(input.trim());
		form.setValue(`sectors.${sectorIndex}.companies`, companies);
		form.setValue(`sectors.${sectorIndex}.companyInput`, '');
	};

	const removeCompany = (sectorIndex: number, companyIndex: number) => {
		const companies = form.getValues(`sectors.${sectorIndex}.companies`) || [];
		companies.splice(companyIndex, 1);
		form.setValue(`sectors.${sectorIndex}.companies`, companies);
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6'>
			<div className='flex items-center space-x-3 border-b pb-4'>
				<PieChart className='w-6 h-6 text-blue-600' />
				<h3 className='text-2xl font-bold'>Sector-wise Distribution</h3>
			</div>

			<div className='space-y-6'>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className='border rounded-lg p-4 space-y-4 bg-gray-50'>
						<div className='flex items-center justify-between'>
							<Label className='text-lg font-semibold'>Sector {index + 1}</Label>
							<Button
								type='button'
								variant='destructive'
								size='sm'
								onClick={() => remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Sector Name</Label>
								<Input
									{...form.register(`sectors.${index}.sector`)}
									placeholder='IT Services'
								/>
							</div>
							<div>
								<Label>Percentage</Label>
								<Input
									type='number'
									step='0.1'
									{...form.register(`sectors.${index}.percentage`, {
										valueAsNumber: true
									})}
									placeholder='35'
								/>
							</div>
						</div>

						<div>
							<Label>Gradient Color</Label>
							<Select
								value={form.watch(`sectors.${index}.color`)}
								onValueChange={value =>
									form.setValue(`sectors.${index}.color`, value)
								}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{GRADIENT_OPTIONS.map(option => (
										<SelectItem key={option.value} value={option.value}>
											<div className='flex items-center space-x-2'>
												<div
													className={`w-8 h-4 rounded bg-gradient-to-r ${option.value}`}
												/>
												<span>{option.label}</span>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label>Companies</Label>
							<div className='flex space-x-2 mb-2'>
								<Input
									value={form.watch(`sectors.${index}.companyInput`) || ''}
									onChange={e =>
										form.setValue(`sectors.${index}.companyInput`, e.target.value)
									}
									placeholder='Add company name'
									onKeyPress={e => {
										if (e.key === 'Enter') {
											e.preventDefault();
											addCompany(index);
										}
									}}
								/>
								<Button
									type='button'
									onClick={() => addCompany(index)}
									size='sm'>
									<Plus className='w-4 h-4' />
								</Button>
							</div>
							<div className='flex flex-wrap gap-2'>
								{(form.watch(`sectors.${index}.companies`) || []).map(
									(company, companyIdx) => (
										<span
											key={companyIdx}
											className='px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center space-x-2'>
											<span>{company}</span>
											<button
												type='button'
												onClick={() => removeCompany(index, companyIdx)}
												className='hover:text-red-500'>
												<X className='w-3 h-3' />
											</button>
										</span>
									)
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			<Button
				type='button'
				variant='outline'
				onClick={() =>
					append({
						sector: '',
						percentage: 0,
						companies: [],
						color: 'from-blue-500 to-cyan-600',
						companyInput: ''
					})
				}
				className='w-full'>
				<Plus className='w-4 h-4 mr-2' />
				Add Sector
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
					{saveStatus === 'idle' && 'Save Sector-wise Data'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
