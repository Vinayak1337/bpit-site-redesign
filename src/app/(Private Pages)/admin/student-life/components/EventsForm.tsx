'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateEventsFestivals,
	type EventsFestivalsData
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
	initialData: EventsFestivalsData;
	onChange?: (data: EventsFestivalsData) => void;
	visibleSections?: Array<'header' | 'events'>;
}

export default function EventsForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<EventsFestivalsData>({ defaultValues: initialData });
	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'events'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			onChange?.(values as EventsFestivalsData);
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
			const result = await updateEventsFestivals(
				'student-life-events-and-festivals',
				values
			);
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: result.error ?? 'Save failed' }
			);
		});
	});

	const showSection = (section: 'header' | 'events') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('header') && (
				<AdminFormSection
					title='Page header'
					description='Title and intro for the events & festivals page.'>
					<AdminField label='Page title' htmlFor='ev-title'>
						<Input id='ev-title' {...form.register('title')} />
					</AdminField>
					<AdminField label='Description' htmlFor='ev-desc'>
						<Textarea id='ev-desc' rows={3} {...form.register('description')} />
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('events') && (
				<AdminFormSection title='Events'>
					<AdminItemList>
						{fields.map((field, index) => {
							const image = form.watch(`events.${index}.image`);
							return (
								<AdminItemCard
									key={field.id}
									index={index}
									total={fields.length}
									title={
										form.watch(`events.${index}.title`) || `Event ${index + 1}`
									}
									subtitle={form.watch(`events.${index}.month`) || undefined}
									onMove={d => move(index, index + d)}
									onRemove={() => remove(index)}>
									<AdminFieldGrid>
										<AdminField label='Title'>
											<Input
												{...form.register(`events.${index}.title` as const)}
											/>
										</AdminField>
										<AdminField label='Type'>
											<Input
												placeholder='Cultural, Technical'
												{...form.register(`events.${index}.type` as const)}
											/>
										</AdminField>
										<AdminField label='Icon'>
											<Input
												placeholder='Calendar, Trophy'
												{...form.register(`events.${index}.icon` as const)}
											/>
										</AdminField>
										<AdminField label='Month / date'>
											<Input
												placeholder='February'
												{...form.register(`events.${index}.month` as const)}
											/>
										</AdminField>
									</AdminFieldGrid>
									<AdminField label='Image'>
										<Input
											placeholder='Image URL'
											{...form.register(`events.${index}.image` as const)}
										/>
										<div className='mt-2'>
											<UploadButton
												onUpload={url =>
													form.setValue(`events.${index}.image`, url, {
														shouldDirty: true
													})
												}
												buttonText='Upload image'
											/>
										</div>
										{image && (
											<div className='mt-3 h-16 w-16 overflow-hidden rounded border border-slate-200'>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={image}
													alt='Event preview'
													className='h-full w-full object-cover'
												/>
											</div>
										)}
									</AdminField>
									<AdminField label='Description'>
										<Textarea
											rows={2}
											{...form.register(`events.${index}.description` as const)}
										/>
									</AdminField>
									<AdminField
										label='Highlights'
										hint='Comma separated.'>
										<Input
											value={
												(
													form.watch(`events.${index}.highlights`) as
														| string[]
														| undefined
												)?.join(', ') || ''
											}
											onChange={event =>
												form.setValue(
													`events.${index}.highlights`,
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
					{fields.length === 0 && <AdminEmptyState title='No events yet' />}
					<AddRowButton
						onClick={() =>
							append({
								title: 'New Event',
								type: 'Cultural',
								description: '',
								icon: 'Calendar',
								month: 'January',
								highlights: [],
								image: ''
							})
						}>
						Add event
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
