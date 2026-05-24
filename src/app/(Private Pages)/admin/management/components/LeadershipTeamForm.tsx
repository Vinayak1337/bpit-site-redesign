'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import type { LeadershipTeamData } from '@/app/(Private Pages)/actions/management';
import { updateLeadershipTeam } from '@/app/(Private Pages)/actions/management';
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
const GRADIENT_OPTIONS = COLOR_OPTIONS.map(color => ({
	value: `from-${color}-50 to-${color}-100`,
	label: `${color.charAt(0).toUpperCase()}${color.slice(1)} gradient`
}));

const formSchema = z.object({
	hero: z.object({
		icon: z.string().min(1, 'Hero icon is required'),
		title: z.string().min(1, 'Hero title is required'),
		subtitle: z.string().min(1, 'Hero subtitle is required'),
		gradient: z.string().min(1, 'Hero gradient is required'),
		iconColor: z.string().min(1, 'Hero icon color is required'),
		textColor: z.string().min(1, 'Hero text color is required')
	}),
	leaders: z
		.array(
			z.object({
				id: z.string().min(1, 'Leader ID is required'),
				name: z.string().min(1, 'Name is required'),
				position: z.string().min(1, 'Position is required'),
				image: z.string().optional(),
				icon: z.string().optional(),
				iconColor: z.string().optional(),
				iconTextColor: z.string().optional(),
				textColor: z.string().min(1, 'Text color is required'),
				details: z
					.array(
						z.object({
							icon: z.string().min(1, 'Detail icon is required'),
							text: z.string().min(1, 'Detail text is required')
						})
					)
					.min(1, 'At least one detail is required'),
				description: z.string().min(1, 'Description is required')
			})
		)
		.min(1, 'At least one leader is required')
});

type FormValues = z.infer<typeof formSchema>;

const normalizeLeadershipTeam = (values: FormValues): LeadershipTeamData => ({
	hero: {
		title: values.hero.title.trim(),
		subtitle: values.hero.subtitle.trim(),
		icon: values.hero.icon.trim(),
		gradient: values.hero.gradient.trim(),
		iconColor: values.hero.iconColor.trim(),
		textColor: values.hero.textColor.trim()
	},
	leaders: values.leaders.map(leader => ({
		id: leader.id.trim(),
		name: leader.name.trim(),
		position: leader.position.trim(),
		image: (leader.image ?? '').trim(),
		description: leader.description.trim(),
		icon: (leader.icon ?? '').trim(),
		iconColor: (leader.iconColor ?? '').trim(),
		iconTextColor: (leader.iconTextColor ?? '').trim(),
		textColor: leader.textColor.trim(),
		details: leader.details.map(d => ({
			icon: d.icon.trim(),
			text: d.text.trim()
		}))
	}))
});

interface LeadershipTeamFormProps {
	initialData: LeadershipTeamData;
	pageSlug: string;
	onChange?: (data: LeadershipTeamData) => void;
	visibleSections?: Array<'hero' | 'leaders'>;
}

export default function LeadershipTeamForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: LeadershipTeamFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const {
		fields: leaderFields,
		append: appendLeader,
		remove: removeLeader,
		move: moveLeader
	} = useFieldArray({ control: form.control, name: 'leaders' });

	useEffect(() => {
		onChange?.(normalizeLeadershipTeam(form.getValues() as FormValues));
		const sub = form.watch(values => {
			onChange?.(normalizeLeadershipTeam(values as FormValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateLeadershipTeam(
					normalizeLeadershipTeam(values),
					pageSlug
				);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Error updating leadership team data:', error);
				setStatus({ kind: 'error', message: 'Failed to save' });
			}
		});
	});

	const showSection = (section: 'hero' | 'leaders') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={onSubmit}>
			{showSection('hero') && (
				<AdminFormSection
					title='Hero section'
					description='Headline copy and accent styling for the leadership team page.'>
					<AdminFieldGrid>
						<AdminField
							label='Hero title'
							error={form.formState.errors.hero?.title?.message}>
							<Input
								placeholder='Our Leadership Team'
								{...form.register('hero.title')}
							/>
						</AdminField>
						<AdminField
							label='Hero subtitle'
							error={form.formState.errors.hero?.subtitle?.message}>
							<Input
								placeholder='Experienced Leaders Driving Excellence'
								{...form.register('hero.subtitle')}
							/>
						</AdminField>
						<AdminField label='Hero icon'>
							<Select
								value={form.watch('hero.icon') || ''}
								onValueChange={v =>
									form.setValue('hero.icon', v, { shouldDirty: true })
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
						<AdminField label='Background gradient'>
							<Select
								value={form.watch('hero.gradient') || ''}
								onValueChange={v =>
									form.setValue('hero.gradient', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select gradient' />
								</SelectTrigger>
								<SelectContent>
									{GRADIENT_OPTIONS.map(g => (
										<SelectItem key={g.value} value={g.value}>
											{g.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Icon background color'>
							<Select
								value={form.watch('hero.iconColor') || ''}
								onValueChange={v =>
									form.setValue('hero.iconColor', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select color' />
								</SelectTrigger>
								<SelectContent>
									{COLOR_OPTIONS.map(c => (
										<SelectItem key={c} value={`bg-${c}-600`}>
											bg-{c}-600
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Text color'>
							<Select
								value={form.watch('hero.textColor') || ''}
								onValueChange={v =>
									form.setValue('hero.textColor', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select text color' />
								</SelectTrigger>
								<SelectContent>
									{COLOR_OPTIONS.map(c => (
										<SelectItem key={c} value={`text-${c}-600`}>
											text-{c}-600
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
					</AdminFieldGrid>
				</AdminFormSection>
			)}

			{showSection('leaders') && (
				<AdminFormSection title='Leaders'>
					<AdminItemList>
						{leaderFields.map((leader, index) => (
							<AdminItemCard
								key={leader.id}
								index={index}
								total={leaderFields.length}
								title={
									form.watch(`leaders.${index}.name`) || `Leader ${index + 1}`
								}
								subtitle={form.watch(`leaders.${index}.position`) || undefined}
								onMove={d => moveLeader(index, index + d)}
								onRemove={
									leaderFields.length > 1
										? () => removeLeader(index)
										: undefined
								}>
								<AdminFieldGrid>
									<AdminField
										label='Name'
										error={
											form.formState.errors.leaders?.[index]?.name?.message
										}>
										<Input
											placeholder='Dr. [Name]'
											{...form.register(`leaders.${index}.name`)}
										/>
									</AdminField>
									<AdminField
										label='Position'
										error={
											form.formState.errors.leaders?.[index]?.position?.message
										}>
										<Input
											placeholder='Principal, Dean, etc.'
											{...form.register(`leaders.${index}.position`)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Avatar image'>
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
											buttonText='Upload avatar'
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
										<div className='mt-3 h-16 w-16 overflow-hidden rounded-full border border-slate-200'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={form.watch(`leaders.${index}.image`) || ''}
												alt='Avatar preview'
												className='h-full w-full object-cover'
											/>
										</div>
									)}
								</AdminField>
								<AdminField label='Position text color'>
									<Select
										value={form.watch(`leaders.${index}.textColor`) || ''}
										onValueChange={v =>
											form.setValue(`leaders.${index}.textColor`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select text color' />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(c => (
												<SelectItem key={c} value={`text-${c}-600`}>
													text-{c}-600
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
								<AdminField
									label='Description'
									error={
										form.formState.errors.leaders?.[index]?.description
											?.message
									}>
									<Textarea
										rows={3}
										placeholder='Leader description'
										{...form.register(`leaders.${index}.description`)}
									/>
								</AdminField>
								<div className='flex flex-col gap-2'>
									<p className='text-sm font-medium text-slate-700'>Details</p>
									{form
										.watch(`leaders.${index}.details`)
										?.map((_, di) => (
											<div key={di} className='flex items-start gap-2'>
												<div className='w-40'>
													<Select
														value={
															form.watch(
																`leaders.${index}.details.${di}.icon`
															) || ''
														}
														onValueChange={v =>
															form.setValue(
																`leaders.${index}.details.${di}.icon`,
																v,
																{ shouldDirty: true }
															)
														}>
														<SelectTrigger>
															<SelectValue placeholder='Icon' />
														</SelectTrigger>
														<SelectContent>
															{SUPPORTED_ICON_NAMES.map(icon => (
																<SelectItem key={icon} value={icon}>
																	{icon}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
												<Input
													placeholder='Detail text'
													className='flex-1'
													{...form.register(
														`leaders.${index}.details.${di}.text`
													)}
												/>
												{(form.watch(`leaders.${index}.details`)?.length ??
													0) > 1 && (
													<Button
														type='button'
														variant='ghost'
														size='icon'
														className='h-10 w-10 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
														onClick={() => {
															const current = form.getValues(
																`leaders.${index}.details`
															);
															form.setValue(
																`leaders.${index}.details`,
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
												`leaders.${index}.details`
											);
											form.setValue(`leaders.${index}.details`, [
												...current,
												{ icon: 'GraduationCap', text: '' }
											]);
										}}>
										<Plus className='mr-2 h-4 w-4' />
										Add detail
									</Button>
								</div>
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton
						onClick={() =>
							appendLeader({
								id: `leader-${Date.now()}`,
								name: '',
								position: '',
								image: '',
								icon: 'User',
								iconColor: 'bg-blue-100',
								iconTextColor: 'text-blue-600',
								textColor: 'text-blue-600',
								details: [{ icon: 'GraduationCap', text: '' }],
								description: ''
							})
						}>
						Add leader
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
