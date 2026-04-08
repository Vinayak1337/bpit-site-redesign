'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import { ContactType, Prisma } from '@prisma/client';

const emailSchema = z.string().email();

const contactItemSchema = z.object({
	type: z.nativeEnum(ContactType),
	value: z.string().min(1),
	displayValue: z.string().nullable()
});

const contactsSchema = z
	.array(contactItemSchema)
	.min(1)
	.max(20)
	.superRefine((items, ctx) => {
		items.forEach((item, index) => {
			if (item.type === ContactType.EMAIL) {
				const result = emailSchema.safeParse(item.value);
				if (!result.success) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Enter a valid email address',
						path: [index, 'value']
					});
				}
			}
		});
	});

type ContactInput = z.infer<typeof contactItemSchema>;

const sanitizeContact = (contact: ContactInput): ContactInput | null => {
	const value = contact.value?.trim() ?? '';
	if (value.length === 0) {
		return null;
	}
	const displayValueRaw = contact.displayValue ?? null;
	const displayValue = displayValueRaw?.trim()?.length
		? displayValueRaw.trim()
		: null;
	return {
		type: contact.type,
		value,
		displayValue
	};
};

const sanitizeContacts = (contacts: ContactInput[]): ContactInput[] =>
	contacts
		.map(contact => sanitizeContact(contact))
		.filter((contact): contact is ContactInput => contact !== null);

export type ContactsPayload = ContactInput[];

export async function updateContacts(
	contacts: ContactsPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const sanitized = sanitizeContacts(contacts);
	if (sanitized.length === 0) {
		return { ok: false, error: 'no_contacts' };
	}
	const parsed = contactsSchema.safeParse(sanitized);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const previousContacts = await prisma.contact.findMany({
		orderBy: { createdAt: 'asc' },
		select: { id: true, type: true, value: true, displayValue: true }
	});

	await prisma.$transaction(async tx => {
		await tx.contact.deleteMany();
		await tx.contact.createMany({
			data: parsed.data.map(contact => ({
				type: contact.type,
				value: contact.value,
				displayValue: contact.displayValue ?? null
			}))
		});
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'OTHER',
		summary: 'Updated footer contact information',
		changes: [
			{
				resourceId: 'contacts',
				resourceType: 'OTHER',
				field: 'data',
				previousData: previousContacts as unknown as Prisma.InputJsonValue,
				newData: parsed.data as unknown as Prisma.InputJsonValue
			}
		]
	});

	return { ok: true };
}
