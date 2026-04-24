import { getLeadershipTeam } from '@/app/(Private Pages)/actions/management';
import LeadershipTeamSection from './components/LeadershipTeamSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Leadership Team',
	description: 'Meet the BPIT leadership team driving academic, administrative and strategic direction at the institute.',
	alternates: { canonical: '/management/leadership-team' }
};



const LEADERSHIP_TEAM_SLUG = 'leadership-team';

export default async function LeadershipTeamPage() {
	const leadershipTeamData = await getLeadershipTeam(LEADERSHIP_TEAM_SLUG);

	return <LeadershipTeamSection data={leadershipTeamData} />;
};
