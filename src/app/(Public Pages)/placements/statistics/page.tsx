import { getPlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import PlacementStatisticsSection from '@/app/(Private Pages)/admin/placements/statistics/components/PlacementStatisticsSection';

export default async function StatisticsPage() {
	const data = await getPlacementStatistics();

	return <PlacementStatisticsSection data={data} />;
}
