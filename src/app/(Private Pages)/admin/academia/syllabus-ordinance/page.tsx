import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getSyllabusHero,
	getSyllabusPrograms
} from '@/app/(Private Pages)/actions/academia-syllabus-ordinance';
import SyllabusHeroEditor from '@/app/(Private Pages)/admin/academia/components/SyllabusHeroEditor';
import SyllabusProgramsEditor from '@/app/(Private Pages)/admin/academia/components/SyllabusProgramsEditor';

export default async function AdminSyllabusOrdinancePage() {
	await requireAdmin();

	const [hero, programs] = await Promise.all([
		getSyllabusHero(),
		getSyllabusPrograms()
	]);

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>
					Syllabus & Ordinance
				</h1>
				<p className='text-gray-600'>
					Click any section to edit it. Changes save to the database and
					revalidate the public page.
				</p>
			</div>

			<SyllabusHeroEditor initialData={hero} />
			<SyllabusProgramsEditor initialData={programs} />
		</div>
	);
}
