'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
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

type HeroFormValue = {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
	iconColor: string;
	textColor: string;
};
type StatFormValue = {
	id: string;
	icon: string;
	value: string;
	label: string;
	iconColor: string;
	textColor: string;
};
type ContactFormValue = {
	id: string;
	icon: string;
	title: string;
	value: string;
	iconColor: string;
	textColor: string;
};
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
type TrainingAreaFormValue = {
	id: string;
	title: string;
	skills: string[];
	icon: string;
	iconColor: string;
	textColor: string;
};
type AchievementFormValue = {
	id: string;
	title: string;
	description: string;
	icon: string;
	highlight: string;
	category: string;
	department: string;
	iconColor: string;
	categoryColor: string;
	highlightColor: string;
};
type HighlightFormValue = {
	id: string;
	department: string;
	maxPackage: string;
	avgPackage: string;
	color: string;
	initials: string;
};

type FormValues = {
	hero: HeroFormValue;
	stats: StatFormValue[];
	missionTitle: string;
	missionDescription: string;
	servicesTitle: string;
	servicesDescription: string;
	features: FeatureFormValue[];
	teamTitle: string;
	teamDescription: string;
	teamMembers: TeamMemberFormValue[];
	trainingTitle: string;
	trainingDescription: string;
	trainingAreas: TrainingAreaFormValue[];
	achievementsTitle: string;
	achievementsDescription: string;
	achievements: AchievementFormValue[];
	highlightsTitle: string;
	highlightsDescription: string;
	highlights: HighlightFormValue[];
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

const COLOR_OPTIONS = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'indigo',
	'gray',
	'teal',
	'pink'
];

const GRADIENT_OPTIONS = [
	'bg-gradient-to-br from-blue-600 to-purple-600',
	'bg-gradient-to-br from-green-600 to-blue-600',
	'bg-gradient-to-br from-purple-600 to-pink-600',
	'bg-gradient-to-br from-orange-600 to-red-600',
	'bg-gradient-to-br from-indigo-600 to-purple-600'
];

const FALLBACK_ICON = 'GraduationCap';

const createEmptyStat = (): StatFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	value: '',
	label: '',
	iconColor: 'blue',
	textColor: 'black'
});
const createEmptyContact = (): ContactFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	title: '',
	value: '',
	iconColor: 'blue',
	textColor: 'black'
});
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
	gradientColor: 'blue',
	textColor: 'white'
});
const createEmptyTrainingArea = (): TrainingAreaFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	skills: [''],
	icon: FALLBACK_ICON,
	iconColor: 'blue',
	textColor: 'black'
});
const createEmptyAchievement = (): AchievementFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	description: '',
	icon: FALLBACK_ICON,
	highlight: '',
	category: '',
	department: '',
	iconColor: 'blue',
	categoryColor: 'blue',
	highlightColor: 'blue'
});
const createEmptyHighlight = (): HighlightFormValue => ({
	id: crypto.randomUUID(),
	department: '',
	maxPackage: '',
	avgPackage: '',
	color: 'blue',
	initials: ''
});

const createUpdatedData = (
	currentData: PlacementOverviewData,
	formValues: Partial<FormValues>
): PlacementOverviewData => {
	const updatedStats = formValues.stats
		? formValues.stats
				.map(s => ({
					icon: s.icon?.trim().length ? s.icon.trim() : FALLBACK_ICON,
					value: (s.value ?? '').trim(),
					label: (s.label ?? '').trim(),
					iconColor: s.iconColor ?? 'blue',
					textColor: s.textColor ?? 'black'
				}))
				.filter(s => s.value && s.label)
		: currentData.stats;

	const updatedContacts = formValues.contacts
		? formValues.contacts
				.map(c => ({
					icon: c.icon?.trim().length ? c.icon.trim() : FALLBACK_ICON,
					title: (c.title ?? '').trim(),
					value: (c.value ?? '').trim(),
					iconColor: c.iconColor ?? 'blue',
					textColor: c.textColor ?? 'black'
				}))
				.filter(c => c.title && c.value)
		: currentData.contacts;

	const updatedFeatures = formValues.features
		? formValues.features
				.map(f => ({
					id: f.id,
					icon: f.icon?.trim().length ? f.icon.trim() : FALLBACK_ICON,
					title: (f.title ?? '').trim(),
					description: (f.description ?? '').trim(),
					color: f.color ?? 'blue',
					iconColor: f.iconColor ?? 'blue',
					textColor: f.textColor ?? 'black'
				}))
				.filter(f => f.title && f.description)
		: currentData.features;

	const updatedTeamMembers = formValues.teamMembers
		? formValues.teamMembers
				.map(m => ({
					id: m.id,
					name: (m.name ?? '').trim(),
					position: (m.position ?? '').trim(),
					email: (m.email ?? '').trim(),
					image: (m.image ?? '').trim(),
					initials: (m.initials ?? '').trim(),
					gradientColor: m.gradientColor ?? 'blue',
					textColor: m.textColor ?? 'white'
				}))
				.filter(m => m.name && m.position)
		: currentData.teamMembers;

	const updatedTrainingAreas = formValues.trainingAreas
		? formValues.trainingAreas
				.map(a => ({
					id: a.id,
					title: (a.title ?? '').trim(),
					skills: (a.skills ?? []).filter(s => s.trim().length > 0),
					icon: a.icon?.trim().length ? a.icon.trim() : FALLBACK_ICON,
					iconColor: a.iconColor ?? 'blue',
					textColor: a.textColor ?? 'black'
				}))
				.filter(a => a.title && a.skills.length > 0)
		: currentData.trainingAreas;

	const updatedAchievements = formValues.achievements
		? formValues.achievements
				.map(a => ({
					id: a.id,
					title: (a.title ?? '').trim(),
					description: (a.description ?? '').trim(),
					icon: a.icon?.trim().length ? a.icon.trim() : FALLBACK_ICON,
					highlight: (a.highlight ?? '').trim(),
					category: (a.category ?? '').trim(),
					department: (a.department ?? '').trim(),
					iconColor: a.iconColor ?? 'blue',
					categoryColor: a.categoryColor ?? 'blue',
					highlightColor: a.highlightColor ?? 'blue'
				}))
				.filter(a => a.title && a.description)
		: currentData.achievements;

	const updatedHighlights = formValues.highlights
		? formValues.highlights
				.map(h => ({
					id: h.id,
					department: (h.department ?? '').trim(),
					maxPackage: (h.maxPackage ?? '').trim(),
					avgPackage: (h.avgPackage ?? '').trim(),
					color: h.color ?? 'blue',
					initials: (h.initials ?? '').trim()
				}))
				.filter(h => h.department && h.maxPackage)
		: currentData.highlights;

	return {
		...currentData,
		hero: formValues.hero
			? {
					icon: formValues.hero.icon ?? currentData.hero.icon,
					title:
						(formValues.hero.title ?? '').trim() || currentData.hero.title,
					subtitle:
						(formValues.hero.subtitle ?? '').trim() ||
						currentData.hero.subtitle,
					gradient: formValues.hero.gradient ?? currentData.hero.gradient,
					iconColor: formValues.hero.iconColor ?? currentData.hero.iconColor,
					textColor: formValues.hero.textColor ?? currentData.hero.textColor
				}
			: currentData.hero,
		stats: updatedStats,
		missionTitle: formValues.missionTitle?.trim() || currentData.missionTitle,
		missionDescription:
			formValues.missionDescription?.trim() || currentData.missionDescription,
		servicesTitle: formValues.servicesTitle?.trim() || currentData.servicesTitle,
		servicesDescription:
			formValues.servicesDescription?.trim() || currentData.servicesDescription,
		features: updatedFeatures,
		teamTitle: formValues.teamTitle?.trim() || currentData.teamTitle,
		teamDescription:
			formValues.teamDescription?.trim() || currentData.teamDescription,
		teamMembers: updatedTeamMembers,
		trainingTitle: formValues.trainingTitle?.trim() || currentData.trainingTitle,
		trainingDescription:
			formValues.trainingDescription?.trim() || currentData.trainingDescription,
		trainingAreas: updatedTrainingAreas,
		achievementsTitle:
			formValues.achievementsTitle?.trim() || currentData.achievementsTitle,
		achievementsDescription:
			formValues.achievementsDescription?.trim() ||
			currentData.achievementsDescription,
		achievements: updatedAchievements,
		highlightsTitle:
			formValues.highlightsTitle?.trim() || currentData.highlightsTitle,
		highlightsDescription:
			formValues.highlightsDescription?.trim() ||
			currentData.highlightsDescription,
		highlights: updatedHighlights,
		contactTitle: formValues.contactTitle?.trim() || currentData.contactTitle,
		contactDescription:
			formValues.contactDescription?.trim() || currentData.contactDescription,
		contacts: updatedContacts,
		contactButtonText:
			formValues.contactButtonText?.trim() || currentData.contactButtonText
	};
};

export default function PlacementOverviewForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const [currentData, setCurrentData] =
		useState<PlacementOverviewData>(initialData);

	const form = useForm<FormValues>({
		defaultValues: {
			hero: {
				icon: initialData.hero?.icon ?? FALLBACK_ICON,
				title: initialData.hero?.title ?? 'Placement Overview',
				subtitle:
					initialData.hero?.subtitle ?? 'Building careers, shaping futures',
				gradient: initialData.hero?.gradient ?? GRADIENT_OPTIONS[0],
				iconColor: initialData.hero?.iconColor ?? 'blue',
				textColor: initialData.hero?.textColor ?? 'white'
			},
			stats:
				initialData.stats && initialData.stats.length > 0
					? initialData.stats.map(stat => ({
							id: crypto.randomUUID(),
							icon: stat.icon,
							value: stat.value,
							label: stat.label,
							iconColor: stat.iconColor,
							textColor: stat.textColor
						}))
					: [createEmptyStat()],
			missionTitle: initialData.missionTitle ?? 'Our Mission',
			missionDescription:
				initialData.missionDescription ?? 'Mission description',
			servicesTitle: initialData.servicesTitle ?? 'Our Services',
			servicesDescription:
				initialData.servicesDescription ?? 'Services description',
			features:
				initialData.features && initialData.features.length > 0
					? initialData.features.map(feature => ({
							id: feature.id || crypto.randomUUID(),
							icon: feature.icon,
							title: feature.title,
							description: feature.description,
							color: feature.color,
							iconColor: feature.iconColor,
							textColor: feature.textColor
						}))
					: [createEmptyFeature()],
			teamTitle: initialData.teamTitle ?? 'Our Team',
			teamDescription: initialData.teamDescription ?? 'Team description',
			teamMembers:
				initialData.teamMembers && initialData.teamMembers.length > 0
					? initialData.teamMembers.map(member => ({
							id: member.id || crypto.randomUUID(),
							name: member.name,
							position: member.position,
							email: member.email,
							image: member.image ?? '',
							initials: member.initials,
							gradientColor: member.gradientColor,
							textColor: member.textColor
						}))
					: [createEmptyTeamMember()],
			trainingTitle: initialData.trainingTitle ?? 'Training Areas',
			trainingDescription:
				initialData.trainingDescription ?? 'Training description',
			trainingAreas:
				initialData.trainingAreas && initialData.trainingAreas.length > 0
					? initialData.trainingAreas.map(area => ({
							id: area.id || crypto.randomUUID(),
							title: area.title,
							skills: area.skills,
							icon: area.icon,
							iconColor: area.iconColor,
							textColor: area.textColor
						}))
					: [createEmptyTrainingArea()],
			achievementsTitle: initialData.achievementsTitle ?? 'Achievements',
			achievementsDescription:
				initialData.achievementsDescription ?? 'Achievements description',
			achievements:
				initialData.achievements && initialData.achievements.length > 0
					? initialData.achievements.map(achievement => ({
							id: achievement.id || crypto.randomUUID(),
							title: achievement.title,
							description: achievement.description,
							icon: achievement.icon,
							highlight: achievement.highlight,
							category: achievement.category,
							department: achievement.department,
							iconColor: achievement.iconColor,
							categoryColor: achievement.categoryColor,
							highlightColor: achievement.highlightColor
						}))
					: [createEmptyAchievement()],
			highlightsTitle: initialData.highlightsTitle ?? 'Department Highlights',
			highlightsDescription:
				initialData.highlightsDescription ?? 'Highlights description',
			highlights:
				initialData.highlights && initialData.highlights.length > 0
					? initialData.highlights.map(highlight => ({
							id: highlight.id || crypto.randomUUID(),
							department: highlight.department,
							maxPackage: highlight.maxPackage,
							avgPackage: highlight.avgPackage,
							color: highlight.color,
							initials: highlight.initials
						}))
					: [createEmptyHighlight()],
			contactTitle: initialData.contactTitle ?? 'Contact Information',
			contactDescription:
				initialData.contactDescription ?? 'Contact description',
			contactButtonText: initialData.contactButtonText ?? 'Get In Touch',
			contacts:
				initialData.contacts && initialData.contacts.length > 0
					? initialData.contacts.map(contact => ({
							id: crypto.randomUUID(),
							icon: contact.icon,
							title: contact.title,
							value: contact.value,
							iconColor: contact.iconColor,
							textColor: contact.textColor
						}))
					: [createEmptyContact()]
		}
	});

	const statsArr = useFieldArray({ control: form.control, name: 'stats' });
	const featuresArr = useFieldArray({ control: form.control, name: 'features' });
	const teamArr = useFieldArray({ control: form.control, name: 'teamMembers' });
	const trainingArr = useFieldArray({
		control: form.control,
		name: 'trainingAreas'
	});
	const achievementsArr = useFieldArray({
		control: form.control,
		name: 'achievements'
	});
	const highlightsArr = useFieldArray({
		control: form.control,
		name: 'highlights'
	});
	const contactsArr = useFieldArray({ control: form.control, name: 'contacts' });

	useEffect(() => {
		const sub = form.watch(values => {
			const updated = createUpdatedData(
				currentData,
				values as Partial<FormValues>
			);
			onChange?.(updated);
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange, currentData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const payload = createUpdatedData(currentData, values);
		startTransition(async () => {
			try {
				await updatePlacementOverview(pageSlug, payload);
				setCurrentData(payload);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Save error:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const iconOptions = useMemo(
		() => Array.from(new Set(SUPPORTED_ICON_NAMES)),
		[]
	);

	const iconSelect = (val: string | undefined, set: (v: string) => void) => (
		<Select value={val || FALLBACK_ICON} onValueChange={set}>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{iconOptions.map(i => (
					<SelectItem key={i} value={i}>
						{i}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);

	const colorSelect = (val: string | undefined, set: (v: string) => void) => (
		<Select value={val || 'blue'} onValueChange={set}>
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
	);

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection title='Hero'>
				<AdminFieldGrid>
					<AdminField label='Icon'>
						{iconSelect(form.watch('hero.icon'), v =>
							form.setValue('hero.icon', v, { shouldDirty: true })
						)}
					</AdminField>
					<AdminField label='Icon color'>
						{colorSelect(form.watch('hero.iconColor'), v =>
							form.setValue('hero.iconColor', v, { shouldDirty: true })
						)}
					</AdminField>
					<AdminField label='Text color'>
						<Input {...form.register('hero.textColor')} />
					</AdminField>
				</AdminFieldGrid>
				<AdminField label='Title'>
					<Input {...form.register('hero.title')} />
				</AdminField>
				<AdminField label='Subtitle'>
					<Textarea rows={2} {...form.register('hero.subtitle')} />
				</AdminField>
				<AdminField label='Background gradient (Tailwind classes)'>
					<Input {...form.register('hero.gradient')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Stats'>
				<AdminItemList>
					{statsArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={statsArr.fields.length}
							title={form.watch(`stats.${index}.label`) || `Stat ${index + 1}`}
							subtitle={form.watch(`stats.${index}.value`) || undefined}
							onMove={d => statsArr.move(index, index + d)}
							onRemove={() => statsArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									{iconSelect(form.watch(`stats.${index}.icon`), v =>
										form.setValue(`stats.${index}.icon`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Icon color'>
									{colorSelect(form.watch(`stats.${index}.iconColor`), v =>
										form.setValue(`stats.${index}.iconColor`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Value'>
									<Input
										{...form.register(`stats.${index}.value` as const)}
									/>
								</AdminField>
								<AdminField label='Label'>
									<Input
										{...form.register(`stats.${index}.label` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{statsArr.fields.length === 0 && (
					<AdminEmptyState title='No stats yet' />
				)}
				<AddRowButton onClick={() => statsArr.append(createEmptyStat())}>
					Add stat
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Mission'>
				<AdminField label='Section title'>
					<Input {...form.register('missionTitle')} />
				</AdminField>
				<AdminField label='Description'>
					<Textarea rows={3} {...form.register('missionDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Services — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('servicesTitle')} />
				</AdminField>
				<AdminField label='Description'>
					<Textarea rows={3} {...form.register('servicesDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Features'>
				<AdminItemList>
					{featuresArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={featuresArr.fields.length}
							title={
								form.watch(`features.${index}.title`) || `Feature ${index + 1}`
							}
							onMove={d => featuresArr.move(index, index + d)}
							onRemove={() => featuresArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										{...form.register(`features.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									{iconSelect(form.watch(`features.${index}.icon`), v =>
										form.setValue(`features.${index}.icon`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Color'>
									{colorSelect(form.watch(`features.${index}.color`), v =>
										form.setValue(`features.${index}.color`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Icon color'>
									{colorSelect(form.watch(`features.${index}.iconColor`), v =>
										form.setValue(`features.${index}.iconColor`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									{...form.register(`features.${index}.description` as const)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{featuresArr.fields.length === 0 && (
					<AdminEmptyState title='No features yet' />
				)}
				<AddRowButton onClick={() => featuresArr.append(createEmptyFeature())}>
					Add feature
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Team — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('teamTitle')} />
				</AdminField>
				<AdminField label='Description'>
					<Textarea rows={3} {...form.register('teamDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Team members'>
				<AdminItemList>
					{teamArr.fields.map((field, index) => {
						const image = form.watch(`teamMembers.${index}.image`);
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={teamArr.fields.length}
								title={
									form.watch(`teamMembers.${index}.name`) ||
									`Member ${index + 1}`
								}
								subtitle={
									form.watch(`teamMembers.${index}.position`) || undefined
								}
								onMove={d => teamArr.move(index, index + d)}
								onRemove={() => teamArr.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Name'>
										<Input
											{...form.register(`teamMembers.${index}.name` as const)}
										/>
									</AdminField>
									<AdminField label='Position'>
										<Input
											{...form.register(
												`teamMembers.${index}.position` as const
											)}
										/>
									</AdminField>
									<AdminField label='Email'>
										<Input
											{...form.register(`teamMembers.${index}.email` as const)}
										/>
									</AdminField>
									<AdminField label='Initials'>
										<Input
											{...form.register(
												`teamMembers.${index}.initials` as const
											)}
										/>
									</AdminField>
									<AdminField label='Gradient color'>
										{colorSelect(
											form.watch(`teamMembers.${index}.gradientColor`),
											v =>
												form.setValue(
													`teamMembers.${index}.gradientColor`,
													v,
													{ shouldDirty: true }
												)
										)}
									</AdminField>
									<AdminField label='Text color'>
										<Input
											{...form.register(
												`teamMembers.${index}.textColor` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Image'>
									<Input
										placeholder='Image URL'
										{...form.register(`teamMembers.${index}.image` as const)}
									/>
									<div className='mt-2'>
										<UploadButton
											onUpload={url =>
												form.setValue(`teamMembers.${index}.image`, url, {
													shouldDirty: true
												})
											}
											buttonText='Upload image'
										/>
									</div>
									{image && (
										<div className='mt-3'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={image}
												alt='Member preview'
												className='h-16 w-16 rounded-full border border-slate-200 object-cover'
											/>
										</div>
									)}
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{teamArr.fields.length === 0 && (
					<AdminEmptyState title='No team members yet' />
				)}
				<AddRowButton onClick={() => teamArr.append(createEmptyTeamMember())}>
					Add member
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Training — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('trainingTitle')} />
				</AdminField>
				<AdminField label='Description'>
					<Textarea rows={3} {...form.register('trainingDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Training areas'>
				<AdminItemList>
					{trainingArr.fields.map((field, index) => {
						const skills =
							form.watch(`trainingAreas.${index}.skills`) || ([] as string[]);
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={trainingArr.fields.length}
								title={
									form.watch(`trainingAreas.${index}.title`) ||
									`Area ${index + 1}`
								}
								onMove={d => trainingArr.move(index, index + d)}
								onRemove={() => trainingArr.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Title'>
										<Input
											{...form.register(
												`trainingAreas.${index}.title` as const
											)}
										/>
									</AdminField>
									<AdminField label='Icon'>
										{iconSelect(form.watch(`trainingAreas.${index}.icon`), v =>
											form.setValue(`trainingAreas.${index}.icon`, v, {
												shouldDirty: true
											})
										)}
									</AdminField>
									<AdminField label='Icon color'>
										{colorSelect(
											form.watch(`trainingAreas.${index}.iconColor`),
											v =>
												form.setValue(`trainingAreas.${index}.iconColor`, v, {
													shouldDirty: true
												})
										)}
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Skills' hint='Comma separated.'>
									<Input
										value={skills.join(', ')}
										onChange={e =>
											form.setValue(
												`trainingAreas.${index}.skills`,
												e.target.value
													.split(',')
													.map(s => s.trim())
													.filter(Boolean),
												{ shouldDirty: true }
											)
										}
									/>
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{trainingArr.fields.length === 0 && (
					<AdminEmptyState title='No training areas yet' />
				)}
				<AddRowButton
					onClick={() => trainingArr.append(createEmptyTrainingArea())}>
					Add training area
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Achievements — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('achievementsTitle')} />
				</AdminField>
				<AdminField label='Description'>
					<Textarea rows={3} {...form.register('achievementsDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Achievements'>
				<AdminItemList>
					{achievementsArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={achievementsArr.fields.length}
							title={
								form.watch(`achievements.${index}.title`) ||
								`Achievement ${index + 1}`
							}
							subtitle={
								form.watch(`achievements.${index}.department`) || undefined
							}
							onMove={d => achievementsArr.move(index, index + d)}
							onRemove={() => achievementsArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										{...form.register(`achievements.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									{iconSelect(form.watch(`achievements.${index}.icon`), v =>
										form.setValue(`achievements.${index}.icon`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Highlight'>
									<Input
										{...form.register(
											`achievements.${index}.highlight` as const
										)}
									/>
								</AdminField>
								<AdminField label='Category'>
									<Input
										{...form.register(
											`achievements.${index}.category` as const
										)}
									/>
								</AdminField>
								<AdminField label='Department'>
									<Input
										{...form.register(
											`achievements.${index}.department` as const
										)}
									/>
								</AdminField>
								<AdminField label='Icon color'>
									{colorSelect(
										form.watch(`achievements.${index}.iconColor`),
										v =>
											form.setValue(`achievements.${index}.iconColor`, v, {
												shouldDirty: true
											})
									)}
								</AdminField>
								<AdminField label='Category color'>
									{colorSelect(
										form.watch(`achievements.${index}.categoryColor`),
										v =>
											form.setValue(`achievements.${index}.categoryColor`, v, {
												shouldDirty: true
											})
									)}
								</AdminField>
								<AdminField label='Highlight color'>
									{colorSelect(
										form.watch(`achievements.${index}.highlightColor`),
										v =>
											form.setValue(
												`achievements.${index}.highlightColor`,
												v,
												{ shouldDirty: true }
											)
									)}
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									{...form.register(
										`achievements.${index}.description` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{achievementsArr.fields.length === 0 && (
					<AdminEmptyState title='No achievements yet' />
				)}
				<AddRowButton
					onClick={() => achievementsArr.append(createEmptyAchievement())}>
					Add achievement
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Highlights — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('highlightsTitle')} />
				</AdminField>
				<AdminField label='Description'>
					<Textarea rows={3} {...form.register('highlightsDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Department highlights'>
				<AdminItemList>
					{highlightsArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={highlightsArr.fields.length}
							title={
								form.watch(`highlights.${index}.department`) ||
								`Highlight ${index + 1}`
							}
							onMove={d => highlightsArr.move(index, index + d)}
							onRemove={() => highlightsArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Department'>
									<Input
										{...form.register(
											`highlights.${index}.department` as const
										)}
									/>
								</AdminField>
								<AdminField label='Initials'>
									<Input
										{...form.register(
											`highlights.${index}.initials` as const
										)}
									/>
								</AdminField>
								<AdminField label='Max package'>
									<Input
										{...form.register(
											`highlights.${index}.maxPackage` as const
										)}
									/>
								</AdminField>
								<AdminField label='Avg package'>
									<Input
										{...form.register(
											`highlights.${index}.avgPackage` as const
										)}
									/>
								</AdminField>
								<AdminField label='Color'>
									{colorSelect(form.watch(`highlights.${index}.color`), v =>
										form.setValue(`highlights.${index}.color`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{highlightsArr.fields.length === 0 && (
					<AdminEmptyState title='No highlights yet' />
				)}
				<AddRowButton
					onClick={() => highlightsArr.append(createEmptyHighlight())}>
					Add highlight
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Contact'>
				<AdminField label='Section title'>
					<Input {...form.register('contactTitle')} />
				</AdminField>
				<AdminField label='Description'>
					<Textarea rows={3} {...form.register('contactDescription')} />
				</AdminField>
				<AdminField label='Button text'>
					<Input {...form.register('contactButtonText')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Contact cards'>
				<AdminItemList>
					{contactsArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={contactsArr.fields.length}
							title={
								form.watch(`contacts.${index}.title`) ||
								`Contact ${index + 1}`
							}
							subtitle={form.watch(`contacts.${index}.value`) || undefined}
							onMove={d => contactsArr.move(index, index + d)}
							onRemove={() => contactsArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									{iconSelect(form.watch(`contacts.${index}.icon`), v =>
										form.setValue(`contacts.${index}.icon`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Icon color'>
									{colorSelect(form.watch(`contacts.${index}.iconColor`), v =>
										form.setValue(`contacts.${index}.iconColor`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
								<AdminField label='Title'>
									<Input
										{...form.register(`contacts.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Value'>
									<Input
										{...form.register(`contacts.${index}.value` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{contactsArr.fields.length === 0 && (
					<AdminEmptyState title='No contacts yet' />
				)}
				<AddRowButton onClick={() => contactsArr.append(createEmptyContact())}>
					Add contact
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
