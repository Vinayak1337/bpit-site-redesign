'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray, type UseFieldArrayReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updatePrincipalMessage } from '@/app/(Private Pages)/actions/about';
import type { PrincipalMessageData } from '@/app/(Private Pages)/actions/about';
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
	academicLeadershipTitle: string;
	academicLeadershipDescription: string;
	strategicVisionTitle: string;
	strategicVisionDescription: string;
	studentMentorshipTitle: string;
	studentMentorshipDescription: string;
};

type Props = {
	initialData: PrincipalMessageData;
	pageSlug: string;
	onChange?: (data: PrincipalMessageData) => void;
	visibleSections?: Array<'hero' | 'content' | 'cards'>;
};

const createParagraph = (value = ''): ParagraphFormValue => ({
	id: crypto.randomUUID(),
	value
});

const normalize = (values: Partial<FormValues>): PrincipalMessageData => ({
	header: {
		title: (values.headerTitle ?? '').trim() || "Principal's Message",
		subtitle:
			(values.headerSubtitle ?? '').trim() || 'Leading Academic Excellence'
	},
	quote: (values.quote ?? '').trim() || undefined,
	paragraphs: (values.paragraphs ?? [])
		.map(p => (p.value ?? '').trim())
		.filter(Boolean),
	more: (values.more ?? []).map(p => (p.value ?? '').trim()).filter(Boolean),
	cards: {
		academicLeadership: {
			title:
				(values.academicLeadershipTitle ?? '').trim() || 'Academic Leadership',
			description:
				(values.academicLeadershipDescription ?? '').trim() ||
				'Guiding curriculum development and maintaining academic standards.'
		},
		strategicVision: {
			title: (values.strategicVisionTitle ?? '').trim() || 'Strategic Vision',
			description:
				(values.strategicVisionDescription ?? '').trim() ||
				'Developing long-term strategies for institutional growth and excellence.'
		},
		studentMentorship: {
			title:
				(values.studentMentorshipTitle ?? '').trim() || 'Student Mentorship',
			description:
				(values.studentMentorshipDescription ?? '').trim() ||
				'Fostering student development and career guidance.'
		}
	}
});

export default function PrincipalMessageForm({
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
					? initialData.paragraphs.map(createParagraph)
					: [createParagraph()],
			more:
				initialData.more.length > 0
					? initialData.more.map(createParagraph)
					: [createParagraph()],
			academicLeadershipTitle:
				initialData.cards?.academicLeadership?.title || 'Academic Leadership',
			academicLeadershipDescription:
				initialData.cards?.academicLeadership?.description || '',
			strategicVisionTitle:
				initialData.cards?.strategicVision?.title || 'Strategic Vision',
			strategicVisionDescription:
				initialData.cards?.strategicVision?.description || '',
			studentMentorshipTitle:
				initialData.cards?.studentMentorship?.title || 'Student Mentorship',
			studentMentorshipDescription:
				initialData.cards?.studentMentorship?.description || ''
		}
	});

	const paragraphs = useFieldArray({ control: form.control, name: 'paragraphs' });
	const more = useFieldArray({ control: form.control, name: 'more' });

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
			try {
				await updatePrincipalMessage(pageSlug, normalize(values));
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Failed to update principal message:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const showSection = (section: 'hero' | 'content' | 'cards') =>
		!visibleSections || visibleSections.includes(section);

	const renderListSection = (
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
			<AddRowButton onClick={() => array.append(createParagraph())}>
				{addLabel}
			</AddRowButton>
		</AdminFormSection>
	);

	const cardField = (
		cardTitleLabel: string,
		titleName:
			| 'academicLeadershipTitle'
			| 'strategicVisionTitle'
			| 'studentMentorshipTitle',
		descName:
			| 'academicLeadershipDescription'
			| 'strategicVisionDescription'
			| 'studentMentorshipDescription'
	) => (
		<AdminFormSection title={cardTitleLabel}>
			<AdminField label='Title'>
				<Input
					placeholder='Card title…'
					{...form.register(titleName)}
				/>
			</AdminField>
			<AdminField label='Description'>
				<Textarea
					rows={3}
					placeholder='Card description…'
					{...form.register(descName)}
				/>
			</AdminField>
		</AdminFormSection>
	);

	return (
		<AdminForm onSubmit={handleSubmit}>
			{showSection('hero') && (
				<AdminFormSection
					title="Principal's message"
					description='Header copy for the principal message section.'>
					<AdminFieldGrid>
						<AdminField label='Title' htmlFor='pm-title'>
							<Input
								id='pm-title'
								placeholder="Principal's Message"
								{...form.register('headerTitle')}
							/>
						</AdminField>
						<AdminField label='Subtitle' htmlFor='pm-sub'>
							<Input
								id='pm-sub'
								placeholder='Leading Academic Excellence and Innovation'
								{...form.register('headerSubtitle')}
							/>
						</AdminField>
					</AdminFieldGrid>
				</AdminFormSection>
			)}

			{showSection('content') && (
				<>
					<AdminFormSection title='Quote'>
						<AdminField label='Quote' className='[&_label]:sr-only'>
							<Input
								placeholder='"Dear Students and Academic Community,"'
								{...form.register('quote')}
							/>
						</AdminField>
					</AdminFormSection>

					{renderListSection(
						'Main content paragraphs',
						'Add paragraph',
						'Enter paragraph content…',
						'paragraphs',
						paragraphs,
						4
					)}

					{renderListSection(
						'Additional content',
						'Add content',
						'Additional content paragraph…',
						'more',
						more,
						3
					)}
				</>
			)}

			{showSection('cards') && (
				<>
					{cardField(
						'Academic Leadership card',
						'academicLeadershipTitle',
						'academicLeadershipDescription'
					)}
					{cardField(
						'Strategic Vision card',
						'strategicVisionTitle',
						'strategicVisionDescription'
					)}
					{cardField(
						'Student Mentorship card',
						'studentMentorshipTitle',
						'studentMentorshipDescription'
					)}
				</>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
