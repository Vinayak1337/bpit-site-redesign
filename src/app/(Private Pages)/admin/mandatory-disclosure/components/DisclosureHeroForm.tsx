'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { updateMandatoryDisclosure } from '@/app/(Private Pages)/actions/mandatory-disclosure';
import {
	DisclosureData,
	disclosureDataSchema
} from '@/lib/schemas/mandatory-disclosure';

interface DisclosureHeroFormProps {
	initialData: DisclosureData;
	onChange?: (data: DisclosureData) => void;
}

export default function DisclosureHeroForm({
	initialData,
	onChange
}: DisclosureHeroFormProps) {
	const [isSaving, setIsSaving] = useState(false);

	const form = useForm<DisclosureData>({
		resolver: zodResolver(disclosureDataSchema),
		defaultValues: initialData
	});

	const { register, watch, handleSubmit } = form;

	// Watch for changes to update preview
	useEffect(() => {
		const subscription = watch(value => {
			if (onChange) {
				const updatedData = {
					...initialData,
					...value,
					hero: value.hero as any
				} as DisclosureData;
				onChange(updatedData);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, onChange, initialData]);

	async function onSubmit(data: DisclosureData) {
		setIsSaving(true);
		try {
			// Merge with existing items as this form only edits hero
			const dataToSave = {
				...initialData,
				hero: data.hero
			};
			await updateMandatoryDisclosure(dataToSave);
			toast.success('Hero section updated successfully');
		} catch (error) {
			console.error(error);
			toast.error('Failed to update hero section');
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='flex justify-end'>
				<Button type='submit' disabled={isSaving}>
					{isSaving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					<Save className='mr-2 h-4 w-4' />
					Save Changes
				</Button>
			</div>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<Label>Title</Label>
					<Input {...register('hero.title')} placeholder='Page Title' />
				</div>

				<div className='space-y-2'>
					<Label>Description</Label>
					<Textarea
						{...register('hero.description')}
						placeholder='Page Description'
						rows={3}
					/>
				</div>
			</div>
		</form>
	);
}
