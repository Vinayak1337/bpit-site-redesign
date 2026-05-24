'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray, type UseFieldArrayReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateFounderTribute } from '@/app/(Private Pages)/actions/about';
import type { FounderTributeData } from '@/app/(Private Pages)/actions/about';
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

type StringFormValue = { id: string; value: string };

type FormValues = {
	headerTitle: string;
	headerSubtitle: string;
	paragraphs: StringFormValue[];
	quote: string;
	more: StringFormValue[];
	coreValues: StringFormValue[];
	commitments: StringFormValue[];
};

type Props = {
	initialData: FounderTributeData;
	pageSlug: string;
	onChange?: (data: FounderTributeData) => void;
	visibleSections?: Array<'hero' | 'content' | 'values'>;
};

const createString = (value = ''): StringFormValue => ({
	id: crypto.randomUUID(),
	value
});

const normalize = (values: Partial<FormValues>): FounderTributeData => {
	const trimList = (list?: StringFormValue[]) =>
		(list ?? []).map(i => (i.value ?? '').trim()).filter(Boolean);
	return {
		header: {
			title:
				(values.headerTitle ?? '').trim() ||
				'In Memory of Our Visionary Founder',
			subtitle:
				(values.headerSubtitle ?? '').trim() ||
				'Bhagwan Parshuram - The Divine Inspiration'
		},
		paragraphs: trimList(values.paragraphs),
		quote:
			(values.quote ?? '').trim() ||
			'"Education is the most powerful weapon which you can use to change the world."',
		more: trimList(values.more),
		coreValues: trimList(values.coreValues),
		commitments: trimList(values.commitments)
	};
};

function StringListSection({
	title,
	addLabel,
	placeholder,
	textarea,
	rows = 4,
	array,
	name
}: {
	title: string;
	addLabel: string;
	placeholder: string;
	textarea?: boolean;
	rows?: number;
	array: UseFieldArrayReturn<FormValues, never>;
	name: 'paragraphs' | 'more' | 'coreValues' | 'commitments';
	// register prop intentionally omitted; we pass via children below
}) {
	return null; // unused — kept compact and inline below
}
void StringListSection;

export default function FounderTributeForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		defaultValues: {
			headerTitle: initialData.header.title,
			headerSubtitle: initialData.header.subtitle,
			paragraphs:
				initialData.paragraphs.length > 0
					? initialData.paragraphs.map(createString)
					: [createString()],
			quote: initialData.quote,
			more:
				initialData.more.length > 0
					? initialData.more.map(createString)
					: [createString()],
			coreValues:
				initialData.coreValues.length > 0
					? initialData.coreValues.map(createString)
					: [createString()],
			commitments:
				initialData.commitments.length > 0
					? initialData.commitments.map(createString)
					: [createString()]
		}
	});

	const paragraphs = useFieldArray({ control: form.control, name: 'paragraphs' });
	const more = useFieldArray({ control: form.control, name: 'more' });
	const coreValues = useFieldArray({ control: form.control, name: 'coreValues' });
	const commitments = useFieldArray({ control: form.control, name: 'commitments' });

	useEffect(() => {
		onChange?.(normalize(form.getValues()));
		const sub = form.watch(values => {
			onChange?.(normalize(values as Partial<FormValues>));
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
			const result = await updateFounderTribute(pageSlug, normalize(values));
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	const showSection = (section: 'hero' | 'content' | 'values') =>
		!visibleSections || visibleSections.includes(section);

	const renderTextList = (
		title: string,
		addLabel: string,
		placeholder: string,
		fieldName: 'paragraphs' | 'more',
		array: UseFieldArrayReturn<FormValues, 'paragraphs' | 'more', 'id'>,
		rows: number
	) => (
		<AdminFormSection title={title}>
			<AdminItemList>
				{array.fields.map((field, index) => (
					<AdminItemCard
						key={field.id}
						index={index}
						total={array.fields.length}
						title={`Item ${index + 1}`}
						onMove={d => array.move(index, index + d)}
						onRemove={() => array.remove(index)}>
						<AdminField label={`Item ${index + 1}`} className='[&_label]:sr-only'>
							<Textarea
								rows={rows}
								placeholder={placeholder}
								{...form.register(`${fieldName}.${index}.value` as const)}
							/>
						</AdminField>
					</AdminItemCard>
				))}
			</AdminItemList>
			{array.fields.length === 0 && <AdminEmptyState title='None yet' />}
			<AddRowButton onClick={() => array.append(createString())}>
				{addLabel}
			</AddRowButton>
		</AdminFormSection>
	);

	const renderInputList = (
		title: string,
		addLabel: string,
		placeholder: string,
		fieldName: 'coreValues' | 'commitments',
		array: UseFieldArrayReturn<FormValues, 'coreValues' | 'commitments', 'id'>
	) => (
		<AdminFormSection title={title}>
			<AdminItemList>
				{array.fields.map((field, index) => (
					<AdminItemCard
						key={field.id}
						index={index}
						total={array.fields.length}
						title={`${title.replace(/s$/, '')} ${index + 1}`}
						onMove={d => array.move(index, index + d)}
						onRemove={() => array.remove(index)}>
						<AdminField label={title} className='[&_label]:sr-only'>
							<Input
								placeholder={placeholder}
								{...form.register(`${fieldName}.${index}.value` as const)}
							/>
						</AdminField>
					</AdminItemCard>
				))}
			</AdminItemList>
			{array.fields.length === 0 && <AdminEmptyState title='None yet' />}
			<AddRowButton onClick={() => array.append(createString())}>
				{addLabel}
			</AddRowButton>
		</AdminFormSection>
	);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('hero') && (
				<AdminFormSection
					title='Founder tribute'
					description='Hero copy for the founder tribute section.'>
					<AdminFieldGrid>
						<AdminField label='Title' htmlFor='ft-title'>
							<Input
								id='ft-title'
								placeholder='In Memory of Our Visionary Founder'
								{...form.register('headerTitle', { required: 'Title is required' })}
							/>
						</AdminField>
						<AdminField label='Subtitle' htmlFor='ft-sub'>
							<Input
								id='ft-sub'
								placeholder='Bhagwan Parshuram - The Divine Inspiration'
								{...form.register('headerSubtitle', {
									required: 'Subtitle is required'
								})}
							/>
						</AdminField>
					</AdminFieldGrid>
				</AdminFormSection>
			)}

			{showSection('content') && (
				<>
					{renderTextList(
						'Introduction paragraphs',
						'Add paragraph',
						'Enter paragraph content…',
						'paragraphs',
						paragraphs,
						4
					)}

					<AdminFormSection title='Inspirational quote'>
						<AdminField label='Quote' className='[&_label]:sr-only'>
							<Textarea
								rows={3}
								placeholder='"Education is the most powerful weapon which you can use to change the world."'
								{...form.register('quote', { required: 'Quote is required' })}
							/>
						</AdminField>
					</AdminFormSection>

					{renderTextList(
						'Additional content',
						'Add content',
						'Enter additional content…',
						'more',
						more,
						3
					)}
				</>
			)}

			{showSection('values') && (
				<>
					{renderInputList(
						'Core values',
						'Add value',
						'Core value…',
						'coreValues',
						coreValues
					)}
					{renderInputList(
						'Commitments',
						'Add commitment',
						'Commitment…',
						'commitments',
						commitments
					)}
				</>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
