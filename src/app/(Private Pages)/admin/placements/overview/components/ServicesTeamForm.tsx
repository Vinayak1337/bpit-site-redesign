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
import UploadButton from '@/components/cloudinary/upload-button';
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

type FeatureFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: string;
	iconColor: string;
	textColor: string;
};

type TeamMemberFormValue = {
	id: string;
	name: string;
	position: string;
	email: string;
	image?: string;
	initials: string;
	gradientColor: string;
	textColor: string;
};

type FormValues = {
	servicesTitle: string;
	servicesDescription: string;
	features: FeatureFormValue[];
	teamTitle: string;
	teamDescription: string;
	teamMembers: TeamMemberFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const FALLBACK_ICON = 'GraduationCap';
const DEFAULT_GRADIENT = 'bg-gradient-to-br from-blue-500 to-blue-600';

const createEmptyFeature = (): FeatureFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	title: '',
	description: '',
	color: 'blue',
	iconColor: 'blue',
	textColor: 'black'
});

const createEmptyTeamMember = (): TeamMemberFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	position: '',
	email: '',
	image: '',
	initials: '',
	gradientColor: DEFAULT_GRADIENT,
	textColor: 'text-white'
});

export default function ServicesTeamForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			servicesTitle: initialData.servicesTitle || '',
			servicesDescription: initialData.servicesDescription || '',
			features:
				initialData.features.length > 0
					? initialData.features
					: [createEmptyFeature()],
			teamTitle: initialData.teamTitle || '',
			teamDescription: initialData.teamDescription || '',
			teamMembers:
				initialData.teamMembers.length > 0
					? initialData.teamMembers
					: [createEmptyTeamMember()]
		}
	});

	const features = useFieldArray({ control: form.control, name: 'features' });
	const teamMembers = useFieldArray({
		control: form.control,
		name: 'teamMembers'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (!onChange) return;
			onChange({
				...initialData,
				servicesTitle: values.servicesTitle || '',
				servicesDescription: values.servicesDescription || '',
				features: (values.features || [])
					.map(f => ({
						id: f?.id || crypto.randomUUID(),
						icon: f?.icon?.trim().length ? f.icon.trim() : FALLBACK_ICON,
						title: (f?.title ?? '').trim(),
						description: (f?.description ?? '').trim(),
						color: f?.color ?? 'blue',
						iconColor: f?.iconColor ?? 'blue',
						textColor: f?.textColor ?? 'black'
					}))
					.filter(f => f.title.length > 0 && f.description.length > 0),
				teamTitle: values.teamTitle || '',
				teamDescription: values.teamDescription || '',
				teamMembers: (values.teamMembers || [])
					.map(m => ({
						id: m?.id || crypto.randomUUID(),
						name: (m?.name ?? '').trim(),
						position: (m?.position ?? '').trim(),
						email: (m?.email ?? '').trim(),
						image: (m?.image ?? '').trim(),
						initials: (m?.initials ?? '').trim(),
						gradientColor: m?.gradientColor ?? DEFAULT_GRADIENT,
						textColor: m?.textColor ?? 'text-white'
					}))
					.filter(m => m.name.length > 0 && m.position.length > 0)
			});
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
				await updatePlacementOverview(pageSlug, {
					...initialData,
					servicesTitle: values.servicesTitle,
					servicesDescription: values.servicesDescription,
					features: values.features
						.map(f => ({
							id: f.id,
							icon: f.icon?.trim().length ? f.icon.trim() : FALLBACK_ICON,
							title: (f.title ?? '').trim(),
							description: (f.description ?? '').trim(),
							color: f.color ?? 'blue',
							iconColor: f.iconColor ?? 'blue',
							textColor: f.textColor ?? 'black'
						}))
						.filter(f => f.title.length > 0 && f.description.length > 0),
					teamTitle: values.teamTitle,
					teamDescription: values.teamDescription,
					teamMembers: values.teamMembers
						.map(m => ({
							id: m.id,
							name: (m.name ?? '').trim(),
							position: (m.position ?? '').trim(),
							email: (m.email ?? '').trim(),
							image: (m.image ?? '').trim(),
							initials: (m.initials ?? '').trim(),
							gradientColor: m.gradientColor ?? DEFAULT_GRADIENT,
							textColor: m.textColor ?? 'text-white'
						}))
						.filter(m => m.name.length > 0 && m.position.length > 0)
				});
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
				title='Services section'
				description='Headline copy shown above the services grid.'>
				<AdminField label='Services title' htmlFor='st-title'>
					<Input
						id='st-title'
						placeholder='Our Services'
						{...form.register('servicesTitle')}
					/>
				</AdminField>
				<AdminField label='Services description' htmlFor='st-desc'>
					<Textarea
						id='st-desc'
						rows={3}
						placeholder='Brief description'
						{...form.register('servicesDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Features'>
				<AdminItemList>
					{features.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={features.fields.length}
							title={
								form.watch(`features.${index}.title`) || `Feature ${index + 1}`
							}
							onMove={d => features.move(index, index + d)}
							onRemove={() => features.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										placeholder='Feature title'
										{...form.register(`features.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`features.${index}.icon`) || FALLBACK_ICON}
										onValueChange={v =>
											form.setValue(`features.${index}.icon`, v, {
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
								<AdminField label='Color'>
									<Input
										placeholder='blue'
										{...form.register(`features.${index}.color` as const)}
									/>
								</AdminField>
								<AdminField label='Icon color'>
									<Input
										placeholder='blue'
										{...form.register(`features.${index}.iconColor` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={2}
									placeholder='Feature description'
									{...form.register(`features.${index}.description` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{features.fields.length === 0 && (
					<AdminEmptyState title='No features yet' />
				)}
				<AddRowButton onClick={() => features.append(createEmptyFeature())}>
					Add feature
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection
				title='Team section'
				description='Headline copy shown above the team grid.'>
				<AdminField label='Team title' htmlFor='tm-title'>
					<Input
						id='tm-title'
						placeholder='Meet the Team'
						{...form.register('teamTitle')}
					/>
				</AdminField>
				<AdminField label='Team description' htmlFor='tm-desc'>
					<Textarea
						id='tm-desc'
						rows={3}
						placeholder='Brief description'
						{...form.register('teamDescription')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Team members'>
				<AdminItemList>
					{teamMembers.fields.map((field, index) => {
						const image = form.watch(`teamMembers.${index}.image`);
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={teamMembers.fields.length}
								title={
									form.watch(`teamMembers.${index}.name`) ||
									`Member ${index + 1}`
								}
								subtitle={
									form.watch(`teamMembers.${index}.position`) || undefined
								}
								onMove={d => teamMembers.move(index, index + d)}
								onRemove={() => teamMembers.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Name'>
										<Input
											placeholder='Dr. Jane Doe'
											{...form.register(`teamMembers.${index}.name` as const)}
										/>
									</AdminField>
									<AdminField label='Position'>
										<Input
											placeholder='Placement Officer'
											{...form.register(
												`teamMembers.${index}.position` as const
											)}
										/>
									</AdminField>
									<AdminField label='Email'>
										<Input
											type='email'
											placeholder='jane@bpitindia.edu.in'
											{...form.register(`teamMembers.${index}.email` as const)}
										/>
									</AdminField>
									<AdminField label='Initials'>
										<Input
											placeholder='JD'
											{...form.register(
												`teamMembers.${index}.initials` as const
											)}
										/>
									</AdminField>
									<AdminField label='Gradient color'>
										<Input
											placeholder='bg-gradient-to-br from-blue-500 to-blue-600'
											{...form.register(
												`teamMembers.${index}.gradientColor` as const
											)}
										/>
									</AdminField>
									<AdminField label='Text color'>
										<Input
											placeholder='text-white'
											{...form.register(
												`teamMembers.${index}.textColor` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Profile image'>
									<Input
										placeholder='Image URL'
										{...form.register(`teamMembers.${index}.image` as const)}
									/>
									<div className='mt-2'>
										<UploadButton
											onUpload={(url: string) =>
												form.setValue(`teamMembers.${index}.image`, url, {
													shouldDirty: true
												})
											}
											buttonText='Upload image'
										/>
									</div>
									{image && (
										<div className='mt-3 h-16 w-16 overflow-hidden rounded-full border border-slate-200'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={image}
												alt='Preview'
												className='h-full w-full object-cover'
											/>
										</div>
									)}
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{teamMembers.fields.length === 0 && (
					<AdminEmptyState title='No team members yet' />
				)}
				<AddRowButton
					onClick={() => teamMembers.append(createEmptyTeamMember())}>
					Add member
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
