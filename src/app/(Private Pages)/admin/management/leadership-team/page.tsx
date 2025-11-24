import { getLeadershipTeam } from '@/app/(Private Pages)/actions/management';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import LeadershipTeamEditor from '../components/LeadershipTeamEditor';

const LEADERSHIP_TEAM_SLUG = 'leadership-team';

export default async function AdminLeadershipTeamPage() {
	await requireAdmin();
	const leadershipTeamData = await getLeadershipTeam(LEADERSHIP_TEAM_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Leadership Team content below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Leadership Team Content</h2>
				<LeadershipTeamEditor 
					initialData={leadershipTeamData} 
					pageSlug={LEADERSHIP_TEAM_SLUG} 
				/>
			</div>
		</div>
	);
}

