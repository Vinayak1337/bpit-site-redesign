import React from 'react';
import PlacementOverviewEditor from '@/app/(Private Pages)/admin/placements/overview/components/PlacementOverviewEditor';
import { getPlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';

export default async function PlacementOverviewAdminPage() {
	const data = await getPlacementOverview();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<div className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Placement Overview Management</h1>
					<p className="text-xl text-gray-600">
						Edit placement overview content, statistics, features, and contact information
					</p>
				</div>
				
				<PlacementOverviewEditor 
					initialData={data} 
					pageSlug="placement-overview" 
				/>
			</div>
		</div>
	);
}