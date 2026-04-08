'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import { Prisma } from '@prisma/client';
import { revalidateTag, unstable_cache } from 'next/cache';

const EMPTY_PLACEMENT_COMPANIES: PlacementCompaniesData = {
	title: '',
	subtitle: '',
	companies: [],
	statistics: []
};

const EMPTY_TOP_PLACED_STUDENTS: TopPlacedStudentsData = {
	title: '',
	subtitle: '',
	students: [],
	statistics: []
};

const PLACEMENT_COMPANIES_CACHE_TAG = 'placement-companies';
const TOP_PLACED_STUDENTS_CACHE_TAG = 'top-placed-students';

const placementCompanySchema = z.object({
	name: z.string().min(1),
	logo: z.string().min(1)
});

const placementStatisticSchema = z.object({
	value: z.string().min(1),
	label: z.string().min(1)
});

const placementCompaniesSchema = z.object({
	title: z.string().default(''),
	subtitle: z.string().default(''),
	companies: z.array(placementCompanySchema).default([]),
	statistics: z.array(placementStatisticSchema).default([])
});

type PlacementCompaniesInput = z.infer<typeof placementCompaniesSchema>;

const topPlacedStudentSchema = z.object({
	id: z.union([z.number(), z.string()]).optional(),
	name: z.string().min(1),
	company: z.string().min(1),
	package: z.string().min(1),
	branch: z.string().min(1),
	year: z.string().min(1),
	image: z.string().min(1),
	companyLogo: z.string().min(1)
});

const topPlacedStudentsSchema = z.object({
	title: z.string().default(''),
	subtitle: z.string().default(''),
	students: z.array(topPlacedStudentSchema).default([]),
	statistics: z.array(placementStatisticSchema).default([])
});

type TopPlacedStudentsInput = z.infer<typeof topPlacedStudentsSchema>;

const sanitizePlacementCompanies = (
	data: PlacementCompaniesData
): PlacementCompaniesData => {
	const title = data.title?.trim() ?? '';
	const subtitle = data.subtitle?.trim() ?? '';
	const companies = (data.companies ?? [])
		.map(company => ({
			name: company.name?.trim() ?? '',
			logo: company.logo?.trim() ?? ''
		}))
		.filter(company => company.name.length > 0 && company.logo.length > 0);
	const statistics = (data.statistics ?? [])
		.map(stat => ({
			value: stat.value?.trim() ?? '',
			label: stat.label?.trim() ?? ''
		}))
		.filter(stat => stat.value.length > 0 && stat.label.length > 0);
	return { title, subtitle, companies, statistics };
};

const normalizePlacementCompanies = (
	input?: PlacementCompaniesInput | null
): PlacementCompaniesData =>
	sanitizePlacementCompanies({
		title: input?.title ?? '',
		subtitle: input?.subtitle ?? '',
		companies: input?.companies ?? [],
		statistics: input?.statistics ?? []
	});

const sanitizeTopPlacedStudents = (
	data: TopPlacedStudentsData
): TopPlacedStudentsData => {
	const title = data.title?.trim() ?? '';
	const subtitle = data.subtitle?.trim() ?? '';
	const students = (data.students ?? [])
		.map((student, index) => {
			const parsedId = Number(student.id);
			const id = Number.isFinite(parsedId) ? parsedId : index + 1;
			return {
				id,
				name: student.name?.trim() ?? '',
				company: student.company?.trim() ?? '',
				package: student.package?.trim() ?? '',
				branch: student.branch?.trim() ?? '',
				year: student.year?.trim() ?? '',
				image: student.image?.trim() ?? '',
				companyLogo: student.companyLogo?.trim() ?? ''
			};
		})
		.filter(
			student =>
				student.name.length > 0 &&
				student.company.length > 0 &&
				student.package.length > 0 &&
				student.image.length > 0 &&
				student.companyLogo.length > 0
		);
	const statistics = (data.statistics ?? [])
		.map(stat => ({
			value: stat.value?.trim() ?? '',
			label: stat.label?.trim() ?? ''
		}))
		.filter(stat => stat.value.length > 0 && stat.label.length > 0);
	return { title, subtitle, students, statistics };
};

const normalizeTopPlacedStudents = (
	input?: TopPlacedStudentsInput | null
): TopPlacedStudentsData =>
	sanitizeTopPlacedStudents({
		title: input?.title ?? '',
		subtitle: input?.subtitle ?? '',
		students: (input?.students ?? []).map((student, index) => ({
			id:
				typeof student.id === 'number'
					? student.id
					: Number(student.id ?? index + 1) || index + 1,
			name: student.name,
			company: student.company,
			package: student.package,
			branch: student.branch,
			year: student.year,
			image: student.image,
			companyLogo: student.companyLogo
		})),
		statistics: input?.statistics ?? []
	});

const placementComponentKey = 'PLACEMENT_COMPANIES';
const topStudentsComponentKey = 'TOP_PLACED_STUDENTS';

const getNextOrder = async (pageId: string): Promise<number> => {
	const components = await prisma.component.findMany({
		where: { pageId },
		select: { order: true }
	});
	if (components.length === 0) {
		return 0;
	}
	return (
		components.reduce(
			(max, component) => (component.order > max ? component.order : max),
			components[0].order
		) + 1
	);
};

const getOrCreateComponent = async (
	pageId: string,
	key: string,
	fallbackData: object
) => {
	let component = await prisma.component.findFirst({
		where: { pageId, key }
	});
	if (!component) {
		let attempt = 0;
		while (!component && attempt < 3) {
			const order = await getNextOrder(pageId);
			try {
				component = await prisma.component.create({
					data: {
						pageId,
						key,
						order,
						data: fallbackData
					}
				});
			} catch (error) {
				if (
					error instanceof Prisma.PrismaClientKnownRequestError &&
					error.code === 'P2002'
				) {
					attempt += 1;
					continue;
				}
				throw error;
			}
		}
		if (!component) {
			component = await prisma.component.findFirst({
				where: { pageId, key }
			});
		}
	}
	if (!component) {
		throw new Error(
			`Unable to initialize component with key ${key} for page ${pageId}`
		);
	}
	return component;
};

async function getPlacementCompaniesUncached(
	pageSlug: string
): Promise<PlacementCompaniesData> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return sanitizePlacementCompanies(EMPTY_PLACEMENT_COMPANIES);
	}

	const defaultData = sanitizePlacementCompanies(EMPTY_PLACEMENT_COMPANIES);
	const component = await getOrCreateComponent(
		page.id,
		placementComponentKey,
		defaultData
	);

	const parsed = placementCompaniesSchema.safeParse(component.data);
	if (!parsed.success) {
		return defaultData;
	}

	return normalizePlacementCompanies(parsed.data);
}

export const getPlacementCompanies = unstable_cache(
	getPlacementCompaniesUncached,
	['getPlacementCompanies'],
	{ tags: [PLACEMENT_COMPANIES_CACHE_TAG] }
);

export async function updatePlacementCompanies(
	pageSlug: string,
	data: PlacementCompaniesData
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const sanitized = sanitizePlacementCompanies(data);
	const parsed = placementCompaniesSchema.safeParse(sanitized);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return { ok: false, error: 'page_not_found' };
	}

	const component = await getOrCreateComponent(
		page.id,
		placementComponentKey,
		parsed.data
	);

	const previousData = component.data;
	const payload = parsed.data;

	await prisma.component.update({
		where: { id: component.id },
		data: { data: payload }
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary: `Updated placement companies for page ${pageSlug}`,
		changes: [
			{
				resourceId: component.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData:
					previousData === null
						? undefined
						: (previousData as unknown as Prisma.InputJsonValue),
				newData: payload as unknown as Prisma.InputJsonValue
			}
		]
	});

	revalidateTag(PLACEMENT_COMPANIES_CACHE_TAG);

	return { ok: true };
}

async function getTopPlacedStudentsUncached(
	pageSlug: string
): Promise<TopPlacedStudentsData> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return sanitizeTopPlacedStudents(EMPTY_TOP_PLACED_STUDENTS);
	}

	const defaultData = sanitizeTopPlacedStudents(EMPTY_TOP_PLACED_STUDENTS);
	const component = await getOrCreateComponent(
		page.id,
		topStudentsComponentKey,
		defaultData
	);

	const parsed = topPlacedStudentsSchema.safeParse(component.data);
	if (!parsed.success) {
		return defaultData;
	}

	return normalizeTopPlacedStudents(parsed.data);
}

export const getTopPlacedStudents = unstable_cache(
	getTopPlacedStudentsUncached,
	['getTopPlacedStudents'],
	{ tags: [TOP_PLACED_STUDENTS_CACHE_TAG] }
);

export async function updateTopPlacedStudents(
	pageSlug: string,
	data: TopPlacedStudentsData
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const sanitized = sanitizeTopPlacedStudents(data);
	const parsed = topPlacedStudentsSchema.safeParse(sanitized);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return { ok: false, error: 'page_not_found' };
	}

	const component = await getOrCreateComponent(
		page.id,
		topStudentsComponentKey,
		parsed.data
	);

	const previousData = component.data;
	const payload = parsed.data;

	await prisma.component.update({
		where: { id: component.id },
		data: { data: payload }
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary: `Updated top placed students for page ${pageSlug}`,
		changes: [
			{
				resourceId: component.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData:
					previousData === null
						? undefined
						: (previousData as unknown as Prisma.InputJsonValue),
				newData: payload as unknown as Prisma.InputJsonValue
			}
		]
	});

	revalidateTag(TOP_PLACED_STUDENTS_CACHE_TAG);

	return { ok: true };
}
