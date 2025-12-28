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

type FormValues = {
	hero: HeroFormValue;
	stats: StatFormValue[];
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

export default function HeroStatsForm({ initialData, pageSlug, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm<FormValues>({
		defaultValues: {
			hero: initialData.hero || {
				icon: FALLBACK_ICON,
				title: '',
				subtitle: '',
				gradient: GRADIENT_OPTIONS[0],
				iconColor: 'bg-blue-500',
				textColor: 'text-white'
			},
			stats: initialData.stats.length > 0 ? initialData.stats : [createEmptyStat()]
		}
	});

	const statsArray = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	const iconOptions = SUPPORTED_ICON_NAMES;

	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: PlacementOverviewData = {
					...initialData,
					hero: {
						icon: values.hero?.icon || initialData.hero.icon,
						title: values.hero?.title || initialData.hero.title,
						subtitle: values.hero?.subtitle || initialData.hero.subtitle,
						gradient: values.hero?.gradient || initialData.hero.gradient,
						iconColor: values.hero?.iconColor || initialData.hero.iconColor,
						textColor: values.hero?.textColor || initialData.hero.textColor
					},
					stats: (values.stats || [])
						.map(stat => ({
							icon: stat?.icon?.trim().length ? stat.icon.trim() : FALLBACK_ICON,
							value: (stat?.value ?? '').trim(),
							label: (stat?.label ?? '').trim(),
							iconColor: stat?.iconColor ?? 'blue',
							textColor: stat?.textColor ?? 'black'
						}))
						.filter(stat => stat.value.length > 0 && stat.label.length > 0)
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
					hero: values.hero,
					stats: values.stats
						.map(stat => ({
							icon: stat.icon?.trim().length ? stat.icon.trim() : FALLBACK_ICON,
							value: (stat.value ?? '').trim(),
							label: (stat.label ?? '').trim(),
							iconColor: stat.iconColor ?? 'blue',
							textColor: stat.textColor ?? 'black'
						}))
						.filter(stat => stat.value.length > 0 && stat.label.length > 0)
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
				{/* Hero Section */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-slate-900">Hero Section</h3>
					
					<FormField
						control={form.control}
						name="hero.title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Training & Placement Cell" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="hero.subtitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subtitle</FormLabel>
								<FormControl>
									<Textarea 
										placeholder="Bridging Academia and Industry Excellence"
										rows={3}
										{...field} 
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="hero.icon"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Icon</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
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
						name="hero.gradient"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Gradient</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Select gradient" />
										</SelectTrigger>
										<SelectContent>
											{GRADIENT_OPTIONS.map(option => (
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
						name="hero.iconColor"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Icon Background Color</FormLabel>
								<FormControl>
									<Input placeholder="bg-blue-500" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="hero.textColor"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Text Color</FormLabel>
								<FormControl>
									<Input placeholder="text-white" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Stats Section */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-slate-900">Statistics</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => statsArray.append(createEmptyStat())}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Stat
						</Button>
					</div>
					<div className="space-y-4">
						{statsArray.fields.map((field, index) => (
							<div
								key={field.id}
								className="rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50"
							>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-slate-700">
										Stat {index + 1}
									</span>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => statsArray.remove(index)}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={`stats.${index}.value`}
										rules={{ required: 'Value is required' }}
										render={({ field: valueField }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input placeholder="500+" {...valueField} />
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
													<Input placeholder="Companies Visited" {...labelField} />
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
										name={`stats.${index}.iconColor`}
										render={({ field: colorField }) => (
											<FormItem>
												<FormLabel>Icon Color</FormLabel>
												<FormControl>
													<Input placeholder="bg-blue-500" {...colorField} />
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
