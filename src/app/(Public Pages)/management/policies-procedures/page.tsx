import React from 'react';
import { getPoliciesProcedures } from '@/app/(Private Pages)/actions/management';
import PoliciesProceduresSection from '@/app/(Public Pages)/management/components/PoliciesProceduresSection';

const POLICIES_SLUG = 'policies-procedures';

export default async function PoliciesProceduresPage() {
	const policiesData = await getPoliciesProcedures(POLICIES_SLUG);

	return <PoliciesProceduresSection data={policiesData} />;
};
