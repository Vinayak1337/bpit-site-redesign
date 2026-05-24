'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import {
	updateRecruitersData,
	type RecruitersData
} from '@/app/(Private Pages)/actions/recruiters';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
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

const TYPE_OPTIONS = [
	'MNC',
	'Product Giant',
	'Consulting',
	'Banking',
	'Unicorn',
	'R&D',
	'Fintech',
	'Startup'
];

interface PartnersFormProps {
	initialData: RecruitersData;
	pageSlug: string;
	onChange?: (data: RecruitersData) => void;
}

export default function PartnersForm({
	initialData,
	onChange
}: PartnersFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			recruiters: initialData.recruiters || []
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'recruiters'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					recruiters: (values.recruiters || []).filter(
						Boolean
					) as RecruitersData['recruiters']
				});
				setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
			}
		});
		return () => sub.unsubscribe();
	}, [form, onChange, initialData]);

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
				const updatedData: RecruitersData = {
					...initialData,
					recruiters: values.recruiters
				};
				await updateRecruitersData(updatedData, admin.id);
				onChange?.(updatedData);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Failed to save:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection title='Partner companies'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`recruiters.${index}.name`) ||
								`Partner ${index + 1}`
							}
							subtitle={form.watch(`recruiters.${index}.sector`) || undefined}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminField label='Company name'>
								<Input
									placeholder='Google'
									{...form.register(`recruiters.${index}.name` as const)}
								/>
							</AdminField>
							<AdminFieldGrid>
								<AdminField label='Type'>
									<Select
										value={form.watch(`recruiters.${index}.type`) || 'MNC'}
										onValueChange={v =>
											form.setValue(`recruiters.${index}.type`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{TYPE_OPTIONS.map(type => (
												<SelectItem key={type} value={type}>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Category'>
									<Input
										placeholder='Technology'
										{...form.register(`recruiters.${index}.category` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Sector'>
								<Input
									placeholder='Cloud & AI Services'
									{...form.register(`recruiters.${index}.sector` as const)}
								/>
							</AdminField>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									placeholder='Company description…'
									{...form.register(`recruiters.${index}.description` as const)}
								/>
							</AdminField>
							<AdminFieldGrid>
								<AdminField label='Location'>
									<Input
										placeholder='California, USA'
										{...form.register(`recruiters.${index}.location` as const)}
									/>
								</AdminField>
								<AdminField label='Established'>
									<Input
										placeholder='1998'
										{...form.register(
											`recruiters.${index}.established` as const
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Website URL'>
								<Input
									type='url'
									placeholder='https://www.example.com'
									{...form.register(`recruiters.${index}.website` as const)}
								/>
							</AdminField>
							<AdminField label='Logo URL' hint='Optional.'>
								<Input
									type='url'
									placeholder='https://…'
									{...form.register(`recruiters.${index}.logo` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No partners yet' />}
				<AddRowButton
					onClick={() =>
						append({
							name: '',
							logo: '',
							category: '',
							sector: '',
							location: '',
							type: 'MNC',
							established: '',
							website: '',
							description: ''
						})
					}>
					Add partner company
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
