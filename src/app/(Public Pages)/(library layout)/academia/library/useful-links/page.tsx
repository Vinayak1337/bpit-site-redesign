import { getHero, getItems } from '@/app/(Private Pages)/actions/academia-library-useful-links';
import SimpleSubHero from '../_shared/SimpleSubHero';
import UsefulLinksList from '../_shared/UsefulLinksList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Useful Links',
	description: 'Curated useful links for BPIT students and faculty — databases, portals, tools and learning resources.',
	alternates: { canonical: '/academia/library/useful-links' }
};



export const revalidate = 3600;

export default async function Page() {
	const [hero, items] = await Promise.all([getHero(), getItems()]);
	return (
		<div className='space-y-6'>
			<SimpleSubHero data={hero} />
			<UsefulLinksList data={items} />
		</div>
	);
}
