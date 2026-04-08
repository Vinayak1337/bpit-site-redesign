import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getFounderTribute } from '@/app/(Private Pages)/actions/about';
import { FOUNDER_TRIBUTE_SLUG } from '@/lib/page-slugs';
import FounderTributeEditor from '@/app/(Private Pages)/admin/about/components/FounderTributeEditor';

export default async function AdminFounderTributePage() {
	await requireAdmin();
	const founderTribute = await getFounderTribute(FOUNDER_TRIBUTE_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Founder Tribute below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Founder Tribute</h2>
				<FounderTributeEditor initialData={founderTribute} pageSlug={FOUNDER_TRIBUTE_SLUG} />
			</div>
		</div>
	);
}

