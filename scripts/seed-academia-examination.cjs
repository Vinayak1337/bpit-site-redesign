const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PAGE_SLUG = 'academia-examination';

const heroData = {
	title: 'Examination',
	subtitle:
		'Schedules, resources and guidelines for all examinations at BPIT.',
	backgroundImage: null,
	gradient: 'from-blue-600 to-blue-700'
};

const contentData = {
	eyebrow: 'Examination Cell',
	heading: 'Examination information and resources',
	intro:
		'Find exam schedules, result notifications, previous year papers, and evaluation guidelines in one place.',
	sections: [
		{
			icon: 'CalendarClock',
			title: 'Exam Schedules',
			description:
				'Mid-semester and end-semester date sheets for all programs.',
			note: 'Updated ahead of each academic cycle.'
		},
		{
			icon: 'ClipboardList',
			title: 'Results & Re-evaluation',
			description:
				'Latest results, gazette of results and re-evaluation process.',
			note: 'Notifications published via Notices & Circulars.'
		},
		{
			icon: 'FileCheck',
			title: 'Rules & Guidelines',
			description:
				'Examination rules, malpractice policies and sample papers.',
			note: ''
		}
	],
	body: ''
};

async function seedAcademiaExamination() {
	console.log('🌱 Seeding Academia — Examination...');

	const page = await prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: { title: 'Examination', kind: 'PAGE', status: 'PUBLISHED' },
		create: {
			slug: PAGE_SLUG,
			title: 'Examination',
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});

	await prisma.component.upsert({
		where: { pageId_order: { pageId: page.id, order: 0 } },
		update: { data: heroData, key: 'HERO' },
		create: { pageId: page.id, order: 0, key: 'HERO', data: heroData }
	});

	await prisma.component.upsert({
		where: { pageId_order: { pageId: page.id, order: 1 } },
		update: { data: contentData, key: 'MAIN_CONTENT' },
		create: {
			pageId: page.id,
			order: 1,
			key: 'MAIN_CONTENT',
			data: contentData
		}
	});

	console.log('✅ Academia — Examination seeded');
}

async function main() {
	await seedAcademiaExamination();
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
