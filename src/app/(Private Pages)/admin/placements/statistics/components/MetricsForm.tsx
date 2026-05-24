'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { updatePlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import type {
	PlacementStatisticsData,
	YearStats,
	PackageDistribution
} from '@/app/(Private Pages)/actions/placement-statistics';
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

export default function MetricsForm({
	initialData,
	onChange
}: MetricsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const yearStatsArray: YearStatsForm[] = Object.entries(
		initialData.overallStats || {}
	).map(([year, stats]) => ({ year, ...stats }));

	const form = useForm<FormValues>({
		defaultValues: {
			years: initialData.years || ['2024', '2023', '2022'],
			yearStats: yearStatsArray,
			packageDistribution: initialData.packageDistribution || []
		}
	});

	const years = useFieldArray({ control: form.control, name: 'yearStats' });
	const pkgs = useFieldArray({
		control: form.control,
		name: 'packageDistribution'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (!onChange) return;
			const overallStats: Record<string, YearStats> = {};
			(values.yearStats || []).forEach(stat => {
				if (stat?.year) {
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
			onChange({
				...initialData,
				years: (values.years || []).filter((y): y is string => !!y),
				overallStats,
				packageDistribution: (values.packageDistribution || []).filter(
					(p): p is PackageDistribution =>
						p !== undefined &&
						!!p.range &&
						p.count !== undefined &&
						p.percentage !== undefined
				)
			});
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange, initialData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(data => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				const overallStats: Record<string, YearStats> = {};
				(data.yearStats || []).forEach(stat => {
					if (stat?.year) {
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
				await updatePlacementStatistics({
					...initialData,
					years: (data.years || []).filter((y): y is string => !!y),
					overallStats,
					packageDistribution: (data.packageDistribution || []).filter(
						(p): p is PackageDistribution =>
							p !== undefined &&
							!!p.range &&
							p.count !== undefined &&
							p.percentage !== undefined
					)
				});
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Failed to save metrics:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const addYear = () =>
		years.append({
			year: `20${24 - years.fields.length}`,
			placementRate: 0,
			totalStudents: 0,
			studentsPlaced: 0,
			companiesVisited: 0,
			highestPackage: 0,
			averagePackage: 0,
			medianPackage: 0
		});

	const addPkg = () => pkgs.append({ range: '0-5 LPA', count: 0, percentage: 0 });

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection title='Year-wise statistics'>
				<AdminItemList>
					{years.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={years.fields.length}
							title={
								form.watch(`yearStats.${index}.year`) ||
								`Year ${index + 1}`
							}
							onMove={d => years.move(index, index + d)}
							onRemove={() => years.remove(index)}>
							<AdminFieldGrid cols={3}>
								<AdminField label='Year'>
									<Input
										placeholder='2024'
										{...form.register(`yearStats.${index}.year` as const)}
									/>
								</AdminField>
								<AdminField label='Placement rate (%)'>
									<Input
										type='number'
										step='0.1'
										min='0'
										max='100'
										placeholder='85.5'
										{...form.register(
											`yearStats.${index}.placementRate` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Total students'>
									<Input
										type='number'
										min='0'
										placeholder='500'
										{...form.register(
											`yearStats.${index}.totalStudents` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Students placed'>
									<Input
										type='number'
										min='0'
										placeholder='425'
										{...form.register(
											`yearStats.${index}.studentsPlaced` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Companies visited'>
									<Input
										type='number'
										min='0'
										placeholder='120'
										{...form.register(
											`yearStats.${index}.companiesVisited` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Highest package (LPA)'>
									<Input
										type='number'
										step='0.1'
										min='0'
										placeholder='45.0'
										{...form.register(
											`yearStats.${index}.highestPackage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Average package (LPA)'>
									<Input
										type='number'
										step='0.1'
										min='0'
										placeholder='8.5'
										{...form.register(
											`yearStats.${index}.averagePackage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Median package (LPA)'>
									<Input
										type='number'
										step='0.1'
										min='0'
										placeholder='7.0'
										{...form.register(
											`yearStats.${index}.medianPackage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{years.fields.length === 0 && (
					<AdminEmptyState
						title='No year statistics yet'
						description='Add a year to begin tracking yearly metrics.'
					/>
				)}
				<AddRowButton onClick={addYear}>Add year</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Package distribution'>
				<AdminItemList>
					{pkgs.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={pkgs.fields.length}
							title={
								form.watch(`packageDistribution.${index}.range`) ||
								`Range ${index + 1}`
							}
							onMove={d => pkgs.move(index, index + d)}
							onRemove={() => pkgs.remove(index)}>
							<AdminFieldGrid cols={3}>
								<AdminField label='Salary range'>
									<Input
										placeholder='0-5 LPA'
										{...form.register(
											`packageDistribution.${index}.range` as const
										)}
									/>
								</AdminField>
								<AdminField label='Student count'>
									<Input
										type='number'
										min='0'
										placeholder='50'
										{...form.register(
											`packageDistribution.${index}.count` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Percentage (%)'>
									<Input
										type='number'
										step='0.1'
										min='0'
										max='100'
										placeholder='25.0'
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
				{pkgs.fields.length === 0 && (
					<AdminEmptyState
						title='No package ranges yet'
						description='Add a range to begin tracking package distribution.'
					/>
				)}
				<AddRowButton onClick={addPkg}>Add range</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
