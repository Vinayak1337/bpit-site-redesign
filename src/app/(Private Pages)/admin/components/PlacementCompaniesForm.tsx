'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { updatePlacementCompanies } from '@/app/(Private Pages)/actions/placement';
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

type CompanyFormValue = { id: string; name: string; logo: string };
type StatisticFormValue = { id: string; value: string; label: string };

type PlacementCompaniesFormValues = {
	title: string;
	subtitle: string;
	companies: CompanyFormValue[];
	statistics: StatisticFormValue[];
};

const createEmptyCompany = (): CompanyFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	logo: ''
});
const createEmptyStatistic = (): StatisticFormValue => ({
	id: crypto.randomUUID(),
	value: '',
	label: ''
});

const toPlacementCompaniesData = (
	values: PlacementCompaniesFormValues
): PlacementCompaniesData => ({
	title: values.title.trim(),
	subtitle: values.subtitle.trim(),
	companies: values.companies
		.map(c => ({ name: c.name.trim(), logo: c.logo.trim() }))
		.filter(c => c.name.length > 0 && c.logo.length > 0),
	statistics: values.statistics
		.map(s => ({ value: s.value.trim(), label: s.label.trim() }))
		.filter(s => s.value.length > 0 && s.label.length > 0)
});

type Props = {
	initialValues: PlacementCompaniesFormValues;
	pageSlug: string;
	onChange?: (data: PlacementCompaniesData) => void;
};

export default function PlacementCompaniesForm({
	initialValues,
	pageSlug,
	onChange
}: Props) {
	const defaults = useMemo<PlacementCompaniesFormValues>(
		() => ({
			title: initialValues.title,
			subtitle: initialValues.subtitle,
			companies:
				initialValues.companies.length > 0
					? initialValues.companies
					: [createEmptyCompany()],
			statistics:
				initialValues.statistics.length > 0
					? initialValues.statistics
					: [createEmptyStatistic()]
		}),
		[initialValues]
	);
	const form = useForm<PlacementCompaniesFormValues>({
		defaultValues: defaults
	});
	const companiesArr = useFieldArray({
		control: form.control,
		name: 'companies'
	});
	const statsArr = useFieldArray({
		control: form.control,
		name: 'statistics'
	});
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	useEffect(() => {
		onChange?.(toPlacementCompaniesData(form.getValues()));
		const sub = form.watch(() => {
			onChange?.(toPlacementCompaniesData(form.getValues()));
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
			const result = await updatePlacementCompanies(
				pageSlug,
				toPlacementCompaniesData(values)
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
				title='Placement companies'
				description='Recruiter logos and headline statistics shown on the public site.'>
				<AdminFieldGrid>
					<AdminField
						label='Section title'
						error={form.formState.errors.title?.message}>
						<Input
							placeholder='Our Placement Partners'
							{...form.register('title', { required: 'Title is required' })}
						/>
					</AdminField>
					<AdminField label='Subtitle'>
						<Textarea
							rows={3}
							placeholder='Leading organisations hiring from BPIT'
							className='resize-none'
							{...form.register('subtitle')}
						/>
					</AdminField>
				</AdminFieldGrid>
			</AdminFormSection>

			<AdminFormSection title='Companies'>
				<AdminItemList>
					{companiesArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={companiesArr.fields.length}
							title={
								form.watch(`companies.${index}.name`) ||
								`Company ${index + 1}`
							}
							onMove={d => companiesArr.move(index, index + d)}
							onRemove={
								companiesArr.fields.length > 1
									? () => companiesArr.remove(index)
									: undefined
							}>
							<AdminFieldGrid>
								<AdminField
									label='Company name'
									error={
										form.formState.errors.companies?.[index]?.name?.message
									}>
									<Input
										placeholder='Company name'
										{...form.register(`companies.${index}.name` as const, {
											required: 'Name is required'
										})}
									/>
								</AdminField>
								<AdminField
									label='Logo URL'
									error={
										form.formState.errors.companies?.[index]?.logo?.message
									}>
									<Input
										placeholder='https://…'
										{...form.register(`companies.${index}.logo` as const, {
											required: 'Logo URL is required'
										})}
									/>
									<div className='mt-2 flex flex-wrap gap-2'>
										<CloudinaryUploadButton
											buttonText='Upload logo'
											onUpload={url =>
												form.setValue(
													`companies.${index}.logo` as const,
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
													`companies.${index}.logo` as const,
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
				{companiesArr.fields.length === 0 && (
					<AdminEmptyState title='No companies yet' />
				)}
				<AddRowButton onClick={() => companiesArr.append(createEmptyCompany())}>
					Add company
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
										placeholder='Partner companies'
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
