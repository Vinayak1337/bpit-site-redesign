'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import {
	updatePlacementStatistics,
	getPlacementStatistics
} from '@/app/(Private Pages)/actions/placement-statistics';
import type {
	PlacementStatisticsData,
	SectorWiseData
} from '@/app/(Private Pages)/actions/placement-statistics';
import { Plus, X } from 'lucide-react';
import {
	AddRowButton,
	AdminEmptyState,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

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

export default function SectorForm({ initialData, onChange }: SectorFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<SectorFormData>({
		defaultValues: {
			sectors: (initialData.sectorWiseData || []).map(s => ({
				...s,
				companyInput: ''
			}))
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'sectors'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (!values.sectors) return;
			const sectorWiseData: SectorWiseData[] = values.sectors.map(s => ({
				sector: s?.sector || '',
				percentage: s?.percentage || 0,
				companies: (s?.companies || []).filter((c): c is string => !!c),
				color: s?.color || 'from-blue-500 to-cyan-600'
			}));
			onChange({ ...initialData, sectorWiseData });
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, initialData, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
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
					const freshData = await getPlacementStatistics();
					if (freshData) {
						form.reset({
							sectors: (freshData.sectorWiseData || []).map(s => ({
								...s,
								companyInput: ''
							}))
						});
					}
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({ kind: 'error', message: 'Save failed' });
				}
			} catch (error) {
				console.error('Failed to save sector-wise data:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const addCompany = (sectorIndex: number) => {
		const input = form.getValues(`sectors.${sectorIndex}.companyInput`);
		if (!input.trim()) return;
		const companies = form.getValues(`sectors.${sectorIndex}.companies`) || [];
		companies.push(input.trim());
		form.setValue(`sectors.${sectorIndex}.companies`, companies, {
			shouldDirty: true
		});
		form.setValue(`sectors.${sectorIndex}.companyInput`, '');
	};

	const removeCompany = (sectorIndex: number, companyIndex: number) => {
		const companies = form.getValues(`sectors.${sectorIndex}.companies`) || [];
		companies.splice(companyIndex, 1);
		form.setValue(`sectors.${sectorIndex}.companies`, companies, {
			shouldDirty: true
		});
	};

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection title='Sector-wise distribution'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`sectors.${index}.sector`) ||
								`Sector ${index + 1}`
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Sector name'>
									<Input
										placeholder='IT Services'
										{...form.register(`sectors.${index}.sector` as const)}
									/>
								</AdminField>
								<AdminField label='Percentage'>
									<Input
										type='number'
										step='0.1'
										placeholder='35'
										{...form.register(`sectors.${index}.percentage` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Gradient color'>
								<Select
									value={
										form.watch(`sectors.${index}.color`) ||
										'from-blue-500 to-cyan-600'
									}
									onValueChange={v =>
										form.setValue(`sectors.${index}.color`, v, {
											shouldDirty: true
										})
									}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{GRADIENT_OPTIONS.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</AdminField>
							<AdminField label='Companies'>
								<div className='flex gap-2'>
									<Input
										value={form.watch(`sectors.${index}.companyInput`) || ''}
										onChange={e =>
											form.setValue(
												`sectors.${index}.companyInput`,
												e.target.value
											)
										}
										placeholder='Add company name'
										onKeyDown={e => {
											if (e.key === 'Enter') {
												e.preventDefault();
												addCompany(index);
											}
										}}
									/>
									<Button
										type='button'
										variant='outline'
										onClick={() => addCompany(index)}
										aria-label='Add company'>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
								<div className='mt-2 flex flex-wrap gap-2'>
									{(form.watch(`sectors.${index}.companies`) || []).map(
										(company, companyIdx) => (
											<span
												key={companyIdx}
												className='inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700'>
												{company}
												<button
													type='button'
													onClick={() => removeCompany(index, companyIdx)}
													className='text-slate-400 hover:text-rose-600'
													aria-label={`Remove ${company}`}>
													<X className='h-3 w-3' />
												</button>
											</span>
										)
									)}
								</div>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No sectors yet' />}
				<AddRowButton
					onClick={() =>
						append({
							sector: '',
							percentage: 0,
							companies: [],
							color: 'from-blue-500 to-cyan-600',
							companyInput: ''
						})
					}>
					Add sector
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
