import { getIqac } from '@/app/(Private Pages)/actions/statutory-committees';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import IqacEditor from '../components/IqacEditor';

const IQAC_SLUG = 'statutory-committees-iqac';

export default async function IqacAdminPage() {
	await requireAdmin();
	const iqacData = await getIqac(IQAC_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the IQAC page content below. Changes apply immediately after
				saving.
			</div>

			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>IQAC Content</h2>
				<IqacEditor initialData={iqacData} pageSlug={IQAC_SLUG} />
			</div>
		</div>
	);
}
