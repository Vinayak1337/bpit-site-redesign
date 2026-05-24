'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
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
	InternshipsData,
	InternshipStat
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

interface StatsFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = [
	'TrendingUp',
	'Users',
	'Building2',
	'Award',
	'Target',
	'Star',
	'Zap',
	'BarChart3'
];
const COLOR_OPTIONS = [
	{ value: 'from-blue-500 to-cyan-600', label: 'Blue to Cyan' },
	{ value: 'from-green-500 to-emerald-600', label: 'Green to Emerald' },
	{ value: 'from-purple-500 to-violet-600', label: 'Purple to Violet' },
	{ value: 'from-orange-500 to-red-600', label: 'Orange to Red' }
];

export default function StatsForm({ initialData, onChange }: StatsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({ defaultValues: { stats: initialData.stats } });
	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange({
				...initialData,
				stats: (values.stats || []).filter(
					(s): s is InternshipStat =>
						s !== undefined && !!s.icon && !!s.value && !!s.label && !!s.color
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
					{ ...initialData, stats: values.stats as InternshipStat[] },
					admin.id
				);
				if (result.success) {
					const fresh = await getInternshipsData();
					if (fresh) form.reset({ stats: fresh.stats });
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({ kind: 'error', message: 'Save failed' });
				}
			} catch (error) {
				console.error('Failed to save stats:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection title='Stat cards'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`stats.${index}.label`) || `Stat ${index + 1}`
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`stats.${index}.icon`)}
										onValueChange={v =>
											form.setValue(`stats.${index}.icon`, v)
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
								<AdminField label='Value'>
									<Input
										placeholder='500+'
										{...form.register(`stats.${index}.value` as const)}
									/>
								</AdminField>
								<AdminField label='Label'>
									<Input
										placeholder='Active Internships'
										{...form.register(`stats.${index}.label` as const)}
									/>
								</AdminField>
								<AdminField label='Color'>
									<Select
										value={form.watch(`stats.${index}.color`)}
										onValueChange={v =>
											form.setValue(`stats.${index}.color`, v)
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
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No stats yet' />}
				<AddRowButton
					onClick={() =>
						append({
							icon: 'TrendingUp',
							value: '',
							label: '',
							color: 'from-blue-500 to-cyan-600'
						})
					}>
					Add stat
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
