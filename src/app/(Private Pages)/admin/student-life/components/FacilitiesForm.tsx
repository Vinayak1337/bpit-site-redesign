'use client';

import { useEffect, useState, useTransition } from 'react';
import {
	useForm,
	useFieldArray,
	type Control,
	type UseFormRegister,
	type UseFormWatch,
	type UseFormSetValue
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateCampusFacilities,
	type CampusFacilitiesData
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
	initialData: CampusFacilitiesData;
	onChange?: (data: CampusFacilitiesData) => void;
	visibleSections?: Array<'header' | 'sections'>;
}

function FacilityItems({
	nestIndex,
	control,
	register,
	watch,
	setValue
}: {
	nestIndex: number;
	control: Control<CampusFacilitiesData>;
	register: UseFormRegister<CampusFacilitiesData>;
	watch: UseFormWatch<CampusFacilitiesData>;
	setValue: UseFormSetValue<CampusFacilitiesData>;
}) {
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: `sections.${nestIndex}.items` as const
	});

	return (
		<div className='flex flex-col gap-3'>
			<p className='text-sm font-medium text-slate-700'>Facility items</p>
			<AdminItemList>
				{fields.map((field, k) => {
					const image = watch(`sections.${nestIndex}.items.${k}.image`);
					return (
						<AdminItemCard
							key={field.id}
							index={k}
							total={fields.length}
							title={
								watch(`sections.${nestIndex}.items.${k}.title`) || `Item ${k + 1}`
							}
							onMove={d => move(k, k + d)}
							onRemove={() => remove(k)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										{...register(
											`sections.${nestIndex}.items.${k}.title` as const
										)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Input
										{...register(
											`sections.${nestIndex}.items.${k}.icon` as const
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Image'>
								<Input
									placeholder='Image URL'
									{...register(
										`sections.${nestIndex}.items.${k}.image` as const
									)}
								/>
								<div className='mt-2'>
									<UploadButton
										onUpload={url =>
											setValue(
												`sections.${nestIndex}.items.${k}.image`,
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
											alt='Facility preview'
											className='h-full w-full object-cover'
										/>
									</div>
								)}
							</AdminField>
							<AdminField label='Description'>
								<Textarea
									rows={2}
									{...register(
										`sections.${nestIndex}.items.${k}.description` as const
									)}
								/>
							</AdminField>
							<AdminField label='Features' hint='Comma separated.'>
								<Input
									value={
										(
											watch(
												`sections.${nestIndex}.items.${k}.features`
											) as string[] | undefined
										)?.join(', ') || ''
									}
									onChange={event =>
										setValue(
											`sections.${nestIndex}.items.${k}.features`,
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
			{fields.length === 0 && <AdminEmptyState title='No items yet' />}
			<AddRowButton
				onClick={() =>
					append({
						title: 'New Item',
						description: '',
						icon: 'Building2',
						image: '',
						features: []
					})
				}>
				Add item
			</AddRowButton>
		</div>
	);
}

export default function FacilitiesForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<CampusFacilitiesData>({ defaultValues: initialData });
	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'sections'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange?.(values as CampusFacilitiesData);
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
			const result = await updateCampusFacilities(
				'student-life-campus-facilities',
				values
			);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: result.error ?? 'Save failed' }
			);
		});
	});

	const showSection = (section: 'header' | 'sections') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('header') && (
				<AdminFormSection
					title='Page header'
					description='Title and intro for the facilities page.'>
					<AdminField label='Page title' htmlFor='fc-title'>
						<Input id='fc-title' {...form.register('title')} />
					</AdminField>
					<AdminField label='Description' htmlFor='fc-desc'>
						<Textarea id='fc-desc' rows={3} {...form.register('description')} />
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('sections') && (
				<AdminFormSection title='Facility sections'>
					<AdminItemList>
						{fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fields.length}
								title={
									form.watch(`sections.${index}.title`) ||
									`Section ${index + 1}`
								}
								onMove={d => move(index, index + d)}
								onRemove={() => remove(index)}>
								<AdminField label='Section title'>
									<Input
										{...form.register(`sections.${index}.title` as const)}
									/>
								</AdminField>
								<FacilityItems
									nestIndex={index}
									control={form.control}
									register={form.register}
									watch={form.watch}
									setValue={form.setValue}
								/>
							</AdminItemCard>
						))}
					</AdminItemList>
					{fields.length === 0 && <AdminEmptyState title='No sections yet' />}
					<AddRowButton
						onClick={() => append({ title: 'New Section', items: [] })}>
						Add section
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
