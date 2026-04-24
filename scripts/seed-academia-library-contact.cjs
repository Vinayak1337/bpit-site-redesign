const { PrismaClient } = require('@prisma/client');
const defaults = require('./seed-academia-library-defaults.cjs');
const prisma = new PrismaClient();

const SLUG = 'contact';
const PAGE_SLUG = `academia-library-${SLUG}`;
const TITLE = 'Contact';
const HERO = defaults.CONTACT_HERO;
const CONTACT = defaults.CONTACT_BLOCK;

async function seed() {
	console.log(`🌱 Seeding ${PAGE_SLUG}...`);
	const page = await prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: { title: TITLE, kind: 'PAGE', status: 'PUBLISHED' },
		create: { slug: PAGE_SLUG, title: TITLE, kind: 'PAGE', status: 'PUBLISHED' }
	});
	const entries = [
		{ order: 0, key: 'HERO', data: HERO },
		{ order: 3, key: 'CONTACT', data: CONTACT }
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
