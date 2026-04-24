import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getHero,
	getContent,
	updateHero,
	updateContent
} from '@/app/(Private Pages)/actions/academia-library-e-resources';
import SubHeroEditor from '../_components/SubHeroEditor';
import SimpleContentEditor from '../_components/SimpleContentEditor';

export default async function Page() {
	await requireAdmin();
	const [hero, content] = await Promise.all([getHero(), getContent()]);
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>E-Resources</h1>
				<p className='text-gray-600'>Click any section to edit it.</p>
			</div>
			<SubHeroEditor initialData={hero} slug='e-resources' updateAction={updateHero} />
			<SimpleContentEditor initialData={content} updateAction={updateContent} />
		</div>
	);
}
