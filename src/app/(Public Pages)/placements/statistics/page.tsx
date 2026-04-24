import { getPlacementStatistics } from '@/app/(Private Pages)/actions/placement-statistics';
import PlacementStatisticsSection from '@/app/(Private Pages)/admin/placements/statistics/components/PlacementStatisticsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Placement Statistics',
	description: 'Year-wise BPIT placement statistics — offers, average and highest packages, branch-wise performance.',
	alternates: { canonical: '/placements/statistics' }
};



export default async function StatisticsPage() {
	const data = await getPlacementStatistics();

	return <PlacementStatisticsSection data={data} />;
}
