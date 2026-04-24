const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const departmentsData = {
	departments: [
		{
			id: 'cse',
			name: 'CSE',
			fullName: 'Computer Science & Engineering',
			description:
				'Cutting-edge computer science education with focus on software development, algorithms, AI, and emerging technologies.',
			iconName: 'Code',
			color: 'text-blue-600',
			bgColor: 'bg-blue-50',
			available: true,
			students: 480,
			faculty: 35,
			labs: 12,
			specializations: [
				'Artificial Intelligence',
				'Machine Learning',
				'Software Engineering',
				'Cybersecurity'
			]
		},
		{
			id: 'it',
			name: 'IT',
			fullName: 'Information Technology',
			description:
				'Comprehensive IT education focusing on system administration, network management, and enterprise solutions.',
			iconName: 'Cpu',
			color: 'text-green-600',
			bgColor: 'bg-green-50',
			available: false,
			students: 360,
			faculty: 28,
			labs: 10,
			specializations: [
				'Network Administration',
				'Database Management',
				'Cloud Computing',
				'IT Security'
			]
		},
		{
			id: 'ece',
			name: 'ECE',
			fullName: 'Electronics & Communication Engineering',
			description:
				'Advanced electronics and communication systems with emphasis on digital signal processing and telecommunications.',
			iconName: 'Radio',
			color: 'text-purple-600',
			bgColor: 'bg-purple-50',
			available: false,
			students: 240,
			faculty: 22,
			labs: 8,
			specializations: [
				'VLSI Design',
				'Embedded Systems',
				'Communication Systems',
				'Signal Processing'
			]
		},
		{
			id: 'eee',
			name: 'EEE',
			fullName: 'Electrical & Electronics Engineering',
			description:
				'Comprehensive electrical engineering program covering power systems, control systems, and renewable energy.',
			iconName: 'Zap',
			color: 'text-yellow-600',
			bgColor: 'bg-yellow-50',
			available: false,
			students: 180,
			faculty: 18,
			labs: 6,
			specializations: [
				'Power Systems',
				'Control Systems',
				'Renewable Energy',
				'Electric Vehicles'
			]
		},
		{
			id: 'mba',
			name: 'MBA',
			fullName: 'Master of Business Administration',
			description:
				'Comprehensive business administration program with focus on leadership, strategy, and entrepreneurship.',
			iconName: 'Briefcase',
			color: 'text-red-600',
			bgColor: 'bg-red-50',
			available: false,
			students: 120,
			faculty: 15,
			labs: 4,
			specializations: ['Finance', 'Marketing', 'Human Resources', 'Operations']
		}
	]
};

async function seedDepartments() {
	try {
		console.log('🌱 Seeding Departments data...');

		let page = await prisma.page.findUnique({ where: { slug: 'departments' } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug: 'departments',
					title: 'Departments',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 0
				}
			},
			update: {
				data: departmentsData,
				key: 'DEPARTMENTS_DATA'
			},
			create: {
				pageId: page.id,
				data: departmentsData,
				order: 0,
				key: 'DEPARTMENTS_DATA'
			}
		});

		console.log('✅ Departments data seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding Departments data:', error);
		throw error;
	}
}

async function main() {
	await seedDepartments();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
