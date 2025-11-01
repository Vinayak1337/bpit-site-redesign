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
import { updatePlacementCompanies } from '@/app/(Private Pages)/actions/placement';
import { Plus, Trash2 } from 'lucide-react';

type CompanyFormValue = {
	id: string;
	name: string;
	logo: string;
};

type StatisticFormValue = {
	id: string;
	value: string;
	label: string;
};

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
): PlacementCompaniesData => {
	const companies = values.companies
		.map(company => ({
			name: company.name.trim(),
			logo: company.logo.trim()
		}))
		.filter(company => company.name.length > 0 && company.logo.length > 0);
	const statistics = values.statistics
		.map(stat => ({
			value: stat.value.trim(),
			label: stat.label.trim()
		}))
		.filter(stat => stat.value.length > 0 && stat.label.length > 0);
	return {
		title: values.title.trim(),
		subtitle: values.subtitle.trim(),
		companies,
		statistics
	};
};

const ensureMinimumRows = (
	values: PlacementCompaniesFormValues
): PlacementCompaniesFormValues => ({
	title: values.title,
	subtitle: values.subtitle,
	companies:
		values.companies.length > 0 ? values.companies : [createEmptyCompany()],
	statistics:
		values.statistics.length > 0 ? values.statistics : [createEmptyStatistic()]
});

type PlacementCompaniesFormProps = {
	initialValues: PlacementCompaniesFormValues;
	pageSlug: string;
	onChange?: (data: PlacementCompaniesData) => void;
};

export default function PlacementCompaniesForm({
	initialValues,
	pageSlug,
	onChange
}: PlacementCompaniesFormProps) {
	const defaults = useMemo(
		() => ensureMinimumRows(initialValues),
		[initialValues]
	);
	const form = useForm<PlacementCompaniesFormValues>({
		defaultValues: defaults
	});
	const companiesFieldArray = useFieldArray({
		control: form.control,
		name: 'companies'
	});
	const statisticsFieldArray = useFieldArray({
		control: form.control,
		name: 'statistics'
	});
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		onChange?.(toPlacementCompaniesData(form.getValues()));
		const subscription = form.watch(() => {
			onChange?.(toPlacementCompaniesData(form.getValues()));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: PlacementCompaniesFormValues) => {
		setMessage(null);
		const payload = toPlacementCompaniesData(values);
		startTransition(async () => {
			const result = await updatePlacementCompanies(pageSlug, payload);
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
							Placement Companies
						</h3>
						<p className='text-sm text-slate-500'>
							Curate recruiter logos and headline statistics shown on the public
							site.
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
										<Input placeholder='Our Placement Partners' {...field} />
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
											placeholder='Leading organisations hiring from BPIT'
											className='resize-none'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</section>

				<section className='space-y-4'>
					<div className='flex items-center justify-between gap-3'>
						<div className='text-sm font-semibold text-slate-700 uppercase tracking-wide'>
							Companies
						</div>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => companiesFieldArray.append(createEmptyCompany())}
							className='gap-1'>
							<Plus className='h-4 w-4' />
							Add company
						</Button>
					</div>

					<div className='grid gap-4'>
						{companiesFieldArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 shadow-sm transition hover:border-slate-300 hover:shadow'>
								<div className='flex items-start justify-between gap-4'>
									<div className='font-semibold text-slate-700'>
										Company {index + 1}
									</div>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='rounded-full border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600'
										onClick={() => companiesFieldArray.remove(index)}
										disabled={companiesFieldArray.fields.length === 1}>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>

								<div className='grid gap-4 sm:grid-cols-2'>
									<FormField
										control={form.control}
										name={`companies.${index}.name` as const}
										rules={{ required: 'Name is required' }}
										render={({ field: nameField }) => (
											<FormItem>
												<FormLabel>Company name</FormLabel>
												<FormControl>
													<Input placeholder='Company name' {...nameField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`companies.${index}.logo` as const}
										rules={{ required: 'Logo URL is required' }}
										render={({ field: logoField }) => (
											<FormItem>
												<FormLabel>Logo URL</FormLabel>
												<FormControl>
													<Input placeholder='https://...' {...logoField} />
												</FormControl>
												<div className='flex flex-wrap gap-2 pt-2'>
													<CloudinaryUploadButton
														buttonText='Upload logo'
														onUpload={url =>
															form.setValue(
																`companies.${index}.logo` as const,
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
														onClick={() => logoField.onChange('')}>
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
													<Input
														placeholder='Partner companies'
														{...labelField}
													/>
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
