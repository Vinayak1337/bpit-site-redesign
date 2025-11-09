import { getManagement, getLeadershipTeam, getGovernanceStructure, getPoliciesProcedures } from '@/app/(Private Pages)/actions/management';
import ManagementEditor from './components/ManagementEditor';
import LeadershipTeamEditor from './components/LeadershipTeamEditor';
import GovernanceStructureEditor from './components/GovernanceStructureEditor';
import PoliciesProceduresEditor from './components/PoliciesProceduresEditor';

const MANAGEMENT_SLUG = 'management';
const LEADERSHIP_TEAM_SLUG = 'leadership-team';
const GOVERNANCE_STRUCTURE_SLUG = 'governance-structure';
const POLICIES_PROCEDURES_SLUG = 'policies-procedures';

export default async function ManagementAdminPage() {
	const managementData = await getManagement(MANAGEMENT_SLUG);
	const leadershipTeamData = await getLeadershipTeam(LEADERSHIP_TEAM_SLUG);
	const governanceStructureData = await getGovernanceStructure(GOVERNANCE_STRUCTURE_SLUG);
	const policiesProceduresData = await getPoliciesProcedures(POLICIES_PROCEDURES_SLUG);

	return (
		<div className='space-y-8'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-900'>
					Edit Management Pages
				</h1>
			</div>
			
			{/* Management Section */}
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
					Management Content
				</h2>
				<ManagementEditor 
					initialData={managementData} 
					pageSlug={MANAGEMENT_SLUG} 
				/>
			</div>

			{/* Leadership Team Section */}
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
					Leadership Team Content
				</h2>
				<LeadershipTeamEditor 
					initialData={leadershipTeamData} 
					pageSlug={LEADERSHIP_TEAM_SLUG} 
				/>
			</div>

			{/* Governance Structure Section */}
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
					Governance Structure Content
				</h2>
				<GovernanceStructureEditor 
					initialData={governanceStructureData} 
					pageSlug={GOVERNANCE_STRUCTURE_SLUG} 
				/>
			</div>

			{/* Policies & Procedures Section */}
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
					Policies & Procedures Content
				</h2>
				<PoliciesProceduresEditor 
					initialData={policiesProceduresData} 
					pageSlug={POLICIES_PROCEDURES_SLUG} 
				/>
			</div>
		</div>
	);
}