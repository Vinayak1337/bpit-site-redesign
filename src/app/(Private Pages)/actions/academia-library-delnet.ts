'use server';
import 'server-only';

import {
	makeReadSection,
	makeWriteSection,
	sectionDefs,
	subHeroSchema,
	simpleContentSchema,
	type SubHeroData,
	type SimpleContentData
} from './_library-subpage-shared';
import { SIMPLE_DEFAULTS } from './_library-subpage-defaults';

const SLUG = 'delnet';
const PAGE_SLUG = `academia-library-${SLUG}`;
const DEFAULTS = SIMPLE_DEFAULTS[SLUG];
const DEFS = sectionDefs(PAGE_SLUG);
const read = makeReadSection(PAGE_SLUG);
const write = makeWriteSection(PAGE_SLUG, DEFAULTS.pageTitle, SLUG);

export async function getHero(): Promise<SubHeroData> {
	return read(DEFS.HERO, subHeroSchema, () => DEFAULTS.hero);
}
export async function getContent(): Promise<SimpleContentData> {
	return read(DEFS.CONTENT, simpleContentSchema, () => DEFAULTS.content);
}
export async function updateHero(data: SubHeroData) {
	return write(DEFS.HERO, subHeroSchema, data, `Updated ${PAGE_SLUG} hero`);
}
export async function updateContent(data: SimpleContentData) {
	return write(DEFS.CONTENT, simpleContentSchema, data, `Updated ${PAGE_SLUG} content`);
}
