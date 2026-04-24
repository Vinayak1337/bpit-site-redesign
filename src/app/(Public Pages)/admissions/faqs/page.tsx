import {
	getAdmissionsHero,
	getAdmissionsFaqContact,
	getAdmissionsFaqIntro,
	getAdmissionsFaqItems
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import FaqExplorer from '@/app/(Public Pages)/admissions/faqs/components/FaqExplorer';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admissions FAQs',
	description: 'Frequently asked questions about BPIT admissions — eligibility, counselling, documents, fees and programme specifics.',
	alternates: { canonical: '/admissions/faqs' }
};


export default async function FAQPage() {
	const [pageHero, intro, items, contact] = await Promise.all([
		getAdmissionsHero(ADMISSIONS_SLUGS.faqs),
		getAdmissionsFaqIntro(),
		getAdmissionsFaqItems(),
		getAdmissionsFaqContact()
	]);

	return (
		<AdmissionsPageShell hero={pageHero}>
			<FaqExplorer intro={intro} items={items} contact={contact} />
		</AdmissionsPageShell>
	);
}
