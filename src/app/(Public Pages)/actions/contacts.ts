import 'server-only';

import { ContactType } from '@prisma/client';
import prisma from '@/lib/prisma';

export type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

export async function getContacts(): Promise<ContactDTO[]> {
	const contacts = await prisma.contact.findMany({
		orderBy: { createdAt: 'asc' },
		select: { type: true, value: true, displayValue: true }
	});

	return contacts;
}
