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
			throw new Error('MANAGEMENT_DATA not seeded — run `npm run seed management`');
		}

		return page.components[0].data as unknown as ManagementData;
	} catch (error) {
		console.error('Error fetching management data:', error);
		throw error;
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
		image?: string;
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
			throw new Error('LEADERSHIP_TEAM_DATA not seeded — run `npm run seed leadership`');
		}

		return page.components[0].data as unknown as LeadershipTeamData;
	} catch (error) {
		console.error('Error fetching leadership team data:', error);
		throw error;
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
			throw new Error('GOVERNANCE_STRUCTURE_DATA not seeded — run `npm run seed governance`');
		}

		return page.components[0].data as unknown as GovernanceStructureData;
	} catch (error) {
		console.error('Error fetching governance structure data:', error);
		throw error;
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
			throw new Error('POLICIES_PROCEDURES_DATA not seeded — run `npm run seed governance`');
		}

		return page.components[0].data as unknown as PoliciesProceduresData;
	} catch (error) {
		console.error('Error fetching policies procedures data:', error);
		throw error;
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

