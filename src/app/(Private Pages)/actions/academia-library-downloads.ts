'use server';
import 'server-only';

import {
	makeReadSection,
	makeWriteSection,
	sectionDefs,
	subHeroSchema,
	downloadsListSchema,
	type SubHeroData,
	type DownloadsListData
} from './_library-subpage-shared';
import {
	DOWNLOADS_HERO_DEFAULT,
	DOWNLOADS_LIST_DEFAULT
} from './_library-subpage-defaults';

const SLUG = 'downloads';
const PAGE_SLUG = `academia-library-${SLUG}`;
const TITLE = 'Downloads';
const DEFS = sectionDefs(PAGE_SLUG);
const read = makeReadSection(PAGE_SLUG);
const write = makeWriteSection(PAGE_SLUG, TITLE, SLUG);

export async function getHero(): Promise<SubHeroData> {
	return read(DEFS.HERO, subHeroSchema, () => DOWNLOADS_HERO_DEFAULT);
}
export async function getItems(): Promise<DownloadsListData> {
	return read(DEFS.LIST, downloadsListSchema, () => DOWNLOADS_LIST_DEFAULT);
}
export async function updateHero(data: SubHeroData) {
	return write(DEFS.HERO, subHeroSchema, data, `Updated ${PAGE_SLUG} hero`);
}
export async function updateItems(data: DownloadsListData) {
	return write(DEFS.LIST, downloadsListSchema, data, `Updated ${PAGE_SLUG} list`);
}
