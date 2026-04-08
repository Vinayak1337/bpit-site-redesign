module.exports = {
	slug: 'admissions',
	title: 'Admissions',
	components: {
		HERO: {
			title: 'Admissions',
			subtitle: 'Join BPIT to begin a focused, future-ready academic journey.',
			backgroundImage: null,
			gradient: 'from-blue-600 to-blue-800'
		},
		OVERVIEW_HERO: {
			title: 'Academic Excellence at BPIT',
			subtitle: 'Admissions Overview',
			description:
				'Explore the full admission journey at BPIT, from program discovery and eligibility to fees, scholarships, and official brochures.',
			programCountLabel: 'Programs available'
		},
		OVERVIEW_STATS: {
			eyebrow: 'At a glance',
			title: 'What applicants review first',
			description:
				'Key facts that help students compare BPIT quickly before moving into detailed program pages.',
			items: [
				{ value: '100+', label: 'Recruiters', icon: 'Building2' },
				{ value: '95%', label: 'Placement Support', icon: 'TrendingUp' },
				{ value: 'NBA', label: 'Accredited Programs', icon: 'Award' },
				{ value: '2000+', label: 'Active Students', icon: 'Users' }
			]
		},
		OVERVIEW_LINKS: {
			eyebrow: 'Start here',
			title: 'Plan your admission journey',
			description:
				'Jump straight into the section you need without scanning the entire admissions stack.',
			items: [
				{
					title: 'Admission Process',
					description: 'Program-wise eligibility, selection criteria, and admission workflow.',
					href: '/admissions/process',
					icon: 'FileText'
				},
				{
					title: 'Fee Structure',
					description: 'Official annual fee cards with head-wise breakup inside each year.',
					href: '/admissions/fees',
					icon: 'IndianRupee'
				},
				{
					title: 'Scholarships',
					description: 'University, state, and national scholarship options with portal links.',
					href: '/admissions/scholarship',
					icon: 'GraduationCap'
				},
				{
					title: 'FAQs',
					description: 'Quick answers to common admission, contact, and campus queries.',
					href: '/admissions/faqs',
					icon: 'HelpCircle'
				}
			]
		},
		OVERVIEW_DEPARTMENTS: {
			title: 'Programs and departments',
			description:
				'Admissions currently cover engineering and management disciplines offered by the institute.',
			items: [
				{ name: 'Computer Science & Engineering' },
				{ name: 'Electronics & Communication Engineering' },
				{ name: 'Information Technology' },
				{ name: 'Electrical Engineering' },
				{ name: 'Management Studies' }
			]
		},
		OVERVIEW_NOTES: {
			title: 'Important information',
			description:
				'Keep these points in mind while reviewing timelines, fees, and scholarship opportunities.',
			items: [
				'Admissions timelines and counseling windows are updated periodically.',
				'Refer to the process and brochure sections for the latest eligibility details and official notices.',
				'Use the FAQ contact details or scholarship support information if you need direct assistance.'
			]
		}
	}
};
