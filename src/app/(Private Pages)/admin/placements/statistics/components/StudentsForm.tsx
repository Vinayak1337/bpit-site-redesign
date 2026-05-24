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
import type {
	PlacementStatisticsData,
	StudentPlacement
} from '@/app/(Private Pages)/actions/placement-statistics';
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

interface StudentsFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange?: (data: PlacementStatisticsData) => void;
}

interface FormValues {
	students: StudentPlacement[];
}

const filterValid = (
	students: (StudentPlacement | undefined)[] | undefined
): StudentPlacement[] =>
	(students || []).filter(
		(s): s is StudentPlacement =>
			s !== undefined &&
			!!s.name &&
			!!s.department &&
			!!s.company &&
			!!s.batch &&
			!!s.role &&
			s.package !== undefined
	);

export default function StudentsForm({
	initialData,
	onChange
}: StudentsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: { students: initialData.studentPlacements || [] }
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'students'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (onChange) {
				onChange({
					...initialData,
					studentPlacements: filterValid(values.students as StudentPlacement[])
				});
				setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
			}
		});
		return () => sub.unsubscribe();
	}, [form, onChange, initialData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updatePlacementStatistics({
					...initialData,
					studentPlacements: filterValid(values.students)
				});
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Failed to save students:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const addStudent = () =>
		append({
			name: '',
			department: initialData.departments?.[1] || 'CSE',
			company: '',
			package: 0,
			batch: initialData.years?.[0] || '2024',
			role: '',
			image: ''
		});

	const departmentOptions = (
		initialData.departments || ['CSE', 'IT', 'ECE', 'EEE']
	).filter(d => d !== 'All');
	const yearOptions = initialData.years || ['2024', '2023', '2022'];

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection title='Student placements'>
				<AdminItemList>
					{fields.map((field, index) => {
						const image = form.watch(`students.${index}.image`);
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fields.length}
								title={
									form.watch(`students.${index}.name`) || `Student ${index + 1}`
								}
								subtitle={
									[
										form.watch(`students.${index}.department`),
										form.watch(`students.${index}.company`)
									]
										.filter(Boolean)
										.join(' · ') || undefined
								}
								onMove={d => move(index, index + d)}
								onRemove={() => remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Student name'>
										<Input
											placeholder='Enter student name'
											{...form.register(`students.${index}.name` as const)}
										/>
									</AdminField>
									<AdminField label='Department'>
										<Select
											value={form.watch(`students.${index}.department`) || ''}
											onValueChange={v =>
												form.setValue(`students.${index}.department`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{departmentOptions.map(dept => (
													<SelectItem key={dept} value={dept}>
														{dept}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Company'>
										<Input
											placeholder='Enter company name'
											{...form.register(`students.${index}.company` as const)}
										/>
									</AdminField>
									<AdminField label='Role / position'>
										<Input
											placeholder='Software Engineer'
											{...form.register(`students.${index}.role` as const)}
										/>
									</AdminField>
									<AdminField label='Package (LPA)'>
										<Input
											type='number'
											step='0.1'
											min='0'
											placeholder='12.5'
											{...form.register(`students.${index}.package` as const, {
												valueAsNumber: true
											})}
										/>
									</AdminField>
									<AdminField label='Batch year'>
										<Select
											value={form.watch(`students.${index}.batch`) || ''}
											onValueChange={v =>
												form.setValue(`students.${index}.batch`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{yearOptions.map(year => (
													<SelectItem key={year} value={year}>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Student photo'>
									<Input
										placeholder='https://example.com/student-photo.jpg'
										{...form.register(`students.${index}.image` as const)}
									/>
									<div className='mt-2'>
										<UploadButton
											onUpload={(url: string) =>
												form.setValue(`students.${index}.image`, url, {
													shouldDirty: true
												})
											}
											folder='students'
										/>
									</div>
									{image && (
										<div className='mt-3 h-16 w-16 overflow-hidden rounded border border-slate-200'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={image}
												alt='Preview'
												className='h-full w-full object-cover'
											/>
										</div>
									)}
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{fields.length === 0 && (
					<AdminEmptyState
						title='No students added yet'
						description='Add a placed student to begin tracking.'
					/>
				)}
				<AddRowButton onClick={addStudent}>Add student</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
