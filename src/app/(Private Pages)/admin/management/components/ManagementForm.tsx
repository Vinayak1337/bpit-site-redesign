'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import type { ManagementData } from '@/app/(Private Pages)/actions/management';
import { updateManagement } from '@/app/(Private Pages)/actions/management';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import UploadButton from '@/components/cloudinary/upload-button';
import {
	AddRowButton,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

const COLOR_OPTIONS = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'indigo',
	'gray',
	'teal',
	'pink'
];

const formSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	titleIcon: z.string().optional(),
	titleIconColor: z.string().optional(),
	titleGradient: z.string().optional(),
	leaders: z
		.array(
			z.object({
				id: z.string(),
				name: z.string().min(1, 'Name is required'),
				position: z.string().min(1, 'Position is required'),
				description: z.array(z.string().min(1, 'Description item is required')),
				delay: z.number().min(0).max(2),
				image: z.string().optional(),
				iconColor: z.string().optional(),
				bgColor: z.string().optional()
			})
		)
		.min(1, 'At least one leader is required'),
	vision: z.object({
		title: z.string().min(1, 'Vision title is required'),
		quote: z.string().min(1, 'Vision quote is required'),
		delay: z.number().min(0).max(2),
		icon: z.string().optional(),
		iconColor: z.string().optional(),
		bgColor: z.string().optional()
	})
});

type FormValues = z.infer<typeof formSchema>;

interface ManagementFormProps {
	initialData: ManagementData;
	pageSlug: string;
	onChange?: (data: ManagementData) => void;
	visibleSections?: Array<'hero' | 'leaders' | 'vision'>;
}

export default function ManagementForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: ManagementFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const { fields: leaderFields, append: appendLeader, remove: removeLeader, move: moveLeader } =
		useFieldArray({ control: form.control, name: 'leaders' });

	const handleDataChange = useCallback(
		(values: FormValues) => onChange?.(values),
		[onChange]
	);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				const result = await updateManagement(values, pageSlug);
				if (result.success) {
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({
						kind: 'error',
						message: result.error ?? 'Failed to save changes.'
					});
				}
			} catch (error) {
				console.error('Error updating management data:', error);
				setStatus({ kind: 'error', message: 'Failed to save changes.' });
			}
		});
	});

	const showSection = (section: 'hero' | 'leaders' | 'vision') =>
		!visibleSections || visibleSections.includes(section);

	useEffect(() => {
		const sub = form.watch(value => {
			if (value) handleDataChange(value as FormValues);
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, handleDataChange]);

	useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('hero') && (
				<AdminFormSection
					title='Page title & hero'
					description='Heading copy and accent styling.'>
					<AdminFieldGrid>
						<AdminField
							label='Page title'
							error={form.formState.errors.title?.message}>
							<Input
								placeholder='Management Team'
								{...form.register('title')}
							/>
						</AdminField>
						<AdminField label='Title icon'>
							<Select
								value={form.watch('titleIcon') || ''}
								onValueChange={v =>
									form.setValue('titleIcon', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select an icon' />
								</SelectTrigger>
								<SelectContent>
									{SUPPORTED_ICON_NAMES.map(icon => (
										<SelectItem key={icon} value={icon}>
											{icon}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Icon color'>
							<Select
								value={form.watch('titleIconColor') || ''}
								onValueChange={v =>
									form.setValue('titleIconColor', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select icon color' />
								</SelectTrigger>
								<SelectContent>
									{COLOR_OPTIONS.map(color => (
										<SelectItem key={color} value={`bg-${color}-600`}>
											bg-{color}-600
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Background gradient'>
							<Select
								value={form.watch('titleGradient') || ''}
								onValueChange={v =>
									form.setValue('titleGradient', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select gradient' />
								</SelectTrigger>
								<SelectContent>
									{COLOR_OPTIONS.map(color => (
										<SelectItem
											key={color}
											value={`from-${color}-50 to-${color}-100`}>
											from-{color}-50 to-{color}-100
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
					</AdminFieldGrid>
				</AdminFormSection>
			)}

			{showSection('leaders') && (
				<AdminFormSection title='Leadership team'>
					<AdminItemList>
						{leaderFields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={leaderFields.length}
								title={
									form.watch(`leaders.${index}.name`) || `Leader ${index + 1}`
								}
								subtitle={form.watch(`leaders.${index}.position`) || undefined}
								onMove={d => moveLeader(index, index + d)}
								onRemove={
									leaderFields.length > 1 ? () => removeLeader(index) : undefined
								}>
								<AdminFieldGrid>
									<AdminField
										label='Name'
										error={
											form.formState.errors.leaders?.[index]?.name?.message
										}>
										<Input
											placeholder='Leader name'
											{...form.register(`leaders.${index}.name`)}
										/>
									</AdminField>
									<AdminField
										label='Position'
										error={
											form.formState.errors.leaders?.[index]?.position?.message
										}>
										<Input
											placeholder='Chairman, Director, etc.'
											{...form.register(`leaders.${index}.position`)}
										/>
									</AdminField>
								</AdminFieldGrid>

								<AdminField label='Profile image'>
									<Input
										placeholder='Image URL'
										{...form.register(`leaders.${index}.image`)}
									/>
									<div className='mt-2 flex flex-wrap gap-2'>
										<UploadButton
											onUpload={url =>
												form.setValue(`leaders.${index}.image`, url, {
													shouldDirty: true
												})
											}
											buttonText='Upload image'
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() =>
												form.setValue(`leaders.${index}.image`, '', {
													shouldDirty: true
												})
											}>
											Clear
										</Button>
									</div>
									{form.watch(`leaders.${index}.image`) && (
										<div className='mt-3 h-20 w-20 overflow-hidden rounded-md border border-slate-200'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={form.watch(`leaders.${index}.image`) || ''}
												alt='Profile preview'
												className='h-full w-full object-cover'
											/>
										</div>
									)}
								</AdminField>

								<AdminFieldGrid>
									<AdminField label='Icon / text color'>
										<Select
											value={form.watch(`leaders.${index}.iconColor`) || ''}
											onValueChange={v =>
												form.setValue(`leaders.${index}.iconColor`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select color' />
											</SelectTrigger>
											<SelectContent>
												{COLOR_OPTIONS.map(color => (
													<SelectItem key={color} value={`text-${color}-600`}>
														text-{color}-600
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Background color'>
										<Select
											value={form.watch(`leaders.${index}.bgColor`) || ''}
											onValueChange={v =>
												form.setValue(`leaders.${index}.bgColor`, v, {
													shouldDirty: true
												})
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select background' />
											</SelectTrigger>
											<SelectContent>
												{COLOR_OPTIONS.map(color => (
													<SelectItem key={color} value={`bg-${color}-50`}>
														bg-{color}-50
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
								</AdminFieldGrid>

								<AdminField label='Animation delay (seconds)'>
									<Input
										type='number'
										step='0.1'
										min='0'
										max='2'
										{...form.register(`leaders.${index}.delay`, {
											valueAsNumber: true
										})}
									/>
								</AdminField>

								<div className='flex flex-col gap-2'>
									<p className='text-sm font-medium text-slate-700'>
										Description paragraphs
									</p>
									{form.watch(`leaders.${index}.description`)?.map((_, di) => (
										<div key={di} className='flex items-start gap-2'>
											<Textarea
												rows={3}
												placeholder='Description paragraph'
												className='flex-1'
												{...form.register(
													`leaders.${index}.description.${di}` as const
												)}
											/>
											{(form.watch(`leaders.${index}.description`)?.length ??
												0) > 1 && (
												<Button
													type='button'
													variant='ghost'
													size='icon'
													className='h-9 w-9 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
													onClick={() => {
														const current = form.getValues(
															`leaders.${index}.description`
														);
														form.setValue(
															`leaders.${index}.description`,
															current.filter((_, i) => i !== di)
														);
													}}>
													<Trash2 className='h-4 w-4' />
												</Button>
											)}
										</div>
									))}
									<Button
										type='button'
										variant='outline'
										size='sm'
										className='self-start'
										onClick={() => {
											const current = form.getValues(
												`leaders.${index}.description`
											);
											form.setValue(`leaders.${index}.description`, [
												...current,
												''
											]);
										}}>
										<Plus className='mr-2 h-4 w-4' />
										Add paragraph
									</Button>
								</div>
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton
						onClick={() =>
							appendLeader({
								id: Date.now().toString(),
								name: 'New Leader',
								position: 'Position',
								description: ['Leadership description'],
								delay: 0.2,
								image: '',
								iconColor: 'text-blue-600',
								bgColor: 'bg-blue-50'
							})
						}>
						Add leader
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('vision') && (
				<AdminFormSection
					title='Leadership vision'
					description='Vision statement shown beside the leadership team.'>
					<AdminField
						label='Vision title'
						error={form.formState.errors.vision?.title?.message}>
						<Input
							placeholder='Our Leadership Vision'
							{...form.register('vision.title')}
						/>
					</AdminField>
					<AdminFieldGrid cols={3}>
						<AdminField label='Vision icon'>
							<Select
								value={form.watch('vision.icon') || ''}
								onValueChange={v =>
									form.setValue('vision.icon', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select icon' />
								</SelectTrigger>
								<SelectContent>
									{SUPPORTED_ICON_NAMES.map(icon => (
										<SelectItem key={icon} value={icon}>
											{icon}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Icon color'>
							<Select
								value={form.watch('vision.iconColor') || ''}
								onValueChange={v =>
									form.setValue('vision.iconColor', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select color' />
								</SelectTrigger>
								<SelectContent>
									{COLOR_OPTIONS.map(color => (
										<SelectItem key={color} value={`text-${color}-600`}>
											text-{color}-600
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Background color'>
							<Select
								value={form.watch('vision.bgColor') || ''}
								onValueChange={v =>
									form.setValue('vision.bgColor', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select background' />
								</SelectTrigger>
								<SelectContent>
									{COLOR_OPTIONS.map(color => (
										<SelectItem key={color} value={`bg-${color}-50`}>
											bg-{color}-50
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
					</AdminFieldGrid>
					<AdminField
						label='Vision quote'
						error={form.formState.errors.vision?.quote?.message}>
						<Textarea
							rows={4}
							placeholder='Vision statement'
							{...form.register('vision.quote')}
						/>
					</AdminField>
					<AdminField label='Animation delay (seconds)'>
						<Input
							type='number'
							step='0.1'
							min='0'
							max='2'
							{...form.register('vision.delay', { valueAsNumber: true })}
						/>
					</AdminField>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
