'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
import { Plus, Trash2 } from 'lucide-react';
import UploadButton from '@/components/cloudinary/upload-button';

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

const COLOR_OPTIONS: string[] = [
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

const GRADIENT_OPTIONS: string[] = [
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

// Function to create updated data while preserving existing data
const createUpdatedData = (currentData: PlacementOverviewData, formValues: Partial<FormValues>): PlacementOverviewData => {
	// Only update the fields that are actually in the form, preserve everything else
	const updatedStats = formValues.stats ? 
		formValues.stats
			.map(stat => ({
				icon: stat.icon?.trim().length ? stat.icon.trim() : FALLBACK_ICON,
				value: (stat.value ?? '').trim(),
				label: (stat.label ?? '').trim(),
				iconColor: stat.iconColor ?? 'blue',
				textColor: stat.textColor ?? 'black'
			}))
			.filter(stat => stat.value.length > 0 && stat.label.length > 0)
		: currentData.stats;

	const updatedContacts = formValues.contacts ?
		formValues.contacts
			.map(contact => ({
				icon: contact.icon?.trim().length ? contact.icon.trim() : FALLBACK_ICON,
				title: (contact.title ?? '').trim(),
				value: (contact.value ?? '').trim(),
				iconColor: contact.iconColor ?? 'blue',
				textColor: contact.textColor ?? 'black'
			}))
			.filter(contact => contact.title.length > 0 && contact.value.length > 0)
		: currentData.contacts;

	const updatedFeatures = formValues.features ?
		formValues.features
			.map(feature => ({
				id: feature.id,
				icon: feature.icon?.trim().length ? feature.icon.trim() : FALLBACK_ICON,
				title: (feature.title ?? '').trim(),
				description: (feature.description ?? '').trim(),
				color: feature.color ?? 'blue',
				iconColor: feature.iconColor ?? 'blue',
				textColor: feature.textColor ?? 'black'
			}))
			.filter(feature => feature.title.length > 0 && feature.description.length > 0)
		: currentData.features;

	const updatedTeamMembers = formValues.teamMembers ?
		formValues.teamMembers
			.map(member => ({
				id: member.id,
				name: (member.name ?? '').trim(),
				position: (member.position ?? '').trim(),
				email: (member.email ?? '').trim(),
				image: (member.image ?? '').trim(),
				initials: (member.initials ?? '').trim(),
				gradientColor: member.gradientColor ?? 'blue',
				textColor: member.textColor ?? 'white'
			}))
			.filter(member => member.name.length > 0 && member.position.length > 0)
		: currentData.teamMembers;

	const updatedTrainingAreas = formValues.trainingAreas ?
		formValues.trainingAreas
			.map(area => ({
				id: area.id,
				title: (area.title ?? '').trim(),
				skills: (area.skills ?? []).filter(skill => skill.trim().length > 0),
				icon: area.icon?.trim().length ? area.icon.trim() : FALLBACK_ICON,
				iconColor: area.iconColor ?? 'blue',
				textColor: area.textColor ?? 'black'
			}))
			.filter(area => area.title.length > 0 && area.skills.length > 0)
		: currentData.trainingAreas;

	const updatedAchievements = formValues.achievements ?
		formValues.achievements
			.map(achievement => ({
				id: achievement.id,
				title: (achievement.title ?? '').trim(),
				description: (achievement.description ?? '').trim(),
				icon: achievement.icon?.trim().length ? achievement.icon.trim() : FALLBACK_ICON,
				highlight: (achievement.highlight ?? '').trim(),
				category: (achievement.category ?? '').trim(),
				department: (achievement.department ?? '').trim(),
				iconColor: achievement.iconColor ?? 'blue',
				categoryColor: achievement.categoryColor ?? 'blue',
				highlightColor: achievement.highlightColor ?? 'blue'
			}))
			.filter(achievement => achievement.title.length > 0 && achievement.description.length > 0)
		: currentData.achievements;

	const updatedHighlights = formValues.highlights ?
		formValues.highlights
			.map(highlight => ({
				id: highlight.id,
				department: (highlight.department ?? '').trim(),
				maxPackage: (highlight.maxPackage ?? '').trim(),
				avgPackage: (highlight.avgPackage ?? '').trim(),
				color: highlight.color ?? 'blue',
				initials: (highlight.initials ?? '').trim()
			}))
			.filter(highlight => highlight.department.length > 0 && highlight.maxPackage.length > 0)
		: currentData.highlights;

	return {
		// Preserve all existing data
		...currentData,
		// Only update the fields that are in the form
		hero: formValues.hero ? {
			icon: formValues.hero.icon ?? currentData.hero.icon,
			title: (formValues.hero.title ?? '').trim() || currentData.hero.title,
			subtitle: (formValues.hero.subtitle ?? '').trim() || currentData.hero.subtitle,
			gradient: formValues.hero.gradient ?? currentData.hero.gradient,
			iconColor: formValues.hero.iconColor ?? currentData.hero.iconColor,
			textColor: formValues.hero.textColor ?? currentData.hero.textColor
		} : currentData.hero,
		stats: updatedStats,
		missionTitle: formValues.missionTitle?.trim() || currentData.missionTitle,
		missionDescription: formValues.missionDescription?.trim() || currentData.missionDescription,
		servicesTitle: formValues.servicesTitle?.trim() || currentData.servicesTitle,
		servicesDescription: formValues.servicesDescription?.trim() || currentData.servicesDescription,
		features: updatedFeatures,
		teamTitle: formValues.teamTitle?.trim() || currentData.teamTitle,
		teamDescription: formValues.teamDescription?.trim() || currentData.teamDescription,
		teamMembers: updatedTeamMembers,
		trainingTitle: formValues.trainingTitle?.trim() || currentData.trainingTitle,
		trainingDescription: formValues.trainingDescription?.trim() || currentData.trainingDescription,
		trainingAreas: updatedTrainingAreas,
		achievementsTitle: formValues.achievementsTitle?.trim() || currentData.achievementsTitle,
		achievementsDescription: formValues.achievementsDescription?.trim() || currentData.achievementsDescription,
		achievements: updatedAchievements,
		highlightsTitle: formValues.highlightsTitle?.trim() || currentData.highlightsTitle,
		highlightsDescription: formValues.highlightsDescription?.trim() || currentData.highlightsDescription,
		highlights: updatedHighlights,
		contactTitle: formValues.contactTitle?.trim() || currentData.contactTitle,
		contactDescription: formValues.contactDescription?.trim() || currentData.contactDescription,
		contacts: updatedContacts,
		contactButtonText: formValues.contactButtonText?.trim() || currentData.contactButtonText
	};
};

export default function PlacementOverviewForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const [currentData, setCurrentData] = useState<PlacementOverviewData>(initialData);

	const form = useForm<FormValues>({
		defaultValues: {
			hero: {
				icon: initialData.hero?.icon ?? FALLBACK_ICON,
				title: initialData.hero?.title ?? 'Placement Overview',
				subtitle: initialData.hero?.subtitle ?? 'Building careers, shaping futures',
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
			missionDescription: initialData.missionDescription ?? 'Mission description',
			servicesTitle: initialData.servicesTitle ?? 'Our Services',
			servicesDescription: initialData.servicesDescription ?? 'Services description',
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
			trainingDescription: initialData.trainingDescription ?? 'Training description',
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
			achievementsDescription: initialData.achievementsDescription ?? 'Achievements description',
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
			highlightsDescription: initialData.highlightsDescription ?? 'Highlights description',
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
			contactDescription: initialData.contactDescription ?? 'Contact description',
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

	const statsArray = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	const featuresArray = useFieldArray({
		control: form.control,
		name: 'features'
	});

	const teamMembersArray = useFieldArray({
		control: form.control,
		name: 'teamMembers'
	});

	const trainingAreasArray = useFieldArray({
		control: form.control,
		name: 'trainingAreas'
	});

	const achievementsArray = useFieldArray({
		control: form.control,
		name: 'achievements'
	});

	const highlightsArray = useFieldArray({
		control: form.control,
		name: 'highlights'
	});

	const contactsArray = useFieldArray({
		control: form.control,
		name: 'contacts'
	});

	useEffect(() => {
		const updatedData = createUpdatedData(currentData, form.getValues());
		onChange?.(updatedData);
		const subscription = form.watch(values => {
			const formValues = {
				...values,
				stats: values.stats?.filter(Boolean),
				contacts: values.contacts?.filter(Boolean)
			} as unknown as Partial<FormValues>;
			const newData = createUpdatedData(currentData, formValues);
			onChange?.(newData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange, currentData]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = createUpdatedData(currentData, values);
		startTransition(async () => {
			try {
				await updatePlacementOverview(pageSlug, payload);
				setCurrentData(payload); // Update current data after successful save
				setMessage('Saved');
			} catch (error) {
				console.error('Save error:', error);
				setMessage('Save failed');
			}
		});
	};

	const iconOptions = useMemo(() => {
		const unique = new Set(SUPPORTED_ICON_NAMES);
		return Array.from(unique);
	}, []);

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Placement Overview
						</h3>
						<p className='text-sm text-slate-500'>
							Edit placement overview sections and content.
						</p>
					</div>
					<div className='flex items-center gap-2'>
						{message && (
							<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						)}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving...' : 'Save changes'}
						</Button>
					</div>
				</div>

				{/* Hero Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Hero Section
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='hero.title'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Placement Overview' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hero.subtitle'
							rules={{ required: 'Subtitle is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Input placeholder='Building careers, shaping futures' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hero.icon'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
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
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hero.gradient'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Background Gradient</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger>
												<SelectValue placeholder='Select gradient' />
											</SelectTrigger>
											<SelectContent>
												{GRADIENT_OPTIONS.map(gradient => (
													<SelectItem key={gradient} value={gradient}>
														{gradient.replace('bg-gradient-to-br from-', '').replace(' to-', ' → ')}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hero.iconColor'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon Color</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
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
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hero.textColor'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Text Color</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
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
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Stats Section */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Statistics
						</h4>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => statsArray.append(createEmptyStat())}>
							Add stat
						</Button>
					</div>
					<div className='space-y-4'>
						{statsArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-slate-700'>
										Statistic {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() =>
											statsArray.remove(index < 0 ? 0 : index)
										}>
										Remove
									</Button>
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name={`stats.${index}.value`}
										rules={{ required: 'Value is required' }}
										render={({ field: valueField }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input placeholder='1000+' {...valueField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`stats.${index}.label`}
										rules={{ required: 'Label is required' }}
										render={({ field: labelField }) => (
											<FormItem>
												<FormLabel>Label</FormLabel>
												<FormControl>
													<Input
														placeholder='Students Placed'
														{...labelField}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`stats.${index}.icon`}
										render={({ field: iconField }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
												<FormControl>
													<Select
														onValueChange={iconField.onChange}
														value={iconField.value}>
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
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`stats.${index}.iconColor`}
										render={({ field: colorField }) => (
											<FormItem>
												<FormLabel>Icon Color</FormLabel>
												<FormControl>
													<Select
														onValueChange={colorField.onChange}
														value={colorField.value}>
														<SelectTrigger>
															<SelectValue placeholder='Select color' />
														</SelectTrigger>
														<SelectContent>
															{COLOR_OPTIONS.map(color => (
																<SelectItem key={color} value={color}>
																	{color.charAt(0).toUpperCase() +
																		color.slice(1)}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						))}
						{statsArray.fields.length === 0 ? (
							<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
								Add at least one statistic to display in this section.
							</div>
						) : null}
					</div>
				</div>

				{/* Mission Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Mission Section
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='missionTitle'
							rules={{ required: 'Mission title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mission Title</FormLabel>
									<FormControl>
										<Input placeholder='Our Mission' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='missionDescription'
							rules={{ required: 'Mission description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mission Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Mission description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Services Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Services Section
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='servicesTitle'
							rules={{ required: 'Services title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Services Title</FormLabel>
									<FormControl>
										<Input placeholder='Our Services' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='servicesDescription'
							rules={{ required: 'Services description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Services Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Services description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Features Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Features</h4>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>
								Manage placement features
							</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => featuresArray.append(createEmptyFeature())}>
								Add Feature
							</Button>
						</div>
						<div className='space-y-4'>
							{featuresArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Feature {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => featuresArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`features.${index}.title`}
											rules={{ required: 'Title is required' }}
											render={({ field: titleField }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input
															placeholder='Feature Title'
															{...titleField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`features.${index}.description`}
											rules={{ required: 'Description is required' }}
											render={({ field: descField }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea
															placeholder='Feature description'
															{...descField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`features.${index}.icon`}
											render={({ field: iconField }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
													<FormControl>
														<Select
															onValueChange={iconField.onChange}
															value={iconField.value}>
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
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`features.${index}.color`}
											render={({ field: colorField }) => (
												<FormItem>
													<FormLabel>Background Color</FormLabel>
													<FormControl>
														<Select
															onValueChange={colorField.onChange}
															value={colorField.value}>
															<SelectTrigger>
																<SelectValue placeholder='Select color' />
															</SelectTrigger>
															<SelectContent>
																{COLOR_OPTIONS.map(option => (
																	<SelectItem key={option} value={option}>
																		{option}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{featuresArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one feature to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Team Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Team Section</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='teamTitle'
							rules={{ required: 'Team title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Title</FormLabel>
									<FormControl>
										<Input placeholder='Our Team' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='teamDescription'
							rules={{ required: 'Team description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Team Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Team description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>
								Manage team members
							</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => teamMembersArray.append(createEmptyTeamMember())}>
								Add Team Member
							</Button>
						</div>
						<div className='space-y-4'>
							{teamMembersArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Team Member {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => teamMembersArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.name`}
											rules={{ required: 'Name is required' }}
											render={({ field: nameField }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input
															placeholder='Team member name'
															{...nameField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.position`}
											rules={{ required: 'Position is required' }}
											render={({ field: posField }) => (
												<FormItem>
													<FormLabel>Position</FormLabel>
													<FormControl>
														<Input
															placeholder='Position/Title'
															{...posField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.email`}
											rules={{ required: 'Email is required' }}
											render={({ field: emailField }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															placeholder='email@example.com'
															{...emailField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.image`}
											render={({ field: imageField}) => (
												<FormItem className='sm:col-span-2'>
													<FormLabel>Profile Image</FormLabel>
													<FormControl>
														<div className='space-y-2'>
															<Input
																placeholder='Image URL (optional)'
																{...imageField}
															/>
															<UploadButton
																onUpload={(url) => {
																	imageField.onChange(url);
																	form.setValue(`teamMembers.${index}.image`, url, {
																		shouldDirty: true
																	});
																}}
																buttonText='Upload Profile Image'
																className='sm:w-auto'
															/>
															{imageField.value ? (
																<div className='mt-2'>
																	<img
																		src={imageField.value}
																		alt='Profile preview'
																		className='w-20 h-20 rounded-full object-cover border-2 border-blue-200'
																	/>
																</div>
															) : (
																<p className='text-sm text-gray-500'>Initials will be shown as avatar if no image uploaded</p>
															)}
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`teamMembers.${index}.initials`}
											rules={{ required: 'Initials are required' }}
											render={({ field: initialsField }) => (
												<FormItem>
													<FormLabel>Initials</FormLabel>
													<FormControl>
														<Input
															placeholder='AB'
															{...initialsField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{teamMembersArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one team member to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Training Areas Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Training Areas</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='trainingTitle'
							rules={{ required: 'Training title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Training Title</FormLabel>
									<FormControl>
										<Input placeholder='Training Areas' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='trainingDescription'
							rules={{ required: 'Training description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Training Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Training description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>
								Manage training areas
							</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => trainingAreasArray.append(createEmptyTrainingArea())}>
								Add Training Area
							</Button>
						</div>
						<div className='space-y-4'>
							{trainingAreasArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Training Area {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => trainingAreasArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`trainingAreas.${index}.title`}
											rules={{ required: 'Title is required' }}
											render={({ field: titleField }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input
															placeholder='Training area title'
															{...titleField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`trainingAreas.${index}.skills`}
											rules={{ required: 'Skills are required' }}
											render={({ field: skillsField }) => (
												<FormItem>
													<FormLabel>Skills (comma separated)</FormLabel>
													<FormControl>
														<Input
															placeholder='Skill 1, Skill 2, Skill 3'
															{...skillsField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`trainingAreas.${index}.icon`}
											render={({ field: iconField }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
													<FormControl>
														<Select
															onValueChange={iconField.onChange}
															value={iconField.value}>
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
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{trainingAreasArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one training area to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Achievements Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Achievements</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='achievementsTitle'
							rules={{ required: 'Achievements title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Achievements Title</FormLabel>
									<FormControl>
										<Input placeholder='Achievements' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='achievementsDescription'
							rules={{ required: 'Achievements description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Achievements Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Achievements description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>
								Manage achievements
							</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => achievementsArray.append(createEmptyAchievement())}>
								Add Achievement
							</Button>
						</div>
						<div className='space-y-4'>
							{achievementsArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Achievement {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => achievementsArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`achievements.${index}.title`}
											rules={{ required: 'Title is required' }}
											render={({ field: titleField }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input
															placeholder='Achievement title'
															{...titleField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`achievements.${index}.description`}
											rules={{ required: 'Description is required' }}
											render={({ field: descField }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea
															placeholder='Achievement description'
															{...descField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`achievements.${index}.category`}
											rules={{ required: 'Category is required' }}
											render={({ field: catField }) => (
												<FormItem>
													<FormLabel>Category</FormLabel>
													<FormControl>
														<Input
															placeholder='Achievement category'
															{...catField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`achievements.${index}.department`}
											rules={{ required: 'Department is required' }}
											render={({ field: deptField }) => (
												<FormItem>
													<FormLabel>Department</FormLabel>
													<FormControl>
														<Input
															placeholder='Department name'
															{...deptField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`achievements.${index}.icon`}
											render={({ field: iconField }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
													<FormControl>
														<Select
															onValueChange={iconField.onChange}
															value={iconField.value}>
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
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`achievements.${index}.highlight`}
											render={({ field: highlightField }) => (
												<FormItem>
													<FormLabel>Highlight</FormLabel>
													<FormControl>
														<Input
															placeholder='Achievement highlight'
															{...highlightField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{achievementsArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one achievement to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Highlights Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Department Highlights</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='highlightsTitle'
							rules={{ required: 'Highlights title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Highlights Title</FormLabel>
									<FormControl>
										<Input placeholder='Department Highlights' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='highlightsDescription'
							rules={{ required: 'Highlights description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Highlights Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Highlights description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-slate-600'>
								Manage department highlights
							</span>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => highlightsArray.append(createEmptyHighlight())}>
								Add Highlight
							</Button>
						</div>
						<div className='space-y-4'>
							{highlightsArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
									<div className='mb-3 flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Highlight {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => highlightsArray.remove(index)}
											className='h-8 w-8 rounded-full p-0 text-slate-400 hover:bg-red-100 hover:text-red-600'>
											×
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`highlights.${index}.department`}
											rules={{ required: 'Department is required' }}
											render={({ field: deptField }) => (
												<FormItem>
													<FormLabel>Department</FormLabel>
													<FormControl>
														<Input
															placeholder='Department name'
															{...deptField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`highlights.${index}.maxPackage`}
											rules={{ required: 'Max package is required' }}
											render={({ field: maxField }) => (
												<FormItem>
													<FormLabel>Max Package</FormLabel>
													<FormControl>
														<Input
															placeholder='₹X.X LPA'
															{...maxField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`highlights.${index}.avgPackage`}
											rules={{ required: 'Average package is required' }}
											render={({ field: avgField }) => (
												<FormItem>
													<FormLabel>Average Package</FormLabel>
													<FormControl>
														<Input
															placeholder='₹X.X LPA'
															{...avgField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`highlights.${index}.initials`}
											rules={{ required: 'Initials are required' }}
											render={({ field: initialsField }) => (
												<FormItem>
													<FormLabel>Department Initials</FormLabel>
													<FormControl>
														<Input
															placeholder='CSE'
															{...initialsField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`highlights.${index}.color`}
											render={({ field: colorField }) => (
												<FormItem>
													<FormLabel>Color</FormLabel>
													<FormControl>
														<Select
															onValueChange={colorField.onChange}
															value={colorField.value}>
															<SelectTrigger>
																<SelectValue placeholder='Select color' />
															</SelectTrigger>
															<SelectContent>
																{COLOR_OPTIONS.map(option => (
																	<SelectItem key={option} value={option}>
																		{option}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{highlightsArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one highlight to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* Contact Section */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>
						Contact Section
					</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='contactTitle'
							rules={{ required: 'Contact title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contact Title</FormLabel>
									<FormControl>
										<Input placeholder='Contact Information' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='contactDescription'
							rules={{ required: 'Contact description is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contact Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Contact description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='contactButtonText'
							rules={{ required: 'Button text is required' }}
							render={({ field }) => (
								<FormItem className='sm:col-span-2'>
									<FormLabel>Contact Button Text</FormLabel>
									<FormControl>
										<Input placeholder='Get In Touch' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					
					{/* Contact Items */}
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<h5 className='text-sm font-medium text-slate-600'>Contact Information</h5>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => contactsArray.append(createEmptyContact())}>
								Add contact
							</Button>
						</div>
						<div className='space-y-4'>
							{contactsArray.fields.map((field, index) => (
								<div
									key={field.id}
									className='rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50'>
									<div className='flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>
											Contact {index + 1}
										</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() =>
												contactsArray.remove(index < 0 ? 0 : index)
											}>
											Remove
										</Button>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
										<FormField
											control={form.control}
											name={`contacts.${index}.title`}
											rules={{ required: 'Title is required' }}
											render={({ field: titleField }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input placeholder='Phone' {...titleField} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`contacts.${index}.value`}
											rules={{ required: 'Value is required' }}
											render={({ field: valueField }) => (
												<FormItem>
													<FormLabel>Value</FormLabel>
													<FormControl>
														<Input
															placeholder='+91-123-456-7890'
															{...valueField}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`contacts.${index}.icon`}
											render={({ field: iconField }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
													<FormControl>
														<Select
															onValueChange={iconField.onChange}
															value={iconField.value}>
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
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
							{contactsArray.fields.length === 0 ? (
								<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
									Add at least one contact to display in this section.
								</div>
							) : null}
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
