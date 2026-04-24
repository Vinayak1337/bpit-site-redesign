const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const accreditationData = {
	hero: {
		title: 'Accreditation',
		subtitle: 'Recognized Excellence in Technical Education and Quality Standards',
		badges: [
			{ label: 'NAAC Accredited' },
			{ label: 'NBA Approved' },
			{ label: 'ISO Certified' }
		]
	},
	intro: {
		title: 'Quality Recognition',
		description:
			'BPIT has achieved multiple prestigious accreditations that validate our commitment to excellence in technical education, infrastructure, and academic standards.'
	},
	cards: [
		{
			name: 'NAAC',
			fullName: 'National Assessment and Accreditation Council',
			colorScheme: 'blue',
			icon: 'Award',
			badgeTitle: 'Grade: A',
			badgeDescription:
				'Recognized for academic excellence, infrastructure, and student support services.',
			accreditedYear: '2022',
			validUntil: '2027'
		},
		{
			name: 'NBA',
			fullName: 'National Board of Accreditation',
			colorScheme: 'purple',
			icon: 'Trophy',
			badgeTitle: 'Programs Accredited',
			badgeDescription:
				'Computer Science, IT, ECE, and Electrical Engineering programs approved.',
			accreditedYear: '2021',
			validUntil: '2024'
		},
		{
			name: 'ISO',
			fullName: 'International Organization for Standardization',
			colorScheme: 'green',
			icon: 'Globe',
			badgeTitle: 'ISO 9001:2015',
			badgeDescription:
				'Quality Management System certification for educational services.',
			accreditedYear: '2020',
			validUntil: '2025'
		}
	],
	benefits: [
		{
			icon: 'TrendingUp',
			title: 'Quality Assurance',
			description: 'Ensures high standards in education delivery and infrastructure.',
			colorScheme: 'blue'
		},
		{
			icon: 'Users',
			title: 'Student Benefits',
			description: 'Enhanced employability and recognition in higher education.',
			colorScheme: 'green'
		},
		{
			icon: 'Globe',
			title: 'Global Recognition',
			description: 'International acceptance and credibility of our programs.',
			colorScheme: 'purple'
		},
		{
			icon: 'BookOpen',
			title: 'Continuous Improvement',
			description: 'Regular assessment and enhancement of academic processes.',
			colorScheme: 'orange'
		}
	],
	compliance: {
		title: 'Compliance & Standards',
		description:
			'Our accreditations ensure that we maintain the highest standards in all aspects of education delivery, from curriculum design to infrastructure development.',
		groups: [
			{
				title: 'Academic Standards',
				icon: 'FileText',
				items: [
					'Curriculum aligned with industry requirements',
					'Regular faculty development programs',
					'Continuous assessment and improvement',
					'Student feedback integration'
				]
			},
			{
				title: 'Infrastructure Standards',
				icon: 'Shield',
				items: [
					'Modern laboratories and equipment',
					'Digital library and online resources',
					'Safety and security protocols',
					'Accessibility and inclusive design'
				]
			}
		]
	},
	future: {
		title: 'Future Accreditation Goals',
		description:
			'We are committed to continuous improvement and are working towards additional accreditations and certifications to further enhance our educational standards.',
		goals: [
			{ label: 'ABET Accreditation', colorScheme: 'blue' },
			{ label: 'QS University Rating', colorScheme: 'green' },
			{ label: 'NIRF Ranking', colorScheme: 'purple' }
		]
	}
};

async function seedAccreditation() {
	try {
		console.log('🌱 Seeding Accreditation data...');

		let page = await prisma.page.findUnique({ where: { slug: 'accreditation' } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug: 'accreditation',
					title: 'Accreditation',
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
				data: accreditationData,
				key: 'ACCREDITATION_DATA'
			},
			create: {
				pageId: page.id,
				data: accreditationData,
				order: 0,
				key: 'ACCREDITATION_DATA'
			}
		});

		console.log('✅ Accreditation data seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding Accreditation data:', error);
		throw error;
	}
}

async function main() {
	await seedAccreditation();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
