'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateChairmanMessage } from '@/app/(Private Pages)/actions/about';
import type { ChairmanMessageData } from '@/app/(Private Pages)/actions/about';
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

type ParagraphFormValue = { id: string; value: string };

type FormValues = {
	headerTitle: string;
	headerSubtitle: string;
	quote: string;
	paragraphs: ParagraphFormValue[];
	more: ParagraphFormValue[];
};

type Props = {
	initialData: ChairmanMessageData;
	pageSlug: string;
	onChange?: (data: ChairmanMessageData) => void;
	visibleSections?: Array<'header' | 'content'>;
};

const createParagraph = (value = ''): ParagraphFormValue => ({
	id: crypto.randomUUID(),
	value
});

const normalize = (values: Partial<FormValues>): ChairmanMessageData => ({
	header: {
		title: (values.headerTitle ?? '').trim() || "Chairman's Message",
		subtitle:
			(values.headerSubtitle ?? '').trim() || 'A Vision for Excellence'
	},
	quote: (values.quote ?? '').trim() || undefined,
	paragraphs: (values.paragraphs ?? [])
		.map(p => (p.value ?? '').trim())
		.filter(Boolean),
	more: (values.more ?? [])
		.map(p => (p.value ?? '').trim())
		.filter(Boolean)
});

export default function ChairmanMessageForm({
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
			quote: initialData.quote || '',
			paragraphs:
				initialData.paragraphs.length > 0
					? initialData.paragraphs.map(v => createParagraph(v))
					: [createParagraph()],
			more:
				initialData.more.length > 0
					? initialData.more.map(v => createParagraph(v))
					: [createParagraph()]
		}
	});

	const paragraphsArray = useFieldArray({ control: form.control, name: 'paragraphs' });
	const moreArray = useFieldArray({ control: form.control, name: 'more' });

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
			const result = await updateChairmanMessage(pageSlug, normalize(values));
			setStatus(
				result.ok
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	const showSection = (section: 'header' | 'content') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('header') && (
				<AdminFormSection
					title="Chairman's message"
					description="Manage the chairman's message content displayed on the page.">
					<AdminFieldGrid>
						<AdminField label='Title' htmlFor='chm-title'>
							<Input
								id='chm-title'
								placeholder="Chairman's Message"
								{...form.register('headerTitle', { required: 'Title is required' })}
							/>
						</AdminField>
						<AdminField label='Subtitle' htmlFor='chm-sub'>
							<Input
								id='chm-sub'
								placeholder='A Vision for Excellence'
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
					<AdminFormSection title='Quote'>
						<AdminField label='Quote' htmlFor='chm-quote'>
							<Input
								id='chm-quote'
								placeholder='"Dear Students, Faculty, and Stakeholders,"'
								{...form.register('quote')}
							/>
						</AdminField>
					</AdminFormSection>

					<AdminFormSection title='Message paragraphs'>
						<AdminItemList>
							{paragraphsArray.fields.map((field, index) => (
								<AdminItemCard
									key={field.id}
									index={index}
									total={paragraphsArray.fields.length}
									title={`Paragraph ${index + 1}`}
									onMove={d => paragraphsArray.move(index, index + d)}
									onRemove={() => paragraphsArray.remove(index)}>
									<AdminField label={`Paragraph ${index + 1}`} className='[&_label]:sr-only'>
										<Textarea
											rows={4}
											placeholder='Enter paragraph content…'
											{...form.register(`paragraphs.${index}.value` as const)}
										/>
									</AdminField>
								</AdminItemCard>
							))}
						</AdminItemList>
						{paragraphsArray.fields.length === 0 && (
							<AdminEmptyState title='No paragraphs yet' />
						)}
						<AddRowButton onClick={() => paragraphsArray.append(createParagraph())}>
							Add paragraph
						</AddRowButton>
					</AdminFormSection>

					<AdminFormSection title='Additional content'>
						<AdminItemList>
							{moreArray.fields.map((field, index) => (
								<AdminItemCard
									key={field.id}
									index={index}
									total={moreArray.fields.length}
									title={`Section ${index + 1}`}
									onMove={d => moreArray.move(index, index + d)}
									onRemove={() => moreArray.remove(index)}>
									<AdminField label={`Section ${index + 1}`} className='[&_label]:sr-only'>
										<Textarea
											rows={3}
											placeholder='Additional content paragraph…'
											{...form.register(`more.${index}.value` as const)}
										/>
									</AdminField>
								</AdminItemCard>
							))}
						</AdminItemList>
						{moreArray.fields.length === 0 && (
							<AdminEmptyState title='No additional content yet' />
						)}
						<AddRowButton onClick={() => moreArray.append(createParagraph())}>
							Add content
						</AddRowButton>
					</AdminFormSection>
				</>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
