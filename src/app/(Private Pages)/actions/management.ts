'use server';
import 'server-only';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const MANAGEMENT_SLUG = 'management';

// --- Schemas ---

const managementLeaderSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	position: z.string().min(1),
	description: z.array(z.string()),
	delay: z.number().default(0),
	image: z.string().optional(),
	iconColor: z.string().optional(),
	bgColor: z.string().optional()
});

const managementVisionSchema = z.object({
	title: z.string().min(1),
	quote: z.string().min(1),
	delay: z.number().default(0),
	icon: z.string().optional(),
	iconColor: z.string().optional(),
	bgColor: z.string().optional()
});

const managementDataSchema = z.object({
	title: z.string().min(1),
	titleIcon: z.string().optional(),
	titleIconColor: z.string().optional(),
	titleGradient: z.string().optional(),
	leaders: z.array(managementLeaderSchema).default([]),
	vision: managementVisionSchema
});

export type ManagementData = z.infer<typeof managementDataSchema>;

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
			return getDefaultManagementData();
		}

		return page.components[0].data as unknown as ManagementData;
	} catch {
		return getDefaultManagementData();
	}
}

export async function updateManagement(data: ManagementData, slug = MANAGEMENT_SLUG) {
	try {
		const admin = await requireAdmin();
		const validated = managementDataSchema.parse(data);

		let page = await prisma.page.findUnique({ where: { slug } });

		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Management', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: validated as unknown as Prisma.InputJsonValue, key: 'MANAGEMENT_DATA' },
			create: { pageId: page.id, data: validated as unknown as Prisma.InputJsonValue, order: 1, key: 'MANAGEMENT_DATA' }
		});

		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'PAGE',
			summary: 'Updated management page data',
			changes: [{ resourceId: page.id, resourceType: 'PAGE', field: 'MANAGEMENT_DATA', newData: validated as unknown as Prisma.InputJsonValue }]
		});

		revalidatePath('/management');
		revalidatePath('/admin/management');
		revalidateTag('management');

		return { success: true };
	} catch {
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

// --- Leadership Team ---

const leadershipHeroSchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	subtitle: z.string().min(1),
	gradient: z.string().min(1),
	iconColor: z.string().min(1),
	textColor: z.string().min(1)
});

const leaderDetailSchema = z.object({
	icon: z.string().min(1),
	text: z.string().min(1)
});

const leaderSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	position: z.string().min(1),
	image: z.string().optional(),
	icon: z.string().min(1),
	iconColor: z.string().min(1),
	iconTextColor: z.string().min(1),
	textColor: z.string().min(1),
	details: z.array(leaderDetailSchema).default([]),
	description: z.string().min(1)
});

const leadershipTeamSchema = z.object({
	hero: leadershipHeroSchema,
	leaders: z.array(leaderSchema).default([])
});

export type LeadershipTeamData = z.infer<typeof leadershipTeamSchema>;

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
			return getDefaultLeadershipTeamData();
		}

		return page.components[0].data as unknown as LeadershipTeamData;
	} catch {
		return getDefaultLeadershipTeamData();
	}
}

export async function updateLeadershipTeam(data: LeadershipTeamData, slug = LEADERSHIP_TEAM_SLUG) {
	try {
		const admin = await requireAdmin();
		const validated = leadershipTeamSchema.parse(data);

		let page = await prisma.page.findUnique({ where: { slug } });

		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Leadership Team', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		const existingComponent = await prisma.component.findFirst({
			where: { pageId: page.id, key: 'LEADERSHIP_TEAM_DATA' }
		});

		if (existingComponent) {
			await prisma.component.update({
				where: { id: existingComponent.id },
				data: { data: validated as unknown as Prisma.InputJsonValue }
			});
		} else {
			await prisma.component.create({
				data: { pageId: page.id, key: 'LEADERSHIP_TEAM_DATA', data: validated as unknown as Prisma.InputJsonValue, order: 0 }
			});
		}

		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'PAGE',
			summary: 'Updated leadership team data',
			changes: [{ resourceId: page.id, resourceType: 'PAGE', field: 'LEADERSHIP_TEAM_DATA', newData: validated as unknown as Prisma.InputJsonValue }]
		});

		revalidatePath('/management/leadership-team');
		revalidatePath('/admin/management');
		revalidateTag('management');

		return { success: true };
	} catch {
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
				image: '',
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
				image: '',
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
				image: '',
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
				image: '',
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

// --- Governance Structure ---

const govCardSchema = z.object({
	title: z.string().min(1),
	bgColor: z.string().min(1),
	textColor: z.string().min(1),
	listColor: z.string().min(1),
	items: z.array(z.string().min(1)).default([])
});

const govSectionSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1),
	description: z.string().min(1),
	cards: z.array(govCardSchema).default([])
});

const governanceStructureSchema = z.object({
	hero: leadershipHeroSchema,
	sections: z.array(govSectionSchema).default([])
});

export type GovernanceStructureData = z.infer<typeof governanceStructureSchema>;

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
			return getDefaultGovernanceStructureData();
		}

		return page.components[0].data as unknown as GovernanceStructureData;
	} catch {
		return getDefaultGovernanceStructureData();
	}
}

export async function updateGovernanceStructure(data: GovernanceStructureData, slug = 'governance-structure') {
	try {
		const admin = await requireAdmin();
		const validated = governanceStructureSchema.parse(data);

		let page = await prisma.page.findUnique({ where: { slug } });

		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Governance Structure', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: validated as unknown as Prisma.InputJsonValue, key: 'GOVERNANCE_STRUCTURE_DATA' },
			create: { pageId: page.id, data: validated as unknown as Prisma.InputJsonValue, order: 1, key: 'GOVERNANCE_STRUCTURE_DATA' }
		});

		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'PAGE',
			summary: 'Updated governance structure data',
			changes: [{ resourceId: page.id, resourceType: 'PAGE', field: 'GOVERNANCE_STRUCTURE_DATA', newData: validated as unknown as Prisma.InputJsonValue }]
		});

		revalidatePath('/management/governance-structure');
		revalidatePath('/admin/management');
		revalidateTag('management');
	} catch (error) {
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

// --- Policies & Procedures ---

const policyCategorySchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1),
	bulletColor: z.string().min(1),
	policies: z.array(z.string().min(1)).default([])
});

const frameworkStepSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1),
	iconTextColor: z.string().min(1)
});

const policiesProceduresSchema = z.object({
	hero: leadershipHeroSchema,
	policyCategories: z.array(policyCategorySchema).default([]),
	implementationFramework: z.object({
		title: z.string().min(1),
		steps: z.array(frameworkStepSchema).default([])
	})
});

export type PoliciesProceduresData = z.infer<typeof policiesProceduresSchema>;

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
			return getDefaultPoliciesProceduresData();
		}

		return page.components[0].data as unknown as PoliciesProceduresData;
	} catch {
		return getDefaultPoliciesProceduresData();
	}
}

export async function updatePoliciesProcedures(data: PoliciesProceduresData, slug = 'policies-procedures') {
	try {
		const admin = await requireAdmin();
		const validated = policiesProceduresSchema.parse(data);

		let page = await prisma.page.findUnique({ where: { slug } });

		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Policies & Procedures', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: validated as unknown as Prisma.InputJsonValue, key: 'POLICIES_PROCEDURES_DATA' },
			create: { pageId: page.id, data: validated as unknown as Prisma.InputJsonValue, order: 1, key: 'POLICIES_PROCEDURES_DATA' }
		});

		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'PAGE',
			summary: 'Updated policies & procedures data',
			changes: [{ resourceId: page.id, resourceType: 'PAGE', field: 'POLICIES_PROCEDURES_DATA', newData: validated as unknown as Prisma.InputJsonValue }]
		});

		revalidatePath('/management/policies-procedures');
		revalidatePath('/admin/management');
		revalidateTag('management');
	} catch (error) {
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
