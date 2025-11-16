'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface YearStats {
	placementRate: number;
	totalStudents: number;
	studentsPlaced: number;
	companiesVisited: number;
	highestPackage: number;
	averagePackage: number;
	medianPackage: number;
}

export interface DepartmentStat {
	placed: number;
	total: number;
	avgPackage: number;
	highest: number;
	companies: number;
}

export interface PackageDistribution {
	range: string;
	count: number;
	percentage: number;
}

export interface SectorWiseData {
	sector: string;
	percentage: number;
	companies: string[];
	color: string;
}

export interface YearlyTrend {
	year: string;
	rate: number;
	avg: number;
	companies: number;
}

export interface StudentPlacement {
	name: string;
	department: string;
	company: string;
	package: number;
	batch: string;
	role: string;
}

export interface PlacementStatisticsData {
	hero?: {
		icon?: string;
		title?: string;
		subtitle?: string;
		gradient?: string;
	};
	years?: string[];
	departments?: string[];
	overallStats?: Record<string, YearStats>;
	departmentStats?: Record<string, Record<string, DepartmentStat>>;
	packageDistribution?: PackageDistribution[];
	sectorWiseData?: SectorWiseData[];
	yearlyTrends?: YearlyTrend[];
	studentPlacements?: StudentPlacement[];
}

export async function getPlacementStatistics(): Promise<PlacementStatisticsData | null> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug: 'placement-statistics' },
			include: {
				components: {
					orderBy: { order: 'asc' }
				}
			}
		});

		if (!page || page.components.length === 0) {
			return null;
		}

		return page.components[0].data as PlacementStatisticsData;
	} catch (error) {
		console.error('Error fetching placement statistics:', error);
		return null;
	}
}

export async function updatePlacementStatistics(
	data: PlacementStatisticsData
): Promise<{ success: boolean; error?: string }> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug: 'placement-statistics' },
			include: {
				components: true
			}
		});

		if (!page) {
			return { success: false, error: 'Page not found' };
		}

		if (page.components.length > 0) {
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
					order: 0,
					data: data as any
				}
			});
		}

		revalidatePath('/placements/statistics');
		revalidatePath('/admin/placements/statistics');

		return { success: true };
	} catch (error) {
		console.error('Error updating placement statistics:', error);
		return { success: false, error: 'Failed to update placement statistics' };
	}
}
