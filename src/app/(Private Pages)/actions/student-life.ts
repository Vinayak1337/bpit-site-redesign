'use server';

import { z } from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

// --- Hero Section ---
const heroSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	backgroundImage: z.string().nullable(),
	gradient: z.string().optional().default('from-blue-600 to-purple-600')
});

export type StudentLifeHeroData = z.infer<typeof heroSchema>;

// --- Student Life Overview (Highlights) ---
const highlightSchema = z.object({
	title: z.string(),
	description: z.string(),
	icon: z.string(),
	href: z.string()
});

const overviewSchema = z.object({
    title: z.string(),
    description: z.string(),
	highlights: z.array(highlightSchema)
});

export type StudentLifeOverviewData = z.infer<typeof overviewSchema>;

// --- Campus Facilities ---
const facilityItemSchema = z.object({
	title: z.string(),
	description: z.string(),
	icon: z.string(),
	features: z.array(z.string()),
	image: z.string()
});

const facilitySectionSchema = z.object({
	title: z.string(),
	items: z.array(facilityItemSchema)
});

const campusFacilitiesSchema = z.object({
    title: z.string(),
    description: z.string(),
	sections: z.array(facilitySectionSchema)
});

export type CampusFacilitiesData = z.infer<typeof campusFacilitiesSchema>;

// --- Clubs & Societies ---
const clubSchema = z.object({
	name: z.string(),
	description: z.string(),
	icon: z.string(),
	activities: z.array(z.string()),
	image: z.string()
});

const clubCategorySchema = z.object({
	title: z.string(),
	description: z.string(),
	clubs: z.array(clubSchema)
});

const clubsSocietiesSchema = z.object({
    title: z.string(),
    description: z.string(),
	categories: z.array(clubCategorySchema)
});

export type ClubsSocietiesData = z.infer<typeof clubsSocietiesSchema>;

// --- Events & Festivals ---
const eventSchema = z.object({
	title: z.string(),
	type: z.string(),
	description: z.string(),
	icon: z.string(),
	month: z.string(),
	highlights: z.array(z.string()),
	image: z.string()
});

const eventsFestivalsSchema = z.object({
    title: z.string(),
    description: z.string(),
	events: z.array(eventSchema)
});

export type EventsFestivalsData = z.infer<typeof eventsFestivalsSchema>;

// --- Student Grievance Cell ---
const contactInfoSchema = z.object({
	title: z.string(),
	icon: z.string(),
	details: z.array(z.string()),
	sub: z.string()
});

const processStepSchema = z.object({
	step: z.number(),
	title: z.string(),
	description: z.string()
});

const grievanceCellSchema = z.object({
    title: z.string(),
    description: z.string(),
	processSteps: z.array(processStepSchema),
	contactInfo: z.array(contactInfoSchema)
});

export type GrievanceCellData = z.infer<typeof grievanceCellSchema>;

// --- Code of Conduct ---
const conductRuleSectionSchema = z.object({
	category: z.string(),
	icon: z.string(),
	rules: z.array(z.string())
});

const codeOfConductSchema = z.object({
    title: z.string(),
    description: z.string(),
	sections: z.array(conductRuleSectionSchema)
});

export type CodeOfConductData = z.infer<typeof codeOfConductSchema>;

// --- Generic Get/Update Functions ---

async function getComponentData<T>(slug: string, key: string, defaultData: T): Promise<T> {
    return unstable_cache(
        async () => {
            try {
                const page = await prisma.page.findUnique({
                    where: { slug },
                    include: { components: true }
                });
                if (!page) return defaultData;
                const component = page.components.find(c => c.key === key);
                if (!component) return defaultData;
                return component.data as unknown as T;
            } catch (error) {
                console.error(`Error fetching ${key} for ${slug}:`, error);
                return defaultData;
            }
        },
        [`${slug}-${key}`],
        { tags: [`${slug}-${key}`], revalidate: 3600 }
    )();
}

async function updateComponentData<T>(slug: string, key: string, data: T, schema: z.ZodType<T>) {
    await requireAdmin();
    try {
        const parsedData = schema.parse(data);
        let page = await prisma.page.findUnique({ where: { slug } });
        if (!page) {
            page = await prisma.page.create({
                data: { slug, title: slug, kind: 'PAGE', status: 'PUBLISHED' }
            });
        }
        await prisma.component.upsert({
            where: { pageId_order: { pageId: page.id, order: getOrderForKey(key) } },
            update: { data: parsedData as any, key },
            create: { pageId: page.id, data: parsedData as any, order: getOrderForKey(key), key }
        });
        revalidatePath('/student-life');
        revalidatePath(`/student-life/${slug.replace('student-life-', '')}`);
        revalidatePath('/admin/student-life');
        return { ok: true };
    } catch (error) {
        console.error(`Error updating ${key} for ${slug}:`, error);
        return { ok: false, error: `Failed to update ${key}` };
    }
}

function getOrderForKey(key: string): number {
    const orders: Record<string, number> = {
        'HERO': 0,
        'OVERVIEW': 1,
        'FACILITIES': 2,
        'CLUBS': 3,
        'EVENTS': 4,
        'GRIEVANCE': 5,
        'CONDUCT': 6
    };
    return orders[key] || 10;
}

// --- Specific Exports ---

// Hero
export async function getStudentLifeHero(slug = 'student-life') {
    return getComponentData(slug, 'HERO', getDefaultHeroData());
}
export async function updateStudentLifeHero(slug: string, data: StudentLifeHeroData) {
    return updateComponentData(slug, 'HERO', data, heroSchema);
}

// Overview
export async function getStudentLifeOverview(slug = 'student-life') {
    return getComponentData(slug, 'OVERVIEW', getDefaultOverviewData());
}
export async function updateStudentLifeOverview(slug: string, data: StudentLifeOverviewData) {
    return updateComponentData(slug, 'OVERVIEW', data, overviewSchema);
}

// Facilities
export async function getCampusFacilities(slug = 'student-life-campus-facilities') {
    return getComponentData(slug, 'FACILITIES', getDefaultFacilitiesData());
}
export async function updateCampusFacilities(slug: string, data: CampusFacilitiesData) {
    return updateComponentData(slug, 'FACILITIES', data, campusFacilitiesSchema);
}

// Clubs
export async function getClubsSocieties(slug = 'student-life-clubs-and-societies') {
    return getComponentData(slug, 'CLUBS', getDefaultClubsData());
}
export async function updateClubsSocieties(slug: string, data: ClubsSocietiesData) {
    return updateComponentData(slug, 'CLUBS', data, clubsSocietiesSchema);
}

// Events
export async function getEventsFestivals(slug = 'student-life-events-and-festivals') {
    return getComponentData(slug, 'EVENTS', getDefaultEventsData());
}
export async function updateEventsFestivals(slug: string, data: EventsFestivalsData) {
    return updateComponentData(slug, 'EVENTS', data, eventsFestivalsSchema);
}

// Grievance
export async function getGrievanceCell(slug = 'student-life-student-grievance-cell') {
    return getComponentData(slug, 'GRIEVANCE', getDefaultGrievanceData());
}
export async function updateGrievanceCell(slug: string, data: GrievanceCellData) {
    return updateComponentData(slug, 'GRIEVANCE', data, grievanceCellSchema);
}

// Code of Conduct
export async function getCodeOfConduct(slug = 'student-life-code-of-conduct') {
    return getComponentData(slug, 'CONDUCT', getDefaultConductData());
}
export async function updateCodeOfConduct(slug: string, data: CodeOfConductData) {
    return updateComponentData(slug, 'CONDUCT', data, codeOfConductSchema);
}


// --- Default Data Generators ---

function getDefaultHeroData(): StudentLifeHeroData {
	return {
		title: 'Student Life',
		subtitle: 'Experience a vibrant campus life with endless opportunities for growth.',
		backgroundImage: null,
		gradient: 'from-blue-600 to-purple-600'
	};
}

function getDefaultOverviewData(): StudentLifeOverviewData {
    return {
        title: 'Experience Life at BPIT',
        description: 'At Bhagwan Parshuram Institute of Technology, education goes beyond the classroom. We foster an environment where innovation meets creativity.',
        highlights: []
    };
}

function getDefaultFacilitiesData(): CampusFacilitiesData {
    return {
        title: 'Campus Facilities',
        description: 'BPIT offers a conducive environment for learning and personal growth with its modern infrastructure.',
        sections: []
    };
}

function getDefaultClubsData(): ClubsSocietiesData {
    return {
        title: 'Clubs & Societies',
        description: 'Student life at BPIT is vibrant and diverse. Join our clubs to pursue your hobbies.',
        categories: []
    };
}

function getDefaultEventsData(): EventsFestivalsData {
    return {
        title: 'Events & Festivals',
        description: 'BPIT\'s calendar is packed with events that provide platforms for showcasing talent.',
        events: []
    };
}

function getDefaultGrievanceData(): GrievanceCellData {
    return {
        title: 'Student Grievance Cell',
        description: 'BPIT is committed to providing a safe, fair, and harmonious learning environment.',
        processSteps: [],
        contactInfo: []
    };
}

function getDefaultConductData(): CodeOfConductData {
    return {
        title: 'Code of Conduct',
        description: 'To ensure a disciplined and conducive learning environment, all students are required to abide by the following code of conduct.',
        sections: []
    };
}
