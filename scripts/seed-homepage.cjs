/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	const pageSlug = 'main';

	// 1) Upsert the homepage Page
	const page = await prisma.page.upsert({
		where: { slug: pageSlug },
		update: {},
		create: {
			slug: pageSlug,
			title: 'Homepage',
			kind: 'PAGE',
			status: 'PUBLISHED',
			metadata: { seeded: true }
		}
	});

	const headerAnnouncementsItems = [
		{
			title: 'Admission 2024-25 Session Open - Apply Now',
			href: '/admissions/apply'
		},
		{
			title: 'Placement Drive 2024 - Register Today',
			href: '/placements/register'
		},
		{
			title: 'Annual Tech Fest "INNOVATE 2024" - March 15-17',
			href: '/events/tech-fest'
		},
		{
			title: 'Library New Books Collection Available',
			href: '/academia/library'
		},
		{
			title: 'Scholarship Applications Open - Merit & Need Based',
			href: '/admissions/scholarship'
		}
	];

	const heroSlides = [
		{
			title: 'Welcome to BPIT',
			subtitle: "Shaping Tomorrow's Innovators",
			description:
				'A Unit of Bhartiya Brahmin Charitable Trust (Regd.).\n(Approved by AICTE, Ministry of Education (MoE))\nAffiliated to Guru Gobind Singh Indraprastha University, Delhi',
			image:
				'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
			icon: 'Award',
			stats: 'NBA Accredited Institution',
			cta: { label: 'Apply Now', isEnquiry: true },
			secondary_cta: { label: 'Explore Programs', href: '/admissions' }
		},
		{
			title: 'Engineering Excellence',
			subtitle: 'NBA Accredited Programs',
			description:
				"Discover our world-class engineering programs in Computer Science, Information Technology, Electronics, and Electrical Engineering designed to shape tomorrow's innovators.",
			image:
				'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
			icon: 'BookOpen',
			stats: '1000+ Students',
			cta: { label: 'View Programs', href: '/departments' }
		},
		{
			title: 'Campus Life',
			subtitle: 'Beyond Academics',
			description:
				'Experience vibrant campus life with hostels, sports complexes, and dozens of clubs and societies that nurture holistic development.',
			image:
				'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
			icon: 'Users',
			stats: '50+ Clubs',
			cta: { label: 'Student Life', href: '/student-life' }
		},
		{
			title: 'Placement Success',
			subtitle: 'Industry Ready',
			description:
				'Join our alumni network working at top companies like Amazon, Microsoft, and Google with dedicated placement support.',
			image:
				'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',
			icon: 'Trophy',
			stats: '100% Placement Assistance',
			cta: { label: 'View Placements', href: '/placements/overview' }
		},
		{
			title: 'Modern Infrastructure',
			subtitle: 'Learning Environment',
			description:
				'Study in smart classrooms, well-equipped labs, digital libraries, and modern campus facilities designed for excellence.',
			image:
				'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
			icon: 'Building',
			stats: 'State-of-the-art Facilities',
			cta: { label: 'About BPIT', href: '/about' }
		}
	];

	const noticesAndAnnouncements = {
		notices: [
			{
				id: 1,
				category: 'Academic',
				title: 'Mid-semester examination schedule released',
				subtitle: 'Check your exam dates and prepare accordingly',
				date: '2024-12-28',
				time: '10:00 AM',
				image: '/events/img1.png',
				priority: 'high',
				tags: ['Exam', 'Schedule', 'Important'],
				description:
					'The mid-semester examination schedule has been released. Students are advised to check their individual exam timetables and prepare accordingly.',
				views: 1250,
				pinned: true,
				urgent: true
			}
		],
		announcements: [
			{
				id: 1,
				category: 'Innovation',
				title: 'Institute Innovation Council (IIC) Meeting',
				subtitle: 'Monthly innovation council update',
				date: '2024-12-24',
				time: '1:30 PM',
				image: '/events/img1.png',
				priority: 'high',
				tags: ['Innovation', 'Council', 'Meeting'],
				description:
					'Monthly meeting of the Institute Innovation Council to discuss ongoing projects and future initiatives.',
				views: 450,
				pinned: true,
				urgent: false
			}
		]
	};

	const eventsSection = {
		events: [
			{
				id: 1,
				title: 'BPIT TechFest 2024',
				subtitle: 'Innovation Summit & Tech Showcase',
				description:
					'Join us for the most spectacular tech festival featuring AI/ML workshops, robotics competitions, startup showcases, and industry expert keynotes.',
				image: '/events/img1.png',
				date: '2024-03-15',
				time: '9:00 AM - 8:00 PM',
				location: 'BPIT Main Auditorium',
				category: 'Technology',
				attendees: 1200,
				featured: true,
				status: 'upcoming',
				tags: ['AI/ML', 'Robotics', 'Startups', 'Innovation'],
				organizer: 'Technical Society BPIT',
				registrationOpen: true,
				price: 'Free',
				highlights: ['Industry Leaders', '48+ Hours', '₹50K+ Prizes'],
				rating: 4.9,
				totalRatings: 847
			}
		]
	};

	const placementsSection = {
		title: 'Our Placement Partners',
		subtitle:
			'Leading companies trust BPIT graduates for their innovation, technical expertise, and professional excellence',
		companies: [
			{ name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
			{ name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
			{ name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' }
		],
		statistics: [
			{ value: '100+', label: 'Partner Companies' },
			{ value: '95%', label: 'Placement Rate' },
			{ value: '12 LPA', label: 'Highest Package' },
			{ value: '6.5 LPA', label: 'Average Package' }
		]
	};

	const topPlacedStudentsSection = {
		title: 'Our Top Placed Students',
		subtitle:
			'Meet the bright minds from BPIT who secured exceptional packages at top-tier companies worldwide',
		students: [
			{
				id: 1,
				name: 'Priya Sharma',
				company: 'Google',
				package: '45 LPA',
				branch: 'Computer Science',
				year: '2024',
				image:
					'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop&crop=face',
				companyLogo: 'https://logo.clearbit.com/google.com'
			}
		],
		statistics: [
			{ value: '45 LPA', label: 'Highest Package' },
			{ value: '15+', label: 'Dream Offers' },
			{ value: '50+', label: 'Top Companies' },
			{ value: '98%', label: 'Success Rate' }
		]
	};

	const testimonialsSection = {
		title: 'Voices of Excellence',
		subtitle:
			'Hear from our students and alumni about their transformative journey at BPIT and how it shaped their successful careers.',
		testimonials: [
			{
				id: 1,
				name: 'Arjun Sharma',
				batch: 'B.Tech CSE 2024',
				company: 'Microsoft',
				position: 'Software Engineer',
				image:
					'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
				video:
					'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
				testimonial:
					"BPIT transformed my career. The faculty's guidance and modern infrastructure helped me secure my dream job at Microsoft. The coding culture here is exceptional.",
				rating: 5,
				achievement: 'Placed at Microsoft with 18 LPA package',
				tags: ['Coding', 'Placements', 'Faculty']
			}
		]
	};

	// 4) Insert components in order
	const components = [
		{
			key: 'HEADER_ANNOUNCEMENTS',
			order: 1,
			data: { items: headerAnnouncementsItems }
		},
		{ key: 'HERO', order: 2, data: { slides: heroSlides } },
		{ key: 'NOTICES_SECTION', order: 3, data: noticesAndAnnouncements },
		{ key: 'EVENTS_SECTION', order: 4, data: eventsSection },
		{ key: 'PLACEMENTS', order: 5, data: placementsSection },
		{ key: 'TOP_PLACED_STUDENTS', order: 6, data: topPlacedStudentsSection },
		{ key: 'TESTIMONIALS', order: 7, data: testimonialsSection }
	];

	for (const c of components) {
		await prisma.component.create({
			data: {
				pageId: page.id,
				key: c.key,
				order: c.order,
				data: c.data
			}
		});
	}

	console.log(
		`Seeded homepage with slug "${pageSlug}" and ${components.length} components.`
	);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
