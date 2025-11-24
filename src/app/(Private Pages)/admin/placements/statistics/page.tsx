import { Suspense } from 'react';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import PlacementStatisticsEditor from './components/PlacementStatisticsEditor';

export default async function AdminPlacementStatisticsPage() {
	await requireAdmin();
	return (
		<div className='container mx-auto py-8'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900'>
					Placement Statistics Management
				</h1>
				<p className='text-gray-600 mt-2'>
					Edit placement statistics, metrics, and student placement data
				</p>
			</div>

			<Suspense
				fallback={
					<div className='flex min-h-[400px] items-center justify-center'>
						<div className='text-slate-600'>Loading...</div>
					</div>
				}>
				<PlacementStatisticsEditor />
			</Suspense>
		</div>
	);
}
