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
import { Trash2, Plus, GraduationCap, Building2, DollarSign, Briefcase, Calendar, User, Image as ImageIcon } from 'lucide-react';
import { updatePlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import type { PlacementStatisticsData, StudentPlacement } from '@/app/(Private Pages)/actions/placement-statistics';
import UploadButton from '@/components/cloudinary/upload-button';

interface StudentsFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange?: (data: PlacementStatisticsData) => void;
}

interface FormValues {
	students: StudentPlacement[];
}

export default function StudentsForm({ initialData, pageSlug, onChange }: StudentsFormProps) {
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm<FormValues>({
		defaultValues: {
			students: initialData.studentPlacements || []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'students'
	});

	// Live preview effect
	useEffect(() => {
		const subscription = form.watch(values => {
			if (onChange) {
				const updatedData: PlacementStatisticsData = {
					...initialData,
					studentPlacements: (values.students || []).filter((s): s is StudentPlacement => 
						s !== undefined && 
						!!s.name && 
						!!s.department && 
						!!s.company && 
						!!s.batch && 
						!!s.role &&
						s.package !== undefined
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

			const updatedData: PlacementStatisticsData = {
				...initialData,
				studentPlacements: (data.students || []).filter((s): s is StudentPlacement => 
					s !== undefined && 
					!!s.name && 
					!!s.department && 
					!!s.company && 
					!!s.batch && 
					!!s.role &&
					s.package !== undefined
				)
			};

			await updatePlacementStatistics(updatedData);

			setSaveStatus('saved');
			setTimeout(() => setSaveStatus('idle'), 2000);
		} catch (error) {
			console.error('Failed to save students:', error);
			setSaveStatus('error');
			setTimeout(() => setSaveStatus('idle'), 3000);
		}
	};

	const addStudent = () => {
		append({
			name: '',
			department: initialData.departments?.[1] || 'CSE',
			company: '',
			package: 0,
			batch: initialData.years?.[0] || '2024',
			role: '',
			image: ''
		});
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
			<div>
				<div className='flex items-center justify-between mb-6'>
					<h3 className='text-xl font-bold text-gray-900'>Student Placements</h3>
					<Button
						type='button'
						onClick={addStudent}
						variant='outline'
						className='flex items-center gap-2 border-2 border-blue-300 text-blue-600 hover:bg-blue-50'>
						<Plus className='w-4 h-4' />
						Add Student
					</Button>
				</div>

				<div className='space-y-6 max-h-[60vh] overflow-y-auto pr-4'>
					{fields.map((field, index) => (
						<div
							key={field.id}
							className='p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 space-y-4 relative'>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center gap-3'>
									<div className='w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold'>
										{index + 1}
									</div>
									<span className='font-semibold text-gray-700'>Student {index + 1}</span>
								</div>
								<Button
									type='button'
									onClick={() => remove(index)}
									variant='ghost'
									className='text-red-600 hover:text-red-700 hover:bg-red-50'>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{/* Name */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<User className='w-4 h-4 text-blue-600' />
										Student Name
									</Label>
									<Input
										{...form.register(`students.${index}.name`)}
										placeholder='Enter student name'
										className='border-gray-300 focus:border-blue-500'
									/>
								</div>

								{/* Department */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<GraduationCap className='w-4 h-4 text-green-600' />
										Department
									</Label>
									<Select
										value={form.watch(`students.${index}.department`)}
										onValueChange={value => form.setValue(`students.${index}.department`, value)}>
										<SelectTrigger className='border-gray-300 focus:border-green-500'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{(initialData.departments || ['CSE', 'IT', 'ECE', 'EEE']).filter(d => d !== 'All').map(dept => (
												<SelectItem key={dept} value={dept}>
													{dept}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Company */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<Building2 className='w-4 h-4 text-purple-600' />
										Company
									</Label>
									<Input
										{...form.register(`students.${index}.company`)}
										placeholder='Enter company name'
										className='border-gray-300 focus:border-purple-500'
									/>
								</div>

								{/* Role */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<Briefcase className='w-4 h-4 text-orange-600' />
										Role/Position
									</Label>
									<Input
										{...form.register(`students.${index}.role`)}
										placeholder='e.g. Software Engineer'
										className='border-gray-300 focus:border-orange-500'
									/>
								</div>

								{/* Package */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<DollarSign className='w-4 h-4 text-green-600' />
										Package (LPA)
									</Label>
									<Input
										{...form.register(`students.${index}.package`, { valueAsNumber: true })}
										type='number'
										step='0.1'
										min='0'
										placeholder='e.g. 12.5'
										className='border-gray-300 focus:border-green-500'
									/>
								</div>

								{/* Batch Year */}
								<div className='space-y-2'>
									<Label className='flex items-center gap-2'>
										<Calendar className='w-4 h-4 text-blue-600' />
										Batch Year
									</Label>
									<Select
										value={form.watch(`students.${index}.batch`)}
										onValueChange={value => form.setValue(`students.${index}.batch`, value)}>
										<SelectTrigger className='border-gray-300 focus:border-blue-500'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{(initialData.years || ['2024', '2023', '2022']).map(year => (
												<SelectItem key={year} value={year}>
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Image Upload */}
								<div className='space-y-2 md:col-span-2'>
									<Label className='flex items-center gap-2'>
										<ImageIcon className='w-4 h-4 text-indigo-600' />
										Student Photo
									</Label>
									<div className='flex items-center gap-3'>
										<Input
											value={form.watch(`students.${index}`)?.image || ''}
											onChange={(e) => {
												const students = form.getValues('students');
												students[index] = { ...students[index], image: e.target.value };
												form.setValue('students', students);
											}}
											placeholder='https://example.com/student-photo.jpg'
											className='border-gray-300 focus:border-indigo-500 flex-1'
										/>
										<UploadButton
											onUpload={(url: string) => {
												const students = form.getValues('students');
												students[index] = { ...students[index], image: url };
												form.setValue('students', students);
											}}
											folder="students"
										/>
									</div>
									{form.watch(`students.${index}`)?.image && (
										<img
											src={form.watch(`students.${index}`)?.image}
											alt="Preview"
											className="w-16 h-16 rounded-lg object-cover border-2 border-indigo-200"
										/>
									)}
								</div>
							</div>

							{/* Preview Badge */}
							<div className='mt-4 pt-4 border-t border-gray-300'>
								<div className='flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200'>
									<div className='flex items-center gap-3'>
										{form.watch(`students.${index}`)?.image ? (
											<img
												src={form.watch(`students.${index}`)?.image}
												alt='Preview'
												className='w-10 h-10 rounded-lg object-cover border'
											/>
										) : (
											<div className='w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm'>
												{form.watch(`students.${index}.name`).split(' ').map((n: string) => n[0]).join('') || '?'}
											</div>
										)}
										<div>
											<div className='font-semibold text-gray-900'>
												{form.watch(`students.${index}.name`) || 'Student Name'}
											</div>
											<div className='text-xs text-gray-500'>
												{form.watch(`students.${index}.department`)} • {form.watch(`students.${index}.company`) || 'Company'}
											</div>
										</div>
									</div>
									<div className='text-right'>
										<div className='text-lg font-bold text-green-600'>
											₹{form.watch(`students.${index}.package`) || 0}
										</div>
										<div className='text-xs text-gray-500'>LPA</div>
									</div>
								</div>
							</div>
						</div>
					))}

					{fields.length === 0 && (
						<div className='text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300'>
							<GraduationCap className='w-16 h-16 text-gray-400 mx-auto mb-4' />
							<p className='text-gray-600 mb-4'>No students added yet</p>
							<Button
								type='button'
								onClick={addStudent}
								variant='outline'
								className='border-2 border-blue-300 text-blue-600 hover:bg-blue-50'>
								<Plus className='w-4 h-4 mr-2' />
								Add First Student
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
					{saveStatus === 'idle' && 'Save Students'}
				</Button>
				{saveStatus === 'saved' && (
					<span className='text-sm text-green-600 font-medium'>Changes saved!</span>
				)}
			</div>

			{/* Summary Stats */}
			<div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='text-center'>
						<div className='text-3xl font-bold text-blue-600'>{fields.length}</div>
						<div className='text-sm text-gray-600 mt-1'>Total Students</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-green-600'>
							{fields.length > 0
								? Math.max(...fields.map((_, i) => form.watch(`students.${i}.package`) || 0)).toFixed(1)
								: '0.0'}
						</div>
						<div className='text-sm text-gray-600 mt-1'>Highest (LPA)</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-purple-600'>
							{fields.length > 0
								? (
										fields.reduce((sum, _, i) => sum + (form.watch(`students.${i}.package`) || 0), 0) / fields.length
									).toFixed(1)
								: '0.0'}
						</div>
						<div className='text-sm text-gray-600 mt-1'>Average (LPA)</div>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-orange-600'>
							{new Set(fields.map((_, i) => form.watch(`students.${i}.company`))).size}
						</div>
						<div className='text-sm text-gray-600 mt-1'>Companies</div>
					</div>
				</div>
			</div>
		</form>
	);
}
