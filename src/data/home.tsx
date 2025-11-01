import React from 'react';
import { Award, BookOpen } from 'lucide-react';

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
			title: 'Welcome to BPIT',
			subtitle: "Shaping Tomorrow's Innovators",
			description: (
				<>
					<span className='font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent'>
						A Unit of Bhartiya Brahmin Charitable Trust (Regd.).
					</span>
					<br />
					<span>(Approved by AICTE, Ministry of Education (MoE))</span>
					<br />
					<span>
						Affiliated to{' '}
						<span className='font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent'>
							Guru Gobind Singh Indraprastha University, Delhi
						</span>
					</span>
				</>
			),
			image:
				'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
			icon: <Award className='w-8 h-8' />,
			stats: 'NBA Accredited Institution',
			cta: {
				label: 'Apply Now',
				isEnquiry: true
			},
			secondary_cta: {
				label: 'Explore Programs',
				href: '/admissions'
			}
		},
		{
			title: 'Engineering Excellence',
			subtitle: 'NBA Accredited Programs',
			description:
				"Discover our world-class engineering programs in Computer Science, Information Technology, Electronics, and Electrical Engineering designed to shape tomorrow's innovators.",
			image:
				'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
			icon: <BookOpen className='w-8 h-8' />,
			stats: '1000+ Students',
			cta: {
				label: 'View Programs',
				href: '/departments'
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
			stats: '50+ Clubs',
			cta: {
				label: 'Student Life',
				href: '/student-life'
			}
		},
		{
			title: 'Placement Success',
			subtitle: 'Industry Ready',
			description:
				'Join our alumni network working at top companies like Amazon, Microsoft, and Google. Our dedicated placement cell ensures 100% placement assistance.',
			image:
				'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',
			icon: 'Trophy',
			stats: '100% Placement',
			cta: {
				label: 'View Placements',
				href: '/placements/overview'
			}
		},
		{
			title: 'Modern Infrastructure',
			subtitle: 'Learning Environment',
			description:
				'Study in modern classrooms, well-equipped laboratories, digital libraries, and smart campus facilities that provide the perfect environment for learning.',
			image:
				'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
			icon: 'Building',
			stats: 'Modern Facilities',
			cta: {
				label: 'About BPIT',
				href: '/about'
			}
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
			pinned: true,
			urgent: true,
			link: '/'
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
			pinned: false,
			urgent: false,
			link: '/'
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
			pinned: true,
			urgent: true,
			link: '/'
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
			pinned: true,
			urgent: false,
			link: '/'
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
			pinned: false,
			urgent: false,
			link: '/'
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
			pinned: true,
			urgent: true,
			link: '/'
		}
	]
};
