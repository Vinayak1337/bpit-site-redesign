import { getHero, getContact } from '@/app/(Private Pages)/actions/academia-library-contact';
import SimpleSubHero from '../_shared/SimpleSubHero';
import ContactBlock from '../_shared/ContactBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Library Contact',
	description: 'Contact information for the BPIT library — phone, email, address and working hours.',
	alternates: { canonical: '/academia/library/contact' }
};



export const revalidate = 3600;

export default async function Page() {
	const [hero, contact] = await Promise.all([getHero(), getContact()]);
	return (
		<div className='space-y-6'>
			<SimpleSubHero data={hero} />
			<ContactBlock data={contact} />
		</div>
	);
}
