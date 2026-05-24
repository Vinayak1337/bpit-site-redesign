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
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	updateInternshipsData,
	getInternshipsData,
	type InternshipsData
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

interface ContactFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = [
	'ArrowRight',
	'Send',
	'MessageCircle',
	'Calendar',
	'FileText',
	'ExternalLink',
	'PhoneCall'
];

export default function ContactForm({ initialData, onChange }: ContactFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			contact: initialData.contact
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'contact.buttons'
	});

	useEffect(() => {
		const subscription = form.watch(values => {
			if (values.contact) {
				onChange({ ...initialData, contact: values.contact as InternshipsData['contact'] });
				setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
			}
		});
		return () => subscription.unsubscribe();
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
					{ ...initialData, contact: values.contact },
					admin.id
				);
				if (result.success) {
					const freshData = await getInternshipsData();
					if (freshData) form.reset({ contact: freshData.contact });
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({ kind: 'error', message: 'Save failed' });
				}
			} catch (error) {
				console.error('Failed to save contact:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Need guidance contact'
				description='Headline copy and quick contact info for the contact block.'>
				<AdminField label='Title' htmlFor='ic-title'>
					<Input
						id='ic-title'
						placeholder='Need Guidance?'
						{...form.register('contact.title')}
					/>
				</AdminField>
				<AdminField label='Subtitle' htmlFor='ic-sub'>
					<Textarea
						id='ic-sub'
						rows={2}
						placeholder='Our team is here to help you find the perfect internship opportunity.'
						{...form.register('contact.subtitle')}
					/>
				</AdminField>
				<AdminFieldGrid>
					<AdminField label='Phone' htmlFor='ic-phone'>
						<Input
							id='ic-phone'
							placeholder='+91 11 2778 1200'
							{...form.register('contact.phone')}
						/>
					</AdminField>
					<AdminField label='Email' htmlFor='ic-email'>
						<Input
							id='ic-email'
							placeholder='placements@bpitindia.edu.in'
							{...form.register('contact.email')}
						/>
					</AdminField>
				</AdminFieldGrid>
			</AdminFormSection>

			<AdminFormSection title='CTA buttons'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`contact.buttons.${index}.text`) ||
								`Button ${index + 1}`
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Text'>
									<Input
										placeholder='Contact Us'
										{...form.register(`contact.buttons.${index}.text` as const)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`contact.buttons.${index}.icon`) || 'ArrowRight'}
										onValueChange={v =>
											form.setValue(`contact.buttons.${index}.icon`, v, {
												shouldDirty: true
											})
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
							</AdminFieldGrid>
							<AdminField label='Variant'>
								<Select
									value={
										form.watch(`contact.buttons.${index}.variant`) || 'primary'
									}
									onValueChange={v =>
										form.setValue(
											`contact.buttons.${index}.variant`,
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
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No CTA buttons yet' />}
				<AddRowButton
					onClick={() =>
						append({ text: '', icon: 'ArrowRight', variant: 'primary' })
					}>
					Add button
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
