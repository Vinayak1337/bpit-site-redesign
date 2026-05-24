'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type {
	PlacementStatisticsData,
	YearStats,
	DepartmentStat,
	SectorWiseData
} from '@/app/(Private Pages)/actions/placement-statistics';
import { updatePlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
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
import UploadButton from '@/components/cloudinary/upload-button';
import {
	AddRowButton,
	AdminEmptyState,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

interface PlacementStatisticsFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange?: (data: PlacementStatisticsData) => void;
}

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
	const years = formValues.years
		? formValues.years.split(',').map(y => y.trim()).filter(Boolean)
		: currentData.years;
	const departments = formValues.departments
		? formValues.departments.split(',').map(d => d.trim()).filter(Boolean)
		: currentData.departments;

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

	const departmentStats: Record<string, Record<string, DepartmentStat>> = {};
	(formValues.departmentStats || []).forEach(stat => {
		if (stat.year && stat.department) {
			if (!departmentStats[stat.year]) departmentStats[stat.year] = {};
			departmentStats[stat.year][stat.department] = {
				placed: stat.placed,
				total: stat.total,
				avgPackage: stat.avgPackage,
				highest: stat.highest,
				companies: stat.companies
			};
		}
	});

	const sectorWiseData: SectorWiseData[] = (formValues.sectorWiseData || []).map(
		s => ({
			sector: s.sector,
			percentage: s.percentage,
			companies: s.companies.split(',').map(c => c.trim()),
			color: s.color
		})
	);

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
	onChange
}: PlacementStatisticsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const [currentData, setCurrentData] =
		useState<PlacementStatisticsData>(initialData);

	const overallStatsArray: YearStatsFormValue[] = [];
	if (initialData.overallStats) {
		Object.entries(initialData.overallStats).forEach(([year, stats]) => {
			overallStatsArray.push({ year, ...stats });
		});
	}

	const departmentStatsArray: DepartmentStatFormValue[] = [];
	if (initialData.departmentStats) {
		Object.entries(initialData.departmentStats).forEach(([year, depts]) => {
			Object.entries(depts).forEach(([dept, stats]) => {
				departmentStatsArray.push({ year, department: dept, ...stats });
			});
		});
	}

	const sectorFormArray: SectorFormValue[] = (
		initialData.sectorWiseData || []
	).map(s => ({ ...s, companies: s.companies.join(', ') }));

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

	const overallArr = useFieldArray({ control: form.control, name: 'overallStats' });
	const deptArr = useFieldArray({
		control: form.control,
		name: 'departmentStats'
	});
	const pkgArr = useFieldArray({
		control: form.control,
		name: 'packageDistribution'
	});
	const sectorArr = useFieldArray({
		control: form.control,
		name: 'sectorWiseData'
	});
	const trendArr = useFieldArray({
		control: form.control,
		name: 'yearlyTrends'
	});
	const studentArr = useFieldArray({
		control: form.control,
		name: 'studentPlacements'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			const updated = createUpdatedData(
				currentData,
				values as Partial<FormValues>
			);
			onChange?.(updated);
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange, currentData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const payload = createUpdatedData(currentData, values);
		startTransition(async () => {
			try {
				await updatePlacementStatistics(payload);
				setCurrentData(payload);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Save error:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Hero'
				description='Top banner copy for the statistics page.'>
				<AdminField label='Icon'>
					<Select
						value={form.watch('hero.icon')}
						onValueChange={v =>
							form.setValue('hero.icon', v, { shouldDirty: true })
						}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{SUPPORTED_ICON_NAMES.map(icon => (
								<SelectItem key={icon} value={icon}>
									{icon}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</AdminField>
				<AdminField label='Title'>
					<Input {...form.register('hero.title')} />
				</AdminField>
				<AdminField label='Subtitle'>
					<Textarea rows={2} {...form.register('hero.subtitle')} />
				</AdminField>
				<AdminField label='Background gradient (Tailwind classes)'>
					<Input {...form.register('hero.gradient')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection
				title='Config'
				description='Comma-separated years and departments. These drive the filter dropdowns.'>
				<AdminField label='Years' hint='Example: 2020, 2021, 2022'>
					<Input {...form.register('years')} />
				</AdminField>
				<AdminField label='Departments' hint='Example: CSE, IT, ECE'>
					<Input {...form.register('departments')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Overall stats (per year)'>
				<AdminItemList>
					{overallArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={overallArr.fields.length}
							title={
								form.watch(`overallStats.${index}.year`) || `Year ${index + 1}`
							}
							onMove={d => overallArr.move(index, index + d)}
							onRemove={() => overallArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Year'>
									<Input
										{...form.register(`overallStats.${index}.year` as const)}
									/>
								</AdminField>
								<AdminField label='Placement rate (%)'>
									<Input
										type='number'
										step='0.1'
										{...form.register(
											`overallStats.${index}.placementRate` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Total students'>
									<Input
										type='number'
										{...form.register(
											`overallStats.${index}.totalStudents` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Students placed'>
									<Input
										type='number'
										{...form.register(
											`overallStats.${index}.studentsPlaced` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Companies visited'>
									<Input
										type='number'
										{...form.register(
											`overallStats.${index}.companiesVisited` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Highest package (LPA)'>
									<Input
										type='number'
										step='0.1'
										{...form.register(
											`overallStats.${index}.highestPackage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Average package (LPA)'>
									<Input
										type='number'
										step='0.1'
										{...form.register(
											`overallStats.${index}.averagePackage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Median package (LPA)'>
									<Input
										type='number'
										step='0.1'
										{...form.register(
											`overallStats.${index}.medianPackage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{overallArr.fields.length === 0 && (
					<AdminEmptyState title='No year stats yet' />
				)}
				<AddRowButton
					onClick={() =>
						overallArr.append({
							year: '',
							placementRate: 0,
							totalStudents: 0,
							studentsPlaced: 0,
							companiesVisited: 0,
							highestPackage: 0,
							averagePackage: 0,
							medianPackage: 0
						})
					}>
					Add year stats
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Department stats (per year × dept)'>
				<AdminItemList>
					{deptArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={deptArr.fields.length}
							title={
								`${form.watch(`departmentStats.${index}.department`) || '—'} · ${form.watch(`departmentStats.${index}.year`) || '—'}`
							}
							onMove={d => deptArr.move(index, index + d)}
							onRemove={() => deptArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Year'>
									<Input
										{...form.register(`departmentStats.${index}.year` as const)}
									/>
								</AdminField>
								<AdminField label='Department'>
									<Select
										value={
											form.watch(`departmentStats.${index}.department`) || 'CSE'
										}
										onValueChange={v =>
											form.setValue(`departmentStats.${index}.department`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{DEPARTMENT_OPTIONS.map(d => (
												<SelectItem key={d} value={d}>
													{d}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField label='Placed'>
									<Input
										type='number'
										{...form.register(
											`departmentStats.${index}.placed` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Total'>
									<Input
										type='number'
										{...form.register(`departmentStats.${index}.total` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
								<AdminField label='Avg package (LPA)'>
									<Input
										type='number'
										step='0.1'
										{...form.register(
											`departmentStats.${index}.avgPackage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Highest (LPA)'>
									<Input
										type='number'
										step='0.1'
										{...form.register(
											`departmentStats.${index}.highest` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Companies'>
									<Input
										type='number'
										{...form.register(
											`departmentStats.${index}.companies` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{deptArr.fields.length === 0 && (
					<AdminEmptyState title='No department stats yet' />
				)}
				<AddRowButton
					onClick={() =>
						deptArr.append({
							department: 'CSE',
							year: '',
							placed: 0,
							total: 0,
							avgPackage: 0,
							highest: 0,
							companies: 0
						})
					}>
					Add row
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Package distribution'>
				<AdminItemList>
					{pkgArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={pkgArr.fields.length}
							title={
								form.watch(`packageDistribution.${index}.range`) ||
								`Range ${index + 1}`
							}
							onMove={d => pkgArr.move(index, index + d)}
							onRemove={() => pkgArr.remove(index)}>
							<AdminFieldGrid cols={3}>
								<AdminField label='Range'>
									<Input
										placeholder='3-5 LPA'
										{...form.register(
											`packageDistribution.${index}.range` as const
										)}
									/>
								</AdminField>
								<AdminField label='Count'>
									<Input
										type='number'
										{...form.register(
											`packageDistribution.${index}.count` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Percentage'>
									<Input
										type='number'
										step='0.1'
										{...form.register(
											`packageDistribution.${index}.percentage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{pkgArr.fields.length === 0 && (
					<AdminEmptyState title='No ranges yet' />
				)}
				<AddRowButton
					onClick={() =>
						pkgArr.append({ range: '', count: 0, percentage: 0 })
					}>
					Add range
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Sector-wise data'>
				<AdminItemList>
					{sectorArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={sectorArr.fields.length}
							title={
								form.watch(`sectorWiseData.${index}.sector`) ||
								`Sector ${index + 1}`
							}
							onMove={d => sectorArr.move(index, index + d)}
							onRemove={() => sectorArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Sector'>
									<Input
										{...form.register(
											`sectorWiseData.${index}.sector` as const
										)}
									/>
								</AdminField>
								<AdminField label='Percentage'>
									<Input
										type='number'
										step='0.1'
										{...form.register(
											`sectorWiseData.${index}.percentage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Color gradient'>
									<Select
										value={
											form.watch(`sectorWiseData.${index}.color`) ||
											COLOR_OPTIONS[0]
										}
										onValueChange={v =>
											form.setValue(`sectorWiseData.${index}.color`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(c => (
												<SelectItem key={c} value={c}>
													{c}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Companies' hint='Comma separated.'>
								<Input
									{...form.register(
										`sectorWiseData.${index}.companies` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{sectorArr.fields.length === 0 && (
					<AdminEmptyState title='No sectors yet' />
				)}
				<AddRowButton
					onClick={() =>
						sectorArr.append({
							sector: '',
							percentage: 0,
							companies: '',
							color: COLOR_OPTIONS[0]
						})
					}>
					Add sector
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Yearly trends'>
				<AdminItemList>
					{trendArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={trendArr.fields.length}
							title={
								form.watch(`yearlyTrends.${index}.year`) || `Year ${index + 1}`
							}
							onMove={d => trendArr.move(index, index + d)}
							onRemove={() => trendArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Year'>
									<Input
										{...form.register(`yearlyTrends.${index}.year` as const)}
									/>
								</AdminField>
								<AdminField label='Rate (%)'>
									<Input
										type='number'
										step='0.1'
										{...form.register(`yearlyTrends.${index}.rate` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
								<AdminField label='Avg (LPA)'>
									<Input
										type='number'
										step='0.1'
										{...form.register(`yearlyTrends.${index}.avg` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
								<AdminField label='Companies'>
									<Input
										type='number'
										{...form.register(
											`yearlyTrends.${index}.companies` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{trendArr.fields.length === 0 && (
					<AdminEmptyState title='No trends yet' />
				)}
				<AddRowButton
					onClick={() =>
						trendArr.append({ year: '', rate: 0, avg: 0, companies: 0 })
					}>
					Add year
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Student placements'>
				<AdminItemList>
					{studentArr.fields.map((field, index) => {
						const image = form.watch(`studentPlacements.${index}.image`);
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={studentArr.fields.length}
								title={
									form.watch(`studentPlacements.${index}.name`) ||
									`Student ${index + 1}`
								}
								subtitle={
									form.watch(`studentPlacements.${index}.company`) || undefined
								}
								onMove={d => studentArr.move(index, index + d)}
								onRemove={() => studentArr.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Name'>
										<Input
											{...form.register(
												`studentPlacements.${index}.name` as const
											)}
										/>
									</AdminField>
									<AdminField label='Department'>
										<Input
											{...form.register(
												`studentPlacements.${index}.department` as const
											)}
										/>
									</AdminField>
									<AdminField label='Company'>
										<Input
											{...form.register(
												`studentPlacements.${index}.company` as const
											)}
										/>
									</AdminField>
									<AdminField label='Package (LPA)'>
										<Input
											type='number'
											step='0.1'
											{...form.register(
												`studentPlacements.${index}.package` as const,
												{ valueAsNumber: true }
											)}
										/>
									</AdminField>
									<AdminField label='Batch'>
										<Input
											{...form.register(
												`studentPlacements.${index}.batch` as const
											)}
										/>
									</AdminField>
									<AdminField label='Role'>
										<Input
											{...form.register(
												`studentPlacements.${index}.role` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Image (optional)'>
									<Input
										placeholder='Image URL'
										{...form.register(
											`studentPlacements.${index}.image` as const
										)}
									/>
									<div className='mt-2'>
										<UploadButton
											onUpload={url =>
												form.setValue(
													`studentPlacements.${index}.image`,
													url,
													{ shouldDirty: true }
												)
											}
											buttonText='Upload image'
										/>
									</div>
									{image && (
										<div className='mt-3'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={image}
												alt='Student preview'
												className='h-16 w-16 rounded-full border border-slate-200 object-cover'
											/>
										</div>
									)}
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{studentArr.fields.length === 0 && (
					<AdminEmptyState title='No student placements yet' />
				)}
				<AddRowButton
					onClick={() =>
						studentArr.append({
							name: '',
							department: '',
							company: '',
							package: 0,
							batch: '',
							role: '',
							image: ''
						})
					}>
					Add student
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
