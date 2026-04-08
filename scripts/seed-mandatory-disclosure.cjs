const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const disclosureData = {
	items: [
		{
			id: 'md-1',
			title: 'Mandatory Disclosure',
			url: '#',
			category: 'General'
		},
		{
			id: 'md-2',
			title: 'AICTE Approval Letter 2024-25',
			url: '#',
			category: 'Approvals'
		},
		{
			id: 'md-3',
			title: 'AICTE Approval Letter 2023-24',
			url: '#',
			category: 'Approvals'
		},
		{
			id: 'md-4',
			title: 'GGSIPU Affiliation Letter 2024-25',
			url: '#',
			category: 'Approvals'
		},
		{
			id: 'md-5',
			title: 'Fee Structure 2024-25',
			url: '#',
			category: 'Financials'
		},
		{
			id: 'md-6',
			title: 'Balance Sheet 2023-24',
			url: '#',
			category: 'Financials'
		},
		{
			id: 'md-7',
			title: 'Student Grievance Redressal Committee',
			url: '/student-life/student-grievance-cell',
			category: 'Committees'
		},
		{
			id: 'md-8',
			title: 'Anti-Ragging Committee',
			url: '/statutory-committees/anti-ragging',
			category: 'Committees'
		},
		{
			id: 'md-9',
			title: 'Internal Complaints Committee (ICC)',
			url: '/statutory-committees/internal-complaints',
			category: 'Committees'
		},
		{
			id: 'md-10',
			title: 'Faculty List',
			url: '#',
			category: 'Faculty'
		}
	]
};

async function seedMandatoryDisclosure() {
	try {
		console.log('Seeding Mandatory Disclosure page...');

		const slug = 'mandatory-disclosure';
		let page = await prisma.page.findUnique({ where: { slug } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Mandatory Disclosure',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
			console.log('Created Mandatory Disclosure page');
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: disclosureData, key: 'MANDATORY_DISCLOSURE_DATA' },
			create: {
				pageId: page.id,
				data: disclosureData,
				order: 1,
				key: 'MANDATORY_DISCLOSURE_DATA'
			}
		});

		console.log('Mandatory Disclosure data seeded successfully');
	} catch (error) {
		console.error('Error seeding mandatory disclosure:', error);
	} finally {
		await prisma.$disconnect();
	}
}

seedMandatoryDisclosure();

