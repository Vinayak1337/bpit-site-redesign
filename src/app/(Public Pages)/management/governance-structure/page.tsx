import React from 'react';
import { getGovernanceStructure } from '@/app/(Private Pages)/actions/management';
import GovernanceStructureSection from '@/app/(Public Pages)/management/components/GovernanceStructureSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Governance Structure',
	description: 'Organisational and governance structure of BPIT detailing committees, reporting lines and the institute\'s management hierarchy.',
	alternates: { canonical: '/management/governance-structure' }
};



const GOVERNANCE_SLUG = 'governance-structure';

export default async function GovernanceStructurePage() {
	const governanceData = await getGovernanceStructure(GOVERNANCE_SLUG);

	return <GovernanceStructureSection data={governanceData} />;
};
