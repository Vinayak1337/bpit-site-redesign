import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getExaminationHero,
	getExaminationContent
} from '@/app/(Private Pages)/actions/academia-examination';
import ExaminationHeroEditor from '@/app/(Private Pages)/admin/academia/components/ExaminationHeroEditor';
import ExaminationContentEditor from '@/app/(Private Pages)/admin/academia/components/ExaminationContentEditor';

export default async function AdminExaminationPage() {
	await requireAdmin();

	const [hero, content] = await Promise.all([
		getExaminationHero(),
		getExaminationContent()
	]);

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>Examination</h1>
				<p className='text-gray-600'>
					Click any section to edit it. Changes save to the database and revalidate the public page.
				</p>
			</div>

			<ExaminationHeroEditor initialData={hero} />
			<ExaminationContentEditor initialData={content} />
		</div>
	);
}
