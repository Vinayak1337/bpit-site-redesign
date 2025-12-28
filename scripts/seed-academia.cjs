const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const academiaHeroData = {
	title: 'Academia',
	subtitle: 'Explore our academic resources, syllabi, notices, and calendar for comprehensive educational support',
	backgroundImage: null,
	gradient: 'from-blue-600 to-blue-700'
};

async function seedAcademia() {
	try {
		console.log('🌱 Seeding Academia data...');

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
					order: 0
				}
			},
			update: {
				data: academiaHeroData,
				key: 'HERO'
			},
			create: {
				pageId: page.id,
				data: academiaHeroData,
				order: 0,
				key: 'HERO'
			}
		});

		console.log('✅ Academia data seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding Academia data:', error);
		throw error;
	}
}

async function main() {
	await seedAcademia();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});



