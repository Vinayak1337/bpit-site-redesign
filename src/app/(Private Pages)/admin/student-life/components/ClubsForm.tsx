'use client';

import { useEffect, useState, useTransition } from 'react';
import {
	useForm,
	useFieldArray,
	type Control,
	type UseFormWatch,
	type UseFormSetValue,
	type UseFormRegister
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateClubsSocieties,
	type ClubsSocietiesData
} from '@/app/(Private Pages)/actions/student-life';
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

interface Props {
	initialData: ClubsSocietiesData;
	onChange?: (data: ClubsSocietiesData) => void;
	visibleSections?: Array<'header' | 'categories'>;
}

function ClubsList({
	categoryIndex,
	control,
	register,
	watch,
	setValue
}: {
	categoryIndex: number;
	control: Control<ClubsSocietiesData>;
	register: UseFormRegister<ClubsSocietiesData>;
	watch: UseFormWatch<ClubsSocietiesData>;
	setValue: UseFormSetValue<ClubsSocietiesData>;
}) {
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: `categories.${categoryIndex}.clubs` as const
	});

	return (
		<div className='flex flex-col gap-3'>
			<p className='text-sm font-medium text-slate-700'>Clubs in this category</p>
			<AdminItemList>
				{fields.map((field, k) => {
					const image = watch(`categories.${categoryIndex}.clubs.${k}.image`);
					return (
						<AdminItemCard
							key={field.id}
							index={k}
							total={fields.length}
							title={
								watch(`categories.${categoryIndex}.clubs.${k}.name`) ||
								`Club ${k + 1}`
							}
							onMove={d => move(k, k + d)}
							onRemove={() => remove(k)}>
							<AdminFieldGrid>
								<AdminField label='Name'>
									<Input
										placeholder='Club Name'
										{...register(
											`categories.${categoryIndex}.clubs.${k}.name` as const
										)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Input
										placeholder='Users'
										{...register(
											`categories.${categoryIndex}.clubs.${k}.icon` as const
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Image'>
								<Input
									placeholder='Image URL'
									{...register(
										`categories.${categoryIndex}.clubs.${k}.image` as const
									)}
								/>
								<div className='mt-2'>
									<UploadButton
										onUpload={url =>
											setValue(
												`categories.${categoryIndex}.clubs.${k}.image`,
												url,
												{ shouldDirty: true }
											)
										}
										buttonText='Upload image'
									/>
								</div>
								{image && (
									<div className='mt-3 h-16 w-16 overflow-hidden rounded border border-slate-200'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={image}
											alt='Club preview'
											className='h-full w-full object-cover'
										/>
									</div>
								)}
							</AdminField>
							<AdminField label='Description'>
								<Textarea
									rows={2}
									{...register(
										`categories.${categoryIndex}.clubs.${k}.description` as const
									)}
								/>
							</AdminField>
							<AdminField
								label='Activities'
								hint='Comma separated (Hackathons, Workshops, …)'>
								<Input
									value={
										(
											watch(
												`categories.${categoryIndex}.clubs.${k}.activities`
											) as string[] | undefined
										)?.join(', ') || ''
									}
									onChange={event =>
										setValue(
											`categories.${categoryIndex}.clubs.${k}.activities`,
											event.target.value
												.split(',')
												.map(s => s.trim())
												.filter(Boolean),
											{ shouldDirty: true }
										)
									}
								/>
							</AdminField>
						</AdminItemCard>
					);
				})}
			</AdminItemList>
			{fields.length === 0 && <AdminEmptyState title='No clubs in this category' />}
			<AddRowButton
				onClick={() =>
					append({
						name: 'New Club',
						description: '',
						icon: 'Users',
						image: '',
						activities: []
					})
				}>
				Add club
			</AddRowButton>
		</div>
	);
}

export default function ClubsForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<ClubsSocietiesData>({ defaultValues: initialData });
	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'categories'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange?.(values as ClubsSocietiesData);
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
			const result = await updateClubsSocieties(
				'student-life-clubs-and-societies',
				values
			);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: result.error ?? 'Save failed' }
			);
		});
	});

	const showSection = (section: 'header' | 'categories') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('header') && (
				<AdminFormSection
					title='Page header'
					description='Title and intro for the clubs & societies page.'>
					<AdminField label='Page title' htmlFor='cl-title'>
						<Input id='cl-title' {...form.register('title')} />
					</AdminField>
					<AdminField label='Description' htmlFor='cl-desc'>
						<Textarea id='cl-desc' rows={3} {...form.register('description')} />
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('categories') && (
				<AdminFormSection title='Club categories'>
					<AdminItemList>
						{fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fields.length}
								title={
									form.watch(`categories.${index}.title`) ||
									`Category ${index + 1}`
								}
								onMove={d => move(index, index + d)}
								onRemove={() => remove(index)}>
								<AdminField label='Category title'>
									<Input
										{...form.register(`categories.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										{...form.register(`categories.${index}.description` as const)}
									/>
								</AdminField>
								<ClubsList
									categoryIndex={index}
									control={form.control}
									register={form.register}
									watch={form.watch}
									setValue={form.setValue}
								/>
							</AdminItemCard>
						))}
					</AdminItemList>
					{fields.length === 0 && <AdminEmptyState title='No categories yet' />}
					<AddRowButton
						onClick={() =>
							append({ title: 'New Category', description: '', clubs: [] })
						}>
						Add category
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
