export const homeHeroData = {
	mainTitle: 'Engineering Excellence',
	subTitle: "Shaping Tomorrow's Innovators",
	institutionName: 'Bhagwan Parshuram Institute of Technology',
	unitInfo: 'A Unit of Bhartiya Brahmin Charitable Trust (Regd.)',
	approvalInfo: '(Approved by AICTE, Ministry of Education (MoE))',
	affiliationInfo:
		'Affiliated to Guru Gobind Singh Indraprastha University, Delhi',
	nbaAccredited: true,
	highlights: [
		'Industry-Aligned Curriculum',
		'Expert Faculty & Research',
		'Innovation & Entrepreneurship Hub',
		'Modern Labs & Smart Campus'
	],
	buttons: [
		{
			text: 'Apply Now',
			type: 'primary' as const,
			action: 'openEnquiry'
		},
		{
			text: 'Explore Programs',
			type: 'outline' as const,
			action: 'explorePrograms'
		}
	]
};

export const homeHero2Data = {
	slides: [
		{
			title: 'Engineering Excellence',
			subtitle: 'NBA Accredited Programs',
			description:
				"Discover our world-class engineering programs in Computer Science, Information Technology, Electronics, and Electrical Engineering designed to shape tomorrow's innovators.",
			image:
				'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
			icon: 'BookOpen',
			stats: '1000+ Students',
			cta: {
				label: 'Learn More',
				href: '/admissions'
			}
		},
		{
			title: 'Campus Life',
			subtitle: 'Beyond Academics',
			description:
				'Experience vibrant campus life with state-of-the-art facilities, hostels, sports complexes, and numerous clubs and societies that nurture holistic development.',
			image:
				'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
			icon: 'Users',
			stats: '50+ Clubs'
		},
		{
			title: 'Placement Success',
			subtitle: 'Industry Ready',
			description:
				'Join our alumni network working at top companies like Amazon, Microsoft, and Google. Our dedicated placement cell ensures 100% placement assistance.',
			image:
				'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',
			icon: 'Trophy',
			stats: '100% Placement'
		},
		{
			title: 'Modern Infrastructure',
			subtitle: 'Learning Environment',
			description:
				'Study in modern classrooms, well-equipped laboratories, digital libraries, and smart campus facilities that provide the perfect environment for learning.',
			image:
				'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
			icon: 'Building',
			stats: 'Modern Facilities'
		}
	]
};

export const homeNoticesData: NoticesSectionData = {
	notices: [
		{
			id: 1,
			category: 'Academic' as const,
			title: 'Mid-semester examination schedule released',
			subtitle: 'Check your exam dates and prepare accordingly',
			date: '2024-12-28',
			time: '10:00 AM',
			image: '/events/img1.png',
			priority: 'high' as const,
			tags: ['Exam', 'Schedule', 'Important'],
			description:
				'The mid-semester examination schedule has been released. Students are advised to check their individual exam timetables and prepare accordingly.',
			views: 1250,
			pinned: true,
			urgent: true
		},
		{
			id: 2,
			category: 'Financial Aid' as const,
			title: 'Education loans available through PM Vidya Laxmi scheme',
			subtitle: 'Apply now for financial assistance',
			date: '2024-12-25',
			time: '2:30 PM',
			image: '/events/img2.png',
			priority: 'medium' as const,
			tags: ['Scholarship', 'Finance', 'Government'],
			description:
				'Students can now apply for education loans through the PM Vidya Laxmi scheme. Eligible students can receive financial assistance for their studies.',
			views: 890,
			pinned: false,
			urgent: false
		},
		{
			id: 3,
			category: 'Admission' as const,
			title: 'Last date for semester registration extended',
			subtitle: 'Extended deadline for course registration',
			date: '2024-12-24',
			time: '5:00 PM',
			image: '/events/img1.png',
			priority: 'high' as const,
			tags: ['Registration', 'Deadline', 'Extension'],
			description:
				'The deadline for semester registration has been extended by one week. Students who have not yet registered are advised to complete the process immediately.',
			views: 2100,
			pinned: true,
			urgent: true
		}
	],
	announcements: [
		{
			id: 1,
			category: 'Innovation' as const,
			title: 'Institute Innovation Council (IIC) Meeting',
			subtitle: 'Monthly innovation council update',
			date: '2024-12-24',
			time: '1:30 PM',
			image: '/events/img1.png',
			priority: 'high' as const,
			tags: ['Innovation', 'Council', 'Meeting'],
			description:
				'Monthly meeting of the Institute Innovation Council to discuss ongoing projects and future initiatives.',
			views: 450,
			pinned: true,
			urgent: false
		},
		{
			id: 2,
			category: 'Sports' as const,
			title: 'Inter-college basketball tournament registration',
			subtitle: 'Register your team now',
			date: '2024-12-23',
			time: '4:00 PM',
			image: '/events/img2.png',
			priority: 'medium' as const,
			tags: ['Sports', 'Tournament', 'Basketball'],
			description:
				'Registration is now open for the inter-college basketball tournament. Teams must register before the deadline.',
			views: 620,
			pinned: false,
			urgent: false
		},
		{
			id: 3,
			category: 'Admission' as const,
			title: 'Last date for semester registration extended',
			subtitle: 'Extended deadline for course registration',
			date: '2024-12-24',
			time: '5:00 PM',
			image: '/events/img1.png',
			priority: 'high' as const,
			tags: ['Registration', 'Deadline', 'Extension'],
			description:
				'The deadline for semester registration has been extended by one week. Students who have not yet registered are advised to complete the process immediately.',
			views: 2100,
			pinned: true,
			urgent: true
		}
	]
};

export const homeEventsData: { events: EventItem[] } = {
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
		},
		{
			id: 2,
			title: 'Industry Connect 2024',
			subtitle: 'Career Guidance & Networking',
			description:
				'Exclusive networking event with senior engineers from FAANG companies sharing career insights, technical guidance, and placement strategies.',
			image: '/events/img2.png',
			date: '2024-03-22',
			time: '2:00 PM - 7:00 PM',
			location: 'Conference Hall Complex',
			category: 'Professional',
			attendees: 450,
			featured: true,
			status: 'upcoming',
			tags: ['FAANG', 'Career', 'Networking', 'Placement'],
			organizer: 'Training & Placement Cell',
			registrationOpen: true,
			price: '₹199',
			highlights: ['FAANG Engineers', 'Live Q&A', 'Job Referrals'],
			rating: 4.8,
			totalRatings: 623
		},
		{
			id: 3,
			title: 'Sanskriti Cultural Fest',
			subtitle: 'Celebrating Arts & Heritage',
			description:
				'Experience the vibrant tapestry of Indian culture through music, dance, drama, art exhibitions, and traditional performances.',
			image: '/events/img3.png',
			date: '2024-04-05',
			time: '6:00 PM - 11:00 PM',
			location: 'Open Air Theatre',
			category: 'Cultural',
			attendees: 1500,
			featured: false,
			status: 'upcoming',
			tags: ['Music', 'Dance', 'Art', 'Heritage'],
			organizer: 'Cultural Committee',
			registrationOpen: true,
			price: 'Free',
			highlights: ['Live Performances', '15+ Events', 'Celebrity Guest'],
			rating: 4.7,
			totalRatings: 1024
		}
	]
};

export const homePlacementData = {
	title: 'Our Placement Partners',
	subtitle:
		'Leading companies trust BPIT graduates for their innovation, technical expertise, and professional excellence',
	companies: [
		{ name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
		{ name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
		{ name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
		{ name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
		{ name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
		{ name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
		{ name: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
		{ name: 'Accenture', logo: 'https://logo.clearbit.com/accenture.com' },
		{ name: 'Dell', logo: 'https://logo.clearbit.com/dell.com' },
		{ name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com' },
		{ name: 'Adobe', logo: 'https://logo.clearbit.com/adobe.com' },
		{ name: 'Cisco', logo: 'https://logo.clearbit.com/cisco.com' }
	],
	statistics: [
		{ value: '100+', label: 'Partner Companies' },
		{ value: '95%', label: 'Placement Rate' },
		{ value: '12 LPA', label: 'Highest Package' },
		{ value: '6.5 LPA', label: 'Average Package' }
	]
};

export const homeTopPlacedStudentsData = {
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
		},
		{
			id: 2,
			name: 'Arjun Gupta',
			company: 'Microsoft',
			package: '42 LPA',
			branch: 'Information Technology',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/microsoft.com'
		},
		{
			id: 3,
			name: 'Sneha Patel',
			company: 'Amazon',
			package: '38 LPA',
			branch: 'Computer Science',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/amazon.com'
		},
		{
			id: 4,
			name: 'Rohit Kumar',
			company: 'Adobe',
			package: '35 LPA',
			branch: 'Electronics & Communication',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/adobe.com'
		},
		{
			id: 5,
			name: 'Ananya Singh',
			company: 'Oracle',
			package: '32 LPA',
			branch: 'Information Technology',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/oracle.com'
		},
		{
			id: 6,
			name: 'Karan Mehta',
			company: 'IBM',
			package: '28 LPA',
			branch: 'Computer Science',
			year: '2024',
			image:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
			companyLogo: 'https://logo.clearbit.com/ibm.com'
		}
	],
	statistics: [
		{ value: '45 LPA', label: 'Highest Package' },
		{ value: '15+', label: 'Dream Offers' },
		{ value: '50+', label: 'Top Companies' },
		{ value: '98%', label: 'Success Rate' }
	]
};

export const homeTestimonialsData = {
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
		},
		{
			id: 2,
			name: 'Priya Patel',
			batch: 'B.Tech IT 2023',
			company: 'Amazon',
			position: 'Product Manager',
			image:
				'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
			video:
				'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
			testimonial:
				'The entrepreneurship ecosystem at BPIT is incredible. From ideation to execution, the support system helped me grow both personally and professionally.',
			rating: 5,
			achievement: 'Started her own tech startup',
			tags: ['Innovation', 'Entrepreneurship', 'Leadership']
		},
		{
			id: 3,
			name: 'Rajesh Kumar',
			batch: 'B.Tech ECE 2022',
			company: 'Google',
			position: 'Hardware Engineer',
			image:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
			video:
				'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
			testimonial:
				'The research opportunities and advanced labs at BPIT gave me hands-on experience that directly contributed to my success at Google.',
			rating: 5,
			achievement: 'Published 3 research papers',
			tags: ['Research', 'Innovation', 'Technology']
		}
	]
};
