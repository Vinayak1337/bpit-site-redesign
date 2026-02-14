'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';
import { updatePlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import UploadButton from '@/components/cloudinary/upload-button';
import { Plus, Trash2 } from 'lucide-react';

type FeatureFormValue = {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: string;
	iconColor: string;
	textColor: string;
};

type TeamMemberFormValue = {
	id: string;
	name: string;
	position: string;
	email: string;
	image?: string;
	initials: string;
	gradientColor: string;
	textColor: string;
};

type FormValues = {
	servicesTitle: string;
	servicesDescription: string;
	features: FeatureFormValue[];
	teamTitle: string;
	teamDescription: string;
	teamMembers: TeamMemberFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const FALLBACK_ICON = 'GraduationCap';

const createEmptyFeature = (): FeatureFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	title: '',
	description: '',
	color: 'blue',
	iconColor: 'blue',
	textColor: 'black'
});

const createEmptyTeamMember = (): TeamMemberFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	position: '',
	email: '',
	image: '',
	initials: '',
	gradientColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
	textColor: 'text-white'
});

export default function ServicesTeamForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<
		'idle' | 'saving' | 'saved' | 'error'
	>('idle');

	const form = useForm<FormValues>({
		defaultValues: {
			servicesTitle: initialData.servicesTitle || '',
			servicesDescription: initialData.servicesDescription || '',
			features:
				initialData.features.length > 0
					? initialData.features
					: [createEmptyFeature()],
			teamTitle: initialData.teamTitle || '',
			teamDescription: initialData.teamDescription || '',
			teamMembers:
				initialData.teamMembers.length > 0
					? initialData.teamMembers
					: [createEmptyTeamMember()]
		}
	});

	const featuresArray = useFieldArray({
		control: form.control,
		name: 'features'
	});

	const teamMembersArray = useFieldArray({
		control: form.control,
		name: 'teamMembers'
	});

	const iconOptions = SUPPORTED_ICON_NAMES;

	useEffect(() => {
		const subscription = form.watch(values => {
			if (onChange) {
				const updatedData: PlacementOverviewData = {
					...initialData,
					servicesTitle: values.servicesTitle || '',
					servicesDescription: values.servicesDescription || '',
					features: (values.features || [])
						.map(feature => ({
							id: feature?.id || crypto.randomUUID(),
							icon: feature?.icon?.trim().length
								? feature.icon.trim()
								: FALLBACK_ICON,
							title: (feature?.title ?? '').trim(),
							description: (feature?.description ?? '').trim(),
							color: feature?.color ?? 'blue',
							iconColor: feature?.iconColor ?? 'blue',
							textColor: feature?.textColor ?? 'black'
						}))
						.filter(
							feature =>
								feature.title.length > 0 && feature.description.length > 0
						),
					teamTitle: values.teamTitle || '',
					teamDescription: values.teamDescription || '',
					teamMembers: (values.teamMembers || [])
						.map(member => ({
							id: member?.id || crypto.randomUUID(),
							name: (member?.name ?? '').trim(),
							position: (member?.position ?? '').trim(),
							email: (member?.email ?? '').trim(),
							image: (member?.image ?? '').trim(),
							initials: (member?.initials ?? '').trim(),
							gradientColor:
								member?.gradientColor ??
								'bg-gradient-to-br from-blue-500 to-blue-600',
							textColor: member?.textColor ?? 'text-white'
						}))
						.filter(
							member => member.name.length > 0 && member.position.length > 0
						)
				};
				onChange(updatedData);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, onChange, initialData]);

	const onSubmit = async (values: FormValues) => {
		setSaveStatus('saving');
		startTransition(async () => {
			try {
				const updatedData: PlacementOverviewData = {
					...initialData,
					servicesTitle: values.servicesTitle,
					servicesDescription: values.servicesDescription,
					features: values.features
						.map(feature => ({
							id: feature.id,
							icon: feature.icon?.trim().length
								? feature.icon.trim()
								: FALLBACK_ICON,
							title: (feature.title ?? '').trim(),
							description: (feature.description ?? '').trim(),
							color: feature.color ?? 'blue',
							iconColor: feature.iconColor ?? 'blue',
							textColor: feature.textColor ?? 'black'
						}))
						.filter(
							feature =>
								feature.title.length > 0 && feature.description.length > 0
						),
					teamTitle: values.teamTitle,
					teamDescription: values.teamDescription,
					teamMembers: values.teamMembers
						.map(member => ({
							id: member.id,
							name: (member.name ?? '').trim(),
							position: (member.position ?? '').trim(),
							email: (member.email ?? '').trim(),
							image: (member.image ?? '').trim(),
							initials: (member.initials ?? '').trim(),
							gradientColor:
								member.gradientColor ??
								'bg-gradient-to-br from-blue-500 to-blue-600',
							textColor: member.textColor ?? 'text-white'
						}))
						.filter(
							member => member.name.length > 0 && member.position.length > 0
						)
				};

				await updatePlacementOverview(pageSlug, updatedData);
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} catch (error) {
				console.error('Failed to save:', error);
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				{/* Services Section */}
				<div className='space-y-4'>
					<h3 className='text-lg font-semibold text-slate-900'>
						Services Section
					</h3>

					<FormField
						control={form.control}
						name='servicesTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Services Title</FormLabel>
								<FormControl>
									<Input placeholder='Our Services' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='servicesDescription'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Services Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Brief description of services'
										rows={3}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Features */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-lg font-semibold text-slate-900'>Features</h3>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => featuresArray.append(createEmptyFeature())}>
							<Plus className='w-4 h-4 mr-2' />
							Add Feature
						</Button>
					</div>
					<div className='space-y-4'>
						{featuresArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-slate-700'>
										Feature {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() => featuresArray.remove(index)}>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
								<div className='grid grid-cols-1 gap-4'>
									<FormField
										control={form.control}
										name={`features.${index}.title`}
										rules={{ required: 'Title is required' }}
										render={({ field: titleField }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder='Feature title' {...titleField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`features.${index}.description`}
										rules={{ required: 'Description is required' }}
										render={({ field: descField }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Feature description'
														rows={3}
														{...descField}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`features.${index}.icon`}
										render={({ field: iconField }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
												<FormControl>
													<Select
														onValueChange={iconField.onChange}
														value={iconField.value}>
														<SelectTrigger>
															<SelectValue placeholder='Select icon' />
														</SelectTrigger>
														<SelectContent>
															{iconOptions.map(option => (
																<SelectItem key={option} value={option}>
																	{option}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`features.${index}.iconColor`}
										render={({ field: colorField }) => (
											<FormItem>
												<FormLabel>Icon Color</FormLabel>
												<FormControl>
													<Input
														placeholder='from-blue-500 to-blue-700'
														{...colorField}
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
				</div>

				{/* Team Section */}
				<div className='space-y-4'>
					<h3 className='text-lg font-semibold text-slate-900'>Team Section</h3>

					<FormField
						control={form.control}
						name='teamTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Team Title</FormLabel>
								<FormControl>
									<Input placeholder='Our Team' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='teamDescription'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Team Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Brief description of the team'
										rows={3}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Team Members */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-lg font-semibold text-slate-900'>
							Team Members
						</h3>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => teamMembersArray.append(createEmptyTeamMember())}>
							<Plus className='w-4 h-4 mr-2' />
							Add Member
						</Button>
					</div>
					<div className='space-y-4'>
						{teamMembersArray.fields.map((field, index) => (
							<div
								key={field.id}
								className='rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-slate-700'>
										Member {index + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() => teamMembersArray.remove(index)}>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name={`teamMembers.${index}.name`}
										rules={{ required: 'Name is required' }}
										render={({ field: nameField }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input placeholder='Member name' {...nameField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`teamMembers.${index}.position`}
										rules={{ required: 'Position is required' }}
										render={({ field: posField }) => (
											<FormItem>
												<FormLabel>Position</FormLabel>
												<FormControl>
													<Input placeholder='Position/Role' {...posField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`teamMembers.${index}.email`}
										rules={{ required: 'Email is required' }}
										render={({ field: emailField }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder='email@example.com'
														{...emailField}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`teamMembers.${index}.image`}
										render={({ field: imageField }) => (
											<FormItem className='sm:col-span-2'>
												<FormLabel>Profile Image</FormLabel>
												<FormControl>
													<div className='space-y-2'>
														<Input
															placeholder='Image URL (optional)'
															{...imageField}
														/>
														<UploadButton
															onUpload={url => {
																imageField.onChange(url);
																form.setValue(`teamMembers.${index}.image`, url, {
																	shouldDirty: true
																});
															}}
															buttonText='Upload Profile Image'
															className='sm:w-auto'
														/>
														{imageField.value ? (
															<div className='mt-2'>
																<img
																	src={imageField.value}
																	alt='Profile preview'
																	className='w-20 h-20 rounded-full object-cover border-2 border-blue-200'
																/>
															</div>
														) : (
															<p className='text-sm text-gray-500'>
																Initials will be shown as avatar if no image is uploaded
															</p>
														)}
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`teamMembers.${index}.initials`}
										rules={{ required: 'Initials are required' }}
										render={({ field: initialsField }) => (
											<FormItem>
												<FormLabel>Initials</FormLabel>
												<FormControl>
													<Input
														placeholder='e.g. JD'
														maxLength={3}
														{...initialsField}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`teamMembers.${index}.gradientColor`}
										render={({ field: gradientField }) => (
											<FormItem>
												<FormLabel>Avatar Color</FormLabel>
												<FormControl>
													<Input
														placeholder='e.g. bg-gradient-to-br from-blue-500 to-blue-600'
														{...gradientField}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`teamMembers.${index}.textColor`}
										render={({ field: textColorField }) => (
											<FormItem>
												<FormLabel>Initials Text Color</FormLabel>
												<FormControl>
													<Input
														placeholder='e.g. text-white'
														{...textColorField}
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
				</div>

				<div className='flex items-center justify-between pt-6 border-t'>
					<div>
						{saveStatus === 'saved' && (
							<p className='text-sm text-green-600'>
								Changes saved successfully!
							</p>
						)}
						{saveStatus === 'error' && (
							<p className='text-sm text-red-600'>Failed to save changes.</p>
						)}
					</div>
					<Button type='submit' disabled={isPending || saveStatus === 'saving'}>
						{saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
