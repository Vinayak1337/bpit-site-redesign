// Management page data
export const managementPageData = {
	title: 'Management Team',
	leaders: [
		{
			name: 'Shri Vinod Vats',
			position: 'Chairman',
			description: [
				'Shri Vinod Vats is the Chairman of Bhagwan Parshuram Institute of Technology and also the President of Bhartiya Brahmin Charitable Trust. Being a visionary and a true social leader, he has played a vital role in the development of the institute.',
				'His endeavour for inclusivity and championing the cause of excellence in students are hallmarks that have helped the institute to paint the canvas of creative thoughts and brightest tales. As an active social worker, he has played different roles in the functioning and management of various social organizations and samagams in Delhi and NCR.',
				'In the past, he has held many honorary offices including the general secretary of Gaur Vidya Pracharini Sabha, President of its disciplinary committee, and member of Gaur Brahmin College of Education, Rohtak. He is also a member of the Advisory Committee of Deen Dayal Upadhyay Hospital, Government of NCT of Delhi, member of Tika Ram Shiksha Sansthan, Sonepat and member of North-Ex Blind Welfare and Educational Society Delhi.',
				'An eminent professional, educationist and nationalist, Shri Vinod Vats has gained a prominent position in society due to his exemplary social work. His rise to prominence in such a short span can be attributed to his strong will power, calibre, conviction, dedication and leadership quality.'
			],
			delay: 0.2
		},
		{
			name: 'Shri Surender Sharma',
			position: 'Vice President',
			description: [
				'Padma Shri, Surender Sharma is the Vice President of Bhagwan Parshuram Institute of Technology as well as Bhartiya Brahmin Charitable Trust. He is a popular renowned Hindi poet (Hasyakavi) across the globe.',
				'He received Padma Shri Award from the government of India in 2013. He at times uses Marwari language to express rendezvous of thoughts and feelings with humour in his renditions. He is celebrated literati in literary circles across India.',
				'He is known to have caused many laugh riots and a notable fact is that he seldom laughs and maintains a poker face while telling the most hilarious jokes. This demeanour is particularly liked by a lot of people, who find it very amusing.',
				'In 2004, FM radio station, Red FM 93.5, started a daily show titled "Sharmaji Se Poocho" (Ask Mr Sharma) featuring Surender Sharma. In this show, he gave prompt and humorous answers to callers\' questions.'
			],
			delay: 0.4
		},
		{
			name: 'Shri Ram Babu Sharma',
			position: 'General Secretary',
			description: [
				'Shri Ram Babu Sharma is the General Secretary of Bhagwan Parshuran Institute of Technology and Bhartiya Brahmin Charitable Trust. He has been associated with various social, religious and sports organizations.',
				'He was a member of the Delhi Executive of Archery Association of India. He is the president of Shiv Shakti Parishad, a social organization engaged in providing dress, books and free coaching to underprivileged children.',
				'He is also in the executive body of Shakti Mandir situated at Tiraha Bairam Khan in Dariyaganj Delhi. His dedication to social causes and organizational excellence has been instrumental in the institute\'s growth.'
			],
			delay: 0.6
		},
		{
			name: 'Shri Shambhu Sharma',
			position: 'Secretary',
			description: [
				'Shri Shambhu Sharma is the Secretary of Bhagwan Parshuram Institute of Technology. He is the General Secretary of Akhil Bhartiya Brahmin Mahasabha and is revered as the son of his renowned father Late Pandit Madanlal Sharma, former national President of Akhil Bhartiya Brahmin Mahasabha.',
				'He is the Director of Brahm Shakti Sanjeevani and MLS hospitals. As the Director of two notable hospitals, he ensures overall regulation of all medical facets. He is the trustee of Yuvashakti Educational Society and an eminent member of Bhartiya Brahmin Charitable Trust.',
				'Shri Shambhu Sharma is a philanthropist, an active social worker and the President of MLS Charitable Trust. He has also served with distinction as Delhi municipal corporation councillor from Budh Vihar ward.'
			],
			delay: 0.8
		},
		{
			name: 'Shri Sanjeev Sharma',
			position: 'Treasurer',
			description: [
				'Shri Sanjeev Sharma is the Treasurer of Bhagwan Parshuram Institute of Technology. "An investment in knowledge pays the best interest." - Benjamin Franklin. I firmly believe that education is an all-encompassing process that leads to the accomplishment of the student\'s full potential.',
				'At BPIT, we train our students to think creatively and engulf articulation, novelty and teamwork. To educate professional courses and develop a student\'s career and personality, BPIT offers devoted and knowledgeable experts.',
				'Besides a wonderful infrastructure, the students live in an aura that has been greatly enriched by a dedicated teaching faculty. The motive of our institute is to develop a worldwide perspective to cope-up with the fast-changing technological scenario.',
				'In addition, values with discipline are the hallmark of our college. His financial stewardship ensures the institute\'s sustainable growth and development.'
			],
			delay: 1.0
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
		gradient: 'from-blue-50 to-blue-100',
		iconColor: 'bg-blue-600',
		textColor: 'text-blue-600'
	},
	sections: [
		{
			id: 'board-of-governors',
			title: 'Board of Governors',
			icon: 'Award',
			iconColor: 'text-blue-600',
			description:
				'The Board of Governors provides strategic oversight and policy direction for the institution. Comprising eminent personalities from academia, industry, and public service, the board ensures BPIT maintains its commitment to excellence.',
			cards: [
				{
					title: 'Key Responsibilities',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Strategic planning and policy formulation',
						'Financial oversight and budget approval',
						'Academic quality assurance',
						'Institutional development initiatives'
					]
				},
				{
					title: 'Composition',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
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
			iconColor: 'text-blue-600',
			description:
				'Our administrative structure ensures efficient operations, student services, and support for academic activities through well-defined roles and responsibilities.',
			cards: [
				{
					title: 'Academic Affairs',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Admissions Office',
						'Examination Cell',
						'Training & Placement',
						'Student Affairs'
					]
				},
				{
					title: 'Support Services',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
					items: [
						'Library Services',
						'IT Infrastructure',
						'Finance & Accounts',
						'Human Resources'
					]
				},
				{
					title: 'Quality Assurance',
					bgColor: 'bg-blue-50',
					textColor: 'text-blue-800',
					listColor: 'text-blue-700',
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
		gradient: 'from-blue-50 to-blue-100',
		iconColor: 'bg-blue-600',
		textColor: 'text-blue-600'
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
			iconColor: 'bg-blue-100',
			iconTextColor: 'text-blue-600',
			textColor: 'text-blue-600',
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
		gradient: 'from-blue-50 to-blue-100',
		iconColor: 'bg-blue-600',
		textColor: 'text-blue-600'
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
			iconColor: 'text-blue-600',
			bulletColor: 'bg-blue-600',
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
			iconColor: 'text-blue-600',
			bulletColor: 'bg-blue-600',
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
			iconColor: 'text-blue-600',
			bulletColor: 'bg-blue-600',
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
				iconColor: 'bg-blue-100',
				iconTextColor: 'text-blue-600'
			},
			{
				id: 'communication',
				title: 'Communication',
				description: 'Policy dissemination and training',
				icon: 'BookOpen',
				iconColor: 'bg-blue-100',
				iconTextColor: 'text-blue-600'
			},
			{
				id: 'monitoring',
				title: 'Monitoring',
				description: 'Compliance monitoring and evaluation',
				icon: 'Target',
				iconColor: 'bg-blue-100',
				iconTextColor: 'text-blue-600'
			}
		]
	}
};

// Hero data for management section
export const managementHeroData = {
	title: 'Management',
	subtitle:
		'Experienced leadership driving institutional excellence and innovation in engineering education',
	gradient: 'from-blue-700 to-blue-900',
	badges: [
		'Strategic Leadership',
		'Academic Excellence',
		'Industry Collaboration',
		'Innovation Focus'
	]
};
