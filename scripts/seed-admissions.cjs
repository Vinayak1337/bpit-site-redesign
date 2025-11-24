const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const admissionsHeroData = {
	title: 'Admissions',
	subtitle: 'Join us to embark on a journey of excellence and innovation.',
	backgroundImage: null,
	gradient: 'from-blue-600 to-blue-800'
};

async function seedAdmissions() {
	try {
		console.log('🌱 Seeding Admissions data...');

		let page = await prisma.page.findUnique({ where: { slug: 'admissions' } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug: 'admissions',
					title: 'Admissions',
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
				data: admissionsHeroData,
				key: 'HERO'
			},
			create: {
				pageId: page.id,
				data: admissionsHeroData,
				order: 0,
				key: 'HERO'
			}
		});

		console.log('✅ Admissions data seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding Admissions data:', error);
		throw error;
	}
}

async function main() {
	await seedAdmissions();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});


