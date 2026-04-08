import React from 'react';
import { getPlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';
import PlacementOverviewSection from '@/app/(Private Pages)/admin/placements/overview/components/PlacementOverviewSection';

export default async function PlacementOverviewPage() {
	const data = await getPlacementOverview();

	return <PlacementOverviewSection data={data} />;
}