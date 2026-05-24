'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
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

const COLOR_OPTIONS = [
	'from-blue-500 to-blue-700',
	'from-purple-500 to-purple-700',
	'from-green-500 to-green-700',
	'from-red-500 to-red-700',
	'from-orange-500 to-orange-700',
	'from-pink-500 to-pink-700',
	'from-indigo-500 to-indigo-700',
	'from-teal-500 to-teal-700'
];

interface StatsFormProps {
	initialData: RecruitersData;
	pageSlug: string;
	onChange?: (data: RecruitersData) => void;
}

export default function StatsForm({ initialData, onChange }: StatsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			stats: initialData.stats || []
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					stats: (values.stats || []).filter(Boolean) as RecruitersData['stats']
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
					stats: values.stats
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
			<AdminFormSection title='Recruiter stats'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`stats.${index}.label`) || `Stat ${index + 1}`
							}
							subtitle={form.watch(`stats.${index}.value`) || undefined}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`stats.${index}.icon`) || 'TrendingUp'}
										onValueChange={v =>
											form.setValue(`stats.${index}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{SUPPORTED_ICON_NAMES.map(icon => (
												<SelectItem key={icon} value={icon}>
													{icon}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Color'>
									<Select
										value={form.watch(`stats.${index}.color`) || COLOR_OPTIONS[0]}
										onValueChange={v =>
											form.setValue(`stats.${index}.color`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(color => (
												<SelectItem key={color} value={color}>
													{color}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Value'>
								<Input
									placeholder='500+'
									{...form.register(`stats.${index}.value` as const)}
								/>
							</AdminField>
							<AdminField label='Label'>
								<Input
									placeholder='Partner Companies'
									{...form.register(`stats.${index}.label` as const)}
								/>
							</AdminField>
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
							color: COLOR_OPTIONS[0]
						})
					}>
					Add stat card
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
