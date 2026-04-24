const { PrismaClient } = require('@prisma/client');
const { SIMPLE_DEFAULTS } = require('./seed-academia-library-defaults.cjs');
const prisma = new PrismaClient();

const SLUG = 'self-learning';
const PAGE_SLUG = `academia-library-${SLUG}`;
const DEF = SIMPLE_DEFAULTS[SLUG];

async function seed() {
	console.log(`🌱 Seeding ${PAGE_SLUG}...`);
	const page = await prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: { title: DEF.pageTitle, kind: 'PAGE', status: 'PUBLISHED' },
		create: { slug: PAGE_SLUG, title: DEF.pageTitle, kind: 'PAGE', status: 'PUBLISHED' }
	});
	const entries = [
		{ order: 0, key: 'HERO', data: DEF.hero },
		{ order: 1, key: 'CONTENT', data: DEF.content }
	];
	for (const e of entries) {
		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: e.order } },
			update: { data: e.data, key: e.key },
			create: { pageId: page.id, order: e.order, key: e.key, data: e.data }
		});
	}
	console.log(`✅ ${PAGE_SLUG} seeded`);
}

seed().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
