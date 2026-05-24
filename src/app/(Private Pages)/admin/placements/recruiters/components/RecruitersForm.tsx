'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UploadButton from '@/components/cloudinary/upload-button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	updateRecruitersData,
	type RecruitersData,
	type RecruiterStat,
	type Recruiter,
	type CTAButton
} from '@/app/(Private Pages)/actions/recruiters';
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

interface RecruitersFormProps {
	initialData: RecruitersData;
	pageSlug: string;
	onChange?: (data: RecruitersData) => void;
}

interface FormValues {
	hero: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
	};
	stats: RecruiterStat[];
	categories: { name: string }[];
	recruiters: Recruiter[];
	cta: {
		title: string;
		subtitle: string;
		buttons: CTAButton[];
		gradient: string;
	};
}

const COLOR_OPTIONS = [
	'from-blue-500 to-blue-700',
	'from-purple-500 to-purple-700',
	'from-green-500 to-green-700',
	'from-red-500 to-red-700',
	'from-orange-500 to-orange-700',
	'from-pink-500 to-pink-700',
	'from-indigo-500 to-indigo-700',
	'from-teal-500 to-teal-700'
];

const TYPE_OPTIONS = [
	'MNC',
	'Product Giant',
	'Consulting',
	'Banking',
	'Unicorn',
	'R&D',
	'Fintech',
	'Startup',
	'Other'
];

const CATEGORY_OPTIONS = [
	'IT Services',
	'Product Companies',
	'Consulting',
	'Core Engineering',
	'Banking & Finance',
	'Startups',
	'Healthcare',
	'E-commerce',
	'Fintech',
	'Other'
];

export default function RecruitersForm({
	initialData,
	onChange
}: RecruitersFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			hero: initialData.hero,
			stats: initialData.stats,
			categories: initialData.categories.map(name => ({ name })),
			recruiters: initialData.recruiters,
			cta: initialData.cta
		}
	});

	const statsArray = useFieldArray({ control: form.control, name: 'stats' });
	const categoriesArray = useFieldArray({
		control: form.control,
		name: 'categories'
	});
	const recruitersArray = useFieldArray({
		control: form.control,
		name: 'recruiters'
	});
	const ctaButtonsArray = useFieldArray({
		control: form.control,
		name: 'cta.buttons'
	});

	useEffect(() => {
		const sub = form.watch(formValues => {
			onChange?.({
				hero: (formValues.hero as RecruitersData['hero']) || initialData.hero,
				stats: (formValues.stats as RecruitersData['stats']) || initialData.stats,
				categories: (formValues.categories || []).map(c => c?.name || ''),
				recruiters:
					(formValues.recruiters as RecruitersData['recruiters']) ||
					initialData.recruiters,
				cta: (formValues.cta as RecruitersData['cta']) || initialData.cta
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
				const dataToSubmit: RecruitersData = {
					hero: values.hero,
					stats: values.stats,
					categories: values.categories.map(c => c.name),
					recruiters: values.recruiters,
					cta: values.cta
				};
				const result = await updateRecruitersData(dataToSubmit, admin.id);
				setStatus(
					result.success
						? { kind: 'success', message: 'Saved' }
						: { kind: 'error', message: 'Save failed' }
				);
			} catch (error) {
				console.error('Error updating recruiters:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Hero'
				description='Top banner copy for the recruiters page.'>
				<AdminField label='Icon'>
					<Select
						value={form.watch('hero.icon')}
						onValueChange={v =>
							form.setValue('hero.icon', v, { shouldDirty: true })
						}>
						<SelectTrigger>
							<SelectValue placeholder='Select icon' />
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
				<AdminField label='Title'>
					<Input
						placeholder='Our Recruiters'
						{...form.register('hero.title')}
					/>
				</AdminField>
				<AdminField label='Subtitle'>
					<Textarea
						rows={2}
						placeholder='Hero subtitle…'
						{...form.register('hero.subtitle')}
					/>
				</AdminField>
				<AdminField
					label='Background gradient (Tailwind classes)'
					hint='Used in the rendered hero band.'>
					<Input
						placeholder='from-blue-900 via-blue-800 to-blue-900'
						{...form.register('hero.gradient')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Statistics'>
				<AdminItemList>
					{statsArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={statsArray.fields.length}
							title={
								form.watch(`stats.${index}.label`) || `Stat ${index + 1}`
							}
							subtitle={form.watch(`stats.${index}.value`) || undefined}
							onMove={d => statsArray.move(index, index + d)}
							onRemove={() => statsArray.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`stats.${index}.icon`) || 'TrendingUp'}
										onValueChange={v =>
											form.setValue(`stats.${index}.icon`, v, {
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
								<AdminField label='Value'>
									<Input
										placeholder='500+'
										{...form.register(`stats.${index}.value` as const)}
									/>
								</AdminField>
								<AdminField label='Label'>
									<Input
										placeholder='Companies'
										{...form.register(`stats.${index}.label` as const)}
									/>
								</AdminField>
								<AdminField label='Color gradient'>
									<Select
										value={form.watch(`stats.${index}.color`) || COLOR_OPTIONS[0]}
										onValueChange={v =>
											form.setValue(`stats.${index}.color`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(color => (
												<SelectItem key={color} value={color}>
													{color}
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
					<AdminEmptyState title='No stats yet' />
				)}
				<AddRowButton
					onClick={() =>
						statsArray.append({
							icon: 'TrendingUp',
							value: '0',
							label: 'New Stat',
							color: COLOR_OPTIONS[0]
						})
					}>
					Add stat
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Categories'>
				<AdminItemList>
					{categoriesArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={categoriesArray.fields.length}
							title={
								form.watch(`categories.${index}.name`) ||
								`Category ${index + 1}`
							}
							onMove={d => categoriesArray.move(index, index + d)}
							onRemove={() => categoriesArray.remove(index)}>
							<AdminField label={`Category ${index + 1}`} className='[&_label]:sr-only'>
								<Input
									placeholder='Category name'
									{...form.register(`categories.${index}.name` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{categoriesArray.fields.length === 0 && (
					<AdminEmptyState title='No categories yet' />
				)}
				<AddRowButton
					onClick={() => categoriesArray.append({ name: 'New Category' })}>
					Add category
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Recruiters'>
				<AdminItemList>
					{recruitersArray.fields.map((field, index) => {
						const logo = form.watch(`recruiters.${index}.logo`);
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={recruitersArray.fields.length}
								title={
									form.watch(`recruiters.${index}.name`) ||
									`Company ${index + 1}`
								}
								subtitle={
									form.watch(`recruiters.${index}.category`) || undefined
								}
								onMove={d => recruitersArray.move(index, index + d)}
								onRemove={() => recruitersArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Company name'>
										<Input
											placeholder='Company Name'
											{...form.register(`recruiters.${index}.name` as const)}
										/>
									</AdminField>
									<AdminField label='Category'>
										<Select
											value={
												form.watch(`recruiters.${index}.category`) ||
												'IT Services'
											}
											onValueChange={v =>
												form.setValue(
													`recruiters.${index}.category`,
													v as Recruiter['category'],
													{ shouldDirty: true }
												)
											}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{CATEGORY_OPTIONS.map(cat => (
													<SelectItem key={cat} value={cat}>
														{cat}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Sector'>
										<Input
											placeholder='Information Technology'
											{...form.register(`recruiters.${index}.sector` as const)}
										/>
									</AdminField>
									<AdminField label='Location'>
										<Input
											placeholder='Global Operations'
											{...form.register(`recruiters.${index}.location` as const)}
										/>
									</AdminField>
									<AdminField label='Type'>
										<Select
											value={form.watch(`recruiters.${index}.type`) || 'MNC'}
											onValueChange={v =>
												form.setValue(
													`recruiters.${index}.type`,
													v as Recruiter['type'],
													{ shouldDirty: true }
												)
											}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{TYPE_OPTIONS.map(type => (
													<SelectItem key={type} value={type}>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Established'>
										<Input
											placeholder='2000'
											{...form.register(
												`recruiters.${index}.established` as const
											)}
										/>
									</AdminField>
									<AdminField label='Website'>
										<Input
											placeholder='https://example.com'
											{...form.register(`recruiters.${index}.website` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Company logo'>
									<Input
										placeholder='Logo URL or /recruiters/logo.png'
										{...form.register(`recruiters.${index}.logo` as const)}
									/>
									<div className='mt-2'>
										<UploadButton
											onUpload={url =>
												form.setValue(`recruiters.${index}.logo`, url, {
													shouldDirty: true
												})
											}
											buttonText='Upload logo'
										/>
									</div>
									{logo && (
										<div className='mt-3'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={logo}
												alt='Logo preview'
												className='h-12 object-contain'
											/>
										</div>
									)}
								</AdminField>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										placeholder='Company description…'
										{...form.register(
											`recruiters.${index}.description` as const
										)}
									/>
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{recruitersArray.fields.length === 0 && (
					<AdminEmptyState title='No recruiters yet' />
				)}
				<AddRowButton
					onClick={() =>
						recruitersArray.append({
							name: 'New Company',
							logo: '/recruiters/company.png',
							category: 'IT Services',
							sector: 'Technology',
							location: 'Global',
							type: 'MNC',
							established: '2000',
							website: 'https://example.com',
							description: 'Company description…'
						})
					}>
					Add company
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Call to action'>
				<AdminField label='Title'>
					<Input
						placeholder='Want to Partner with Us?'
						{...form.register('cta.title')}
					/>
				</AdminField>
				<AdminField label='Subtitle'>
					<Textarea
						rows={2}
						placeholder='CTA subtitle…'
						{...form.register('cta.subtitle')}
					/>
				</AdminField>
				<AdminField label='Background gradient (Tailwind classes)'>
					<Input
						placeholder='from-blue-900 via-blue-800 to-blue-900'
						{...form.register('cta.gradient')}
					/>
				</AdminField>

				<div className='flex flex-col gap-3'>
					<p className='text-sm font-medium text-slate-700'>CTA buttons</p>
					<AdminItemList>
						{ctaButtonsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={ctaButtonsArray.fields.length}
								title={
									form.watch(`cta.buttons.${index}.text`) ||
									`Button ${index + 1}`
								}
								onMove={d => ctaButtonsArray.move(index, index + d)}
								onRemove={() => ctaButtonsArray.remove(index)}>
								<AdminFieldGrid cols={3}>
									<AdminField label='Text'>
										<Input
											placeholder='Button text'
											{...form.register(`cta.buttons.${index}.text` as const)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										<Select
											value={
												form.watch(`cta.buttons.${index}.icon`) || 'Building2'
											}
											onValueChange={v =>
												form.setValue(`cta.buttons.${index}.icon`, v, {
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
											value={
												form.watch(`cta.buttons.${index}.variant`) || 'primary'
											}
											onValueChange={v =>
												form.setValue(
													`cta.buttons.${index}.variant`,
													v as CTAButton['variant'],
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
					{ctaButtonsArray.fields.length === 0 && (
						<AdminEmptyState title='No buttons yet' />
					)}
					<AddRowButton
						onClick={() =>
							ctaButtonsArray.append({
								text: 'Button Text',
								icon: 'Building2',
								variant: 'primary'
							})
						}>
						Add button
					</AddRowButton>
				</div>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
