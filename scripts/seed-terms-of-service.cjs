const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const termsOfServiceData = {
	lastUpdated: 'November 2025',
	intro:
		"These terms outline the policies and responsibilities that govern the use of BPIT's digital platforms, portals, and published content.",
	sections: [
		{
			title: 'Acceptance of Terms',
			description:
				'By accessing the BPIT website, portals, or digital services you agree to comply with these terms of service and all applicable policies referenced here.',
			points: [
				'These terms apply to students, faculty, alumni, applicants, and external visitors.',
				'If you do not agree with any part of these terms, please discontinue use of BPIT online services.'
			]
		},
		{
			title: 'Use of Website Content',
			description:
				'All academic resources, media, logos, and written content are protected intellectual property of BPIT or its partners.',
			points: [
				'Content may be used for personal, non-commercial academic purposes only.',
				'Any reproduction, republication, or distribution requires written permission from BPIT.',
				'Unauthorised modification of content or materials is strictly prohibited.'
			]
		},
		{
			title: 'User Responsibilities',
			description:
				'You are responsible for maintaining the confidentiality of your portal credentials and ensuring proper usage of online resources.',
			points: [
				'Provide accurate and current information when completing forms or registrations.',
				'Do not engage in activities that disrupt or compromise the security of BPIT systems.',
				'Report suspected misuse or security issues to the BPIT IT Team immediately.'
			]
		},
		{
			title: 'Third-Party Services',
			description:
				'BPIT may reference third-party platforms for placements, payments, or academic resources. Each service maintains its own policies.',
			points: [
				'BPIT is not responsible for the content or practices of external websites.',
				'Use third-party services at your discretion and review their respective terms.',
				'Any concerns with third-party services should be directed to the respective provider.'
			]
		},
		{
			title: 'Changes to These Terms',
			description:
				'BPIT may update these terms to reflect regulatory changes or improvements to our services. Continued use after updates signifies acceptance.',
			points: [
				'We recommend revisiting this page periodically.',
				'Major updates will be communicated through official BPIT channels when necessary.'
			]
		},
		{
			title: 'Contact Information',
			description:
				'For queries about these terms or requests for permissions, contact legal@bpitindia.ac.in or write to: Bhagwan Parshuram Institute of Technology, Rohini Sector-17, New Delhi - 110089.',
			points: []
		}
	]
};

async function seedTermsOfService() {
	try {
		console.log('🌱 Seeding Terms of Service data...');

		let page = await prisma.page.findUnique({ where: { slug: 'terms-of-service' } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug: 'terms-of-service',
					title: 'Terms of Service',
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
				data: termsOfServiceData,
				key: 'TERMS_OF_SERVICE_DATA'
			},
			create: {
				pageId: page.id,
				data: termsOfServiceData,
				order: 0,
				key: 'TERMS_OF_SERVICE_DATA'
			}
		});

		console.log('✅ Terms of Service data seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding Terms of Service data:', error);
		throw error;
	}
}

async function main() {
	await seedTermsOfService();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
