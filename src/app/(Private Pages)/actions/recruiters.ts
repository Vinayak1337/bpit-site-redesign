'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { createAuditLog } from '@/lib/audit';

// TypeScript Interfaces
export interface RecruiterHero {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
}

export interface RecruiterStat {
	icon: string;
	value: string;
	label: string;
	color: string;
}

export interface Recruiter {
	name: string;
	logo: string;
	category: string;
	sector: string;
	location: string;
	type: string;
	established: string;
	website: string;
	description: string;
}

export interface CTAButton {
	text: string;
	icon: string;
	variant: 'primary' | 'secondary';
}

export interface RecruiterCTA {
	title: string;
	subtitle: string;
	buttons: CTAButton[];
	gradient: string;
}

export interface RecruitersData {
	hero: RecruiterHero;
	stats: RecruiterStat[];
	categories: string[];
	recruiters: Recruiter[];
	cta: RecruiterCTA;
}

/**
 * Get recruiters data from the database
 */
export async function getRecruitersData(): Promise<RecruitersData | null> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug: 'recruiters' },
			include: {
				components: {
					where: { key: 'recruiters-data' },
					orderBy: { order: 'asc' }
				}
			}
		});

		if (!page || !page.components || page.components.length === 0) {
			return null;
		}

		const component = page.components[0];
		return component.data as unknown as RecruitersData;
	} catch (error) {
		console.error('Error fetching recruiters data:', error);
		throw new Error('Failed to fetch recruiters data');
	}
}

/**
 * Update recruiters data in the database
 */
export async function updateRecruitersData(
	data: RecruitersData,
	actorId: string
): Promise<{ success: boolean; message?: string }> {
	try {
		// Find the page
		const page = await prisma.page.findUnique({
			where: { slug: 'recruiters' },
			include: {
				components: {
					where: { key: 'recruiters-data' }
				}
			}
		});

		if (!page) {
			return { success: false, message: 'Recruiters page not found' };
		}

		// Update or create the component
		if (page.components && page.components.length > 0) {
			const component = page.components[0];
			await prisma.component.update({
				where: { id: component.id },
				data: { data: data as any }
			});
		} else {
			await prisma.component.create({
				data: {
					pageId: page.id,
					key: 'recruiters-data',
					data: data as any,
					order: 0
				}
			});
		}

		// Create audit log
		await createAuditLog({
			actorId,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: `Updated recruiters data with ${data.recruiters.length} companies`
		});

		// Revalidate the public page
		revalidatePath('/placements/recruiters');

		return { success: true };
	} catch (error) {
		console.error('Error updating recruiters data:', error);
		return { success: false, message: 'Failed to update recruiters data' };
	}
}
