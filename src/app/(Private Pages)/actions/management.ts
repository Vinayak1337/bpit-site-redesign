'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const MANAGEMENT_SLUG = 'management';

export interface ManagementData {
	title: string;
	titleIcon?: string;
	titleIconColor?: string;
	titleGradient?: string;
	leaders: Array<{
		id: string;
		name: string;
		position: string;
		description: string[];
		delay: number;
		image?: string;
		iconColor?: string;
		bgColor?: string;
	}>;
	vision: {
		title: string;
		quote: string;
		delay: number;
		icon?: string;
		iconColor?: string;
		bgColor?: string;
	};
}

export async function getManagement(slug = MANAGEMENT_SLUG): Promise<ManagementData> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug },
			include: {
				components: {
					where: {
						key: 'MANAGEMENT_DATA'
					},
					orderBy: { order: 'asc' },
					take: 1
				}
			}
		});

		if (!page || !page.components[0]) {
			console.log('No management data found in DB, returning default data');
			// Return default data if no page found
			return getDefaultManagementData();
		}

		console.log('Retrieved management data from DB:', JSON.stringify(page.components[0].data, null, 2));
		return page.components[0].data as unknown as ManagementData;
	} catch (error) {
		console.error('Error fetching management data:', error);
		return getDefaultManagementData();
	}
}

export async function updateManagement(data: ManagementData, slug = MANAGEMENT_SLUG) {
	try {
		console.log('Updating management data:', JSON.stringify(data, null, 2));
		
		// Ensure page exists
		let page = await prisma.page.findUnique({
			where: { slug }
		});

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Management',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		// Upsert the management component
		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 1
				}
			},
			update: {
				data: data as any,
				key: 'MANAGEMENT_DATA'
			},
			create: {
				pageId: page.id,
				data: data as any,
				order: 1,
				key: 'MANAGEMENT_DATA'
			}
		});

		revalidatePath('/management');
		revalidatePath('/admin/management');

		return { success: true };
	} catch (error) {
		console.error('Error updating management data:', error);
		return { success: false, error: 'Failed to update management data' };
	}
}

function getDefaultManagementData(): ManagementData {
	return {
		title: 'Management Team',
		titleIcon: 'Users',
		titleIconColor: 'text-blue-600',
		titleGradient: 'from-blue-50 to-blue-100',
		leaders: [
			{
				id: '1',
				name: 'Shri Vinod Vats',
				position: 'Chairman',
				description: [
					'Shri Vinod Vats is the Chairman of Bhagwan Parshuram Institute of Technology and also the President of Bhartiya Brahmin Charitable Trust. Being a visionary and a true social leader, he has played a vital role in the development of the institute.',
					'His endeavour for inclusivity and championing the cause of excellence in students are hallmarks that have helped the institute to paint the canvas of creative thoughts and brightest tales. As an active social worker, he has played different roles in the functioning and management of various social organizations and samagams in Delhi and NCR.',
					'In the past, he has held many honorary offices including the general secretary of Gaur Vidya Pracharini Sabha, President of its disciplinary committee, and member of Gaur Brahmin College of Education, Rohtak. He is also a member of the Advisory Committee of Deen Dayal Upadhyay Hospital, Government of NCT of Delhi, member of Tika Ram Shiksha Sansthan, Sonepat and member of North-Ex Blind Welfare and Educational Society Delhi.',
					'An eminent professional, educationist and nationalist, Shri Vinod Vats has gained a prominent position in society due to his exemplary social work. His rise to prominence in such a short span can be attributed to his strong will power, calibre, conviction, dedication and leadership quality.'
				],
				delay: 0.2,
				image: '/management/vinod-vats.jpg',
				iconColor: 'text-blue-600',
				bgColor: 'bg-blue-50'
			},
			{
				id: '2',
				name: 'Shri Surender Sharma',
				position: 'Vice President',
				description: [
					'Padma Shri, Surender Sharma is the Vice President of Bhagwan Parshuram Institute of Technology as well as Bhartiya Brahmin Charitable Trust. He is a popular renowned Hindi poet (Hasyakavi) across the globe.',
					'He received Padma Shri Award from the government of India in 2013. He at times uses Marwari language to express rendezvous of thoughts and feelings with humour in his renditions. He is celebrated literati in literary circles across India.',
					'He is known to have caused many laugh riots and a notable fact is that he seldom laughs and maintains a poker face while telling the most hilarious jokes. This demeanour is particularly liked by a lot of people, who find it very amusing.',
					'In 2004, FM radio station, Red FM 93.5, started a daily show titled "Sharmaji Se Poocho" (Ask Mr Sharma) featuring Surender Sharma. In this show, he gave prompt and humorous answers to callers\' questions.'
				],
				delay: 0.4,
				image: '/management/surender-sharma.jpg',
				iconColor: 'text-green-600',
				bgColor: 'bg-green-50'
			},
			{
				id: '3',
				name: 'Shri Ram Babu Sharma',
				position: 'General Secretary',
				description: [
					'Shri Ram Babu Sharma is the General Secretary of Bhagwan Parshuran Institute of Technology and Bhartiya Brahmin Charitable Trust. He has been associated with various social, religious and sports organizations.',
					'He was a member of the Delhi Executive of Archery Association of India. He is the president of Shiv Shakti Parishad, a social organization engaged in providing dress, books and free coaching to underprivileged children.',
					'He is also in the executive body of Shakti Mandir situated at Tiraha Bairam Khan in Dariyaganj Delhi. His dedication to social causes and organizational excellence has been instrumental in the institute\'s growth.'
				],
				delay: 0.6,
				image: '/management/ram-babu-sharma.jpg',
				iconColor: 'text-purple-600',
				bgColor: 'bg-purple-50'
			},
			{
				id: '4',
				name: 'Shri Shambhu Sharma',
				position: 'Secretary',
				description: [
					'Shri Shambhu Sharma is the Secretary of Bhagwan Parshuram Institute of Technology. He is the General Secretary of Akhil Bhartiya Brahmin Mahasabha and is revered as the son of his renowned father Late Pandit Madanlal Sharma, former national President of Akhil Bhartiya Brahmin Mahasabha.',
					'He is the Director of Brahm Shakti Sanjeevani and MLS hospitals. As the Director of two notable hospitals, he ensures overall regulation of all medical facets. He is the trustee of Yuvashakti Educational Society and an eminent member of Bhartiya Brahmin Charitable Trust.',
					'Shri Shambhu Sharma is a philanthropist, an active social worker and the President of MLS Charitable Trust. He has also served with distinction as Delhi municipal corporation councillor from Budh Vihar ward.'
				],
				delay: 0.8,
				image: '/management/shambhu-sharma.jpg',
				iconColor: 'text-orange-600',
				bgColor: 'bg-orange-50'
			},
			{
				id: '5',
				name: 'Shri Sanjeev Sharma',
				position: 'Treasurer',
				description: [
					'Shri Sanjeev Sharma is the Treasurer of Bhagwan Parshuram Institute of Technology. "An investment in knowledge pays the best interest." - Benjamin Franklin. I firmly believe that education is an all-encompassing process that leads to the accomplishment of the student\'s full potential.',
					'At BPIT, we train our students to think creatively and engulf articulation, novelty and teamwork. To educate professional courses and develop a student\'s career and personality, BPIT offers devoted and knowledgeable experts.',
					'Besides a wonderful infrastructure, the students live in an aura that has been greatly enriched by a dedicated teaching faculty. The motive of our institute is to develop a worldwide perspective to cope-up with the fast-changing technological scenario.',
					'In addition, values with discipline are the hallmark of our college. His financial stewardship ensures the institute\'s sustainable growth and development.'
				],
				delay: 1.0,
				image: '/management/sanjeev-sharma.jpg',
				iconColor: 'text-red-600',
				bgColor: 'bg-red-50'
			}
		],
		vision: {
			title: 'Our Leadership Vision',
			quote: 'To build a world-class institution that nurtures innovative minds, fosters cutting-edge research, and produces skilled engineers who contribute meaningfully to society and industry.',
			delay: 0.6,
			icon: 'target',
			iconColor: 'text-blue-600',
			bgColor: 'bg-blue-50'
		}
	};
}

// Leadership Team Interface
export interface LeadershipTeamData {
	hero: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
		iconColor: string;
		textColor: string;
	};
	leaders: Array<{
		id: string;
		name: string;
		position: string;
		icon: string;
		iconColor: string;
		iconTextColor: string;
		textColor: string;
		details: Array<{
			icon: string;
			text: string;
		}>;
		description: string;
	}>;
}

const LEADERSHIP_TEAM_SLUG = 'leadership-team';

export async function getLeadershipTeam(slug = LEADERSHIP_TEAM_SLUG): Promise<LeadershipTeamData> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug },
			include: {
				components: {
					where: {
						key: 'LEADERSHIP_TEAM_DATA'
					},
					orderBy: { order: 'asc' },
					take: 1
				}
			}
		});

		if (!page || !page.components[0]) {
			console.log('No leadership team data found in DB, returning default data');
			return getDefaultLeadershipTeamData();
		}

		console.log('Retrieved leadership team data from DB:', JSON.stringify(page.components[0].data, null, 2));
		return page.components[0].data as unknown as LeadershipTeamData;
	} catch (error) {
		console.error('Error fetching leadership team data:', error);
		return getDefaultLeadershipTeamData();
	}
}

export async function updateLeadershipTeam(data: LeadershipTeamData, slug = LEADERSHIP_TEAM_SLUG) {
	try {
		console.log('Updating leadership team data:', JSON.stringify(data, null, 2));
		
		// Ensure page exists
		let page = await prisma.page.findUnique({
			where: { slug }
		});

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Leadership Team',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		// Update or create component
		const existingComponent = await prisma.component.findFirst({
			where: {
				pageId: page.id,
				key: 'LEADERSHIP_TEAM_DATA'
			}
		});

		if (existingComponent) {
			await prisma.component.update({
				where: { id: existingComponent.id },
				data: {
					data: data as any,
				}
			});
		} else {
			await prisma.component.create({
				data: {
					pageId: page.id,
					key: 'LEADERSHIP_TEAM_DATA',
					data: data as any,
					order: 0
				}
			});
		}

		revalidatePath(`/management/leadership-team`);
		revalidatePath(`/admin/management`);
		
		console.log('Leadership team data updated successfully');
		return { success: true };
	} catch (error) {
		console.error('Error updating leadership team data:', error);
		throw new Error('Failed to update leadership team data');
	}
}

function getDefaultLeadershipTeamData(): LeadershipTeamData {
	return {
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
				description: 'Leading the institution with a vision for academic excellence and innovation in engineering education.'
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
				description: 'Supporting academic initiatives and fostering a culture of continuous improvement.'
			},
			{
				id: 'dean-academics',
				name: 'Dr. [Dean Name]',
				position: 'Dean (Academics)',
				icon: 'BookOpen',
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
						text: '18+ years of experience'
					},
					{
						icon: 'Mail',
						text: 'dean.academics@bpitindia.com'
					}
				],
				description: 'Overseeing academic programs and ensuring quality education delivery.'
			},
			{
				id: 'dean-admin',
				name: 'Dr. [Admin Dean Name]',
				position: 'Dean (Administration)',
				icon: 'Settings',
				iconColor: 'bg-purple-100',
				iconTextColor: 'text-purple-600',
				textColor: 'text-purple-600',
				details: [
					{
						icon: 'GraduationCap',
						text: 'Ph.D. in [Field], [University]'
					},
					{
						icon: 'Calendar',
						text: '14+ years of experience'
					},
					{
						icon: 'Mail',
						text: 'dean.admin@bpitindia.com'
					}
				],
				description: 'Managing administrative operations and institutional policies.'
			}
		]
	};
}

// Governance Structure interfaces and functions
export interface GovernanceStructureData {
	hero: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
		iconColor: string;
		textColor: string;
	};
	sections: Array<{
		id: string;
		title: string;
		icon: string;
		iconColor: string;
		description: string;
		cards: Array<{
			title: string;
			bgColor: string;
			textColor: string;
			listColor: string;
			items: string[];
		}>;
	}>;
}

export async function getGovernanceStructure(slug = 'governance-structure'): Promise<GovernanceStructureData> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug },
			include: {
				components: {
					where: {
						key: 'GOVERNANCE_STRUCTURE_DATA'
					},
					orderBy: { order: 'asc' },
					take: 1
				}
			}
		});

		if (!page || !page.components[0]) {
			console.log('No governance structure data found in DB, returning default data');
			return getDefaultGovernanceStructureData();
		}

		console.log('Retrieved governance structure data from DB:', JSON.stringify(page.components[0].data, null, 2));
		return page.components[0].data as unknown as GovernanceStructureData;
	} catch (error) {
		console.error('Error fetching governance structure data:', error);
		return getDefaultGovernanceStructureData();
	}
}

export async function updateGovernanceStructure(data: GovernanceStructureData, slug = 'governance-structure') {
	try {
		console.log('Updating governance structure data:', JSON.stringify(data, null, 2));
		
		// Ensure page exists
		let page = await prisma.page.findUnique({
			where: { slug }
		});

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Governance Structure',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		// Upsert the governance structure component
		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 1
				}
			},
			update: {
				data: data as any,
				key: 'GOVERNANCE_STRUCTURE_DATA'
			},
			create: {
				pageId: page.id,
				data: data as any,
				order: 1,
				key: 'GOVERNANCE_STRUCTURE_DATA'
			}
		});

		revalidatePath('/management/governance-structure');
		revalidatePath('/admin/management');
	} catch (error) {
		console.error('Error updating governance structure data:', error);
		throw error;
	}
}

function getDefaultGovernanceStructureData(): GovernanceStructureData {
	return {
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
				description: 'The Board of Governors provides strategic oversight and policy direction for the institution.',
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
					}
				]
			}
		]
	};
}

// Policies & Procedures interfaces and functions
export interface PoliciesProceduresData {
	hero: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
		iconColor: string;
		textColor: string;
	};
	policyCategories: Array<{
		id: string;
		title: string;
		icon: string;
		iconColor: string;
		bulletColor: string;
		policies: string[];
	}>;
	implementationFramework: {
		title: string;
		steps: Array<{
			id: string;
			title: string;
			description: string;
			icon: string;
			iconColor: string;
			iconTextColor: string;
		}>;
	};
}

export async function getPoliciesProcedures(slug = 'policies-procedures'): Promise<PoliciesProceduresData> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug },
			include: {
				components: {
					where: {
						key: 'POLICIES_PROCEDURES_DATA'
					},
					orderBy: { order: 'asc' },
					take: 1
				}
			}
		});

		if (!page || !page.components[0]) {
			console.log('No policies procedures data found in DB, returning default data');
			return getDefaultPoliciesProceduresData();
		}

		console.log('Retrieved policies procedures data from DB:', JSON.stringify(page.components[0].data, null, 2));
		return page.components[0].data as unknown as PoliciesProceduresData;
	} catch (error) {
		console.error('Error fetching policies procedures data:', error);
		return getDefaultPoliciesProceduresData();
	}
}

export async function updatePoliciesProcedures(data: PoliciesProceduresData, slug = 'policies-procedures') {
	try {
		console.log('Updating policies procedures data:', JSON.stringify(data, null, 2));
		
		// Ensure page exists
		let page = await prisma.page.findUnique({
			where: { slug }
		});

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Policies & Procedures',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		// Upsert the policies procedures component
		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 1
				}
			},
			update: {
				data: data as any,
				key: 'POLICIES_PROCEDURES_DATA'
			},
			create: {
				pageId: page.id,
				data: data as any,
				order: 1,
				key: 'POLICIES_PROCEDURES_DATA'
			}
		});

		revalidatePath('/management/policies-procedures');
		revalidatePath('/admin/management');
	} catch (error) {
		console.error('Error updating policies procedures data:', error);
		throw error;
	}
}

function getDefaultPoliciesProceduresData(): PoliciesProceduresData {
	return {
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
					'Anti-Ragging Policy'
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
				}
			]
		}
	};
}