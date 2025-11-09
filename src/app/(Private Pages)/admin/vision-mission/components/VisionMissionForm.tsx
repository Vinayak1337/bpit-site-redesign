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
import type { VisionMissionData } from '@/app/(Private Pages)/actions/vision-mission';
import { updateVisionMission } from '@/app/(Private Pages)/actions/vision-mission';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';

type PillarFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: VisionMissionData['pillars'][number]['color'];
};

type AspirationFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: VisionMissionData['aspirations'][number]['color'];
};

type FormValues = {
	heroTitle: string;
	heroSubtitle: string;
	heroIcon: string;
	visionTitle: string;
	visionIcon: string;
	visionQuote: string;
	pillars: PillarFormValue[];
	aspirations: AspirationFormValue[];
};

type Props = {
	initialData: VisionMissionData;
	pageSlug: string;
	onChange?: (data: VisionMissionData) => void;
};

const COLOR_OPTIONS: VisionMissionData['pillars'][number]['color'][] = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'indigo'
];

const FALLBACK_ICON = 'Eye';

const createEmptyPillar = (): PillarFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	title: '',
	description: '',
	color: 'blue'
});

const createEmptyAspiration = (): AspirationFormValue => ({
	id: crypto.randomUUID(),
	icon: 'TrendingUp',
	title: '',
	description: '',
	color: 'blue'
});

const normalizeVisionMission = (values: Partial<FormValues>): VisionMissionData => {
	const pillars = (values.pillars ?? [])
		.map(pillar => ({
			icon: pillar.icon?.trim().length ? pillar.icon.trim() : FALLBACK_ICON,
			title: (pillar.title ?? '').trim(),
			description: (pillar.description ?? '').trim(),
			color: COLOR_OPTIONS.includes(pillar.color ?? 'blue')
				? pillar.color ?? 'blue'
				: 'blue'
		}))
		.filter(pillar => pillar.title.length > 0 && pillar.description.length > 0);

	const aspirations = (values.aspirations ?? [])
		.map(aspiration => ({
			icon: aspiration.icon?.trim().length ? aspiration.icon.trim() : 'TrendingUp',
			title: (aspiration.title ?? '').trim(),
			description: (aspiration.description ?? '').trim(),
			color: COLOR_OPTIONS.includes(aspiration.color ?? 'blue')
				? aspiration.color ?? 'blue'
				: 'blue'
		}))
		.filter(aspiration => aspiration.title.length > 0 && aspiration.description.length > 0);

	return {
		hero: {
			title: (values.heroTitle ?? '').trim() || 'Our Vision',
			subtitle: (values.heroSubtitle ?? '').trim() || 'Inspiring Excellence, Shaping Tomorrow',
			icon: (values.heroIcon ?? '').trim() || 'Eye',
			gradient: 'from-blue-50 to-indigo-100',
			borderColor: 'border-blue-200',
			iconBg: 'bg-blue-600'
		},
		visionStatement: {
			title: (values.visionTitle ?? '').trim() || 'Vision Statement',
			icon: (values.visionIcon ?? '').trim() || 'Compass',
			gradient: 'from-blue-50 to-indigo-50',
			borderColor: 'border-blue-100',
			quote: (values.visionQuote ?? '').trim() || ''
		},
		pillars,
		aspirations
	};
};

export default function VisionMissionForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			heroTitle: initialData.hero.title,
			heroSubtitle: initialData.hero.subtitle,
			heroIcon: initialData.hero.icon,
			visionTitle: initialData.visionStatement.title,
			visionIcon: initialData.visionStatement.icon,
			visionQuote: initialData.visionStatement.quote,
			pillars: initialData.pillars.length > 0 
				? initialData.pillars.map(pillar => ({
					id: crypto.randomUUID(),
					icon: pillar.icon,
					title: pillar.title,
					description: pillar.description,
					color: pillar.color
				}))
				: [createEmptyPillar()],
			aspirations: initialData.aspirations.length > 0 
				? initialData.aspirations.map(aspiration => ({
					id: crypto.randomUUID(),
					icon: aspiration.icon,
					title: aspiration.title,
					description: aspiration.description,
					color: aspiration.color
				}))
				: [createEmptyAspiration()]
		}
	});

	const pillarsArray = useFieldArray({
		control: form.control,
		name: 'pillars'
	});

	const aspirationsArray = useFieldArray({
		control: form.control,
		name: 'aspirations'
	});

	useEffect(() => {
		onChange?.(normalizeVisionMission(form.getValues()));
		const subscription = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				pillars: values.pillars?.filter(Boolean) as PillarFormValue[],
				aspirations: values.aspirations?.filter(Boolean) as AspirationFormValue[]
			};
			onChange?.(normalizeVisionMission(formValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeVisionMission(values);
		startTransition(async () => {
			try {
				await updateVisionMission(pageSlug, payload);
				setMessage('Saved');
			} catch (error) {
				console.error('Failed to update vision mission:', error);
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
							Vision & Mission
						</h3>
						<p className='text-sm text-slate-500'>
							Edit vision statement, pillars, and future aspirations.
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
					<h4 className='text-sm font-semibold text-slate-700'>Hero Section</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='heroTitle'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Our Vision' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='heroSubtitle'
							rules={{ required: 'Subtitle is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Input placeholder='Inspiring Excellence, Shaping Tomorrow' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='heroIcon'
							render={({ field }) => (
								<FormItem className='sm:col-span-2'>
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
					</div>
				</div>

				{/* Vision Statement */}
				<div className='space-y-4'>
					<h4 className='text-sm font-semibold text-slate-700'>Vision Statement</h4>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='visionTitle'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Vision Statement' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='visionIcon'
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
							name='visionQuote'
							rules={{ required: 'Vision quote is required' }}
							render={({ field }) => (
								<FormItem className='sm:col-span-2'>
									<FormLabel>Vision Quote</FormLabel>
									<FormControl>
										<Textarea 
											{...field} 
											placeholder='To be a premier institute of technical education...'
											rows={4}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Vision Pillars */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Vision Pillars
						</h4>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => pillarsArray.append(createEmptyPillar())}>
							Add pillar
						</Button>
					</div>
					<div className='space-y-4'>
						{pillarsArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-slate-700'>
										Pillar {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() =>
											pillarsArray.remove(index < 0 ? 0 : index)
										}>
										Remove
									</Button>
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name={`pillars.${index}.title`}
										rules={{ required: 'Title is required' }}
										render={({ field: titleField }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder='Academic Excellence' {...titleField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`pillars.${index}.icon`}
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
										name={`pillars.${index}.description`}
										rules={{ required: 'Description is required' }}
										render={({ field: descField }) => (
											<FormItem className='sm:col-span-2'>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea 
														{...descField} 
														placeholder='Delivering world-class technical education...'
														rows={3}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`pillars.${index}.color`}
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
						{pillarsArray.fields.length === 0 ? (
							<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
								Add at least one pillar to display in this section.
							</div>
						) : null}
					</div>
				</div>

				{/* Future Aspirations */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Future Aspirations
						</h4>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => aspirationsArray.append(createEmptyAspiration())}>
							Add aspiration
						</Button>
					</div>
					<div className='space-y-4'>
						{aspirationsArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-slate-700'>
										Aspiration {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() =>
											aspirationsArray.remove(index < 0 ? 0 : index)
										}>
										Remove
									</Button>
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name={`aspirations.${index}.title`}
										rules={{ required: 'Title is required' }}
										render={({ field: titleField }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder='2030 Goals' {...titleField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`aspirations.${index}.icon`}
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
										name={`aspirations.${index}.description`}
										rules={{ required: 'Description is required' }}
										render={({ field: descField }) => (
											<FormItem className='sm:col-span-2'>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea 
														{...descField} 
														placeholder='Achieve top 50 ranking among engineering institutes in India'
														rows={3}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`aspirations.${index}.color`}
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
						{aspirationsArray.fields.length === 0 ? (
							<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
								Add at least one aspiration to display in this section.
							</div>
						) : null}
					</div>
				</div>
			</form>
		</Form>
	);
}