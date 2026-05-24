'use client';

import React, { useEffect, useState, useTransition } from 'react';
import type { UseFormReturn } from 'react-hook-form';
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
import { Trash2 } from 'lucide-react';
import type { GovernanceStructureData } from '@/app/(Private Pages)/actions/management';
import { updateGovernanceStructure } from '@/app/(Private Pages)/actions/management';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import {
	AddRowButton,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	AdminReorderControls,
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
	sections: z
		.array(
			z.object({
				id: z.string().min(1, 'Section ID is required'),
				title: z.string().min(1, 'Section title is required'),
				icon: z.string().min(1, 'Section icon is required'),
				iconColor: z.string().min(1, 'Section icon color is required'),
				description: z.string().min(1, 'Section description is required'),
				cards: z
					.array(
						z.object({
							title: z.string().min(1, 'Card title is required'),
							bgColor: z.string().min(1, 'Card background color is required'),
							textColor: z.string().min(1, 'Card text color is required'),
							listColor: z.string().min(1, 'Card list color is required'),
							items: z
								.array(z.string().min(1, 'Item text is required'))
								.min(1, 'At least one item is required')
						})
					)
					.min(1, 'At least one card is required')
			})
		)
		.min(1, 'At least one section is required')
});

type FormValues = z.infer<typeof formSchema>;

const normalizeGovernanceStructure = (
	values: FormValues
): GovernanceStructureData => ({
	hero: {
		title: values.hero.title.trim(),
		subtitle: values.hero.subtitle.trim(),
		icon: values.hero.icon.trim(),
		gradient: values.hero.gradient.trim(),
		iconColor: values.hero.iconColor.trim(),
		textColor: values.hero.textColor.trim()
	},
	sections: values.sections.map(section => ({
		id: section.id.trim(),
		title: section.title.trim(),
		icon: section.icon.trim(),
		iconColor: section.iconColor.trim(),
		description: section.description.trim(),
		cards: section.cards.map(card => ({
			title: card.title.trim(),
			bgColor: card.bgColor.trim(),
			textColor: card.textColor.trim(),
			listColor: card.listColor.trim(),
			items: card.items.map(i => i.trim()).filter(Boolean)
		}))
	}))
});

interface Props {
	initialData: GovernanceStructureData;
	pageSlug: string;
	onChange?: (data: GovernanceStructureData) => void;
	visibleSections?: Array<'hero' | 'sections'>;
}

/* Nested helpers: flat indented structure (no nested cards) */
function CardFields({
	form,
	sectionIndex,
	cardIndex
}: {
	form: UseFormReturn<FormValues>;
	sectionIndex: number;
	cardIndex: number;
}) {
	const items =
		form.watch(`sections.${sectionIndex}.cards.${cardIndex}.items`) ?? [];
	const setItems = (next: string[]) =>
		form.setValue(`sections.${sectionIndex}.cards.${cardIndex}.items`, next, {
			shouldDirty: true
		});
	return (
		<div className='flex flex-col gap-3'>
			<AdminField label='Card title'>
				<Input
					placeholder='Key Responsibilities'
					{...form.register(`sections.${sectionIndex}.cards.${cardIndex}.title`)}
				/>
			</AdminField>
			<AdminFieldGrid cols={3}>
				<AdminField label='Background color'>
					<Select
						value={
							form.watch(`sections.${sectionIndex}.cards.${cardIndex}.bgColor`) ||
							''
						}
						onValueChange={v =>
							form.setValue(
								`sections.${sectionIndex}.cards.${cardIndex}.bgColor`,
								v,
								{ shouldDirty: true }
							)
						}>
						<SelectTrigger>
							<SelectValue placeholder='Background' />
						</SelectTrigger>
						<SelectContent>
							{COLOR_OPTIONS.map(c => (
								<SelectItem key={c} value={`bg-${c}-50`}>
									bg-{c}-50
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</AdminField>
				<AdminField label='Text color'>
					<Select
						value={
							form.watch(
								`sections.${sectionIndex}.cards.${cardIndex}.textColor`
							) || ''
						}
						onValueChange={v =>
							form.setValue(
								`sections.${sectionIndex}.cards.${cardIndex}.textColor`,
								v,
								{ shouldDirty: true }
							)
						}>
						<SelectTrigger>
							<SelectValue placeholder='Text color' />
						</SelectTrigger>
						<SelectContent>
							{COLOR_OPTIONS.map(c => (
								<SelectItem key={c} value={`text-${c}-800`}>
									text-{c}-800
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</AdminField>
				<AdminField label='List color'>
					<Select
						value={
							form.watch(
								`sections.${sectionIndex}.cards.${cardIndex}.listColor`
							) || ''
						}
						onValueChange={v =>
							form.setValue(
								`sections.${sectionIndex}.cards.${cardIndex}.listColor`,
								v,
								{ shouldDirty: true }
							)
						}>
						<SelectTrigger>
							<SelectValue placeholder='List color' />
						</SelectTrigger>
						<SelectContent>
							{COLOR_OPTIONS.map(c => (
								<SelectItem key={c} value={`text-${c}-700`}>
									text-{c}-700
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</AdminField>
			</AdminFieldGrid>
			<div className='flex flex-col gap-2'>
				<p className='text-xs font-medium text-slate-500'>Items</p>
				{items.map((_, ii) => (
					<div key={ii} className='flex items-start gap-2'>
						<Input
							placeholder='List item'
							className='flex-1'
							{...form.register(
								`sections.${sectionIndex}.cards.${cardIndex}.items.${ii}` as const
							)}
						/>
						{items.length > 1 && (
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='h-10 w-10 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
								onClick={() => setItems(items.filter((_, i) => i !== ii))}>
								<Trash2 className='h-4 w-4' />
							</Button>
						)}
					</div>
				))}
				<AddRowButton onClick={() => setItems([...items, 'New item'])}>
					Add item
				</AddRowButton>
			</div>
		</div>
	);
}

function SectionFields({
	form,
	sectionIndex
}: {
	form: UseFormReturn<FormValues>;
	sectionIndex: number;
}) {
	const cardsArr = useFieldArray({
		control: form.control,
		name: `sections.${sectionIndex}.cards`
	});
	return (
		<>
			<AdminFieldGrid>
				<AdminField label='Section ID'>
					<Input
						placeholder='board-of-governors'
						{...form.register(`sections.${sectionIndex}.id`)}
					/>
				</AdminField>
				<AdminField label='Section title'>
					<Input
						placeholder='Board of Governors'
						{...form.register(`sections.${sectionIndex}.title`)}
					/>
				</AdminField>
				<AdminField label='Section icon'>
					<Select
						value={form.watch(`sections.${sectionIndex}.icon`) || ''}
						onValueChange={v =>
							form.setValue(`sections.${sectionIndex}.icon`, v, {
								shouldDirty: true
							})
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
						value={form.watch(`sections.${sectionIndex}.iconColor`) || ''}
						onValueChange={v =>
							form.setValue(`sections.${sectionIndex}.iconColor`, v, {
								shouldDirty: true
							})
						}>
						<SelectTrigger>
							<SelectValue placeholder='Select icon color' />
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
			<AdminField label='Section description'>
				<Textarea
					rows={3}
					placeholder='Section description'
					{...form.register(`sections.${sectionIndex}.description`)}
				/>
			</AdminField>
			<div className='flex flex-col gap-4'>
				<p className='text-xs font-medium uppercase tracking-wide text-slate-500'>
					Cards
				</p>
				{cardsArr.fields.map((card, ci) => (
					<div
						key={card.id}
						className='flex flex-col gap-3 border-l-2 border-slate-200 pl-4'>
						<div className='flex items-center justify-between gap-2'>
							<p className='text-sm font-semibold text-slate-800'>
								{form.watch(`sections.${sectionIndex}.cards.${ci}.title`) ||
									`Card ${ci + 1}`}
							</p>
							<div className='flex items-center gap-1'>
								<AdminReorderControls
									onUp={() => cardsArr.move(ci, ci - 1)}
									onDown={() => cardsArr.move(ci, ci + 1)}
									disableUp={ci === 0}
									disableDown={ci === cardsArr.fields.length - 1}
								/>
								{cardsArr.fields.length > 1 && (
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='h-8 w-8 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
										onClick={() => cardsArr.remove(ci)}>
										<Trash2 className='h-4 w-4' />
									</Button>
								)}
							</div>
						</div>
						<CardFields
							form={form}
							sectionIndex={sectionIndex}
							cardIndex={ci}
						/>
					</div>
				))}
				<AddRowButton
					onClick={() =>
						cardsArr.append({
							title: 'New Card',
							bgColor: 'bg-blue-50',
							textColor: 'text-blue-800',
							listColor: 'text-blue-700',
							items: ['Item 1']
						})
					}>
					Add card
				</AddRowButton>
			</div>
		</>
	);
}

export default function GovernanceStructureForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const {
		fields: sectionFields,
		append: appendSection,
		remove: removeSection,
		move: moveSection
	} = useFieldArray({ control: form.control, name: 'sections' });

	useEffect(() => {
		onChange?.(normalizeGovernanceStructure(form.getValues() as FormValues));
		const sub = form.watch(values => {
			onChange?.(normalizeGovernanceStructure(values as FormValues));
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
				await updateGovernanceStructure(
					normalizeGovernanceStructure(values),
					pageSlug
				);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Error updating governance structure data:', error);
				setStatus({ kind: 'error', message: 'Failed to save' });
			}
		});
	});

	const showSection = (section: 'hero' | 'sections') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={onSubmit}>
			{showSection('hero') && (
				<AdminFormSection
					title='Hero section'
					description='Headline copy and accent styling for the governance structure page.'>
					<AdminFieldGrid>
						<AdminField label='Hero title'>
							<Input
								placeholder='Governance Structure'
								{...form.register('hero.title')}
							/>
						</AdminField>
						<AdminField label='Hero subtitle'>
							<Input
								placeholder='Organizational Framework for Excellence'
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

			{showSection('sections') && (
				<AdminFormSection title='Sections'>
					<AdminItemList>
						{sectionFields.map((section, index) => (
							<AdminItemCard
								key={section.id}
								index={index}
								total={sectionFields.length}
								title={
									form.watch(`sections.${index}.title`) ||
									`Section ${index + 1}`
								}
								onMove={d => moveSection(index, index + d)}
								onRemove={
									sectionFields.length > 1
										? () => removeSection(index)
										: undefined
								}>
								<SectionFields form={form} sectionIndex={index} />
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton
						onClick={() =>
							appendSection({
								id: `section-${Date.now()}`,
								title: 'New Section',
								icon: 'Building2',
								iconColor: 'text-blue-600',
								description: 'Section description',
								cards: [
									{
										title: 'New Card',
										bgColor: 'bg-blue-50',
										textColor: 'text-blue-800',
										listColor: 'text-blue-700',
										items: ['Item 1', 'Item 2']
									}
								]
							})
						}>
						Add section
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
