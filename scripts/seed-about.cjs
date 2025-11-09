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

	const chairmanMessageComponent = {
		header: {
			title: "Chairman's Message",
			subtitle: 'A Vision for Excellence in Engineering Education'
		},
		introQuote: '"Dear Students, Faculty, and Stakeholders,"',
		paragraphs: [
			'It gives me immense pleasure to welcome you to Bhagwan Parshuram Institute of Technology, an institution that has been at the forefront of engineering education since 2007. Our journey has been one of continuous growth, innovation, and excellence.',
			'At BPIT, we believe that education is not just about imparting knowledge, but about shaping future leaders who will drive technological advancement and social progress. Our commitment extends beyond traditional classroom learning to encompass research, innovation, and industry collaboration.',
			'We have consistently maintained our focus on providing world-class infrastructure, distinguished faculty, and an environment that encourages creativity and critical thinking. Our NBA accreditation and strong industry partnerships are testament to our unwavering commitment to quality education.',
			'As we move forward, we remain dedicated to our mission of producing competent engineers who are not only technically proficient but also ethically grounded and socially responsible. I encourage all our students to make the most of the opportunities available at BPIT and emerge as leaders in their chosen fields.'
		],
		more: [
			'Our commitment to excellence is reflected in our state-of-the-art facilities, experienced faculty, and industry-relevant curriculum that prepares students for global challenges.',
			'We continue to strengthen our industry partnerships and research initiatives to provide our students with the best possible educational experience and career opportunities.'
		],
		signature: {
			name: 'Dr. [Chairman Name]',
			role: 'Chairman, BPIT'
		}
	};

	const principalMessageComponent = {
		header: {
			title: "Principal's Message",
			subtitle: 'Leading Academic Excellence and Innovation'
		},
		introQuote: '"Dear Students and Academic Community,"',
		paragraphs: [
			'Welcome to BPIT, where academic excellence meets innovation. As the Principal, I am proud to lead an institution that has consistently set benchmarks in engineering education and has produced thousands of successful professionals who are making significant contributions to the industry and society.',
			'Our institution stands on the pillars of quality education, research excellence, and industry relevance. We have carefully designed our curriculum to bridge the gap between theoretical knowledge and practical application, ensuring our graduates are industry-ready from day one.',
			'The faculty at BPIT comprises experienced academics and industry professionals who bring diverse perspectives to the classroom. Our state-of-the-art laboratories, modern infrastructure, and rich library resources provide the perfect environment for learning and research.',
			'We encourage our students to participate in various co-curricular and extra-curricular activities, technical competitions, and research projects. These experiences not only enhance their technical skills but also develop their leadership qualities, teamwork abilities, and communication skills.',
			'I invite you to be part of our vibrant academic community where innovation thrives, dreams take shape, and future leaders are nurtured. Together, let us continue to uphold the values of excellence, integrity, and service that define BPIT.'
		],
		more: [
			'Our commitment to excellence extends beyond the classroom to industry partnerships, research collaborations, and community service initiatives.',
			'We continuously evolve our programs to meet the changing demands of the technology industry while maintaining our core values of integrity and academic rigor.'
		],
		cards: {
			academicLeadership: {
				title: 'Academic Leadership',
				description: 'Guiding curriculum development and maintaining academic standards.'
			},
			strategicVision: {
				title: 'Strategic Vision',
				description: 'Developing long-term strategies for institutional growth and excellence.'
			},
			studentMentorship: {
				title: 'Student Mentorship',
				description: 'Fostering student development and career guidance.'
			}
		},
		signature: {
			name: 'Prof. [Principal Name]',
			role: 'Principal, BPIT'
		}
	};

	const founderTributeComponent = {
		header: {
			title: 'In Memory of Our Visionary Founder',
			subtitle: 'Bhagwan Parshuram - The Divine Inspiration'
		},
		paragraphs: [
			'Our institution draws its name and inspiration from Bhagwan Parshuram, the sixth avatar of Lord Vishnu, known for his unwavering dedication to righteousness and excellence. Just as Bhagwan Parshuram was a master of all sciences and arts, our institute strives to create well-rounded engineers who excel in both technical and human values.'
		],
		quote: '"Education is the most powerful weapon which you can use to change the world. Let us honor our founder\'s vision by pursuing knowledge with dedication and righteousness."',
		more: [
			'The values of discipline, dedication, and excellence that Bhagwan Parshuram embodied continue to guide our educational philosophy. We believe in nurturing not just skilled professionals, but ethical leaders who will contribute positively to society.'
		],
		coreValues: [
			'Righteousness and Integrity',
			'Excellence in Education',
			'Dedication to Knowledge',
			'Service to Society'
		],
		commitments: [
			'Holistic Development',
			'Ethical Leadership',
			'Innovation & Research',
			'Global Competence'
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

	// Seed additional pages for chairman-message, principal-message, and founder-tribute
	const additionalPages = [
		{
			slug: 'chairman-message',
			title: "Chairman's Message",
			component: {
				key: 'CHAIRMAN_MESSAGE',
				order: 1,
				data: chairmanMessageComponent
			}
		},
		{
			slug: 'principal-message',
			title: "Principal's Message",
			component: {
				key: 'PRINCIPAL_MESSAGE',
				order: 1,
				data: principalMessageComponent
			}
		},
		{
			slug: 'founder-tribute',
			title: 'Founder Tribute',
			component: {
				key: 'FOUNDER_TRIBUTE',
				order: 1,
				data: founderTributeComponent
			}
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

	// Seed additional pages
	for (const additionalPage of additionalPages) {
		const page = await prisma.page.upsert({
			where: { slug: additionalPage.slug },
			update: {},
			create: {
				slug: additionalPage.slug,
				title: additionalPage.title,
				kind: 'PAGE',
				status: 'PUBLISHED',
				metadata: { seeded: true }
			}
		});

		await prisma.component.deleteMany({ where: { pageId: page.id } });

		await prisma.component.create({
			data: {
				pageId: page.id,
				key: additionalPage.component.key,
				order: additionalPage.component.order,
				data: additionalPage.component.data
			}
		});
	}

	console.log(
		`Seeded About page with slug "${pageSlug}" and ${components.length} components.`
	);
	console.log(
		`Seeded ${additionalPages.length} additional pages: ${additionalPages.map(p => p.slug).join(', ')}.`
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
