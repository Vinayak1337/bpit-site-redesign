/** @type {import('@prisma/client').PrismaClient | undefined} */
let prisma;

async function main() {
	const { PrismaClient } = await import('@prisma/client');
	prisma = new PrismaClient();

	const pageSlug = 'about';

	const page = await prisma.page.upsert({
		where: { slug: pageSlug },
		update: {},
		create: {
			slug: pageSlug,
			title: 'About BPIT',
			kind: 'PAGE',
			status: 'PUBLISHED',
			metadata: { seeded: true }
		}
	});

	const heroComponent = {
		title: 'About BPIT',
		subtitle:
			'Discover our journey of excellence, vision, and commitment to engineering education',
		gradient: 'from-blue-600 to-blue-700',
		backgroundImage:
			'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop'
	};

	const overviewComponent = {
		header: {
			title: 'Bhagwan Parshuram Institute of Technology',
			subtitle: 'Excellence in Engineering Education',
			established: '2007',
			location: 'Rohini, New Delhi',
			accreditation: 'NBA & NAAC',
			affiliation: 'GGSIPU',
			image:
				'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop&crop=faces'
		},
		stats: [
			{
				icon: 'GraduationCap',
				value: '1000+',
				label: 'Students Enrolled',
				color: 'green'
			},
			{
				icon: 'BookOpen',
				value: '5',
				label: 'Engineering Departments',
				color: 'purple'
			},
			{
				icon: 'Users',
				value: '60+',
				label: 'Student Clubs & Societies',
				color: 'blue'
			}
		]
	};

	const legacyComponent = {
		title: 'Our Legacy',
		paragraphs: [
			'Bhagwan Parshuram Institute of Technology (BPIT) stands as a beacon of excellence in engineering education in Delhi. Established in 2007, BPIT has been committed to providing world-class technical education and fostering innovation among aspiring engineers.',
			'Located in the heart of Rohini, New Delhi, our institution is affiliated with Guru Gobind Singh Indraprastha University (GGSIPU) and is accredited by the National Board of Accreditation (NBA) and National Assessment and Accreditation Council (NAAC), ensuring the highest standards of education quality.',
			'Our campus is equipped with state-of-the-art laboratories, modern classrooms, and cutting-edge research facilities. We offer undergraduate programs in Computer Science, Information Technology, Electronics & Communication, Electrical Engineering, and Management Studies.'
		],
		features: [
			{
				icon: 'Trophy',
				title: 'Academic Excellence',
				description:
					'Consistently high placement rates and academic achievements by our students.',
				color: 'blue'
			},
			{
				icon: 'Lightbulb',
				title: 'Innovation Hub',
				description:
					'Fostering creativity and innovation through research projects and startups.',
				color: 'green'
			},
			{
				icon: 'Users',
				title: 'Industry Connect',
				description:
					'Strong industry partnerships providing internships and placement opportunities.',
				color: 'purple'
			}
		]
	};

	const components = [
		{
			key: 'ABOUT_HERO',
			order: 1,
			data: heroComponent
		},
		{
			key: 'ABOUT_OVERVIEW',
			order: 2,
			data: overviewComponent
		},
		{
			key: 'ABOUT_LEGACY',
			order: 3,
			data: legacyComponent
		}
	];

	await prisma.component.deleteMany({ where: { pageId: page.id } });

	for (const component of components) {
		await prisma.component.create({
			data: {
				pageId: page.id,
				key: component.key,
				order: component.order,
				data: component.data
			}
		});
	}

	console.log(
		`Seeded About page with slug "${pageSlug}" and ${components.length} components.`
	);
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
