import {
	Building2,
	Target,
	Users,
	Award,
	Calendar,
	BookOpen,
	DollarSign,
	GraduationCap,
	Home,
	Shield,
	Camera,
	Music,
	MessageSquare,
	BarChart3,
	Briefcase,
	FileText,
	Download,
	HelpCircle,
	Star,
	CreditCard,
	ClipboardList,
	BookMarked,
	TrendingUp,
	Network,
	Users2,
	Scale,
	UserX,
	LogIn,
	CheckCircle,
	BarChart,
	Bell
} from 'lucide-react';

export const aboutBPITItems = [
	{
		title: 'About Us',
		href: '/about',
		description: 'Leadership insights and institutional overview',
		icon: <Building2 className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Vision & Mission',
		href: '/vision-mission',
		description: 'Our goals and objectives for shaping future engineers',
		icon: <Target className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Governing Body',
		href: '/management',
		description: 'Management, administration & faculties',
		icon: <Users className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Statutory Committees',
		href: '/statutory-committees',
		description: 'IQAC, Anti-Ragging, and other statutory committees',
		icon: <Shield className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Mandatory Disclosures',
		href: '/accreditation',
		description: 'AICTE/NBA accreditation and mandatory disclosures',
		icon: <Award className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Photo & Video Gallery',
		href: '/gallery',
		description: 'Campus life, events, and institutional memories',
		icon: <Camera className='w-4 h-4 text-blue-600' />
	}
];

export const admissionsItems = [
	{
		title: 'Why Choose BPIT?',
		href: '/admissions/why-bpit',
		description: 'Top placement records, accreditation, and excellence',
		icon: <Star className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Admission Process & Eligibility',
		href: '/admissions/process',
		description: 'Step-by-step admission process and eligibility criteria',
		icon: <ClipboardList className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Fee Structure',
		href: '/admissions/fees',
		description: 'Program fees and payment information',
		icon: <DollarSign className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Scholarships',
		href: '/admissions/scholarship',
		description: 'Financial assistance and merit scholarships',
		icon: <GraduationCap className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Download Brochure',
		href: '/admissions/brochure',
		description: 'Complete information brochure and prospectus',
		icon: <Download className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'FAQs',
		href: '/admissions/faqs',
		description: 'Frequently asked questions about admissions',
		icon: <HelpCircle className='w-4 h-4 text-blue-600' />
	}
];

export const academicsItems = [
	{
		title: 'Academic Calendar',
		href: '/academia/academic-calendar',
		description: 'Important academic dates and semester schedules',
		icon: <Calendar className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Examination & Results',
		href: '/academia/examination',
		description: 'Exam schedules, results, and academic performance',
		icon: <FileText className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Syllabus & Ordinances',
		href: '/academia/syllabus-ordinance',
		description: 'Course curriculum, syllabus, and academic ordinances',
		icon: <BookOpen className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Library / Resource Center',
		href: '/academia/library',
		description: 'Library resources, digital collections, and services',
		icon: <BookMarked className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Notices & Circulars',
		href: '/academia/notices-circulars',
		description: 'Important notices, circulars, and announcements',
		icon: <Bell className='w-4 h-4 text-blue-600' />
	}
];

export const departmentItems = [
	{
		title: 'Computer Science & Engineering',
		href: 'https://cse.bpitindia.ac.in',
		description: 'Software development, algorithms, and programming expertise',
		icon: (
			<div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
				<span className='text-blue-600 font-semibold text-xs'>CS</span>
			</div>
		)
	},
	{
		title: 'Computer Science & Engineering - Data Science',
		href: 'https://cse-ds.bpitindia.ac.in',
		description: 'Data science, machine learning, and artificial intelligence',
		icon: (
			<div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
				<span className='text-blue-600 font-semibold text-xs'>DS</span>
			</div>
		)
	},
	{
		title: 'Information Technology',
		href: 'https://it.bpitindia.ac.in',
		description: 'Network systems, cybersecurity, and IT infrastructure',
		icon: (
			<div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
				<span className='text-green-600 font-semibold text-xs'>IT</span>
			</div>
		)
	},
	{
		title: 'Electronics & Communication',
		href: 'https://ece.bpitindia.ac.in',
		description: 'Circuit design, telecommunications, and embedded systems',
		icon: (
			<div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
				<span className='text-purple-600 font-semibold text-xs'>EC</span>
			</div>
		)
	},
	{
		title: 'Electrical & Electronics',
		href: 'https://eee.bpitindia.ac.in',
		description: 'Power systems, automation, and electrical machinery',
		icon: (
			<div className='w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center'>
				<span className='text-orange-600 font-semibold text-xs'>EE</span>
			</div>
		)
	},
	{
		title: 'Applied Sciences',
		href: 'https://applied-sciences.bpitindia.ac.in',
		description: 'Applied sciences and mathematics',
		icon: (
			<div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
				<span className='text-gray-600 font-semibold text-xs'>AS</span>
			</div>
		)
	},
	{
		title: 'Management Programs',
		href: 'https://sba.bpitindia.ac.in',
		description: 'Business administration and management studies',
		icon: (
			<div className='w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center'>
				<span className='text-rose-600 font-semibold text-xs'>MG</span>
			</div>
		)
	}
];

export const placementsItems = [
	{
		title: 'Placement Cell Overview',
		href: '/placements/overview',
		description: 'About our placement cell and career services',
		icon: <TrendingUp className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'About T&P',
		href: '/placements/training-placement',
		description: 'Message from T&P, T&P team, and department details',
		icon: <MessageSquare className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Our Recruiters',
		href: '/placements/recruiters',
		description: 'Industry partners and recruiting companies',
		icon: <Briefcase className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Placement Statistics',
		href: '/placements/statistics',
		description: 'Placement records, packages, and success stories',
		icon: <BarChart3 className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Internship Opportunities',
		href: '/placements/internships',
		description: 'Industry internships and training programs',
		icon: <Users2 className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Alumni Network',
		href: '/placements/alumni',
		description: 'Connect with our successful alumni network',
		icon: <Network className='w-4 h-4 text-blue-600' />
	}
];

export const studentLifeItems = [
	{
		title: 'Campus Facilities',
		href: '/student-life/campus-facilities',
		description: 'Modern infrastructure and amenities',
		icon: <Home className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Clubs & Societies',
		href: '/student-life/clubs-and-societies',
		description: 'Join vibrant student communities',
		icon: <Users className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Events & Festivals',
		href: '/student-life/events-and-festivals',
		description: 'Celebrate culture and achievements',
		icon: <Music className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Student Grievance Cell',
		href: '/student-life/student-grievance-cell',
		description: 'Support and guidance services',
		icon: <UserX className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Code of Conduct',
		href: '/student-life/code-of-conduct',
		description: 'Guidelines for student behavior',
		icon: <Scale className='w-4 h-4 text-blue-600' />
	}
];

export const studentPortalItems = [
	{
		title: 'Login / Dashboard',
		href: '/student-portal/login',
		description: 'Access your student dashboard and portal',
		icon: <LogIn className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Fee Payment',
		href: '/student-portal/fee-payment',
		description: 'Online fee payment and transaction history',
		icon: <CreditCard className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Attendance Tracker',
		href: '/student-portal/attendance',
		description: 'Track your attendance and academic progress',
		icon: <CheckCircle className='w-4 h-4 text-blue-600' />
	},
	{
		title: 'Result Viewer',
		href: '/student-portal/results',
		description: 'View examination results and academic records',
		icon: <BarChart className='w-4 h-4 text-blue-600' />
	}
];
