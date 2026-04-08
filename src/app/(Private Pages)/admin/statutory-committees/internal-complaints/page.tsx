import { getInternalComplaints } from '@/app/(Private Pages)/actions/statutory-committees';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import InternalComplaintsEditor from '../components/InternalComplaintsEditor';

const INTERNAL_COMPLAINTS_SLUG = 'statutory-committees-internal-complaints';

export default async function InternalComplaintsAdminPage() {
	await requireAdmin();
	const internalComplaintsData = await getInternalComplaints(INTERNAL_COMPLAINTS_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Internal Complaints page content below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Internal Complaints Content</h2>
				<InternalComplaintsEditor 
					initialData={internalComplaintsData} 
					pageSlug={INTERNAL_COMPLAINTS_SLUG} 
				/>
			</div>
		</div>
	);
}

