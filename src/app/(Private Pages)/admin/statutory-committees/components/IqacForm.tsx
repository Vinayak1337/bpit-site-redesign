'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateIqac,
	type IqacData
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
	about: z.object({
		title: z.string().min(1, 'Title is required'),
		content: z.array(z.string().min(1, 'Paragraph cannot be empty')),
		vision: z.string().min(1, 'Vision is required'),
		mission: z.string().min(1, 'Mission is required')
	}),
	objectives: z.array(
		z.object({
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			icon: z.string().min(1, 'Icon is required'),
			iconColor: z.string().min(1, 'Icon Color is required')
		})
	),
	functions: z.array(z.string().min(1, 'Function cannot be empty')),
	committeeMembers: z.array(
		z.object({
			name: z.string().min(1, 'Name is required'),
			designation: z.string().min(1, 'Designation is required'),
			department: z.string().min(1, 'Department is required'),
			qualification: z.string().optional()
		})
	),
	initiatives: z.array(
		z.object({
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			icon: z.string().min(1, 'Icon is required'),
			iconColor: z.string().min(1, 'Icon Color is required')
		})
	),
	aqar: z.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(1, 'Description is required'),
		reports: z.array(
			z.object({
				year: z.string().min(1, 'Year is required'),
				title: z.string().min(1, 'Title is required'),
				description: z.string().min(1, 'Description is required'),
				buttonText: z.string().min(1, 'Button Text is required'),
				buttonColor: z.string().min(1, 'Button Color is required')
			})
		)
	})
});

type FormData = z.infer<typeof schema>;

type Props = {
	initialData: IqacData;
	pageSlug: string;
	onChange?: (data: IqacData) => void;
	visibleSections?: Array<
		'about' | 'objectives' | 'functions' | 'members' | 'initiatives' | 'aqar'
	>;
};

export default function IqacForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const restData = { ...initialData };
	delete (restData as Partial<IqacData>).hero;

	const { register, control, handleSubmit, watch } = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: restData as FormData
	});

	const aboutContent = useFieldArray({
		control,
		name: 'about.content' as never
	});
	const objectives = useFieldArray({ control, name: 'objectives' });
	const functions = useFieldArray({ control, name: 'functions' as never });
	const members = useFieldArray({ control, name: 'committeeMembers' });
	const initiatives = useFieldArray({ control, name: 'initiatives' });
	const aqarReports = useFieldArray({ control, name: 'aqar.reports' as never });

	const watchedData = watch();
	useEffect(() => {
		onChange?.({ ...initialData, ...watchedData } as IqacData);
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [watchedData, onChange, initialData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const showSection = (
		section:
			| 'about'
			| 'objectives'
			| 'functions'
			| 'members'
			| 'initiatives'
			| 'aqar'
	) => !visibleSections || visibleSections.includes(section);

	const onSubmit = handleSubmit(data => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateIqac({ ...initialData, ...data }, pageSlug);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error(error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			{showSection('about') && (
				<AdminFormSection
					title='About IQAC'
					description='Identity, vision, mission, and intro paragraphs.'>
					<AdminField label='Title' htmlFor='iq-about-title'>
						<Input id='iq-about-title' {...register('about.title')} />
					</AdminField>
					<AdminField label='Vision statement' htmlFor='iq-vision'>
						<Textarea id='iq-vision' rows={3} {...register('about.vision')} />
					</AdminField>
					<AdminField label='Mission statement' htmlFor='iq-mission'>
						<Textarea id='iq-mission' rows={3} {...register('about.mission')} />
					</AdminField>
					<div className='flex flex-col gap-3'>
						<p className='text-sm font-medium text-slate-700'>
							About content paragraphs
						</p>
						<AdminItemList>
							{aboutContent.fields.map((field, index) => (
								<AdminItemCard
									key={field.id}
									index={index}
									total={aboutContent.fields.length}
									title={`Paragraph ${index + 1}`}
									onMove={d => aboutContent.move(index, index + d)}
									onRemove={() => aboutContent.remove(index)}>
									<AdminField label={`Paragraph ${index + 1}`} className='[&_label]:sr-only'>
										<Textarea
											rows={3}
											{...register(`about.content.${index}` as const)}
										/>
									</AdminField>
								</AdminItemCard>
							))}
						</AdminItemList>
						{aboutContent.fields.length === 0 && (
							<AdminEmptyState title='No paragraphs yet' />
						)}
						<AddRowButton onClick={() => aboutContent.append('' as never)}>
							Add paragraph
						</AddRowButton>
					</div>
				</AdminFormSection>
			)}

			{showSection('objectives') && (
				<AdminFormSection title='Objectives'>
					<AdminItemList>
						{objectives.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={objectives.fields.length}
								title={
									watch(`objectives.${index}.title`) || `Objective ${index + 1}`
								}
								onMove={d => objectives.move(index, index + d)}
								onRemove={() => objectives.remove(index)}>
								<AdminField label='Title'>
									<Input {...register(`objectives.${index}.title` as const)} />
								</AdminField>
								<AdminFieldGrid>
									<AdminField label='Icon'>
										<Input {...register(`objectives.${index}.icon` as const)} />
									</AdminField>
									<AdminField label='Color'>
										<Input
											{...register(`objectives.${index}.iconColor` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										{...register(`objectives.${index}.description` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{objectives.fields.length === 0 && (
						<AdminEmptyState title='No objectives yet' />
					)}
					<AddRowButton
						onClick={() =>
							objectives.append({
								title: '',
								description: '',
								icon: 'Target',
								iconColor: 'text-blue-600'
							})
						}>
						Add objective
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('functions') && (
				<AdminFormSection title='Functions'>
					<AdminItemList>
						{functions.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={functions.fields.length}
								title={`Function ${index + 1}`}
								onMove={d => functions.move(index, index + d)}
								onRemove={() => functions.remove(index)}>
								<AdminField label={`Function ${index + 1}`} className='[&_label]:sr-only'>
									<Input {...register(`functions.${index}` as const)} />
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{functions.fields.length === 0 && (
						<AdminEmptyState title='No functions yet' />
					)}
					<AddRowButton onClick={() => functions.append('' as never)}>
						Add function
					</AddRowButton>
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
								subtitle={
									watch(`committeeMembers.${index}.designation`) || undefined
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
									<AdminField label='Qualification'>
										<Input
											{...register(
												`committeeMembers.${index}.qualification` as const
											)}
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

			{showSection('initiatives') && (
				<AdminFormSection title='Initiatives'>
					<AdminItemList>
						{initiatives.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={initiatives.fields.length}
								title={
									watch(`initiatives.${index}.title`) ||
									`Initiative ${index + 1}`
								}
								onMove={d => initiatives.move(index, index + d)}
								onRemove={() => initiatives.remove(index)}>
								<AdminField label='Title'>
									<Input {...register(`initiatives.${index}.title` as const)} />
								</AdminField>
								<AdminFieldGrid>
									<AdminField label='Icon'>
										<Input
											{...register(`initiatives.${index}.icon` as const)}
										/>
									</AdminField>
									<AdminField label='Color'>
										<Input
											{...register(`initiatives.${index}.iconColor` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										{...register(`initiatives.${index}.description` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{initiatives.fields.length === 0 && (
						<AdminEmptyState title='No initiatives yet' />
					)}
					<AddRowButton
						onClick={() =>
							initiatives.append({
								title: '',
								description: '',
								icon: 'Award',
								iconColor: 'text-purple-600'
							})
						}>
						Add initiative
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('aqar') && (
				<AdminFormSection
					title='AQAR reports'
					description='Section heading copy and per-year report metadata.'>
					<AdminFieldGrid>
						<AdminField label='Section title'>
							<Input {...register('aqar.title')} />
						</AdminField>
						<AdminField label='Description'>
							<Textarea rows={2} {...register('aqar.description')} />
						</AdminField>
					</AdminFieldGrid>

					<div className='flex flex-col gap-3'>
						<p className='text-sm font-medium text-slate-700'>Report files</p>
						<AdminItemList>
							{aqarReports.fields.map((field, index) => (
								<AdminItemCard
									key={field.id}
									index={index}
									total={aqarReports.fields.length}
									title={
										watch(`aqar.reports.${index}.title`) ||
										`Report ${index + 1}`
									}
									subtitle={watch(`aqar.reports.${index}.year`) || undefined}
									onMove={d => aqarReports.move(index, index + d)}
									onRemove={() => aqarReports.remove(index)}>
									<AdminFieldGrid cols={3}>
										<AdminField label='Year'>
											<Input
												{...register(`aqar.reports.${index}.year` as const)}
											/>
										</AdminField>
										<AdminField label='Title' className='md:col-span-2'>
											<Input
												{...register(`aqar.reports.${index}.title` as const)}
											/>
										</AdminField>
									</AdminFieldGrid>
									<AdminField label='Description'>
										<Input
											{...register(
												`aqar.reports.${index}.description` as const
											)}
										/>
									</AdminField>
								</AdminItemCard>
							))}
						</AdminItemList>
						{aqarReports.fields.length === 0 && (
							<AdminEmptyState title='No reports yet' />
						)}
						<AddRowButton
							onClick={() =>
								aqarReports.append({
									year: '',
									title: '',
									description: '',
									buttonText: 'Download PDF',
									buttonColor: 'bg-green-600'
								})
							}>
							Add report
						</AddRowButton>
					</div>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
