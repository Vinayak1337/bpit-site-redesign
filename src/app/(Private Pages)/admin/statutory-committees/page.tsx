import { getStatutoryOverview } from '@/app/(Private Pages)/actions/statutory-committees';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import StatutoryOverviewEditor from './components/StatutoryOverviewEditor';

const OVERVIEW_SLUG = 'statutory-committees';

export default async function StatutoryOverviewAdminPage() {
	await requireAdmin();
	const overviewData = await getStatutoryOverview(OVERVIEW_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Statutory Committees Overview below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Committee Overview</h2>
				<StatutoryOverviewEditor 
					initialData={overviewData} 
					pageSlug={OVERVIEW_SLUG} 
				/>
			</div>
		</div>
	);
}

