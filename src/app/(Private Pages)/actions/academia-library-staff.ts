'use server';
import 'server-only';

import {
	makeReadSection,
	makeWriteSection,
	sectionDefs,
	subHeroSchema,
	staffListSchema,
	type SubHeroData,
	type StaffListData
} from './_library-subpage-shared';
import {
	STAFF_HERO_DEFAULT,
	STAFF_LIST_DEFAULT
} from './_library-subpage-defaults';

const SLUG = 'staff';
const PAGE_SLUG = `academia-library-${SLUG}`;
const TITLE = 'Library Staff';
const DEFS = sectionDefs(PAGE_SLUG);
const read = makeReadSection(PAGE_SLUG);
const write = makeWriteSection(PAGE_SLUG, TITLE, SLUG);

export async function getHero(): Promise<SubHeroData> {
	return read(DEFS.HERO, subHeroSchema, () => STAFF_HERO_DEFAULT);
}
export async function getItems(): Promise<StaffListData> {
	return read(DEFS.LIST, staffListSchema, () => STAFF_LIST_DEFAULT);
}
export async function updateHero(data: SubHeroData) {
	return write(DEFS.HERO, subHeroSchema, data, `Updated ${PAGE_SLUG} hero`);
}
export async function updateItems(data: StaffListData) {
	return write(DEFS.LIST, staffListSchema, data, `Updated ${PAGE_SLUG} list`);
}
