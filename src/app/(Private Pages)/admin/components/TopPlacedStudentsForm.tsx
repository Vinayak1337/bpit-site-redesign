'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { updateTopPlacedStudents } from '@/app/(Private Pages)/actions/placement';
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
): TopPlacedStudentsData => ({
	title: values.title.trim(),
	subtitle: values.subtitle.trim(),
	students: values.students
		.map((s, index) => ({
			id: Number.parseInt(s.id, 10) || index + 1,
			name: s.name.trim(),
			company: s.company.trim(),
			package: s.package.trim(),
			branch: s.branch.trim(),
			year: s.year.trim(),
			image: s.image.trim(),
			companyLogo: s.companyLogo.trim()
		}))
		.filter(
			s =>
				s.name.length > 0 &&
				s.company.length > 0 &&
				s.package.length > 0 &&
				s.image.length > 0 &&
				s.companyLogo.length > 0
		),
	statistics: values.statistics
		.map(s => ({ value: s.value.trim(), label: s.label.trim() }))
		.filter(s => s.value.length > 0 && s.label.length > 0)
});

type Props = {
	initialValues: TopPlacedStudentsFormValues;
	pageSlug: string;
	onChange?: (data: TopPlacedStudentsData) => void;
};

export default function TopPlacedStudentsForm({
	initialValues,
	pageSlug,
	onChange
}: Props) {
	const defaults = useMemo<TopPlacedStudentsFormValues>(
		() => ({
			title: initialValues.title,
			subtitle: initialValues.subtitle,
			students:
				initialValues.students.length > 0
					? initialValues.students
					: [createEmptyStudent()],
			statistics:
				initialValues.statistics.length > 0
					? initialValues.statistics
					: [createEmptyStatistic()]
		}),
		[initialValues]
	);
	const form = useForm<TopPlacedStudentsFormValues>({ defaultValues: defaults });
	const studentsArr = useFieldArray({
		control: form.control,
		name: 'students'
	});
	const statsArr = useFieldArray({
		control: form.control,
		name: 'statistics'
	});
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	useEffect(() => {
		onChange?.(toTopPlacedStudentsData(form.getValues()));
		const sub = form.watch(() => {
			onChange?.(toTopPlacedStudentsData(form.getValues()));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			const result = await updateTopPlacedStudents(
				pageSlug,
				toTopPlacedStudentsData(values)
			);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Top placed students'
				description='Featured placement stories and supporting statistics.'>
				<AdminFieldGrid>
					<AdminField
						label='Section title'
						error={form.formState.errors.title?.message}>
						<Input
							placeholder='Our Top Achievers'
							{...form.register('title', { required: 'Title is required' })}
						/>
					</AdminField>
					<AdminField label='Subtitle'>
						<Textarea
							rows={3}
							placeholder='Success stories from the latest batch'
							className='resize-none'
							{...form.register('subtitle')}
						/>
					</AdminField>
				</AdminFieldGrid>
			</AdminFormSection>

			<AdminFormSection title='Students'>
				<AdminItemList>
					{studentsArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={studentsArr.fields.length}
							title={
								form.watch(`students.${index}.name`) ||
								`Student ${index + 1}`
							}
							subtitle={form.watch(`students.${index}.company`) || undefined}
							onMove={d => studentsArr.move(index, index + d)}
							onRemove={
								studentsArr.fields.length > 1
									? () => studentsArr.remove(index)
									: undefined
							}>
							<AdminFieldGrid cols={3}>
								<AdminField
									label='Student name'
									error={
										form.formState.errors.students?.[index]?.name?.message
									}>
									<Input
										placeholder='Student name'
										{...form.register(`students.${index}.name` as const, {
											required: 'Name is required'
										})}
									/>
								</AdminField>
								<AdminField
									label='Company'
									error={
										form.formState.errors.students?.[index]?.company?.message
									}>
									<Input
										placeholder='Company name'
										{...form.register(`students.${index}.company` as const, {
											required: 'Company is required'
										})}
									/>
								</AdminField>
								<AdminField
									label='Package'
									error={
										form.formState.errors.students?.[index]?.package?.message
									}>
									<Input
										placeholder='₹20 LPA'
										{...form.register(`students.${index}.package` as const, {
											required: 'Package is required'
										})}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminFieldGrid>
								<AdminField
									label='Branch'
									error={
										form.formState.errors.students?.[index]?.branch?.message
									}>
									<Input
										placeholder='CSE'
										{...form.register(`students.${index}.branch` as const, {
											required: 'Branch is required'
										})}
									/>
								</AdminField>
								<AdminField
									label='Year'
									error={form.formState.errors.students?.[index]?.year?.message}>
									<Input
										placeholder='2024'
										{...form.register(`students.${index}.year` as const, {
											required: 'Year is required'
										})}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminFieldGrid>
								<AdminField
									label='Profile image URL'
									error={
										form.formState.errors.students?.[index]?.image?.message
									}>
									<Input
										placeholder='https://…'
										{...form.register(`students.${index}.image` as const, {
											required: 'Profile image is required'
										})}
									/>
									<div className='mt-2 flex flex-wrap gap-2'>
										<CloudinaryUploadButton
											buttonText='Upload image'
											onUpload={url =>
												form.setValue(
													`students.${index}.image` as const,
													url,
													{ shouldDirty: true }
												)
											}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() =>
												form.setValue(
													`students.${index}.image` as const,
													'',
													{ shouldDirty: true }
												)
											}>
											Clear
										</Button>
									</div>
								</AdminField>
								<AdminField
									label='Company logo URL'
									error={
										form.formState.errors.students?.[index]?.companyLogo
											?.message
									}>
									<Input
										placeholder='https://…'
										{...form.register(
											`students.${index}.companyLogo` as const,
											{ required: 'Company logo is required' }
										)}
									/>
									<div className='mt-2 flex flex-wrap gap-2'>
										<CloudinaryUploadButton
											buttonText='Upload logo'
											onUpload={url =>
												form.setValue(
													`students.${index}.companyLogo` as const,
													url,
													{ shouldDirty: true }
												)
											}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() =>
												form.setValue(
													`students.${index}.companyLogo` as const,
													'',
													{ shouldDirty: true }
												)
											}>
											Clear
										</Button>
									</div>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{studentsArr.fields.length === 0 && (
					<AdminEmptyState title='No students yet' />
				)}
				<AddRowButton onClick={() => studentsArr.append(createEmptyStudent())}>
					Add student
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Headline statistics'>
				<AdminItemList>
					{statsArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={statsArr.fields.length}
							title={
								form.watch(`statistics.${index}.label`) ||
								`Statistic ${index + 1}`
							}
							onMove={d => statsArr.move(index, index + d)}
							onRemove={
								statsArr.fields.length > 1
									? () => statsArr.remove(index)
									: undefined
							}>
							<AdminFieldGrid>
								<AdminField
									label='Value'
									error={
										form.formState.errors.statistics?.[index]?.value?.message
									}>
									<Input
										placeholder='100+'
										{...form.register(`statistics.${index}.value` as const, {
											required: 'Value is required'
										})}
									/>
								</AdminField>
								<AdminField
									label='Label'
									error={
										form.formState.errors.statistics?.[index]?.label?.message
									}>
									<Input
										placeholder='Dream offers'
										{...form.register(`statistics.${index}.label` as const, {
											required: 'Label is required'
										})}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{statsArr.fields.length === 0 && (
					<AdminEmptyState title='No statistics yet' />
				)}
				<AddRowButton onClick={() => statsArr.append(createEmptyStatistic())}>
					Add statistic
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
