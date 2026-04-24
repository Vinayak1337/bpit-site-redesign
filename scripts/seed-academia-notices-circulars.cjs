const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PAGE_SLUG = 'academia-notices-circulars';

const heroData = {
	title: 'Notices & Circulars',
	subtitle:
		'Stay informed with the latest announcements, circular updates, and important notices from BPIT administration, departments, and academic sections.'
};

const noticesData = {
	items: [
		{
			id: 1,
			category: 'Academic',
			title: 'Mid-semester examination schedule released',
			subtitle: 'Check your exam dates and prepare accordingly',
			date: '2024-12-28',
			time: '10:00 AM',
			priority: 'high',
			tags: ['Exam', 'Schedule', 'Important'],
			description:
				'The mid-semester examination schedule has been released. Students are advised to check their individual exam timetables and prepare accordingly.',
			pinned: true,
			urgent: true,
			image: null,
			link: '/'
		},
		{
			id: 2,
			category: 'Financial Aid',
			title: 'Merit-cum-Means Scholarship applications open',
			subtitle: 'Apply now for financial assistance programs',
			date: '2024-12-25',
			time: '2:30 PM',
			priority: 'medium',
			tags: ['Scholarship', 'Financial Aid', 'Application'],
			description:
				'Applications are now open for Merit-cum-Means Scholarships for the academic year 2024-25. Eligible students can apply online.',
			pinned: true,
			urgent: false,
			image: null,
			link: '/'
		},
		{
			id: 3,
			category: 'Admission',
			title: 'Additional counseling round for vacant seats',
			subtitle: 'Last chance for admission in B.Tech programs',
			date: '2024-12-20',
			time: '11:15 AM',
			priority: 'high',
			tags: ['Admission', 'Counseling', 'B.Tech'],
			description:
				'Additional counseling round will be conducted for remaining vacant seats in various B.Tech programs.',
			pinned: false,
			urgent: true,
			image: null,
			link: '/'
		},
		{
			id: 4,
			category: 'Sports',
			title: 'Inter-college sports tournament registration',
			subtitle: 'Register for annual sports competition',
			date: '2024-12-18',
			time: '4:00 PM',
			priority: 'medium',
			tags: ['Sports', 'Tournament'],
			description:
				'Registration is now open for the annual inter-college sports tournament.',
			pinned: false,
			urgent: false,
			image: null,
			link: '/'
		},
		{
			id: 5,
			category: 'Library',
			title: 'New digital resources added to library',
			subtitle: 'Access latest journals and e-books',
			date: '2024-12-15',
			time: '9:30 AM',
			priority: 'low',
			tags: ['Library', 'Digital Resources'],
			description:
				'The library has added new digital resources including international journals, e-books, and research databases.',
			pinned: false,
			urgent: false,
			image: null,
			link: '/'
		},
		{
			id: 6,
			category: 'Innovation',
			title: 'Annual Innovation Contest 2024',
			subtitle: 'Showcase your innovative ideas and win prizes',
			date: '2024-12-05',
			time: '11:00 AM',
			priority: 'high',
			tags: ['Innovation', 'Contest'],
			description:
				'Participate in the annual innovation contest and present your groundbreaking ideas.',
			pinned: true,
			urgent: false,
			image: null,
			link: '/'
		}
	]
};

async function seed() {
	console.log('🌱 Seeding Academia — Notices & Circulars...');

	const page = await prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: {
			title: 'Notices & Circulars',
			kind: 'PAGE',
			status: 'PUBLISHED'
		},
		create: {
			slug: PAGE_SLUG,
			title: 'Notices & Circulars',
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
		update: { data: noticesData, key: 'NOTICES' },
		create: { pageId: page.id, order: 1, key: 'NOTICES', data: noticesData }
	});

	console.log('✅ Academia — Notices & Circulars seeded');
}

seed()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
