import { getAntiRagging } from '@/app/(Private Pages)/actions/statutory-committees';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	AntiRaggingHeroEditor,
	AntiRaggingDefinitionEditor,
	AntiRaggingMembersEditor,
	AntiRaggingMeasuresEditor,
	AntiRaggingPunishmentsEditor,
	AntiRaggingContactsEditor
} from '../components/AntiRaggingEditors';

const ANTI_RAGGING_SLUG = 'statutory-committees-anti-ragging';

export default async function AntiRaggingAdminPage() {
	await requireAdmin();
	const antiRaggingData = await getAntiRagging(ANTI_RAGGING_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Anti-Ragging page content below. Click on a section to edit it.
				Changes apply immediately after saving.
			</div>

			<div className='space-y-8'>
				<AntiRaggingHeroEditor
					initialData={antiRaggingData}
					pageSlug={ANTI_RAGGING_SLUG}
				/>
				<AntiRaggingDefinitionEditor
					initialData={antiRaggingData}
					pageSlug={ANTI_RAGGING_SLUG}
				/>
				<AntiRaggingMembersEditor
					initialData={antiRaggingData}
					pageSlug={ANTI_RAGGING_SLUG}
				/>
				<AntiRaggingMeasuresEditor
					initialData={antiRaggingData}
					pageSlug={ANTI_RAGGING_SLUG}
				/>
				<AntiRaggingPunishmentsEditor
					initialData={antiRaggingData}
					pageSlug={ANTI_RAGGING_SLUG}
				/>
				<AntiRaggingContactsEditor
					initialData={antiRaggingData}
					pageSlug={ANTI_RAGGING_SLUG}
				/>
			</div>
		</div>
	);
}
