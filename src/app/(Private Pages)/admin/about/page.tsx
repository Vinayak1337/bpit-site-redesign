import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAboutHero,
	getAboutLegacy,
	getAboutOverview,
	getChairmanMessage,
	getPrincipalMessage,
	getFounderTribute
} from '@/app/(Private Pages)/actions/about';
import { 
	ABOUT_PAGE_SLUG,
	CHAIRMAN_MESSAGE_SLUG,
	PRINCIPAL_MESSAGE_SLUG,
	FOUNDER_TRIBUTE_SLUG
} from '@/lib/page-slugs';
import AboutHeroEditor from '@/app/(Private Pages)/admin/about/components/AboutHeroEditor';
import AboutOverviewEditor from '@/app/(Private Pages)/admin/about/components/AboutOverviewEditor';
import AboutLegacyEditor from '@/app/(Private Pages)/admin/about/components/AboutLegacyEditor';
import ChairmanMessageEditor from '@/app/(Private Pages)/admin/about/components/ChairmanMessageEditor';
import PrincipalMessageEditor from '@/app/(Private Pages)/admin/about/components/PrincipalMessageEditor';
import FounderTributeEditor from '@/app/(Private Pages)/admin/about/components/FounderTributeEditor';

export default async function AdminAboutPage() {
	await requireAdmin();
	const pageSlug = ABOUT_PAGE_SLUG;

	const [hero, overview, legacy, chairmanMessage, principalMessage, founderTribute] = await Promise.all([
		getAboutHero(pageSlug),
		getAboutOverview(pageSlug),
		getAboutLegacy(pageSlug),
		getChairmanMessage(CHAIRMAN_MESSAGE_SLUG),
		getPrincipalMessage(PRINCIPAL_MESSAGE_SLUG),
		getFounderTribute(FOUNDER_TRIBUTE_SLUG)
	]);

	return (
		<div className='space-y-8 pb-12'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit all About page sections below. Changes apply immediately after saving.
			</div>
			
			<div className='space-y-8'>
				<div>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>Main About Page</h2>
					<div className='space-y-8'>
						<AboutHeroEditor initialData={hero} pageSlug={pageSlug} />
						<AboutOverviewEditor initialData={overview} pageSlug={pageSlug} />
						<AboutLegacyEditor initialData={legacy} pageSlug={pageSlug} />
					</div>
				</div>

				<div className='border-t border-gray-200 pt-8'>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>Leadership Messages</h2>
					<div className='space-y-8'>
						<ChairmanMessageEditor initialData={chairmanMessage} pageSlug={CHAIRMAN_MESSAGE_SLUG} />
						<PrincipalMessageEditor initialData={principalMessage} pageSlug={PRINCIPAL_MESSAGE_SLUG} />
					</div>
				</div>

				<div className='border-t border-gray-200 pt-8'>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>Institutional Heritage</h2>
					<div className='space-y-8'>
						<FounderTributeEditor initialData={founderTribute} pageSlug={FOUNDER_TRIBUTE_SLUG} />
					</div>
				</div>
			</div>
		</div>
	);
}
