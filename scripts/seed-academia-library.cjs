const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PAGE_SLUG = 'academia-library';

const heroData = {
	eyebrow: 'Academic Heart of BPIT',
	title: 'BPIT',
	titleAccent: 'Library',
	subtitle:
		'Discover a world of knowledge at the BPIT Library. Our comprehensive collection and modern facilities support your academic journey and research endeavors.',
	backgroundImage: null
};

const statsData = {
	items: [
		{ icon: 'BookOpen', value: '50,000+', label: 'Books & Journals', accent: 'bg-blue-50 text-blue-700' },
		{ icon: 'Database', value: '10,000+', label: 'Digital Resources', accent: 'bg-emerald-50 text-emerald-700' },
		{ icon: 'Users', value: '500+', label: 'Daily Visitors', accent: 'bg-violet-50 text-violet-700' },
		{ icon: 'Globe', value: '24/7', label: 'Online Access', accent: 'bg-amber-50 text-amber-700' }
	]
};

const missionData = {
	eyebrow: 'Our Mission',
	heading: 'Empowering learning through access',
	body:
		'The BPIT Library serves as the academic heart of our institution, providing comprehensive information resources and services to support teaching, learning, and research. We are committed to fostering an environment that encourages intellectual growth and lifelong learning.'
};

const featuresData = {
	items: [
		{ icon: 'Database', title: 'Digital Library', description: 'Access thousands of e-books, research papers, and academic journals online.' },
		{ icon: 'BookOpen', title: 'Study Spaces', description: 'Quiet and comfortable reading areas with modern facilities.' },
		{ icon: 'Clock', title: 'Extended Hours', description: 'Library services available with extended hours during exam periods.' },
		{ icon: 'Users', title: 'Research Support', description: 'Expert assistance for research projects and academic work.' }
	]
};

const infoData = {
	heading: 'Library Information',
	description: 'Everything you need to plan your visit or remote access.',
	locationTitle: 'Location',
	locationLine1: 'Ground Floor, Academic Block',
	locationLine2: 'Bhagwan Parshuram Institute of Technology',
	quickLinksHeading: 'Quick Links',
	quickLinks: [
		{ label: 'Library Timings', href: '/academia/library/timings' },
		{ label: 'Digital Resources', href: '/academia/library/e-resources' },
		{ label: 'Book Collection', href: '/academia/library/collection' },
		{ label: 'Contact', href: '/academia/library/contact' }
	]
};

async function seed() {
	console.log('🌱 Seeding Academia — Library...');
	const page = await prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: { title: 'Library', kind: 'PAGE', status: 'PUBLISHED' },
		create: { slug: PAGE_SLUG, title: 'Library', kind: 'PAGE', status: 'PUBLISHED' }
	});

	const entries = [
		{ order: 0, key: 'HERO', data: heroData },
		{ order: 1, key: 'STATS', data: statsData },
		{ order: 2, key: 'MISSION', data: missionData },
		{ order: 3, key: 'FEATURES', data: featuresData },
		{ order: 4, key: 'INFO', data: infoData }
	];
	for (const e of entries) {
		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: e.order } },
			update: { data: e.data, key: e.key },
			create: { pageId: page.id, order: e.order, key: e.key, data: e.data }
		});
	}
	console.log('✅ Academia — Library seeded');
}

seed()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
