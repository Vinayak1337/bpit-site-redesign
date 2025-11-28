'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const PLACEMENT_OVERVIEW_SLUG = 'placement-overview';

// TypeScript Interfaces
export interface PlacementOverviewHeroData {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
	iconColor: string;
	textColor: string;
}

export interface PlacementStatData {
	icon: string;
	value: string;
	label: string;
	iconColor: string;
	textColor: string;
}

export interface PlacementFeatureData {
	id: string;
	icon: string;
	title: string;
	description: string;
	color: string;
	iconColor: string;
	textColor: string;
}

export interface PlacementTeamMemberData {
	id: string;
	name: string;
	position: string;
	email: string;
	initials: string;
	gradientColor: string;
	textColor: string;
	image?: string;
}

export interface PlacementTrainingAreaData {
	id: string;
	title: string;
	skills: string[];
	icon: string;
	iconColor: string;
	textColor: string;
}

export interface PlacementAchievementData {
	id: string;
	title: string;
	description: string;
	icon: string;
	highlight: string;
	category: string;
	department: string;
	iconColor: string;
	categoryColor: string;
	highlightColor: string;
}

export interface PlacementHighlightData {
	id: string;
	department: string;
	maxPackage: string;
	avgPackage: string;
	color: string;
	initials: string;
}

export interface PlacementContactData {
	icon: string;
	title: string;
	value: string;
	iconColor: string;
	textColor: string;
}

export interface PlacementOverviewData {
	hero: PlacementOverviewHeroData;
	stats: PlacementStatData[];
	missionTitle: string;
	missionDescription: string;
	missionContent: {
		paragraph1: string;
		paragraph2: string;
		features: string[];
		objectives: string[];
	};
	servicesTitle: string;
	servicesDescription: string;
	features: PlacementFeatureData[];
	teamTitle: string;
	teamDescription: string;
	teamMembers: PlacementTeamMemberData[];
	trainingTitle: string;
	trainingDescription: string;
	trainingAreas: PlacementTrainingAreaData[];
	achievementsTitle: string;
	achievementsDescription: string;
	achievements: PlacementAchievementData[];
	highlightsTitle: string;
	highlightsDescription: string;
	highlights: PlacementHighlightData[];
	contactTitle: string;
	contactDescription: string;
	contacts: PlacementContactData[];
	contactButtonText: string;
}

// Normalization function
function normalizePlacementOverview(values: any): PlacementOverviewData {
	return {
		hero: values.hero || {},
		stats: values.stats || [],
		missionTitle: values.missionTitle || '',
		missionDescription: values.missionDescription || '',
		missionContent: values.missionContent || {
			paragraph1: '',
			paragraph2: '',
			features: [],
			objectives: []
		},
		servicesTitle: values.servicesTitle || '',
		servicesDescription: values.servicesDescription || '',
		features: values.features || [],
		teamTitle: values.teamTitle || '',
		teamDescription: values.teamDescription || '',
		teamMembers: values.teamMembers || [],
		trainingTitle: values.trainingTitle || '',
		trainingDescription: values.trainingDescription || '',
		trainingAreas: values.trainingAreas || [],
		achievementsTitle: values.achievementsTitle || '',
		achievementsDescription: values.achievementsDescription || '',
		achievements: values.achievements || [],
		highlightsTitle: values.highlightsTitle || '',
		highlightsDescription: values.highlightsDescription || '',
		highlights: values.highlights || [],
		contactTitle: values.contactTitle || '',
		contactDescription: values.contactDescription || '',
		contacts: values.contacts || [],
		contactButtonText: values.contactButtonText || ''
	};
}

// Database Functions
export async function getPlacementOverview(): Promise<PlacementOverviewData> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug: PLACEMENT_OVERVIEW_SLUG },
			include: {
				components: {
					where: { key: 'PLACEMENT_OVERVIEW' }
				}
			}
		});

		if (!page || !page.components.length) {
			throw new Error('Placement overview data not found');
		}

		const component = page.components[0];
		return normalizePlacementOverview(component.data);
	} catch (error) {
		console.error('Error fetching placement overview data:', error);
		throw error;
	}
}

export async function updatePlacementOverview(pageSlug: string, data: PlacementOverviewData): Promise<void> {
	try {
		// Find or create the page
		const page = await prisma.page.upsert({
			where: { slug: pageSlug },
			update: {},
			create: {
				slug: pageSlug,
				title: 'Placement Overview',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});

		// Find or create the component
		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 0
				}
			},
			update: {
				data: data as any,
				key: 'PLACEMENT_OVERVIEW'
			},
			create: {
				pageId: page.id,
				key: 'PLACEMENT_OVERVIEW',
				data: data as any,
				order: 0
			}
		});

		revalidatePath('/placements/overview');
	} catch (error) {
		console.error('Error updating placement overview data:', error);
		throw error;
	}
}