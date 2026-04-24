import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getHero,
	getItems,
	updateHero,
	updateItems
} from '@/app/(Private Pages)/actions/academia-library-advisory-committee';
import SubHeroEditor from '../_components/SubHeroEditor';
import { AdvisoryListEditor } from '../_components/ListEditors';

export default async function Page() {
	await requireAdmin();
	const [hero, items] = await Promise.all([getHero(), getItems()]);
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>Library Advisory Committee</h1>
				<p className='text-gray-600'>Click any section to edit it.</p>
			</div>
			<SubHeroEditor initialData={hero} slug='advisory-committee' updateAction={updateHero} />
			<AdvisoryListEditor initialData={items} slug='advisory-committee' updateAction={updateItems} />
		</div>
	);
}
