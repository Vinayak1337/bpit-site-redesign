'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import UploadButton from '@/components/cloudinary/upload-button';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	updateInternshipsData,
	getInternshipsData,
	type InternshipsData,
	type InternshipOpportunity
} from '@/app/(Private Pages)/actions/internships';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
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

interface PartnersFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

export default function PartnersForm({
	initialData,
	onChange
}: PartnersFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const [filters, setFilters] = useState<string[]>(initialData.filters);

	const form = useForm({
		defaultValues: { opportunities: initialData.opportunities }
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'opportunities'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange({
				...initialData,
				opportunities: (values.opportunities || []).filter(
					(o): o is InternshipOpportunity =>
						o !== undefined && !!o.company && !!o.title
				),
				filters
			});
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, initialData, onChange, filters]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				const admin = await requireAdmin();
				const result = await updateInternshipsData(
					{
						...initialData,
						opportunities: values.opportunities,
						filters
					},
					admin.id
				);
				if (result.success) {
					const freshData = await getInternshipsData();
					if (freshData) {
						form.reset({ opportunities: freshData.opportunities });
						setFilters(freshData.filters);
					}
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({ kind: 'error', message: 'Save failed' });
				}
			} catch (error) {
				console.error('Failed to save partners:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const handleDomainAdd = (oppIndex: number) => {
		const current = form.watch(`opportunities.${oppIndex}.domains`) || [];
		form.setValue(`opportunities.${oppIndex}.domains`, [...current, ''], {
			shouldDirty: true
		});
	};

	const handleDomainRemove = (oppIndex: number, domainIndex: number) => {
		const current = form.watch(`opportunities.${oppIndex}.domains`) || [];
		form.setValue(
			`opportunities.${oppIndex}.domains`,
			current.filter((_, i) => i !== domainIndex),
			{ shouldDirty: true }
		);
	};

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Category filters'
				description='Filter chips shown above the opportunities grid.'>
				<div className='flex flex-col gap-2'>
					{filters.map((filter, index) => (
						<div key={index} className='flex gap-2'>
							<Input
								value={filter}
								onChange={e => {
									const next = [...filters];
									next[index] = e.target.value;
									setFilters(next);
								}}
								placeholder='e.g. IT, Marketing, Finance'
							/>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								onClick={() =>
									setFilters(filters.filter((_, i) => i !== index))
								}
								aria-label='Remove filter'
								className='text-slate-500 hover:bg-rose-50 hover:text-rose-600'>
								<X className='h-4 w-4' />
							</Button>
						</div>
					))}
				</div>
				<AddRowButton onClick={() => setFilters([...filters, ''])}>
					Add filter
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Internship opportunities'>
				<AdminItemList>
					{fields.map((field, index) => {
						const logo = form.watch(`opportunities.${index}.logo`);
						const domains =
							form.watch(`opportunities.${index}.domains`) || [];
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fields.length}
								title={
									form.watch(`opportunities.${index}.company`) ||
									`Opportunity ${index + 1}`
								}
								subtitle={
									form.watch(`opportunities.${index}.title`) || undefined
								}
								onMove={d => move(index, index + d)}
								onRemove={() => remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Company name'>
										<Input
											placeholder='Google'
											{...form.register(
												`opportunities.${index}.company` as const
											)}
										/>
									</AdminField>
									<AdminField label='Job title'>
										<Input
											placeholder='Software Engineer Intern'
											{...form.register(
												`opportunities.${index}.title` as const
											)}
										/>
									</AdminField>
									<AdminField label='Type'>
										<Input
											placeholder='Full-time'
											{...form.register(
												`opportunities.${index}.type` as const
											)}
										/>
									</AdminField>
									<AdminField label='Location'>
										<Input
											placeholder='Bangalore, India'
											{...form.register(
												`opportunities.${index}.location` as const
											)}
										/>
									</AdminField>
									<AdminField label='Category'>
										<Input
											placeholder='IT'
											{...form.register(
												`opportunities.${index}.category` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										placeholder='Brief description of the internship opportunity…'
										{...form.register(
											`opportunities.${index}.description` as const
										)}
									/>
								</AdminField>
								<AdminField label='Company logo'>
									<UploadButton
										onUpload={(url: string) =>
											form.setValue(`opportunities.${index}.logo`, url, {
												shouldDirty: true
											})
										}
										folder='internships/logos'
									/>
									{logo && (
										<div className='mt-3 h-20 w-20 overflow-hidden rounded border border-slate-200 bg-white'>
											<Image
												src={logo}
												alt='Logo'
												width={80}
												height={80}
												className='h-full w-full object-contain'
											/>
										</div>
									)}
								</AdminField>
								<AdminField label='Domains / skills'>
									<div className='flex flex-col gap-2'>
										{domains.map((domain, domainIndex) => (
											<div key={domainIndex} className='flex gap-2'>
												<Input
													value={domain}
													onChange={e => {
														const next = [...domains];
														next[domainIndex] = e.target.value;
														form.setValue(
															`opportunities.${index}.domains`,
															next,
															{ shouldDirty: true }
														);
													}}
													placeholder='React, Python, ML'
												/>
												<Button
													type='button'
													variant='ghost'
													size='icon'
													onClick={() => handleDomainRemove(index, domainIndex)}
													aria-label='Remove domain'
													className='text-slate-500 hover:bg-rose-50 hover:text-rose-600'>
													<X className='h-4 w-4' />
												</Button>
											</div>
										))}
									</div>
									<Button
										type='button'
										variant='outline'
										onClick={() => handleDomainAdd(index)}
										className='mt-2'>
										<Plus className='mr-2 h-4 w-4' />
										Add domain
									</Button>
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{fields.length === 0 && (
					<AdminEmptyState title='No opportunities yet' />
				)}
				<AddRowButton
					onClick={() =>
						append({
							company: '',
							title: '',
							type: 'Full-time',
							location: '',
							description: '',
							logo: '',
							category: '',
							domains: []
						})
					}>
					Add opportunity
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
