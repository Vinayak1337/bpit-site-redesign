import { getPoliciesProcedures } from '@/app/(Private Pages)/actions/management';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import PoliciesProceduresEditor from '../components/PoliciesProceduresEditor';

const POLICIES_PROCEDURES_SLUG = 'policies-procedures';

export default async function AdminPoliciesProceduresPage() {
	await requireAdmin();
	const policiesProceduresData = await getPoliciesProcedures(POLICIES_PROCEDURES_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Policies & Procedures content below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Policies & Procedures Content</h2>
				<PoliciesProceduresEditor 
					initialData={policiesProceduresData} 
					pageSlug={POLICIES_PROCEDURES_SLUG} 
				/>
			</div>
		</div>
	);
}

