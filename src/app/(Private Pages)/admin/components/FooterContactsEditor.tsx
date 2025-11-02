'use client';

import { useCallback, useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import Footer from '@/components/footer/BPITFooter';
import FooterContactsForm from '@/app/(Private Pages)/admin/components/FooterContactsForm';
import { ContactType } from '@prisma/client';

type FooterContactsEditorProps = {
	initialContacts: {
		type: ContactType;
		value: string;
		displayValue: string | null;
	}[];
	bottomLeftContent: FooterBottomLeftContent;
};

const sanitizeContacts = (
	contacts: FooterContactsEditorProps['initialContacts']
) =>
	contacts.map(contact => ({
		type: contact.type,
		value: contact.value,
		displayValue: contact.displayValue ?? null
	}));

export default function FooterContactsEditor({
	initialContacts,
	bottomLeftContent
}: FooterContactsEditorProps) {
	const normalized = useMemo(
		() => sanitizeContacts(initialContacts),
		[initialContacts]
	);
	const [previewContacts, setPreviewContacts] = useState(normalized);

	const handleChange = useCallback((contacts: typeof previewContacts) => {
		setPreviewContacts(sanitizeContacts(contacts));
	}, []);

	return (
		<Editable
			label='Footer'
			formContent={
				<FooterContactsForm
					initialContacts={normalized}
					onChange={handleChange}
				/>
			}>
			<Footer
				contacts={previewContacts}
				bottomLeftContent={bottomLeftContent}
			/>
		</Editable>
	);
}
