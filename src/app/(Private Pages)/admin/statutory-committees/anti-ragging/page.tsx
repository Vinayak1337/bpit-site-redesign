import { getAntiRagging } from '@/app/(Private Pages)/actions/statutory-committees';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import AntiRaggingEditor from '../components/AntiRaggingEditor';

const ANTI_RAGGING_SLUG = 'statutory-committees-anti-ragging';

export default async function AntiRaggingAdminPage() {
	await requireAdmin();
	const antiRaggingData = await getAntiRagging(ANTI_RAGGING_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Anti-Ragging page content below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Anti-Ragging Content</h2>
				<AntiRaggingEditor 
					initialData={antiRaggingData} 
					pageSlug={ANTI_RAGGING_SLUG} 
				/>
			</div>
		</div>
	);
}

