const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	console.log('Starting internships data seed...');

	// Find or create the page
	let page = await prisma.page.findUnique({
		where: { slug: 'internships' }
	});

	if (!page) {
		page = await prisma.page.create({
			data: {
				slug: 'internships',
				title: 'Internship Opportunities',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});
		console.log('Created page:', page.slug);
	}

	const internshipsData = {
		hero: {
			icon: 'Briefcase',
			title: 'Internship Opportunities',
			subtitle: 'Bridge the gap between academics and industry with hands-on experience',
			gradient: 'from-blue-900 via-blue-800 to-blue-900'
		},
		stats: [
			{
				icon: 'Users',
				value: '500+',
				label: 'Students Interned',
				color: 'from-blue-500 to-blue-700'
			},
			{
				icon: 'Building2',
				value: '80+',
				label: 'Partner Organizations',
				color: 'from-blue-500 to-blue-700'
			},
			{
				icon: 'TrendingUp',
				value: '75%',
				label: 'PPO Conversion Rate',
				color: 'from-blue-500 to-blue-700'
			},
			{
				icon: 'Award',
				value: '50+',
				label: 'Industries Covered',
				color: 'from-blue-500 to-blue-700'
			}
		],
		benefits: [
			{
				icon: 'Target',
				title: 'Industry Exposure',
				description: 'Get hands-on experience with real industry projects and cutting-edge technologies',
				color: 'blue'
			},
			{
				icon: 'Users',
				title: 'Mentorship',
				description: 'Work under experienced professionals and receive guidance throughout your internship',
				color: 'green'
			},
			{
				icon: 'Award',
				title: 'Skill Development',
				description: 'Enhance your technical and soft skills through practical application and training',
				color: 'purple'
			},
			{
				icon: 'TrendingUp',
				title: 'Career Growth',
				description: 'High chances of receiving Pre-Placement Offers (PPO) based on performance',
				color: 'orange'
			}
		],
		filters: [
			'All',
			'Summer Internship',
			'Winter Internship',
			'Research Internship',
			'Industry Project',
			'Startup Internship'
		],
		opportunities: [
			{
				company: 'Microsoft India',
				title: 'Software Engineering',
				type: 'Summer Internship',
				location: 'Global Operations',
				description: 'Offers internships in cloud technologies, software development, and cutting-edge technology projects.',
				logo: '/internships/microsoft.png',
				category: 'Technology',
				domains: ['Cloud Computing', 'Software Development', 'AI/ML']
			},
			{
				company: 'Amazon',
				title: 'Software Development',
				type: 'Summer Internship',
				location: 'Worldwide',
				description: 'Provides internships in scalable distributed systems, e-commerce, and cloud computing services.',
				logo: '/internships/amazon.png',
				category: 'Technology',
				domains: ['Distributed Systems', 'E-commerce', 'Cloud Services']
			},
			{
				company: 'Google',
				title: 'Software Engineering',
				type: 'Summer Internship',
				location: 'Global Operations',
				description: 'Offers internship opportunities in cutting-edge technology products used by billions globally.',
				logo: '/internships/google.png',
				category: 'Technology',
				domains: ['Web Technologies', 'Mobile Development', 'AI/ML']
			},
			{
				company: 'IBM Research Labs',
				title: 'Research & Development',
				type: 'Research Internship',
				location: 'Global R&D Centers',
				description: 'Provides research internships in artificial intelligence, machine learning, and enterprise solutions.',
				logo: '/internships/ibm.png',
				category: 'Research',
				domains: ['AI/ML Research', 'Enterprise Solutions', 'Quantum Computing']
			},
			{
				company: 'Paytm',
				title: 'Fintech Development',
				type: 'Summer Internship',
				location: 'India Operations',
				description: 'Offers internships in fintech, digital payments, and financial services platform development.',
				logo: '/internships/paytm.png',
				category: 'Fintech',
				domains: ['Digital Payments', 'Financial Services', 'Product Development']
			},
			{
				company: 'Flipkart',
				title: 'E-commerce Technology',
				type: 'Summer Internship',
				location: 'India Operations',
				description: 'Provides internships in e-commerce technology, data science, and supply chain optimization.',
				logo: '/internships/flipkart.png',
				category: 'E-commerce',
				domains: ['Data Science', 'Supply Chain', 'Platform Development']
			},
			{
				company: 'Zomato',
				title: 'Food Tech Innovation',
				type: 'Startup Internship',
				location: 'India Operations',
				description: 'Offers internships in food technology, mobile app development, and delivery platform innovation.',
				logo: '/internships/zomato.png',
				category: 'Food Tech',
				domains: ['Mobile Development', 'Platform Innovation', 'Food Technology']
			},
			{
				company: 'ISRO',
				title: 'Space Technology',
				type: 'Research Internship',
				location: 'India Space Centers',
				description: 'Provides research internships in space technology, satellite development, and aerospace engineering.',
				logo: '/internships/isro.png',
				category: 'Aerospace',
				domains: ['Satellite Technology', 'Space Missions', 'Aerospace Engineering']
			}
		],
		process: [
			{
				title: 'Application Process',
				description: 'Students apply through college placement cell with required documents and eligibility criteria.',
				icon: 'Users'
			},
			{
				title: 'Selection & Training',
				description: 'Companies conduct interviews and select candidates who undergo orientation and skills training.',
				icon: 'Target'
			},
			{
				title: 'Performance & Growth',
				description: 'Interns work on real projects, receive mentorship, and may receive Pre-Placement Offers.',
				icon: 'TrendingUp'
			}
		],
		contact: {
			title: 'Need Guidance?',
			subtitle: 'Our placement team is here to help you find the perfect internship opportunity',
			phone: '+91-11-27850086 (Ext: 245)',
			email: 'internships@bpit.ac.in',
			buttons: [
				{
					text: 'Internship Guidelines',
					icon: 'BookOpen',
					variant: 'primary'
				},
				{
					text: 'Schedule Meeting',
					icon: 'Calendar',
					variant: 'secondary'
				}
			],
			gradient: 'from-blue-900 to-blue-800'
		}
	};

	// Delete existing components for this page
	await prisma.component.deleteMany({
		where: { pageId: page.id }
	});

	// Create new component
	await prisma.component.create({
		data: {
			pageId: page.id,
			key: 'internships-data',
			data: internshipsData,
			order: 0
		}
	});

	console.log('✅ Internships data seeded successfully!');
	console.log(`   - Hero section with icon and gradient`);
	console.log(`   - ${internshipsData.stats.length} stats`);
	console.log(`   - ${internshipsData.benefits.length} benefits`);
	console.log(`   - ${internshipsData.filters.length} filters`);
	console.log(`   - ${internshipsData.opportunities.length} internship opportunities`);
	console.log(`   - ${internshipsData.process.length} process steps`);
	console.log(`   - Contact section with ${internshipsData.contact.buttons.length} buttons`);
}

main()
	.catch(e => {
		console.error('Error seeding internships data:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
