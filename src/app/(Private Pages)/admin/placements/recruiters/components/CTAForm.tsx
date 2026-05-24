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

const DEFAULT_GRADIENT = 'from-blue-900 via-blue-800 to-blue-900';

interface CTAFormProps {
	initialData: RecruitersData;
	pageSlug: string;
	onChange?: (data: RecruitersData) => void;
}

export default function CTAForm({ initialData, onChange }: CTAFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			title: initialData.cta?.title || '',
			subtitle: initialData.cta?.subtitle || '',
			gradient: initialData.cta?.gradient || DEFAULT_GRADIENT,
			buttons: initialData.cta?.buttons || []
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'buttons'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					cta: {
						title: values.title || '',
						subtitle: values.subtitle || '',
						gradient: values.gradient || DEFAULT_GRADIENT,
						buttons: (values.buttons || []).filter(
							Boolean
						) as RecruitersData['cta']['buttons']
					}
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
					cta: {
						title: values.title,
						subtitle: values.subtitle,
						gradient: values.gradient,
						buttons: values.buttons
					}
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
			<AdminFormSection
				title='CTA block'
				description='Headline copy and button list at the bottom of the recruiters page.'>
				<AdminField label='Title' htmlFor='cta-title'>
					<Input
						id='cta-title'
						placeholder='Want to Partner with BPIT?'
						{...form.register('title')}
					/>
				</AdminField>
				<AdminField label='Subtitle' htmlFor='cta-sub'>
					<Textarea
						id='cta-sub'
						rows={3}
						placeholder='Join our network of industry leaders'
						{...form.register('subtitle')}
					/>
				</AdminField>
				<AdminField
					label='Gradient (Tailwind classes)'
					htmlFor='cta-gradient'>
					<Input
						id='cta-gradient'
						{...form.register('gradient')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='CTA buttons'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`buttons.${index}.text`) || `Button ${index + 1}`
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminField label='Button text'>
								<Input
									placeholder='Contact Us'
									{...form.register(`buttons.${index}.text` as const)}
								/>
							</AdminField>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`buttons.${index}.icon`) || 'Mail'}
										onValueChange={v =>
											form.setValue(`buttons.${index}.icon`, v, {
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
								<AdminField label='Variant'>
									<Select
										value={form.watch(`buttons.${index}.variant`) || 'primary'}
										onValueChange={v =>
											form.setValue(
												`buttons.${index}.variant`,
												v as 'primary' | 'secondary',
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='primary'>Primary</SelectItem>
											<SelectItem value='secondary'>Secondary</SelectItem>
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No CTA buttons yet' />}
				<AddRowButton
					onClick={() =>
						append({ text: '', icon: 'Mail', variant: 'primary' })
					}>
					Add button
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
