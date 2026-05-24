'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { updatePlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';
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

interface DepartmentFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange: (data: PlacementStatisticsData) => void;
}

interface DepartmentFormData {
	year: string;
	departments: {
		name: string;
		placed: number;
		total: number;
		avgPackage: number;
		highest: number;
		companies: number;
	}[];
}

export default function DepartmentForm({
	initialData,
	onChange
}: DepartmentFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const availableYears = initialData.years || ['2024'];
	const [selectedYear, setSelectedYear] = useState(availableYears[0]);

	const form = useForm<DepartmentFormData>({
		defaultValues: {
			year: selectedYear,
			departments: Object.entries(
				initialData.departmentStats?.[selectedYear] || {}
			).map(([name, stats]) => ({ name, ...stats }))
		}
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'departments'
	});

	useEffect(() => {
		const yearData = initialData.departmentStats?.[selectedYear] || {};
		form.reset({
			year: selectedYear,
			departments: Object.entries(yearData).map(([name, stats]) => ({
				name,
				...stats
			}))
		});
	}, [selectedYear, initialData, form]);

	useEffect(() => {
		const sub = form.watch(values => {
			if (!values.departments) return;
			const departmentStats = { ...(initialData.departmentStats || {}) };
			const yearData: Record<
				string,
				{
					placed: number;
					total: number;
					avgPackage: number;
					highest: number;
					companies: number;
				}
			> = {};
			values.departments.forEach(dept => {
				if (dept?.name) {
					yearData[dept.name] = {
						placed: dept.placed || 0,
						total: dept.total || 0,
						avgPackage: dept.avgPackage || 0,
						highest: dept.highest || 0,
						companies: dept.companies || 0
					};
				}
			});
			departmentStats[selectedYear] = yearData;
			onChange({ ...initialData, departmentStats });
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, initialData, onChange, selectedYear]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				const departmentStats = { ...(initialData.departmentStats || {}) };
				const yearData: Record<
					string,
					{
						placed: number;
						total: number;
						avgPackage: number;
						highest: number;
						companies: number;
					}
				> = {};
				values.departments.forEach(dept => {
					yearData[dept.name] = {
						placed: dept.placed,
						total: dept.total,
						avgPackage: dept.avgPackage,
						highest: dept.highest,
						companies: dept.companies
					};
				});
				departmentStats[selectedYear] = yearData;
				const result = await updatePlacementStatistics({
					...initialData,
					departmentStats
				});
				setStatus(
					result.success
						? { kind: 'success', message: 'Saved' }
						: { kind: 'error', message: result.error ?? 'Save failed' }
				);
			} catch (error) {
				console.error('Failed to save department stats:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Department-wise statistics'
				description='Edit per-department placement numbers for the selected academic year.'
				action={
					<Select value={selectedYear} onValueChange={setSelectedYear}>
						<SelectTrigger className='w-32'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{availableYears.map(year => (
								<SelectItem key={year} value={year}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				}>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={
								form.watch(`departments.${index}.name`) ||
								`Department ${index + 1}`
							}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Department code'>
									<Input
										placeholder='CSE'
										{...form.register(`departments.${index}.name` as const)}
									/>
								</AdminField>
								<AdminField label='Students placed'>
									<Input
										type='number'
										placeholder='120'
										{...form.register(`departments.${index}.placed` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
								<AdminField label='Total students'>
									<Input
										type='number'
										placeholder='150'
										{...form.register(`departments.${index}.total` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
								<AdminField label='Average package (LPA)'>
									<Input
										type='number'
										step='0.1'
										placeholder='6.5'
										{...form.register(
											`departments.${index}.avgPackage` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
								<AdminField label='Highest package (LPA)'>
									<Input
										type='number'
										step='0.1'
										placeholder='24'
										{...form.register(`departments.${index}.highest` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
								<AdminField label='Companies visited'>
									<Input
										type='number'
										placeholder='45'
										{...form.register(
											`departments.${index}.companies` as const,
											{ valueAsNumber: true }
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && (
					<AdminEmptyState
						title='No departments for this year'
						description='Add a department to record placement numbers.'
					/>
				)}
				<AddRowButton
					onClick={() =>
						append({
							name: '',
							placed: 0,
							total: 0,
							avgPackage: 0,
							highest: 0,
							companies: 0
						})
					}>
					Add department
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
