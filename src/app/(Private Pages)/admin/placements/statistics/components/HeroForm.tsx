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
import {
	updatePlacementStatistics,
	type PlacementStatisticsData
} from '@/app/(Private Pages)/actions/placement-statistics';
import {
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

const GRADIENT_OPTIONS = [
	'from-blue-900 via-blue-800 to-blue-900',
	'from-purple-900 via-purple-800 to-purple-900',
	'from-green-900 via-green-800 to-green-900',
	'from-red-900 via-red-800 to-red-900',
	'from-indigo-900 via-indigo-800 to-indigo-900'
];

const ICON_OPTIONS = [
	'BarChart3',
	'TrendingUp',
	'Award',
	'Target',
	'Users',
	'Building2',
	'Briefcase',
	'GraduationCap'
];

interface HeroFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange?: (data: PlacementStatisticsData) => void;
}

export default function HeroForm({ initialData, onChange }: HeroFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm({
		defaultValues: {
			icon: initialData.hero?.icon || 'BarChart3',
			title: initialData.hero?.title || '',
			subtitle: initialData.hero?.subtitle || '',
			gradient: initialData.hero?.gradient || GRADIENT_OPTIONS[0]
		}
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					hero: {
						icon: values.icon || 'BarChart3',
						title: values.title || '',
						subtitle: values.subtitle || '',
						gradient: values.gradient || GRADIENT_OPTIONS[0]
					}
				});
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

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				const updatedData: PlacementStatisticsData = {
					...initialData,
					hero: {
						icon: values.icon,
						title: values.title,
						subtitle: values.subtitle,
						gradient: values.gradient
					}
				};
				await updatePlacementStatistics(updatedData);
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
				title='Hero section'
				description='Top-of-page banner for the placement statistics page.'>
				<AdminFieldGrid>
					<AdminField label='Icon'>
						<Select
							value={form.watch('icon')}
							onValueChange={v => form.setValue('icon', v)}>
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
					<AdminField label='Gradient'>
						<Select
							value={form.watch('gradient')}
							onValueChange={v => form.setValue('gradient', v)}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{GRADIENT_OPTIONS.map(g => (
									<SelectItem key={g} value={g}>
										{g}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</AdminField>
				</AdminFieldGrid>
				<AdminField label='Title'>
					<Input
						placeholder='Placement Statistics'
						{...form.register('title')}
					/>
				</AdminField>
				<AdminField label='Subtitle'>
					<Textarea
						rows={3}
						placeholder='Data-driven insights into our placement success'
						{...form.register('subtitle')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
