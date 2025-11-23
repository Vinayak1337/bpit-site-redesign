const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const galleryData = {
	categories: [
		'All',
		'Malhaar',
		'Diwali Vibe',
		'Campus Life',
		'Infrastructure',
		'Drishti'
	],
	items: [
		{
			id: 'malhaar-1',
			src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
			category: 'Malhaar',
			title: 'Malhaar Main Stage',
			date: '24 Nov 2022',
			description:
				'Electrifying performances at the main stage of BPIT Annual Malhaar.',
			size: 'large'
		},
		{
			id: 'malhaar-2',
			src: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97d890?q=80&w=1000&auto=format&fit=crop',
			category: 'Malhaar',
			title: 'Crowd Energy',
			date: '25 Nov 2022',
			description: 'Students cheering for their favorite bands.',
			size: 'medium'
		},
		{
			id: 'malhaar-3',
			src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
			category: 'Malhaar',
			title: 'DJ Night',
			date: '25 Nov 2022',
			description: 'Ending the fest on a high note with DJ beats.',
			size: 'tall'
		},
		{
			id: 'vibe-1',
			src: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=1000&auto=format&fit=crop',
			category: 'Diwali Vibe',
			title: 'Dandiya Night',
			date: '18 Oct 2022',
			description: 'Traditional beats and colorful attires at VIBE.',
			size: 'wide'
		},
		{
			id: 'vibe-2',
			src: 'https://images.unsplash.com/photo-1506422748879-887454f9cdff?q=80&w=1000&auto=format&fit=crop',
			category: 'Diwali Vibe',
			title: 'Festival of Lights',
			date: '18 Oct 2022',
			description: 'Campus lit up for the Diwali celebration.',
			size: 'small'
		},
		{
			id: 'campus-1',
			src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
			category: 'Campus Life',
			title: 'Student Interactions',
			description: 'Collaborative learning in the campus gardens.',
			size: 'medium'
		},
		{
			id: 'infra-1',
			src: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop',
			category: 'Infrastructure',
			title: 'Academic Block',
			description: 'Modern architecture fostering an environment of learning.',
			size: 'tall'
		},
		{
			id: 'infra-2',
			src: 'https://images.unsplash.com/photo-1592494804071-faea12d93a86?q=80&w=1000&auto=format&fit=crop',
			category: 'Infrastructure',
			title: 'Computer Labs',
			description: 'High-tech labs for practical exposure.',
			size: 'medium'
		},
		{
			id: 'drishti-1',
			src: 'https://images.unsplash.com/photo-1581092921461-eab32e97f6d1?q=80&w=1000&auto=format&fit=crop',
			category: 'Drishti',
			title: 'Technical Projects',
			description: 'Students showcasing innovative projects at Drishti.',
			size: 'wide'
		},
		{
			id: 'drishti-2',
			src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
			category: 'Drishti',
			title: 'Hackathons',
			description: 'Coding marathons and problem-solving sessions.',
			size: 'small'
		}
	]
};

async function seedGallery() {
	try {
		console.log('Seeding Gallery page...');

		const slug = 'gallery-page';
		let page = await prisma.page.findUnique({ where: { slug } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Gallery',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
			console.log('Created Gallery page');
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: galleryData, key: 'GALLERY_DATA' },
			create: {
				pageId: page.id,
				data: galleryData,
				order: 1,
				key: 'GALLERY_DATA'
			}
		});

		console.log('Gallery data seeded successfully');
	} catch (error) {
		console.error('Error seeding gallery:', error);
	} finally {
		await prisma.$disconnect();
	}
}

seedGallery();
