'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { updateTopPlacedStudents } from '@/app/(Private Pages)/actions/placement';
import { Plus, Trash2 } from 'lucide-react';

type StudentFormValue = {
	id: string;
	name: string;
	company: string;
	package: string;
	branch: string;
	year: string;
	image: string;
	companyLogo: string;
};

type StatisticFormValue = {
	id: string;
	value: string;
	label: string;
};

type TopPlacedStudentsFormValues = {
	title: string;
	subtitle: string;
	students: StudentFormValue[];
	statistics: StatisticFormValue[];
};

const createEmptyStudent = (): StudentFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	company: '',
	package: '',
	branch: '',
	year: '',
	image: '',
	companyLogo: ''
});

const createEmptyStatistic = (): StatisticFormValue => ({
	id: crypto.randomUUID(),
	value: '',
	label: ''
});

const toTopPlacedStudentsData = (
	values: TopPlacedStudentsFormValues
): TopPlacedStudentsData => {
	const students = values.students
		.map((student, index) => ({
			id: Number.parseInt(student.id, 10) || index + 1,
			name: student.name.trim(),
			company: student.company.trim(),
			package: student.package.trim(),
			branch: student.branch.trim(),
			year: student.year.trim(),
			image: student.image.trim(),
			companyLogo: student.companyLogo.trim()
		}))
		.filter(
			student =>
				student.name.length > 0 &&
				student.company.length > 0 &&
				student.package.length > 0 &&
				student.image.length > 0 &&
				student.companyLogo.length > 0
		);
	const statistics = values.statistics
		.map(stat => ({
			value: stat.value.trim(),
			label: stat.label.trim()
		}))
		.filter(stat => stat.value.length > 0 && stat.label.length > 0);
	return {
		title: values.title.trim(),
		subtitle: values.subtitle.trim(),
		students,
		statistics
	};
};

const ensureMinimumRows = (
	values: TopPlacedStudentsFormValues
): TopPlacedStudentsFormValues => ({
	title: values.title,
	subtitle: values.subtitle,
	students:
		values.students.length > 0 ? values.students : [createEmptyStudent()],
	statistics:
		values.statistics.length > 0 ? values.statistics : [createEmptyStatistic()]
});

type TopPlacedStudentsFormProps = {
	initialValues: TopPlacedStudentsFormValues;
	pageSlug: string;
	onChange?: (data: TopPlacedStudentsData) => void;
};

export default function TopPlacedStudentsForm({
	initialValues,
	pageSlug,
	onChange
}: TopPlacedStudentsFormProps) {
	const defaults = useMemo(
		() => ensureMinimumRows(initialValues),
		[initialValues]
	);
	const form = useForm<TopPlacedStudentsFormValues>({
		defaultValues: defaults
	});
	const studentsFieldArray = useFieldArray({
		control: form.control,
		name: 'students'
	});
	const statisticsFieldArray = useFieldArray({
		control: form.control,
		name: 'statistics'
	});
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		onChange?.(toTopPlacedStudentsData(form.getValues()));
		const subscription = form.watch(() => {
			onChange?.(toTopPlacedStudentsData(form.getValues()));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: TopPlacedStudentsFormValues) => {
		setMessage(null);
		const payload = toTopPlacedStudentsData(values);
		startTransition(async () => {
			const result = await updateTopPlacedStudents(pageSlug, payload);
			if (!result.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved');
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<div className='space-y-1.5'>
						<h3 className='text-lg font-semibold text-slate-900'>
							Top Placed Students
						</h3>
						<p className='text-sm text-slate-500'>
							Manage featured placement stories and supporting statistics.
						</p>
					</div>
					<div className='flex items-center gap-2 sm:shrink-0'>
						{message && (
							<span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						)}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving…' : 'Save changes'}
						</Button>
					</div>
				</div>

				<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5'>
					<div className='grid gap-4 sm:grid-cols-2'>
						<FormField
							control={form.control}
							name='title'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Section title</FormLabel>
									<FormControl>
										<Input placeholder='Our Top Achievers' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='subtitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Textarea
											rows={3}
											placeholder='Success stories from the latest batch'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>

				<section className='space-y-4'>
					<div className='flex items-center justify-between gap-3'>
						<div className='text-sm font-semibold text-slate-700 uppercase tracking-wide'>
							Students
						</div>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => studentsFieldArray.append(createEmptyStudent())}
							className='gap-1'>
							<Plus className='h-4 w-4' />
							Add student
						</Button>
					</div>

					<div className='grid gap-4'>
						{studentsFieldArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 shadow-sm transition hover:border-slate-300 hover:shadow'>
								<div className='flex items-start justify-between gap-4'>
									<div className='font-semibold text-slate-700'>
										Student {index + 1}
									</div>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='rounded-full border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600'
										onClick={() => studentsFieldArray.remove(index)}
										disabled={studentsFieldArray.fields.length === 1}>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>

								<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
									<FormField
										control={form.control}
										name={`students.${index}.name` as const}
										rules={{ required: 'Name is required' }}
										render={({ field: nameField }) => (
											<FormItem>
												<FormLabel>Student name</FormLabel>
												<FormControl>
													<Input placeholder='Student name' {...nameField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`students.${index}.company` as const}
										rules={{ required: 'Company is required' }}
										render={({ field: companyField }) => (
											<FormItem>
												<FormLabel>Company</FormLabel>
												<FormControl>
													<Input placeholder='Company name' {...companyField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`students.${index}.package` as const}
										rules={{ required: 'Package is required' }}
										render={({ field: packageField }) => (
											<FormItem>
												<FormLabel>Package</FormLabel>
												<FormControl>
													<Input placeholder='₹20 LPA' {...packageField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='grid gap-4 sm:grid-cols-2'>
									<FormField
										control={form.control}
										name={`students.${index}.branch` as const}
										rules={{ required: 'Branch is required' }}
										render={({ field: branchField }) => (
											<FormItem>
												<FormLabel>Branch</FormLabel>
												<FormControl>
													<Input placeholder='CSE' {...branchField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`students.${index}.year` as const}
										rules={{ required: 'Year is required' }}
										render={({ field: yearField }) => (
											<FormItem>
												<FormLabel>Year</FormLabel>
												<FormControl>
													<Input placeholder='2024' {...yearField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='grid gap-4 sm:grid-cols-2'>
									<FormField
										control={form.control}
										name={`students.${index}.image` as const}
										rules={{ required: 'Profile image is required' }}
										render={({ field: imageField }) => (
											<FormItem>
												<FormLabel>Profile image URL</FormLabel>
												<FormControl>
													<Input placeholder='https://...' {...imageField} />
												</FormControl>
												<div className='flex flex-wrap gap-2 pt-2'>
													<CloudinaryUploadButton
														buttonText='Upload image'
														onUpload={url =>
															form.setValue(
																`students.${index}.image` as const,
																url,
																{
																	shouldDirty: true
																}
															)
														}
													/>
													<Button
														type='button'
														variant='ghost'
														size='sm'
														className='text-slate-500 hover:text-slate-700'
														onClick={() => imageField.onChange('')}>
														Clear
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`students.${index}.companyLogo` as const}
										rules={{ required: 'Company logo is required' }}
										render={({ field: companyLogoField }) => (
											<FormItem>
												<FormLabel>Company logo URL</FormLabel>
												<FormControl>
													<Input
														placeholder='https://...'
														{...companyLogoField}
													/>
												</FormControl>
												<div className='flex flex-wrap gap-2 pt-2'>
													<CloudinaryUploadButton
														buttonText='Upload logo'
														onUpload={url =>
															form.setValue(
																`students.${index}.companyLogo` as const,
																url,
																{
																	shouldDirty: true
																}
															)
														}
													/>
													<Button
														type='button'
														variant='ghost'
														size='sm'
														className='text-slate-500 hover:text-slate-700'
														onClick={() => companyLogoField.onChange('')}>
														Clear
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						))}
					</div>
				</section>

				<section className='space-y-4'>
					<div className='flex items-center justify-between gap-3'>
						<div className='text-sm font-semibold text-slate-700 uppercase tracking-wide'>
							Headline statistics
						</div>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() =>
								statisticsFieldArray.append(createEmptyStatistic())
							}
							className='gap-1'>
							<Plus className='h-4 w-4' />
							Add statistic
						</Button>
					</div>

					<div className='grid gap-4'>
						{statisticsFieldArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 shadow-sm transition hover:border-slate-300 hover:shadow'>
								<div className='flex items-start justify-between gap-4'>
									<span className='text-sm font-semibold text-slate-700'>
										Statistic {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='rounded-full border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600'
										onClick={() => statisticsFieldArray.remove(index)}
										disabled={statisticsFieldArray.fields.length === 1}>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>

								<div className='grid gap-4 sm:grid-cols-2'>
									<FormField
										control={form.control}
										name={`statistics.${index}.value` as const}
										rules={{ required: 'Value is required' }}
										render={({ field: valueField }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input placeholder='100+' {...valueField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`statistics.${index}.label` as const}
										rules={{ required: 'Label is required' }}
										render={({ field: labelField }) => (
											<FormItem>
												<FormLabel>Label</FormLabel>
												<FormControl>
													<Input placeholder='Dream offers' {...labelField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						))}
					</div>
				</section>
			</form>
		</Form>
	);
}
