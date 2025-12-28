'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type {
	PlacementStatisticsData,
	YearStats,
	DepartmentStat,
	PackageDistribution,
	SectorWiseData,
	YearlyTrend,
	StudentPlacement
} from '@/app/(Private Pages)/actions/placement-statistics';
import { updatePlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import { Button } from '@/components/ui/button';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import UploadButton from '@/components/cloudinary/upload-button';

interface PlacementStatisticsFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange?: (data: PlacementStatisticsData) => void;
}

// Form value types
interface HeroFormValue {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
}

interface YearStatsFormValue {
	year: string;
	placementRate: number;
	totalStudents: number;
	studentsPlaced: number;
	companiesVisited: number;
	highestPackage: number;
	averagePackage: number;
	medianPackage: number;
}

interface DepartmentStatFormValue {
	department: string;
	year: string;
	placed: number;
	total: number;
	avgPackage: number;
	highest: number;
	companies: number;
}

interface PackageDistFormValue {
	range: string;
	count: number;
	percentage: number;
}

interface SectorFormValue {
	sector: string;
	percentage: number;
	companies: string;
	color: string;
}

interface TrendFormValue {
	year: string;
	rate: number;
	avg: number;
	companies: number;
}

interface StudentFormValue {
	name: string;
	department: string;
	company: string;
	package: number;
	batch: string;
	role: string;
	image?: string;
}

interface FormValues {
	hero: HeroFormValue;
	years: string;
	departments: string;
	overallStats: YearStatsFormValue[];
	departmentStats: DepartmentStatFormValue[];
	packageDistribution: PackageDistFormValue[];
	sectorWiseData: SectorFormValue[];
	yearlyTrends: TrendFormValue[];
	studentPlacements: StudentFormValue[];
}

const GRADIENT_OPTIONS = [
	'from-blue-900 via-blue-800 to-blue-900',
	'from-purple-900 via-purple-800 to-purple-900',
	'from-green-900 via-green-800 to-green-900',
	'from-red-900 via-red-800 to-red-900',
	'from-indigo-900 via-indigo-800 to-indigo-900',
	'from-cyan-900 via-cyan-800 to-cyan-900'
];

const COLOR_OPTIONS = [
	'from-blue-500 to-cyan-600',
	'from-green-500 to-emerald-600',
	'from-purple-500 to-violet-600',
	'from-orange-500 to-red-600',
	'from-pink-500 to-rose-600',
	'from-yellow-500 to-orange-600',
	'from-indigo-500 to-blue-600',
	'from-teal-500 to-cyan-600'
];

const DEPARTMENT_OPTIONS = ['CSE', 'IT', 'ECE', 'EEE', 'MBA', 'ME', 'CE'];

function createUpdatedData(
	currentData: PlacementStatisticsData,
	formValues: Partial<FormValues>
): PlacementStatisticsData {
	// Parse years and departments from comma-separated strings
	const years = formValues.years
		? formValues.years
				.split(',')
				.map(y => y.trim())
				.filter(Boolean)
		: currentData.years;

	const departments = formValues.departments
		? formValues.departments
				.split(',')
				.map(d => d.trim())
				.filter(Boolean)
		: currentData.departments;

	// Convert overall stats array to Record
	const overallStats: Record<string, YearStats> = {};
	(formValues.overallStats || []).forEach(stat => {
		if (stat.year) {
			overallStats[stat.year] = {
				placementRate: stat.placementRate,
				totalStudents: stat.totalStudents,
				studentsPlaced: stat.studentsPlaced,
				companiesVisited: stat.companiesVisited,
				highestPackage: stat.highestPackage,
				averagePackage: stat.averagePackage,
				medianPackage: stat.medianPackage
			};
		}
	});

	// Convert department stats array to nested Record
	const departmentStats: Record<string, Record<string, DepartmentStat>> = {};
	(formValues.departmentStats || []).forEach(stat => {
		if (stat.year && stat.department) {
			if (!departmentStats[stat.year]) {
				departmentStats[stat.year] = {};
			}
			departmentStats[stat.year][stat.department] = {
				placed: stat.placed,
				total: stat.total,
				avgPackage: stat.avgPackage,
				highest: stat.highest,
				companies: stat.companies
			};
		}
	});

	// Convert sector form values
	const sectorWiseData: SectorWiseData[] = (
		formValues.sectorWiseData || []
	).map(sector => ({
		sector: sector.sector,
		percentage: sector.percentage,
		companies: sector.companies.split(',').map(c => c.trim()),
		color: sector.color
	}));

	return {
		hero: formValues.hero || currentData.hero,
		years,
		departments,
		overallStats:
			Object.keys(overallStats).length > 0
				? overallStats
				: currentData.overallStats,
		departmentStats:
			Object.keys(departmentStats).length > 0
				? departmentStats
				: currentData.departmentStats,
		packageDistribution:
			formValues.packageDistribution || currentData.packageDistribution,
		sectorWiseData:
			sectorWiseData.length > 0 ? sectorWiseData : currentData.sectorWiseData,
		yearlyTrends: formValues.yearlyTrends || currentData.yearlyTrends,
		studentPlacements:
			formValues.studentPlacements || currentData.studentPlacements
	};
}

export default function PlacementStatisticsForm({
	initialData,
	pageSlug,
	onChange
}: PlacementStatisticsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string>('');
	const [currentData, setCurrentData] =
		useState<PlacementStatisticsData>(initialData);
	
	// Collapsible sections state
	const [expandedSections, setExpandedSections] = useState({
		hero: true,
		config: true,
		overallStats: false,
		departmentStats: false,
		packageDist: false,
		sectors: false,
		trends: false,
		students: false
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
	};

	// Convert initial data to form format
	const overallStatsArray: YearStatsFormValue[] = [];
	if (initialData.overallStats) {
		Object.entries(initialData.overallStats).forEach(([year, stats]) => {
			overallStatsArray.push({
				year,
				...stats
			});
		});
	}

	const departmentStatsArray: DepartmentStatFormValue[] = [];
	if (initialData.departmentStats) {
		Object.entries(initialData.departmentStats).forEach(([year, depts]) => {
			Object.entries(depts).forEach(([dept, stats]) => {
				departmentStatsArray.push({
					year,
					department: dept,
					...stats
				});
			});
		});
	}

	const sectorFormArray: SectorFormValue[] = (
		initialData.sectorWiseData || []
	).map(sector => ({
		...sector,
		companies: sector.companies.join(', ')
	}));

	const form = useForm<FormValues>({
		defaultValues: {
			hero: {
				icon: initialData.hero?.icon || 'BarChart3',
				title: initialData.hero?.title || 'Placement Statistics',
				subtitle:
					initialData.hero?.subtitle ||
					'Data-driven insights into our placement success',
				gradient:
					initialData.hero?.gradient || 'from-blue-900 via-blue-800 to-blue-900'
			},
			years: (initialData.years || []).join(', '),
			departments: (initialData.departments || []).join(', '),
			overallStats: overallStatsArray,
			departmentStats: departmentStatsArray,
			packageDistribution: initialData.packageDistribution || [],
			sectorWiseData: sectorFormArray,
			yearlyTrends: initialData.yearlyTrends || [],
			studentPlacements: initialData.studentPlacements || []
		}
	});

	const overallStatsFields = useFieldArray({
		control: form.control,
		name: 'overallStats'
	});

	const departmentStatsFields = useFieldArray({
		control: form.control,
		name: 'departmentStats'
	});

	const packageDistFields = useFieldArray({
		control: form.control,
		name: 'packageDistribution'
	});

	const sectorFields = useFieldArray({
		control: form.control,
		name: 'sectorWiseData'
	});

	const trendsFields = useFieldArray({
		control: form.control,
		name: 'yearlyTrends'
	});

	const studentsFields = useFieldArray({
		control: form.control,
		name: 'studentPlacements'
	});

	useEffect(() => {
		const updatedData = createUpdatedData(currentData, form.getValues());
		onChange?.(updatedData);
		const subscription = form.watch(values => {
			const formValues = {
				...values,
				overallStats: values.overallStats?.filter(Boolean),
				departmentStats: values.departmentStats?.filter(Boolean),
				packageDistribution: values.packageDistribution?.filter(Boolean),
				sectorWiseData: values.sectorWiseData?.filter(Boolean),
				yearlyTrends: values.yearlyTrends?.filter(Boolean),
				studentPlacements: values.studentPlacements?.filter(Boolean)
			} as Partial<FormValues>;
			const updatedData = createUpdatedData(currentData, formValues);
			onChange?.(updatedData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange, currentData]);

	const handleSubmit = (values: FormValues) => {
		setMessage('');
		const payload = createUpdatedData(currentData, values);
		startTransition(async () => {
			try {
				await updatePlacementStatistics(payload);
				setCurrentData(payload);
				setMessage('Saved');
			} catch (error) {
				console.error('Save error:', error);
				setMessage('Save failed');
			}
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Edit Placement Statistics
						</h3>
						<p className='text-sm text-slate-600'>
							Manage all placement metrics and student data
						</p>
					</div>
					<div className='flex gap-2'>
						{message && (
							<span
								className={`text-sm ${message === 'Saved' ? 'text-green-600' : 'text-red-600'}`}>
								{message}
							</span>
						)}
						<Button
							type='submit'
							disabled={isPending}
							className='bg-blue-600 hover:bg-blue-700 text-white'>
							{isPending ? 'Saving...' : 'Save Changes'}
						</Button>
					</div>
				</div>

				{/* Hero Section */}
				<div className='space-y-4 border-t pt-4'>
					<h4 className='font-semibold text-slate-900'>Hero Section</h4>

					<FormField
						control={form.control}
						name='hero.icon'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Icon</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
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
								<FormMessage />
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
								<FormMessage />
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
									<Textarea {...field} />
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
								<FormLabel>Gradient</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{GRADIENT_OPTIONS.map(gradient => (
											<SelectItem key={gradient} value={gradient}>
												{gradient}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Configuration */}
				<div className='space-y-4 border-t pt-4'>
					<h4 className='font-semibold text-slate-900'>Configuration</h4>

					<FormField
						control={form.control}
						name='years'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Academic Years (comma-separated)</FormLabel>
								<FormControl>
									<Input {...field} placeholder='2024, 2023, 2022' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='departments'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Departments (comma-separated)</FormLabel>
								<FormControl>
									<Input {...field} placeholder='All, CSE, IT, ECE, EEE, MBA' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Overall Stats */}
				<div className='space-y-4 border-t pt-4'>
					<div className='flex items-center justify-between'>
						<h4 className='font-semibold text-slate-900'>Overall Statistics</h4>
						<Button
							type='button'
							size='sm'
							variant='outline'
							onClick={() =>
								overallStatsFields.append({
									year: '2024',
									placementRate: 0,
									totalStudents: 0,
									studentsPlaced: 0,
									companiesVisited: 0,
									highestPackage: 0,
									averagePackage: 0,
									medianPackage: 0
								})
							}>
							<Plus className='w-4 h-4 mr-1' />
							Add Year Stats
						</Button>
					</div>

					{overallStatsFields.fields.map((field, index) => (
						<div
							key={field.id}
							className='p-4 border rounded-lg space-y-3 bg-slate-50'>
							<div className='flex justify-between items-center'>
								<h5 className='font-medium text-sm'>
									Year Stats #{index + 1}
								</h5>
								<Button
									type='button'
									size='sm'
									variant='ghost'
									onClick={() => overallStatsFields.remove(index)}>
									<Trash2 className='w-4 h-4 text-red-600' />
								</Button>
							</div>

							<div className='grid grid-cols-2 gap-3'>
								<FormField
									control={form.control}
									name={`overallStats.${index}.year`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>Year</FormLabel>
											<FormControl>
												<Input {...field} placeholder='2024' />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`overallStats.${index}.placementRate`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>
												Placement Rate (%)
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													onChange={e =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`overallStats.${index}.totalStudents`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>Total Students</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													onChange={e =>
														field.onChange(parseInt(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`overallStats.${index}.studentsPlaced`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>
												Students Placed
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													onChange={e =>
														field.onChange(parseInt(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`overallStats.${index}.companiesVisited`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>
												Companies Visited
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													onChange={e =>
														field.onChange(parseInt(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`overallStats.${index}.highestPackage`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>
												Highest Package (LPA)
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													step='0.1'
													onChange={e =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`overallStats.${index}.averagePackage`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>
												Average Package (LPA)
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													step='0.1'
													onChange={e =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`overallStats.${index}.medianPackage`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>
												Median Package (LPA)
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													step='0.1'
													onChange={e =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>
					))}
				</div>

				{/* Department Stats */}
				<div className='space-y-4 border-t pt-4'>
					<div className='flex items-center justify-between'>
						<h4 className='font-semibold text-slate-900'>
							Department Statistics
						</h4>
						<Button
							type='button'
							size='sm'
							variant='outline'
							onClick={() =>
								departmentStatsFields.append({
									year: '2024',
									department: 'CSE',
									placed: 0,
									total: 0,
									avgPackage: 0,
									highest: 0,
									companies: 0
								})
							}>
							<Plus className='w-4 h-4 mr-1' />
							Add Department
						</Button>
					</div>

					{departmentStatsFields.fields.map((field, index) => (
						<div
							key={field.id}
							className='p-4 border rounded-lg space-y-3 bg-slate-50'>
							<div className='flex justify-between items-center'>
								<h5 className='font-medium text-sm'>
									Department #{index + 1}
								</h5>
								<Button
									type='button'
									size='sm'
									variant='ghost'
									onClick={() => departmentStatsFields.remove(index)}>
									<Trash2 className='w-4 h-4 text-red-600' />
								</Button>
							</div>

							<div className='grid grid-cols-2 gap-3'>
								<FormField
									control={form.control}
									name={`departmentStats.${index}.year`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>Year</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departmentStats.${index}.department`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>Department</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{DEPARTMENT_OPTIONS.map(dept => (
														<SelectItem key={dept} value={dept}>
															{dept}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departmentStats.${index}.placed`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>Placed</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													onChange={e =>
														field.onChange(parseInt(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departmentStats.${index}.total`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>Total</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													onChange={e =>
														field.onChange(parseInt(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departmentStats.${index}.avgPackage`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>Avg Package</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													step='0.1'
													onChange={e =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departmentStats.${index}.highest`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>
												Highest Package
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													step='0.1'
													onChange={e =>
														field.onChange(parseFloat(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`departmentStats.${index}.companies`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs'>Companies</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													onChange={e =>
														field.onChange(parseInt(e.target.value))
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>
					))}
				</div>

				{/* Package Distribution */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('packageDist')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<div className='flex items-center gap-2'>
							<h4 className='font-semibold text-slate-900'>
								Package Distribution
							</h4>
							<span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full'>
								{packageDistFields.fields.length} ranges
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Button
								type='button'
								size='sm'
								variant='outline'
								onClick={(e) => {
									e.stopPropagation();
									packageDistFields.append({
										range: '₹0-5 LPA',
										count: 0,
										percentage: 0
									});
								}}>
								<Plus className='w-4 h-4' />
							</Button>
							{expandedSections.packageDist ? (
								<ChevronUp className='w-5 h-5 text-slate-500' />
							) : (
								<ChevronDown className='w-5 h-5 text-slate-500' />
							)}
						</div>
					</button>
					{expandedSections.packageDist && (
						<div className='p-4 pt-0 space-y-4'>
							{packageDistFields.fields.map((field, index) => (
								<div
									key={field.id}
									className='p-4 border rounded-lg space-y-3 bg-slate-50'>
									<div className='flex justify-between items-center'>
										<h5 className='font-medium text-sm'>Range #{index + 1}</h5>
										<Button
											type='button'
											size='sm'
											variant='ghost'
											onClick={() => packageDistFields.remove(index)}>
											<Trash2 className='w-4 h-4 text-red-600' />
										</Button>
									</div>

									<div className='grid grid-cols-3 gap-3'>
										<FormField
											control={form.control}
											name={`packageDistribution.${index}.range`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Range</FormLabel>
													<FormControl>
														<Input {...field} placeholder='₹5-7 LPA' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`packageDistribution.${index}.count`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Count</FormLabel>
													<FormControl>
														<Input
															{...field}
															type='number'
															onChange={e =>
																field.onChange(parseInt(e.target.value) || 0)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`packageDistribution.${index}.percentage`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Percentage</FormLabel>
													<FormControl>
														<Input
															{...field}
															type='number'
															step='0.1'
															onChange={e =>
																field.onChange(parseFloat(e.target.value) || 0)
															}
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

				{/* Sector-wise Data */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('sectors')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<div className='flex items-center gap-2'>
							<h4 className='font-semibold text-slate-900'>Sector-wise Data</h4>
							<span className='text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full'>
								{sectorFields.fields.length} sectors
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Button
								type='button'
								size='sm'
								variant='outline'
								onClick={(e) => {
									e.stopPropagation();
									sectorFields.append({
										sector: 'IT Services',
										percentage: 0,
										companies: '',
										color: 'from-blue-500 to-cyan-600'
									});
								}}>
								<Plus className='w-4 h-4' />
							</Button>
							{expandedSections.sectors ? (
								<ChevronUp className='w-5 h-5 text-slate-500' />
							) : (
								<ChevronDown className='w-5 h-5 text-slate-500' />
							)}
						</div>
					</button>
					{expandedSections.sectors && (
						<div className='p-4 pt-0 space-y-4'>
							{sectorFields.fields.map((field, index) => (
								<div
									key={field.id}
									className='p-4 border rounded-lg space-y-3 bg-slate-50'>
									<div className='flex justify-between items-center'>
										<h5 className='font-medium text-sm'>Sector #{index + 1}</h5>
										<Button
											type='button'
											size='sm'
											variant='ghost'
											onClick={() => sectorFields.remove(index)}>
											<Trash2 className='w-4 h-4 text-red-600' />
										</Button>
									</div>

									<div className='grid grid-cols-2 gap-3'>
										<FormField
											control={form.control}
											name={`sectorWiseData.${index}.sector`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Sector Name</FormLabel>
													<FormControl>
														<Input {...field} placeholder='IT Services' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`sectorWiseData.${index}.percentage`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Percentage</FormLabel>
													<FormControl>
														<Input
															{...field}
															type='number'
															step='0.1'
															onChange={e =>
																field.onChange(parseFloat(e.target.value) || 0)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`sectorWiseData.${index}.companies`}
											render={({ field }) => (
												<FormItem className='col-span-2'>
													<FormLabel className='text-xs'>
														Companies (comma-separated)
													</FormLabel>
													<FormControl>
														<Input {...field} placeholder='TCS, Infosys, Wipro' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`sectorWiseData.${index}.color`}
											render={({ field }) => (
												<FormItem className='col-span-2'>
													<FormLabel className='text-xs'>Color Gradient</FormLabel>
													<Select
														onValueChange={field.onChange}
														value={field.value}>
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
								</div>
							))}
						</div>
					)}
				</div>

				{/* Yearly Trends */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('trends')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<div className='flex items-center gap-2'>
							<h4 className='font-semibold text-slate-900'>Yearly Trends</h4>
							<span className='text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full'>
								{trendsFields.fields.length} years
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Button
								type='button'
								size='sm'
								variant='outline'
								onClick={(e) => {
									e.stopPropagation();
									trendsFields.append({
										year: '2024',
										rate: 0,
										avg: 0,
										companies: 0
									});
								}}>
								<Plus className='w-4 h-4' />
							</Button>
							{expandedSections.trends ? (
								<ChevronUp className='w-5 h-5 text-slate-500' />
							) : (
								<ChevronDown className='w-5 h-5 text-slate-500' />
							)}
						</div>
					</button>
					{expandedSections.trends && (
						<div className='p-4 pt-0 space-y-4'>
							{trendsFields.fields.map((field, index) => (
								<div
									key={field.id}
									className='p-4 border rounded-lg space-y-3 bg-slate-50'>
									<div className='flex justify-between items-center'>
										<h5 className='font-medium text-sm'>Year #{index + 1}</h5>
										<Button
											type='button'
											size='sm'
											variant='ghost'
											onClick={() => trendsFields.remove(index)}>
											<Trash2 className='w-4 h-4 text-red-600' />
										</Button>
									</div>

									<div className='grid grid-cols-2 gap-3'>
										<FormField
											control={form.control}
											name={`yearlyTrends.${index}.year`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Year</FormLabel>
													<FormControl>
														<Input {...field} placeholder='2024' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`yearlyTrends.${index}.rate`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>
														Placement Rate (%)
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															type='number'
															step='0.1'
															onChange={e =>
																field.onChange(parseFloat(e.target.value) || 0)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`yearlyTrends.${index}.avg`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>
														Avg Package (LPA)
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															type='number'
															step='0.1'
															onChange={e =>
																field.onChange(parseFloat(e.target.value) || 0)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`yearlyTrends.${index}.companies`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>
														Companies Visited
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															type='number'
															onChange={e =>
																field.onChange(parseInt(e.target.value) || 0)
															}
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

				{/* Student Placements */}
				<div className='border rounded-lg'>
					<button
						type='button'
						onClick={() => toggleSection('students')}
						className='w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors'>
						<div className='flex items-center gap-2'>
							<h4 className='font-semibold text-slate-900'>
								Student Placements
							</h4>
							<span className='text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full'>
								{studentsFields.fields.length} students
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<Button
								type='button'
								size='sm'
								variant='outline'
								onClick={(e) => {
									e.stopPropagation();
									studentsFields.append({
										name: '',
										department: 'CSE',
										company: '',
										package: 0,
										batch: '2024',
										role: ''
									});
								}}>
								<Plus className='w-4 h-4' />
							</Button>
							{expandedSections.students ? (
								<ChevronUp className='w-5 h-5 text-slate-500' />
							) : (
								<ChevronDown className='w-5 h-5 text-slate-500' />
							)}
						</div>
					</button>
					{expandedSections.students && (
						<div className='p-4 pt-0 space-y-4'>
							{studentsFields.fields.map((field, index) => (
								<div
									key={field.id}
									className='p-4 border rounded-lg space-y-3 bg-slate-50'>
									<div className='flex justify-between items-center'>
										<h5 className='font-medium text-sm'>Student #{index + 1}</h5>
										<Button
											type='button'
											size='sm'
											variant='ghost'
											onClick={() => studentsFields.remove(index)}>
											<Trash2 className='w-4 h-4 text-red-600' />
										</Button>
									</div>

									<div className='grid grid-cols-2 gap-3'>
										<FormField
											control={form.control}
											name={`studentPlacements.${index}.name`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Name</FormLabel>
													<FormControl>
														<Input {...field} placeholder='Student Name' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`studentPlacements.${index}.department`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Department</FormLabel>
													<Select
														onValueChange={field.onChange}
														value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{DEPARTMENT_OPTIONS.map(dept => (
																<SelectItem key={dept} value={dept}>
																	{dept}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`studentPlacements.${index}.company`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Company</FormLabel>
													<FormControl>
														<Input {...field} placeholder='Company Name' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`studentPlacements.${index}.package`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Package (LPA)</FormLabel>
													<FormControl>
														<Input
															{...field}
															type='number'
															step='0.1'
															onChange={e =>
																field.onChange(parseFloat(e.target.value) || 0)
															}
														/>
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`studentPlacements.${index}.batch`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Batch</FormLabel>
													<FormControl>
														<Input {...field} placeholder='2024' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`studentPlacements.${index}.role`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-xs'>Role</FormLabel>
													<FormControl>
														<Input {...field} placeholder='Software Engineer' />
													</FormControl>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`studentPlacements.${index}.image`}
											render={({ field }) => (
												<FormItem className='col-span-2'>
													<FormLabel className='text-xs'>Student Image</FormLabel>
													<FormControl>
														<div className='space-y-2'>
															<Input {...field} placeholder='Image URL (optional)' />
															<UploadButton
																onUpload={(url) => field.onChange(url)}
																buttonText='Upload Student Image'
																className='w-full'
															/>
															{field.value ? (
																<div className='mt-2'>
																	<img
																		src={field.value}
																		alt='Student preview'
																		className='w-20 h-20 rounded-full object-cover border-2 border-blue-200'
																	/>
																</div>
															) : (
																<p className='text-sm text-gray-500'>Initials avatar will be shown if no image uploaded</p>
															)}
														</div>
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

				{/* Submit Button at Bottom */}
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
