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

type TrainingAreaFormValue = {
	id: string;
	title: string;
	skills: string[];
	icon: string;
	iconColor: string;
	textColor: string;
};

type FormValues = {
	trainingTitle: string;
	trainingDescription: string;
	trainingAreas: TrainingAreaFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const FALLBACK_ICON = 'GraduationCap';

const createEmptyTrainingArea = (): TrainingAreaFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	skills: [''],
	icon: FALLBACK_ICON,
	iconColor: 'blue',
	textColor: 'black'
});

export default function TrainingAreasForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<
		'idle' | 'saving' | 'saved' | 'error'
	>('idle');

	const form = useForm<FormValues>({
		defaultValues: {
			trainingTitle: initialData.trainingTitle || '',
			trainingDescription: initialData.trainingDescription || '',
			trainingAreas:
				initialData.trainingAreas.length > 0
					? initialData.trainingAreas
					: [createEmptyTrainingArea()]
		}
	});

	const trainingAreasArray = useFieldArray({
		control: form.control,
		name: 'trainingAreas'
	});

	const iconOptions = SUPPORTED_ICON_NAMES;

	useEffect(() => {
		const subscription = form.watch(values => {
			if (onChange) {
				const updatedData: PlacementOverviewData = {
					...initialData,
					trainingTitle: values.trainingTitle || '',
					trainingDescription: values.trainingDescription || '',
					trainingAreas: (values.trainingAreas || [])
						.map(area => ({
							id: area?.id || crypto.randomUUID(),
							title: (area?.title ?? '').trim(),
							skills: (area?.skills ?? []).filter(
								(skill): skill is string =>
									typeof skill === 'string' && skill.trim().length > 0
							),
							icon: area?.icon?.trim().length
								? area.icon.trim()
								: FALLBACK_ICON,
							iconColor: area?.iconColor ?? 'blue',
							textColor: area?.textColor ?? 'black'
						}))
						.filter(area => area.title.length > 0 && area.skills.length > 0)
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
					trainingTitle: values.trainingTitle,
					trainingDescription: values.trainingDescription,
					trainingAreas: values.trainingAreas
						.map(area => ({
							id: area.id,
							title: (area.title ?? '').trim(),
							skills: (area.skills ?? []).filter(
								skill => skill.trim().length > 0
							),
							icon: area.icon?.trim().length ? area.icon.trim() : FALLBACK_ICON,
							iconColor: area.iconColor ?? 'blue',
							textColor: area.textColor ?? 'black'
						}))
						.filter(area => area.title.length > 0 && area.skills.length > 0)
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
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				{/* Training Section Headers */}
				<div className='space-y-4'>
					<h3 className='text-lg font-semibold text-slate-900'>
						Training Section
					</h3>

					<FormField
						control={form.control}
						name='trainingTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Training Title</FormLabel>
								<FormControl>
									<Input placeholder='Technical Training Areas' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='trainingDescription'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Training Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Brief description of training programs'
										rows={3}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Training Areas */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-lg font-semibold text-slate-900'>
							Training Areas
						</h3>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() =>
								trainingAreasArray.append(createEmptyTrainingArea())
							}>
							<Plus className='w-4 h-4 mr-2' />
							Add Training Area
						</Button>
					</div>
					<div className='space-y-4'>
						{trainingAreasArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-slate-700'>
										Training Area {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() => trainingAreasArray.remove(index)}>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
								<div className='grid grid-cols-1 gap-4'>
									<FormField
										control={form.control}
										name={`trainingAreas.${index}.title`}
										rules={{ required: 'Title is required' }}
										render={({ field: titleField }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input
														placeholder='e.g., Core Technologies'
														{...titleField}
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
									<FormField
										control={form.control}
										name={`trainingAreas.${index}.iconColor`}
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

									{/* Skills */}
									<div className='space-y-2'>
										<div className='flex items-center justify-between'>
											<FormLabel>Skills</FormLabel>
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={() => {
													const currentSkills =
														form.getValues(`trainingAreas.${index}.skills`) ||
														[];
													form.setValue(`trainingAreas.${index}.skills`, [
														...currentSkills,
														''
													]);
												}}>
												<Plus className='w-4 h-4 mr-2' />
												Add Skill
											</Button>
										</div>
										{(form.watch(`trainingAreas.${index}.skills`) || ['']).map(
											(_, skillIndex) => (
												<div
													key={skillIndex}
													className='flex items-center gap-2'>
													<FormField
														control={form.control}
														name={`trainingAreas.${index}.skills.${skillIndex}`}
														render={({ field: skillField }) => (
															<FormItem className='flex-1'>
																<FormControl>
																	<Input
																		placeholder='Skill name'
																		{...skillField}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<Button
														type='button'
														variant='ghost'
														size='sm'
														onClick={() => {
															const currentSkills =
																form.getValues(
																	`trainingAreas.${index}.skills`
																) || [];
															form.setValue(
																`trainingAreas.${index}.skills`,
																currentSkills.filter((_, i) => i !== skillIndex)
															);
														}}>
														<Trash2 className='w-4 h-4' />
													</Button>
												</div>
											)
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='flex items-center justify-between pt-6 border-t'>
					<div>
						{saveStatus === 'saved' && (
							<p className='text-sm text-green-600'>
								Changes saved successfully!
							</p>
						)}
						{saveStatus === 'error' && (
							<p className='text-sm text-red-600'>Failed to save changes.</p>
						)}
					</div>
					<Button type='submit' disabled={isPending || saveStatus === 'saving'}>
						{saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
