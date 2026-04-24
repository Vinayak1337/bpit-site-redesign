import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getHero,
	getContact,
	updateHero,
	updateContact
} from '@/app/(Private Pages)/actions/academia-library-contact';
import SubHeroEditor from '../_components/SubHeroEditor';
import ContactEditor from '../_components/ContactEditor';

export default async function Page() {
	await requireAdmin();
	const [hero, contact] = await Promise.all([getHero(), getContact()]);
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>Contact</h1>
				<p className='text-gray-600'>Click any section to edit it.</p>
			</div>
			<SubHeroEditor initialData={hero} slug='contact' updateAction={updateHero} />
			<ContactEditor initialData={contact} updateAction={updateContact} />
		</div>
	);
}
