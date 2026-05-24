'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateInternalComplaints,
	type InternalComplaintsData
} from '@/app/(Private Pages)/actions/statutory-committees';
import { useEffect, useState, useTransition } from 'react';
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

const schema = z.object({
	definition: z.object({
		title: z.string().min(1),
		content: z.string().min(1),
		includes: z.array(z.string().min(1))
	}),
	committeeMembers: z.array(
		z.object({
			name: z.string().min(1),
			designation: z.string().min(1),
			department: z.string().min(1),
			phone: z.string().optional(),
			email: z.string().optional()
		})
	),
	procedures: z.array(
		z.object({
			step: z.string().min(1),
			title: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1)
		})
	),
	supportServices: z.array(
		z.object({
			title: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1)
		})
	),
	rightsAndResponsibilities: z.object({
		rights: z.array(z.string().min(1)),
		responsibilities: z.array(z.string().min(1))
	}),
	contactInfo: z.array(
		z.object({
			title: z.string().min(1),
			contact: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1),
			bgColor: z.string().min(1)
		})
	)
});

type FormData = z.infer<typeof schema>;

type Props = {
	initialData: InternalComplaintsData;
	pageSlug: string;
	onChange?: (data: InternalComplaintsData) => void;
	visibleSections?: Array<
		'hero' | 'definition' | 'members' | 'procedures' | 'support' | 'rights' | 'contacts'
	>;
};

export default function InternalComplaintsForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const restData = { ...initialData };
	delete (restData as Partial<InternalComplaintsData>).hero;

	const { register, control, handleSubmit, watch } = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: restData as FormData
	});

	const includesList = useFieldArray({
		control,
		name: 'definition.includes' as never
	});
	const members = useFieldArray({ control, name: 'committeeMembers' });
	const procedures = useFieldArray({ control, name: 'procedures' });
	const supportServices = useFieldArray({ control, name: 'supportServices' });
	const rights = useFieldArray({
		control,
		name: 'rightsAndResponsibilities.rights' as never
	});
	const responsibilities = useFieldArray({
		control,
		name: 'rightsAndResponsibilities.responsibilities' as never
	});
	const contactInfo = useFieldArray({ control, name: 'contactInfo' });

	const watchedData = watch();
	useEffect(() => {
		onChange?.({ ...initialData, ...watchedData } as InternalComplaintsData);
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [watchedData, onChange, initialData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const showSection = (
		section:
			| 'hero'
			| 'definition'
			| 'members'
			| 'procedures'
			| 'support'
			| 'rights'
			| 'contacts'
	) => !visibleSections || visibleSections.includes(section);

	const onSubmit = handleSubmit(data => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateInternalComplaints(
					{ ...initialData, ...data },
					pageSlug
				);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error(error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			{showSection('hero') && (
				<AdminFormSection title='Hero'>
					<p className='text-sm text-slate-500'>
						Hero content is edited from the internal complaints hero section.
					</p>
				</AdminFormSection>
			)}

			{showSection('definition') && (
				<AdminFormSection
					title='Definition & scope'
					description='Headline copy and the list of behaviors that fall under the committee.'>
					<AdminField label='Title'>
						<Input {...register('definition.title')} />
					</AdminField>
					<AdminField label='Content'>
						<Textarea rows={4} {...register('definition.content')} />
					</AdminField>
					<div className='flex flex-col gap-3'>
						<p className='text-sm font-medium text-slate-700'>Includes points</p>
						<AdminItemList>
							{includesList.fields.map((field, index) => (
								<AdminItemCard
									key={field.id}
									index={index}
									total={includesList.fields.length}
									title={`Point ${index + 1}`}
									onMove={d => includesList.move(index, index + d)}
									onRemove={() => includesList.remove(index)}>
									<AdminField label={`Point ${index + 1}`} className='[&_label]:sr-only'>
										<Input
											{...register(`definition.includes.${index}` as const)}
										/>
									</AdminField>
								</AdminItemCard>
							))}
						</AdminItemList>
						{includesList.fields.length === 0 && (
							<AdminEmptyState title='No points yet' />
						)}
						<AddRowButton onClick={() => includesList.append('' as never)}>
							Add point
						</AddRowButton>
					</div>
				</AdminFormSection>
			)}

			{showSection('members') && (
				<AdminFormSection title='Committee members'>
					<AdminItemList>
						{members.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={members.fields.length}
								title={
									watch(`committeeMembers.${index}.name`) ||
									`Member ${index + 1}`
								}
								onMove={d => members.move(index, index + d)}
								onRemove={() => members.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Name'>
										<Input
											{...register(`committeeMembers.${index}.name` as const)}
										/>
									</AdminField>
									<AdminField label='Designation'>
										<Input
											{...register(
												`committeeMembers.${index}.designation` as const
											)}
										/>
									</AdminField>
									<AdminField label='Department'>
										<Input
											{...register(
												`committeeMembers.${index}.department` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminFieldGrid>
									<AdminField label='Phone'>
										<Input
											{...register(`committeeMembers.${index}.phone` as const)}
										/>
									</AdminField>
									<AdminField label='Email'>
										<Input
											{...register(`committeeMembers.${index}.email` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
							</AdminItemCard>
						))}
					</AdminItemList>
					{members.fields.length === 0 && (
						<AdminEmptyState title='No members yet' />
					)}
					<AddRowButton
						onClick={() =>
							members.append({ name: '', designation: '', department: '' })
						}>
						Add member
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('procedures') && (
				<AdminFormSection title='Procedures'>
					<AdminItemList>
						{procedures.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={procedures.fields.length}
								title={
									watch(`procedures.${index}.title`) || `Step ${index + 1}`
								}
								subtitle={watch(`procedures.${index}.step`) || undefined}
								onMove={d => procedures.move(index, index + d)}
								onRemove={() => procedures.remove(index)}>
								<AdminFieldGrid cols={3}>
									<AdminField label='Step #'>
										<Input {...register(`procedures.${index}.step` as const)} />
									</AdminField>
									<AdminField label='Title' className='md:col-span-2'>
										<Input {...register(`procedures.${index}.title` as const)} />
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										{...register(`procedures.${index}.description` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{procedures.fields.length === 0 && (
						<AdminEmptyState title='No procedures yet' />
					)}
					<AddRowButton
						onClick={() =>
							procedures.append({
								step: '',
								title: '',
								description: '',
								icon: 'FileText',
								iconColor: 'text-blue-600'
							})
						}>
						Add step
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('support') && (
				<AdminFormSection title='Support services'>
					<AdminItemList>
						{supportServices.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={supportServices.fields.length}
								title={
									watch(`supportServices.${index}.title`) ||
									`Service ${index + 1}`
								}
								onMove={d => supportServices.move(index, index + d)}
								onRemove={() => supportServices.remove(index)}>
								<AdminField label='Title'>
									<Input
										{...register(`supportServices.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										{...register(
											`supportServices.${index}.description` as const
										)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{supportServices.fields.length === 0 && (
						<AdminEmptyState title='No services yet' />
					)}
					<AddRowButton
						onClick={() =>
							supportServices.append({
								title: '',
								description: '',
								icon: 'Heart',
								iconColor: 'text-pink-600'
							})
						}>
						Add service
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('rights') && (
				<>
					<AdminFormSection title='Rights'>
						<AdminItemList>
							{rights.fields.map((field, index) => (
								<AdminItemCard
									key={field.id}
									index={index}
									total={rights.fields.length}
									title={`Right ${index + 1}`}
									onMove={d => rights.move(index, index + d)}
									onRemove={() => rights.remove(index)}>
									<AdminField label={`Right ${index + 1}`} className='[&_label]:sr-only'>
										<Input
											{...register(
												`rightsAndResponsibilities.rights.${index}` as const
											)}
										/>
									</AdminField>
								</AdminItemCard>
							))}
						</AdminItemList>
						{rights.fields.length === 0 && (
							<AdminEmptyState title='No rights yet' />
						)}
						<AddRowButton onClick={() => rights.append('' as never)}>
							Add right
						</AddRowButton>
					</AdminFormSection>

					<AdminFormSection title='Responsibilities'>
						<AdminItemList>
							{responsibilities.fields.map((field, index) => (
								<AdminItemCard
									key={field.id}
									index={index}
									total={responsibilities.fields.length}
									title={`Responsibility ${index + 1}`}
									onMove={d => responsibilities.move(index, index + d)}
									onRemove={() => responsibilities.remove(index)}>
									<AdminField
										label={`Responsibility ${index + 1}`}
										className='[&_label]:sr-only'>
										<Input
											{...register(
												`rightsAndResponsibilities.responsibilities.${index}` as const
											)}
										/>
									</AdminField>
								</AdminItemCard>
							))}
						</AdminItemList>
						{responsibilities.fields.length === 0 && (
							<AdminEmptyState title='No responsibilities yet' />
						)}
						<AddRowButton
							onClick={() => responsibilities.append('' as never)}>
							Add responsibility
						</AddRowButton>
					</AdminFormSection>
				</>
			)}

			{showSection('contacts') && (
				<AdminFormSection title='Contact info'>
					<AdminItemList>
						{contactInfo.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={contactInfo.fields.length}
								title={
									watch(`contactInfo.${index}.title`) || `Contact ${index + 1}`
								}
								subtitle={watch(`contactInfo.${index}.contact`) || undefined}
								onMove={d => contactInfo.move(index, index + d)}
								onRemove={() => contactInfo.remove(index)}>
								<AdminField label='Title'>
									<Input
										{...register(`contactInfo.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Contact'>
									<Input
										{...register(`contactInfo.${index}.contact` as const)}
									/>
								</AdminField>
								<AdminField label='Description'>
									<Input
										{...register(`contactInfo.${index}.description` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{contactInfo.fields.length === 0 && (
						<AdminEmptyState title='No contacts yet' />
					)}
					<AddRowButton
						onClick={() =>
							contactInfo.append({
								title: '',
								contact: '',
								description: '',
								icon: 'Phone',
								iconColor: 'text-purple-600',
								bgColor: 'bg-purple-100'
							})
						}>
						Add contact
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
