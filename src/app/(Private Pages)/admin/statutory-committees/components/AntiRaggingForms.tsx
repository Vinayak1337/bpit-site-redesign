'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Save, Loader2 } from 'lucide-react';
import {
	updateAntiRagging,
	type AntiRaggingData
} from '@/app/(Private Pages)/actions/statutory-committees';
import { useTransition, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ICON_COLOR_OPTIONS = [
	'text-blue-600', 'text-green-600', 'text-purple-600',
	'text-orange-600', 'text-red-600', 'text-indigo-600',
	'text-teal-600', 'text-pink-600', 'text-yellow-600', 'text-gray-600'
] as const;

// --- Schemas ---

const heroSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	gradient: z.string().optional(),
	icon: z.string().optional()
});

const memberSchema = z.object({
	name: z.string().min(1),
	designation: z.string().min(1),
	department: z.string().min(1),
	phone: z.string().optional(),
	email: z.string().optional()
});

const measureSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1)
});

const contactSchema = z.object({
	title: z.string().min(1),
	contact: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1),
	bgColor: z.string().min(1)
});

type BaseProps = {
	initialData: AntiRaggingData;
	pageSlug: string;
	onChange?: (data: AntiRaggingData) => void;
};

// --- Generic Form Wrapper ---

function FormWrapper({
	onSubmit,
	isPending,
	children
}: {
	onSubmit: () => void;
	isPending: boolean;
	children: React.ReactNode;
}) {
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				onSubmit();
			}}
			className='space-y-6'>
			{children}
			<div className='flex justify-end'>
				<Button type='submit' disabled={isPending}>
					{isPending ? (
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Save className='mr-2 h-4 w-4' />
					)}
					Save Changes
				</Button>
			</div>
		</form>
	);
}

// --- Forms ---

export function AntiRaggingHeroForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const [isPending, startTransition] = useTransition();
	const { register, handleSubmit, watch } = useForm({
		resolver: zodResolver(z.object({ hero: heroSchema })),
		defaultValues: { hero: initialData.hero }
	});

	const watchedData = watch();
	useEffect(() => {
		if (onChange)
			onChange({
				...initialData,
				hero: watchedData.hero as AntiRaggingData['hero']
			});
	}, [watchedData, onChange, initialData]);

	const onSubmit = (data: { hero: AntiRaggingData['hero'] }) => {
		startTransition(async () => {
			try {
				await updateAntiRagging({ ...initialData, hero: data.hero }, pageSlug);
			} catch (error) {
				console.error(error);
			}
		});
	};

	return (
		<FormWrapper onSubmit={handleSubmit(onSubmit)} isPending={isPending}>
			<div className='space-y-4'>
				<div>
					<Label>Title</Label>
					<Input {...register('hero.title')} />
				</div>
				<div>
					<Label>Description</Label>
					<Textarea {...register('hero.description')} rows={3} />
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<Label>Gradient</Label>
						<Input
							{...register('hero.gradient')}
							placeholder='from-red-600...'
						/>
					</div>
					<div>
						<Label>Icon</Label>
						<Input {...register('hero.icon')} placeholder='Shield' />
					</div>
				</div>
			</div>
		</FormWrapper>
	);
}

export function AntiRaggingDefinitionForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const [isPending, startTransition] = useTransition();
	const [includes, setIncludes] = useState<string[]>(
		initialData.definition?.includes || ['']
	);

	const { register, handleSubmit, watch } = useForm({
		defaultValues: {
			title: initialData.definition?.title || '',
			content: initialData.definition?.content || ''
		}
	});

	const watchedData = watch();

	useEffect(() => {
		if (onChange) {
			onChange({
				...initialData,
				definition: {
					title: watchedData.title || '',
					content: watchedData.content || '',
					includes: includes.filter(i => i.trim().length > 0)
				}
			});
		}
	}, [watchedData, includes, onChange, initialData]);

	const handleSubmitForm = (data: { title: string; content: string }) => {
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{
						...initialData,
						definition: {
							title: data.title,
							content: data.content,
							includes: includes.filter(i => i.trim().length > 0)
						}
					},
					pageSlug
				);
			} catch (error) {
				console.error(error);
			}
		});
	};

	const addInclude = () => setIncludes([...includes, '']);
	const removeInclude = (index: number) =>
		setIncludes(includes.filter((_, i) => i !== index));
	const updateInclude = (index: number, value: string) => {
		const updated = [...includes];
		updated[index] = value;
		setIncludes(updated);
	};

	return (
		<FormWrapper
			onSubmit={handleSubmit(handleSubmitForm)}
			isPending={isPending}>
			<div className='space-y-4'>
				<div>
					<Label>Title</Label>
					<Input {...register('title')} />
				</div>
				<div>
					<Label>Content</Label>
					<Textarea {...register('content')} rows={5} />
				</div>

				<div className='space-y-2'>
					<div className='flex justify-between items-center'>
						<Label>Includes Points</Label>
						<Button
							type='button'
							size='sm'
							variant='outline'
							onClick={addInclude}>
							<Plus className='w-4 h-4 mr-2' /> Add Point
						</Button>
					</div>
					{includes.map((item, index) => (
						<div key={index} className='flex gap-2'>
							<Input
								value={item}
								onChange={e => updateInclude(index, e.target.value)}
							/>
							<Button
								type='button'
								size='icon'
								variant='ghost'
								className='text-red-500'
								onClick={() => removeInclude(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>
					))}
				</div>
			</div>
		</FormWrapper>
	);
}

export function AntiRaggingMembersForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const [isPending, startTransition] = useTransition();
	const { register, control, handleSubmit, watch } = useForm({
		resolver: zodResolver(
			z.object({ committeeMembers: z.array(memberSchema) })
		),
		defaultValues: { committeeMembers: initialData.committeeMembers }
	});

	const membersFields = useFieldArray({ control, name: 'committeeMembers' });

	const watchedData = watch();
	useEffect(() => {
		if (onChange)
			onChange({
				...initialData,
				committeeMembers:
					watchedData.committeeMembers as AntiRaggingData['committeeMembers']
			});
	}, [watchedData, onChange, initialData]);

	const onSubmit = (data: {
		committeeMembers: AntiRaggingData['committeeMembers'];
	}) => {
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{ ...initialData, committeeMembers: data.committeeMembers },
					pageSlug
				);
			} catch (error) {
				console.error(error);
			}
		});
	};

	return (
		<FormWrapper onSubmit={handleSubmit(onSubmit)} isPending={isPending}>
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<Label>Members</Label>
					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={() =>
							membersFields.append({
								name: '',
								designation: '',
								department: ''
							})
						}>
						<Plus className='w-4 h-4 mr-2' /> Add Member
					</Button>
				</div>
				{membersFields.fields.map((field, index) => (
					<Card key={field.id} className='relative'>
						<div className='absolute top-2 right-2'>
							<Button
								type='button'
								size='icon'
								variant='ghost'
								className='h-8 w-8 text-red-500'
								onClick={() => membersFields.remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>
						<CardContent className='pt-6 space-y-3'>
							<div>
								<Label>Name</Label>
								<Input {...register(`committeeMembers.${index}.name`)} />
							</div>
							<div>
								<Label>Designation</Label>
								<Input {...register(`committeeMembers.${index}.designation`)} />
							</div>
							<div>
								<Label>Department</Label>
								<Input {...register(`committeeMembers.${index}.department`)} />
							</div>
							<div className='grid grid-cols-2 gap-2'>
								<div>
									<Label>Phone</Label>
									<Input {...register(`committeeMembers.${index}.phone`)} />
								</div>
								<div>
									<Label>Email</Label>
									<Input {...register(`committeeMembers.${index}.email`)} />
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</FormWrapper>
	);
}

export function AntiRaggingMeasuresForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const [isPending, startTransition] = useTransition();
	const { register, control, handleSubmit, watch } = useForm({
		resolver: zodResolver(
			z.object({ preventiveMeasures: z.array(measureSchema) })
		),
		defaultValues: { preventiveMeasures: initialData.preventiveMeasures }
	});

	const fields = useFieldArray({ control, name: 'preventiveMeasures' });

	const watchedData = watch();
	useEffect(() => {
		if (onChange)
			onChange({
				...initialData,
				preventiveMeasures:
					watchedData.preventiveMeasures as AntiRaggingData['preventiveMeasures']
			});
	}, [watchedData, onChange, initialData]);

	const onSubmit = (data: {
		preventiveMeasures: AntiRaggingData['preventiveMeasures'];
	}) => {
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{ ...initialData, preventiveMeasures: data.preventiveMeasures },
					pageSlug
				);
			} catch (error) {
				console.error(error);
			}
		});
	};

	return (
		<FormWrapper onSubmit={handleSubmit(onSubmit)} isPending={isPending}>
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<Label>Measures</Label>
					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={() =>
							fields.append({
								title: '',
								description: '',
								icon: 'Shield',
								iconColor: 'text-blue-600'
							})
						}>
						<Plus className='w-4 h-4 mr-2' /> Add Measure
					</Button>
				</div>
				{fields.fields.map((field, index) => (
					<Card key={field.id} className='relative'>
						<div className='absolute top-2 right-2'>
							<Button
								type='button'
								size='icon'
								variant='ghost'
								className='h-8 w-8 text-red-500'
								onClick={() => fields.remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>
						<CardContent className='pt-6 space-y-3'>
							<div>
								<Label>Title</Label>
								<Input {...register(`preventiveMeasures.${index}.title`)} />
							</div>
							<div className='grid grid-cols-2 gap-2'>
								<div>
									<Label>Icon</Label>
									<Input {...register(`preventiveMeasures.${index}.icon`)} />
								</div>
								<div>
									<Label>Color</Label>
									<Controller
										control={control}
										name={`preventiveMeasures.${index}.iconColor`}
										render={({ field }) => (
											<Select onValueChange={field.onChange} value={field.value}>
												<SelectTrigger><SelectValue placeholder='Select color' /></SelectTrigger>
												<SelectContent>
													{ICON_COLOR_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
												</SelectContent>
											</Select>
										)}
									/>
								</div>
							</div>
							<div>
								<Label>Description</Label>
								<Textarea
									{...register(`preventiveMeasures.${index}.description`)}
									rows={2}
								/>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</FormWrapper>
	);
}

export function AntiRaggingPunishmentsForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const [isPending, startTransition] = useTransition();
	const [punishments, setPunishments] = useState<string[]>(
		initialData.punishments || ['']
	);

	useEffect(() => {
		if (onChange) {
			onChange({
				...initialData,
				punishments: punishments.filter(p => p.trim().length > 0)
			});
		}
	}, [punishments, onChange, initialData]);

	const handleSubmitForm = () => {
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{
						...initialData,
						punishments: punishments.filter(p => p.trim().length > 0)
					},
					pageSlug
				);
			} catch (error) {
				console.error(error);
			}
		});
	};

	const addPunishment = () => setPunishments([...punishments, '']);
	const removePunishment = (index: number) =>
		setPunishments(punishments.filter((_, i) => i !== index));
	const updatePunishment = (index: number, value: string) => {
		const updated = [...punishments];
		updated[index] = value;
		setPunishments(updated);
	};

	return (
		<FormWrapper onSubmit={handleSubmitForm} isPending={isPending}>
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<Label>Punishments</Label>
					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={addPunishment}>
						<Plus className='w-4 h-4 mr-2' /> Add Item
					</Button>
				</div>
				{punishments.map((item, index) => (
					<div key={index} className='flex gap-2 items-center'>
						<span className='text-sm font-mono text-gray-500 w-6'>
							{index + 1}.
						</span>
						<Input
							value={item}
							onChange={e => updatePunishment(index, e.target.value)}
						/>
						<Button
							type='button'
							size='icon'
							variant='ghost'
							className='text-red-500'
							onClick={() => removePunishment(index)}>
							<Trash2 className='w-4 h-4' />
						</Button>
					</div>
				))}
			</div>
		</FormWrapper>
	);
}

export function AntiRaggingContactsForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const [isPending, startTransition] = useTransition();
	const { register, control, handleSubmit, watch } = useForm({
		resolver: zodResolver(
			z.object({ emergencyContacts: z.array(contactSchema) })
		),
		defaultValues: { emergencyContacts: initialData.emergencyContacts }
	});

	const fields = useFieldArray({ control, name: 'emergencyContacts' });

	const watchedData = watch();
	useEffect(() => {
		if (onChange)
			onChange({
				...initialData,
				emergencyContacts:
					watchedData.emergencyContacts as AntiRaggingData['emergencyContacts']
			});
	}, [watchedData, onChange, initialData]);

	const onSubmit = (data: {
		emergencyContacts: AntiRaggingData['emergencyContacts'];
	}) => {
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{ ...initialData, emergencyContacts: data.emergencyContacts },
					pageSlug
				);
			} catch (error) {
				console.error(error);
			}
		});
	};

	return (
		<FormWrapper onSubmit={handleSubmit(onSubmit)} isPending={isPending}>
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<Label>Contacts</Label>
					<Button
						type='button'
						size='sm'
						variant='outline'
						onClick={() =>
							fields.append({
								title: '',
								contact: '',
								description: '',
								icon: 'Phone',
								iconColor: 'text-red-600',
								bgColor: 'bg-red-100'
							})
						}>
						<Plus className='w-4 h-4 mr-2' /> Add Contact
					</Button>
				</div>
				{fields.fields.map((field, index) => (
					<Card key={field.id} className='relative'>
						<div className='absolute top-2 right-2'>
							<Button
								type='button'
								size='icon'
								variant='ghost'
								className='h-8 w-8 text-red-500'
								onClick={() => fields.remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>
						<CardContent className='pt-6 space-y-3'>
							<div>
								<Label>Title</Label>
								<Input {...register(`emergencyContacts.${index}.title`)} />
							</div>
							<div>
								<Label>Contact</Label>
								<Input {...register(`emergencyContacts.${index}.contact`)} />
							</div>
							<div>
								<Label>Description</Label>
								<Input
									{...register(`emergencyContacts.${index}.description`)}
								/>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</FormWrapper>
	);
}
