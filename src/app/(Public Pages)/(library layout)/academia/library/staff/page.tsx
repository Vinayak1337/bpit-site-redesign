import { getHero, getItems } from '@/app/(Private Pages)/actions/academia-library-staff';
import SimpleSubHero from '../_shared/SimpleSubHero';
import StaffList from '../_shared/StaffList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Library Staff',
	description: 'BPIT library staff directory — librarians and support team with contact details and specialisations.',
	alternates: { canonical: '/academia/library/staff' }
};



export const revalidate = 3600;

export default async function Page() {
	const [hero, items] = await Promise.all([getHero(), getItems()]);
	return (
		<div className='space-y-6'>
			<SimpleSubHero data={hero} />
			<StaffList data={items} />
		</div>
	);
}
