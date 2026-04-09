'use client';

import { useEffect, useState, useTransition } from 'react';
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

const GRADIENT_OPTIONS = [
	{ label: 'Blue', value: 'from-blue-500 to-blue-700' },
	{ label: 'Green', value: 'from-green-500 to-green-700' },
	{ label: 'Purple', value: 'from-purple-500 to-purple-700' },
	{ label: 'Orange', value: 'from-orange-500 to-orange-700' },
	{ label: 'Red', value: 'from-red-500 to-red-700' },
	{ label: 'Indigo', value: 'from-indigo-500 to-indigo-700' },
	{ label: 'Teal', value: 'from-teal-500 to-teal-700' },
	{ label: 'Pink', value: 'from-pink-500 to-pink-700' },
];

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
	achievementsTitle: string;
	achievementsDescription: string;
	achievements: AchievementFormValue[];
	highlightsTitle: string;
	highlightsDescription: string;
	highlights: HighlightFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const FALLBACK_ICON = 'GraduationCap';

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

export default function AchievementsHighlightsForm({ initialData, pageSlug, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm<FormValues>({
		defaultValues: {
			achievementsTitle: initialData.achievementsTitle || '',
			achievementsDescription: initialData.achievementsDescription || '',
			achievements: initialData.achievements.length > 0 ? initialData.achievements : [createEmptyAchievement()],
			highlightsTitle: initialData.highlightsTitle || '',
			highlightsDescription: initialData.highlightsDescription || '',
			highlights: initialData.highlights.length > 0 ? initialData.highlights : [createEmptyHighlight()]
		}
	});

	const achievementsArray = useFieldArray({
		control: form.control,
		name: 'achievements'
	});

	const highlightsArray = useFieldArray({
		control: form.control,
		name: 'highlights'
	});

	const iconOptions = SUPPORTED_ICON_NAMES;

	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: PlacementOverviewData = {
					...initialData,
					achievementsTitle: values.achievementsTitle || '',
					achievementsDescription: values.achievementsDescription || '',
					achievements: (values.achievements || [])
						.map(achievement => ({
							id: achievement?.id || crypto.randomUUID(),
							title: (achievement?.title ?? '').trim(),
							description: (achievement?.description ?? '').trim(),
							icon: achievement?.icon?.trim().length ? achievement.icon.trim() : FALLBACK_ICON,
							highlight: (achievement?.highlight ?? '').trim(),
							category: (achievement?.category ?? '').trim(),
							department: (achievement?.department ?? '').trim(),
							iconColor: achievement?.iconColor ?? 'blue',
							categoryColor: achievement?.categoryColor ?? 'blue',
							highlightColor: achievement?.highlightColor ?? 'blue'
						}))
						.filter(achievement => achievement.title.length > 0),
					highlightsTitle: values.highlightsTitle || '',
					highlightsDescription: values.highlightsDescription || '',
					highlights: (values.highlights || [])
						.map(highlight => ({
							id: highlight?.id || crypto.randomUUID(),
							department: (highlight?.department ?? '').trim(),
							maxPackage: (highlight?.maxPackage ?? '').trim(),
							avgPackage: (highlight?.avgPackage ?? '').trim(),
							color: highlight?.color ?? 'blue',
							initials: (highlight?.initials ?? '').trim()
						}))
						.filter(highlight => highlight.department.length > 0)
				};
				onChange(updatedData);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, onChange, initialData]);

	const onSubmit = async (values: FormValues) => {
		setSaveStatus('saving');
		startTransition(async () => {
			try {
				const updatedData: PlacementOverviewData = {
					...initialData,
					achievementsTitle: values.achievementsTitle,
					achievementsDescription: values.achievementsDescription,
					achievements: values.achievements
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
						.filter(achievement => achievement.title.length > 0),
					highlightsTitle: values.highlightsTitle,
					highlightsDescription: values.highlightsDescription,
					highlights: values.highlights
						.map(highlight => ({
							id: highlight.id,
							department: (highlight.department ?? '').trim(),
							maxPackage: (highlight.maxPackage ?? '').trim(),
							avgPackage: (highlight.avgPackage ?? '').trim(),
							color: highlight.color ?? 'blue',
							initials: (highlight.initials ?? '').trim()
						}))
						.filter(highlight => highlight.department.length > 0)
				};

				await updatePlacementOverview(pageSlug, updatedData);
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} catch (error) {
				console.error('Failed to save:', error);
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Achievements Section Headers */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-slate-900">Achievements Section</h3>
					
					<FormField
						control={form.control}
						name="achievementsTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Achievements Title</FormLabel>
								<FormControl>
									<Input placeholder="Notable Achievements" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="achievementsDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Achievements Description</FormLabel>
								<FormControl>
									<Textarea 
										placeholder="Brief description of achievements"
										rows={3}
										{...field} 
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Achievements */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-slate-900">Achievements</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => achievementsArray.append(createEmptyAchievement())}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Achievement
						</Button>
					</div>
					<div className="space-y-4">
						{achievementsArray.fields.map((field, index) => (
							<div
								key={field.id}
								className="rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50"
							>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-slate-700">
										Achievement {index + 1}
									</span>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => achievementsArray.remove(index)}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={`achievements.${index}.title`}
										rules={{ required: 'Title is required' }}
										render={({ field: titleField }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder="Achievement title" {...titleField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`achievements.${index}.category`}
										render={({ field: categoryField }) => (
											<FormItem>
												<FormLabel>Category</FormLabel>
												<FormControl>
													<Input placeholder="e.g., Placement Record" {...categoryField} />
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
													<Input placeholder="e.g., 95% Success Rate" {...highlightField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`achievements.${index}.department`}
										render={({ field: deptField }) => (
											<FormItem>
												<FormLabel>Department</FormLabel>
												<FormControl>
													<Input placeholder="Department name" {...deptField} />
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
														value={iconField.value}
													>
														<SelectTrigger>
															<SelectValue placeholder="Select icon" />
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
										name={`achievements.${index}.iconColor`}
										render={({ field: colorField }) => (
											<FormItem>
												<FormLabel>Icon Color</FormLabel>
												<Select onValueChange={colorField.onChange} value={colorField.value ?? ''}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select gradient' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{GRADIENT_OPTIONS.map(opt => (
															<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`achievements.${index}.description`}
										render={({ field: descField }) => (
											<FormItem className="col-span-2">
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea placeholder="Achievement description" rows={2} {...descField} />
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

				{/* Highlights Section Headers */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-slate-900">Highlights Section</h3>
					
					<FormField
						control={form.control}
						name="highlightsTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Highlights Title</FormLabel>
								<FormControl>
									<Input placeholder="Placement Highlights" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="highlightsDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Highlights Description</FormLabel>
								<FormControl>
									<Textarea 
										placeholder="Brief description of highlights"
										rows={3}
										{...field} 
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Highlights */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-slate-900">Department Highlights</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => highlightsArray.append(createEmptyHighlight())}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Highlight
						</Button>
					</div>
					<div className="space-y-4">
						{highlightsArray.fields.map((field, index) => (
							<div
								key={field.id}
								className="rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50"
							>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-slate-700">
										Highlight {index + 1}
									</span>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => highlightsArray.remove(index)}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={`highlights.${index}.department`}
										rules={{ required: 'Department is required' }}
										render={({ field: deptField }) => (
											<FormItem>
												<FormLabel>Department</FormLabel>
												<FormControl>
													<Input placeholder="e.g., Computer Science" {...deptField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`highlights.${index}.initials`}
										render={({ field: initialsField }) => (
											<FormItem>
												<FormLabel>Initials</FormLabel>
												<FormControl>
													<Input placeholder="e.g., CSE" {...initialsField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`highlights.${index}.maxPackage`}
										render={({ field: maxField }) => (
											<FormItem>
												<FormLabel>Max Package</FormLabel>
												<FormControl>
													<Input placeholder="e.g., ₹45 LPA" {...maxField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`highlights.${index}.avgPackage`}
										render={({ field: avgField }) => (
											<FormItem>
												<FormLabel>Average Package</FormLabel>
												<FormControl>
													<Input placeholder="e.g., ₹8.5 LPA" {...avgField} />
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
												<Select onValueChange={colorField.onChange} value={colorField.value ?? ''}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select gradient' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{GRADIENT_OPTIONS.map(opt => (
															<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="flex items-center justify-between pt-6 border-t">
					<div>
						{saveStatus === 'saved' && (
							<p className="text-sm text-green-600">Changes saved successfully!</p>
						)}
						{saveStatus === 'error' && (
							<p className="text-sm text-red-600">Failed to save changes.</p>
						)}
					</div>
					<Button type="submit" disabled={isPending || saveStatus === 'saving'}>
						{saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
