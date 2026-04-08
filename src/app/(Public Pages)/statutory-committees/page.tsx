import { getStatutoryOverview } from '@/app/(Private Pages)/actions/statutory-committees';
import StatutoryOverviewView from '@/components/statutory-committees/StatutoryOverviewView';

export default async function StatutoryCommitteesPage() {
	const data = await getStatutoryOverview('statutory-committees');
	return <StatutoryOverviewView data={data} />;
}
