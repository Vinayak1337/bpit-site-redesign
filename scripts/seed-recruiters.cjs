const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	console.log('Starting Recruiters seeding...');

	// Check if page already exists
	let page = await prisma.page.findUnique({
		where: { slug: 'recruiters' },
		include: { components: true }
	});

	if (!page) {
		// Create the page
		page = await prisma.page.create({
			data: {
				slug: 'recruiters',
				title: 'Our Recruiters',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});
		console.log('Created recruiters page');
	}

	const recruitersData = {
		hero: {
			icon: 'Building2',
			title: 'Our Recruiters',
			subtitle: 'Industry leaders who trust BPIT graduates for their excellence and capabilities',
			gradient: 'from-blue-900 via-blue-800 to-blue-900'
		},
		stats: [
			{
				icon: 'Building2',
				value: '500+',
				label: 'Partner Companies',
				color: 'from-blue-500 to-blue-700'
			},
			{
				icon: 'Users',
				value: '2000+',
				label: 'Students Placed',
				color: 'from-blue-500 to-blue-700'
			},
			{
				icon: 'TrendingUp',
				value: '96%',
				label: 'Placement Rate',
				color: 'from-blue-500 to-blue-700'
			},
			{
				icon: 'Award',
				value: '₹9.07 LPA',
				label: 'Average Package',
				color: 'from-blue-500 to-blue-700'
			}
		],
		categories: ['All', 'IT Services', 'Product Companies', 'Consulting', 'Core Engineering', 'Banking & Finance', 'Startups'],
		recruiters: [
			{
				name: 'Tata Consultancy Services',
				logo: '/recruiters/tcs.png',
				category: 'IT Services',
				sector: 'Information Technology',
				location: 'Global Operations',
				type: 'MNC',
				established: '1968',
				website: 'https://tcs.com',
				description: 'Global leader in IT services, consulting and business solutions with operations across continents'
			},
			{
				name: 'Infosys Limited',
				logo: '/recruiters/infosys.png',
				category: 'IT Services',
				sector: 'Information Technology',
				location: 'Global Operations',
				type: 'MNC',
				established: '1981',
				website: 'https://infosys.com',
				description: 'Global leader in next-generation digital services and consulting, enabling digital transformation'
			},
			{
				name: 'Microsoft Corporation',
				logo: '/recruiters/microsoft.png',
				category: 'Product Companies',
				sector: 'Technology',
				location: 'Worldwide',
				type: 'Product Giant',
				established: '1975',
				website: 'https://microsoft.com',
				description: 'Leading technology corporation specializing in software, cloud computing, and productivity solutions'
			},
			{
				name: 'Wipro Technologies',
				logo: '/recruiters/wipro.png',
				category: 'IT Services',
				sector: 'Information Technology',
				location: 'Global Operations',
				type: 'MNC',
				established: '1945',
				website: 'https://wipro.com',
				description: 'Global technology consulting and digital transformation company serving diverse industries'
			},
			{
				name: 'Accenture',
				logo: '/recruiters/accenture.png',
				category: 'Consulting',
				sector: 'Management Consulting',
				location: 'Global Operations',
				type: 'Consulting',
				established: '1989',
				website: 'https://accenture.com',
				description: 'Global professional services company specializing in digital transformation and technology consulting'
			},
			{
				name: 'Amazon',
				logo: '/recruiters/amazon.png',
				category: 'Product Companies',
				sector: 'E-commerce & Cloud',
				location: 'Worldwide',
				type: 'Product Giant',
				established: '1994',
				website: 'https://amazon.com',
				description: 'World\'s largest e-commerce platform and cloud computing services provider'
			},
			{
				name: 'Samsung R&D',
				logo: '/recruiters/samsung.png',
				category: 'Core Engineering',
				sector: 'Electronics & Technology',
				location: 'Global R&D Centers',
				type: 'R&D',
				established: '1938',
				website: 'https://samsung.com',
				description: 'Global technology conglomerate and innovation leader in electronics and semiconductors'
			},
			{
				name: 'HDFC Bank',
				logo: '/recruiters/hdfc.png',
				category: 'Banking & Finance',
				sector: 'Banking',
				location: 'Pan-India Operations',
				type: 'Banking',
				established: '1994',
				website: 'https://hdfcbank.com',
				description: 'Leading private sector bank offering comprehensive financial services and digital banking solutions'
			},
			{
				name: 'Paytm',
				logo: '/recruiters/paytm.png',
				category: 'Startups',
				sector: 'Fintech',
				location: 'India Operations',
				type: 'Fintech',
				established: '2010',
				website: 'https://paytm.com',
				description: 'Leading digital payments and financial services platform revolutionizing digital transactions'
			},
			{
				name: 'Cognizant',
				logo: '/recruiters/cognizant.png',
				category: 'IT Services',
				sector: 'Information Technology',
				location: 'Global Operations',
				type: 'MNC',
				established: '1994',
				website: 'https://cognizant.com',
				description: 'Multinational technology and professional services company enabling digital transformation'
			},
			{
				name: 'HCL Technologies',
				logo: '/recruiters/hcl.png',
				category: 'IT Services',
				sector: 'Information Technology',
				location: 'Global Operations',
				type: 'MNC',
				established: '1976',
				website: 'https://hcltech.com',
				description: 'Global technology company specializing in engineering, R&D services and digital transformation'
			},
			{
				name: 'IBM India',
				logo: '/recruiters/ibm.png',
				category: 'Product Companies',
				sector: 'Technology & Consulting',
				location: 'Global Operations',
				type: 'MNC',
				established: '1911',
				website: 'https://ibm.com',
				description: 'Global technology and consulting corporation pioneering enterprise AI and cloud solutions'
			},
			{
				name: 'Google',
				logo: '/recruiters/google.png',
				category: 'Product Companies',
				sector: 'Technology',
				location: 'Worldwide',
				type: 'Product Giant',
				established: '1998',
				website: 'https://google.com',
				description: 'Global technology leader specializing in internet services, cloud computing, and artificial intelligence'
			},
			{
				name: 'Zomato',
				logo: '/recruiters/zomato.png',
				category: 'Startups',
				sector: 'Food Tech',
				location: 'India Operations',
				type: 'Unicorn',
				established: '2008',
				website: 'https://zomato.com',
				description: 'Leading food delivery and restaurant discovery platform transforming the food ecosystem'
			},
			{
				name: 'Flipkart',
				logo: '/recruiters/flipkart.png',
				category: 'Product Companies',
				sector: 'E-commerce',
				location: 'India Operations',
				type: 'Unicorn',
				established: '2007',
				website: 'https://flipkart.com',
				description: 'Leading Indian e-commerce marketplace revolutionizing online retail and digital commerce'
			},
			{
				name: 'Capgemini',
				logo: '/recruiters/capgemini.png',
				category: 'Consulting',
				sector: 'Technology Consulting',
				location: 'Global Operations',
				type: 'MNC',
				established: '1967',
				website: 'https://capgemini.com',
				description: 'Global technology consulting and digital transformation leader serving diverse industries worldwide'
			},
			{
				name: 'Juspay',
				logo: '/recruiters/juspay.png',
				category: 'Startups',
				sector: 'Fintech',
				location: 'India Operations',
				type: 'Fintech',
				established: '2012',
				website: 'https://juspay.in',
				description: 'Leading payment infrastructure company enabling seamless digital payment experiences'
			},
			{
				name: 'ZS Associates',
				logo: '/recruiters/zs.png',
				category: 'Consulting',
				sector: 'Analytics Consulting',
				location: 'Global Operations',
				type: 'Consulting',
				established: '1983',
				website: 'https://zs.com',
				description: 'Global consulting firm specializing in sales, marketing, and analytics solutions'
			}
		],
		cta: {
			title: 'Want to Partner with Us?',
			subtitle: 'Join our network of industry partners and hire top-tier talent from BPIT',
			buttons: [
				{
					text: 'Become a Recruiter',
					icon: 'Building2',
					variant: 'primary'
				},
				{
					text: 'Visit Career Portal',
					icon: 'Globe',
					variant: 'secondary'
				}
			],
			gradient: 'from-blue-900 to-blue-800'
		}
	};

	// Delete existing components for this page
	if (page.components && page.components.length > 0) {
		await prisma.component.deleteMany({
			where: { pageId: page.id }
		});
		console.log('Deleted existing recruiters components');
	}

	// Create new component with recruiters data
	await prisma.component.create({
		data: {
			pageId: page.id,
			key: 'recruiters-data',
			data: recruitersData,
			order: 0
		}
	});

	console.log('Recruiters data seeded successfully!');
}

main()
	.catch(e => {
		console.error('Error seeding recruiters:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
