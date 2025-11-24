import { getGovernanceStructure } from '@/app/(Private Pages)/actions/management';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import GovernanceStructureEditor from '../components/GovernanceStructureEditor';

const GOVERNANCE_STRUCTURE_SLUG = 'governance-structure';

export default async function AdminGovernanceStructurePage() {
	await requireAdmin();
	const governanceStructureData = await getGovernanceStructure(GOVERNANCE_STRUCTURE_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Governance Structure content below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Governance Structure Content</h2>
				<GovernanceStructureEditor 
					initialData={governanceStructureData} 
					pageSlug={GOVERNANCE_STRUCTURE_SLUG} 
				/>
			</div>
		</div>
	);
}

