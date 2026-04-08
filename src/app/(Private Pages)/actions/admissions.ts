'use server';
import 'server-only';

import { z } from 'zod';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import { ADMISSIONS_COMPONENT_KEYS, ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import {
	admissionsBrochureSeed,
	admissionsFaqsSeed,
	admissionsFeesSeed,
	admissionsOverviewSeed,
	admissionsProcessSeed,
	admissionsScholarshipSeed,
	admissionsWhyBpitSeed
} from '@/data/admissions/index';

type AdmissionsSlug = (typeof ADMISSIONS_SLUGS)[keyof typeof ADMISSIONS_SLUGS];

type SectionDefaults<Item> = {
	eyebrow?: string;
	title: string;
	description?: string;
	items: Item[];
};

const ADMISSIONS_ROUTE_META: Record<
	AdmissionsSlug,
	{ title: string; publicPaths: string[]; adminPath: string }
> = {
	[ADMISSIONS_SLUGS.overview]: {
		title: admissionsOverviewSeed.title,
		publicPaths: ['/admissions'],
		adminPath: '/admin/admissions'
	},
	[ADMISSIONS_SLUGS.whyBpit]: {
		title: admissionsWhyBpitSeed.title,
		publicPaths: ['/admissions/why-bpit'],
		adminPath: '/admin/admissions/why-bpit'
	},
	[ADMISSIONS_SLUGS.process]: {
		title: admissionsProcessSeed.title,
		publicPaths: ['/admissions/process', '/admissions/process/[programId]'],
		adminPath: '/admin/admissions/process'
	},
	[ADMISSIONS_SLUGS.fees]: {
		title: admissionsFeesSeed.title,
		publicPaths: ['/admissions/fees'],
		adminPath: '/admin/admissions/fees'
	},
	[ADMISSIONS_SLUGS.scholarship]: {
		title: admissionsScholarshipSeed.title,
		publicPaths: ['/admissions/scholarship'],
		adminPath: '/admin/admissions/scholarship'
	},
	[ADMISSIONS_SLUGS.brochure]: {
		title: admissionsBrochureSeed.title,
		publicPaths: ['/admissions/brochure'],
		adminPath: '/admin/admissions/brochure'
	},
	[ADMISSIONS_SLUGS.faqs]: {
		title: admissionsFaqsSeed.title,
		publicPaths: ['/admissions/faqs'],
		adminPath: '/admin/admissions/faqs'
	}
};

const overviewSeedComponents = admissionsOverviewSeed.components as Record<string, unknown>;
const whySeedComponents = admissionsWhyBpitSeed.components as Record<string, unknown>;
const processSeedComponents = admissionsProcessSeed.components as Record<string, unknown>;
const feesSeedComponents = admissionsFeesSeed.components as Record<string, unknown>;
const scholarshipSeedComponents = admissionsScholarshipSeed.components as Record<string, unknown>;
const brochureSeedComponents = admissionsBrochureSeed.components as Record<string, unknown>;
const faqSeedComponents = admissionsFaqsSeed.components as Record<string, unknown>;

const iconStringSchema = z.string().min(1);

const heroSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	backgroundImage: z.string().nullable(),
	gradient: z.string().default('from-blue-600 to-blue-800')
});

const statSchema = z.object({
	value: z.string().min(1),
	label: z.string().min(1),
	icon: iconStringSchema.optional()
});

const overviewHeroSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	description: z.string().min(1),
	programCountLabel: z.string().default('Programs available')
});

const overviewLinkSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	href: z.string().min(1),
	icon: iconStringSchema.default('BookOpen')
});

const overviewDepartmentSchema = z.object({
	name: z.string().min(1)
});

const createArraySectionSchema = <ItemSchema extends z.ZodTypeAny>(
	itemSchema: ItemSchema,
	defaults: SectionDefaults<z.output<ItemSchema>>
) =>
	z
		.union([
			z.object({
				eyebrow: z.string().default(defaults.eyebrow ?? ''),
				title: z.string().default(defaults.title),
				description: z.string().default(defaults.description ?? ''),
				items: z.array(itemSchema).default(defaults.items)
			}),
			z.array(itemSchema)
		])
		.transform(value =>
			Array.isArray(value)
				? {
						eyebrow: defaults.eyebrow ?? '',
						title: defaults.title,
						description: defaults.description ?? '',
						items: value
				  }
				: value
		);

const whyHeroSchema = z.object({
	badgeText: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	quickPointsTitle: z.string().default('Why students choose BPIT'),
	quickPoints: z.array(z.string().min(1)).default([]),
	primaryCta: z.object({
		label: z.string().min(1),
		href: z.string().min(1)
	}),
	secondaryCta: z.object({
		label: z.string().min(1),
		href: z.string().min(1)
	})
});

const whyHighlightSchema = z.object({
	icon: iconStringSchema.default('BookOpen'),
	title: z.string().min(1),
	description: z.string().min(1)
});

const whyAccreditationSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	icon: iconStringSchema.default('Award')
});

const ctaButtonSchema = z.object({
	label: z.string().min(1),
	href: z.string().min(1),
	icon: z.enum(['target', 'map', 'phone']).optional()
});

const finalCtaSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	ctas: z.array(ctaButtonSchema).min(1)
});

const processMetaGroupItemSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1)
});

const processMetaGroupSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	items: z.array(processMetaGroupItemSchema).min(1)
});

const processSubsectionSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	breadcrumbGroup: z.string().min(1),
	breadcrumbItem: z.string().min(1)
});

const processCategorySchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	description: z.string().default(''),
	subcategories: z
		.array(
			z.object({
				id: z.string().min(1),
				title: z.string().min(1),
				description: z.string().default(''),
				breadcrumbLabel: z.string().default('')
			})
		)
		.min(1)
});

const processSupportCardDefaults = {
	title: 'Admission Support',
	description: 'Need help choosing the right admission route? Our counselors can guide you.',
	primaryCtaLabel: 'Apply Now',
	primaryCtaHref: '/admissions/process',
	secondaryCtaLabel: 'Download Brochure',
	secondaryCtaHref: '/admissions/brochure'
};

const processSupportCardSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	primaryCtaLabel: z.string().min(1),
	primaryCtaHref: z.string().min(1),
	secondaryCtaLabel: z.string().min(1),
	secondaryCtaHref: z.string().min(1)
});

const processListCopySchema = z.object({
	sidebarTitle: z.string().default('Program Categories'),
	mobileBackLabel: z.string().default('Back to Categories'),
	breadcrumbRootLabel: z.string().default('Programs'),
	noProgramsMessage: z.string().default('No programs are configured for this category yet.'),
	durationLabel: z.string().default('Duration'),
	intakeLabel: z.string().default('Intake'),
	cardCtaLabel: z.string().default('View Details')
});

const processDetailTabLabelsSchema = z.object({
	offering: z.string().default('Content Offering'),
	eligibility: z.string().default('Eligibility & Selection Criteria'),
	structure: z.string().default('Programme Structure'),
	careers: z.string().default('Career Opportunities'),
	faculty: z.string().default('Faculty')
});

const processDetailCategoryLabelsSchema = z.object({
	engineering: z.string().default('Engineering and Technology'),
	ugManagement: z.string().default('Management'),
	pgManagement: z.string().default('Management')
});

const processDetailCopyBaseSchema = z.object({
	backButtonLabel: z.string().default('Back to all programs'),
	sidebarTitle: z.string().default('Program Details'),
	tabLabels: processDetailTabLabelsSchema.default(
		processDetailTabLabelsSchema.parse({})
	),
	durationLabel: z.string().default('Duration'),
	intakeLabel: z.string().default('Intake'),
	offeringTitle: z.string().default('Content Offering Statement'),
	keyAreasTitle: z.string().default('Key Areas of Study'),
	eligibilityTitle: z.string().default('Eligibility Criteria & Selection Process'),
	academicQualificationTitle: z.string().default('Academic Qualification'),
	minimumMarksTitle: z.string().default('Minimum Marks Required'),
	entranceExamTitle: z.string().default('Entrance Examination'),
	selectionProcessTitle: z.string().default('Selection Process'),
	structureTitle: z.string().default('Programme Structure'),
	totalSemestersLabel: z.string().default('Total Semesters'),
	totalCreditsLabel: z.string().default('Total Credits'),
	durationCardLabel: z.string().default('Duration'),
	semesterCurriculumTitle: z.string().default('Semester-wise Curriculum'),
	subjectsLabelSuffix: z.string().default('Subjects'),
	careersTitle: z.string().default('Career Opportunities'),
	facultyTitle: z.string().default('Faculty Members')
});

const legacyProcessDetailCopySchema = processDetailCopyBaseSchema.extend({
	categoryLabels: processDetailCategoryLabelsSchema.default(
		processDetailCategoryLabelsSchema.parse({})
	)
});

const processMetaBaseSchema = z.object({
	headerTitle: z.string().min(1),
	headerSubtitle: z.string().min(1),
	emptyStateTitle: z.string().min(1),
	defaultCategoryDescription: z.string().min(1),
	emptyStateDescription: z.string().min(1),
	listCopy: processListCopySchema.default(processListCopySchema.parse({})),
	detailCopy: processDetailCopyBaseSchema.default(processDetailCopyBaseSchema.parse({})),
	categories: z.array(processCategorySchema).min(1),
	supportCard: processSupportCardSchema.default(processSupportCardDefaults)
});

const legacyProcessMetaSchema = z.object({
	headerTitle: z.string().min(1),
	headerSubtitle: z.string().min(1),
	emptyStateTitle: z.string().min(1),
	defaultCategoryDescription: z.string().min(1),
	emptyStateDescription: z.string().min(1),
	listCopy: processListCopySchema.default(processListCopySchema.parse({})),
	detailCopy: legacyProcessDetailCopySchema.default(legacyProcessDetailCopySchema.parse({})),
	groups: z.array(processMetaGroupSchema).min(1),
	subsections: z.record(processSubsectionSchema),
	supportCard: processSupportCardSchema.default(processSupportCardDefaults)
});

const LEGACY_PROCESS_SUBCATEGORY_TO_CATEGORY: Record<
	'engineering' | 'ugManagement' | 'pgManagement',
	string
> = {
	engineering: 'undergraduate',
	ugManagement: 'undergraduate',
	pgManagement: 'postgraduate'
};

function normalizeProcessMeta(
	value: z.output<typeof processMetaBaseSchema> | z.output<typeof legacyProcessMetaSchema>
): z.output<typeof processMetaBaseSchema> {
	if ('categories' in value) {
		return {
			...value,
			categories: value.categories.map(category => ({
				...category,
				description: category.description ?? '',
				subcategories: category.subcategories.map(subcategory => ({
					...subcategory,
					description: subcategory.description ?? '',
					breadcrumbLabel: subcategory.breadcrumbLabel ?? ''
				}))
			}))
		};
	}

	return {
		headerTitle: value.headerTitle,
		headerSubtitle: value.headerSubtitle,
		emptyStateTitle: value.emptyStateTitle,
		defaultCategoryDescription: value.defaultCategoryDescription,
		emptyStateDescription: value.emptyStateDescription,
		listCopy: value.listCopy,
		detailCopy: {
			backButtonLabel: value.detailCopy.backButtonLabel,
			sidebarTitle: value.detailCopy.sidebarTitle,
			tabLabels: value.detailCopy.tabLabels,
			durationLabel: value.detailCopy.durationLabel,
			intakeLabel: value.detailCopy.intakeLabel,
			offeringTitle: value.detailCopy.offeringTitle,
			keyAreasTitle: value.detailCopy.keyAreasTitle,
			eligibilityTitle: value.detailCopy.eligibilityTitle,
			academicQualificationTitle: value.detailCopy.academicQualificationTitle,
			minimumMarksTitle: value.detailCopy.minimumMarksTitle,
			entranceExamTitle: value.detailCopy.entranceExamTitle,
			selectionProcessTitle: value.detailCopy.selectionProcessTitle,
			structureTitle: value.detailCopy.structureTitle,
			totalSemestersLabel: value.detailCopy.totalSemestersLabel,
			totalCreditsLabel: value.detailCopy.totalCreditsLabel,
			durationCardLabel: value.detailCopy.durationCardLabel,
			semesterCurriculumTitle: value.detailCopy.semesterCurriculumTitle,
			subjectsLabelSuffix: value.detailCopy.subjectsLabelSuffix,
			careersTitle: value.detailCopy.careersTitle,
			facultyTitle: value.detailCopy.facultyTitle
		},
		categories: value.groups.map(group => ({
			id: group.id,
			title: group.title,
			description: '',
			subcategories: group.items.map(item => {
				const subsection = value.subsections[item.id];
				return {
					id: item.id,
					title: item.title,
					description: subsection?.description ?? '',
					breadcrumbLabel: subsection?.breadcrumbItem ?? item.title
				};
			})
		})),
		supportCard: value.supportCard
	};
}

const processMetaSchema = z
	.union([processMetaBaseSchema, legacyProcessMetaSchema])
	.transform(normalizeProcessMeta);

const programFacultySchema = z.object({
	name: z.string().min(1),
	designation: z.string().min(1),
	specialization: z.string().min(1),
	experience: z.string().min(1),
	linkedin: z.string().optional().default(''),
	photo: z.string().optional().default('')
});

const programSemesterDetailSchema = z.object({
	semester: z.number().int().positive(),
	title: z.string().min(1),
	subjects: z.array(z.string().min(1)).default([])
});

const programStructureSchema = z.object({
	semesters: z.number().int().positive(),
	totalCredits: z.number().int().positive(),
	semesterDetails: z.array(programSemesterDetailSchema).default([])
});

const programCatalogItemBaseSchema = z.object({
	id: z.string().min(1),
	categoryId: z.string().min(1),
	subcategoryId: z.string().min(1),
	title: z.string().min(1),
	duration: z.string().min(1),
	intake: z.string().min(1),
	icon: iconStringSchema.default('GraduationCap'),
	description: z.string().min(1),
	highlights: z.array(z.string().min(1)).default([]),
	details: z.object({
		contentOffering: z.object({
			statement: z.string().min(1),
			keyAreas: z.array(z.string().min(1)).default([])
		}),
		eligibilityAndSelection: z.object({
			academic: z.string().min(1),
			minimumMarks: z.string().min(1),
			entranceExam: z.string().min(1),
			selectionProcess: z.array(z.string().min(1)).default([])
		}),
		programStructure: programStructureSchema,
		careerOpportunities: z.array(z.string().min(1)).default([]),
		faculty: z.array(programFacultySchema).default([])
	})
});

const legacyProgramCatalogItemSchema = z.object({
	id: z.string().min(1),
	category: z.enum(['engineering', 'ugManagement', 'pgManagement']),
	title: z.string().min(1),
	duration: z.string().min(1),
	intake: z.string().min(1),
	icon: iconStringSchema.default('GraduationCap'),
	description: z.string().min(1),
	highlights: z.array(z.string().min(1)).default([]),
	details: z.object({
		contentOffering: z.object({
			statement: z.string().min(1),
			keyAreas: z.array(z.string().min(1)).default([])
		}),
		eligibilityAndSelection: z.object({
			academic: z.string().min(1),
			minimumMarks: z.string().min(1),
			entranceExam: z.string().min(1),
			selectionProcess: z.array(z.string().min(1)).default([])
		}),
		programStructure: programStructureSchema,
		careerOpportunities: z.array(z.string().min(1)).default([]),
		faculty: z.array(programFacultySchema).default([])
	})
});

function normalizeProgramCatalogItem(
	value: z.output<typeof programCatalogItemBaseSchema> | z.output<typeof legacyProgramCatalogItemSchema>
): z.output<typeof programCatalogItemBaseSchema> {
	if ('categoryId' in value) {
		return value;
	}

	return {
		id: value.id,
		categoryId: LEGACY_PROCESS_SUBCATEGORY_TO_CATEGORY[value.category],
		subcategoryId: value.category,
		title: value.title,
		duration: value.duration,
		intake: value.intake,
		icon: value.icon,
		description: value.description,
		highlights: value.highlights,
		details: value.details
	};
}

const programCatalogItemSchema = z
	.union([programCatalogItemBaseSchema, legacyProgramCatalogItemSchema])
	.transform(normalizeProgramCatalogItem);

const feeComponentSchema = z.object({
	name: z.string().min(1),
	amount: z.number().nonnegative(),
	description: z.string().optional().default('')
});

const feeComponentGroupSchema = z.object({
	groupName: z.string().min(1),
	totalAmount: z.number().nonnegative(),
	components: z.array(feeComponentSchema).default([])
});

const feeBreakdownSchema = z.object({
	id: z.string().optional().default(''),
	title: z.string().min(1),
	shortLabel: z.string().optional().default(''),
	description: z.string().optional().default(''),
	totalAmount: z.number().nonnegative(),
	components: z.array(feeComponentSchema).default([])
});

const yearlyFeeSchema = z.object({
	year: z.number().int().positive(),
	title: z.string().default(''),
	note: z.string().optional().default(''),
	breakdowns: z.array(feeBreakdownSchema).default([]),
	feeGroups: z.array(feeComponentGroupSchema).default([]),
	totalYearFee: z.number().nonnegative()
});

const feeProgramSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	shortName: z.string().optional().default(''),
	duration: z.string().min(1),
	icon: iconStringSchema.default('GraduationCap'),
	color: z.string().optional().default(''),
	description: z.string().optional().default(''),
	paymentNote: z.string().optional().default(''),
	years: z.array(yearlyFeeSchema).default([]),
	totalProgramFee: z.number().nonnegative()
});

const feesMetaSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	description: z.string().min(1),
	academicSession: z.string().optional().default(''),
	billingNote: z.string().optional().default(''),
	importantNotes: z.array(z.string().min(1)).default([]),
	supportMessage: z.string().min(1),
	supportEmail: z.string().min(1),
	supportPhone: z.string().min(1),
	selectorEyebrow: z.string().default('Programs'),
	selectorTitle: z.string().default('Choose a course to inspect the full fee ledger'),
	selectorDescription: z.string().default('Select a program card to inspect the year-wise fee view.'),
	overviewEyebrow: z.string().default('Program summary'),
	programTotalLabel: z.string().default('Program total'),
	annualViewsLabel: z.string().default('Annual views'),
	breakdownPanelsLabel: z.string().default('Breakdown panels'),
	paymentNoteTitle: z.string().default('Payment note'),
	snapshotEyebrow: z.string().default('Annual snapshot'),
	snapshotTitle: z.string().default('Yearly totals before you open the breakdowns'),
	snapshotDescription: z.string().default('Review year-wise totals before opening detailed cards.'),
	yearSectionsLabel: z.string().default('sections'),
	yearTotalLabel: z.string().default('Annual total'),
	breakdownEyebrow: z.string().default('Detailed breakdown'),
	breakdownTitle: z.string().default('Open any annual card to inspect the detailed fee ledger'),
	breakdownDescription: z.string().default('All annual cards stay collapsed by default.'),
	annualHeadsEyebrow: z.string().default('Annual account heads'),
	annualHeadsTitle: z.string().default('How this year total is made up'),
	annualHeadsDescription: z.string().default('Each fee head appears once here.'),
	importantNotesEyebrow: z.string().default('Important notes'),
	importantNotesTitle: z.string().default('Before you compare fee totals'),
	supportEyebrow: z.string().default('Support'),
	supportTitle: z.string().default('Need help with fee clarification?'),
	supportCardTitle: z.string().default('Fee design principle'),
	supportCardDescription: z
		.string()
		.default(
			'This page prioritizes clarity: annual totals stay visible at a glance and detailed account heads open only when needed.'
		)
});

const scholarshipIntroSchema = z.object({
	badge: z.string().min(1),
	title: z.string().min(1),
	subtitle: z.string().min(1),
	beforeApplyTitle: z.string().min(1),
	beforeApplyDescription: z.string().min(1)
});

const scholarshipCategorySchema = z.object({
	title: z.string().min(1),
	icon: iconStringSchema.default('Award'),
	badge: z.string().min(1),
	accent: z.string().min(1),
	scholarships: z.array(z.string().min(1)).default([]),
	portal: z.string().optional().default(''),
	portalUrl: z.string().optional().default('')
});

const scholarshipSupportSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	email: z.string().min(1),
	phone: z.string().min(1)
});

const brochureConfigSchema = z.object({
	heroBadge: z.string().min(1),
	heroTitle: z.string().min(1),
	heroSubtitle: z.string().min(1),
	autoDetectEnabled: z.boolean().default(true),
	emptyStateTitle: z.string().default('No brochure items configured'),
	emptyStateDescription: z.string().default('Please add brochure items from admin.')
});

const brochureItemSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	icon: iconStringSchema.default('FileText'),
	url: z.string().min(1),
	lastUpdated: z.string().optional().default('')
});

const faqIntroSchema = z.object({
	badge: z.string().default('Admissions FAQs'),
	title: z.string().min(1),
	subtitle: z.string().min(1),
	browseTitle: z.string().min(1)
});

const faqItemSchema = z.object({
	id: z.number().int().positive(),
	question: z.string().min(1),
	answer: z.string().min(1),
	category: z.string().min(1)
});

const faqContactSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	phone: z.string().min(1),
	email: z.string().min(1),
	address: z.string().min(1)
});

const overviewStatsDefaults = overviewSeedComponents[
	ADMISSIONS_COMPONENT_KEYS.overviewStats
] as SectionDefaults<z.output<typeof statSchema>>;
const overviewLinksDefaults = overviewSeedComponents[
	ADMISSIONS_COMPONENT_KEYS.overviewLinks
] as SectionDefaults<z.output<typeof overviewLinkSchema>>;
const overviewDepartmentsDefaults = overviewSeedComponents[
	ADMISSIONS_COMPONENT_KEYS.overviewDepartments
] as SectionDefaults<z.output<typeof overviewDepartmentSchema>>;
const overviewNotesDefaults = overviewSeedComponents[
	ADMISSIONS_COMPONENT_KEYS.overviewNotes
] as SectionDefaults<string>;
const whyStatsDefaults = whySeedComponents[
	ADMISSIONS_COMPONENT_KEYS.whyStats
] as SectionDefaults<z.output<typeof statSchema>>;
const whyHighlightsDefaults = whySeedComponents[
	ADMISSIONS_COMPONENT_KEYS.whyHighlights
] as SectionDefaults<z.output<typeof whyHighlightSchema>>;
const whyAccreditationsDefaults = whySeedComponents[
	ADMISSIONS_COMPONENT_KEYS.whyAccreditations
] as SectionDefaults<z.output<typeof whyAccreditationSchema>>;
const scholarshipNotesDefaults = scholarshipSeedComponents[
	ADMISSIONS_COMPONENT_KEYS.scholarshipNotes
] as SectionDefaults<string>;

const overviewStatsSectionSchema = createArraySectionSchema(statSchema, overviewStatsDefaults);
const overviewLinksSectionSchema = createArraySectionSchema(
	overviewLinkSchema,
	overviewLinksDefaults
);
const overviewDepartmentsSectionSchema = createArraySectionSchema(
	overviewDepartmentSchema,
	overviewDepartmentsDefaults
);
const overviewNotesSectionSchema = createArraySectionSchema(
	z.string().min(1),
	overviewNotesDefaults
);
const whyStatsSectionSchema = createArraySectionSchema(statSchema, whyStatsDefaults);
const whyHighlightsSectionSchema = createArraySectionSchema(
	whyHighlightSchema,
	whyHighlightsDefaults
);
const whyAccreditationsSectionSchema = createArraySectionSchema(
	whyAccreditationSchema,
	whyAccreditationsDefaults
);
const scholarshipNotesSectionSchema = createArraySectionSchema(
	z.string().min(1),
	scholarshipNotesDefaults
);

export type AdmissionsHeroData = z.infer<typeof heroSchema>;
export type AdmissionsStat = z.infer<typeof statSchema>;
export type AdmissionsOverviewHeroData = z.infer<typeof overviewHeroSchema>;
export type AdmissionsOverviewLink = z.infer<typeof overviewLinkSchema>;
export type AdmissionsOverviewDepartment = z.infer<typeof overviewDepartmentSchema>;
export type AdmissionsOverviewStatsSection = z.infer<typeof overviewStatsSectionSchema>;
export type AdmissionsOverviewLinksSection = z.infer<typeof overviewLinksSectionSchema>;
export type AdmissionsOverviewDepartmentsSection = z.infer<
	typeof overviewDepartmentsSectionSchema
>;
export type AdmissionsOverviewNotesSection = z.infer<typeof overviewNotesSectionSchema>;
export type WhyBpitHeroData = z.infer<typeof whyHeroSchema>;
export type WhyBpitHighlight = z.infer<typeof whyHighlightSchema>;
export type WhyBpitAccreditation = z.infer<typeof whyAccreditationSchema>;
export type WhyBpitStatsSection = z.infer<typeof whyStatsSectionSchema>;
export type WhyBpitHighlightsSection = z.infer<typeof whyHighlightsSectionSchema>;
export type WhyBpitAccreditationsSection = z.infer<typeof whyAccreditationsSectionSchema>;
export type FinalCtaData = z.infer<typeof finalCtaSchema>;
export type AdmissionsProcessMeta = z.infer<typeof processMetaSchema>;
export type AdmissionsProgramCatalogItem = z.infer<typeof programCatalogItemSchema>;
export type AdmissionsFeesMeta = z.infer<typeof feesMetaSchema>;
export type AdmissionsFeeProgram = z.infer<typeof feeProgramSchema>;
export type AdmissionsScholarshipIntro = z.infer<typeof scholarshipIntroSchema>;
export type AdmissionsScholarshipCategory = z.infer<typeof scholarshipCategorySchema>;
export type AdmissionsScholarshipNotesSection = z.infer<typeof scholarshipNotesSectionSchema>;
export type AdmissionsScholarshipSupport = z.infer<typeof scholarshipSupportSchema>;
export type AdmissionsBrochureConfig = z.infer<typeof brochureConfigSchema>;
export type AdmissionsBrochureItem = z.infer<typeof brochureItemSchema>;
export type AdmissionsFaqIntro = z.infer<typeof faqIntroSchema>;
export type AdmissionsFaqItem = z.infer<typeof faqItemSchema>;
export type AdmissionsFaqContact = z.infer<typeof faqContactSchema>;
export type AdmissionsOverviewPageData = {
	hero: AdmissionsOverviewHeroData;
	stats: AdmissionsOverviewStatsSection;
	links: AdmissionsOverviewLinksSection;
	departments: AdmissionsOverviewDepartmentsSection;
	notes: AdmissionsOverviewNotesSection;
};
export type AdmissionsWhyBpitPageData = {
	hero: WhyBpitHeroData;
	stats: WhyBpitStatsSection;
	highlights: WhyBpitHighlightsSection;
	accreditations: WhyBpitAccreditationsSection;
	finalCta: FinalCtaData;
};

const DEFAULT_HERO_BY_SLUG: Record<AdmissionsSlug, AdmissionsHeroData> = {
	[ADMISSIONS_SLUGS.overview]: heroSchema.parse(
		overviewSeedComponents[ADMISSIONS_COMPONENT_KEYS.hero]
	),
	[ADMISSIONS_SLUGS.whyBpit]: heroSchema.parse(whySeedComponents[ADMISSIONS_COMPONENT_KEYS.hero]),
	[ADMISSIONS_SLUGS.process]: heroSchema.parse(
		processSeedComponents[ADMISSIONS_COMPONENT_KEYS.hero]
	),
	[ADMISSIONS_SLUGS.fees]: heroSchema.parse(feesSeedComponents[ADMISSIONS_COMPONENT_KEYS.hero]),
	[ADMISSIONS_SLUGS.scholarship]: heroSchema.parse(
		scholarshipSeedComponents[ADMISSIONS_COMPONENT_KEYS.hero]
	),
	[ADMISSIONS_SLUGS.brochure]: heroSchema.parse(
		brochureSeedComponents[ADMISSIONS_COMPONENT_KEYS.hero]
	),
	[ADMISSIONS_SLUGS.faqs]: heroSchema.parse(faqSeedComponents[ADMISSIONS_COMPONENT_KEYS.hero])
};

const DEFAULT_OVERVIEW_HERO = overviewHeroSchema.parse(
	overviewSeedComponents[ADMISSIONS_COMPONENT_KEYS.overviewHero]
);
const DEFAULT_OVERVIEW_STATS = overviewStatsSectionSchema.parse(
	overviewSeedComponents[ADMISSIONS_COMPONENT_KEYS.overviewStats]
);
const DEFAULT_OVERVIEW_LINKS = overviewLinksSectionSchema.parse(
	overviewSeedComponents[ADMISSIONS_COMPONENT_KEYS.overviewLinks]
);
const DEFAULT_OVERVIEW_DEPARTMENTS = overviewDepartmentsSectionSchema.parse(
	overviewSeedComponents[ADMISSIONS_COMPONENT_KEYS.overviewDepartments]
);
const DEFAULT_OVERVIEW_NOTES = overviewNotesSectionSchema.parse(
	overviewSeedComponents[ADMISSIONS_COMPONENT_KEYS.overviewNotes]
);
const DEFAULT_WHY_HERO = whyHeroSchema.parse(
	whySeedComponents[ADMISSIONS_COMPONENT_KEYS.whyHero]
);
const DEFAULT_WHY_STATS = whyStatsSectionSchema.parse(
	whySeedComponents[ADMISSIONS_COMPONENT_KEYS.whyStats]
);
const DEFAULT_WHY_HIGHLIGHTS = whyHighlightsSectionSchema.parse(
	whySeedComponents[ADMISSIONS_COMPONENT_KEYS.whyHighlights]
);
const DEFAULT_WHY_ACCREDITATIONS = whyAccreditationsSectionSchema.parse(
	whySeedComponents[ADMISSIONS_COMPONENT_KEYS.whyAccreditations]
);
const DEFAULT_WHY_FINAL_CTA = finalCtaSchema.parse(
	whySeedComponents[ADMISSIONS_COMPONENT_KEYS.whyFinalCta]
);
const DEFAULT_PROCESS_META = processMetaSchema.parse(
	processSeedComponents[ADMISSIONS_COMPONENT_KEYS.processMeta]
);
const DEFAULT_PROGRAM_CATALOG = z.array(programCatalogItemSchema).parse(
	processSeedComponents[ADMISSIONS_COMPONENT_KEYS.programCatalog]
);
const DEFAULT_FEES_META = feesMetaSchema.parse(
	feesSeedComponents[ADMISSIONS_COMPONENT_KEYS.feesMeta]
);
const DEFAULT_FEE_PROGRAMS = z.array(feeProgramSchema).parse(
	feesSeedComponents[ADMISSIONS_COMPONENT_KEYS.feesPrograms]
);
const DEFAULT_SCHOLARSHIP_INTRO = scholarshipIntroSchema.parse(
	scholarshipSeedComponents[ADMISSIONS_COMPONENT_KEYS.scholarshipIntro]
);
const DEFAULT_SCHOLARSHIP_CATEGORIES = z.array(scholarshipCategorySchema).parse(
	scholarshipSeedComponents[ADMISSIONS_COMPONENT_KEYS.scholarshipCategories]
);
const DEFAULT_SCHOLARSHIP_NOTES = scholarshipNotesSectionSchema.parse(
	scholarshipSeedComponents[ADMISSIONS_COMPONENT_KEYS.scholarshipNotes]
);
const DEFAULT_SCHOLARSHIP_SUPPORT = scholarshipSupportSchema.parse(
	scholarshipSeedComponents[ADMISSIONS_COMPONENT_KEYS.scholarshipSupport]
);
const DEFAULT_BROCHURE_CONFIG = brochureConfigSchema.parse(
	brochureSeedComponents[ADMISSIONS_COMPONENT_KEYS.brochureConfig]
);
const DEFAULT_BROCHURE_ITEMS = z.array(brochureItemSchema).parse(
	brochureSeedComponents[ADMISSIONS_COMPONENT_KEYS.brochureItems]
);
const DEFAULT_FAQ_INTRO = faqIntroSchema.parse(
	faqSeedComponents[ADMISSIONS_COMPONENT_KEYS.faqIntro]
);
const DEFAULT_FAQ_ITEMS = z.array(faqItemSchema).parse(
	faqSeedComponents[ADMISSIONS_COMPONENT_KEYS.faqItems]
);
const DEFAULT_FAQ_CONTACT = faqContactSchema.parse(
	faqSeedComponents[ADMISSIONS_COMPONENT_KEYS.faqContact]
);

const SCHOLARSHIP_PORTAL_URLS: Record<string, string> = {
	'University Portal': 'https://ipu.ac.in/dsw_ews.php',
	'E-District Portal': 'https://edistrict.delhigovt.nic.in/',
	'NSP Portal': 'https://scholarships.gov.in/',
	'NSP Portal 2.0': 'https://scholarships.gov.in/'
};

const cacheTagFor = (slug: string, key: string): string => `admissions:${slug}:${key}`;

const sanitizeTrim = <T>(value: T): T => {
	const next = structuredClone(value);
	const visit = (node: unknown): unknown => {
		if (typeof node === 'string') {
			return node.trim();
		}
		if (Array.isArray(node)) {
			return node.map(item => visit(item));
		}
		if (node && typeof node === 'object') {
			const obj = node as Record<string, unknown>;
			for (const [k, v] of Object.entries(obj)) {
				obj[k] = visit(v);
			}
		}
		return node;
	};
	return visit(next) as T;
};

async function getPageBySlug(slug: string) {
	return prisma.page.findUnique({ where: { slug } });
}

async function getOrCreatePage(slug: string, title: string) {
	const existing = await getPageBySlug(slug);
	if (existing) return existing;
	return prisma.page.create({
		data: {
			slug,
			title,
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});
}

async function getNextOrder(pageId: string): Promise<number> {
	const components = await prisma.component.findMany({
		where: { pageId },
		select: { order: true }
	});
	if (components.length === 0) return 0;
	return Math.max(...components.map(component => component.order)) + 1;
}

async function getOrCreateComponent(
	pageId: string,
	key: string,
	fallbackData: Prisma.InputJsonValue
) {
	let component = await prisma.component.findFirst({ where: { pageId, key } });
	if (component) return component;

	let attempt = 0;
	while (!component && attempt < 5) {
		try {
			const order = await getNextOrder(pageId);
			component = await prisma.component.create({
				data: {
					pageId,
					key,
					order,
					data: fallbackData
				}
			});
			return component;
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				(error.code === 'P2002' || error.code === 'P2034')
			) {
				component = await prisma.component.findFirst({ where: { pageId, key } });
				if (component) {
					return component;
				}
				attempt += 1;
				continue;
			}
			throw error;
		}
	}

	throw new Error(`Unable to initialize component ${key} for page ${pageId}`);
}

async function getSection<Schema extends z.ZodTypeAny>({
	slug,
	pageTitle,
	key,
	schema,
	fallback
}: {
	slug: string;
	pageTitle: string;
	key: string;
	schema: Schema;
	fallback: z.output<Schema>;
}): Promise<z.output<Schema>> {
	return unstable_cache(
		async () => {
			const page = await getOrCreatePage(slug, pageTitle);
			const component = await getOrCreateComponent(
				page.id,
				key,
				fallback as unknown as Prisma.InputJsonValue
			);
			const parsed = schema.safeParse(component.data);
			if (!parsed.success) return fallback;
			return parsed.data;
		},
		[`admissions-${slug}-${key}`],
		{ tags: [cacheTagFor(slug, key)], revalidate: 3600 }
	)();
}

async function updateSection<Schema extends z.ZodTypeAny>({
	slug,
	pageTitle,
	key,
	schema,
	value,
	summary,
	publicPaths,
	adminPaths
}: {
	slug: string;
	pageTitle: string;
	key: string;
	schema: Schema;
	value: z.input<Schema>;
	summary: string;
	publicPaths: string[];
	adminPaths: string[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const parsed = schema.safeParse(value);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const normalized = sanitizeTrim(parsed.data);
	const page = await getOrCreatePage(slug, pageTitle);
	const component = await getOrCreateComponent(
		page.id,
		key,
		normalized as unknown as Prisma.InputJsonValue
	);
	const previousData = component.data;

	await prisma.component.update({
		where: { id: component.id },
		data: { data: normalized as unknown as Prisma.InputJsonValue }
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary,
		changes: [
			{
				resourceId: component.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData: previousData as Prisma.InputJsonValue,
				newData: normalized as unknown as Prisma.InputJsonValue
			}
		]
	});

	revalidateTag(cacheTagFor(slug, key));
	for (const path of [...publicPaths, ...adminPaths]) {
		revalidatePath(path);
	}

	return { ok: true };
}

const pageTitleForSlug = (slug: AdmissionsSlug) => ADMISSIONS_ROUTE_META[slug].title;
const publicPathsForSlug = (slug: AdmissionsSlug) => ADMISSIONS_ROUTE_META[slug].publicPaths;
const adminPathForSlug = (slug: AdmissionsSlug) => ADMISSIONS_ROUTE_META[slug].adminPath;

export async function getAdmissionsHero(
	slug: AdmissionsSlug = ADMISSIONS_SLUGS.overview
): Promise<AdmissionsHeroData> {
	return getSection({
		slug,
		pageTitle: pageTitleForSlug(slug),
		key: ADMISSIONS_COMPONENT_KEYS.hero,
		schema: heroSchema,
		fallback: DEFAULT_HERO_BY_SLUG[slug]
	});
}

export async function updateAdmissionsHero(slug: AdmissionsSlug, data: AdmissionsHeroData) {
	const result = await updateSection({
		slug,
		pageTitle: pageTitleForSlug(slug),
		key: ADMISSIONS_COMPONENT_KEYS.hero,
		schema: heroSchema,
		value: data,
		summary: `Updated admissions hero for ${slug}`,
		publicPaths: publicPathsForSlug(slug),
		adminPaths: [adminPathForSlug(slug)]
	});

	if (slug === ADMISSIONS_SLUGS.process && result.ok) {
		revalidatePath('/admissions/process/[programId]', 'page');
	}

	return result;
}

export async function getAdmissionsOverviewHero() {
	return getSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewHero,
		schema: overviewHeroSchema,
		fallback: DEFAULT_OVERVIEW_HERO
	});
}

export async function updateAdmissionsOverviewHero(data: AdmissionsOverviewHeroData) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewHero,
		schema: overviewHeroSchema,
		value: data,
		summary: 'Updated admissions overview intro',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.overview),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.overview)]
	});
}

export async function getAdmissionsOverviewStats() {
	return getSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewStats,
		schema: overviewStatsSectionSchema,
		fallback: DEFAULT_OVERVIEW_STATS
	});
}

export async function updateAdmissionsOverviewStats(data: AdmissionsOverviewStatsSection) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewStats,
		schema: overviewStatsSectionSchema,
		value: data,
		summary: 'Updated admissions overview stats',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.overview),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.overview)]
	});
}

export async function getAdmissionsOverviewLinks() {
	return getSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewLinks,
		schema: overviewLinksSectionSchema,
		fallback: DEFAULT_OVERVIEW_LINKS
	});
}

export async function updateAdmissionsOverviewLinks(data: AdmissionsOverviewLinksSection) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewLinks,
		schema: overviewLinksSectionSchema,
		value: data,
		summary: 'Updated admissions overview quick links',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.overview),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.overview)]
	});
}

export async function getAdmissionsOverviewDepartments() {
	return getSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewDepartments,
		schema: overviewDepartmentsSectionSchema,
		fallback: DEFAULT_OVERVIEW_DEPARTMENTS
	});
}

export async function updateAdmissionsOverviewDepartments(
	data: AdmissionsOverviewDepartmentsSection
) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewDepartments,
		schema: overviewDepartmentsSectionSchema,
		value: data,
		summary: 'Updated admissions overview departments',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.overview),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.overview)]
	});
}

export async function getAdmissionsOverviewNotes() {
	return getSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewNotes,
		schema: overviewNotesSectionSchema,
		fallback: DEFAULT_OVERVIEW_NOTES
	});
}

export async function updateAdmissionsOverviewNotes(data: AdmissionsOverviewNotesSection) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.overview,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.overview),
		key: ADMISSIONS_COMPONENT_KEYS.overviewNotes,
		schema: overviewNotesSectionSchema,
		value: data,
		summary: 'Updated admissions overview notes',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.overview),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.overview)]
	});
}

export async function getAdmissionsOverviewPageData() {
	const [hero, stats, links, departments, notes] = await Promise.all([
		getAdmissionsOverviewHero(),
		getAdmissionsOverviewStats(),
		getAdmissionsOverviewLinks(),
		getAdmissionsOverviewDepartments(),
		getAdmissionsOverviewNotes()
	]);
	return { hero, stats, links, departments, notes };
}

export async function getWhyBpitHero() {
	return getSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyHero,
		schema: whyHeroSchema,
		fallback: DEFAULT_WHY_HERO
	});
}

export async function updateWhyBpitHero(data: WhyBpitHeroData) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyHero,
		schema: whyHeroSchema,
		value: data,
		summary: 'Updated admissions why-bpit hero',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.whyBpit),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.whyBpit)]
	});
}

export async function getWhyBpitStats() {
	return getSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyStats,
		schema: whyStatsSectionSchema,
		fallback: DEFAULT_WHY_STATS
	});
}

export async function updateWhyBpitStats(data: WhyBpitStatsSection) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyStats,
		schema: whyStatsSectionSchema,
		value: data,
		summary: 'Updated admissions why-bpit stats',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.whyBpit),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.whyBpit)]
	});
}

export async function getWhyBpitHighlights() {
	return getSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyHighlights,
		schema: whyHighlightsSectionSchema,
		fallback: DEFAULT_WHY_HIGHLIGHTS
	});
}

export async function updateWhyBpitHighlights(data: WhyBpitHighlightsSection) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyHighlights,
		schema: whyHighlightsSectionSchema,
		value: data,
		summary: 'Updated admissions why-bpit highlights',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.whyBpit),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.whyBpit)]
	});
}

export async function getWhyBpitAccreditations() {
	return getSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyAccreditations,
		schema: whyAccreditationsSectionSchema,
		fallback: DEFAULT_WHY_ACCREDITATIONS
	});
}

export async function updateWhyBpitAccreditations(data: WhyBpitAccreditationsSection) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyAccreditations,
		schema: whyAccreditationsSectionSchema,
		value: data,
		summary: 'Updated admissions why-bpit accreditations',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.whyBpit),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.whyBpit)]
	});
}

export async function getWhyBpitFinalCta() {
	return getSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyFinalCta,
		schema: finalCtaSchema,
		fallback: DEFAULT_WHY_FINAL_CTA
	});
}

export async function updateWhyBpitFinalCta(data: FinalCtaData) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.whyBpit,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.whyBpit),
		key: ADMISSIONS_COMPONENT_KEYS.whyFinalCta,
		schema: finalCtaSchema,
		value: data,
		summary: 'Updated admissions why-bpit final CTA',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.whyBpit),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.whyBpit)]
	});
}

export async function getAdmissionsWhyBpitPageData() {
	const [hero, stats, highlights, accreditations, finalCta] = await Promise.all([
		getWhyBpitHero(),
		getWhyBpitStats(),
		getWhyBpitHighlights(),
		getWhyBpitAccreditations(),
		getWhyBpitFinalCta()
	]);
	return { hero, stats, highlights, accreditations, finalCta };
}

export async function getAdmissionsProcessMeta() {
	return getSection({
		slug: ADMISSIONS_SLUGS.process,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.process),
		key: ADMISSIONS_COMPONENT_KEYS.processMeta,
		schema: processMetaSchema,
		fallback: DEFAULT_PROCESS_META
	});
}

export async function updateAdmissionsProcessMeta(data: AdmissionsProcessMeta) {
	const result = await updateSection({
		slug: ADMISSIONS_SLUGS.process,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.process),
		key: ADMISSIONS_COMPONENT_KEYS.processMeta,
		schema: processMetaSchema,
		value: data,
		summary: 'Updated admissions process meta',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.process),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.process)]
	});

	if (result.ok) {
		revalidatePath('/admissions/process/[programId]', 'page');
	}

	return result;
}

export async function getAdmissionsProgramCatalog() {
	return getSection({
		slug: ADMISSIONS_SLUGS.process,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.process),
		key: ADMISSIONS_COMPONENT_KEYS.programCatalog,
		schema: z.array(programCatalogItemSchema),
		fallback: DEFAULT_PROGRAM_CATALOG
	});
}

export async function updateAdmissionsProgramCatalog(data: AdmissionsProgramCatalogItem[]) {
	const result = await updateSection({
		slug: ADMISSIONS_SLUGS.process,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.process),
		key: ADMISSIONS_COMPONENT_KEYS.programCatalog,
		schema: z.array(programCatalogItemSchema),
		value: data,
		summary: 'Updated admissions program catalog',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.process),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.process)]
	});

	if (result.ok) {
		revalidatePath('/admissions/process/[programId]', 'page');
	}

	return result;
}

export async function getAdmissionsProgramById(programId: string) {
	const catalog = await getAdmissionsProgramCatalog();
	return catalog.find(program => program.id === programId) ?? null;
}

export async function getAdmissionsFeesMeta() {
	return getSection({
		slug: ADMISSIONS_SLUGS.fees,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.fees),
		key: ADMISSIONS_COMPONENT_KEYS.feesMeta,
		schema: feesMetaSchema,
		fallback: DEFAULT_FEES_META
	});
}

export async function updateAdmissionsFeesMeta(data: AdmissionsFeesMeta) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.fees,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.fees),
		key: ADMISSIONS_COMPONENT_KEYS.feesMeta,
		schema: feesMetaSchema,
		value: data,
		summary: 'Updated admissions fees meta',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.fees),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.fees)]
	});
}

export async function getAdmissionsFeePrograms() {
	return getSection({
		slug: ADMISSIONS_SLUGS.fees,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.fees),
		key: ADMISSIONS_COMPONENT_KEYS.feesPrograms,
		schema: z.array(feeProgramSchema),
		fallback: DEFAULT_FEE_PROGRAMS
	});
}

export async function updateAdmissionsFeePrograms(data: AdmissionsFeeProgram[]) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.fees,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.fees),
		key: ADMISSIONS_COMPONENT_KEYS.feesPrograms,
		schema: z.array(feeProgramSchema),
		value: data,
		summary: 'Updated admissions fee programs',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.fees),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.fees)]
	});
}

export async function getAdmissionsScholarshipIntro() {
	return getSection({
		slug: ADMISSIONS_SLUGS.scholarship,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.scholarship),
		key: ADMISSIONS_COMPONENT_KEYS.scholarshipIntro,
		schema: scholarshipIntroSchema,
		fallback: DEFAULT_SCHOLARSHIP_INTRO
	});
}

export async function updateAdmissionsScholarshipIntro(data: AdmissionsScholarshipIntro) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.scholarship,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.scholarship),
		key: ADMISSIONS_COMPONENT_KEYS.scholarshipIntro,
		schema: scholarshipIntroSchema,
		value: data,
		summary: 'Updated admissions scholarship intro',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.scholarship),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.scholarship)]
	});
}

export async function getAdmissionsScholarshipCategories() {
	const categories = await getSection({
		slug: ADMISSIONS_SLUGS.scholarship,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.scholarship),
		key: ADMISSIONS_COMPONENT_KEYS.scholarshipCategories,
		schema: z.array(scholarshipCategorySchema),
		fallback: DEFAULT_SCHOLARSHIP_CATEGORIES
	});

	return categories.map(category => ({
		...category,
		portalUrl:
			category.portalUrl ||
			(category.portal ? SCHOLARSHIP_PORTAL_URLS[category.portal] ?? '' : '')
	}));
}

export async function updateAdmissionsScholarshipCategories(
	data: AdmissionsScholarshipCategory[]
) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.scholarship,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.scholarship),
		key: ADMISSIONS_COMPONENT_KEYS.scholarshipCategories,
		schema: z.array(scholarshipCategorySchema),
		value: data,
		summary: 'Updated admissions scholarship categories',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.scholarship),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.scholarship)]
	});
}

export async function getAdmissionsScholarshipNotes() {
	return getSection({
		slug: ADMISSIONS_SLUGS.scholarship,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.scholarship),
		key: ADMISSIONS_COMPONENT_KEYS.scholarshipNotes,
		schema: scholarshipNotesSectionSchema,
		fallback: DEFAULT_SCHOLARSHIP_NOTES
	});
}

export async function updateAdmissionsScholarshipNotes(
	data: AdmissionsScholarshipNotesSection
) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.scholarship,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.scholarship),
		key: ADMISSIONS_COMPONENT_KEYS.scholarshipNotes,
		schema: scholarshipNotesSectionSchema,
		value: data,
		summary: 'Updated admissions scholarship notes',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.scholarship),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.scholarship)]
	});
}

export async function getAdmissionsScholarshipSupport() {
	return getSection({
		slug: ADMISSIONS_SLUGS.scholarship,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.scholarship),
		key: ADMISSIONS_COMPONENT_KEYS.scholarshipSupport,
		schema: scholarshipSupportSchema,
		fallback: DEFAULT_SCHOLARSHIP_SUPPORT
	});
}

export async function updateAdmissionsScholarshipSupport(
	data: AdmissionsScholarshipSupport
) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.scholarship,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.scholarship),
		key: ADMISSIONS_COMPONENT_KEYS.scholarshipSupport,
		schema: scholarshipSupportSchema,
		value: data,
		summary: 'Updated admissions scholarship support',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.scholarship),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.scholarship)]
	});
}

export async function getAdmissionsBrochureConfig() {
	return getSection({
		slug: ADMISSIONS_SLUGS.brochure,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.brochure),
		key: ADMISSIONS_COMPONENT_KEYS.brochureConfig,
		schema: brochureConfigSchema,
		fallback: DEFAULT_BROCHURE_CONFIG
	});
}

export async function updateAdmissionsBrochureConfig(data: AdmissionsBrochureConfig) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.brochure,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.brochure),
		key: ADMISSIONS_COMPONENT_KEYS.brochureConfig,
		schema: brochureConfigSchema,
		value: data,
		summary: 'Updated admissions brochure config',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.brochure),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.brochure)]
	});
}

export async function getAdmissionsBrochureItems() {
	return getSection({
		slug: ADMISSIONS_SLUGS.brochure,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.brochure),
		key: ADMISSIONS_COMPONENT_KEYS.brochureItems,
		schema: z.array(brochureItemSchema),
		fallback: DEFAULT_BROCHURE_ITEMS
	});
}

export async function updateAdmissionsBrochureItems(data: AdmissionsBrochureItem[]) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.brochure,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.brochure),
		key: ADMISSIONS_COMPONENT_KEYS.brochureItems,
		schema: z.array(brochureItemSchema),
		value: data,
		summary: 'Updated admissions brochure items',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.brochure),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.brochure)]
	});
}

export async function getAdmissionsFaqIntro() {
	return getSection({
		slug: ADMISSIONS_SLUGS.faqs,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.faqs),
		key: ADMISSIONS_COMPONENT_KEYS.faqIntro,
		schema: faqIntroSchema,
		fallback: DEFAULT_FAQ_INTRO
	});
}

export async function updateAdmissionsFaqIntro(data: AdmissionsFaqIntro) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.faqs,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.faqs),
		key: ADMISSIONS_COMPONENT_KEYS.faqIntro,
		schema: faqIntroSchema,
		value: data,
		summary: 'Updated admissions FAQ intro',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.faqs),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.faqs)]
	});
}

export async function getAdmissionsFaqItems() {
	return getSection({
		slug: ADMISSIONS_SLUGS.faqs,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.faqs),
		key: ADMISSIONS_COMPONENT_KEYS.faqItems,
		schema: z.array(faqItemSchema),
		fallback: DEFAULT_FAQ_ITEMS
	});
}

export async function updateAdmissionsFaqItems(data: AdmissionsFaqItem[]) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.faqs,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.faqs),
		key: ADMISSIONS_COMPONENT_KEYS.faqItems,
		schema: z.array(faqItemSchema),
		value: data,
		summary: 'Updated admissions FAQ items',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.faqs),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.faqs)]
	});
}

export async function getAdmissionsFaqContact() {
	return getSection({
		slug: ADMISSIONS_SLUGS.faqs,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.faqs),
		key: ADMISSIONS_COMPONENT_KEYS.faqContact,
		schema: faqContactSchema,
		fallback: DEFAULT_FAQ_CONTACT
	});
}

export async function updateAdmissionsFaqContact(data: AdmissionsFaqContact) {
	return updateSection({
		slug: ADMISSIONS_SLUGS.faqs,
		pageTitle: pageTitleForSlug(ADMISSIONS_SLUGS.faqs),
		key: ADMISSIONS_COMPONENT_KEYS.faqContact,
		schema: faqContactSchema,
		value: data,
		summary: 'Updated admissions FAQ contact section',
		publicPaths: publicPathsForSlug(ADMISSIONS_SLUGS.faqs),
		adminPaths: [adminPathForSlug(ADMISSIONS_SLUGS.faqs)]
	});
}

export async function getAdmissionsProcessPageData() {
	const [meta, programs] = await Promise.all([
		getAdmissionsProcessMeta(),
		getAdmissionsProgramCatalog()
	]);
	return { meta, programs };
}

export async function getAdmissionsFeesPageData() {
	const [meta, programs] = await Promise.all([
		getAdmissionsFeesMeta(),
		getAdmissionsFeePrograms()
	]);
	return { meta, programs };
}

export async function getAdmissionsScholarshipPageData() {
	const [intro, categories, notes, support] = await Promise.all([
		getAdmissionsScholarshipIntro(),
		getAdmissionsScholarshipCategories(),
		getAdmissionsScholarshipNotes(),
		getAdmissionsScholarshipSupport()
	]);
	return { intro, categories, notes, support };
}

export async function getAdmissionsBrochurePageData() {
	const [config, items] = await Promise.all([
		getAdmissionsBrochureConfig(),
		getAdmissionsBrochureItems()
	]);
	return { config, items };
}

export async function getAdmissionsFaqPageData() {
	const [intro, items, contact] = await Promise.all([
		getAdmissionsFaqIntro(),
		getAdmissionsFaqItems(),
		getAdmissionsFaqContact()
	]);
	return { intro, items, contact };
}
