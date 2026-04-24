import React from 'react';
import type { Metadata } from 'next';
import { getPlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';
import PlacementOverviewSection from '@/app/(Private Pages)/admin/placements/overview/components/PlacementOverviewSection';

export const metadata: Metadata = {
	title: 'Placement Overview',
	description:
		'Overview of the BPIT Training & Placement Cell — recruiter partnerships, placement services, training roadmap and outcomes for BTech students across CSE, IT, ECE and EEE.',
	alternates: { canonical: '/placements/overview' }
};

export default async function PlacementOverviewPage() {
	const data = await getPlacementOverview();

	return <PlacementOverviewSection data={data} />;
}