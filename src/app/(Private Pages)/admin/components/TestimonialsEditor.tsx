'use client';

import { useCallback, useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import Testimonial from '@/components/carousel/testimonial';
import TestimonialsForm, { type TestimonialsFormValues } from '@/app/(Private Pages)/admin/components/TestimonialsForm';

const normalizeTestimonialsData = (
	data: TestimonialsData
): TestimonialsData => {
	const title = data.title ?? '';
	const subtitle = data.subtitle ?? '';
	const testimonials = (data.testimonials ?? [])
		.map((item, index) => {
			const id = Number.isFinite(item.id) ? item.id : index + 1;
			const rating = Number.isFinite(item.rating)
				? Math.min(5, Math.max(1, Math.round(item.rating)))
				: 5;
			const tags = Array.isArray(item.tags)
				? item.tags.map(tag => tag.trim()).filter(tag => tag.length > 0)
				: [];
			const name = item.name ?? '';
			const testimonial = item.testimonial ?? '';
			if (name.length === 0 || testimonial.length === 0) {
				return null;
			}
			return {
				id,
				name,
				batch: item.batch ?? '',
				company: item.company ?? '',
				position: item.position ?? '',
				image: item.image ?? '',
				video: item.video ?? '',
				testimonial,
				rating,
				achievement: item.achievement ?? '',
				tags
			};
		})
		.filter((item): item is TestimonialItem => item !== null);

	return { title, subtitle, testimonials };
};

const toFormValues = (data: TestimonialsData): TestimonialsFormValues => ({
	title: data.title ?? '',
	subtitle: data.subtitle ?? '',
	testimonials: (data.testimonials ?? []).map(testimonial => ({
		id: crypto.randomUUID(),
		name: testimonial.name,
		batch: testimonial.batch ?? '',
		company: testimonial.company ?? '',
		position: testimonial.position ?? '',
		image: testimonial.image ?? '',
		video: testimonial.video ?? '',
		testimonial: testimonial.testimonial,
		rating: String(testimonial.rating ?? 5),
		achievement: testimonial.achievement ?? '',
		tags: (testimonial.tags ?? []).join(', ')
	}))
});

type TestimonialsEditorProps = {
	initialData: TestimonialsData;
	pageSlug: string;
};

export default function TestimonialsEditor({
	initialData,
	pageSlug
}: TestimonialsEditorProps) {
	const normalized = useMemo(
		() => normalizeTestimonialsData(initialData),
		[initialData]
	);
	const initialFormValues = useMemo(
		() => toFormValues(normalized),
		[normalized]
	);
	const [previewData, setPreviewData] = useState<TestimonialsData>(normalized);

	const handlePreviewChange = useCallback((data: TestimonialsData) => {
		const normalizedData = normalizeTestimonialsData(data);
		setPreviewData(prev =>
			JSON.stringify(prev) === JSON.stringify(normalizedData)
				? prev
				: normalizedData
		);
	}, []);

	return (
		<Editable
			label='Testimonials'
			formContent={
				<TestimonialsForm
					initialValues={initialFormValues}
					pageSlug={pageSlug}
					onChange={handlePreviewChange}
				/>
			}>
			<Testimonial data={previewData} />
		</Editable>
	);
}
