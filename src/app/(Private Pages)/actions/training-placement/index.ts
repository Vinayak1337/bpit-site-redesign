'use server';
import 'server-only';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

export interface TeamMember {
	id?: string;
	name: string;
	position: string;
	qualifications: string;
	specialization: string;
	image?: string;
}

export interface Department {
	id?: string;
	name: string;
	code: string;
	coordinator: string;
	companies: string;
	avgPackage: string;
	placementRate: string;
}

export interface TrainingProgram {
	id?: string;
	title: string;
	description: string;
	duration: string;
	participants: string;
	icon: string;
	color: string;
}

export interface Objective {
	id?: string;
	title: string;
	description: string;
	icon: string;
}

export interface Statistic {
	id?: string;
	number: string;
	label: string;
	sublabel: string;
}

export interface TrainingPlacementData {
	hero?: {
		icon: string;
		title: string;
		subtitle: string;
		gradient: string;
		iconColor: string;
		textColor: string;
	};
	directorMessage?: {
		name: string;
		position: string;
		initials: string;
		gradientColor: string;
		message1: string;
		message2: string;
		image?: string;
	};
	teamTitle?: string;
	teamDescription?: string;
	teamMembers?: TeamMember[];
	departmentsTitle?: string;
	departmentsDescription?: string;
	departments?: Department[];
	trainingTitle?: string;
	trainingDescription?: string;
	trainingPrograms?: TrainingProgram[];
	objectivesTitle?: string;
	objectivesDescription?: string;
	objectives?: Objective[];
	statisticsTitle?: string;
	statisticsDescription?: string;
	statistics?: Statistic[];
}

export async function getTrainingPlacement(): Promise<TrainingPlacementData | null> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug: 'training-placement' },
			include: {
				components: {
					orderBy: { order: 'asc' }
				}
			}
		});

		if (!page || page.components.length === 0) {
			return null;
		}

		const component = page.components[0];
		return component.data as TrainingPlacementData;
	} catch (error) {
		console.error('Error fetching training placement data:', error);
		return null;
	}
}

export async function updateTrainingPlacement(
	data: TrainingPlacementData
): Promise<{ success: boolean; error?: string }> {
	try {
		await requireAdmin();
		const page = await prisma.page.findUnique({
			where: { slug: 'training-placement' },
			include: { components: true }
		});

		if (!page) {
			return { success: false, error: 'Page not found' };
		}

		if (page.components.length > 0) {
			await prisma.component.update({
				where: { id: page.components[0].id },
				data: {
					data: data as unknown as import('@prisma/client').Prisma.InputJsonValue,
					updatedAt: new Date()
				}
			});
		} else {
			await prisma.component.create({
				data: {
					pageId: page.id,
					order: 0,
					data: data as unknown as import('@prisma/client').Prisma.InputJsonValue
				}
			});
		}

		revalidatePath('/placements/training-placement');
		revalidatePath('/admin/placements/training-placement');

		return { success: true };
	} catch (error) {
		console.error('Error updating training placement data:', error);
		return { success: false, error: 'Failed to update data' };
	}
}
