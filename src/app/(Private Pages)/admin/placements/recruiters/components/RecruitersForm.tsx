'use client';

import { useState, useEffect, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	updateRecruitersData,
	type RecruitersData,
	type RecruiterStat,
	type Recruiter,
	type CTAButton
} from '@/app/(Private Pages)/actions/recruiters';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';

interface RecruitersFormProps {
	initialData: RecruitersData;
	pageSlug: string;
	onChange?: (data: RecruitersData) => void;
}

interface FormValues {
	hero: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
	};
	stats: RecruiterStat[];
	categories: { name: string }[];
	recruiters: Recruiter[];
	cta: {
		title: string;
		subtitle: string;
		buttons: CTAButton[];
		gradient: string;
	};
}

const GRADIENT_OPTIONS = [
	'from-blue-900 via-blue-800 to-blue-900',
	'from-purple-900 via-purple-800 to-purple-900',
	'from-green-900 via-green-800 to-green-900',
	'from-red-900 via-red-800 to-red-900',
	'from-indigo-900 via-indigo-800 to-indigo-900',
	'from-cyan-900 via-cyan-800 to-cyan-900',
	'from-blue-900 to-blue-800',
	'from-purple-900 to-purple-800'
];

const COLOR_OPTIONS = [
	'from-blue-500 to-blue-700',
	'from-purple-500 to-purple-700',
	'from-green-500 to-green-700',
	'from-red-500 to-red-700',
	'from-orange-500 to-orange-700',
	'from-pink-500 to-pink-700',
	'from-indigo-500 to-indigo-700',
	'from-teal-500 to-teal-700'
];

const TYPE_OPTIONS = [
	'MNC',
	'Product Giant',
	'Consulting',
	'Banking',
	'Unicorn',
	'R&D',
	'Fintech',
	'Startup',
	'Other'
];

const CATEGORY_OPTIONS = [
	'IT Services',
	'Product Companies',
	'Consulting',
	'Core Engineering',
	'Banking & Finance',
	'Startups',
	'Healthcare',
	'E-commerce',
	'Fintech',
	'Other'
];

export default function RecruitersForm({
	initialData,
	pageSlug,
	onChange
}: RecruitersFormProps) {
	const [message, setMessage] = useState('');
	const [isPending, startTransition] = useTransition();
	const [currentData, setCurrentData] = useState<RecruitersData>(initialData);
	const [expandedSections, setExpandedSections] = useState({
		hero: true,
		stats: false,
		categories: false,
		recruiters: false,
		cta: false
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
	};

	const form = useForm<FormValues>({
		defaultValues: {
			hero: initialData.hero,
			stats: initialData.stats,
			categories: initialData.categories.map(name => ({ name })),
			recruiters: initialData.recruiters,
			cta: initialData.cta
		}
	});

	const statsFields = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	const categoriesFields = useFieldArray({
		control: form.control,
		name: 'categories'
	});

	const recruitersFields = useFieldArray({
		control: form.control,
		name: 'recruiters'
	});

	const ctaButtonsFields = useFieldArray({
		control: form.control,
		name: 'cta.buttons'
	});

	// Watch for form changes and update preview
	useEffect(() => {
		const subscription = form.watch(formValues => {
			const updatedData: RecruitersData = {
				hero: formValues.hero || initialData.hero,
				stats: formValues.stats || initialData.stats,
				categories: (formValues.categories || []).map(c => c?.name || ''),
				recruiters: formValues.recruiters || initialData.recruiters,
				cta: formValues.cta || initialData.cta
			};
			setCurrentData(updatedData);
			onChange?.(updatedData);
		});
		return () => subscription.unsubscribe();
	}, [form, initialData, onChange]);

	const onSubmit = async (values: FormValues) => {
		setMessage('');
		startTransition(async () => {
			try {
				const admin = await requireAdmin();

				const dataToSubmit: RecruitersData = {
					hero: values.hero,
					stats: values.stats,
					categories: values.categories.map(c => c.name),
					recruiters: values.recruiters,
					cta: values.cta
				};

				const result = await updateRecruitersData(dataToSubmit, admin.id);

				if (result.success) {
					setMessage('Saved');
				} else {
					setMessage('Save failed');
				}
			} catch (error) {
				console.error('Error updating recruiters:', error);
				setMessage('Save failed');
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Recruiters Management
						</h3>
						<p className='text-sm text-slate-500'>
							Edit recruiter companies, stats, categories, and partnership information
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
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('hero')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<h3 className='text-lg font-semibold text-slate-900'>Hero Section</h3>
						{expandedSections.hero ? (
							<ChevronUp className='w-5 h-5 text-slate-500' />
						) : (
							<ChevronDown className='w-5 h-5 text-slate-500' />
						)}
					</button>
					{expandedSections.hero && (
						<div className='p-4 pt-0 space-y-4'>
							<FormField
								control={form.control}
								name='hero.icon'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Icon</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select icon' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{SUPPORTED_ICON_NAMES.map(icon => (
													<SelectItem key={icon} value={icon}>
														{icon}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='hero.title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder='Our Recruiters' />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='hero.subtitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Subtitle</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder='Hero subtitle...' rows={2} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='hero.gradient'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Background Gradient</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{GRADIENT_OPTIONS.map(gradient => (
													<SelectItem key={gradient} value={gradient}>
														<div className='flex items-center gap-2'>
															<div
																className={`w-16 h-4 rounded bg-gradient-to-r ${gradient}`}
															/>
															<span className='text-xs'>{gradient}</span>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>
					)}
				</div>

				{/* Stats Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('stats')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<div className='flex items-center gap-2'>
							<h3 className='text-lg font-semibold text-slate-900'>Statistics</h3>
							<span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full'>
								{statsFields.fields.length} stats
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Button
								type='button'
								size='sm'
								variant='outline'
								onClick={e => {
									e.stopPropagation();
									statsFields.append({
										icon: 'TrendingUp',
										value: '0',
										label: 'New Stat',
										color: 'from-blue-500 to-blue-700'
									});
								}}>
								<Plus className='w-4 h-4' />
							</Button>
							{expandedSections.stats ? (
								<ChevronUp className='w-5 h-5 text-slate-500' />
							) : (
								<ChevronDown className='w-5 h-5 text-slate-500' />
							)}
						</div>
					</button>
					{expandedSections.stats && (
						<div className='p-4 pt-0 space-y-4'>
							{statsFields.fields.map((field, index) => (
								<div
									key={field.id}
									className='p-4 border rounded-lg space-y-3 bg-slate-50'>
									<div className='flex justify-between items-center'>
										<h4 className='font-medium text-sm'>Stat #{index + 1}</h4>
										<Button
											type='button'
											size='sm'
											variant='ghost'
											onClick={() => statsFields.remove(index)}>
											<Trash2 className='w-4 h-4 text-red-600' />
										</Button>
									</div>

									<div className='grid grid-cols-2 gap-3'>
										<FormField
											control={form.control}
											name={`stats.${index}.icon`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Icon</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{SUPPORTED_ICON_NAMES.map(icon => (
																<SelectItem key={icon} value={icon}>
																	{icon}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`stats.${index}.value`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Value</FormLabel>
													<FormControl>
														<Input {...field} placeholder='500+' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`stats.${index}.label`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Label</FormLabel>
													<FormControl>
														<Input {...field} placeholder='Companies' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`stats.${index}.color`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Color Gradient</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{COLOR_OPTIONS.map(color => (
																<SelectItem key={color} value={color}>
																	<div className='flex items-center gap-2'>
																		<div
																			className={`w-16 h-4 rounded bg-gradient-to-r ${color}`}
																		/>
																	</div>
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Categories Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('categories')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<div className='flex items-center gap-2'>
							<h3 className='text-lg font-semibold text-slate-900'>Categories</h3>
							<span className='text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full'>
								{categoriesFields.fields.length} categories
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Button
								type='button'
								size='sm'
								variant='outline'
								onClick={e => {
									e.stopPropagation();
									categoriesFields.append({ name: 'New Category' });
								}}>
								<Plus className='w-4 h-4' />
							</Button>
							{expandedSections.categories ? (
								<ChevronUp className='w-5 h-5 text-slate-500' />
							) : (
								<ChevronDown className='w-5 h-5 text-slate-500' />
							)}
						</div>
					</button>
					{expandedSections.categories && (
						<div className='p-4 pt-0 space-y-4'>
							<div className='grid grid-cols-2 gap-3'>
								{categoriesFields.fields.map((field, index) => (
									<div key={field.id} className='flex gap-2'>
										<FormField
											control={form.control}
											name={`categories.${index}.name`}
											render={({ field }) => (
												<FormItem className='flex-1'>
													<FormControl>
														<Input {...field} placeholder='Category name' />
													</FormControl>
												</FormItem>
											)}
										/>
										<Button
											type='button'
											size='sm'
											variant='ghost'
											onClick={() => categoriesFields.remove(index)}>
											<Trash2 className='w-4 h-4 text-red-600' />
										</Button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Recruiters Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('recruiters')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<div className='flex items-center gap-2'>
							<h3 className='text-lg font-semibold text-slate-900'>Recruiters</h3>
							<span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full'>
								{recruitersFields.fields.length} companies
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Button
								type='button'
								size='sm'
								variant='outline'
								onClick={e => {
									e.stopPropagation();
									recruitersFields.append({
										name: 'New Company',
										logo: '/recruiters/company.png',
										category: 'IT Services',
										sector: 'Technology',
										location: 'Global',
										type: 'MNC',
										established: '2000',
										website: 'https://example.com',
										description: 'Company description...'
									});
								}}>
								<Plus className='w-4 h-4' />
							</Button>
							{expandedSections.recruiters ? (
								<ChevronUp className='w-5 h-5 text-slate-500' />
							) : (
								<ChevronDown className='w-5 h-5 text-slate-500' />
							)}
						</div>
					</button>
					{expandedSections.recruiters && (
						<div className='p-4 pt-0 space-y-4'>
							{recruitersFields.fields.map((field, index) => (
								<div
									key={field.id}
									className='p-4 border rounded-lg space-y-3 bg-slate-50'>
									<div className='flex justify-between items-center'>
										<h4 className='font-medium text-sm'>
											Company #{index + 1}
										</h4>
										<Button
											type='button'
											size='sm'
											variant='ghost'
											onClick={() => recruitersFields.remove(index)}>
											<Trash2 className='w-4 h-4 text-red-600' />
										</Button>
									</div>

									<div className='grid grid-cols-2 gap-3'>
										<FormField
											control={form.control}
											name={`recruiters.${index}.name`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Company Name</FormLabel>
													<FormControl>
														<Input {...field} placeholder='Company Name' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`recruiters.${index}.logo`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Logo Path</FormLabel>
													<FormControl>
														<Input {...field} placeholder='/recruiters/logo.png' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`recruiters.${index}.category`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Category</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{CATEGORY_OPTIONS.map(cat => (
																<SelectItem key={cat} value={cat}>
																	{cat}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`recruiters.${index}.sector`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Sector</FormLabel>
													<FormControl>
														<Input {...field} placeholder='Information Technology' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`recruiters.${index}.location`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Location</FormLabel>
													<FormControl>
														<Input {...field} placeholder='Global Operations' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`recruiters.${index}.type`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Type</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{TYPE_OPTIONS.map(type => (
																<SelectItem key={type} value={type}>
																	{type}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`recruiters.${index}.established`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Established</FormLabel>
													<FormControl>
														<Input {...field} placeholder='2000' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`recruiters.${index}.website`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Website</FormLabel>
													<FormControl>
														<Input {...field} placeholder='https://example.com' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`recruiters.${index}.description`}
											render={({ field }) => (
												<FormItem className='col-span-2'>
													<FormLabel className='text-xs'>Description</FormLabel>
													<FormControl>
														<Textarea
															{...field}
															placeholder='Company description...'
															rows={2}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* CTA Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('cta')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<h3 className='text-lg font-semibold text-slate-900'>Call to Action</h3>
						{expandedSections.cta ? (
							<ChevronUp className='w-5 h-5 text-slate-500' />
						) : (
							<ChevronDown className='w-5 h-5 text-slate-500' />
						)}
					</button>
					{expandedSections.cta && (
						<div className='p-4 pt-0 space-y-4'>
							<FormField
								control={form.control}
								name='cta.title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder='Want to Partner with Us?' />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='cta.subtitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Subtitle</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder='CTA subtitle...' rows={2} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='cta.gradient'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Background Gradient</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{GRADIENT_OPTIONS.map(gradient => (
													<SelectItem key={gradient} value={gradient}>
														<div className='flex items-center gap-2'>
															<div
																className={`w-16 h-4 rounded bg-gradient-to-r ${gradient}`}
															/>
															<span className='text-xs'>{gradient}</span>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<h4 className='font-medium text-sm'>CTA Buttons</h4>
									<Button
										type='button'
										size='sm'
										variant='outline'
										onClick={() =>
											ctaButtonsFields.append({
												text: 'Button Text',
												icon: 'Building2',
												variant: 'primary'
											})
										}>
										<Plus className='w-4 h-4 mr-1' />
										Add Button
									</Button>
								</div>

								{ctaButtonsFields.fields.map((field, index) => (
									<div
										key={field.id}
										className='p-4 border rounded-lg space-y-3 bg-slate-50'>
										<div className='flex justify-between items-center'>
											<h5 className='font-medium text-sm'>Button #{index + 1}</h5>
											<Button
												type='button'
												size='sm'
												variant='ghost'
												onClick={() => ctaButtonsFields.remove(index)}>
												<Trash2 className='w-4 h-4 text-red-600' />
											</Button>
										</div>

										<div className='grid grid-cols-3 gap-3'>
											<FormField
												control={form.control}
												name={`cta.buttons.${index}.text`}
												render={({ field }) => (
													<FormItem>
														<FormLabel className='text-xs'>Text</FormLabel>
														<FormControl>
															<Input {...field} placeholder='Button text' />
														</FormControl>
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name={`cta.buttons.${index}.icon`}
												render={({ field }) => (
													<FormItem>
														<FormLabel className='text-xs'>Icon</FormLabel>
														<Select onValueChange={field.onChange} value={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{SUPPORTED_ICON_NAMES.map(icon => (
																	<SelectItem key={icon} value={icon}>
																		{icon}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name={`cta.buttons.${index}.variant`}
												render={({ field }) => (
													<FormItem>
														<FormLabel className='text-xs'>Variant</FormLabel>
														<Select onValueChange={field.onChange} value={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value='primary'>Primary</SelectItem>
																<SelectItem value='secondary'>Secondary</SelectItem>
															</SelectContent>
														</Select>
													</FormItem>
												)}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Submit Button */}
				<div className='border-t pt-4 sticky bottom-0 bg-white'>
					<Button
						type='submit'
						disabled={isPending}
						className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
						{isPending ? 'Saving...' : 'Save All Changes'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
