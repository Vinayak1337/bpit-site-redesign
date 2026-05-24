'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import type { AboutOverviewData } from '@/app/(Private Pages)/actions/about';
import { updateAboutOverview } from '@/app/(Private Pages)/actions/about';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
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

type StatFormValue = {
	id: string;
	icon: string;
	value: string;
	label: string;
	color: AboutOverviewData['stats'][number]['color'];
};

type FormValues = {
	headerTitle: string;
	headerSubtitle: string;
	headerImage: string;
	established: string;
	location: string;
	accreditation: string;
	affiliation: string;
	stats: StatFormValue[];
};

type Props = {
	initialData: AboutOverviewData;
	pageSlug: string;
	onChange?: (data: AboutOverviewData) => void;
};

const COLOR_OPTIONS: AboutOverviewData['stats'][number]['color'][] = [
	'blue',
	'green',
	'purple'
];

const FALLBACK_ICON = 'GraduationCap';

const createEmptyStat = (): StatFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	value: '',
	label: '',
	color: 'blue'
});

const normalizeOverview = (values: Partial<FormValues>): AboutOverviewData => {
	const stats = (values.stats ?? [])
		.map(stat => ({
			icon: stat.icon?.trim().length ? stat.icon.trim() : FALLBACK_ICON,
			value: (stat.value ?? '').trim(),
			label: (stat.label ?? '').trim(),
			color: COLOR_OPTIONS.includes(stat.color ?? 'blue')
				? stat.color ?? 'blue'
				: 'blue'
		}))
		.filter(stat => stat.value.length > 0 && stat.label.length > 0);

	const headerImageValue = (values.headerImage ?? '').trim();

	return {
		header: {
			title: (values.headerTitle ?? '').trim() || 'About BPIT',
			subtitle:
				(values.headerSubtitle ?? '').trim() ||
				'Excellence in Engineering Education',
			image: headerImageValue.length > 0 ? headerImageValue : null,
			established: (values.established ?? '').trim() || '2007',
			location: (values.location ?? '').trim() || 'Rohini, New Delhi',
			accreditation: (values.accreditation ?? '').trim() || 'NBA & NAAC',
			affiliation: (values.affiliation ?? '').trim() || 'GGSIPU'
		},
		stats
	};
};

export default function AboutOverviewForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			headerTitle: initialData.header.title,
			headerSubtitle: initialData.header.subtitle,
			headerImage: initialData.header.image ?? '',
			established: initialData.header.established,
			location: initialData.header.location,
			accreditation: initialData.header.accreditation,
			affiliation: initialData.header.affiliation,
			stats:
				initialData.stats.length > 0
					? initialData.stats.map(stat => ({
							id: crypto.randomUUID(),
							icon: stat.icon,
							value: stat.value,
							label: stat.label,
							color: stat.color
						}))
					: [createEmptyStat()]
		}
	});

	const statsArray = useFieldArray({ control: form.control, name: 'stats' });

	useEffect(() => {
		onChange?.(normalizeOverview(form.getValues()));
		const subscription = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				stats: values.stats?.filter(Boolean) as StatFormValue[]
			};
			onChange?.(normalizeOverview(formValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const payload = normalizeOverview(values);
		startTransition(async () => {
			const result = await updateAboutOverview(pageSlug, payload);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	const iconOptions = useMemo(
		() => Array.from(new Set(SUPPORTED_ICON_NAMES)),
		[]
	);
	const headerImage = form.watch('headerImage');

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Overview'
				description='Headline details and stats shown on the About overview card.'>
				<AdminFieldGrid>
					<AdminField
						label='Title'
						htmlFor='ovr-title'
						error={form.formState.errors.headerTitle?.message}>
						<Input
							id='ovr-title'
							placeholder='Bhagwan Parshuram Institute…'
							{...form.register('headerTitle', { required: 'Title is required' })}
						/>
					</AdminField>
					<AdminField
						label='Subtitle'
						htmlFor='ovr-subtitle'
						error={form.formState.errors.headerSubtitle?.message}>
						<Input
							id='ovr-subtitle'
							placeholder='Excellence in Engineering Education'
							{...form.register('headerSubtitle', {
								required: 'Subtitle is required'
							})}
						/>
					</AdminField>
				</AdminFieldGrid>

				<AdminField
					label='Title image (optional)'
					htmlFor='ovr-image'
					hint='Displayed beside the BPIT title. The blue icon shows if no image is provided.'>
					<Input
						id='ovr-image'
						placeholder='https://…'
						{...form.register('headerImage')}
					/>
					<div className='mt-2 flex flex-wrap gap-2'>
						<CloudinaryUploadButton
							buttonText='Upload image'
							onUpload={url =>
								form.setValue('headerImage', url, {
									shouldDirty: true,
									shouldTouch: true
								})
							}
						/>
						<Button
							type='button'
							variant='outline'
							onClick={() =>
								form.setValue('headerImage', '', {
									shouldDirty: true,
									shouldTouch: true
								})
							}>
							Clear
						</Button>
					</div>
					{headerImage && (
						<div className='mt-3 h-32 w-full overflow-hidden rounded-md border border-slate-200'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={headerImage}
								alt='Title preview'
								className='h-full w-full object-cover'
							/>
						</div>
					)}
				</AdminField>

				<AdminFieldGrid>
					<AdminField label='Established' htmlFor='ovr-est'>
						<Input
							id='ovr-est'
							placeholder='2007'
							{...form.register('established', { required: true })}
						/>
					</AdminField>
					<AdminField label='Location' htmlFor='ovr-loc'>
						<Input
							id='ovr-loc'
							placeholder='Rohini, New Delhi'
							{...form.register('location', { required: true })}
						/>
					</AdminField>
					<AdminField label='Accreditation' htmlFor='ovr-acc'>
						<Input
							id='ovr-acc'
							placeholder='NBA & NAAC'
							{...form.register('accreditation', { required: true })}
						/>
					</AdminField>
					<AdminField label='Affiliation' htmlFor='ovr-aff'>
						<Input
							id='ovr-aff'
							placeholder='GGSIPU'
							{...form.register('affiliation', { required: true })}
						/>
					</AdminField>
				</AdminFieldGrid>
			</AdminFormSection>

			<AdminFormSection title='Stats'>
				<AdminItemList>
					{statsArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={statsArray.fields.length}
							title={`Stat ${index + 1}`}
							onMove={dir => statsArray.move(index, index + dir)}
							onRemove={() => statsArray.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Value'>
									<Input
										placeholder='1000+'
										{...form.register(`stats.${index}.value` as const, {
											required: true
										})}
									/>
								</AdminField>
								<AdminField label='Label'>
									<Input
										placeholder='Students Enrolled'
										{...form.register(`stats.${index}.label` as const, {
											required: true
										})}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`stats.${index}.icon`) || FALLBACK_ICON}
										onValueChange={v =>
											form.setValue(`stats.${index}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select icon' />
										</SelectTrigger>
										<SelectContent>
											{iconOptions.map(option => (
												<SelectItem key={option} value={option}>
													{option}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Color'>
									<Select
										value={form.watch(`stats.${index}.color`) || 'blue'}
										onValueChange={v =>
											form.setValue(
												`stats.${index}.color`,
												v as StatFormValue['color'],
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select color' />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(color => (
												<SelectItem key={color} value={color}>
													{color.charAt(0).toUpperCase() + color.slice(1)}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{statsArray.fields.length === 0 && (
					<AdminEmptyState
						title='No stats yet'
						description='Add at least one stat to display in this section.'
					/>
				)}
				<AddRowButton onClick={() => statsArray.append(createEmptyStat())}>
					Add stat
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
