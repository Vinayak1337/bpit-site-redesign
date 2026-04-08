import { getManagement } from '@/app/(Private Pages)/actions/management';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import ManagementEditor from './components/ManagementEditor';

const MANAGEMENT_SLUG = 'management';

export default async function ManagementAdminPage() {
	await requireAdmin();
	const managementData = await getManagement(MANAGEMENT_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Management Overview content below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Management Overview</h2>
				<ManagementEditor 
					initialData={managementData} 
					pageSlug={MANAGEMENT_SLUG} 
				/>
			</div>
		</div>
	);
}
