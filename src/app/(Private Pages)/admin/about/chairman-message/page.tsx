import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getChairmanMessage } from '@/app/(Private Pages)/actions/about';
import { CHAIRMAN_MESSAGE_SLUG } from '@/lib/page-slugs';
import ChairmanMessageEditor from '@/app/(Private Pages)/admin/about/components/ChairmanMessageEditor';

export default async function AdminChairmanMessagePage() {
	await requireAdmin();
	const chairmanMessage = await getChairmanMessage(CHAIRMAN_MESSAGE_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Chairman's Message below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Chairman's Message</h2>
				<ChairmanMessageEditor initialData={chairmanMessage} pageSlug={CHAIRMAN_MESSAGE_SLUG} />
			</div>
		</div>
	);
}

