import React from 'react';
import { getPoliciesProcedures } from '@/app/(Private Pages)/actions/management';
import PoliciesProceduresSection from '@/app/(Public Pages)/management/components/PoliciesProceduresSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Policies & Procedures',
	description: 'Institutional policies and procedures covering academics, administration, HR, and student services at BPIT.',
	alternates: { canonical: '/management/policies-procedures' }
};



const POLICIES_SLUG = 'policies-procedures';

export default async function PoliciesProceduresPage() {
	const policiesData = await getPoliciesProcedures(POLICIES_SLUG);

	return <PoliciesProceduresSection data={policiesData} />;
};
