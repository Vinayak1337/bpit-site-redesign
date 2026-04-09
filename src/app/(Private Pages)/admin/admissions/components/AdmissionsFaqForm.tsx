'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	type AdmissionsFaqContact,
	type AdmissionsFaqIntro,
	type AdmissionsFaqItem,
	updateAdmissionsFaqContact,
	updateAdmissionsFaqIntro,
	updateAdmissionsFaqItems
} from '@/app/(Private Pages)/actions/admissions';

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
	const [message, setMessage] = useState<string | null>(null);

	const defaults = useMemo<FormValues>(
		() => ({
			badge: initialData.intro.badge,
			title: initialData.intro.title,
			subtitle: initialData.intro.subtitle,
			browseTitle: initialData.intro.browseTitle,
			items:
				initialData.items.length > 0
					? initialData.items.map(item => ({
					id: item.id ?? createFaqItemId(),
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
		const subscription = form.watch(values => {
			onChange?.(normalizeData(values as FormValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeData(values);
		startTransition(async () => {
			const tasks = [];
			if (includes(visibleSections, 'intro')) {
				tasks.push(updateAdmissionsFaqIntro(payload.intro));
			}
			if (includes(visibleSections, 'items')) {
				tasks.push(updateAdmissionsFaqItems(payload.items));
			}
			if (includes(visibleSections, 'contact')) {
				tasks.push(updateAdmissionsFaqContact(payload.contact));
			}
			const results = await Promise.all(tasks);
			setMessage(results.every(result => result.ok) ? 'Saved' : 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'
				onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>Admissions FAQs</h3>
						<p className='text-sm text-slate-500'>
							Manage the intro, question library, and contact help block.
						</p>
					</div>
					<div className='flex items-center gap-2'>
						{message ? (
							<span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						) : null}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving...' : 'Save changes'}
						</Button>
					</div>
				</div>

				{includes(visibleSections, 'intro') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Intro</h4>
						<FormField control={form.control} name='badge' render={({ field }) => <FormItem><FormLabel>Badge</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='title' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='subtitle' render={({ field }) => <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='browseTitle' render={({ field }) => <FormItem><FormLabel>Browse title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
					</section>
				) : null}

				{includes(visibleSections, 'items') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>FAQ items</h4>
							<Button type='button' variant='outline' size='sm' onClick={() => itemsArray.append(createItem())}>
								Add item
							</Button>
						</div>
						<div className='space-y-4'>
							{itemsArray.fields.map((field, index) => (
								<div key={field.id} className='space-y-4 rounded-xl border border-slate-200 bg-white p-4'>
									<div className='flex items-center justify-between'>
										<span className='text-sm font-medium text-slate-700'>FAQ {index + 1}</span>
										<Button type='button' variant='ghost' size='sm' onClick={() => itemsArray.remove(index)}>
											Remove
										</Button>
									</div>
									<div className='grid gap-4 sm:grid-cols-2'>
										{/* id is auto-assigned — not shown to admin */}
										<FormField control={form.control} name={`items.${index}.category`} render={({ field }) => <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`items.${index}.question`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Question</FormLabel><FormControl><Textarea rows={2} className='resize-none' {...field} /></FormControl></FormItem>} />
										<FormField control={form.control} name={`items.${index}.answer`} render={({ field }) => <FormItem className='sm:col-span-2'><FormLabel>Answer</FormLabel><FormControl><Textarea rows={4} className='resize-none' {...field} /></FormControl></FormItem>} />
									</div>
								</div>
							))}
						</div>
					</section>
				) : null}

				{includes(visibleSections, 'contact') ? (
					<section className='space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5'>
						<h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>Contact</h4>
						<FormField control={form.control} name='contactTitle' render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						<FormField control={form.control} name='contactDescription' render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
						<div className='grid gap-4 sm:grid-cols-2'>
							<FormField control={form.control} name='contactPhone' render={({ field }) => <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
							<FormField control={form.control} name='contactEmail' render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>} />
						</div>
						<FormField control={form.control} name='contactAddress' render={({ field }) => <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea rows={3} className='resize-none' {...field} /></FormControl></FormItem>} />
					</section>
				) : null}
			</form>
		</Form>
	);
}
