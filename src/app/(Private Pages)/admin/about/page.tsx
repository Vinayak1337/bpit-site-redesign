import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAboutHero,
	getAboutLegacy,
	getAboutOverview
} from '@/app/(Private Pages)/actions/about';
import { ABOUT_PAGE_SLUG } from '@/lib/page-slugs';
import AboutHeroEditor from '@/app/(Private Pages)/admin/about/components/AboutHeroEditor';
import AboutOverviewEditor from '@/app/(Private Pages)/admin/about/components/AboutOverviewEditor';
import AboutLegacyEditor from '@/app/(Private Pages)/admin/about/components/AboutLegacyEditor';

export default async function AdminAboutPage() {
	await requireAdmin();
	const pageSlug = ABOUT_PAGE_SLUG;

	const [hero, overview, legacy] = await Promise.all([
		getAboutHero(pageSlug),
		getAboutOverview(pageSlug),
		getAboutLegacy(pageSlug)
	]);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the main About page sections below. Changes apply immediately after
				saving.
			</div>

			<div className='space-y-8'>
				<div>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>
						Main About Page
					</h2>
					<div className='space-y-8'>
						<AboutHeroEditor initialData={hero} pageSlug={pageSlug} />
						<AboutOverviewEditor initialData={overview} pageSlug={pageSlug} />
						<AboutLegacyEditor initialData={legacy} pageSlug={pageSlug} />
					</div>
				</div>
			</div>
		</div>
	);
}
