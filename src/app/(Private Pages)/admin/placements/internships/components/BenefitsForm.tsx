'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getInternshipsData,
	updateInternshipsData
} from '@/app/(Private Pages)/actions/internships';
import type {
	InternshipBenefit,
	InternshipsData
} from '@/app/(Private Pages)/actions/internships';
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

interface BenefitsFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = [
	'Star',
	'Award',
	'Target',
	'TrendingUp',
	'Users',
	'Lightbulb',
	'Briefcase',
	'GraduationCap',
	'Zap',
	'Trophy'
];
const COLOR_OPTIONS = [
	{ value: 'from-blue-600 to-cyan-600', label: 'Blue to Cyan' },
	{ value: 'from-purple-600 to-pink-600', label: 'Purple to Pink' },
	{ value: 'from-green-600 to-emerald-600', label: 'Green to Emerald' },
	{ value: 'from-orange-600 to-red-600', label: 'Orange to Red' },
	{ value: 'from-indigo-600 to-blue-600', label: 'Indigo to Blue' },
	{ value: 'from-yellow-600 to-orange-600', label: 'Yellow to Orange' }
];

export default function BenefitsForm({
	initialData,
	onChange
}: BenefitsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({ defaultValues: { benefits: initialData.benefits } });
	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'benefits'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange({
				...initialData,
				benefits: (values.benefits || []).filter(
					(b): b is InternshipBenefit =>
						b !== undefined && !!b.icon && !!b.title && !!b.description && !!b.color
				)
			});
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
				const admin = await requireAdmin();
				const result = await updateInternshipsData(
					{ ...initialData, benefits: values.benefits as InternshipBenefit[] },
					admin.id
				);
				if (result.success) {
					const fresh = await getInternshipsData();
					if (fresh) form.reset({ benefits: fresh.benefits });
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({ kind: 'error', message: 'Save failed' });
				}
			} catch (error) {
				console.error('Failed to save benefits:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Why internships'
				description='Benefit cards shown on the internships page.'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`benefits.${index}.title`) ||
								`Benefit ${index + 1}`
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`benefits.${index}.icon`)}
										onValueChange={v =>
											form.setValue(`benefits.${index}.icon`, v)
										}>
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
								</AdminField>
								<AdminField label='Color'>
									<Select
										value={form.watch(`benefits.${index}.color`)}
										onValueChange={v =>
											form.setValue(`benefits.${index}.color`, v)
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(option => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Title'>
								<Input
									placeholder='Real-World Experience'
									{...form.register(`benefits.${index}.title` as const)}
								/>
							</AdminField>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									placeholder='Gain hands-on experience in real industry projects…'
									{...form.register(`benefits.${index}.description` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No benefits yet' />}
				<AddRowButton
					onClick={() =>
						append({
							icon: 'Star',
							title: '',
							description: '',
							color: 'from-blue-600 to-cyan-600'
						})
					}>
					Add benefit
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
