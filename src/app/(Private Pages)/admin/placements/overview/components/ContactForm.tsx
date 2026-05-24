'use client';

import { useEffect, useState, useTransition } from 'react';
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
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';
import { updatePlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
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

type ContactFormValue = {
	id: string;
	icon: string;
	title: string;
	value: string;
	iconColor: string;
	textColor: string;
};

type FormValues = {
	contactTitle: string;
	contactDescription: string;
	contactButtonText: string;
	contacts: ContactFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const FALLBACK_ICON = 'GraduationCap';

const createEmptyContact = (): ContactFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	title: '',
	value: '',
	iconColor: 'blue',
	textColor: 'black'
});

export default function ContactForm({ initialData, pageSlug, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			contactTitle: initialData.contactTitle || '',
			contactDescription: initialData.contactDescription || '',
			contactButtonText: initialData.contactButtonText || '',
			contacts:
				initialData.contacts.length > 0
					? initialData.contacts
					: [createEmptyContact()]
		}
	});

	const contacts = useFieldArray({
		control: form.control,
		name: 'contacts'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					contactTitle: values.contactTitle || '',
					contactDescription: values.contactDescription || '',
					contactButtonText: values.contactButtonText || '',
					contacts: (values.contacts || [])
						.map(contact => ({
							icon: contact?.icon?.trim().length
								? contact.icon.trim()
								: FALLBACK_ICON,
							title: (contact?.title ?? '').trim(),
							value: (contact?.value ?? '').trim(),
							iconColor: contact?.iconColor ?? 'blue',
							textColor: contact?.textColor ?? 'black'
						}))
						.filter(
							contact => contact.title.length > 0 && contact.value.length > 0
						)
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
				const updatedData: PlacementOverviewData = {
					...initialData,
					contactTitle: values.contactTitle,
					contactDescription: values.contactDescription,
					contactButtonText: values.contactButtonText,
					contacts: values.contacts
						.map(contact => ({
							icon: contact.icon?.trim().length
								? contact.icon.trim()
								: FALLBACK_ICON,
							title: (contact.title ?? '').trim(),
							value: (contact.value ?? '').trim(),
							iconColor: contact.iconColor ?? 'blue',
							textColor: contact.textColor ?? 'black'
						}))
						.filter(
							contact => contact.title.length > 0 && contact.value.length > 0
						)
				};
				await updatePlacementOverview(pageSlug, updatedData);
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
				title='Contact section'
				description='Headline copy shown above the contact block.'>
				<AdminField label='Contact title' htmlFor='ov-ct-title'>
					<Input
						id='ov-ct-title'
						placeholder='Get in Touch'
						{...form.register('contactTitle')}
					/>
				</AdminField>
				<AdminField label='Contact description' htmlFor='ov-ct-desc'>
					<Textarea
						id='ov-ct-desc'
						rows={3}
						placeholder='Brief description for contact section'
						{...form.register('contactDescription')}
					/>
				</AdminField>
				<AdminField label='Button text' htmlFor='ov-ct-btn'>
					<Input
						id='ov-ct-btn'
						placeholder='Contact Us Today'
						{...form.register('contactButtonText')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Contact information'>
				<AdminItemList>
					{contacts.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={contacts.fields.length}
							title={
								form.watch(`contacts.${index}.title`) ||
								`Contact ${index + 1}`
							}
							subtitle={form.watch(`contacts.${index}.value`) || undefined}
							onMove={d => contacts.move(index, index + d)}
							onRemove={() => contacts.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										placeholder='Phone'
										{...form.register(`contacts.${index}.title` as const, {
											required: true
										})}
									/>
								</AdminField>
								<AdminField label='Value'>
									<Input
										placeholder='+91-123-456-7890'
										{...form.register(`contacts.${index}.value` as const, {
											required: true
										})}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`contacts.${index}.icon`) || FALLBACK_ICON}
										onValueChange={v =>
											form.setValue(`contacts.${index}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select icon' />
										</SelectTrigger>
										<SelectContent>
											{SUPPORTED_ICON_NAMES.map(option => (
												<SelectItem key={option} value={option}>
													{option}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Icon background color'>
									<Input
										placeholder='bg-white/20'
										{...form.register(`contacts.${index}.iconColor` as const)}
									/>
								</AdminField>
								<AdminField label='Text color'>
									<Input
										placeholder='text-blue-100'
										{...form.register(`contacts.${index}.textColor` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{contacts.fields.length === 0 && (
					<AdminEmptyState title='No contacts yet' />
				)}
				<AddRowButton onClick={() => contacts.append(createEmptyContact())}>
					Add contact
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
