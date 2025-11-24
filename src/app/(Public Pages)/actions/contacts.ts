import 'server-only';

import { ContactType } from '@prisma/client';
import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

export async function getContacts(): Promise<ContactDTO[]> {
	return unstable_cache(
		async () => {
			const contacts = await prisma.contact.findMany({
				orderBy: { createdAt: 'asc' },
				select: { type: true, value: true, displayValue: true }
			});

			return contacts;
		},
		['contacts'],
		{ tags: ['contacts'], revalidate: 3600 }
	)();
}
