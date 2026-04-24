'use server';
import 'server-only';

import {
	makeReadSection,
	makeWriteSection,
	sectionDefs,
	subHeroSchema,
	contactSchema,
	type SubHeroData,
	type ContactData
} from './_library-subpage-shared';
import {
	CONTACT_HERO_DEFAULT,
	CONTACT_DEFAULT
} from './_library-subpage-defaults';

const SLUG = 'contact';
const PAGE_SLUG = `academia-library-${SLUG}`;
const TITLE = 'Contact';
const DEFS = sectionDefs(PAGE_SLUG);
const read = makeReadSection(PAGE_SLUG);
const write = makeWriteSection(PAGE_SLUG, TITLE, SLUG);

export async function getHero(): Promise<SubHeroData> {
	return read(DEFS.HERO, subHeroSchema, () => CONTACT_HERO_DEFAULT);
}
export async function getContact(): Promise<ContactData> {
	return read(DEFS.CONTACT, contactSchema, () => CONTACT_DEFAULT);
}
export async function updateHero(data: SubHeroData) {
	return write(DEFS.HERO, subHeroSchema, data, `Updated ${PAGE_SLUG} hero`);
}
export async function updateContact(data: ContactData) {
	return write(DEFS.CONTACT, contactSchema, data, `Updated ${PAGE_SLUG} contact`);
}
