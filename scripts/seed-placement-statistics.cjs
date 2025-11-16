const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	console.log('Starting Placement Statistics seeding...');

	// Check if page already exists
	let page = await prisma.page.findUnique({
		where: { slug: 'placement-statistics' },
		include: { components: true }
	});

	if (!page) {
		// Create the page
		page = await prisma.page.create({
			data: {
				slug: 'placement-statistics',
				title: 'Placement Statistics',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});
		console.log('Created placement-statistics page');
	}

	const placementStatisticsData = {
		hero: {
			icon: 'BarChart3',
			title: 'Placement Statistics',
			subtitle: 'Data-driven insights into our placement success and student achievements',
			gradient: 'from-blue-900 via-blue-800 to-blue-900'
		},
		years: ['2024', '2023', '2022', '2021', '2020'],
		departments: ['All', 'CSE', 'IT', 'ECE', 'EEE', 'MBA'],
		overallStats: {
			'2024': {
				placementRate: 87,
				totalStudents: 650,
				studentsPlaced: 565,
				companiesVisited: 95,
				highestPackage: 15.5,
				averagePackage: 6.8,
				medianPackage: 6.2
			},
			'2023': {
				placementRate: 85,
				totalStudents: 620,
				studentsPlaced: 527,
				companiesVisited: 88,
				highestPackage: 14.2,
				averagePackage: 6.5,
				medianPackage: 6.0
			},
			'2022': {
				placementRate: 82,
				totalStudents: 580,
				studentsPlaced: 476,
				companiesVisited: 82,
				highestPackage: 13.8,
				averagePackage: 6.2,
				medianPackage: 5.8
			}
		},
		departmentStats: {
			'2024': {
				'CSE': { placed: 145, total: 160, avgPackage: 7.5, highest: 15.5, companies: 45 },
				'IT': { placed: 138, total: 150, avgPackage: 7.2, highest: 14.8, companies: 42 },
				'ECE': { placed: 125, total: 155, avgPackage: 6.5, highest: 12.5, companies: 38 },
				'EEE': { placed: 118, total: 140, avgPackage: 6.2, highest: 11.8, companies: 35 },
				'MBA': { placed: 39, total: 45, avgPackage: 8.2, highest: 15.0, companies: 25 }
			}
		},
		sectorWiseData: [
			{
				sector: 'IT Services',
				percentage: 45,
				companies: ['TCS', 'Infosys', 'Wipro', 'Cognizant'],
				color: 'from-blue-500 to-cyan-600'
			},
			{
				sector: 'Product Companies',
				percentage: 25,
				companies: ['Microsoft', 'Amazon', 'Google', 'IBM'],
				color: 'from-purple-500 to-violet-600'
			},
			{
				sector: 'Consulting',
				percentage: 15,
				companies: ['Accenture', 'Deloitte', 'PwC', 'EY'],
				color: 'from-green-500 to-emerald-600'
			},
			{
				sector: 'Core Engineering',
				percentage: 10,
				companies: ['Samsung', 'Siemens', 'ABB', 'GE'],
				color: 'from-orange-500 to-red-600'
			},
			{
				sector: 'Banking & Finance',
				percentage: 5,
				companies: ['HDFC', 'ICICI', 'SBI', 'Axis'],
				color: 'from-pink-500 to-rose-600'
			}
		],
		packageDistribution: [
			{ range: '₹15+ LPA', count: 25, percentage: 4.4 },
			{ range: '₹10-15 LPA', count: 85, percentage: 15.0 },
			{ range: '₹7-10 LPA', count: 165, percentage: 29.2 },
			{ range: '₹5-7 LPA', count: 190, percentage: 33.6 },
			{ range: '₹3-5 LPA', count: 100, percentage: 17.7 }
		],
		yearlyTrends: [
			{ year: '2020', rate: 78, avg: 5.8, companies: 65 },
			{ year: '2021', rate: 80, avg: 6.0, companies: 72 },
			{ year: '2022', rate: 82, avg: 6.2, companies: 82 },
			{ year: '2023', rate: 85, avg: 6.5, companies: 88 },
			{ year: '2024', rate: 87, avg: 6.8, companies: 95 }
		],
		studentPlacements: [
			// 2024 Batch - Top Tier
			{
				name: 'Arjun Sharma',
				department: 'CSE',
				company: 'Microsoft',
				package: 15.5,
				batch: '2024',
				role: 'Software Engineer'
			},
			{
				name: 'Priya Gupta',
				department: 'IT',
				company: 'Amazon',
				package: 14.8,
				batch: '2024',
				role: 'SDE-1'
			},
			{
				name: 'Rohit Kumar',
				department: 'CSE',
				company: 'Google',
				package: 14.5,
				batch: '2024',
				role: 'Software Developer'
			},
			{
				name: 'Vikash Singh',
				department: 'MBA',
				company: 'McKinsey',
				package: 15.0,
				batch: '2024',
				role: 'Business Analyst'
			},
			{
				name: 'Sneha Agarwal',
				department: 'ECE',
				company: 'Samsung',
				package: 12.5,
				batch: '2024',
				role: 'R&D Engineer'
			},
			{
				name: 'Ankit Verma',
				department: 'CSE',
				company: 'Adobe',
				package: 13.8,
				batch: '2024',
				role: 'Software Engineer'
			},
			{
				name: 'Riya Sharma',
				department: 'IT',
				company: 'Salesforce',
				package: 13.5,
				batch: '2024',
				role: 'Developer'
			},
			{
				name: 'Karthik Reddy',
				department: 'CSE',
				company: 'Oracle',
				package: 12.8,
				batch: '2024',
				role: 'Software Developer'
			},
			{
				name: 'Meera Jain',
				department: 'ECE',
				company: 'Qualcomm',
				package: 12.2,
				batch: '2024',
				role: 'Hardware Engineer'
			},
			{
				name: 'Samarth Gupta',
				department: 'IT',
				company: 'Zomato',
				package: 11.5,
				batch: '2024',
				role: 'Full Stack Developer'
			},
			// 2024 Batch - Mid Tier
			{
				name: 'Aarti Singh',
				department: 'CSE',
				company: 'TCS',
				package: 9.2,
				batch: '2024',
				role: 'Software Engineer'
			},
			{
				name: 'Deepak Kumar',
				department: 'IT',
				company: 'Infosys',
				package: 8.8,
				batch: '2024',
				role: 'Systems Engineer'
			},
			{
				name: 'Neha Agrawal',
				department: 'ECE',
				company: 'Wipro',
				package: 8.5,
				batch: '2024',
				role: 'Project Engineer'
			},
			{
				name: 'Rahul Mishra',
				department: 'EEE',
				company: 'L&T',
				package: 8.2,
				batch: '2024',
				role: 'Graduate Trainee'
			},
			{
				name: 'Pooja Yadav',
				department: 'MBA',
				company: 'HDFC Bank',
				package: 9.5,
				batch: '2024',
				role: 'Management Trainee'
			},
			{
				name: 'Amit Patel',
				department: 'CSE',
				company: 'Cognizant',
				package: 7.8,
				batch: '2024',
				role: 'Programmer Analyst'
			},
			{
				name: 'Shruti Joshi',
				department: 'IT',
				company: 'HCL',
				package: 7.5,
				batch: '2024',
				role: 'Software Engineer'
			},
			{
				name: 'Varun Thakur',
				department: 'ECE',
				company: 'Tech Mahindra',
				package: 7.2,
				batch: '2024',
				role: 'Associate Engineer'
			},
			{
				name: 'Kavya Reddy',
				department: 'EEE',
				company: 'ABB',
				package: 6.8,
				batch: '2024',
				role: 'Graduate Engineer'
			},
			{
				name: 'Harsh Agarwal',
				department: 'MBA',
				company: 'ICICI Bank',
				package: 8.8,
				batch: '2024',
				role: 'Officer'
			},
			// 2024 Batch - Entry Level
			{
				name: 'Nisha Kumari',
				department: 'CSE',
				company: 'Accenture',
				package: 6.5,
				batch: '2024',
				role: 'Associate'
			},
			{
				name: 'Rajesh Sharma',
				department: 'IT',
				company: 'Capgemini',
				package: 6.2,
				batch: '2024',
				role: 'Analyst'
			},
			{
				name: 'Manisha Singh',
				department: 'ECE',
				company: 'Deloitte',
				package: 6.8,
				batch: '2024',
				role: 'Consultant'
			},
			{
				name: 'Akash Gupta',
				department: 'EEE',
				company: 'Siemens',
				package: 6.5,
				batch: '2024',
				role: 'Trainee Engineer'
			},
			{
				name: 'Priyanka Jain',
				department: 'MBA',
				company: 'Axis Bank',
				package: 7.2,
				batch: '2024',
				role: 'Executive'
			},
			// 2023 Batch
			{
				name: 'Abhishek Tiwari',
				department: 'CSE',
				company: 'Microsoft',
				package: 14.2,
				batch: '2023',
				role: 'Software Engineer'
			},
			{
				name: 'Shreya Kapoor',
				department: 'IT',
				company: 'Amazon',
				package: 13.8,
				batch: '2023',
				role: 'SDE-1'
			},
			{
				name: 'Vishal Kumar',
				department: 'CSE',
				company: 'Google',
				package: 13.5,
				batch: '2023',
				role: 'Software Developer'
			},
			{
				name: 'Anjali Sharma',
				department: 'ECE',
				company: 'Intel',
				package: 11.8,
				batch: '2023',
				role: 'Design Engineer'
			},
			{
				name: 'Nikhil Agarwal',
				department: 'MBA',
				company: 'Bain & Company',
				package: 14.5,
				batch: '2023',
				role: 'Associate Consultant'
			},
			// 2022 Batch
			{
				name: 'Siddharth Rao',
				department: 'CSE',
				company: 'Apple',
				package: 13.8,
				batch: '2022',
				role: 'Software Engineer'
			},
			{
				name: 'Divya Gupta',
				department: 'IT',
				company: 'Netflix',
				package: 13.2,
				batch: '2022',
				role: 'Software Developer'
			},
			{
				name: 'Mohit Singh',
				department: 'ECE',
				company: 'NVIDIA',
				package: 12.5,
				batch: '2022',
				role: 'Hardware Engineer'
			},
			{
				name: 'Ritu Sharma',
				department: 'MBA',
				company: 'BCG',
				package: 14.8,
				batch: '2022',
				role: 'Business Analyst'
			},
			{
				name: 'Gaurav Kumar',
				department: 'EEE',
				company: 'GE',
				package: 10.5,
				batch: '2022',
				role: 'Graduate Engineer'
			}
		]
	};

	// Create or update component
	if (page.components && page.components.length > 0) {
		await prisma.component.update({
			where: { id: page.components[0].id },
			data: {
				data: placementStatisticsData,
				updatedAt: new Date()
			}
		});
		console.log('Updated existing placement statistics component');
	} else {
		await prisma.component.create({
			data: {
				pageId: page.id,
				order: 0,
				data: placementStatisticsData
			}
		});
		console.log('Created new placement statistics component');
	}

	console.log('\nPlacement Statistics seeding completed!');
	console.log('Summary:');
	console.log(`- Years: ${placementStatisticsData.years.length}`);
	console.log(`- Departments: ${placementStatisticsData.departments.length}`);
	console.log(`- Sector Categories: ${placementStatisticsData.sectorWiseData.length}`);
	console.log(`- Package Ranges: ${placementStatisticsData.packageDistribution.length}`);
	console.log(`- Yearly Trends: ${placementStatisticsData.yearlyTrends.length}`);
	console.log(`- Student Placements: ${placementStatisticsData.studentPlacements.length}`);
}

main()
	.catch(e => {
		console.error('Error during seeding:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
