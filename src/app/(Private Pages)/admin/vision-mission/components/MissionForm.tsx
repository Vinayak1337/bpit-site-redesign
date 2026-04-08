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
import type { MissionData } from '@/app/(Private Pages)/actions/vision-mission';
import { updateMission } from '@/app/(Private Pages)/actions/vision-mission';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';

type ObjectiveFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: MissionData['objectives'][number]['color'];
};

type ImpactStatFormValue = {
	id: string;
	number: string;
	label: string;
	color: string;
};

type FormValues = {
	heroTitle: string;
	heroSubtitle: string;
	heroIcon: string;
	missionTitle: string;
	missionIcon: string;
	missionQuote: string;
	objectives: ObjectiveFormValue[];
	impactTitle: string;
	impactIcon: string;
	impactStats: ImpactStatFormValue[];
};

type Props = {
	initialData: MissionData;
	pageSlug: string;
	onChange?: (data: MissionData) => void;
	visibleSections?: Array<'hero' | 'missionStatement' | 'objectives' | 'impact'>;
};

const COLOR_OPTIONS: MissionData['objectives'][number]['color'][] = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'indigo'
];

const FALLBACK_ICON = 'Target';

const createEmptyObjective = (): ObjectiveFormValue => ({
	id: crypto.randomUUID(),
	icon: 'BookOpen',
	title: '',
	description: '',
	color: 'blue'
});

const createEmptyImpactStat = (): ImpactStatFormValue => ({
	id: crypto.randomUUID(),
	number: '',
	label: '',
	color: 'text-green-600'
});

const normalizeMission = (values: Partial<FormValues>): MissionData => {
	const objectives = (values.objectives ?? [])
		.map(objective => ({
			icon: objective.icon?.trim().length ? objective.icon.trim() : 'BookOpen',
			title: (objective.title ?? '').trim(),
			description: (objective.description ?? '').trim(),
			color: COLOR_OPTIONS.includes(objective.color ?? 'blue')
				? objective.color ?? 'blue'
				: 'blue'
		}))
		.filter(objective => objective.title.length > 0 && objective.description.length > 0);

	const impactStats = (values.impactStats ?? [])
		.map(stat => ({
			number: (stat.number ?? '').trim(),
			label: (stat.label ?? '').trim(),
			color: (stat.color ?? '').trim() || 'text-green-600'
		}))
		.filter(stat => stat.number.length > 0 && stat.label.length > 0);

	return {
		hero: {
			title: (values.heroTitle ?? '').trim() || 'Our Mission',
			subtitle: (values.heroSubtitle ?? '').trim() || 'Empowering Minds, Building Futures',
			icon: (values.heroIcon ?? '').trim() || 'Target',
			gradient: 'from-green-50 to-emerald-100',
			borderColor: 'border-green-200',
			iconBg: 'bg-green-600'
		},
		missionStatement: {
			title: (values.missionTitle ?? '').trim() || 'Mission Statement',
			icon: (values.missionIcon ?? '').trim() || 'Heart',
			gradient: 'from-green-50 to-emerald-50',
			borderColor: 'border-green-100',
			quote: (values.missionQuote ?? '').trim() || ''
		},
		objectives,
		impact: {
			title: (values.impactTitle ?? '').trim() || 'Mission Impact',
			icon: (values.impactIcon ?? '').trim() || 'Zap',
			gradient: 'from-green-500 to-teal-600',
			stats: impactStats
		}
	};
};

export default function MissionForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			heroTitle: initialData.hero.title,
			heroSubtitle: initialData.hero.subtitle,
			heroIcon: initialData.hero.icon,
			missionTitle: initialData.missionStatement.title,
			missionIcon: initialData.missionStatement.icon,
			missionQuote: initialData.missionStatement.quote,
			objectives: initialData.objectives.length > 0 
				? initialData.objectives.map(objective => ({
					id: crypto.randomUUID(),
					icon: objective.icon,
					title: objective.title,
					description: objective.description,
					color: objective.color
				}))
				: [createEmptyObjective()],
			impactTitle: initialData.impact.title,
			impactIcon: initialData.impact.icon,
			impactStats: initialData.impact.stats.length > 0
				? initialData.impact.stats.map(stat => ({
					id: crypto.randomUUID(),
					number: stat.number,
					label: stat.label,
					color: stat.color
				}))
				: [createEmptyImpactStat()]
		}
	});

	const {
		fields: objectiveFields,
		append: appendObjective,
		remove: removeObjective
	} = useFieldArray({
		control: form.control,
		name: 'objectives'
	});

	const {
		fields: impactStatFields,
		append: appendImpactStat,
		remove: removeImpactStat
	} = useFieldArray({
		control: form.control,
		name: 'impactStats'
	});

	useEffect(() => {
		onChange?.(normalizeMission(form.getValues()));
		const subscription = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				objectives: values.objectives?.filter(Boolean) as ObjectiveFormValue[],
				impactStats: values.impactStats?.filter(Boolean) as ImpactStatFormValue[]
			};
			onChange?.(normalizeMission(formValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const onSubmit = async (values: FormValues) => {
		setMessage(null);
		const normalized = normalizeMission(values);
		startTransition(async () => {
			try {
				await updateMission(pageSlug, normalized);
				setMessage('Mission updated successfully!');
				setTimeout(() => setMessage(null), 3000);
			} catch (error) {
				console.error('Error updating mission:', error);
				setMessage('Save failed');
				setTimeout(() => setMessage(null), 3000);
			}
		});
	};

	const showSection = (
		section: 'hero' | 'missionStatement' | 'objectives' | 'impact'
	) => !visibleSections || visibleSections.includes(section);

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(onSubmit)}>
				
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Mission
						</h3>
						<p className='text-sm text-slate-500'>
							Edit mission statement, objectives, and impact metrics.
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
				{showSection('hero') ? (
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Hero Section</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name="heroTitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Our Mission" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="heroSubtitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Input placeholder="Empowering Minds, Building Futures" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="heroIcon"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an icon" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{SUPPORTED_ICON_NAMES.map((iconName) => (
												<SelectItem key={iconName} value={iconName}>
													{iconName}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				) : null}

				{/* Mission Statement */}
				{showSection('missionStatement') ? (
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-900">Mission Statement</h3>
					<div className="grid grid-cols-1 gap-4">
						<FormField
							control={form.control}
							name="missionTitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Mission Statement" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="missionIcon"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an icon" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{SUPPORTED_ICON_NAMES.map((iconName) => (
												<SelectItem key={iconName} value={iconName}>
													{iconName}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="missionQuote"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quote</FormLabel>
									<FormControl>
										<Textarea 
											placeholder="Mission statement content..."
											rows={4}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				) : null}

				{/* Objectives */}
				{showSection('objectives') ? (
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h3 className="text-lg font-semibold text-gray-900">Mission Objectives</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => appendObjective(createEmptyObjective())}
						>
							Add Objective
						</Button>
					</div>
					{objectiveFields.map((field, index) => (
						<div key={field.id} className="border rounded-lg p-4 space-y-4">
							<div className="flex justify-between items-center">
								<h4 className="font-medium">Objective {index + 1}</h4>
								{objectiveFields.length > 1 && (
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => removeObjective(index)}
									>
										Remove
									</Button>
								)}
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name={`objectives.${index}.icon`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select an icon" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{SUPPORTED_ICON_NAMES.map((iconName) => (
														<SelectItem key={iconName} value={iconName}>
															{iconName}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`objectives.${index}.color`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Color</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a color" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{COLOR_OPTIONS.map((color) => (
														<SelectItem key={color} value={color}>
															<div className="flex items-center space-x-2">
																<div className={`w-4 h-4 rounded bg-${color}-100 border border-${color}-200`}></div>
																<span className="capitalize">{color}</span>
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name={`objectives.${index}.title`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder="Objective title" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`objectives.${index}.description`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea 
												placeholder="Objective description"
												rows={3}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					))}
				</div>
				) : null}

				{/* Impact Section */}
				{showSection('impact') ? (
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-900">Mission Impact</h3>
					<div className="grid grid-cols-1 gap-4">
						<FormField
							control={form.control}
							name="impactTitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Mission Impact" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="impactIcon"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Icon</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an icon" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{SUPPORTED_ICON_NAMES.map((iconName) => (
												<SelectItem key={iconName} value={iconName}>
													{iconName}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Impact Stats */}
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<h4 className="font-medium">Impact Statistics</h4>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => appendImpactStat(createEmptyImpactStat())}
							>
								Add Stat
							</Button>
						</div>
						{impactStatFields.map((field, index) => (
							<div key={field.id} className="border rounded-lg p-4 space-y-4">
								<div className="flex justify-between items-center">
									<h5 className="font-medium">Statistic {index + 1}</h5>
									{impactStatFields.length > 1 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeImpactStat(index)}
										>
											Remove
										</Button>
									)}
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<FormField
										control={form.control}
										name={`impactStats.${index}.number`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Number</FormLabel>
												<FormControl>
													<Input placeholder="5000+" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`impactStats.${index}.label`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Label</FormLabel>
												<FormControl>
													<Input placeholder="Alumni Making Impact" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`impactStats.${index}.color`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Color (Tailwind class)</FormLabel>
												<FormControl>
													<Input placeholder="text-green-600" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
				) : null}
			</form>
		</Form>
	);
}
