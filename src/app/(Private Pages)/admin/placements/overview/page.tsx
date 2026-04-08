import React from 'react';
import HeroStatsEditor from '@/app/(Private Pages)/admin/placements/overview/components/HeroStatsEditor';
import MissionEditor from '@/app/(Private Pages)/admin/placements/overview/components/MissionEditor';
import ServicesTeamEditor from '@/app/(Private Pages)/admin/placements/overview/components/ServicesTeamEditor';
import TrainingAreasEditor from '@/app/(Private Pages)/admin/placements/overview/components/TrainingAreasEditor';
import AchievementsHighlightsEditor from '@/app/(Private Pages)/admin/placements/overview/components/AchievementsHighlightsEditor';
import ContactEditor from '@/app/(Private Pages)/admin/placements/overview/components/ContactEditor';
import { getPlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';

export default async function PlacementOverviewAdminPage() {
	const data = await getPlacementOverview();
	const pageSlug = 'placement-overview';

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<div className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Placement Overview Management</h1>
					<p className="text-xl text-gray-600">
						Click on any section below to edit placement overview content
					</p>
				</div>
				
				<div className="space-y-8">
					<HeroStatsEditor initialData={data} pageSlug={pageSlug} />
					<MissionEditor initialData={data} pageSlug={pageSlug} />
					<ServicesTeamEditor initialData={data} pageSlug={pageSlug} />
					<TrainingAreasEditor initialData={data} pageSlug={pageSlug} />
					<AchievementsHighlightsEditor initialData={data} pageSlug={pageSlug} />
					<ContactEditor initialData={data} pageSlug={pageSlug} />
				</div>
			</div>
		</div>
	);
}