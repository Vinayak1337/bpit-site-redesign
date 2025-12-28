import { getLeadershipTeam } from '@/app/(Private Pages)/actions/management';
import LeadershipTeamSection from './components/LeadershipTeamSection';

const LEADERSHIP_TEAM_SLUG = 'leadership-team';

export default async function LeadershipTeamPage() {
	const leadershipTeamData = await getLeadershipTeam(LEADERSHIP_TEAM_SLUG);

	return <LeadershipTeamSection data={leadershipTeamData} />;
};
