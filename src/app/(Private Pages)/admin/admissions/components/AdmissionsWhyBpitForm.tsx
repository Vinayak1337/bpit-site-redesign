'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	type AdmissionsWhyBpitPageData,
	updateWhyBpitAccreditations,
	updateWhyBpitFinalCta,
	updateWhyBpitHero,
	updateWhyBpitHighlights,
	updateWhyBpitStats
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_ICON_NAMES } from '@/lib/admissions-icons';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { createClientId } from '@/lib/utils';
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

type Props = {
	initialData: AdmissionsWhyBpitPageData;
	onChange?: (data: AdmissionsWhyBpitPageData) => void;
	visibleSections?: Array<
		'hero' | 'stats' | 'highlights' | 'accreditations' | 'finalCta'
	>;
};

type FormValues = {
	heroBadgeText: string;
	heroTitle: string;
	heroDescription: string;
	quickPointsTitle: string;
	quickPoints: Array<{ id: string; value: string }>;
	primaryCtaLabel: string;
	primaryCtaHref: string;
	secondaryCtaLabel: string;
	secondaryCtaHref: string;
	statsEyebrow: string;
	statsTitle: string;
	statsDescription: string;
	stats: Array<{ id: string; value: string; label: string; icon: string }>;
	highlightsEyebrow: string;
	highlightsTitle: string;
	highlightsDescription: string;
	highlights: Array<{
		id: string;
		icon: string;
		title: string;
		description: string;
	}>;
	accreditationsEyebrow: string;
	accreditationsTitle: string;
	accreditationsDescription: string;
	accreditations: Array<{
		id: string;
		icon: string;
		title: string;
		subtitle: string;
	}>;
	finalCtaTitle: string;
	finalCtaSubtitle: string;
	finalCtas: Array<{
		id: string;
		label: string;
		href: string;
		icon: 'target' | 'map' | 'phone';
	}>;
};

const createStringRow = () => ({
	id: createClientId('admissions-why-string'),
	value: ''
});
const createStat = () => ({
	id: createClientId('admissions-why-stat'),
	value: '',
	label: '',
	icon: 'Building2'
});
const createHighlight = () => ({
	id: createClientId('admissions-why-highlight'),
	icon: 'BookOpen',
	title: '',
	description: ''
});
const createAccreditation = () => ({
	id: createClientId('admissions-why-accreditation'),
	icon: 'Award',
	title: '',
	subtitle: ''
});
const createCta = () => ({
	id: createClientId('admissions-why-cta'),
	label: '',
	href: '',
	icon: 'target' as const
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

const normalizeData = (values: FormValues): AdmissionsWhyBpitPageData => ({
	hero: {
		badgeText: values.heroBadgeText.trim(),
		title: values.heroTitle.trim(),
		description: values.heroDescription.trim(),
		quickPointsTitle: values.quickPointsTitle.trim(),
		quickPoints: values.quickPoints.map(i => i.value.trim()).filter(Boolean),
		primaryCta: {
			label: values.primaryCtaLabel.trim(),
			href: values.primaryCtaHref.trim()
		},
		secondaryCta: {
			label: values.secondaryCtaLabel.trim(),
			href: values.secondaryCtaHref.trim()
		}
	},
	stats: {
		eyebrow: values.statsEyebrow.trim(),
		title: values.statsTitle.trim(),
		description: values.statsDescription.trim(),
		items: values.stats
			.map(i => ({
				value: i.value.trim(),
				label: i.label.trim(),
				icon: i.icon.trim()
			}))
			.filter(i => i.value && i.label)
	},
	highlights: {
		eyebrow: values.highlightsEyebrow.trim(),
		title: values.highlightsTitle.trim(),
		description: values.highlightsDescription.trim(),
		items: values.highlights
			.map(i => ({
				icon: i.icon.trim(),
				title: i.title.trim(),
				description: i.description.trim()
			}))
			.filter(i => i.title && i.description)
	},
	accreditations: {
		eyebrow: values.accreditationsEyebrow.trim(),
		title: values.accreditationsTitle.trim(),
		description: values.accreditationsDescription.trim(),
		items: values.accreditations
			.map(i => ({
				icon: i.icon.trim(),
				title: i.title.trim(),
				subtitle: i.subtitle.trim()
			}))
			.filter(i => i.title && i.subtitle)
	},
	finalCta: {
		title: values.finalCtaTitle.trim(),
		subtitle: values.finalCtaSubtitle.trim(),
		ctas: values.finalCtas
			.map(i => ({
				label: i.label.trim(),
				href: i.href.trim(),
				icon: i.icon
			}))
			.filter(i => i.label && i.href)
	}
});

export default function AdmissionsWhyBpitForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const defaults = useMemo<FormValues>(
		() => ({
			heroBadgeText: initialData.hero.badgeText,
			heroTitle: initialData.hero.title,
			heroDescription: initialData.hero.description,
			quickPointsTitle: initialData.hero.quickPointsTitle,
			quickPoints:
				initialData.hero.quickPoints.length > 0
					? initialData.hero.quickPoints.map((item, i) => ({
							id: `why-quick-point-${i}`,
							value: item
						}))
					: [createStringRow()],
			primaryCtaLabel: initialData.hero.primaryCta.label,
			primaryCtaHref: initialData.hero.primaryCta.href,
			secondaryCtaLabel: initialData.hero.secondaryCta.label,
			secondaryCtaHref: initialData.hero.secondaryCta.href,
			statsEyebrow: initialData.stats.eyebrow,
			statsTitle: initialData.stats.title,
			statsDescription: initialData.stats.description,
			stats:
				initialData.stats.items.length > 0
					? initialData.stats.items.map((item, i) => ({
							id: `why-stat-${i}`,
							value: item.value,
							label: item.label,
							icon: item.icon ?? 'Building2'
						}))
					: [createStat()],
			highlightsEyebrow: initialData.highlights.eyebrow,
			highlightsTitle: initialData.highlights.title,
			highlightsDescription: initialData.highlights.description,
			highlights:
				initialData.highlights.items.length > 0
					? initialData.highlights.items.map((item, i) => ({
							id: `why-highlight-${i}`,
							icon: item.icon,
							title: item.title,
							description: item.description
						}))
					: [createHighlight()],
			accreditationsEyebrow: initialData.accreditations.eyebrow,
			accreditationsTitle: initialData.accreditations.title,
			accreditationsDescription: initialData.accreditations.description,
			accreditations:
				initialData.accreditations.items.length > 0
					? initialData.accreditations.items.map((item, i) => ({
							id: `why-accreditation-${i}`,
							icon: item.icon,
							title: item.title,
							subtitle: item.subtitle
						}))
					: [createAccreditation()],
			finalCtaTitle: initialData.finalCta.title,
			finalCtaSubtitle: initialData.finalCta.subtitle,
			finalCtas:
				initialData.finalCta.ctas.length > 0
					? initialData.finalCta.ctas.map((item, i) => ({
							id: `why-final-cta-${i}`,
							label: item.label,
							href: item.href,
							icon: item.icon ?? 'target'
						}))
					: [createCta()]
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const quickPointsArray = useFieldArray({
		control: form.control,
		name: 'quickPoints'
	});
	const statsArray = useFieldArray({ control: form.control, name: 'stats' });
	const highlightsArray = useFieldArray({
		control: form.control,
		name: 'highlights'
	});
	const accreditationsArray = useFieldArray({
		control: form.control,
		name: 'accreditations'
	});
	const finalCtasArray = useFieldArray({
		control: form.control,
		name: 'finalCtas'
	});

	useEffect(() => {
		form.reset(defaults);
	}, [defaults, form]);

	useEffect(() => {
		onChange?.(normalizeData(form.getValues()));
		const sub = form.watch(v => {
			onChange?.(normalizeData(v as FormValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const payload = normalizeData(values);
		startTransition(async () => {
			const tasks: Promise<{ ok: boolean }>[] = [];
			if (includes(visibleSections, 'hero'))
				tasks.push(updateWhyBpitHero(payload.hero));
			if (includes(visibleSections, 'stats'))
				tasks.push(updateWhyBpitStats(payload.stats));
			if (includes(visibleSections, 'highlights'))
				tasks.push(updateWhyBpitHighlights(payload.highlights));
			if (includes(visibleSections, 'accreditations'))
				tasks.push(updateWhyBpitAccreditations(payload.accreditations));
			if (includes(visibleSections, 'finalCta'))
				tasks.push(updateWhyBpitFinalCta(payload.finalCta));
			const results = await Promise.all(tasks);
			setStatus(
				results.every(r => r.ok)
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			{includes(visibleSections, 'hero') && (
				<AdminFormSection title='Hero'>
					<AdminField label='Badge'>
						<Input {...form.register('heroBadgeText')} />
					</AdminField>
					<AdminField label='Title'>
						<Input {...form.register('heroTitle')} />
					</AdminField>
					<AdminField label='Description'>
						<Textarea
							rows={4}
							className='resize-none'
							{...form.register('heroDescription')}
						/>
					</AdminField>
					<AdminField label='Quick points title'>
						<Input {...form.register('quickPointsTitle')} />
					</AdminField>
					<AdminItemList>
						{quickPointsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={quickPointsArray.fields.length}
								title={`Point ${index + 1}`}
								onMove={d => quickPointsArray.move(index, index + d)}
								onRemove={() => quickPointsArray.remove(index)}>
								<AdminField label='Point'>
									<Textarea
										rows={2}
										className='resize-none'
										{...form.register(`quickPoints.${index}.value` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{quickPointsArray.fields.length === 0 && (
						<AdminEmptyState title='No quick points yet' />
					)}
					<AddRowButton
						onClick={() => quickPointsArray.append(createStringRow())}>
						Add point
					</AddRowButton>
					<AdminFieldGrid>
						<AdminField label='Primary CTA label'>
							<Input {...form.register('primaryCtaLabel')} />
						</AdminField>
						<AdminField label='Primary CTA href'>
							<Input {...form.register('primaryCtaHref')} />
						</AdminField>
						<AdminField label='Secondary CTA label'>
							<Input {...form.register('secondaryCtaLabel')} />
						</AdminField>
						<AdminField label='Secondary CTA href'>
							<Input {...form.register('secondaryCtaHref')} />
						</AdminField>
					</AdminFieldGrid>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'stats') && (
				<AdminFormSection title='Stats'>
					<AdminFieldGrid>
						<AdminField label='Eyebrow'>
							<Input {...form.register('statsEyebrow')} />
						</AdminField>
						<AdminField label='Title'>
							<Input {...form.register('statsTitle')} />
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('statsDescription')}
						/>
					</AdminField>
					<AdminItemList>
						{statsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={statsArray.fields.length}
								title={form.watch(`stats.${index}.label`) || `Stat ${index + 1}`}
								onMove={d => statsArray.move(index, index + d)}
								onRemove={() => statsArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Value'>
										<Input {...form.register(`stats.${index}.value` as const)} />
									</AdminField>
									<AdminField label='Label'>
										<Input {...form.register(`stats.${index}.label` as const)} />
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`stats.${index}.icon`) || 'Building2'}
										onValueChange={v =>
											form.setValue(`stats.${index}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select icon' />
										</SelectTrigger>
										<SelectContent>
											{ADMISSIONS_ICON_NAMES.map(icon => (
												<SelectItem key={icon} value={icon}>
													{icon}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{statsArray.fields.length === 0 && (
						<AdminEmptyState title='No stats yet' />
					)}
					<AddRowButton onClick={() => statsArray.append(createStat())}>
						Add stat
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'highlights') && (
				<AdminFormSection title='Highlights'>
					<AdminFieldGrid>
						<AdminField label='Eyebrow'>
							<Input {...form.register('highlightsEyebrow')} />
						</AdminField>
						<AdminField label='Title'>
							<Input {...form.register('highlightsTitle')} />
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('highlightsDescription')}
						/>
					</AdminField>
					<AdminItemList>
						{highlightsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={highlightsArray.fields.length}
								title={
									form.watch(`highlights.${index}.title`) ||
									`Highlight ${index + 1}`
								}
								onMove={d => highlightsArray.move(index, index + d)}
								onRemove={() => highlightsArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Title'>
										<Input
											{...form.register(`highlights.${index}.title` as const)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										<Select
											value={
												form.watch(`highlights.${index}.icon`) || 'BookOpen'
											}
											onValueChange={v =>
												form.setValue(`highlights.${index}.icon`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select icon' />
											</SelectTrigger>
											<SelectContent>
												{ADMISSIONS_ICON_NAMES.map(icon => (
													<SelectItem key={icon} value={icon}>
														{icon}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={3}
										className='resize-none'
										{...form.register(
											`highlights.${index}.description` as const
										)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{highlightsArray.fields.length === 0 && (
						<AdminEmptyState title='No highlights yet' />
					)}
					<AddRowButton
						onClick={() => highlightsArray.append(createHighlight())}>
						Add highlight
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'accreditations') && (
				<AdminFormSection title='Accreditations'>
					<AdminFieldGrid>
						<AdminField label='Eyebrow'>
							<Input {...form.register('accreditationsEyebrow')} />
						</AdminField>
						<AdminField label='Title'>
							<Input {...form.register('accreditationsTitle')} />
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('accreditationsDescription')}
						/>
					</AdminField>
					<AdminItemList>
						{accreditationsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={accreditationsArray.fields.length}
								title={
									form.watch(`accreditations.${index}.title`) ||
									`Card ${index + 1}`
								}
								onMove={d => accreditationsArray.move(index, index + d)}
								onRemove={() => accreditationsArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Title'>
										<Input
											{...form.register(`accreditations.${index}.title` as const)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										<Select
											value={
												form.watch(`accreditations.${index}.icon`) || 'Award'
											}
											onValueChange={v =>
												form.setValue(`accreditations.${index}.icon`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select icon' />
											</SelectTrigger>
											<SelectContent>
												{ADMISSIONS_ICON_NAMES.map(icon => (
													<SelectItem key={icon} value={icon}>
														{icon}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Subtitle'>
									<Input
										{...form.register(
											`accreditations.${index}.subtitle` as const
										)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{accreditationsArray.fields.length === 0 && (
						<AdminEmptyState title='No accreditation cards yet' />
					)}
					<AddRowButton
						onClick={() => accreditationsArray.append(createAccreditation())}>
						Add card
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'finalCta') && (
				<AdminFormSection title='Final CTA'>
					<AdminField label='Title'>
						<Input {...form.register('finalCtaTitle')} />
					</AdminField>
					<AdminField label='Subtitle'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('finalCtaSubtitle')}
						/>
					</AdminField>
					<AdminItemList>
						{finalCtasArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={finalCtasArray.fields.length}
								title={
									form.watch(`finalCtas.${index}.label`) || `CTA ${index + 1}`
								}
								onMove={d => finalCtasArray.move(index, index + d)}
								onRemove={() => finalCtasArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Label'>
										<Input
											{...form.register(`finalCtas.${index}.label` as const)}
										/>
									</AdminField>
									<AdminField label='Href'>
										<Input
											{...form.register(`finalCtas.${index}.href` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`finalCtas.${index}.icon`) || 'target'}
										onValueChange={v =>
											form.setValue(
												`finalCtas.${index}.icon`,
												v as 'target' | 'map' | 'phone',
												{ shouldDirty: true }
											)
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select icon' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='target'>target</SelectItem>
											<SelectItem value='map'>map</SelectItem>
											<SelectItem value='phone'>phone</SelectItem>
										</SelectContent>
									</Select>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{finalCtasArray.fields.length === 0 && (
						<AdminEmptyState title='No CTAs yet' />
					)}
					<AddRowButton onClick={() => finalCtasArray.append(createCta())}>
						Add CTA
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
