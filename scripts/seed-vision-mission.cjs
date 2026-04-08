/** @type {import('@prisma/client').PrismaClient | undefined} */
let prisma;

async function main() {
	const { PrismaClient } = await import('@prisma/client');
	prisma = new PrismaClient();

	const pageSlug = 'vision-mission';

	const page = await prisma.page.upsert({
		where: { slug: pageSlug },
		update: {},
		create: {
			slug: pageSlug,
			title: 'Vision & Mission',
			kind: 'PAGE',
			status: 'PUBLISHED',
			metadata: { seeded: true }
		}
	});

	const visionMissionComponent = {
		hero: {
			title: 'Our Vision',
			subtitle: 'Inspiring Excellence, Shaping Tomorrow',
			icon: 'Eye',
			gradient: 'from-blue-50 to-indigo-100',
			borderColor: 'border-blue-200',
			iconBg: 'bg-blue-600'
		},
		visionStatement: {
			title: 'Vision Statement',
			icon: 'Compass',
			gradient: 'from-blue-50 to-indigo-50',
			borderColor: 'border-blue-100',
			quote: 'To be a premier institute of technical education, recognized globally for excellence in teaching, research, and innovation, fostering holistic development of students to become competent engineers and responsible citizens who contribute meaningfully to society and the nation\'s technological advancement.'
		},
		pillars: [
			{
				icon: 'BookOpen',
				title: 'Academic Excellence',
				description: 'Delivering world-class technical education through innovative curriculum, experienced faculty, and state-of-the-art infrastructure to nurture future engineers.',
				color: 'blue'
			},
			{
				icon: 'Lightbulb',
				title: 'Research & Innovation',
				description: 'Fostering a culture of research, innovation, and entrepreneurship to address real-world challenges and contribute to technological advancement.',
				color: 'green'
			},
			{
				icon: 'Globe',
				title: 'Global Recognition',
				description: 'Achieving international recognition through quality education, research collaborations, and partnerships with leading institutions worldwide.',
				color: 'purple'
			},
			{
				icon: 'Users',
				title: 'Holistic Development',
				description: 'Nurturing well-rounded individuals with strong technical skills, ethical values, and leadership qualities to serve society and the nation.',
				color: 'orange'
			}
		],
		aspirations: [
			{
				icon: 'TrendingUp',
				title: '2030 Goals',
				description: 'Achieve top 50 ranking among engineering institutes in India',
				color: 'blue'
			},
			{
				icon: 'Globe',
				title: 'Global Presence',
				description: 'Establish international collaborations and exchange programs',
				color: 'green'
			},
			{
				icon: 'Award',
				title: 'Excellence',
				description: 'Maintain highest standards of academic and research excellence',
				color: 'purple'
			}
		]
	};

	const missionComponent = {
		hero: {
			title: 'Our Mission',
			subtitle: 'Empowering Minds, Building Futures',
			icon: 'Target',
			gradient: 'from-green-50 to-emerald-100',
			borderColor: 'border-green-200',
			iconBg: 'bg-green-600'
		},
		missionStatement: {
			title: 'Mission Statement',
			icon: 'Heart',
			gradient: 'from-green-50 to-emerald-50',
			borderColor: 'border-green-100',
			quote: 'To provide quality technical education through innovative teaching methodologies, foster research and development activities, promote industry-academia collaboration, and develop skilled professionals with strong ethical values who can contribute effectively to the technological growth of the nation and society.'
		},
		objectives: [
			{
				icon: 'BookOpen',
				title: 'Quality Education',
				description: 'Deliver comprehensive technical education through modern curriculum, experienced faculty, and innovative teaching methodologies that prepare students for the challenges of the 21st century.',
				color: 'blue'
			},
			{
				icon: 'Lightbulb',
				title: 'Research & Innovation',
				description: 'Promote a culture of research, innovation, and entrepreneurship among students and faculty to develop solutions for real-world problems and contribute to technological advancement.',
				color: 'green'
			},
			{
				icon: 'Users',
				title: 'Industry Collaboration',
				description: 'Foster strong industry-academia partnerships through internships, projects, and placements to ensure students are industry-ready and meet the evolving needs of the corporate world.',
				color: 'purple'
			},
			{
				icon: 'Heart',
				title: 'Ethical Development',
				description: 'Instill strong moral and ethical values in students, developing them as responsible citizens who contribute positively to society and uphold the highest standards of professional integrity.',
				color: 'orange'
			},
			{
				icon: 'Globe',
				title: 'Global Competency',
				description: 'Develop globally competent engineers through exposure to international best practices, cross-cultural learning, and collaboration with leading institutions worldwide.',
				color: 'indigo'
			}
		],
		impact: {
			title: 'Mission Impact',
			icon: 'Zap',
			gradient: 'from-green-500 to-teal-600',
			stats: [
				{
					number: '5000+',
					label: 'Alumni Making Impact',
					color: 'text-green-600'
				},
				{
					number: '95%',
					label: 'Placement Success Rate',
					color: 'text-blue-600'
				},
				{
					number: '100+',
					label: 'Research Publications',
					color: 'text-purple-600'
				}
			]
		}
	};

	const qualityPolicyComponent = {
		hero: {
			title: 'Quality Policy',
			subtitle: 'Commitment to Excellence in All Endeavors',
			icon: 'Award',
			gradient: 'from-purple-50 to-indigo-100',
			borderColor: 'border-purple-200',
			iconBg: 'bg-purple-600'
		},
		policyStatement: {
			title: 'Quality Policy Statement',
			icon: 'Shield',
			gradient: 'from-purple-50 to-indigo-50',
			borderColor: 'border-purple-100',
			quote: 'BPIT is committed to providing quality technical education and training to produce competent engineers and technology leaders. We strive for continuous improvement in all our processes, maintain high academic standards, and ensure stakeholder satisfaction through effective implementation of Quality Management System.'
		},
		commitments: [
			{
				icon: 'BookOpen',
				title: 'Academic Excellence',
				description: [
					'Maintain updated curriculum aligned with industry needs',
					'Employ qualified and experienced faculty',
					'Provide state-of-the-art infrastructure and facilities'
				],
				iconColor: 'text-blue-600',
				bgColor: 'bg-blue-100'
			},
			{
				icon: 'TrendingUp',
				title: 'Continuous Improvement',
				description: [
					'Regular review and enhancement of academic processes',
					'Feedback-driven improvement initiatives',
					'Adoption of best practices in education'
				],
				iconColor: 'text-green-600',
				bgColor: 'bg-green-100'
			},
			{
				icon: 'Users',
				title: 'Stakeholder Satisfaction',
				description: [
					'Regular feedback collection from all stakeholders',
					'Prompt grievance redressal mechanisms',
					'Transparent communication channels'
				],
				iconColor: 'text-purple-600',
				bgColor: 'bg-purple-100'
			},
			{
				icon: 'Star',
				title: 'Professional Development',
				description: [
					'Continuous faculty development programs',
					'Student skill enhancement initiatives',
					'Industry exposure and training programs'
				],
				iconColor: 'text-orange-600',
				bgColor: 'bg-orange-100'
			}
		],
		framework: {
			title: 'Quality Management Framework',
			icon: 'Shield',
			gradient: 'from-purple-500 to-pink-600',
			steps: [
				{
					icon: 'Target',
					title: 'Plan',
					description: 'Establish quality objectives and processes',
					iconColor: 'text-blue-600',
					bgColor: 'bg-blue-50'
				},
				{
					icon: 'Zap',
					title: 'Do',
					description: 'Implement planned processes and activities',
					iconColor: 'text-green-600',
					bgColor: 'bg-green-50'
				},
				{
					icon: 'Eye',
					title: 'Check',
					description: 'Monitor and evaluate process effectiveness',
					iconColor: 'text-purple-600',
					bgColor: 'bg-purple-50'
				},
				{
					icon: 'TrendingUp',
					title: 'Act',
					description: 'Take corrective actions for improvement',
					iconColor: 'text-orange-600',
					bgColor: 'bg-orange-50'
				}
			]
		},
		assuranceBodies: {
			title: 'Quality Assurance Bodies',
			items: [
				{
					icon: 'Award',
					title: 'IQAC',
					description: 'Internal Quality Assurance Cell for continuous monitoring',
					iconBg: 'bg-blue-600',
					gradient: 'from-blue-50 to-blue-100'
				},
				{
					icon: 'Shield',
					title: 'NBA',
					description: 'National Board of Accreditation compliance',
					iconBg: 'bg-green-600',
					gradient: 'from-green-50 to-green-100'
				},
				{
					icon: 'Star',
					title: 'NAAC',
					description: 'National Assessment and Accreditation Council',
					iconBg: 'bg-purple-600',
					gradient: 'from-purple-50 to-purple-100'
				}
			]
		}
	};

	// Delete existing components for this page
	await prisma.component.deleteMany({ where: { pageId: page.id } });

	// Create the vision-mission component
	await prisma.component.create({
		data: {
			pageId: page.id,
			key: 'VISION_MISSION',
			order: 1,
			data: visionMissionComponent
		}
	});

	// Create the mission component
	await prisma.component.create({
		data: {
			pageId: page.id,
			key: 'MISSION',
			order: 2,
			data: missionComponent
		}
	});

	// Create the quality policy component
	await prisma.component.create({
		data: {
			pageId: page.id,
			key: 'QUALITY_POLICY',
			order: 3,
			data: qualityPolicyComponent
		}
	});

	console.log(`Seeded Vision, Mission & Quality Policy page with slug "${pageSlug}" successfully.`);
}

main()
	.catch(error => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		if (prisma) {
			await prisma.$disconnect();
		}
	});