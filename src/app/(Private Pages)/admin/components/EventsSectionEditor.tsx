'use client';
import { useCallback, useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import EventsSection from '@/components/carousel/events-section';
import EventsSectionForm, {
	toFormValuesFromEventsSection
} from '@/app/(Private Pages)/admin/components/EventsSectionForm';
import { toEventsSectionComponentData } from '@/lib/carousel-adapters';

type EventsSectionEditorProps = {
	initialData: EventsSectionData;
	pageSlug: string;
};

const normalizeEvents = (data: EventsSectionData): EventsSectionData => ({
	events: data.events ?? []
});

const eventsSectionsEqual = (
	a: EventsSectionData,
	b: EventsSectionData
): boolean => JSON.stringify(a) === JSON.stringify(b);

export default function EventsSectionEditor({
	initialData,
	pageSlug
}: EventsSectionEditorProps) {
	const normalized = useMemo(() => normalizeEvents(initialData), [initialData]);
	const initialFormValues = useMemo(
		() => toFormValuesFromEventsSection(normalized),
		[normalized]
	);
	const [previewData, setPreviewData] = useState<EventsSectionData>(normalized);

	const handlePreviewChange = useCallback((section: EventsSectionData) => {
		const normalizedSection = normalizeEvents(section);
		setPreviewData(prev =>
			eventsSectionsEqual(prev, normalizedSection) ? prev : normalizedSection
		);
	}, []);

	const formContent = useMemo(
		() => (
			<EventsSectionForm
				initialValues={initialFormValues}
				pageSlug={pageSlug}
				onChange={handlePreviewChange}
			/>
		),
		[initialFormValues, pageSlug, handlePreviewChange]
	);

	return (
		<Editable
			label='Events'
			formContent={formContent}>
			<EventsSection data={toEventsSectionComponentData(previewData)} />
		</Editable>
	);
}
