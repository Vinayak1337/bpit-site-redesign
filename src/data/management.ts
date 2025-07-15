// Management page data
export const managementPageData = {
	title: 'Management Team',
	leaders: [
		{
			name: 'Dr. Anita Goel',
			position: 'Chairman, Board of Governors',
			description: [
				'Dr. Anita Goel brings over three decades of experience in academia and industry to her role as Chairman of the Board of Governors. A distinguished engineer and educator, she has been instrumental in shaping engineering education policy at the national level.',
				'Her vision for BPIT emphasizes innovation, industry collaboration, and holistic student development. Under her leadership, the institute has achieved significant milestones in academic excellence and research output.',
				'Dr. Goel is a recipient of numerous awards including the Distinguished Alumni Award from IIT Delhi and the National Award for Excellence in Engineering Education. She serves on several national committees and is a sought-after speaker at international conferences.'
			],
			delay: 0.2
		},
		{
			name: 'Dr. Rakesh Kumar',
			position: 'Principal',
			description: [
				'Dr. Rakesh Kumar has been leading BPIT as Principal since 2020, bringing with him over 25 years of experience in academic administration and research. His leadership has been pivotal in establishing BPIT as a premier institution for engineering education.',
				'A passionate educator and researcher, Dr. Kumar has published extensively in international journals and has guided over 30 PhD students. His research interests include artificial intelligence, machine learning, and sustainable engineering practices.',
				'Under his guidance, BPIT has achieved NBA accreditation for all its programs and has significantly enhanced its industry partnerships. He is committed to fostering innovation and entrepreneurship among students while maintaining the highest standards of academic excellence.'
			],
			delay: 0.4
		}
	],
	vision: {
		title: 'Our Leadership Vision',
		quote:
			'To build a world-class institution that nurtures innovative minds, fosters cutting-edge research, and produces skilled engineers who contribute meaningfully to society and industry.',
		delay: 0.6
	}
};

// Governance structure page data
export const governanceStructureData = {
	hero: {
		icon: 'Building2',
		title: 'Governance Structure',
		subtitle: 'Organizational Framework for Excellence',
		gradient: 'from-green-50 to-teal-50',
		iconColor: 'bg-green-600',
		textColor: 'text-green-600'
	},
	sections: [
		{
			id: 'board-of-governors',
			title: 'Board of Governors',
			icon: 'Award',
			iconColor: 'text-green-600',
			description:
				'The Board of Governors provides strategic oversight and policy direction for the institution. Comprising eminent personalities from academia, industry, and public service, the board ensures BPIT maintains its commitment to excellence.',
			cards: [
				{
					title: 'Key Responsibilities',
					bgColor: 'bg-green-50',
					textColor: 'text-green-800',
					listColor: 'text-green-700',
					items: [
						'Strategic planning and policy formulation',
						'Financial oversight and budget approval',
						'Academic quality assurance',
						'Institutional development initiatives'
					]
				},
				{
					title: 'Composition',
					bgColor: 'bg-green-50',
					textColor: 'text-green-800',
					listColor: 'text-green-700',
					items: [
						'Chairman (Industry Leader)',
						'Academic Representatives',
						'Government Nominees',
						'Alumni Representatives'
					]
				}
			]
		},
		{
			id: 'academic-council',
			title: 'Academic Council',
			icon: 'Users',
			iconColor: 'text-blue-600',
			description:
				'The Academic Council is the primary academic decision-making body, responsible for maintaining and enhancing the quality of education, research, and academic programs.',
			cards: [
				{
					title: 'Functions',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Curriculum development and review',
						'Faculty recruitment and promotion',
						'Research policy formulation',
						'Academic calendar planning'
					]
				},
				{
					title: 'Members',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Principal (Chairperson)',
						'Heads of Departments',
						'Senior Faculty Members',
						'External Academic Experts'
					]
				}
			]
		},
		{
			id: 'administrative-structure',
			title: 'Administrative Structure',
			icon: 'Shield',
			iconColor: 'text-purple-600',
			description:
				'Our administrative structure ensures efficient operations, student services, and support for academic activities through well-defined roles and responsibilities.',
			cards: [
				{
					title: 'Academic Affairs',
					bgColor: 'bg-purple-50',
					textColor: 'text-purple-800',
					listColor: 'text-purple-700',
					items: [
						'Admissions Office',
						'Examination Cell',
						'Training & Placement',
						'Student Affairs'
					]
				},
				{
					title: 'Support Services',
					bgColor: 'bg-purple-50',
					textColor: 'text-purple-800',
					listColor: 'text-purple-700',
					items: [
						'Library Services',
						'IT Infrastructure',
						'Finance & Accounts',
						'Human Resources'
					]
				},
				{
					title: 'Quality Assurance',
					bgColor: 'bg-purple-50',
					textColor: 'text-purple-800',
					listColor: 'text-purple-700',
					items: [
						'IQAC Cell',
						'Research & Development',
						'Industry Relations',
						'Alumni Affairs'
					]
				}
			]
		}
	]
};

// Leadership team page data
export const leadershipTeamData = {
	hero: {
		icon: 'UserCheck',
		title: 'Our Leadership Team',
		subtitle: 'Experienced Leaders Driving Excellence',
		gradient: 'from-purple-50 to-blue-50',
		iconColor: 'bg-purple-600',
		textColor: 'text-purple-600'
	},
	leaders: [
		{
			id: 'principal',
			name: 'Dr. [Principal Name]',
			position: 'Principal',
			icon: 'Building2',
			iconColor: 'bg-blue-100',
			iconTextColor: 'text-blue-600',
			textColor: 'text-blue-600',
			details: [
				{
					icon: 'GraduationCap',
					text: 'Ph.D. in [Field], [University]'
				},
				{
					icon: 'Calendar',
					text: '15+ years of experience'
				},
				{
					icon: 'Mail',
					text: 'principal@bpitindia.com'
				}
			],
			description:
				'Leading the institution with a vision for academic excellence and innovation in engineering education.'
		},
		{
			id: 'vice-principal',
			name: 'Dr. [Vice Principal Name]',
			position: 'Vice Principal',
			icon: 'Users',
			iconColor: 'bg-green-100',
			iconTextColor: 'text-green-600',
			textColor: 'text-green-600',
			details: [
				{
					icon: 'GraduationCap',
					text: 'Ph.D. in [Field], [University]'
				},
				{
					icon: 'Calendar',
					text: '12+ years of experience'
				},
				{
					icon: 'Mail',
					text: 'viceprincipal@bpitindia.com'
				}
			],
			description:
				'Supporting institutional leadership and overseeing academic operations and faculty development.'
		},
		{
			id: 'dean-academics',
			name: 'Dr. [Dean Name]',
			position: 'Dean - Academics',
			icon: 'BookOpen',
			iconColor: 'bg-orange-100',
			iconTextColor: 'text-orange-600',
			textColor: 'text-orange-600',
			details: [
				{
					icon: 'GraduationCap',
					text: 'Ph.D. in [Field], [University]'
				},
				{
					icon: 'Calendar',
					text: '10+ years of experience'
				},
				{
					icon: 'Mail',
					text: 'dean.academics@bpitindia.com'
				}
			],
			description:
				'Overseeing academic policies, curriculum development, and maintaining educational standards.'
		},
		{
			id: 'registrar',
			name: 'Mr./Ms. [Registrar Name]',
			position: 'Registrar',
			icon: 'Briefcase',
			iconColor: 'bg-purple-100',
			iconTextColor: 'text-purple-600',
			textColor: 'text-purple-600',
			details: [
				{
					icon: 'GraduationCap',
					text: 'M.A./M.Sc. in [Field]'
				},
				{
					icon: 'Calendar',
					text: '8+ years of experience'
				},
				{
					icon: 'Mail',
					text: 'registrar@bpitindia.com'
				}
			],
			description:
				'Managing student records, admissions, examinations, and administrative operations.'
		}
	]
};

// Policies and procedures page data
export const policiesProceduresData = {
	hero: {
		icon: 'Shield',
		title: 'Policies & Procedures',
		subtitle: 'Framework for Institutional Excellence',
		gradient: 'from-amber-50 to-orange-50',
		iconColor: 'bg-amber-600',
		textColor: 'text-amber-600'
	},
	policyCategories: [
		{
			id: 'academic-policies',
			title: 'Academic Policies',
			icon: 'BookOpen',
			iconColor: 'text-blue-600',
			bulletColor: 'bg-blue-600',
			policies: [
				'Admission Policy & Procedures',
				'Examination & Evaluation Policy',
				'Anti-Ragging Policy',
				'Student Grievance Redressal',
				'Research & Publication Policy'
			]
		},
		{
			id: 'faculty-policies',
			title: 'Faculty Policies',
			icon: 'Users',
			iconColor: 'text-green-600',
			bulletColor: 'bg-green-600',
			policies: [
				'Faculty Recruitment Policy',
				'Performance Evaluation System',
				'Professional Development Policy',
				'Leave & Attendance Policy',
				'Code of Conduct'
			]
		},
		{
			id: 'quality-assurance',
			title: 'Quality Assurance',
			icon: 'Award',
			iconColor: 'text-purple-600',
			bulletColor: 'bg-purple-600',
			policies: [
				'IQAC Guidelines & Procedures',
				'NBA Accreditation Compliance',
				'NAAC Assessment Framework',
				'Continuous Improvement Process',
				'External Quality Audit'
			]
		},
		{
			id: 'administrative-policies',
			title: 'Administrative Policies',
			icon: 'Briefcase',
			iconColor: 'text-orange-600',
			bulletColor: 'bg-orange-600',
			policies: [
				'Financial Management Policy',
				'Procurement & Purchase Policy',
				'IT Security & Data Protection',
				'Infrastructure Development',
				'Safety & Security Protocols'
			]
		}
	],
	implementationFramework: {
		title: 'Policy Implementation Framework',
		steps: [
			{
				id: 'review',
				title: 'Review',
				description: 'Regular policy review and updates',
				icon: 'Eye',
				iconColor: 'bg-blue-100',
				iconTextColor: 'text-blue-600'
			},
			{
				id: 'approval',
				title: 'Approval',
				description: 'Stakeholder consultation and approval',
				icon: 'UserCheck',
				iconColor: 'bg-green-100',
				iconTextColor: 'text-green-600'
			},
			{
				id: 'communication',
				title: 'Communication',
				description: 'Policy dissemination and training',
				icon: 'BookOpen',
				iconColor: 'bg-purple-100',
				iconTextColor: 'text-purple-600'
			},
			{
				id: 'monitoring',
				title: 'Monitoring',
				description: 'Compliance monitoring and evaluation',
				icon: 'Target',
				iconColor: 'bg-orange-100',
				iconTextColor: 'text-orange-600'
			}
		]
	}
};

// Hero data for management section
export const managementHeroData = {
	title: 'Management',
	subtitle:
		'Experienced leadership driving institutional excellence and innovation in engineering education',
	gradient: 'from-blue-600 via-purple-600 to-blue-800',
	badges: [
		'Strategic Leadership',
		'Academic Excellence',
		'Industry Collaboration',
		'Innovation Focus'
	]
};
