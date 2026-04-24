import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getLibraryHero,
	getLibraryStats,
	getLibraryMission,
	getLibraryFeatures,
	getLibraryInfo
} from '@/app/(Private Pages)/actions/academia-library';
import {
	LibraryHeroEditor,
	LibraryStatsEditor,
	LibraryMissionEditor,
	LibraryFeaturesEditor,
	LibraryInfoEditor
} from '@/app/(Private Pages)/admin/academia/components/LibraryHubEditors';

export default async function AdminLibraryHubPage() {
	await requireAdmin();
	const [hero, stats, mission, features, info] = await Promise.all([
		getLibraryHero(),
		getLibraryStats(),
		getLibraryMission(),
		getLibraryFeatures(),
		getLibraryInfo()
	]);
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>Library</h1>
				<p className='text-gray-600'>
					Click any section to edit it. Changes save to the database and
					revalidate the public page.
				</p>
			</div>
			<LibraryHeroEditor initialData={hero} />
			<LibraryStatsEditor initialData={stats} />
			<LibraryMissionEditor initialData={mission} />
			<LibraryFeaturesEditor initialData={features} />
			<LibraryInfoEditor initialData={info} />
		</div>
	);
}
