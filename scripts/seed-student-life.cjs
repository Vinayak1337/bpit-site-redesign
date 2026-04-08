const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const studentLifeHeroData = {
	title: 'Student Life',
	subtitle:
		'Experience a vibrant campus life with endless opportunities for growth.',
	backgroundImage: null,
	gradient: 'from-blue-600 to-purple-600'
};

const overviewData = {
	title: 'Experience Life at BPIT',
	description:
		'At Bhagwan Parshuram Institute of Technology, education goes beyond the classroom. We foster an environment where innovation meets creativity, and students are encouraged to explore their interests, develop leadership skills, and build lifelong friendships.',
	highlights: [
		{
			title: 'Campus Facilities',
			description:
				'Explore our modern infrastructure, labs, library, and recreational areas designed for your growth.',
			icon: 'Building2',
			href: '/student-life/campus-facilities'
		},
		{
			title: 'Clubs & Societies',
			description:
				'Join our technical, cultural, and literary societies to hone your skills and pursue your passions.',
			icon: 'Users',
			href: '/student-life/clubs-and-societies'
		},
		{
			title: 'Events & Festivals',
			description:
				'Participate in our annual techno-cultural fests, sports meets, and workshops.',
			icon: 'Calendar',
			href: '/student-life/events-and-festivals'
		},
		{
			title: 'Student Grievance',
			description:
				'A dedicated cell to address student concerns and ensure a safe, supportive environment.',
			icon: 'Shield',
			href: '/student-life/student-grievance-cell'
		},
		{
			title: 'Code of Conduct',
			description:
				'Understand the rules and regulations that maintain discipline and harmony on campus.',
			icon: 'BookOpen',
			href: '/student-life/code-of-conduct'
		}
	]
};

const facilitiesData = {
	title: 'Campus Facilities',
	description:
		'BPIT offers a conducive environment for learning and personal growth with its modern infrastructure and comprehensive facilities.',
	sections: [
		{
			title: 'Academic Infrastructure',
			items: [
				{
					title: 'Smart Classrooms',
					description:
						'Air-conditioned classrooms equipped with interactive whiteboards, projectors, and modern seating arrangements to facilitate an engaging learning environment.',
					icon: 'Building2',
					features: [
						'Interactive Whiteboards',
						'HD Projectors',
						'Audio Systems',
						'Climate Control'
					],
					image: '/events/img2.png'
				},
				{
					title: 'Advanced Laboratories',
					description:
						'State-of-the-art laboratories for Computer Science, Electronics, Mechanical, and Civil Engineering, featuring the latest equipment for practical learning.',
					icon: 'Monitor',
					features: [
						'Latest Equipment',
						'Safety Protocols',
						'Research Facilities',
						'24/7 Access'
					],
					image: '/events/img1.png'
				},
				{
					title: 'Central Library',
					description:
						'A vast collection of books, journals, and digital resources housed in a modern facility with quiet study areas and digital access points.',
					icon: 'BookOpen',
					features: [
						'50,000+ Books',
						'Digital Library',
						'Study Halls',
						'Research Journals'
					],
					image: '/events/img2.png'
				},
				{
					title: 'Computer Centers',
					description:
						'High-performance computing labs with the latest software and hardware configurations to support programming, design, and research activities.',
					icon: 'Monitor',
					features: [
						'Latest Software',
						'High-end Hardware',
						'High Speed Internet',
						'Technical Support'
					],
					image: '/events/img1.png'
				}
			]
		},
		{
			title: 'Residential & Dining',
			items: [
				{
					title: 'Hostels',
					description:
						'Separate hostels for boys and girls providing comfortable accommodation with essential amenities, security, and a homely atmosphere.',
					icon: 'Home',
					features: [
						'AC Rooms Available',
						'Wi-Fi',
						'24/7 Security',
						'Common Rooms'
					],
					image: '/events/img2.png'
				},
				{
					title: 'Main Cafeteria',
					description:
						'A spacious dining hall serving nutritious and hygienic meals with a variety of cuisine options at affordable prices.',
					icon: 'Utensils',
					features: [
						'Multi-cuisine',
						'Hygienic Preparation',
						'Affordable Prices',
						'Spacious Seating'
					],
					image: '/events/img2.png'
				},
				{
					title: 'Coffee Shop',
					description:
						'A cozy spot for students to relax, discuss projects, or grab a quick snack and coffee between classes.',
					icon: 'Coffee',
					features: ['Fresh Coffee', 'Snacks', 'Casual Seating', 'Wi-Fi'],
					image: '/events/img1.png'
				}
			]
		},
		{
			title: 'Recreation & Support',
			items: [
				{
					title: 'Sports Complex',
					description:
						'Facilities for various sports including cricket, basketball, tennis, and indoor games to promote physical fitness and team spirit.',
					icon: 'TreePine',
					features: [
						'Cricket Ground',
						'Basketball Court',
						'Tennis Court',
						'Indoor Games'
					],
					image: '/events/img2.png'
				},
				{
					title: 'Fitness Center',
					description:
						'A well-equipped gymnasium with modern exercise machines and guidance for students to maintain their health and fitness.',
					icon: 'Dumbbell',
					features: [
						'Modern Equipment',
						'Trainers',
						'Cardio Zone',
						'Weight Training'
					],
					image: '/events/img1.png'
				},
				{
					title: 'Medical Center',
					description:
						'On-campus medical support with qualified staff to handle emergencies and provide routine health checkups.',
					icon: 'Heart',
					features: [
						'Qualified Doctor',
						'First Aid',
						'Emergency Care',
						'Health Checkups'
					],
					image: '/events/img2.png'
				},
				{
					title: 'Transportation',
					description:
						'A fleet of buses connecting the campus to major parts of Delhi NCR, ensuring safe and convenient commuting for students.',
					icon: 'Car',
					features: [
						'Multiple Routes',
						'GPS Tracking',
						'Safe Travel',
						'Regular Schedule'
					],
					image: '/events/img1.png'
				},
				{
					title: 'Wi-Fi Campus',
					description:
						'High-speed internet connectivity available throughout the campus, including classrooms, labs, library, and hostels.',
					icon: 'Wifi',
					features: [
						'High Speed',
						'Campus-wide Coverage',
						'Secure Network',
						'24/7 Availability'
					],
					image: '/events/img2.png'
				}
			]
		}
	]
};

const clubsData = {
	title: 'Clubs & Societies',
	description:
		'Student life at BPIT is vibrant and diverse. Join our clubs to pursue your hobbies, build leadership skills, and make lifelong friends.',
	categories: [
		{
			title: 'Technical Societies',
			description:
				'Enhance your technical skills, participate in hackathons, and work on innovative projects.',
			clubs: [
				{
					name: 'Coding Club',
					description:
						'A community for programming enthusiasts to learn algorithms, development, and compete in coding contests.',
					icon: 'Code',
					activities: ['Hackathons', 'Workshops', 'Coding Contests'],
					image: '/events/img2.png'
				},
				{
					name: 'IEEE Student Branch',
					description:
						'Part of the global IEEE network, focusing on advancing technology for humanity through seminars and projects.',
					icon: 'Zap',
					activities: [
						'Technical Seminars',
						'Project Exhibitions',
						'Networking'
					],
					image: '/events/img1.png'
				},
				{
					name: 'Robotics Club',
					description:
						'Design and build robots, participate in competitions, and learn about automation and control systems.',
					icon: 'Zap',
					activities: ['Robot Building', 'Competitions', 'Workshops'],
					image: '/events/img2.png'
				},
				{
					name: 'Cybersecurity Club',
					description:
						'Learn about network security, ethical hacking, and digital defense mechanisms.',
					icon: 'Target',
					activities: ['CTF Competitions', 'Security Audits', 'Workshops'],
					image: '/events/img1.png'
				}
			]
		},
		{
			title: 'Cultural Societies',
			description:
				'Express your creativity and talent through music, dance, drama, and art.',
			clubs: [
				{
					name: 'Music Society',
					description:
						'For vocalists and instrumentalists to perform and collaborate on musical pieces.',
					icon: 'Music',
					activities: ['Performances', 'Jam Sessions', 'Competitions'],
					image: '/events/img2.png'
				},
				{
					name: 'Dance Society',
					description:
						'Celebrating various dance forms from classical to contemporary and western.',
					icon: 'Users',
					activities: ['Stage Shows', 'Flash Mobs', 'Workshops'],
					image: '/events/img1.png'
				},
				{
					name: 'Drama Society',
					description:
						'A platform for theater enthusiasts to write, direct, and act in plays and street plays (Nukkad Natak).',
					icon: 'Mic',
					activities: ['Stage Plays', 'Street Plays', 'Script Writing'],
					image: '/events/img2.png'
				},
				{
					name: 'Fine Arts Club',
					description:
						'For those who love painting, sketching, and crafting. Decorating the campus during fests.',
					icon: 'Palette',
					activities: ['Art Exhibitions', 'Decoration', 'Workshops'],
					image: '/events/img1.png'
				}
			]
		},
		{
			title: 'Literary & Media',
			description:
				'Foster communication skills, creative writing, and media presence.',
			clubs: [
				{
					name: 'Literary Society',
					description:
						'Promoting love for literature through debates, poetry, and creative writing sessions.',
					icon: 'BookOpen',
					activities: ['Debates', 'Poetry Recitation', 'Creative Writing'],
					image: '/events/img1.png'
				},
				{
					name: 'Photography Club',
					description:
						'Capturing moments and memories of college life and events.',
					icon: 'Camera',
					activities: ['Photo Walks', 'Event Coverage', 'Exhibitions'],
					image: '/events/img2.png'
				}
			]
		},
		{
			title: 'Social Service',
			description:
				'Contributing to society and instilling values of service and empathy.',
			clubs: [
				{
					name: 'NSS (National Service Scheme)',
					description:
						'Engaging in community service activities like cleanliness drives, blood donation, and rural development.',
					icon: 'Heart',
					activities: [
						'Blood Donation',
						'Cleanliness Drives',
						'Social Awareness'
					],
					image: '/events/img1.png'
				}
			]
		}
	]
};

const eventsData = {
	title: 'Events & Festivals',
	description:
		"BPIT's calendar is packed with events that provide platforms for showcasing talent, learning new skills, and celebrating the spirit of youth.",
	events: [
		{
			title: 'Annual Cultural Fest',
			type: 'Cultural',
			description:
				'The flagship cultural event of BPIT, featuring inter-college competitions in dance, music, drama, and fashion. It concludes with a star night featuring renowned artists.',
			icon: 'Music',
			month: 'February/March',
			highlights: [
				'Star Night',
				'Battle of Bands',
				'Fashion Show',
				'Dance Competitions'
			],
			image: '/events/img3.png'
		},
		{
			title: 'Technical Fest',
			type: 'Technical',
			description:
				'A showcase of technical prowess where students participate in hackathons, robotics competitions, coding challenges, and project exhibitions.',
			icon: 'Code',
			month: 'October/November',
			highlights: ['Hackathons', 'RoboWars', 'Coding Marathons', 'Tech Talks'],
			image: '/events/img2.png'
		},
		{
			title: 'Sports Meet',
			type: 'Sports',
			description:
				'An annual sports extravaganza fostering team spirit and fitness. Inter-departmental and inter-college matches in cricket, football, basketball, and more.',
			icon: 'Trophy',
			month: 'January',
			highlights: [
				'Cricket Tournament',
				'Athletics',
				'Basketball',
				'Indoor Games'
			],
			image: '/events/img1.png'
		},
		{
			title: 'TedX BPIT',
			type: 'Conference',
			description:
				'An independently organized TED event where speakers from diverse fields share ideas worth spreading, inspiring the student community.',
			icon: 'Mic',
			month: 'Variable',
			highlights: ['Inspiring Talks', 'Networking', 'Innovative Ideas'],
			image: '/events/img1.png'
		},
		{
			title: 'Orientation Day',
			type: 'Academic',
			description:
				'Welcoming the new batch of students, introducing them to the college culture, faculty, and facilities.',
			icon: 'Calendar',
			month: 'August',
			highlights: ['Campus Tour', 'Faculty Introduction', 'Cultural Program'],
			image: '/events/img2.png'
		}
	]
};

const grievanceData = {
	title: 'Student Grievance Cell',
	description:
		'BPIT is committed to providing a safe, fair, and harmonious learning environment. The Student Grievance Cell addresses student concerns and ensures transparency and accountability.',
	contactInfo: [
		{
			title: 'Phone Support',
			icon: 'Phone',
			details: ['011-27571080', '011-27572900'],
			sub: 'Available during office hours'
		},
		{
			title: 'Email Support',
			icon: 'Mail',
			details: ['grievance@bpitindia.com'],
			sub: 'Response within 24-48 hours'
		},
		{
			title: 'Office Location',
			icon: 'MapPin',
			details: ['Admin Block, Ground Floor'],
			sub: 'Mon-Fri: 9:00 AM - 5:00 PM'
		}
	],
	processSteps: [
		{
			step: 1,
			title: 'Submission',
			description:
				'Submit your grievance through the online portal, email, or in person at the grievance cell office.'
		},
		{
			step: 2,
			title: 'Acknowledgement',
			description:
				'You will receive an acknowledgement receipt with a tracking number for your complaint.'
		},
		{
			step: 3,
			title: 'Review & Investigation',
			description:
				'The committee reviews the complaint and conducts a fair investigation into the matter.'
		},
		{
			step: 4,
			title: 'Resolution',
			description:
				'Appropriate action is taken, and the resolution is communicated to the student.'
		}
	]
};

const conductData = {
	title: 'Code of Conduct',
	description:
		'To ensure a disciplined and conducive learning environment, all students are required to abide by the following code of conduct.',
	sections: [
		{
			category: 'Academic Integrity',
			icon: 'BookOpen',
			rules: [
				'Students must maintain high standards of academic honesty. Plagiarism, cheating in examinations, and unauthorized collaboration are strictly prohibited.',
				'Attendance in classes, labs, and tutorials is compulsory. A minimum of 75% attendance is required to appear in end-term examinations.',
				'Assignments and projects must be submitted on time. Late submissions may attract penalties.'
			]
		},
		{
			category: 'Campus Conduct',
			icon: 'Users',
			rules: [
				'Students are expected to dress modestly and appropriately while on campus.',
				'Use of mobile phones in classrooms, labs, and libraries is restricted.',
				'Loitering in corridors and creating noise during class hours is prohibited.',
				'Smoking, consumption of alcohol, and use of drugs are strictly banned on campus.'
			]
		},
		{
			category: 'Use of Facilities',
			icon: 'Shield',
			rules: [
				'College property must be used with care. Any damage to furniture, equipment, or infrastructure will be liable for fines.',
				'Library books must be returned on time. Silence must be maintained in the library.',
				'Computer lab resources are for academic use only. Misuse of internet or software is punishable.'
			]
		},
		{
			category: 'Disciplinary Action',
			icon: 'AlertCircle',
			rules: [
				"Any act of indiscipline, ragging, or misconduct will be dealt with severely as per the institute's regulations.",
				"The Disciplinary Committee's decision in matters of student misconduct will be final.",
				'Students involved in ragging may face suspension or expulsion and legal action.'
			]
		}
	]
};

async function seedComponent(pageId, key, data, order) {
	await prisma.component.upsert({
		where: {
			pageId_order: {
				pageId: pageId,
				order: order
			}
		},
		update: {
			data: data,
			key: key
		},
		create: {
			pageId: pageId,
			data: data,
			order: order,
			key: key
		}
	});
}

async function seedPage(slug, title, components) {
	console.log(`🌱 Seeding ${title} data...`);
	let page = await prisma.page.findUnique({ where: { slug } });

	if (!page) {
		page = await prisma.page.create({
			data: {
				slug: slug,
				title: title,
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});
	}

	for (const comp of components) {
		await seedComponent(page.id, comp.key, comp.data, comp.order);
	}
	console.log(`✅ ${title} data seeded successfully`);
}

async function seedStudentLife() {
	try {
		// Main Student Life Page
		await seedPage('student-life', 'Student Life', [
			{ key: 'HERO', data: studentLifeHeroData, order: 0 },
			{ key: 'OVERVIEW', data: overviewData, order: 1 }
		]);

		// Campus Facilities
		await seedPage('student-life-campus-facilities', 'Campus Facilities', [
			{
				key: 'HERO',
				data: {
					title: 'Campus Facilities',
					subtitle: 'Modern infrastructure for holistic growth',
					backgroundImage: null
				},
				order: 0
			},
			{ key: 'FACILITIES', data: facilitiesData, order: 1 }
		]);

		// Clubs & Societies
		await seedPage('student-life-clubs-and-societies', 'Clubs & Societies', [
			{
				key: 'HERO',
				data: {
					title: 'Clubs & Societies',
					subtitle: 'Pursue your passions beyond academics',
					backgroundImage: null
				},
				order: 0
			},
			{ key: 'CLUBS', data: clubsData, order: 1 }
		]);

		// Events & Festivals
		await seedPage('student-life-events-and-festivals', 'Events & Festivals', [
			{
				key: 'HERO',
				data: {
					title: 'Events & Festivals',
					subtitle: 'Celebrating talent and creativity',
					backgroundImage: null
				},
				order: 0
			},
			{ key: 'EVENTS', data: eventsData, order: 1 }
		]);

		// Grievance Cell
		await seedPage(
			'student-life-student-grievance-cell',
			'Student Grievance Cell',
			[
				{
					key: 'HERO',
					data: {
						title: 'Student Grievance Cell',
						subtitle: 'We are here to listen and resolve',
						backgroundImage: null
					},
					order: 0
				},
				{ key: 'GRIEVANCE', data: grievanceData, order: 1 }
			]
		);

		// Code of Conduct
		await seedPage('student-life-code-of-conduct', 'Code of Conduct', [
			{
				key: 'HERO',
				data: {
					title: 'Code of Conduct',
					subtitle: 'Maintaining discipline and harmony',
					backgroundImage: null
				},
				order: 0
			},
			{ key: 'CONDUCT', data: conductData, order: 1 }
		]);
	} catch (error) {
		console.error('❌ Error seeding Student Life data:', error);
		throw error;
	}
}

async function main() {
	await seedStudentLife();
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
