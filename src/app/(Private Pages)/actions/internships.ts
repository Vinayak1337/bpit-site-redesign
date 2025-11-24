'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/audit';

// TypeScript interfaces
export interface InternshipHero {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
}

export interface InternshipStat {
	icon: string;
	value: string;
	label: string;
	color: string;
}

export interface InternshipBenefit {
	icon: string;
	title: string;
	description: string;
	color: string;
}

export interface InternshipOpportunity {
	company: string;
	title: string;
	type: string;
	location: string;
	description: string;
	logo: string;
	category: string;
	domains: string[];
}

export interface ProcessStep {
	title: string;
	description: string;
	icon: string;
}

export interface ContactButton {
	text: string;
	icon: string;
	variant: 'primary' | 'secondary';
}

export interface InternshipContact {
	title: string;
	subtitle: string;
	phone: string;
	email: string;
	buttons: ContactButton[];
	gradient: string;
}

export interface InternshipsData {
	hero: InternshipHero;
	stats: InternshipStat[];
	benefits: InternshipBenefit[];
	filters: string[];
	opportunities: InternshipOpportunity[];
	process: ProcessStep[];
	contact: InternshipContact;
}

/**
 * Get internships data from database
 */
export async function getInternshipsData(): Promise<InternshipsData | null> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug: 'internships' },
			include: {
				components: {
					where: { key: 'internships-data' },
					orderBy: { order: 'asc' }
				}
			}
		});

		if (!page || !page.components[0]) {
			console.error('Internships data not found');
			return null;
		}

		return page.components[0].data as unknown as InternshipsData;
	} catch (error) {
		console.error('Error fetching internships data:', error);
		return null;
	}
}

/**
 * Update internships data in database
 */
export async function updateInternshipsData(
	data: InternshipsData,
	actorId: string
): Promise<{ success: boolean; message?: string }> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug: 'internships' },
			include: {
				components: {
					where: { key: 'internships-data' }
				}
			}
		});

		if (!page) {
			return { success: false, message: 'Page not found' };
		}

		// Update or create component
		if (page.components[0]) {
			await prisma.component.update({
				where: { id: page.components[0].id },
				data: { data: data as any }
			});
		} else {
			await prisma.component.create({
				data: {
					pageId: page.id,
					key: 'internships-data',
					data: data as any,
					order: 0
				}
			});
		}

		// Create audit log
		await createAuditLog({
			actorId,
			action: 'UPDATE',
			resourceType: 'internships' as any,
			summary: `Updated internships data with ${data.opportunities.length} opportunities`,
			changes: [
				{
					resourceId: page.id,
					resourceType: 'PAGE',
					newData: data as any
				}
			]
		});

		// Revalidate the page
		revalidatePath('/placements/internships');

		return { success: true };
	} catch (error) {
		console.error('Error updating internships data:', error);
		return { success: false, message: 'Failed to update data' };
	}
}
