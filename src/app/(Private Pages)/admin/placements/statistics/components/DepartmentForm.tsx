'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { updatePlacementStatistics, getPlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';
import { Plus, Trash2, Building2 } from 'lucide-react';

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
	pageSlug,
	onChange
}: DepartmentFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
	const availableYears = initialData.years || ['2024'];
	const [selectedYear, setSelectedYear] = React.useState(availableYears[0]);

	const form = useForm<DepartmentFormData>({
		defaultValues: {
			year: selectedYear,
			departments: Object.entries(
				initialData.departmentStats?.[selectedYear] || {}
			).map(([name, stats]) => ({
				name,
				...stats
			}))
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'departments'
	});

	// Update form when year changes
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

	// Live preview
	useEffect(() => {
		const subscription = form.watch(values => {
			if (!values.departments) return;

			const departmentStats = { ...(initialData.departmentStats || {}) };
			const yearData: Record<string, any> = {};

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

			onChange({
				...initialData,
				departmentStats
			});
		});

		return () => subscription.unsubscribe();
	}, [form, initialData, onChange, selectedYear]);

	const onSubmit = async (values: DepartmentFormData) => {
		const departmentStats = { ...(initialData.departmentStats || {}) };
		const yearData: Record<string, any> = {};

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

		if (result.success) {
			alert('Department statistics updated successfully!');
		} else {
			alert('Failed to update: ' + result.error);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-6'>
			<div className='flex items-center justify-between border-b pb-4'>
				<div className='flex items-center space-x-3'>
					<Building2 className='w-6 h-6 text-blue-600' />
					<h3 className='text-2xl font-bold'>Department-wise Statistics</h3>
				</div>
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
			</div>

			<div className='space-y-6'>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className='border rounded-lg p-4 space-y-4 bg-gray-50'>
						<div className='flex items-center justify-between'>
							<Label className='text-lg font-semibold'>
								Department {index + 1}
							</Label>
							<Button
								type='button'
								variant='destructive'
								size='sm'
								onClick={() => remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Department Code</Label>
								<Input
									{...form.register(`departments.${index}.name`)}
									placeholder='CSE'
								/>
							</div>
							<div>
								<Label>Students Placed</Label>
								<Input
									type='number'
									{...form.register(`departments.${index}.placed`, {
										valueAsNumber: true
									})}
									placeholder='120'
								/>
							</div>
							<div>
								<Label>Total Students</Label>
								<Input
									type='number'
									{...form.register(`departments.${index}.total`, {
										valueAsNumber: true
									})}
									placeholder='150'
								/>
							</div>
							<div>
								<Label>Average Package (LPA)</Label>
								<Input
									type='number'
									step='0.1'
									{...form.register(`departments.${index}.avgPackage`, {
										valueAsNumber: true
									})}
									placeholder='6.5'
								/>
							</div>
							<div>
								<Label>Highest Package (LPA)</Label>
								<Input
									type='number'
									step='0.1'
									{...form.register(`departments.${index}.highest`, {
										valueAsNumber: true
									})}
									placeholder='24'
								/>
							</div>
							<div>
								<Label>Companies Visited</Label>
								<Input
									type='number'
									{...form.register(`departments.${index}.companies`, {
										valueAsNumber: true
									})}
									placeholder='45'
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<Button
				type='button'
				variant='outline'
				onClick={() =>
					append({
						name: '',
						placed: 0,
						total: 0,
						avgPackage: 0,
						highest: 0,
						companies: 0
					})
				}
				className='w-full'>
				<Plus className='w-4 h-4 mr-2' />
				Add Department
			</Button>

			<div className='flex items-center gap-4'>
				<Button 
					type='submit' 
					className={`w-full ${
						saveStatus === 'saved'
							? 'bg-green-600 hover:bg-green-700'
							: saveStatus === 'error'
								? 'bg-red-600 hover:bg-red-700'
								: 'bg-blue-600 hover:bg-blue-700'
					}`}
					disabled={saveStatus === 'saving'}>
					{saveStatus === 'saving' && 'Saving...'}
					{saveStatus === 'saved' && '✓ Saved Successfully'}
					{saveStatus === 'error' && 'Error - Try Again'}
					{saveStatus === 'idle' && 'Save Department Statistics'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>
		</form>
	);
}
