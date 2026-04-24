import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getNoticesHero,
	getNoticesList
} from '@/app/(Private Pages)/actions/academia-notices-circulars';
import NoticesHeroEditor from '@/app/(Private Pages)/admin/academia/components/NoticesHeroEditor';
import NoticesListEditor from '@/app/(Private Pages)/admin/academia/components/NoticesListEditor';

export default async function AdminNoticesCircularsPage() {
	await requireAdmin();

	const [hero, notices] = await Promise.all([
		getNoticesHero(),
		getNoticesList()
	]);

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>
					Notices & Circulars
				</h1>
				<p className='text-gray-600'>
					Click any section to edit it. Changes save to the database and
					revalidate the public page.
				</p>
			</div>

			<NoticesHeroEditor initialData={hero} />
			<NoticesListEditor initialData={notices} />
		</div>
	);
}
