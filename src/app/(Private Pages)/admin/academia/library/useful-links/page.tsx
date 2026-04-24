import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getHero,
	getItems,
	updateHero,
	updateItems
} from '@/app/(Private Pages)/actions/academia-library-useful-links';
import SubHeroEditor from '../_components/SubHeroEditor';
import { UsefulLinksListEditor } from '../_components/ListEditors';

export default async function Page() {
	await requireAdmin();
	const [hero, items] = await Promise.all([getHero(), getItems()]);
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>Useful Links</h1>
				<p className='text-gray-600'>Click any section to edit it.</p>
			</div>
			<SubHeroEditor initialData={hero} slug='useful-links' updateAction={updateHero} />
			<UsefulLinksListEditor initialData={items} updateAction={updateItems} />
		</div>
	);
}
