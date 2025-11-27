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
					orderBy: { order: 'asc' },
					take: 1
				}
			}
		});

		if (!page || !page.components[0]?.data) {
			console.error('Internships data not found');
			return null;
		}

		const rawData = page.components[0].data as any;
		
		// Validate and provide defaults
		return {
			hero: rawData.hero || {
				icon: 'Briefcase',
				title: 'Internship Opportunities',
				subtitle: 'Gain practical experience',
				gradient: 'from-blue-600 to-blue-800'
			},
			stats: Array.isArray(rawData.stats) ? rawData.stats : [],
			benefits: Array.isArray(rawData.benefits) ? rawData.benefits : [
				{
					icon: 'Briefcase',
					title: 'Real-World Experience',
					description: 'Work on live projects and gain practical industry experience',
					color: 'from-blue-600 to-cyan-600'
				},
				{
					icon: 'Users',
					title: 'Industry Mentorship',
					description: 'Learn from experienced professionals and industry leaders',
					color: 'from-purple-600 to-pink-600'
				},
				{
					icon: 'Award',
					title: 'Skill Development',
					description: 'Enhance technical and soft skills through practical application',
					color: 'from-green-600 to-emerald-600'
				},
				{
					icon: 'TrendingUp',
					title: 'Career Growth',
					description: 'Build your resume and increase job prospects',
					color: 'from-orange-600 to-red-600'
				}
			],
			filters: Array.isArray(rawData.filters) ? rawData.filters : ['All'],
			opportunities: Array.isArray(rawData.opportunities) ? rawData.opportunities : [],
			process: Array.isArray(rawData.process) ? rawData.process : [],
			contact: rawData.contact || {
				title: 'Need Guidance?',
				subtitle: 'Contact us for more information',
				phone: '+91 11 2778 1200',
				email: 'info@bpitindia.edu.in',
				buttons: [],
				gradient: 'from-blue-600 to-cyan-600'
			}
		};
	} catch (error) {
		console.error('Error fetching internships data:', error);
		return null;
	}
}

/**
 * Update internships data in database
 */
export async function updateInternshipsData(
	data: InternshipsData
): Promise<{ success: boolean; message?: string }> {
	try {
		// Validate required fields
		if (!data.hero || !data.hero.title) {
			return { success: false, message: 'Hero data is required' };
		}

		const page = await prisma.page.findUnique({
			where: { slug: 'internships' },
			include: {
				components: {
					where: { key: 'internships-data' },
					take: 1
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
				data: { 
					data: data as any,
					updatedAt: new Date()
				}
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

		// Revalidate the page
		revalidatePath('/placements/internships');
		revalidatePath('/admin/placements/internships');

		return { success: true };
	} catch (error) {
		console.error('Error updating internships data:', error);
		return { success: false, message: 'Failed to update data' };
	}
}
