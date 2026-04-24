'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import { AntiRaggingData } from '@/app/(Private Pages)/actions/statutory-committees';
import {
	AntiRaggingHeroSection,
	AntiRaggingDefinitionSection,
	AntiRaggingMembersSection,
	AntiRaggingMeasuresSection,
	AntiRaggingPunishmentsSection,
	AntiRaggingContactsSection
} from '@/components/statutory-committees/AntiRaggingView';
import {
	AntiRaggingHeroForm,
	AntiRaggingDefinitionForm,
	AntiRaggingMembersForm,
	AntiRaggingMeasuresForm,
	AntiRaggingPunishmentsForm,
	AntiRaggingContactsForm
} from './AntiRaggingForms';

type EditorProps = {
	initialData: AntiRaggingData;
	pageSlug: string;
};

export function AntiRaggingHeroEditor({ initialData, pageSlug }: EditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AntiRaggingData>(initial);

	const formContent = useMemo(
		() => (
			<AntiRaggingHeroForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label='Hero Section' presentation='dialog' formContent={formContent}>
			<AntiRaggingHeroSection data={previewData.hero} />
		</Editable>
	);
}

export function AntiRaggingDefinitionEditor({
	initialData,
	pageSlug
}: EditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AntiRaggingData>(initial);

	const formContent = useMemo(
		() => (
			<AntiRaggingDefinitionForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label='Definition & Scope' presentation='dialog' formContent={formContent}>
			<AntiRaggingDefinitionSection
				data={previewData.definition}
				heroIcon={previewData.hero.icon}
			/>
		</Editable>
	);
}

export function AntiRaggingMembersEditor({
	initialData,
	pageSlug
}: EditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AntiRaggingData>(initial);

	const formContent = useMemo(
		() => (
			<AntiRaggingMembersForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label='Committee Members' presentation='dialog' formContent={formContent}>
			<AntiRaggingMembersSection data={previewData.committeeMembers} />
		</Editable>
	);
}

export function AntiRaggingMeasuresEditor({
	initialData,
	pageSlug
}: EditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AntiRaggingData>(initial);

	const formContent = useMemo(
		() => (
			<AntiRaggingMeasuresForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label='Preventive Measures' presentation='dialog' formContent={formContent}>
			<AntiRaggingMeasuresSection data={previewData.preventiveMeasures} />
		</Editable>
	);
}

export function AntiRaggingPunishmentsEditor({
	initialData,
	pageSlug
}: EditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AntiRaggingData>(initial);

	const formContent = useMemo(
		() => (
			<AntiRaggingPunishmentsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label='Punishments' presentation='dialog' formContent={formContent}>
			<AntiRaggingPunishmentsSection data={previewData.punishments} />
		</Editable>
	);
}

export function AntiRaggingContactsEditor({
	initialData,
	pageSlug
}: EditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AntiRaggingData>(initial);

	const formContent = useMemo(
		() => (
			<AntiRaggingContactsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label='Emergency Contacts' presentation='dialog' formContent={formContent}>
			<AntiRaggingContactsSection data={previewData.emergencyContacts} />
		</Editable>
	);
}
