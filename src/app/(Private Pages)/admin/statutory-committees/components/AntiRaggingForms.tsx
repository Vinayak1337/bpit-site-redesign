'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateAntiRagging,
	type AntiRaggingData
} from '@/app/(Private Pages)/actions/statutory-committees';
import { useTransition, useEffect, useState } from 'react';
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

function useStatusFlow() {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);
	return { isPending, startTransition, status, setStatus };
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export function AntiRaggingHeroForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const { isPending, startTransition, status, setStatus } = useStatusFlow();
	const { register, handleSubmit, watch } = useForm({
		resolver: zodResolver(z.object({ hero: heroSchema })),
		defaultValues: { hero: initialData.hero }
	});

	const watchedData = watch();
	useEffect(() => {
		onChange?.({
			...initialData,
			hero: watchedData.hero as AntiRaggingData['hero']
		});
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [watchedData, onChange, initialData]);

	const onSubmit = handleSubmit(data => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateAntiRagging({ ...initialData, hero: data.hero }, pageSlug);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error(error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Hero'
				description='Header copy for the anti-ragging page.'>
				<AdminField label='Title'>
					<Input {...register('hero.title')} />
				</AdminField>
				<AdminField label='Description'>
					<Textarea rows={3} {...register('hero.description')} />
				</AdminField>
				<AdminFieldGrid>
					<AdminField label='Gradient'>
						<Input
							placeholder='from-red-600…'
							{...register('hero.gradient')}
						/>
					</AdminField>
					<AdminField label='Icon'>
						<Input placeholder='Shield' {...register('hero.icon')} />
					</AdminField>
				</AdminFieldGrid>
			</AdminFormSection>
			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export function AntiRaggingDefinitionForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const { isPending, startTransition, status, setStatus } = useStatusFlow();
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
		onChange?.({
			...initialData,
			definition: {
				title: watchedData.title || '',
				content: watchedData.content || '',
				includes: includes.filter(i => i.trim().length > 0)
			}
		});
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [watchedData, includes, onChange, initialData]);

	const onSubmit = handleSubmit(data => {
		setStatus({ kind: 'saving' });
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
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error(error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Definition'
				description='What constitutes ragging and what falls under the policy.'>
				<AdminField label='Title'>
					<Input {...register('title')} />
				</AdminField>
				<AdminField label='Content'>
					<Textarea rows={5} {...register('content')} />
				</AdminField>
				<div className='flex flex-col gap-3'>
					<p className='text-sm font-medium text-slate-700'>Includes points</p>
					<AdminItemList>
						{includes.map((item, index) => (
							<AdminItemCard
								key={index}
								index={index}
								total={includes.length}
								title={`Point ${index + 1}`}
								onMove={d => {
									const j = index + d;
									if (j < 0 || j >= includes.length) return;
									const next = [...includes];
									[next[index], next[j]] = [next[j], next[index]];
									setIncludes(next);
								}}
								onRemove={() =>
									setIncludes(includes.filter((_, i) => i !== index))
								}>
								<AdminField
									label={`Point ${index + 1}`}
									className='[&_label]:sr-only'>
									<Input
										value={item}
										onChange={e => {
											const next = [...includes];
											next[index] = e.target.value;
											setIncludes(next);
										}}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{includes.length === 0 && <AdminEmptyState title='No points yet' />}
					<AddRowButton onClick={() => setIncludes([...includes, ''])}>
						Add point
					</AddRowButton>
				</div>
			</AdminFormSection>
			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}

// ---------------------------------------------------------------------------
// Members
// ---------------------------------------------------------------------------

export function AntiRaggingMembersForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const { isPending, startTransition, status, setStatus } = useStatusFlow();
	const { register, control, handleSubmit, watch } = useForm({
		resolver: zodResolver(
			z.object({ committeeMembers: z.array(memberSchema) })
		),
		defaultValues: { committeeMembers: initialData.committeeMembers }
	});
	const members = useFieldArray({ control, name: 'committeeMembers' });

	const watchedData = watch();
	useEffect(() => {
		onChange?.({
			...initialData,
			committeeMembers:
				watchedData.committeeMembers as AntiRaggingData['committeeMembers']
		});
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [watchedData, onChange, initialData]);

	const onSubmit = handleSubmit(data => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{ ...initialData, committeeMembers: data.committeeMembers },
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
			<AdminFormSection title='Committee members'>
				<AdminItemList>
					{members.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={members.fields.length}
							title={
								watch(`committeeMembers.${index}.name`) || `Member ${index + 1}`
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
			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}

// ---------------------------------------------------------------------------
// Measures
// ---------------------------------------------------------------------------

export function AntiRaggingMeasuresForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const { isPending, startTransition, status, setStatus } = useStatusFlow();
	const { register, control, handleSubmit, watch } = useForm({
		resolver: zodResolver(
			z.object({ preventiveMeasures: z.array(measureSchema) })
		),
		defaultValues: { preventiveMeasures: initialData.preventiveMeasures }
	});
	const measures = useFieldArray({ control, name: 'preventiveMeasures' });

	const watchedData = watch();
	useEffect(() => {
		onChange?.({
			...initialData,
			preventiveMeasures:
				watchedData.preventiveMeasures as AntiRaggingData['preventiveMeasures']
		});
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [watchedData, onChange, initialData]);

	const onSubmit = handleSubmit(data => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{ ...initialData, preventiveMeasures: data.preventiveMeasures },
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
			<AdminFormSection title='Preventive measures'>
				<AdminItemList>
					{measures.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={measures.fields.length}
							title={
								watch(`preventiveMeasures.${index}.title`) ||
								`Measure ${index + 1}`
							}
							onMove={d => measures.move(index, index + d)}
							onRemove={() => measures.remove(index)}>
							<AdminField label='Title'>
								<Input
									{...register(`preventiveMeasures.${index}.title` as const)}
								/>
							</AdminField>
							<AdminFieldGrid>
								<AdminField label='Icon'>
									<Input
										{...register(`preventiveMeasures.${index}.icon` as const)}
									/>
								</AdminField>
								<AdminField label='Color'>
									<Input
										{...register(
											`preventiveMeasures.${index}.iconColor` as const
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={2}
									{...register(
										`preventiveMeasures.${index}.description` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{measures.fields.length === 0 && (
					<AdminEmptyState title='No measures yet' />
				)}
				<AddRowButton
					onClick={() =>
						measures.append({
							title: '',
							description: '',
							icon: 'Shield',
							iconColor: 'text-blue-600'
						})
					}>
					Add measure
				</AddRowButton>
			</AdminFormSection>
			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}

// ---------------------------------------------------------------------------
// Punishments
// ---------------------------------------------------------------------------

export function AntiRaggingPunishmentsForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const { isPending, startTransition, status, setStatus } = useStatusFlow();
	const [punishments, setPunishments] = useState<string[]>(
		initialData.punishments || ['']
	);

	useEffect(() => {
		onChange?.({
			...initialData,
			punishments: punishments.filter(p => p.trim().length > 0)
		});
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [punishments, onChange, initialData]);

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{
						...initialData,
						punishments: punishments.filter(p => p.trim().length > 0)
					},
					pageSlug
				);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error(error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	};

	return (
		<AdminForm onSubmit={handleSubmitForm}>
			<AdminFormSection title='Punishments'>
				<AdminItemList>
					{punishments.map((item, index) => (
						<AdminItemCard
							key={index}
							index={index}
							total={punishments.length}
							title={`Item ${index + 1}`}
							onMove={d => {
								const j = index + d;
								if (j < 0 || j >= punishments.length) return;
								const next = [...punishments];
								[next[index], next[j]] = [next[j], next[index]];
								setPunishments(next);
							}}
							onRemove={() =>
								setPunishments(punishments.filter((_, i) => i !== index))
							}>
							<AdminField
								label={`Item ${index + 1}`}
								className='[&_label]:sr-only'>
								<Input
									value={item}
									onChange={e => {
										const next = [...punishments];
										next[index] = e.target.value;
										setPunishments(next);
									}}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{punishments.length === 0 && (
					<AdminEmptyState title='No punishments yet' />
				)}
				<AddRowButton onClick={() => setPunishments([...punishments, ''])}>
					Add item
				</AddRowButton>
			</AdminFormSection>
			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

export function AntiRaggingContactsForm({
	initialData,
	pageSlug,
	onChange
}: BaseProps) {
	const { isPending, startTransition, status, setStatus } = useStatusFlow();
	const { register, control, handleSubmit, watch } = useForm({
		resolver: zodResolver(
			z.object({ emergencyContacts: z.array(contactSchema) })
		),
		defaultValues: { emergencyContacts: initialData.emergencyContacts }
	});
	const contacts = useFieldArray({ control, name: 'emergencyContacts' });

	const watchedData = watch();
	useEffect(() => {
		onChange?.({
			...initialData,
			emergencyContacts:
				watchedData.emergencyContacts as AntiRaggingData['emergencyContacts']
		});
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [watchedData, onChange, initialData]);

	const onSubmit = handleSubmit(data => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateAntiRagging(
					{ ...initialData, emergencyContacts: data.emergencyContacts },
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
			<AdminFormSection title='Emergency contacts'>
				<AdminItemList>
					{contacts.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={contacts.fields.length}
							title={
								watch(`emergencyContacts.${index}.title`) ||
								`Contact ${index + 1}`
							}
							subtitle={
								watch(`emergencyContacts.${index}.contact`) || undefined
							}
							onMove={d => contacts.move(index, index + d)}
							onRemove={() => contacts.remove(index)}>
							<AdminField label='Title'>
								<Input
									{...register(`emergencyContacts.${index}.title` as const)}
								/>
							</AdminField>
							<AdminField label='Contact'>
								<Input
									{...register(`emergencyContacts.${index}.contact` as const)}
								/>
							</AdminField>
							<AdminField label='Description'>
								<Input
									{...register(
										`emergencyContacts.${index}.description` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{contacts.fields.length === 0 && (
					<AdminEmptyState title='No contacts yet' />
				)}
				<AddRowButton
					onClick={() =>
						contacts.append({
							title: '',
							contact: '',
							description: '',
							icon: 'Phone',
							iconColor: 'text-red-600',
							bgColor: 'bg-red-100'
						})
					}>
					Add contact
				</AddRowButton>
			</AdminFormSection>
			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
