const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedTrainingPlacement() {
	try {
		console.log('Starting Training & Placement seeding...');

		// Create or find the page
		const page = await prisma.page.upsert({
			where: { slug: 'training-placement' },
			update: {},
			create: {
				slug: 'training-placement',
				title: 'Training & Placement',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});

		console.log('Page created/found:', page.slug);

		// Delete existing components
		await prisma.component.deleteMany({
			where: { pageId: page.id }
		});

		console.log('Existing components deleted');

		// Create the training placement component
		const trainingPlacementData = {
			hero: {
				icon: 'Users',
				title: 'About Training & Placement',
				subtitle: 'Empowering students with industry-ready skills and career opportunities',
				gradient: 'from-blue-900 via-blue-800 to-blue-900',
				iconColor: 'white',
				textColor: 'white'
			},
			directorMessage: {
				name: 'Prof. Achal Kausik',
				position: 'Dean of Academics, Head of CSE, Head of T&P',
				initials: 'AK',
				gradientColor: 'from-blue-500 to-blue-700',
				message1: 'The Training & Placement Cell at BPIT is dedicated to maximizing student placements with competitive compensation packages. We focus on early student assessment, targeted training programs, and continuous support to prepare our students for industry success.',
				message2: 'With an average package of ₹9.07 lakhs per annum and a 96% placement rate for eligible students, we maintain strong partnerships with top companies including Google, Microsoft, Amazon, and leading mass recruiters to ensure excellent career opportunities for our graduates.'
			},
			teamTitle: 'Our Dedicated Team',
			teamDescription: 'Meet the professionals who make career dreams a reality',
			teamMembers: [
				{
					id: '1',
					name: 'Prof. Achal Kausik',
					position: 'Dean of Academics, Head of CSE, Head of T&P',
					qualifications: 'Ph.D. in Computer Science, Dean of Academics',
					specialization: 'Academic Leadership & Strategic Planning'
				},
				{
					id: '2',
					name: 'Mr. Sanjay Dureja',
					position: 'Sr. Manager T&P',
					qualifications: 'Senior Manager with extensive placement experience',
					specialization: 'Training & Placement Management'
				},
				{
					id: '3',
					name: 'Ms. Priyanka Sharma',
					position: 'Assistant Manager T&P',
					qualifications: 'Assistant Manager focused on student development',
					specialization: 'Student Training & Career Guidance'
				},
				{
					id: '4',
					name: 'Mr. Kashish Sharma',
					position: 'T&P Coordinator',
					qualifications: 'Coordinator for placement activities',
					specialization: 'Placement Coordination & Industry Relations'
				},
				{
					id: '5',
					name: 'Mr. Vikas Kumar',
					position: 'Assistant Manager T&P',
					qualifications: 'Assistant Manager with focus on student support',
					specialization: 'Student Assistance & Placement Support'
				},
				{
					id: '6',
					name: 'Ms. Promila Rana',
					position: 'Office Assistant',
					qualifications: 'Administrative support for T&P operations',
					specialization: 'Administrative Operations & Support'
				}
			],
			departmentsTitle: 'Department-wise Placement Coordinators',
			departmentsDescription: 'Specialized support for each department\'s unique placement needs',
			departments: [
				{
					id: '1',
					name: 'Computer Science & Engineering',
					code: 'CSE',
					coordinator: 'Prof. Achal Kausik',
					companies: 'Google, Microsoft, Amazon, TCS, Infosys, Wipro, Accenture, IBM',
					avgPackage: '₹9.07 LPA',
					placementRate: '96%'
				},
				{
					id: '2',
					name: 'Information Technology',
					code: 'IT',
					coordinator: 'Department Faculty',
					companies: 'Zomato, Flipkart, Paytm, HCL, Tech Mahindra, Capgemini',
					avgPackage: '₹8.5 LPA',
					placementRate: '94%'
				},
				{
					id: '3',
					name: 'Electronics & Communication',
					code: 'ECE',
					coordinator: 'Department Faculty',
					companies: 'Samsung, Qualcomm, Ericsson, Nokia, TCS, Infosys',
					avgPackage: '₹7.8 LPA',
					placementRate: '90%'
				},
				{
					id: '4',
					name: 'Electrical & Electronics',
					code: 'EEE',
					coordinator: 'Department Faculty',
					companies: 'Siemens, ABB, General Electric, Schneider, TCS, Wipro',
					avgPackage: '₹7.2 LPA',
					placementRate: '88%'
				}
			],
			trainingTitle: 'Training Programs',
			trainingDescription: 'Comprehensive training modules to enhance student employability',
			trainingPrograms: [
				{
					id: '1',
					title: 'Soft Skills Development',
					description: 'Communication, leadership, and interpersonal skills training',
					duration: '2 weeks',
					participants: '500+ students',
					icon: 'Users',
					color: 'blue'
				},
				{
					id: '2',
					title: 'Technical Training',
					description: 'Latest technology trends and industry-relevant technical skills',
					duration: '4 weeks',
					participants: '400+ students',
					icon: 'BookOpen',
					color: 'green'
				},
				{
					id: '3',
					title: 'Interview Preparation',
					description: 'Mock interviews, group discussions, and aptitude training',
					duration: '3 weeks',
					participants: '600+ students',
					icon: 'MessageCircle',
					color: 'purple'
				},
				{
					id: '4',
					title: 'Industry Workshops',
					description: 'Guest lectures and hands-on workshops by industry experts',
					duration: 'Ongoing',
					participants: '300+ students',
					icon: 'Lightbulb',
					color: 'orange'
				}
			],
			objectivesTitle: 'T&P Cell Objectives',
			objectivesDescription: 'Our primary focus areas for student development and placement success',
			objectives: [
				{
					id: '1',
					title: 'Maximize Student Placements',
					description: 'Ensure maximum number of students get placed in reputed companies',
					icon: 'Target'
				},
				{
					id: '2',
					title: 'Competitive Compensation',
					description: 'Achieve competitive salary packages for all placed students',
					icon: 'TrendingUp'
				},
				{
					id: '3',
					title: 'Information Dissemination',
					description: 'Keep students informed about placement opportunities and requirements',
					icon: 'MessageCircle'
				},
				{
					id: '4',
					title: 'Student Assessment',
					description: 'Early assessment and targeted training based on individual strengths',
					icon: 'CheckCircle'
				},
				{
					id: '5',
					title: 'Industry Training',
					description: 'Provide industry-relevant training and skill development programs',
					icon: 'BookOpen'
				},
				{
					id: '6',
					title: 'Higher Education Support',
					description: 'Support students pursuing higher education opportunities',
					icon: 'Award'
				}
			],
			statisticsTitle: 'Our Success Metrics',
			statisticsDescription: 'Placement statistics that showcase our commitment to student success',
			statistics: [
				{
					id: '1',
					number: '₹9.07',
					label: 'Average Package',
					sublabel: 'LPA for 2022 batch'
				},
				{
					id: '2',
					number: '₹7.0',
					label: 'Median Package',
					sublabel: 'LPA overall'
				},
				{
					id: '3',
					number: '96%',
					label: 'Placement Rate',
					sublabel: 'Eligible students'
				},
				{
					id: '4',
					number: '500+',
					label: 'Companies',
					sublabel: 'Recruiting partners'
				}
			]
		};

	const component = await prisma.component.create({
		data: {
			pageId: page.id,
			order: 0,
			data: trainingPlacementData
		}
	});		console.log('Component created successfully');
		console.log('Training & Placement seeding completed!');
		console.log('Summary:');
		console.log(`- Team Members: ${trainingPlacementData.teamMembers.length}`);
		console.log(`- Departments: ${trainingPlacementData.departments.length}`);
		console.log(`- Training Programs: ${trainingPlacementData.trainingPrograms.length}`);
		console.log(`- Objectives: ${trainingPlacementData.objectives.length}`);
		console.log(`- Statistics: ${trainingPlacementData.statistics.length}`);
	} catch (error) {
		console.error('Error seeding training placement:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

seedTrainingPlacement();
