import React from 'react';
import { getGovernanceStructure } from '@/app/(Private Pages)/actions/management';
import GovernanceStructureSection from '@/app/(Public Pages)/management/components/GovernanceStructureSection';

const GOVERNANCE_SLUG = 'governance-structure';

export default async function GovernanceStructurePage() {
	const governanceData = await getGovernanceStructure(GOVERNANCE_SLUG);

	return <GovernanceStructureSection data={governanceData} />;
};
