'use client';

import React, { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import Header from '@/components/header/header';
import HeaderAnnouncementsForm from '@/app/(Private Pages)/admin/home/components/HeaderAnnouncementsForm';

import type { ContactType } from '@prisma/client';

type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

type Props = {
	initialItems: { title: string; href: string }[];
	announcementsData: HeaderAnnouncementsData;
	contacts: ContactDTO[];
	pageSlug: string;
};

export default function HeaderAnnouncementsEditor({
	initialItems,
	announcementsData,
	contacts,
	pageSlug
}: Props) {
	const [items, setItems] = useState(initialItems);

	const mergedAnnouncements = useMemo(
		() => ({ ...announcementsData, items }),
		[announcementsData, items]
	);

	return (
		<Editable
			label='Header Announcements'
			formContent={
				<HeaderAnnouncementsForm
					initialItems={initialItems}
					pageSlug={pageSlug}
					onChange={setItems}
				/>
			}>
			<Header contacts={contacts} announcementsData={mergedAnnouncements} />
		</Editable>
	);
}
