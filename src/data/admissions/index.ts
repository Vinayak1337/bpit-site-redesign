import overviewPageSeed from './overview';
import whyBpitPageSeed from './why-bpit';
import processPageSeed from './process';
import feesPageSeed from './fees';
import scholarshipPageSeed from './scholarship';
import brochurePageSeed from './brochure';
import faqsPageSeed from './faqs';

export type AdmissionsSeedPage = {
	slug: string;
	title: string;
	components: Record<string, unknown>;
};

export const admissionsSeedPages: AdmissionsSeedPage[] = [
	overviewPageSeed as AdmissionsSeedPage,
	whyBpitPageSeed as AdmissionsSeedPage,
	processPageSeed as AdmissionsSeedPage,
	feesPageSeed as AdmissionsSeedPage,
	scholarshipPageSeed as AdmissionsSeedPage,
	brochurePageSeed as AdmissionsSeedPage,
	faqsPageSeed as AdmissionsSeedPage
];

export const admissionsOverviewSeed = overviewPageSeed as AdmissionsSeedPage;
export const admissionsWhyBpitSeed = whyBpitPageSeed as AdmissionsSeedPage;
export const admissionsProcessSeed = processPageSeed as AdmissionsSeedPage;
export const admissionsFeesSeed = feesPageSeed as AdmissionsSeedPage;
export const admissionsScholarshipSeed = scholarshipPageSeed as AdmissionsSeedPage;
export const admissionsBrochureSeed = brochurePageSeed as AdmissionsSeedPage;
export const admissionsFaqsSeed = faqsPageSeed as AdmissionsSeedPage;
