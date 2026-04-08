import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getPrincipalMessage } from '@/app/(Private Pages)/actions/about';
import { PRINCIPAL_MESSAGE_SLUG } from '@/lib/page-slugs';
import PrincipalMessageEditor from '@/app/(Private Pages)/admin/about/components/PrincipalMessageEditor';

export default async function AdminPrincipalMessagePage() {
	await requireAdmin();
	const principalMessage = await getPrincipalMessage(PRINCIPAL_MESSAGE_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Principal's Message below. Changes apply immediately after
				saving.
			</div>

			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					Principal's Message
				</h2>
				<PrincipalMessageEditor
					initialData={principalMessage}
					pageSlug={PRINCIPAL_MESSAGE_SLUG}
				/>
			</div>
		</div>
	);
}
