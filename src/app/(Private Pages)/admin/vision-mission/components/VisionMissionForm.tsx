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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
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
	visibleSections?: Array<'hero' | 'visionStatement' | 'pillars' | 'aspirations'>;
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
	const showSection = (
		section: 'hero' | 'visionStatement' | 'pillars' | 'aspirations'
	) => !visibleSections || visibleSections.includes(section);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 max-w-5xl mx-auto pb-24'>
				
				<div className='flex items-center justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-gray-900'>Vision & Mission</h3>
						<p className='text-sm text-gray-500'>Edit vision statement, pillars, and future aspirations.</p>
					</div>
					<div className='flex items-center gap-2'>
						{message && (
							<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						)}
						<Button type='submit' disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</>
							)}
						</Button>
					</div>
				</div>

				{/* Hero Section */}
				{showSection('hero') ? (
				<Card>
					<CardHeader>
						<CardTitle>Hero Section</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
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
					</CardContent>
				</Card>
				) : null}

				{/* Vision Statement */}
				{showSection('visionStatement') ? (
				<Card>
					<CardHeader>
						<CardTitle>Vision Statement</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
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
					</CardContent>
				</Card>
				) : null}

				{/* Vision Pillars */}
				{showSection('pillars') ? (
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-xl font-semibold'>Vision Pillars</h3>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => pillarsArray.append(createEmptyPillar())}>
							<Plus className="w-4 h-4 mr-2" />
							Add Pillar
						</Button>
					</div>
					<div className='grid md:grid-cols-2 gap-4'>
						{pillarsArray.fields.map((field, index) => (
							<Card key={field.id} className='relative'>
								<div className='absolute top-2 right-2'>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className="h-8 w-8 text-red-500 hover:bg-red-50"
										onClick={() =>
											pillarsArray.remove(index < 0 ? 0 : index)
										}>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
								<CardContent className='pt-6 space-y-4'>
									<div className='grid grid-cols-1 gap-4'>
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
										<div className='grid grid-cols-2 gap-4'>
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
										<FormField
											control={form.control}
											name={`pillars.${index}.description`}
											rules={{ required: 'Description is required' }}
											render={({ field: descField }) => (
												<FormItem>
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
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
				) : null}

				{/* Future Aspirations */}
				{showSection('aspirations') ? (
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-xl font-semibold'>Future Aspirations</h3>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => aspirationsArray.append(createEmptyAspiration())}>
							<Plus className="w-4 h-4 mr-2" />
							Add Aspiration
						</Button>
					</div>
					<div className='grid md:grid-cols-2 gap-4'>
						{aspirationsArray.fields.map((field, index) => (
							<Card key={field.id} className='relative'>
								<div className='absolute top-2 right-2'>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className="h-8 w-8 text-red-500 hover:bg-red-50"
										onClick={() =>
											aspirationsArray.remove(index < 0 ? 0 : index)
										}>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
								<CardContent className='pt-6 space-y-4'>
									<div className='grid grid-cols-1 gap-4'>
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
										<div className='grid grid-cols-2 gap-4'>
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
										<FormField
											control={form.control}
											name={`aspirations.${index}.description`}
											rules={{ required: 'Description is required' }}
											render={({ field: descField }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea 
															{...descField} 
															placeholder='Achieve top 50 ranking...'
															rows={3}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
				) : null}

				<div className="sticky bottom-4 bg-white p-4 border rounded-xl shadow-lg flex justify-end z-50">
					<Button type='submit' disabled={isPending} className='w-full md:w-auto min-w-[150px]'>
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving...
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" />
								Save Changes
							</>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
