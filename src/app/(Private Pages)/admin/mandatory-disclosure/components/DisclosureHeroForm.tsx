'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { updateMandatoryDisclosure } from '@/app/(Private Pages)/actions/mandatory-disclosure';
import {
	DisclosureData,
	disclosureDataSchema
} from '@/lib/schemas/mandatory-disclosure';
import {
	AdminField,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

interface DisclosureHeroFormProps {
	initialData: DisclosureData;
	onChange?: (data: DisclosureData) => void;
}

export default function DisclosureHeroForm({
	initialData,
	onChange
}: DisclosureHeroFormProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<DisclosureData>({
		resolver: zodResolver(disclosureDataSchema),
		defaultValues: initialData
	});

	useEffect(() => {
		const sub = form.watch(value => {
			if (onChange) {
				onChange({
					...initialData,
					...value,
					hero: value.hero as DisclosureData['hero']
				} as DisclosureData);
			}
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange, initialData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(async data => {
		setIsSaving(true);
		setStatus({ kind: 'saving' });
		try {
			await updateMandatoryDisclosure({ ...initialData, hero: data.hero });
			setStatus({ kind: 'success', message: 'Saved' });
			toast.success('Hero section updated successfully');
		} catch (error) {
			console.error(error);
			setStatus({ kind: 'error', message: 'Save failed' });
			toast.error('Failed to update hero section');
		} finally {
			setIsSaving(false);
		}
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Disclosure hero'
				description='Headline and description shown above the disclosure index.'>
				<AdminField label='Title' htmlFor='dh-title'>
					<Input
						id='dh-title'
						placeholder='Page Title'
						{...form.register('hero.title')}
					/>
				</AdminField>
				<AdminField label='Description' htmlFor='dh-desc'>
					<Textarea
						id='dh-desc'
						placeholder='Page Description'
						rows={3}
						{...form.register('hero.description')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isSaving} />
		</AdminForm>
	);
}
