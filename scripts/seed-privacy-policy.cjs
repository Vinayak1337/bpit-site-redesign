const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const privacyPolicyData = {
	lastUpdated: 'November 2025',
	intro:
		'BPIT is committed to safeguarding the personal information of our students, parents, faculty, alumni, and partners. The following sections explain how we collect, use, and protect the data shared with us.',
	sections: [
		{
			title: 'Information We Collect',
			description:
				'We only gather information that helps us respond to enquiries, deliver academic updates, and improve the BPIT digital experience.',
			points: [
				'Contact information submitted through enquiry, admission, or newsletter forms.',
				'Usage data such as pages visited, device information, and browser type collected through analytics tools.',
				'Any additional details you voluntarily provide when communicating with BPIT.'
			]
		},
		{
			title: 'How We Use Your Information',
			description:
				'Collected data allows us to provide timely academic communication and maintain secure campus services.',
			points: [
				'Respond to admission, placement, or academic queries.',
				'Deliver newsletters and institutional announcements when you opt in.',
				'Maintain accurate records for statutory and accreditation reporting.',
				'Improve website performance and user experience.'
			]
		},
		{
			title: 'Data Sharing and Retention',
			description:
				'We respect your privacy and only share your information in strictly limited situations.',
			points: [
				'Access is restricted to authorised BPIT departments and trusted service partners that meet our security standards.',
				'We never sell personal information to third parties.',
				'Information is retained only for as long as necessary to provide services or comply with regulations.'
			]
		},
		{
			title: 'Your Rights',
			description:
				'You are in control of your information and can contact us at any time to exercise the following rights:',
			points: [
				'Request a copy of the personal information we hold about you.',
				'Ask for corrections or updates to inaccurate or incomplete data.',
				'Withdraw consent for marketing communications or newsletter subscriptions.',
				'Request deletion of your data, subject to legal or contractual obligations.'
			]
		},
		{
			title: 'Contact Us',
			description:
				'If you have questions about this privacy policy or how your information is handled, write to us at privacy@bpitindia.ac.in or by post at Bhagwan Parshuram Institute of Technology, Rohini Sector-17, New Delhi - 110089.',
			points: []
		}
	]
};

async function seedPrivacyPolicy() {
	try {
		console.log('🌱 Seeding Privacy Policy data...');

		let page = await prisma.page.findUnique({ where: { slug: 'privacy-policy' } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug: 'privacy-policy',
					title: 'Privacy Policy',
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
				data: privacyPolicyData,
				key: 'PRIVACY_POLICY_DATA'
			},
			create: {
				pageId: page.id,
				data: privacyPolicyData,
				order: 0,
				key: 'PRIVACY_POLICY_DATA'
			}
		});

		console.log('✅ Privacy Policy data seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding Privacy Policy data:', error);
		throw error;
	}
}

async function main() {
	await seedPrivacyPolicy();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
