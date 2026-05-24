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
	InternshipsData,
	ProcessStep
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

interface ProcessFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = [
	'CheckCircle',
	'ClipboardCheck',
	'UserCheck',
	'FileCheck',
	'Award',
	'Target',
	'Zap',
	'Rocket',
	'Calendar',
	'Send'
];

export default function ProcessForm({
	initialData,
	onChange
}: ProcessFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			process: initialData.process
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'process'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange({
				...initialData,
				process: (values.process || []).filter(
					(p): p is ProcessStep =>
						p !== undefined && !!p.title && !!p.description && !!p.icon
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
					{ ...initialData, process: values.process as ProcessStep[] },
					admin.id
				);
				if (result.success) {
					const fresh = await getInternshipsData();
					if (fresh) form.reset({ process: fresh.process });
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({ kind: 'error', message: 'Save failed' });
				}
			} catch (error) {
				console.error('Failed to save process:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='How internships work'
				description='Step-by-step process shown on the internships page.'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`process.${index}.title`) || `Step ${index + 1}`
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`process.${index}.icon`)}
										onValueChange={v =>
											form.setValue(`process.${index}.icon`, v)
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
								<AdminField label='Title'>
									<Input
										placeholder='Browse Opportunities'
										{...form.register(`process.${index}.title` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									placeholder='Explore internship opportunities from various companies…'
									{...form.register(`process.${index}.description` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No steps yet' />}
				<AddRowButton
					onClick={() =>
						append({ title: '', description: '', icon: 'CheckCircle' })
					}>
					Add step
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
