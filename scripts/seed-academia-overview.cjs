const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const academiaOverviewData = {
	heading: 'Academic Excellence at BPIT',
	subheading:
		'Discover our comprehensive academic resources, programs, and support systems designed to foster innovation and excellence in engineering education.',
	stats: [
		{ icon: 'BookOpen', value: '8', label: 'Academic Departments', color: 'bg-blue-100 text-blue-600' },
		{ icon: 'Users', value: '2000+', label: 'Students Enrolled', color: 'bg-green-100 text-green-600' },
		{ icon: 'Award', value: '100+', label: 'Faculty Members', color: 'bg-purple-100 text-purple-600' },
		{ icon: 'FileText', value: '12', label: 'B.Tech Programs', color: 'bg-orange-100 text-orange-600' }
	],
	missionTitle: 'Our Academic Mission',
	missionText:
		'BPIT is committed to providing quality technical education that prepares students for successful careers in engineering and technology. Our academic programs are designed to combine theoretical knowledge with practical application, ensuring graduates are industry-ready and capable of contributing to technological advancement.',
	quickAccess: [
		{
			title: 'Notices & Circulars',
			description: 'Stay updated with the latest academic notices and circulars',
			icon: 'Bell',
			href: '/academia/notices-circulars',
			color: 'bg-red-50 border-red-200 hover:bg-red-100'
		},
		{
			title: 'Syllabus & Ordinance',
			description: 'Access detailed syllabi and academic ordinances',
			icon: 'BookOpen',
			href: '/academia/syllabus-ordinance',
			color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
		},
		{
			title: 'Academic Calendar',
			description: 'View important academic dates and schedules',
			icon: 'Calendar',
			href: '/academia/academic-calendar',
			color: 'bg-green-50 border-green-200 hover:bg-green-100'
		}
	],
	departments: [
		'Computer Science & Engineering',
		'Electronics & Communication',
		'Mechanical Engineering',
		'Civil Engineering',
		'Electrical Engineering',
		'Information Technology',
		'Applied Mathematics',
		'Physics & Chemistry'
	],
	importantInfo: {
		title: 'Important Academic Information',
		points: [
			'All academic notices and updates are published in the Notices & Circulars section',
			'Semester syllabi and examination schedules are available in Syllabus & Ordinance',
			'Academic calendar contains all important dates for the academic year',
			'Students are advised to regularly check these sections for updates'
		]
	}
};

async function seedAcademiaOverview() {
	try {
		console.log('🌱 Seeding Academia Overview data...');

		// The academia page already exists (seeded by seed-academia.cjs with order 0 = HERO).
		// We upsert at order 1 with key OVERVIEW.
		let page = await prisma.page.findUnique({ where: { slug: 'academia' } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug: 'academia',
					title: 'Academia',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 1
				}
			},
			update: {
				data: academiaOverviewData,
				key: 'OVERVIEW'
			},
			create: {
				pageId: page.id,
				data: academiaOverviewData,
				order: 1,
				key: 'OVERVIEW'
			}
		});

		console.log('✅ Academia Overview data seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding Academia Overview data:', error);
		throw error;
	}
}

async function main() {
	await seedAcademiaOverview();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
