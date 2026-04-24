const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PAGE_SLUG = 'academia-syllabus-ordinance';

const heroData = {
	title: 'Syllabus & Ordinance',
	subtitle:
		'Access comprehensive curriculum details, course syllabi, and academic ordinances for all undergraduate and postgraduate programs at BPIT.'
};

const programsData = {
	items: [
		{
			id: 1,
			name: 'Computer Science & Engineering',
			code: 'CSE',
			color: 'blue',
			type: 'syllabus',
			courses: ['B.Tech CSE', 'M.Tech CSE'],
			syllabusCount: 8,
			description: 'B.Tech CSE, M.Tech CSE - 8 Semester Syllabi',
			lastUpdated: '2024-01-15',
			size: 'Multiple Files',
			department: 'Computer Science & Engineering',
			course: '',
			image: null,
			documentUrl: ''
		},
		{
			id: 2,
			name: 'Electronics & Communication',
			code: 'ECE',
			color: 'green',
			type: 'syllabus',
			courses: ['B.Tech ECE', 'M.Tech ECE'],
			syllabusCount: 8,
			description: 'B.Tech ECE, M.Tech ECE - 8 Semester Syllabi',
			lastUpdated: '2024-01-15',
			size: 'Multiple Files',
			department: 'Electronics & Communication',
			course: '',
			image: null,
			documentUrl: ''
		},
		{
			id: 3,
			name: 'Mechanical Engineering',
			code: 'ME',
			color: 'purple',
			type: 'syllabus',
			courses: ['B.Tech ME', 'M.Tech Production'],
			syllabusCount: 8,
			description: 'B.Tech ME, M.Tech Production - 8 Semester Syllabi',
			lastUpdated: '2024-01-15',
			size: 'Multiple Files',
			department: 'Mechanical Engineering',
			course: '',
			image: null,
			documentUrl: ''
		},
		{
			id: 4,
			name: 'Electrical Engineering',
			code: 'EE',
			color: 'orange',
			type: 'syllabus',
			courses: ['B.Tech EE'],
			syllabusCount: 8,
			description: 'B.Tech EE - 8 Semester Syllabi',
			lastUpdated: '2024-01-15',
			size: 'Multiple Files',
			department: 'Electrical Engineering',
			course: '',
			image: null,
			documentUrl: ''
		},
		{
			id: 5,
			name: 'Information Technology',
			code: 'IT',
			color: 'indigo',
			type: 'syllabus',
			courses: ['B.Tech IT'],
			syllabusCount: 8,
			description: 'B.Tech IT - 8 Semester Syllabi',
			lastUpdated: '2024-01-15',
			size: 'Multiple Files',
			department: 'Information Technology',
			course: '',
			image: null,
			documentUrl: ''
		},
		{
			id: 6,
			name: 'General Ordinance for Undergraduate Programs',
			code: 'UG',
			color: 'blue',
			type: 'ordinance',
			courses: [],
			syllabusCount: 0,
			description:
				'Complete guidelines for B.Tech programs, examination rules, and academic regulations',
			lastUpdated: '2024-01-15',
			size: '2.5 MB',
			department: 'General',
			course: 'All Undergraduate',
			image: null,
			documentUrl: ''
		},
		{
			id: 7,
			name: 'General Ordinance for Postgraduate Programs',
			code: 'PG',
			color: 'blue',
			type: 'ordinance',
			courses: [],
			syllabusCount: 0,
			description:
				'Guidelines for M.Tech programs, thesis requirements, and academic policies',
			lastUpdated: '2024-01-15',
			size: '1.8 MB',
			department: 'General',
			course: 'All Postgraduate',
			image: null,
			documentUrl: ''
		},
		{
			id: 8,
			name: 'Credit Transfer & Migration Policy',
			code: 'CTM',
			color: 'blue',
			type: 'ordinance',
			courses: [],
			syllabusCount: 0,
			description:
				'Rules for credit transfer between institutions and migration procedures',
			lastUpdated: '2023-12-10',
			size: '850 KB',
			department: 'General',
			course: 'All Programs',
			image: null,
			documentUrl: ''
		}
	]
};

async function seed() {
	console.log('🌱 Seeding Academia — Syllabus & Ordinance...');

	const page = await prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: {
			title: 'Syllabus & Ordinance',
			kind: 'PAGE',
			status: 'PUBLISHED'
		},
		create: {
			slug: PAGE_SLUG,
			title: 'Syllabus & Ordinance',
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
		update: { data: programsData, key: 'PROGRAMS' },
		create: {
			pageId: page.id,
			order: 1,
			key: 'PROGRAMS',
			data: programsData
		}
	});

	console.log('✅ Academia — Syllabus & Ordinance seeded');
}

seed()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
