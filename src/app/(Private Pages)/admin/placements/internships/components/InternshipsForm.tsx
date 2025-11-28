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
	updateInternshipsData,
	type InternshipsData,
	type InternshipStat,
	type InternshipBenefit,
	type InternshipOpportunity,
	type ProcessStep,
	type ContactButton
} from '@/app/(Private Pages)/actions/internships';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';

interface InternshipsFormProps {
	initialData: InternshipsData;
	pageSlug: string;
	onChange?: (data: InternshipsData) => void;
}

interface CategoryFormValue {
	name: string;
}

interface DomainFormValue {
	name: string;
}

interface FormValues {
	hero: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
	};
	stats: InternshipStat[];
	benefits: InternshipBenefit[];
	filters: CategoryFormValue[];
	opportunities: (InternshipOpportunity & { domainsArray: DomainFormValue[] })[];
	process: ProcessStep[];
	contact: {
		title: string;
		subtitle: string;
		phone: string;
		email: string;
		buttons: ContactButton[];
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
	'from-orange-900 via-orange-800 to-orange-900',
	'from-blue-900 to-blue-800'
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

const BENEFIT_COLOR_OPTIONS = ['blue', 'green', 'purple', 'orange'];

const INTERNSHIP_TYPE_OPTIONS = [
	'Summer Internship',
	'Winter Internship',
	'Research Internship',
	'Industry Project',
	'Startup Internship'
];

const CATEGORY_OPTIONS = [
	'Technology',
	'Research',
	'Fintech',
	'E-commerce',
	'Food Tech',
	'Aerospace',
	'Healthcare',
	'Manufacturing',
	'Consulting',
	'Other'
];

export default function InternshipsForm({
	initialData,
	pageSlug,
	onChange
}: InternshipsFormProps) {
	const [message, setMessage] = useState('');
	const [isPending, startTransition] = useTransition();
	const [currentData, setCurrentData] = useState<InternshipsData>(initialData);
	const [expandedSections, setExpandedSections] = useState({
		hero: true,
		stats: false,
		benefits: false,
		filters: false,
		opportunities: false,
		process: false,
		contact: false
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections(prev => ({
			...prev,
			[section]: !prev[section]
		}));
	};

	const form = useForm<FormValues>({
		defaultValues: {
			hero: initialData.hero,
			stats: initialData.stats,
			benefits: initialData.benefits,
			filters: initialData.filters.map(name => ({ name })),
			opportunities: initialData.opportunities.map(opp => ({
				...opp,
				domainsArray: opp.domains.map(d => ({ name: d }))
			})),
			process: initialData.process,
			contact: initialData.contact
		}
	});

	const statsFields = useFieldArray({
		control: form.control,
		name: 'stats'
	});

	const benefitsFields = useFieldArray({
		control: form.control,
		name: 'benefits'
	});

	const filtersFields = useFieldArray({
		control: form.control,
		name: 'filters'
	});

	const opportunitiesFields = useFieldArray({
		control: form.control,
		name: 'opportunities'
	});

	const processFields = useFieldArray({
		control: form.control,
		name: 'process'
	});

	const contactButtonsFields = useFieldArray({
		control: form.control,
		name: 'contact.buttons'
	});

	// Watch for changes and update preview
	useEffect(() => {
		const subscription = form.watch((values) => {
			const updatedData: InternshipsData = {
				hero: values.hero as any,
				stats: values.stats as any,
				benefits: values.benefits as any,
				filters: values.filters?.map(f => f?.name || '').filter(Boolean) || [],
				opportunities: values.opportunities?.map(opp => ({
					company: opp?.company || '',
					title: opp?.title || '',
					type: opp?.type || '',
					location: opp?.location || '',
					description: opp?.description || '',
					logo: opp?.logo || '',
					category: opp?.category || '',
					domains: (opp?.domainsArray || []).map(d => d?.name || '').filter(Boolean)
				})) || [],
				process: values.process as any,
				contact: values.contact as any
			};
			onChange?.(updatedData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const onSubmit = async (values: FormValues) => {
		setMessage('');
		startTransition(async () => {
			try {
				const admin = await requireAdmin();

				const dataToSubmit: InternshipsData = {
					hero: values.hero as any,
					stats: values.stats as any,
					benefits: values.benefits as any,
					filters: values.filters.map(f => f?.name || '').filter(Boolean),
					opportunities: values.opportunities.map(opp => ({
						company: opp?.company || '',
						title: opp?.title || '',
						type: opp?.type || '',
						location: opp?.location || '',
						description: opp?.description || '',
						logo: opp?.logo || '',
						category: opp?.category || '',
						domains: (opp?.domainsArray || []).map(d => d?.name || '').filter(Boolean)
					})),
					process: values.process as any,
					contact: values.contact as any
				};

				const result = await updateInternshipsData(dataToSubmit);

				if (result.success) {
					setMessage('Saved');
					setCurrentData(dataToSubmit);
				} else {
					setMessage('Save failed');
				}
			} catch (error) {
				console.error('Error updating internships:', error);
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
							Internships Management
						</h3>
						<p className='text-sm text-slate-500'>
							Edit internship opportunities, stats, benefits, and contact information
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
						<div className='p-4 space-y-4 border-t'>
							<FormField
								control={form.control}
								name='hero.icon'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Icon</FormLabel>
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
								name='hero.title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} />
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
											<Textarea {...field} rows={2} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='hero.gradient'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gradient</FormLabel>
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
															<div className={`w-16 h-4 rounded bg-gradient-to-r ${gradient}`} />
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
						<h3 className='text-lg font-semibold text-slate-900'>
							Stats Section <span className='text-sm text-slate-500'>({statsFields.fields.length} stats)</span>
						</h3>
						{expandedSections.stats ? (
							<ChevronUp className='w-5 h-5 text-slate-500' />
						) : (
							<ChevronDown className='w-5 h-5 text-slate-500' />
						)}
					</button>
					
					{expandedSections.stats && (
						<div className='p-4 space-y-4 border-t'>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => statsFields.append({ icon: 'TrendingUp', value: '0', label: 'New Stat', color: 'from-blue-500 to-blue-700' })}
								className='w-full'
							>
								<Plus className='w-4 h-4 mr-2' />
								Add Stat
							</Button>

							{statsFields.fields.map((field, index) => (
								<div key={field.id} className='p-4 border rounded-lg space-y-4 bg-slate-50'>
									<div className='flex items-center justify-between'>
										<span className='font-semibold text-sm'>Stat {index + 1}</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => statsFields.remove(index)}
										>
											<Trash2 className='w-4 h-4 text-red-500' />
										</Button>
									</div>

									<FormField
										control={form.control}
										name={`stats.${index}.icon`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
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
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`stats.${index}.label`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Label</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`stats.${index}.color`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Color</FormLabel>
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
																	<div className={`w-16 h-4 rounded bg-gradient-to-r ${color}`} />
																	<span className='text-xs'>{color}</span>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Benefits Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('benefits')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<h3 className='text-lg font-semibold text-slate-900'>
							Benefits Section <span className='text-sm text-slate-500'>({benefitsFields.fields.length} benefits)</span>
						</h3>
						{expandedSections.benefits ? (
							<ChevronUp className='w-5 h-5 text-slate-500' />
						) : (
							<ChevronDown className='w-5 h-5 text-slate-500' />
						)}
					</button>
					
					{expandedSections.benefits && (
						<div className='p-4 space-y-4 border-t'>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => benefitsFields.append({ icon: 'Award', title: 'New Benefit', description: 'Description', color: 'blue' })}
								className='w-full'
							>
								<Plus className='w-4 h-4 mr-2' />
								Add Benefit
							</Button>

							{benefitsFields.fields.map((field, index) => (
								<div key={field.id} className='p-4 border rounded-lg space-y-4 bg-slate-50'>
									<div className='flex items-center justify-between'>
										<span className='font-semibold text-sm'>Benefit {index + 1}</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => benefitsFields.remove(index)}
										>
											<Trash2 className='w-4 h-4 text-red-500' />
										</Button>
									</div>

									<FormField
										control={form.control}
										name={`benefits.${index}.icon`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
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
										name={`benefits.${index}.title`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`benefits.${index}.description`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea {...field} rows={2} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`benefits.${index}.color`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Color</FormLabel>
												<Select onValueChange={field.onChange} value={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{BENEFIT_COLOR_OPTIONS.map(color => (
															<SelectItem key={color} value={color}>
																{color}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Filters Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('filters')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<h3 className='text-lg font-semibold text-slate-900'>
							Filters <span className='text-sm text-slate-500'>({filtersFields.fields.length} filters)</span>
						</h3>
						{expandedSections.filters ? (
							<ChevronUp className='w-5 h-5 text-slate-500' />
						) : (
							<ChevronDown className='w-5 h-5 text-slate-500' />
						)}
					</button>
					
					{expandedSections.filters && (
						<div className='p-4 space-y-4 border-t'>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => filtersFields.append({ name: 'New Filter' })}
								className='w-full'
							>
								<Plus className='w-4 h-4 mr-2' />
								Add Filter
							</Button>

							<div className='grid grid-cols-2 gap-4'>
								{filtersFields.fields.map((field, index) => (
									<div key={field.id} className='flex items-center gap-2'>
										<FormField
											control={form.control}
											name={`filters.${index}.name`}
											render={({ field }) => (
												<FormItem className='flex-1'>
													<FormControl>
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => filtersFields.remove(index)}
										>
											<Trash2 className='w-4 h-4 text-red-500' />
										</Button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Opportunities Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('opportunities')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<h3 className='text-lg font-semibold text-slate-900'>
							Internship Opportunities <span className='text-sm text-slate-500'>({opportunitiesFields.fields.length} opportunities)</span>
						</h3>
						{expandedSections.opportunities ? (
							<ChevronUp className='w-5 h-5 text-slate-500' />
						) : (
							<ChevronDown className='w-5 h-5 text-slate-500' />
						)}
					</button>
					
					{expandedSections.opportunities && (
						<div className='p-4 space-y-4 border-t'>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => opportunitiesFields.append({
									company: 'New Company',
									title: 'Internship Title',
									type: 'Summer Internship',
									location: 'Location',
									description: 'Description',
									logo: '/internships/logo.png',
									category: 'Technology',
									domains: [],
									domainsArray: []
								})}
								className='w-full'
							>
								<Plus className='w-4 h-4 mr-2' />
								Add Opportunity
							</Button>

							{opportunitiesFields.fields.map((field, index) => (
								<div key={field.id} className='p-4 border rounded-lg space-y-4 bg-slate-50'>
									<div className='flex items-center justify-between'>
										<span className='font-semibold text-sm'>Opportunity {index + 1}</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => opportunitiesFields.remove(index)}
										>
											<Trash2 className='w-4 h-4 text-red-500' />
										</Button>
									</div>

									<div className='grid grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name={`opportunities.${index}.company`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Company Name</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`opportunities.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`opportunities.${index}.type`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Type</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{INTERNSHIP_TYPE_OPTIONS.map(type => (
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
											name={`opportunities.${index}.category`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Category</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{CATEGORY_OPTIONS.map(category => (
																<SelectItem key={category} value={category}>
																	{category}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`opportunities.${index}.location`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Location</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`opportunities.${index}.logo`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Logo Path</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name={`opportunities.${index}.description`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea {...field} rows={2} />
												</FormControl>
											</FormItem>
										)}
									/>

									{/* Domains Array */}
									<div className='border-t pt-4'>
										<div className='flex items-center justify-between mb-3'>
											<FormLabel>Focus Areas / Domains</FormLabel>
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={() => {
													const currentDomains = form.getValues(`opportunities.${index}.domainsArray`) || [];
													form.setValue(`opportunities.${index}.domainsArray`, [...currentDomains, { name: 'New Domain' }]);
												}}
											>
												<Plus className='w-3 h-3 mr-1' />
												Add Domain
											</Button>
										</div>
										<div className='grid grid-cols-2 gap-2'>
											{(form.watch(`opportunities.${index}.domainsArray`) || []).map((domain, domainIndex) => (
												<div key={domainIndex} className='flex items-center gap-2'>
													<FormField
														control={form.control}
														name={`opportunities.${index}.domainsArray.${domainIndex}.name`}
														render={({ field }) => (
															<FormItem className='flex-1'>
																<FormControl>
																	<Input {...field} placeholder='Domain name' />
																</FormControl>
															</FormItem>
														)}
													/>
													<Button
														type='button'
														variant='ghost'
														size='sm'
														onClick={() => {
															const currentDomains = form.getValues(`opportunities.${index}.domainsArray`);
															form.setValue(
																`opportunities.${index}.domainsArray`,
																currentDomains.filter((_, idx) => idx !== domainIndex)
															);
														}}
													>
														<Trash2 className='w-3 h-3 text-red-500' />
													</Button>
												</div>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Process Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('process')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<h3 className='text-lg font-semibold text-slate-900'>
							Process Steps <span className='text-sm text-slate-500'>({processFields.fields.length} steps)</span>
						</h3>
						{expandedSections.process ? (
							<ChevronUp className='w-5 h-5 text-slate-500' />
						) : (
							<ChevronDown className='w-5 h-5 text-slate-500' />
						)}
					</button>
					
					{expandedSections.process && (
						<div className='p-4 space-y-4 border-t'>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => processFields.append({ title: 'New Step', description: 'Description', icon: 'Users' })}
								className='w-full'
							>
								<Plus className='w-4 h-4 mr-2' />
								Add Step
							</Button>

							{processFields.fields.map((field, index) => (
								<div key={field.id} className='p-4 border rounded-lg space-y-4 bg-slate-50'>
									<div className='flex items-center justify-between'>
										<span className='font-semibold text-sm'>Step {index + 1}</span>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => processFields.remove(index)}
										>
											<Trash2 className='w-4 h-4 text-red-500' />
										</Button>
									</div>

									<FormField
										control={form.control}
										name={`process.${index}.icon`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
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
										name={`process.${index}.title`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`process.${index}.description`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea {...field} rows={2} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Contact Section */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('contact')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<h3 className='text-lg font-semibold text-slate-900'>Contact Section</h3>
						{expandedSections.contact ? (
							<ChevronUp className='w-5 h-5 text-slate-500' />
						) : (
							<ChevronDown className='w-5 h-5 text-slate-500' />
						)}
					</button>
					
					{expandedSections.contact && (
						<div className='p-4 space-y-4 border-t'>
							<FormField
								control={form.control}
								name='contact.title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='contact.subtitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Subtitle</FormLabel>
										<FormControl>
											<Textarea {...field} rows={2} />
										</FormControl>
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='contact.phone'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='contact.email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='contact.gradient'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gradient</FormLabel>
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
															<div className={`w-16 h-4 rounded bg-gradient-to-r ${gradient}`} />
															<span className='text-xs'>{gradient}</span>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							{/* Contact Buttons */}
							<div className='border-t pt-4'>
								<div className='flex items-center justify-between mb-3'>
									<FormLabel>Action Buttons</FormLabel>
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() => contactButtonsFields.append({ text: 'New Button', icon: 'BookOpen', variant: 'primary' })}
									>
										<Plus className='w-3 h-3 mr-1' />
										Add Button
									</Button>
								</div>

								{contactButtonsFields.fields.map((field, index) => (
									<div key={field.id} className='p-3 border rounded-lg space-y-3 bg-white mb-3'>
										<div className='flex items-center justify-between'>
											<span className='text-sm font-semibold'>Button {index + 1}</span>
											<Button
												type='button'
												variant='ghost'
												size='sm'
												onClick={() => contactButtonsFields.remove(index)}
											>
												<Trash2 className='w-3 h-3 text-red-500' />
											</Button>
										</div>

										<FormField
											control={form.control}
											name={`contact.buttons.${index}.text`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Text</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`contact.buttons.${index}.icon`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
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
											name={`contact.buttons.${index}.variant`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Variant</FormLabel>
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
								))}
							</div>
						</div>
					)}
				</div>
			</form>
		</Form>
	);
}
