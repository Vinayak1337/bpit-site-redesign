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
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import type { AboutOverviewData } from '@/app/(Private Pages)/actions/about';
import { updateAboutOverview } from '@/app/(Private Pages)/actions/about';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';

type StatFormValue = {
	id: string;
	icon: string;
	value: string;
	label: string;
	color: AboutOverviewData['stats'][number]['color'];
};

type FormValues = {
	headerTitle: string;
	headerSubtitle: string;
	headerImage: string;
	established: string;
	location: string;
	accreditation: string;
	affiliation: string;
	stats: StatFormValue[];
};

type Props = {
	initialData: AboutOverviewData;
	pageSlug: string;
	onChange?: (data: AboutOverviewData) => void;
};

const COLOR_OPTIONS: AboutOverviewData['stats'][number]['color'][] = [
	'blue',
	'green',
	'purple'
];

const FALLBACK_ICON = 'GraduationCap';

const createEmptyStat = (): StatFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	value: '',
	label: '',
	color: 'blue'
});

const normalizeOverview = (values: Partial<FormValues>): AboutOverviewData => {
	const stats = (values.stats ?? [])
		.map(stat => ({
			icon: stat.icon?.trim().length ? stat.icon.trim() : FALLBACK_ICON,
			value: (stat.value ?? '').trim(),
			label: (stat.label ?? '').trim(),
			color: COLOR_OPTIONS.includes(stat.color ?? 'blue')
				? stat.color ?? 'blue'
				: 'blue'
		}))
		.filter(stat => stat.value.length > 0 && stat.label.length > 0);

	const headerImageValue = (values.headerImage ?? '').trim();

	return {
		header: {
			title: (values.headerTitle ?? '').trim() || 'About BPIT',
			subtitle:
				(values.headerSubtitle ?? '').trim() ||
				'Excellence in Engineering Education',
			image: headerImageValue.length > 0 ? headerImageValue : null,
			established: (values.established ?? '').trim() || '2007',
			location: (values.location ?? '').trim() || 'Rohini, New Delhi',
			accreditation: (values.accreditation ?? '').trim() || 'NBA & NAAC',
			affiliation: (values.affiliation ?? '').trim() || 'GGSIPU'
		},
		stats
	};
};

export default function AboutOverviewForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			headerTitle: initialData.header.title,
			headerSubtitle: initialData.header.subtitle,
			headerImage: initialData.header.image ?? '',
			established: initialData.header.established,
			location: initialData.header.location,
			accreditation: initialData.header.accreditation,
			affiliation: initialData.header.affiliation,
			stats:
				initialData.stats.length > 0
					? initialData.stats.map(stat => ({
							id: crypto.randomUUID(),
							icon: stat.icon,
							value: stat.value,
							label: stat.label,
							color: stat.color
					  }))
					: [createEmptyStat()]
		}
	});

	const statsArray = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	useEffect(() => {
		onChange?.(normalizeOverview(form.getValues()));
		const subscription = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				stats: values.stats?.filter(Boolean) as StatFormValue[]
			};
			onChange?.(normalizeOverview(formValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeOverview(values);
		startTransition(async () => {
			const result = await updateAboutOverview(pageSlug, payload);
			if (!result.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved');
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
							Overview
						</h3>
						<p className='text-sm text-slate-500'>
							Edit headline details and stats shown on the About overview card.
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

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='headerTitle'
						rules={{ required: 'Title is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder='Bhagwan Parshuram Institute...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='headerSubtitle'
						rules={{ required: 'Subtitle is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subtitle</FormLabel>
								<FormControl>
									<Input placeholder='Excellence in Engineering Education' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='headerImage'
						render={({ field }) => (
							<FormItem className='sm:col-span-2'>
								<FormLabel>Title image (optional)</FormLabel>
								<FormControl>
									<Input placeholder='https://...' {...field} />
								</FormControl>
								<div className='flex gap-2 pt-2'>
									<CloudinaryUploadButton
										buttonText='Upload image'
										onUpload={url =>
											form.setValue('headerImage', url, {
												shouldDirty: true,
												shouldTouch: true
											})
										}
									/>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() =>
											form.setValue('headerImage', '', {
												shouldDirty: true,
												shouldTouch: true
											})
										}>
										Clear
									</Button>
								</div>
								<p className='text-xs text-slate-500'>
									Displayed beside the BPIT title. The blue icon shows if no image is provided.
								</p>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='established'
						rules={{ required: 'Established year is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Established</FormLabel>
								<FormControl>
									<Input placeholder='2007' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='location'
						rules={{ required: 'Location is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Location</FormLabel>
								<FormControl>
									<Input placeholder='Rohini, New Delhi' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='accreditation'
						rules={{ required: 'Accreditation is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Accreditation</FormLabel>
								<FormControl>
									<Input placeholder='NBA & NAAC' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='affiliation'
						rules={{ required: 'Affiliation is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Affiliation</FormLabel>
								<FormControl>
									<Input placeholder='GGSIPU' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-semibold text-slate-700'>
							Stats
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
										Stat {index + 1}
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
														placeholder='Students Enrolled'
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
										name={`stats.${index}.color`}
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
						{statsArray.fields.length === 0 ? (
							<div className='rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500'>
								Add at least one stat to display in this section.
							</div>
						) : null}
					</div>
				</div>
			</form>
		</Form>
	);
}

