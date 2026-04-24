'use server';
import 'server-only';

import { z } from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

// --- Schemas ---

const heroSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1), // Changed from subtitle to description to match data
	gradient: z.string().optional(),
	icon: z.string().optional(),
	borderColor: z.string().optional(),
	iconBg: z.string().optional()
});

const committeeSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1),
	href: z.string().min(1),
	// key is an internal routing constant — preserved from stored data, not editable by admins
	key: z.string().optional().default('')
});

const memberSchema = z.object({
	name: z.string().min(1),
	designation: z.string().min(1),
	department: z.string().min(1),
	qualification: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional()
});

const simpleCardSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1)
});

// IQAC Schemas
const iqacAboutSchema = z.object({
	title: z.string().min(1),
	content: z.array(z.string().min(1)),
	vision: z.string().min(1),
	mission: z.string().min(1)
});

const aqarReportSchema = z.object({
	year: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	buttonText: z.string().min(1),
	buttonColor: z.string().min(1)
});

const iqacSchema = z.object({
	hero: heroSchema,
	about: iqacAboutSchema,
	objectives: z.array(simpleCardSchema),
	functions: z.array(z.string().min(1)),
	committeeMembers: z.array(memberSchema),
	initiatives: z.array(simpleCardSchema),
	aqar: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		reports: z.array(aqarReportSchema)
	})
});

// Anti-Ragging Schemas
const antiRaggingSchema = z.object({
	hero: heroSchema,
	definition: z.object({
		title: z.string().min(1),
		content: z.string().min(1),
		includes: z.array(z.string().min(1))
	}),
	committeeMembers: z.array(memberSchema),
	preventiveMeasures: z.array(simpleCardSchema),
	punishments: z.array(z.string().min(1)),
	emergencyContacts: z.array(
		z.object({
			title: z.string().min(1),
			contact: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1),
			bgColor: z.string().min(1)
		})
	)
});

// Internal Complaints Schemas
const stepSchema = z.object({
	step: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1)
});

const internalComplaintsSchema = z.object({
	hero: heroSchema,
	definition: z.object({
		title: z.string().min(1),
		content: z.string().min(1),
		includes: z.array(z.string().min(1))
	}),
	committeeMembers: z.array(memberSchema),
	procedures: z.array(stepSchema),
	supportServices: z.array(simpleCardSchema),
	rightsAndResponsibilities: z.object({
		rights: z.array(z.string().min(1)),
		responsibilities: z.array(z.string().min(1))
	}),
	contactInfo: z.array(
		z.object({
			title: z.string().min(1),
			contact: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1),
			bgColor: z.string().min(1)
		})
	)
});

// Overview Schema
const overviewSchema = z.object({
	hero: z.object({
		title: z.string().min(1),
		description: z.string().min(1)
	}),
	committees: z.array(committeeSchema)
});

export type StatutoryOverviewData = z.infer<typeof overviewSchema>;
export type IqacData = z.infer<typeof iqacSchema>;
export type AntiRaggingData = z.infer<typeof antiRaggingSchema>;
export type InternalComplaintsData = z.infer<typeof internalComplaintsSchema>;

// --- Actions ---

export async function getStatutoryOverview(slug = 'statutory-committees'): Promise<StatutoryOverviewData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) return getDefaultOverviewData();

				const component = page.components.find(
					c => c.key === 'STATUTORY_OVERVIEW_DATA'
				);

				if (!component) return getDefaultOverviewData();

				return component.data as unknown as StatutoryOverviewData;
			} catch (error) {
				console.error('Error fetching statutory overview data:', error);
				return getDefaultOverviewData();
			}
		},
		[`statutory-overview-${slug}`],
		{ tags: [`statutory-overview-${slug}`], revalidate: 3600 }
	)();
}

export async function updateStatutoryOverview(data: StatutoryOverviewData, slug = 'statutory-committees') {
	try {
		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Statutory Committees', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: data as unknown as import('@prisma/client').Prisma.InputJsonValue, key: 'STATUTORY_OVERVIEW_DATA' },
			create: { pageId: page.id, data: data as unknown as import('@prisma/client').Prisma.InputJsonValue, order: 1, key: 'STATUTORY_OVERVIEW_DATA' }
		});

		revalidatePath('/statutory-committees');
		revalidatePath('/admin/statutory-committees');
	} catch (error) {
		console.error('Error updating statutory overview data:', error);
		throw error;
	}
}

export async function getIqac(slug = 'statutory-committees-iqac'): Promise<IqacData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) return getDefaultIqacData();

				const component = page.components.find(c => c.key === 'IQAC_DATA');

				if (!component) return getDefaultIqacData();

				return component.data as unknown as IqacData;
			} catch (error) {
				console.error('Error fetching IQAC data:', error);
				return getDefaultIqacData();
			}
		},
		[`iqac-${slug}`],
		{ tags: [`iqac-${slug}`], revalidate: 3600 }
	)();
}

export async function updateIqac(data: IqacData, slug = 'statutory-committees-iqac') {
	try {
		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'IQAC', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: data as any, key: 'IQAC_DATA' },
			create: { pageId: page.id, data: data as any, order: 1, key: 'IQAC_DATA' }
		});

		revalidatePath('/statutory-committees/iqac');
		revalidatePath('/admin/statutory-committees/iqac');
	} catch (error) {
		console.error('Error updating IQAC data:', error);
		throw error;
	}
}

export async function getAntiRagging(slug = 'statutory-committees-anti-ragging'): Promise<AntiRaggingData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) return getDefaultAntiRaggingData();

				const component = page.components.find(c => c.key === 'ANTI_RAGGING_DATA');

				if (!component) return getDefaultAntiRaggingData();

				return component.data as unknown as AntiRaggingData;
			} catch (error) {
				console.error('Error fetching anti-ragging data:', error);
				return getDefaultAntiRaggingData();
			}
		},
		[`anti-ragging-${slug}`],
		{ tags: [`anti-ragging-${slug}`], revalidate: 3600 }
	)();
}

export async function updateAntiRagging(data: AntiRaggingData, slug = 'statutory-committees-anti-ragging') {
	try {
		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Anti-Ragging', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: data as any, key: 'ANTI_RAGGING_DATA' },
			create: { pageId: page.id, data: data as any, order: 1, key: 'ANTI_RAGGING_DATA' }
		});

		revalidatePath('/statutory-committees/anti-ragging');
		revalidatePath('/admin/statutory-committees/anti-ragging');
	} catch (error) {
		console.error('Error updating anti-ragging data:', error);
		throw error;
	}
}

export async function getInternalComplaints(slug = 'statutory-committees-internal-complaints'): Promise<InternalComplaintsData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) return getDefaultInternalComplaintsData();

				const component = page.components.find(
					c => c.key === 'INTERNAL_COMPLAINTS_DATA'
				);

				if (!component) return getDefaultInternalComplaintsData();

				return component.data as unknown as InternalComplaintsData;
			} catch (error) {
				console.error('Error fetching internal complaints data:', error);
				return getDefaultInternalComplaintsData();
			}
		},
		[`internal-complaints-${slug}`],
		{ tags: [`internal-complaints-${slug}`], revalidate: 3600 }
	)();
}

export async function updateInternalComplaints(data: InternalComplaintsData, slug = 'statutory-committees-internal-complaints') {
	try {
		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Internal Complaints', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: data as any, key: 'INTERNAL_COMPLAINTS_DATA' },
			create: { pageId: page.id, data: data as any, order: 1, key: 'INTERNAL_COMPLAINTS_DATA' }
		});

		revalidatePath('/statutory-committees/internal-complaints');
		revalidatePath('/admin/statutory-committees/internal-complaints');
	} catch (error) {
		console.error('Error updating internal complaints data:', error);
		throw error;
	}
}

// --- Default Data Functions (Copied from src/data/statutory-committees.ts) ---

function getDefaultOverviewData(): StatutoryOverviewData {
	return {
		hero: {
			title: 'Statutory Committees',
			description:
				'BPIT is committed to maintaining the highest standards of education, safety, and governance through our comprehensive statutory committees that ensure regulatory compliance and student welfare.'
		},
		committees: [
			{
				title: 'Internal Quality Assurance Cell (IQAC)',
				description:
					'Ensures quality enhancement and sustenance in all academic and administrative activities.',
				icon: 'CheckCircle',
				iconColor: 'text-blue-600',
				href: '/statutory-committees/iqac',
				key: 'iqac'
			},
			{
				title: 'Anti-Ragging Committee',
				description:
					'Prevents ragging incidents and ensures a safe environment for all students.',
				icon: 'UserX',
				iconColor: 'text-red-600',
				href: '/statutory-committees/anti-ragging',
				key: 'anti-ragging'
			},
			{
				title: 'Internal Complaints Committee',
				description:
					'Addresses complaints related to sexual harassment and ensures a respectful workplace.',
				icon: 'Users',
				iconColor: 'text-purple-600',
				href: '/statutory-committees/internal-complaints',
				key: 'internal-complaints'
			},
			{
				title: 'Student Welfare Committee',
				description:
					'Focuses on student well-being and addresses various welfare-related concerns.',
				icon: 'Heart',
				iconColor: 'text-pink-600',
				href: '/statutory-committees/student-welfare',
				key: 'student-welfare'
			},
			{
				title: 'Grievance Redressal Cell',
				description:
					'Provides a platform for students and staff to raise and resolve grievances.',
				icon: 'Eye',
				iconColor: 'text-orange-600',
				href: '/statutory-committees/grievance-redressal',
				key: 'grievance-redressal'
			}
		]
	};
}

function getDefaultIqacData(): IqacData {
	return {
		hero: {
			title: 'Internal Quality Assurance Cell (IQAC)',
			description:
				'Dedicated to ensuring continuous quality improvement and enhancement in all academic and administrative activities at BPIT.',
			icon: 'CheckCircle',
			gradient: 'from-blue-50 to-indigo-50',
			borderColor: 'border-blue-200',
			iconBg: 'bg-blue-600'
		},
		about: {
			title: 'About IQAC',
			content: [
				'The Internal Quality Assurance Cell (IQAC) is a significant and strategic approach towards institutionalizing quality assurance. It was established as per the guidelines of the National Assessment and Accreditation Council (NAAC) for promoting quality culture and improvement in higher education institutions.',
				'IQAC serves as a catalyst for quality enhancement through institutionalizing quality culture and internalization of quality assurance strategies. It acts as a nodal agency for coordinating quality related activities and enhancing the overall quality of the institution.'
			],
			vision:
				'To establish a quality culture that ensures continuous improvement and enhancement in all academic and administrative activities of the institution.',
			mission:
				'To facilitate the creation of a learner-centric environment conducive to quality education and faculty maturation to adopt the required knowledge and technology for participatory teaching and learning process.'
		},
		objectives: [
			{
				title: 'Quality Enhancement',
				description:
					'Ensure the enhancement and coordination of quality-related activities in the institution',
				icon: 'Target',
				iconColor: 'text-blue-600'
			},
			{
				title: 'Quality Assurance',
				description:
					'Develop and apply quality benchmarks and parameters for various academic activities',
				icon: 'CheckCircle',
				iconColor: 'text-green-600'
			},
			{
				title: 'Quality Culture',
				description:
					'Facilitate the creation of a learner-centric environment conducive to quality education',
				icon: 'Users',
				iconColor: 'text-purple-600'
			},
			{
				title: 'Documentation',
				description:
					'Organize inter and intra-institutional workshops, seminars on quality-related themes',
				icon: 'FileText',
				iconColor: 'text-orange-600'
			}
		],
		functions: [
			'Development and application of quality benchmarks for academic and administrative activities',
			'Dissemination of information on various quality parameters to all stakeholders',
			'Organization of workshops, seminars, and conferences on quality-related themes',
			'Documentation of various activities leading to quality improvement',
			'Preparation of Annual Quality Assurance Report (AQAR) for submission to NAAC',
			'Development of quality culture in the institution',
			'Collection and analysis of feedback from students, parents, and employers',
			'Promotion of measures for institutional functioning towards quality enhancement',
			'Coordination with other stakeholders for quality-related activities',
			'Maintenance of institutional database through MIS for the purpose of maintaining quality'
		],
		committeeMembers: [
			{
				name: 'Dr. Rakesh Kumar Sharma',
				designation: 'Chairperson',
				department: 'Principal',
				qualification: 'Ph.D. in Computer Science'
			},
			{
				name: 'Dr. Anita Devi',
				designation: 'Coordinator',
				department: 'Computer Science & Engineering',
				qualification: 'Ph.D. in Computer Science'
			},
            // ... truncated for brevity, user can add more via admin
		],
		initiatives: [
			{
				title: 'Academic Audit',
				description: 'Regular assessment of academic processes and outcomes',
				icon: 'Eye',
				iconColor: 'text-blue-600'
			},
			{
				title: 'Feedback System',
				description: 'Systematic collection and analysis of stakeholder feedback',
				icon: 'BarChart3',
				iconColor: 'text-green-600'
			},
			{
				title: 'Best Practices',
				description:
					'Identification and implementation of institutional best practices',
				icon: 'Award',
				iconColor: 'text-purple-600'
			},
			{
				title: 'Quality Benchmarks',
				description: 'Development and monitoring of quality parameters',
				icon: 'Settings',
				iconColor: 'text-orange-600'
			}
		],
		aqar: {
			title: 'Annual Quality Assurance Report (AQAR)',
			description:
				'The Annual Quality Assurance Report (AQAR) is a comprehensive document that captures the quality initiatives taken by the institution during the academic year. It serves as a self-study report for continuous improvement.',
			reports: [
				{
					year: '2023-24',
					title: 'AQAR 2023-24',
					description: 'Latest annual report',
					buttonText: 'Download PDF',
					buttonColor: 'bg-green-600 hover:bg-green-700'
				},
				{
					year: '2022-23',
					title: 'AQAR 2022-23',
					description: 'Previous year report',
					buttonText: 'Download PDF',
					buttonColor: 'bg-blue-600 hover:bg-blue-700'
				}
			]
		}
	};
}

function getDefaultAntiRaggingData(): AntiRaggingData {
	return {
		hero: {
			title: 'Anti-Ragging Committee',
			description:
				'Committed to maintaining a ragging-free environment and ensuring the safety and well-being of all students at BPIT.',
			icon: 'UserX',
			gradient: 'from-red-50 to-orange-50',
			borderColor: 'border-red-200',
			iconBg: 'bg-red-600'
		},
		definition: {
			title: 'What Constitutes Ragging?',
			content:
				'Ragging means any disorderly conduct, whether by words spoken or written, or by an act which has the effect of teasing, treating or handling with rudeness any student, indulging in rowdy or undisciplined activities which cause or are likely to cause annoyance, hardship or psychological harm or to raise fear or apprehension thereof in a fresher or a junior student.',
			includes: [
				'Any conduct which causes, induces or likely to cause any physical, psychological or physiological harm',
				'Any act of financial extortion or forceful expenditure burden',
				'Any act of physical abuse including all variants of it: sexual abuse, homosexual assaults, stripping, forcing obscene and lewd acts',
				'Any act or abuse by spoken words, emails, post, public insults',
				'Any act that affects the mental health and self-confidence of a fresher or any other student'
			]
		},
		committeeMembers: [
			{
				name: 'Dr. Rakesh Kumar Sharma',
				designation: 'Chairman',
				department: 'Principal',
				phone: '+91-11-2345-6789',
				email: 'principal@bpit.ac.in'
			}
		],
		preventiveMeasures: [
			{
				title: 'Awareness Campaigns',
				description:
					'Regular awareness programs about anti-ragging policies and consequences',
				icon: 'Shield',
				iconColor: 'text-blue-600'
			},
			{
				title: 'Zero Tolerance Policy',
				description:
					'Strict enforcement of zero tolerance towards any form of ragging',
				icon: 'AlertTriangle',
				iconColor: 'text-red-600'
			}
		],
		punishments: [
			'Suspension from attending classes and academic privileges',
			'Withholding/withdrawing scholarship/fellowship and other benefits',
			'Debarring from appearing in any test/examination',
			'Withholding results'
		],
		emergencyContacts: [
			{
				title: 'Anti-Ragging Helpline',
				contact: '1800-180-5522',
				description: '(24x7 Toll-Free)',
				icon: 'Phone',
				iconColor: 'text-red-600',
				bgColor: 'bg-red-100'
			}
		]
	};
}

function getDefaultInternalComplaintsData(): InternalComplaintsData {
	return {
		hero: {
			title: 'Internal Complaints Committee',
			description:
				'Dedicated to preventing and addressing sexual harassment, ensuring a safe and respectful environment for all members of the BPIT community.',
			icon: 'Users',
			gradient: 'from-purple-50 to-pink-50',
			borderColor: 'border-purple-200',
			iconBg: 'bg-purple-600'
		},
		definition: {
			title: 'Sexual Harassment: Definition & Scope',
			content:
				"Sexual harassment is a form of sex discrimination that violates the fundamental right to equality and dignity. It creates a hostile environment that affects an individual's work or academic performance.",
			includes: [
				'Unwelcome sexually determined behavior (whether directly or by implication)',
				'Physical contact and advances',
				'Demand or request for sexual favors'
			]
		},
		committeeMembers: [
			{
				name: 'Dr. Meera Gupta',
				designation: 'Presiding Officer',
				department: 'Computer Science & Engineering',
				phone: '+91-11-2345-6789',
				email: 'meera.gupta@bpit.ac.in'
			}
		],
		procedures: [
			{
				step: '1',
				title: 'File Complaint',
				description:
					'Submit complaint in writing or via email to any committee member',
				icon: 'FileText',
				iconColor: 'text-blue-600'
			}
		],
		supportServices: [
			{
				title: 'Counselling Support',
				description:
					'Professional counselling services for complainants and affected individuals',
				icon: 'Heart',
				iconColor: 'text-pink-600'
			}
		],
		rightsAndResponsibilities: {
			rights: [
				'Right to work and study in an environment free from sexual harassment',
				'Right to file complaints without fear of retaliation'
			],
			responsibilities: [
				'Prompt and fair investigation of all complaints',
				'Maintain confidentiality throughout the process'
			]
		},
		contactInfo: [
			{
				title: 'Helpline',
				contact: '+91-11-2532-3333',
				description: 'Available 24/7',
				icon: 'Phone',
				iconColor: 'text-purple-600',
				bgColor: 'bg-purple-100'
			}
		]
	};
}

