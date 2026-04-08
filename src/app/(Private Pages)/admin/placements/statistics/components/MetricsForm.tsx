'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Calendar, Target, Users, Building2, DollarSign, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { updatePlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import type { PlacementStatisticsData, YearStats, PackageDistribution } from '@/app/(Private Pages)/actions/placement-statistics';

interface MetricsFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange?: (data: PlacementStatisticsData) => void;
}

interface YearStatsForm {
	year: string;
	placementRate: number;
	totalStudents: number;
	studentsPlaced: number;
	companiesVisited: number;
	highestPackage: number;
	averagePackage: number;
	medianPackage: number;
}

interface FormValues {
	years: string[];
	yearStats: YearStatsForm[];
	packageDistribution: PackageDistribution[];
}

export default function MetricsForm({ initialData, pageSlug, onChange }: MetricsFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	// Convert overallStats object to array for form
	const yearStatsArray: YearStatsForm[] = Object.entries(initialData.overallStats || {}).map(
		([year, stats]) => ({
			year,
			...stats
		})
	);

	const form = useForm<FormValues>({
		defaultValues: {
			years: initialData.years || ['2024', '2023', '2022'],
			yearStats: yearStatsArray.length > 0 ? yearStatsArray : [],
			packageDistribution: initialData.packageDistribution || []
		}
	});

	const { fields: yearFields, append: appendYear, remove: removeYear } = useFieldArray({
		control: form.control,
		name: 'yearStats'
	});

	const { fields: pkgFields, append: appendPkg, remove: removePkg } = useFieldArray({
		control: form.control,
		name: 'packageDistribution'
	});

	// Live preview effect
	useEffect(() => {
		const subscription = form.watch(values => {
			if (onChange) {
				// Convert yearStats array back to overallStats object
				const overallStats: Record<string, YearStats> = {};
				(values.yearStats || []).forEach(stat => {
					if (stat && stat.year) {
						overallStats[stat.year] = {
							placementRate: stat.placementRate || 0,
							totalStudents: stat.totalStudents || 0,
							studentsPlaced: stat.studentsPlaced || 0,
							companiesVisited: stat.companiesVisited || 0,
							highestPackage: stat.highestPackage || 0,
							averagePackage: stat.averagePackage || 0,
							medianPackage: stat.medianPackage || 0
						};
					}
				});

				const updatedData: PlacementStatisticsData = {
					...initialData,
					years: (values.years || []).filter((y): y is string => !!y),
					overallStats,
					packageDistribution: (values.packageDistribution || []).filter((p): p is PackageDistribution => 
						p !== undefined && !!p.range && p.count !== undefined && p.percentage !== undefined
					)
				};
				onChange(updatedData);
			}
		});

		return () => subscription.unsubscribe();
	}, [form, onChange, initialData]);

	const onSubmit = async (data: FormValues) => {
		try {
			setSaveStatus('saving');

			// Convert yearStats array to overallStats object
			const overallStats: Record<string, YearStats> = {};
			(data.yearStats || []).forEach(stat => {
				if (stat && stat.year) {
					overallStats[stat.year] = {
						placementRate: stat.placementRate || 0,
						totalStudents: stat.totalStudents || 0,
						studentsPlaced: stat.studentsPlaced || 0,
						companiesVisited: stat.companiesVisited || 0,
						highestPackage: stat.highestPackage || 0,
						averagePackage: stat.averagePackage || 0,
						medianPackage: stat.medianPackage || 0
					};
				}
			});

			const updatedData: PlacementStatisticsData = {
				...initialData,
				years: (data.years || []).filter((y): y is string => !!y),
				overallStats,
				packageDistribution: (data.packageDistribution || []).filter((p): p is PackageDistribution => 
					p !== undefined && !!p.range && p.count !== undefined && p.percentage !== undefined
				)
			};

			await updatePlacementStatistics(updatedData);

			setSaveStatus('saved');
			setTimeout(() => setSaveStatus('idle'), 2000);
		} catch (error) {
			console.error('Failed to save metrics:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	const addYearStats = () => {
		const newYear = `20${24 - yearFields.length}`;
		appendYear({
			year: newYear,
			placementRate: 0,
			totalStudents: 0,
			studentsPlaced: 0,
			companiesVisited: 0,
			highestPackage: 0,
			averagePackage: 0,
			medianPackage: 0
		});
	};

	const addPackageRange = () => {
		appendPkg({
			range: '0-5 LPA',
			count: 0,
			percentage: 0
		});
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
			{/* Year Statistics */}
			<div>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center gap-3'>
						<div className='p-2 bg-blue-100 rounded-lg'>
							<Calendar className='w-5 h-5 text-blue-600' />
						</div>
						<h3 className='text-xl font-bold text-gray-900'>Year-wise Statistics</h3>
					</div>
					<Button
						type='button'
						onClick={addYearStats}
						variant='outline'
						className='flex items-center gap-2 border-2 border-blue-300 text-blue-600 hover:bg-blue-50'>
						<Plus className='w-4 h-4' />
						Add Year
					</Button>
				</div>

				<div className='space-y-6 max-h-[50vh] overflow-y-auto pr-4'>
					{yearFields.map((field, index) => (
						<div
							key={field.id}
							className='p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 space-y-4'>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center gap-3'>
									<div className='w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg'>
										{form.watch(`yearStats.${index}.year`) || index + 1}
									</div>
									<span className='font-bold text-gray-800 text-lg'>
										Academic Year {form.watch(`yearStats.${index}.year`)}
									</span>
								</div>
								<Button
									type='button'
									onClick={() => removeYear(index)}
									variant='ghost'
									className='text-red-600 hover:text-red-700 hover:bg-red-50'>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{/* Year */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<Calendar className='w-4 h-4 text-blue-600' />
										Year
									</Label>
									<Input
										{...form.register(`yearStats.${index}.year`)}
										placeholder='2024'
										className='border-blue-300 focus:border-blue-500 bg-white'
									/>
								</div>

								{/* Placement Rate */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<Target className='w-4 h-4 text-green-600' />
										Placement Rate (%)
									</Label>
									<Input
										{...form.register(`yearStats.${index}.placementRate`, {
											valueAsNumber: true
										})}
										type='number'
										step='0.1'
										min='0'
										max='100'
										placeholder='85.5'
										className='border-green-300 focus:border-green-500 bg-white'
									/>
								</div>

								{/* Total Students */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<Users className='w-4 h-4 text-purple-600' />
										Total Students
									</Label>
									<Input
										{...form.register(`yearStats.${index}.totalStudents`, {
											valueAsNumber: true
										})}
										type='number'
										min='0'
										placeholder='500'
										className='border-purple-300 focus:border-purple-500 bg-white'
									/>
								</div>

								{/* Students Placed */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<TrendingUp className='w-4 h-4 text-blue-600' />
										Students Placed
									</Label>
									<Input
										{...form.register(`yearStats.${index}.studentsPlaced`, {
											valueAsNumber: true
										})}
										type='number'
										min='0'
										placeholder='425'
										className='border-blue-300 focus:border-blue-500 bg-white'
									/>
								</div>

								{/* Companies Visited */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<Building2 className='w-4 h-4 text-orange-600' />
										Companies Visited
									</Label>
									<Input
										{...form.register(`yearStats.${index}.companiesVisited`, {
											valueAsNumber: true
										})}
										type='number'
										min='0'
										placeholder='120'
										className='border-orange-300 focus:border-orange-500 bg-white'
									/>
								</div>

								{/* Highest Package */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<DollarSign className='w-4 h-4 text-green-600' />
										Highest Package (LPA)
									</Label>
									<Input
										{...form.register(`yearStats.${index}.highestPackage`, {
											valueAsNumber: true
										})}
										type='number'
										step='0.1'
										min='0'
										placeholder='45.0'
										className='border-green-300 focus:border-green-500 bg-white'
									/>
								</div>

								{/* Average Package */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<BarChart3 className='w-4 h-4 text-indigo-600' />
										Average Package (LPA)
									</Label>
									<Input
										{...form.register(`yearStats.${index}.averagePackage`, {
											valueAsNumber: true
										})}
										type='number'
										step='0.1'
										min='0'
										placeholder='8.5'
										className='border-indigo-300 focus:border-indigo-500 bg-white'
									/>
								</div>

								{/* Median Package */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<PieChart className='w-4 h-4 text-cyan-600' />
										Median Package (LPA)
									</Label>
									<Input
										{...form.register(`yearStats.${index}.medianPackage`, {
											valueAsNumber: true
										})}
										type='number'
										step='0.1'
										min='0'
										placeholder='7.0'
										className='border-cyan-300 focus:border-cyan-500 bg-white'
									/>
								</div>
							</div>

							{/* Quick Stats Preview */}
							<div className='mt-4 pt-4 border-t-2 border-blue-300'>
								<div className='grid grid-cols-4 gap-3'>
									<div className='text-center p-3 bg-white rounded-lg border border-blue-200'>
										<div className='text-2xl font-bold text-green-600'>
											{form.watch(`yearStats.${index}.placementRate`) || 0}%
										</div>
										<div className='text-xs text-gray-600 font-medium'>Rate</div>
									</div>
									<div className='text-center p-3 bg-white rounded-lg border border-blue-200'>
										<div className='text-2xl font-bold text-blue-600'>
											{form.watch(`yearStats.${index}.studentsPlaced`) || 0}
										</div>
										<div className='text-xs text-gray-600 font-medium'>Placed</div>
									</div>
									<div className='text-center p-3 bg-white rounded-lg border border-blue-200'>
										<div className='text-2xl font-bold text-orange-600'>
											{form.watch(`yearStats.${index}.companiesVisited`) || 0}
										</div>
										<div className='text-xs text-gray-600 font-medium'>
											Companies
										</div>
									</div>
									<div className='text-center p-3 bg-white rounded-lg border border-blue-200'>
										<div className='text-2xl font-bold text-purple-600'>
											₹{form.watch(`yearStats.${index}.highestPackage`) || 0}
										</div>
										<div className='text-xs text-gray-600 font-medium'>
											Highest
										</div>
									</div>
								</div>
							</div>
						</div>
					))}

					{yearFields.length === 0 && (
						<div className='text-center py-12 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-300'>
							<Calendar className='w-16 h-16 text-blue-400 mx-auto mb-4' />
							<p className='text-gray-600 mb-4'>No year statistics added yet</p>
							<Button
								type='button'
								onClick={addYearStats}
								variant='outline'
								className='border-2 border-blue-300 text-blue-600 hover:bg-blue-50'>
								<Plus className='w-4 h-4 mr-2' />
								Add First Year
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Package Distribution */}
			<div className='pt-8 border-t-2 border-gray-200'>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center gap-3'>
						<div className='p-2 bg-orange-100 rounded-lg'>
							<PieChart className='w-5 h-5 text-orange-600' />
						</div>
						<h3 className='text-xl font-bold text-gray-900'>Package Distribution</h3>
					</div>
					<Button
						type='button'
						onClick={addPackageRange}
						variant='outline'
						className='flex items-center gap-2 border-2 border-orange-300 text-orange-600 hover:bg-orange-50'>
						<Plus className='w-4 h-4' />
						Add Range
					</Button>
				</div>

				<div className='space-y-4 max-h-[40vh] overflow-y-auto pr-4'>
					{pkgFields.map((field, index) => (
						<div
							key={field.id}
							className='p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200'>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center gap-3'>
									<div className='w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center text-sm font-bold'>
										{index + 1}
									</div>
									<span className='font-semibold text-gray-700'>
										Range {index + 1}
									</span>
								</div>
								<Button
									type='button'
									onClick={() => removePkg(index)}
									variant='ghost'
									className='text-red-600 hover:text-red-700 hover:bg-red-50'>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div className='space-y-2'>
									<Label>Salary Range</Label>
									<Input
										{...form.register(`packageDistribution.${index}.range`)}
										placeholder='0-5 LPA'
										className='border-orange-300 focus:border-orange-500 bg-white'
									/>
								</div>
								<div className='space-y-2'>
									<Label>Student Count</Label>
									<Input
										{...form.register(`packageDistribution.${index}.count`, {
											valueAsNumber: true
										})}
										type='number'
										min='0'
										placeholder='50'
										className='border-orange-300 focus:border-orange-500 bg-white'
									/>
								</div>
								<div className='space-y-2'>
									<Label>Percentage (%)</Label>
									<Input
										{...form.register(`packageDistribution.${index}.percentage`, {
											valueAsNumber: true
										})}
										type='number'
										step='0.1'
										min='0'
										max='100'
										placeholder='25.0'
										className='border-orange-300 focus:border-orange-500 bg-white'
									/>
								</div>
							</div>

							{/* Progress Bar Preview */}
							<div className='mt-4 bg-white rounded-full h-3 overflow-hidden'>
								<div
									className='h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300'
									style={{
										width: `${form.watch(`packageDistribution.${index}.percentage`) || 0}%`
									}}
								/>
							</div>
						</div>
					))}

					{pkgFields.length === 0 && (
						<div className='text-center py-12 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-300'>
							<PieChart className='w-16 h-16 text-orange-400 mx-auto mb-4' />
							<p className='text-gray-600 mb-4'>No package ranges added yet</p>
							<Button
								type='button'
								onClick={addPackageRange}
								variant='outline'
								className='border-2 border-orange-300 text-orange-600 hover:bg-orange-50'>
								<Plus className='w-4 h-4 mr-2' />
								Add First Range
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Save Button */}
			<div className='flex items-center gap-4 pt-6 border-t'>
				<Button
					type='submit'
					disabled={saveStatus === 'saving'}
					className={`flex-1 h-12 text-base font-semibold transition-all ${
						saveStatus === 'saved'
							? 'bg-green-600 hover:bg-green-700'
							: saveStatus === 'error'
								? 'bg-red-600 hover:bg-red-700'
								: 'bg-blue-600 hover:bg-blue-700'
					}`}>
					{saveStatus === 'saving' && 'Saving...'}
					{saveStatus === 'saved' && '✓ Saved Successfully'}
					{saveStatus === 'error' && 'Error - Try Again'}
					{saveStatus === 'idle' && 'Save All Metrics'}
				</Button>
			</div>

			{/* Summary Stats */}
			<div className='bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-blue-200'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='text-center'>
						<div className='text-3xl font-bold text-blue-600'>{yearFields.length}</div>
						<div className='text-sm text-gray-600 mt-1'>Years Tracked</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-purple-600'>
							{pkgFields.length}
						</div>
						<div className='text-sm text-gray-600 mt-1'>Salary Ranges</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-green-600'>
							{pkgFields.reduce(
								(sum, _, i) => sum + (form.watch(`packageDistribution.${i}.count`) || 0),
								0
							)}
						</div>
						<div className='text-sm text-gray-600 mt-1'>Total in Distribution</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-orange-600'>
							{yearFields.length > 0
								? Math.max(
										...yearFields.map((_, i) =>
											form.watch(`yearStats.${i}.highestPackage`) || 0
										)
									).toFixed(1)
								: '0.0'}
						</div>
						<div className='text-sm text-gray-600 mt-1'>Peak Package (LPA)</div>
					</div>
				</div>
			</div>
		</form>
	);
}
