module.exports = {
	slug: 'admissions-why-bpit',
	title: 'Admissions - Why BPIT',
	components: {
		HERO: {
			title: 'Why BPIT',
			subtitle: 'See what makes BPIT a strong choice for engineering and management aspirants.',
			backgroundImage: null,
			gradient: 'from-blue-600 to-blue-800'
		},
		WHY_HERO: {
			badgeText: 'Why Choose BPIT',
			title: 'Launch your engineering career with confidence',
			description:
				'Accredited programs, strong industry connections, modern infrastructure, and a culture of mentorship designed to support serious learners.',
			quickPointsTitle: 'Why students choose BPIT',
			quickPoints: [
				'Outcome-focused academics with practical learning.',
				'Strong recruiter network and placement support.',
				'Mentor-driven environment for all-round growth.'
			],
			primaryCta: { label: 'Explore Highlights', href: '#highlights' },
			secondaryCta: { label: 'Admissions Process', href: '/admissions/process' }
		},
		WHY_STATS: {
			eyebrow: 'BPIT at a glance',
			title: 'Key performance highlights',
			description:
				'Quick signals that reflect academic credibility, placement support, and institutional standing.',
			items: [
				{ value: 'NBA', label: 'Accredited Programs' },
				{ value: '95%', label: 'Placement Rate' },
				{ value: '100+', label: 'Recruiters' },
				{ value: 'GGSIPU', label: 'Affiliated' }
			]
		},
		WHY_HIGHLIGHTS: {
			eyebrow: 'BPIT highlights',
			title: 'Reasons that make BPIT stand out',
			description:
				'The strongest academic, campus, and career outcomes students typically compare before applying.',
			items: [
				{
					icon: 'BookOpen',
					title: 'Academic Excellence',
					description: 'Industry-aligned, accredited curriculum with NBA-approved programs.'
				},
				{
					icon: 'Users',
					title: 'Mentorship Culture',
					description: 'Faculty as mentors with learner-centric support throughout the program.'
				},
				{
					icon: 'Trophy',
					title: 'Proven Track Record',
					description: 'Alumni placed in top firms including Accenture, Infosys, and TCS.'
				},
				{
					icon: 'Leaf',
					title: 'Green & Smart Campus',
					description: 'Solar panels, rainwater harvesting, and smart-enabled learning spaces.'
				},
				{
					icon: 'Building2',
					title: 'Top Recruiters',
					description: 'Frequent hiring visits by leading national and global companies.'
				},
				{
					icon: 'IndianRupee',
					title: 'Affordable Education',
					description: 'Balanced fee structure with strong ROI and steady placement outcomes.'
				}
			]
		},
		WHY_ACCREDITATIONS: {
			eyebrow: 'Recognitions',
			title: 'Accreditations and affiliations',
			description:
				'Recognized by major governing bodies and backed by trusted institutional credentials.',
			items: [
				{ title: 'NBA Accredited', subtitle: 'B.Tech programs in CSE, ECE, EEE', icon: 'Award' },
				{ title: 'AICTE Approved', subtitle: 'Affiliated to GGSIPU', icon: 'CheckCircle2' },
				{ title: 'Grade A Institute', subtitle: 'Under GGSIPU', icon: 'Star' },
				{ title: 'NIRF Ranked', subtitle: 'Recognized performance band', icon: 'Trophy' }
			]
		},
		WHY_FINAL_CTA: {
			title: 'Ready to join BPIT?',
			subtitle: 'Join students who began their academic and career journey with BPIT.',
			ctas: [
				{ label: 'Apply Now', href: '/admissions/process', icon: 'target' },
				{ label: 'Book Campus Visit', href: '/contact', icon: 'map' },
				{ label: 'Talk to a Counselor', href: '/contact', icon: 'phone' }
			]
		},
		PLACEMENT_COMPANIES: {
			title: 'Top Recruiters',
			subtitle: 'Leading companies that hire BPIT graduates across technology and consulting roles.',
			companies: [
				{ name: 'Accenture', logo: '/logos/accenture.png' },
				{ name: 'Infosys', logo: '/logos/infosys.png' },
				{ name: 'TCS', logo: '/logos/tcs.png' },
				{ name: 'Wipro', logo: '/logos/wipro.png' },
				{ name: 'Capgemini', logo: '/logos/capgemini.png' },
				{ name: 'Nagarro', logo: '/logos/nagarro.png' }
			],
			statistics: [
				{ value: '100+', label: 'Recruiters' },
				{ value: '95%', label: 'Placement Support' }
			]
		},
		TESTIMONIALS: {
			title: 'Student Stories',
			subtitle: 'Experiences from students and alumni who grew through BPIT.',
			testimonials: [
				{
					id: 1,
					name: 'Ananya Sharma',
					batch: '2024',
					company: 'Accenture',
					position: 'Software Engineer',
					image: '',
					video: '',
					testimonial:
						'BPIT gave me a strong technical foundation, faculty guidance, and the placement confidence I needed.',
					rating: 5,
					achievement: 'Placed at Accenture',
					tags: ['CSE', 'Placement']
				},
				{
					id: 2,
					name: 'Rohit Verma',
					batch: '2023',
					company: 'Infosys',
					position: 'Systems Engineer',
					image: '',
					video: '',
					testimonial:
						'The environment was disciplined but supportive, and the transition from academics to recruitment felt structured.',
					rating: 5,
					achievement: 'Placed at Infosys',
					tags: ['ECE', 'Industry readiness']
				}
			]
		}
	}
};
