/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const admissionsPages = [
	require('../src/data/admissions/overview'),
	require('../src/data/admissions/why-bpit'),
	require('../src/data/admissions/process'),
	require('../src/data/admissions/fees'),
	require('../src/data/admissions/scholarship'),
	require('../src/data/admissions/brochure'),
	require('../src/data/admissions/faqs')
];

async function upsertPage(slug, title) {
	const existing = await prisma.page.findUnique({ where: { slug } });
	if (existing) {
		return prisma.page.update({
			where: { id: existing.id },
			data: { title, kind: 'PAGE', status: 'PUBLISHED' }
		});
	}

	return prisma.page.create({
		data: {
			slug,
			title,
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});
}

async function upsertComponent(pageId, key, data, order) {
	const existing = await prisma.component.findFirst({
		where: { pageId, key }
	});

	if (existing) {
		return prisma.component.update({
			where: { id: existing.id },
			data: {
				data
			}
		});
	}

	return prisma.component.create({
		data: {
			pageId,
			key,
			order,
			data
		}
	});
}

async function seedAdmissionsPage(pageConfig) {
	const page = await upsertPage(pageConfig.slug, pageConfig.title);
	const components = Object.entries(pageConfig.components);

	for (const [index, [key, data]] of components.entries()) {
		await upsertComponent(page.id, key, data, index);
	}

	console.log(
		`Seeded ${pageConfig.slug} with ${components.length} admissions component${
			components.length === 1 ? '' : 's'
		}.`
	);
}

async function main() {
	for (const pageConfig of admissionsPages) {
		await seedAdmissionsPage(pageConfig);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async error => {
		console.error('Admissions seed failed:', error);
		await prisma.$disconnect();
		process.exit(1);
	});
