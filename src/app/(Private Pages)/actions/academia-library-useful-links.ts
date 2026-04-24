'use server';
import 'server-only';

import {
	makeReadSection,
	makeWriteSection,
	sectionDefs,
	subHeroSchema,
	usefulLinksListSchema,
	type SubHeroData,
	type UsefulLinksListData
} from './_library-subpage-shared';
import {
	USEFUL_LINKS_HERO_DEFAULT,
	USEFUL_LINKS_LIST_DEFAULT
} from './_library-subpage-defaults';

const SLUG = 'useful-links';
const PAGE_SLUG = `academia-library-${SLUG}`;
const TITLE = 'Useful Links';
const DEFS = sectionDefs(PAGE_SLUG);
const read = makeReadSection(PAGE_SLUG);
const write = makeWriteSection(PAGE_SLUG, TITLE, SLUG);

export async function getHero(): Promise<SubHeroData> {
	return read(DEFS.HERO, subHeroSchema, () => USEFUL_LINKS_HERO_DEFAULT);
}
export async function getItems(): Promise<UsefulLinksListData> {
	return read(DEFS.LIST, usefulLinksListSchema, () => USEFUL_LINKS_LIST_DEFAULT);
}
export async function updateHero(data: SubHeroData) {
	return write(DEFS.HERO, subHeroSchema, data, `Updated ${PAGE_SLUG} hero`);
}
export async function updateItems(data: UsefulLinksListData) {
	return write(DEFS.LIST, usefulLinksListSchema, data, `Updated ${PAGE_SLUG} list`);
}
