'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
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
import type { InternshipsData } from '@/app/(Private Pages)/actions/internships';
import {
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

interface HeroFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange: (data: InternshipsData) => void;
}

const ICON_OPTIONS = [
	'Briefcase',
	'GraduationCap',
	'Users',
	'Target',
	'Award',
	'TrendingUp',
	'Zap',
	'Star'
];
const GRADIENT_OPTIONS = [
	{ value: 'from-blue-600 to-blue-800', label: 'Blue' },
	{ value: 'from-purple-600 to-blue-800', label: 'Purple to Blue' },
	{ value: 'from-green-600 to-blue-800', label: 'Green to Blue' },
	{ value: 'from-orange-600 to-red-800', label: 'Orange to Red' },
	{ value: 'from-pink-600 to-purple-800', label: 'Pink to Purple' },
	{ value: 'from-indigo-600 to-blue-800', label: 'Indigo to Blue' }
];

export default function HeroForm({ initialData, onChange }: HeroFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			icon: initialData.hero.icon,
			title: initialData.hero.title,
			subtitle: initialData.hero.subtitle,
			gradient: initialData.hero.gradient
		}
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange({
				...initialData,
				hero: {
					icon: values.icon || 'Briefcase',
					title: values.title || '',
					subtitle: values.subtitle || '',
					gradient: values.gradient || 'from-blue-600 to-blue-800'
				}
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
					{
						...initialData,
						hero: {
							icon: values.icon,
							title: values.title,
							subtitle: values.subtitle,
							gradient: values.gradient
						}
					},
					admin.id
				);
				if (result.success) {
					const fresh = await getInternshipsData();
					if (fresh) {
						form.reset({
							icon: fresh.hero.icon,
							title: fresh.hero.title,
							subtitle: fresh.hero.subtitle,
							gradient: fresh.hero.gradient
						});
					}
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({ kind: 'error', message: 'Save failed' });
				}
			} catch (error) {
				console.error('Failed to save hero:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Hero section'
				description='Top-of-page banner for the internships page.'>
				<AdminFieldGrid>
					<AdminField label='Icon'>
						<Select
							value={form.watch('icon')}
							onValueChange={value => form.setValue('icon', value)}>
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
					<AdminField label='Background gradient'>
						<Select
							value={form.watch('gradient')}
							onValueChange={value => form.setValue('gradient', value)}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{GRADIENT_OPTIONS.map(option => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</AdminField>
				</AdminFieldGrid>
				<AdminField label='Title' htmlFor='int-hero-title'>
					<Input
						id='int-hero-title'
						placeholder='Internship Opportunities'
						{...form.register('title')}
					/>
				</AdminField>
				<AdminField label='Subtitle' htmlFor='int-hero-sub'>
					<Textarea
						id='int-hero-sub'
						rows={3}
						placeholder='Gain practical experience and kickstart your career'
						{...form.register('subtitle')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
