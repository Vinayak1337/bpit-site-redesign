'use client';

import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { GripVertical, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { updateMandatoryDisclosure } from '@/app/(Private Pages)/actions/mandatory-disclosure';
import {
	DisclosureData,
	disclosureDataSchema
} from '@/lib/schemas/mandatory-disclosure';
import {
	AddRowButton,
	AdminEmptyState,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

interface DisclosureItemsFormProps {
	initialData: DisclosureData;
	onChange?: (data: DisclosureData) => void;
}

export default function DisclosureItemsForm({
	initialData,
	onChange
}: DisclosureItemsFormProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const form = useForm<DisclosureData>({
		resolver: zodResolver(disclosureDataSchema),
		defaultValues: initialData
	});

	const { control, register, watch } = form;
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'items'
	});

	const items = watch('items');

	useEffect(() => {
		const sub = watch(value => {
			if (onChange) {
				onChange({
					...initialData,
					...value,
					items: value.items as DisclosureData['items']
				} as DisclosureData);
			}
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [watch, onChange, initialData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const existingCategories = Array.from(
		new Set(items?.map(item => item?.category).filter(Boolean))
	) as string[];

	const handleSubmit = form.handleSubmit(async data => {
		setIsSaving(true);
		setStatus({ kind: 'saving' });
		try {
			await updateMandatoryDisclosure({ ...initialData, ...data });
			setStatus({ kind: 'success', message: 'Saved' });
			toast.success('Mandatory Disclosure updated successfully');
		} catch (error) {
			console.error(error);
			setStatus({ kind: 'error', message: 'Save failed' });
			toast.error('Failed to update mandatory disclosure');
		} finally {
			setIsSaving(false);
		}
	});

	const handleDragEnd = (result: { destination?: { index: number } | null; source: { index: number } }) => {
		if (!result.destination) return;
		move(result.source.index, result.destination.index);
	};

	if (!isMounted) return null;

	return (
		<AdminForm onSubmit={handleSubmit}>
			<AdminFormSection
				title='Disclosure documents'
				description='Each document appears on the public disclosure index. Drag the grip handle to reorder.'>
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId='disclosure-items'>
						{provided => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className='flex flex-col gap-3'>
								{fields.map((field, index) => (
									<Draggable
										key={field.id}
										draggableId={field.id}
										index={index}>
										{dragProvided => (
											<div
												ref={dragProvided.innerRef}
												{...dragProvided.draggableProps}
												className='flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'>
												<button
													type='button'
													{...dragProvided.dragHandleProps}
													className='mt-2 cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing'
													aria-label='Drag to reorder'>
													<GripVertical className='h-4 w-4' />
												</button>
												<div className='flex-1'>
													<AdminFieldGrid cols={3}>
														<AdminField label='Title'>
															<Input
																placeholder='Document Title'
																{...register(`items.${index}.title`)}
															/>
														</AdminField>
														<AdminField label='URL / Link'>
															<Input
																placeholder='https://…'
																{...register(`items.${index}.url`)}
															/>
														</AdminField>
														<AdminField label='Category'>
															<Input
																placeholder='e.g. Approvals'
																list={`categories-${index}`}
																{...register(`items.${index}.category`)}
															/>
															<datalist id={`categories-${index}`}>
																{existingCategories.map(cat => (
																	<option key={cat} value={cat} />
																))}
															</datalist>
														</AdminField>
													</AdminFieldGrid>
												</div>
												<Button
													type='button'
													variant='ghost'
													size='icon'
													className='mt-1 h-8 w-8 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
													onClick={() => remove(index)}
													aria-label='Remove document'>
													<Trash2 className='h-4 w-4' />
												</Button>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				{fields.length === 0 && (
					<AdminEmptyState title='No documents yet' />
				)}
				<AddRowButton
					onClick={() =>
						append({
							id: `new-${Date.now()}`,
							title: '',
							url: '',
							category: 'General'
						})
					}>
					Add document
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isSaving} />
		</AdminForm>
	);
}
