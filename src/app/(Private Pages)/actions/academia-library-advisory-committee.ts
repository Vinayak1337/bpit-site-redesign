'use server';
import 'server-only';

import {
	makeReadSection,
	makeWriteSection,
	sectionDefs,
	subHeroSchema,
	advisoryListSchema,
	type SubHeroData,
	type AdvisoryListData
} from './_library-subpage-shared';
import {
	ADVISORY_HERO_DEFAULT,
	ADVISORY_LIST_DEFAULT
} from './_library-subpage-defaults';

const SLUG = 'advisory-committee';
const PAGE_SLUG = `academia-library-${SLUG}`;
const TITLE = 'Library Advisory Committee';
const DEFS = sectionDefs(PAGE_SLUG);
const read = makeReadSection(PAGE_SLUG);
const write = makeWriteSection(PAGE_SLUG, TITLE, SLUG);

export async function getHero(): Promise<SubHeroData> {
	return read(DEFS.HERO, subHeroSchema, () => ADVISORY_HERO_DEFAULT);
}
export async function getItems(): Promise<AdvisoryListData> {
	return read(DEFS.LIST, advisoryListSchema, () => ADVISORY_LIST_DEFAULT);
}
export async function updateHero(data: SubHeroData) {
	return write(DEFS.HERO, subHeroSchema, data, `Updated ${PAGE_SLUG} hero`);
}
export async function updateItems(data: AdvisoryListData) {
	return write(DEFS.LIST, advisoryListSchema, data, `Updated ${PAGE_SLUG} list`);
}
