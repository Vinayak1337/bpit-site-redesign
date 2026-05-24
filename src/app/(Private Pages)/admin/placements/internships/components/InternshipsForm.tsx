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
	type InternshipsData,
	type InternshipStat,
	type InternshipBenefit,
	type InternshipOpportunity,
	type ProcessStep,
	type ContactButton
} from '@/app/(Private Pages)/actions/internships';
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

interface InternshipsFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange?: (data: InternshipsData) => void;
}

interface NamedItem {
	name: string;
}

interface FormValues {
	hero: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
	};
	stats: InternshipStat[];
	benefits: InternshipBenefit[];
	filters: NamedItem[];
	opportunities: (InternshipOpportunity & { domainsArray: NamedItem[] })[];
	process: ProcessStep[];
	contact: {
		title: string;
		subtitle: string;
		phone: string;
		email: string;
		buttons: ContactButton[];
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

const BENEFIT_COLOR_OPTIONS = ['blue', 'green', 'purple', 'orange'];

const INTERNSHIP_TYPE_OPTIONS = [
	'Summer Internship',
	'Winter Internship',
	'Research Internship',
	'Industry Project',
	'Startup Internship'
];

const CATEGORY_OPTIONS = [
	'Technology',
	'Research',
	'Fintech',
	'E-commerce',
	'Food Tech',
	'Aerospace',
	'Healthcare',
	'Manufacturing',
	'Consulting',
	'Other'
];

const toData = (values: FormValues): InternshipsData => ({
	hero: values.hero,
	stats: values.stats,
	benefits: values.benefits,
	filters: values.filters.map(f => f?.name || '').filter(Boolean),
	opportunities: values.opportunities.map(opp => ({
		company: opp?.company || '',
		title: opp?.title || '',
		type: opp?.type || '',
		location: opp?.location || '',
		description: opp?.description || '',
		logo: opp?.logo || '',
		category: opp?.category || '',
		domains: (opp?.domainsArray || [])
			.map(d => d?.name || '')
			.filter(Boolean)
	})),
	process: values.process,
	contact: values.contact
});

export default function InternshipsForm({
	initialData,
	onChange
}: InternshipsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			hero: initialData.hero,
			stats: initialData.stats,
			benefits: initialData.benefits,
			filters: initialData.filters.map(name => ({ name })),
			opportunities: initialData.opportunities.map(opp => ({
				...opp,
				domainsArray: opp.domains.map(d => ({ name: d }))
			})),
			process: initialData.process,
			contact: initialData.contact
		}
	});

	const statsArray = useFieldArray({ control: form.control, name: 'stats' });
	const benefitsArray = useFieldArray({ control: form.control, name: 'benefits' });
	const filtersArray = useFieldArray({ control: form.control, name: 'filters' });
	const opportunitiesArray = useFieldArray({
		control: form.control,
		name: 'opportunities'
	});
	const processArray = useFieldArray({ control: form.control, name: 'process' });
	const contactButtonsArray = useFieldArray({
		control: form.control,
		name: 'contact.buttons'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange?.(toData(values as FormValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

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
				const result = await updateInternshipsData(toData(values), admin.id);
				setStatus(
					result.success
						? { kind: 'success', message: 'Saved' }
						: { kind: 'error', message: 'Save failed' }
				);
			} catch (error) {
				console.error('Error updating internships:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const iconSelect = (
		value: string | undefined,
		onValueChange: (v: string) => void
	) => (
		<Select value={value || 'TrendingUp'} onValueChange={onValueChange}>
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
	);

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Hero'
				description='Top banner copy for the internships page.'>
				<AdminField label='Icon'>
					{iconSelect(form.watch('hero.icon'), v =>
						form.setValue('hero.icon', v, { shouldDirty: true })
					)}
				</AdminField>
				<AdminField label='Title'>
					<Input {...form.register('hero.title')} />
				</AdminField>
				<AdminField label='Subtitle'>
					<Textarea rows={2} {...form.register('hero.subtitle')} />
				</AdminField>
				<AdminField label='Background gradient (Tailwind classes)'>
					<Input
						placeholder='from-blue-900 via-blue-800 to-blue-900'
						{...form.register('hero.gradient')}
					/>
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Stats'>
				<AdminItemList>
					{statsArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={statsArray.fields.length}
							title={form.watch(`stats.${index}.label`) || `Stat ${index + 1}`}
							subtitle={form.watch(`stats.${index}.value`) || undefined}
							onMove={d => statsArray.move(index, index + d)}
							onRemove={() => statsArray.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									{iconSelect(form.watch(`stats.${index}.icon`), v =>
										form.setValue(`stats.${index}.icon`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Value'>
									<Input {...form.register(`stats.${index}.value` as const)} />
								</AdminField>
								<AdminField label='Label'>
									<Input {...form.register(`stats.${index}.label` as const)} />
								</AdminField>
								<AdminField label='Color'>
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
											{COLOR_OPTIONS.map(c => (
												<SelectItem key={c} value={c}>
													{c}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{statsArray.fields.length === 0 && <AdminEmptyState title='No stats yet' />}
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

			<AdminFormSection title='Benefits'>
				<AdminItemList>
					{benefitsArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={benefitsArray.fields.length}
							title={
								form.watch(`benefits.${index}.title`) ||
								`Benefit ${index + 1}`
							}
							onMove={d => benefitsArray.move(index, index + d)}
							onRemove={() => benefitsArray.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									{iconSelect(form.watch(`benefits.${index}.icon`), v =>
										form.setValue(`benefits.${index}.icon`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Color'>
									<Select
										value={form.watch(`benefits.${index}.color`) || 'blue'}
										onValueChange={v =>
											form.setValue(
												`benefits.${index}.color`,
												v as InternshipBenefit['color'],
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{BENEFIT_COLOR_OPTIONS.map(c => (
												<SelectItem key={c} value={c}>
													{c}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Title'>
								<Input {...form.register(`benefits.${index}.title` as const)} />
							</AdminField>
							<AdminField label='Description'>
								<Textarea
									rows={2}
									{...form.register(`benefits.${index}.description` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{benefitsArray.fields.length === 0 && (
					<AdminEmptyState title='No benefits yet' />
				)}
				<AddRowButton
					onClick={() =>
						benefitsArray.append({
							icon: 'Award',
							title: 'New Benefit',
							description: 'Description',
							color: 'blue'
						})
					}>
					Add benefit
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Filters'>
				<AdminItemList>
					{filtersArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={filtersArray.fields.length}
							title={
								form.watch(`filters.${index}.name`) || `Filter ${index + 1}`
							}
							onMove={d => filtersArray.move(index, index + d)}
							onRemove={() => filtersArray.remove(index)}>
							<AdminField label={`Filter ${index + 1}`} className='[&_label]:sr-only'>
								<Input {...form.register(`filters.${index}.name` as const)} />
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{filtersArray.fields.length === 0 && (
					<AdminEmptyState title='No filters yet' />
				)}
				<AddRowButton
					onClick={() => filtersArray.append({ name: 'New Filter' })}>
					Add filter
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Internship opportunities'>
				<AdminItemList>
					{opportunitiesArray.fields.map((field, index) => {
						const domains =
							form.watch(`opportunities.${index}.domainsArray`) || [];
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={opportunitiesArray.fields.length}
								title={
									form.watch(`opportunities.${index}.company`) ||
									`Opportunity ${index + 1}`
								}
								subtitle={
									form.watch(`opportunities.${index}.title`) || undefined
								}
								onMove={d => opportunitiesArray.move(index, index + d)}
								onRemove={() => opportunitiesArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Company name'>
										<Input
											{...form.register(
												`opportunities.${index}.company` as const
											)}
										/>
									</AdminField>
									<AdminField label='Title'>
										<Input
											{...form.register(`opportunities.${index}.title` as const)}
										/>
									</AdminField>
									<AdminField label='Type'>
										<Select
											value={
												form.watch(`opportunities.${index}.type`) ||
												'Summer Internship'
											}
											onValueChange={v =>
												form.setValue(`opportunities.${index}.type`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{INTERNSHIP_TYPE_OPTIONS.map(t => (
													<SelectItem key={t} value={t}>
														{t}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Category'>
										<Select
											value={
												form.watch(`opportunities.${index}.category`) ||
												'Technology'
											}
											onValueChange={v =>
												form.setValue(`opportunities.${index}.category`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{CATEGORY_OPTIONS.map(c => (
													<SelectItem key={c} value={c}>
														{c}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Location'>
										<Input
											{...form.register(
												`opportunities.${index}.location` as const
											)}
										/>
									</AdminField>
									<AdminField label='Logo path'>
										<Input
											{...form.register(`opportunities.${index}.logo` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										{...form.register(
											`opportunities.${index}.description` as const
										)}
									/>
								</AdminField>
								<div className='flex flex-col gap-3'>
									<p className='text-sm font-medium text-slate-700'>
										Focus areas / domains
									</p>
									<AdminItemList>
										{domains.map((_, domainIndex) => (
											<AdminItemCard
												key={domainIndex}
												index={domainIndex}
												total={domains.length}
												title={`Domain ${domainIndex + 1}`}
												onMove={d => {
													const j = domainIndex + d;
													if (j < 0 || j >= domains.length) return;
													const next = [...domains];
													[next[domainIndex], next[j]] = [
														next[j],
														next[domainIndex]
													];
													form.setValue(
														`opportunities.${index}.domainsArray`,
														next,
														{ shouldDirty: true }
													);
												}}
												onRemove={() => {
													const next = domains.filter(
														(_, idx) => idx !== domainIndex
													);
													form.setValue(
														`opportunities.${index}.domainsArray`,
														next,
														{ shouldDirty: true }
													);
												}}>
												<AdminField
													label={`Domain ${domainIndex + 1}`}
													className='[&_label]:sr-only'>
													<Input
														placeholder='Domain name'
														{...form.register(
															`opportunities.${index}.domainsArray.${domainIndex}.name` as const
														)}
													/>
												</AdminField>
											</AdminItemCard>
										))}
									</AdminItemList>
									<AddRowButton
										onClick={() => {
											const current =
												form.getValues(
													`opportunities.${index}.domainsArray`
												) || [];
											form.setValue(
												`opportunities.${index}.domainsArray`,
												[...current, { name: 'New Domain' }],
												{ shouldDirty: true }
											);
										}}>
										Add domain
									</AddRowButton>
								</div>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{opportunitiesArray.fields.length === 0 && (
					<AdminEmptyState title='No opportunities yet' />
				)}
				<AddRowButton
					onClick={() =>
						opportunitiesArray.append({
							company: 'New Company',
							title: 'Internship Title',
							type: 'Summer Internship',
							location: 'Location',
							description: 'Description',
							logo: '/internships/logo.png',
							category: 'Technology',
							domains: [],
							domainsArray: []
						})
					}>
					Add opportunity
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Process steps'>
				<AdminItemList>
					{processArray.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={processArray.fields.length}
							title={
								form.watch(`process.${index}.title`) || `Step ${index + 1}`
							}
							onMove={d => processArray.move(index, index + d)}
							onRemove={() => processArray.remove(index)}>
							<AdminField label='Icon'>
								{iconSelect(form.watch(`process.${index}.icon`), v =>
									form.setValue(`process.${index}.icon`, v, {
										shouldDirty: true
									})
								)}
							</AdminField>
							<AdminField label='Title'>
								<Input {...form.register(`process.${index}.title` as const)} />
							</AdminField>
							<AdminField label='Description'>
								<Textarea
									rows={2}
									{...form.register(`process.${index}.description` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{processArray.fields.length === 0 && (
					<AdminEmptyState title='No steps yet' />
				)}
				<AddRowButton
					onClick={() =>
						processArray.append({
							title: 'New Step',
							description: 'Description',
							icon: 'Users'
						})
					}>
					Add step
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Contact'>
				<AdminField label='Title'>
					<Input {...form.register('contact.title')} />
				</AdminField>
				<AdminField label='Subtitle'>
					<Textarea rows={2} {...form.register('contact.subtitle')} />
				</AdminField>
				<AdminFieldGrid>
					<AdminField label='Phone'>
						<Input {...form.register('contact.phone')} />
					</AdminField>
					<AdminField label='Email'>
						<Input {...form.register('contact.email')} />
					</AdminField>
				</AdminFieldGrid>
				<AdminField label='Background gradient (Tailwind classes)'>
					<Input {...form.register('contact.gradient')} />
				</AdminField>

				<div className='flex flex-col gap-3'>
					<p className='text-sm font-medium text-slate-700'>Action buttons</p>
					<AdminItemList>
						{contactButtonsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={contactButtonsArray.fields.length}
								title={
									form.watch(`contact.buttons.${index}.text`) ||
									`Button ${index + 1}`
								}
								onMove={d => contactButtonsArray.move(index, index + d)}
								onRemove={() => contactButtonsArray.remove(index)}>
								<AdminFieldGrid cols={3}>
									<AdminField label='Text'>
										<Input
											{...form.register(
												`contact.buttons.${index}.text` as const
											)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										{iconSelect(
											form.watch(`contact.buttons.${index}.icon`),
											v =>
												form.setValue(`contact.buttons.${index}.icon`, v, {
													shouldDirty: true
												})
										)}
									</AdminField>
									<AdminField label='Variant'>
										<Select
											value={
												form.watch(`contact.buttons.${index}.variant`) ||
												'primary'
											}
											onValueChange={v =>
												form.setValue(
													`contact.buttons.${index}.variant`,
													v as ContactButton['variant'],
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
					{contactButtonsArray.fields.length === 0 && (
						<AdminEmptyState title='No buttons yet' />
					)}
					<AddRowButton
						onClick={() =>
							contactButtonsArray.append({
								text: 'New Button',
								icon: 'BookOpen',
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
