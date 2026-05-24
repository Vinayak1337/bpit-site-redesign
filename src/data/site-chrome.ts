export const defaultSiteChromeConfig: SiteChromeConfig = {
	logo: {
		src: '/logo.png',
		alt: 'BPIT Logo'
	},
	navSections: [
		{
			id: 'about',
			label: 'About BPIT',
			icon: 'Building2',
			enabled: true,
			order: 10,
			items: [
				{
					id: 'about-us',
					label: 'About Us',
					href: '/about',
					description: 'Leadership insights and institutional overview',
					icon: 'Building2',
					enabled: true,
					order: 10
				},
				{
					id: 'vision-mission',
					label: 'Vision & Mission',
					href: '/vision-mission',
					description: 'Our goals and objectives for shaping future engineers',
					icon: 'Target',
					enabled: true,
					order: 20
				},
				{
					id: 'management',
					label: 'Governing Body',
					href: '/management',
					description: 'Management, administration & faculties',
					icon: 'Users',
					enabled: true,
					order: 30
				},
				{
					id: 'statutory-committees',
					label: 'Statutory Committees',
					href: '/statutory-committees',
					description: 'IQAC, Anti-Ragging, and other statutory committees',
					icon: 'Shield',
					enabled: true,
					order: 40
				},
				{
					id: 'mandatory-disclosure',
					label: 'Mandatory Disclosure',
					href: '/mandatory-disclosure',
					description: 'AICTE/NBA accreditation and mandatory disclosures',
					icon: 'Award',
					enabled: true,
					order: 50
				},
				{
					id: 'gallery',
					label: 'Photo & Video Gallery',
					href: '/gallery',
					description: 'Campus life, events, and institutional memories',
					icon: 'Camera',
					enabled: true,
					order: 60
				}
			]
		},
		{
			id: 'admissions',
			label: 'Admissions',
			icon: 'GraduationCap',
			enabled: true,
			order: 20,
			items: [
				{
					id: 'why-bpit',
					label: 'Why Choose BPIT?',
					href: '/admissions/why-bpit',
					description: 'Top placement records, accreditation, and excellence',
					icon: 'Star',
					enabled: true,
					order: 10
				},
				{
					id: 'admission-process',
					label: 'Admission Process & Eligibility',
					href: '/admissions/process',
					description: 'Step-by-step admission process and eligibility criteria',
					icon: 'ClipboardList',
					enabled: true,
					order: 20
				},
				{
					id: 'fees',
					label: 'Fee Structure',
					href: '/admissions/fees',
					description: 'Program fees and payment information',
					icon: 'DollarSign',
					enabled: true,
					order: 30
				},
				{
					id: 'scholarships',
					label: 'Scholarships',
					href: '/admissions/scholarship',
					description: 'Financial assistance and merit scholarships',
					icon: 'GraduationCap',
					enabled: true,
					order: 40
				},
				{
					id: 'brochure',
					label: 'Download Brochure',
					href: '/admissions/brochure',
					description: 'Complete information brochure and prospectus',
					icon: 'Download',
					enabled: true,
					order: 50
				},
				{
					id: 'faqs',
					label: 'FAQs',
					href: '/admissions/faqs',
					description: 'Frequently asked questions about admissions',
					icon: 'HelpCircle',
					enabled: true,
					order: 60
				}
			]
		},
		{
			id: 'academics',
			label: 'Academics',
			icon: 'BookOpen',
			enabled: true,
			order: 30,
			items: [
				{
					id: 'academic-calendar',
					label: 'Academic Calendar',
					href: '/academia/academic-calendar',
					description: 'Important academic dates and semester schedules',
					icon: 'Calendar',
					enabled: true,
					order: 10
				},
				{
					id: 'examination',
					label: 'Examination & Results',
					href: '/academia/examination',
					description: 'Exam schedules, results, and academic performance',
					icon: 'FileText',
					enabled: true,
					order: 20
				},
				{
					id: 'syllabus',
					label: 'Syllabus & Ordinances',
					href: '/academia/syllabus-ordinance',
					description: 'Course curriculum, syllabus, and academic ordinances',
					icon: 'BookOpen',
					enabled: true,
					order: 30
				},
				{
					id: 'library',
					label: 'Library / Resource Center',
					href: '/academia/library',
					description: 'Library resources, digital collections, and services',
					icon: 'BookMarked',
					enabled: true,
					order: 40
				},
				{
					id: 'notices',
					label: 'Notices & Circulars',
					href: '/academia/notices-circulars',
					description: 'Important notices, circulars, and announcements',
					icon: 'Bell',
					enabled: true,
					order: 50
				}
			]
		},
		{
			id: 'departments',
			label: 'Departments',
			icon: 'Users',
			enabled: true,
			order: 40,
			items: [
				{
					id: 'cse',
					label: 'Computer Science & Engineering',
					href: 'https://cse.bpitindia.ac.in',
					description: 'Software development, algorithms, and programming expertise',
					icon: 'Code2',
					enabled: true,
					order: 10
				},
				{
					id: 'cse-ds',
					label: 'Computer Science & Engineering - Data Science',
					href: 'https://cse-ds.bpitindia.ac.in',
					description: 'Data science, machine learning, and artificial intelligence',
					icon: 'Database',
					enabled: true,
					order: 20
				},
				{
					id: 'it',
					label: 'Information Technology',
					href: 'https://it.bpitindia.ac.in',
					description: 'Network systems, cybersecurity, and IT infrastructure',
					icon: 'Network',
					enabled: true,
					order: 30
				},
				{
					id: 'ece',
					label: 'Electronics & Communication',
					href: 'https://ece.bpitindia.ac.in',
					description: 'Circuit design, telecommunications, and embedded systems',
					icon: 'Radio',
					enabled: true,
					order: 40
				}
			]
		},
		{
			id: 'placements',
			label: 'Placements',
			icon: 'Briefcase',
			enabled: true,
			order: 50,
			items: [
				{
					id: 'overview',
					label: 'Placement Overview',
					href: '/placements/overview',
					description: 'Career support, placement cell, and recruiters',
					icon: 'Briefcase',
					enabled: true,
					order: 10
				},
				{
					id: 'training-placement',
					label: 'Training & Placement',
					href: '/placements/training-placement',
					description: 'Training programs and placement preparation',
					icon: 'Users',
					enabled: true,
					order: 20
				},
				{
					id: 'recruiters',
					label: 'Recruiters',
					href: '/placements/recruiters',
					description: 'Industry partners and recruiting organizations',
					icon: 'Building2',
					enabled: true,
					order: 30
				},
				{
					id: 'statistics',
					label: 'Placement Statistics',
					href: '/placements/statistics',
					description: 'Placement performance and student achievements',
					icon: 'BarChart3',
					enabled: true,
					order: 40
				},
				{
					id: 'internships',
					label: 'Internships',
					href: '/placements/internships',
					description: 'Internship opportunities and industry exposure',
					icon: 'GraduationCap',
					enabled: true,
					order: 50
				}
			]
		},
		{
			id: 'student-life',
			label: 'Student Life',
			icon: 'Music',
			enabled: true,
			order: 60,
			items: [
				{
					id: 'campus-facilities',
					label: 'Campus Facilities',
					href: '/student-life/campus-facilities',
					description: 'Campus infrastructure and student amenities',
					icon: 'Building2',
					enabled: true,
					order: 10
				},
				{
					id: 'clubs',
					label: 'Clubs & Societies',
					href: '/student-life/clubs-and-societies',
					description: 'Student clubs, societies, and activities',
					icon: 'Users',
					enabled: true,
					order: 20
				},
				{
					id: 'events',
					label: 'Events & Festivals',
					href: '/student-life/events-and-festivals',
					description: 'Campus events, festivals, and celebrations',
					icon: 'Music',
					enabled: true,
					order: 30
				},
				{
					id: 'grievance',
					label: 'Student Grievance Cell',
					href: '/student-life/student-grievance-cell',
					description: 'Student support and grievance redressal',
					icon: 'MessageSquare',
					enabled: true,
					order: 40
				},
				{
					id: 'conduct',
					label: 'Code of Conduct',
					href: '/student-life/code-of-conduct',
					description: 'Student conduct guidelines and responsibilities',
					icon: 'Shield',
					enabled: true,
					order: 50
				}
			]
		},
		{
			id: 'student-portal',
			label: 'Student Portal',
			icon: 'LogIn',
			enabled: true,
			order: 70,
			items: [
				{
					id: 'login',
					label: 'Portal Login',
					href: '/student-portal/login',
					description: 'Access student dashboard and services',
					icon: 'LogIn',
					enabled: true,
					order: 10
				},
				{
					id: 'fee-payment',
					label: 'Fee Payment',
					href: '/student-portal/fee-payment',
					description: 'Pay academic and hostel fees online',
					icon: 'CreditCard',
					enabled: true,
					order: 20
				},
				{
					id: 'attendance',
					label: 'Attendance',
					href: '/student-portal/attendance',
					description: 'View attendance records and reports',
					icon: 'ClipboardList',
					enabled: true,
					order: 30
				},
				{
					id: 'results',
					label: 'Results',
					href: '/student-portal/results',
					description: 'View examination results and academic records',
					icon: 'BarChart',
					enabled: true,
					order: 40
				}
			]
		}
	],
	footer: {
		quickLinks: [
			{
				id: 'about',
				label: 'About BPIT',
				href: '/about',
				icon: 'Building2',
				enabled: true,
				order: 10
			},
			{
				id: 'admissions',
				label: 'Admissions',
				href: '/admissions/process',
				icon: 'GraduationCap',
				enabled: true,
				order: 20
			},
			{
				id: 'academics',
				label: 'Academics',
				href: '/academia/academic-calendar',
				icon: 'BookOpen',
				enabled: true,
				order: 30
			},
			{
				id: 'placements',
				label: 'Placements',
				href: '/placements/overview',
				icon: 'Trophy',
				enabled: true,
				order: 40
			},
			{
				id: 'student-life',
				label: 'Student Life',
				href: '/student-life/campus-facilities',
				icon: 'Users',
				enabled: true,
				order: 50
			},
			{
				id: 'statutory',
				label: 'Statutory Committees',
				href: '/statutory-committees',
				icon: 'Shield',
				enabled: true,
				order: 60
			}
		],
		socialLinks: [
			{
				id: 'instagram',
				label: 'Instagram',
				href: 'https://www.instagram.com/bpitindia/',
				icon: 'Instagram',
				gradientClass: 'from-pink-500 to-purple-600',
				ariaLabel: 'Visit BPIT on Instagram',
				enabled: true,
				order: 10
			},
			{
				id: 'linkedin',
				label: 'LinkedIn',
				href: 'https://www.linkedin.com/in/bhagwan-parshuram-institute-of-technology-bpit-50358a178/',
				icon: 'Linkedin',
				gradientClass: 'from-blue-600 to-blue-700',
				ariaLabel: 'Visit BPIT on LinkedIn',
				enabled: true,
				order: 20
			},
			{
				id: 'twitter',
				label: 'Twitter',
				href: 'https://x.com/BpitIndia',
				icon: 'Twitter',
				gradientClass: 'from-sky-400 to-blue-500',
				ariaLabel: 'Visit BPIT on X (Twitter)',
				enabled: true,
				order: 30
			},
			{
				id: 'youtube',
				label: 'YouTube',
				href: 'https://www.youtube.com/@bpitcampus',
				icon: 'Youtube',
				gradientClass: 'from-red-500 to-red-600',
				ariaLabel: 'Visit BPIT on YouTube',
				enabled: true,
				order: 40
			},
			{
				id: 'facebook',
				label: 'Facebook',
				href: 'https://www.facebook.com/bpitindia',
				icon: 'Facebook',
				gradientClass: 'from-blue-500 to-blue-600',
				ariaLabel: 'Visit BPIT on Facebook',
				enabled: true,
				order: 50
			}
		],
		stats: [
			{
				id: 'established',
				number: '2007',
				label: 'Established',
				icon: 'Calendar',
				enabled: true,
				order: 10
			},
			{
				id: 'students',
				number: '1000+',
				label: 'Students',
				icon: 'Users',
				enabled: true,
				order: 20
			},
			{
				id: 'accredited',
				number: 'NBA',
				label: 'Accredited',
				icon: 'Award',
				enabled: true,
				order: 30
			},
			{
				id: 'placement',
				number: '95%+',
				label: 'Placement',
				icon: 'Trophy',
				enabled: true,
				order: 40
			}
		],
		bottomText: {
			copyright:
				'Bhagwan Parshuram Institute of Technology. All rights reserved.',
			accreditation: 'Affiliated to GGSIPU | NBA Accredited | NAAC Certified'
		}
	}
};
