'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	type AdmissionsFaqContact,
	type AdmissionsFaqIntro,
	type AdmissionsFaqItem,
	updateAdmissionsFaqContact,
	updateAdmissionsFaqIntro,
	updateAdmissionsFaqItems
} from '@/app/(Private Pages)/actions/admissions';
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

type FaqPageData = {
	intro: AdmissionsFaqIntro;
	items: AdmissionsFaqItem[];
	contact: AdmissionsFaqContact;
};

type Props = {
	initialData: FaqPageData;
	onChange?: (data: FaqPageData) => void;
	visibleSections?: Array<'intro' | 'items' | 'contact'>;
};

type FormValues = {
	badge: string;
	title: string;
	subtitle: string;
	browseTitle: string;
	items: Array<{
		id: number;
		question: string;
		answer: string;
		category: string;
	}>;
	contactTitle: string;
	contactDescription: string;
	contactPhone: string;
	contactEmail: string;
	contactAddress: string;
};

let nextFaqItemId = 100000;
const createFaqItemId = () => {
	nextFaqItemId += 1;
	return nextFaqItemId;
};
const createItem = () => ({
	id: createFaqItemId(),
	question: '',
	answer: '',
	category: ''
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

const normalizeData = (values: FormValues): FaqPageData => ({
	intro: {
		badge: values.badge.trim(),
		title: values.title.trim(),
		subtitle: values.subtitle.trim(),
		browseTitle: values.browseTitle.trim()
	},
	items: values.items
		.map(item => ({
			id: Number(item.id) || createFaqItemId(),
			question: item.question.trim(),
			answer: item.answer.trim(),
			category: item.category.trim()
		}))
		.filter(item => item.question && item.answer && item.category),
	contact: {
		title: values.contactTitle.trim(),
		description: values.contactDescription.trim(),
		phone: values.contactPhone.trim(),
		email: values.contactEmail.trim(),
		address: values.contactAddress.trim()
	}
});

export default function AdmissionsFaqForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const defaults = useMemo<FormValues>(
		() => ({
			badge: initialData.intro.badge,
			title: initialData.intro.title,
			subtitle: initialData.intro.subtitle,
			browseTitle: initialData.intro.browseTitle,
			items:
				initialData.items.length > 0
					? initialData.items.map(item => ({
							id: item.id,
							question: item.question,
							answer: item.answer,
							category: item.category
						}))
					: [createItem()],
			contactTitle: initialData.contact.title,
			contactDescription: initialData.contact.description,
			contactPhone: initialData.contact.phone,
			contactEmail: initialData.contact.email,
			contactAddress: initialData.contact.address
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const itemsArray = useFieldArray({ control: form.control, name: 'items' });

	useEffect(() => {
		form.reset(defaults);
	}, [defaults, form]);

	useEffect(() => {
		onChange?.(normalizeData(form.getValues()));
		const sub = form.watch(values => {
			onChange?.(normalizeData(values as FormValues));
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
		const payload = normalizeData(values);
		startTransition(async () => {
			const tasks: Promise<{ ok: boolean }>[] = [];
			if (includes(visibleSections, 'intro'))
				tasks.push(updateAdmissionsFaqIntro(payload.intro));
			if (includes(visibleSections, 'items'))
				tasks.push(updateAdmissionsFaqItems(payload.items));
			if (includes(visibleSections, 'contact'))
				tasks.push(updateAdmissionsFaqContact(payload.contact));
			const results = await Promise.all(tasks);
			setStatus(
				results.every(r => r.ok)
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			{includes(visibleSections, 'intro') && (
				<AdminFormSection
					title='Intro'
					description='Heading copy shown above the FAQ list.'>
					<AdminField label='Badge' htmlFor='faq-badge'>
						<Input id='faq-badge' {...form.register('badge')} />
					</AdminField>
					<AdminField label='Title' htmlFor='faq-title'>
						<Input id='faq-title' {...form.register('title')} />
					</AdminField>
					<AdminField label='Subtitle' htmlFor='faq-subtitle'>
						<Textarea
							id='faq-subtitle'
							rows={3}
							className='resize-none'
							{...form.register('subtitle')}
						/>
					</AdminField>
					<AdminField label='Browse title' htmlFor='faq-browse'>
						<Input id='faq-browse' {...form.register('browseTitle')} />
					</AdminField>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'items') && (
				<AdminFormSection title='FAQ items'>
					<AdminItemList>
						{itemsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={itemsArray.fields.length}
								title={form.watch(`items.${index}.question`) || `FAQ ${index + 1}`}
								subtitle={form.watch(`items.${index}.category`) || undefined}
								onMove={d => itemsArray.move(index, index + d)}
								onRemove={() => itemsArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='ID'>
										<Input
											type='number'
											{...form.register(`items.${index}.id` as const, {
												valueAsNumber: true
											})}
										/>
									</AdminField>
									<AdminField label='Category'>
										<Input {...form.register(`items.${index}.category` as const)} />
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Question'>
									<Textarea
										rows={2}
										className='resize-none'
										{...form.register(`items.${index}.question` as const)}
									/>
								</AdminField>
								<AdminField label='Answer'>
									<Textarea
										rows={4}
										className='resize-none'
										{...form.register(`items.${index}.answer` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{itemsArray.fields.length === 0 && (
						<AdminEmptyState
							title='No FAQs yet'
							description='Add a question and answer pair to get started.'
						/>
					)}
					<AddRowButton onClick={() => itemsArray.append(createItem())}>
						Add FAQ
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'contact') && (
				<AdminFormSection
					title='Contact help'
					description='Help block shown below the FAQ list.'>
					<AdminField label='Title' htmlFor='faq-ct-title'>
						<Input id='faq-ct-title' {...form.register('contactTitle')} />
					</AdminField>
					<AdminField label='Description' htmlFor='faq-ct-desc'>
						<Textarea
							id='faq-ct-desc'
							rows={3}
							className='resize-none'
							{...form.register('contactDescription')}
						/>
					</AdminField>
					<AdminFieldGrid>
						<AdminField label='Phone' htmlFor='faq-ct-phone'>
							<Input id='faq-ct-phone' {...form.register('contactPhone')} />
						</AdminField>
						<AdminField label='Email' htmlFor='faq-ct-email'>
							<Input id='faq-ct-email' {...form.register('contactEmail')} />
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Address' htmlFor='faq-ct-addr'>
						<Textarea
							id='faq-ct-addr'
							rows={3}
							className='resize-none'
							{...form.register('contactAddress')}
						/>
					</AdminField>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
