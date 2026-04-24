import { getHero, getItems } from '@/app/(Private Pages)/actions/academia-library-advisory-committee';
import SimpleSubHero from '../_shared/SimpleSubHero';
import AdvisoryList from '../_shared/AdvisoryList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Library Advisory Committee',
	description: 'Members of the BPIT library advisory committee overseeing policy, acquisitions and service quality.',
	alternates: { canonical: '/academia/library/advisory-committee' }
};



export const revalidate = 3600;

export default async function Page() {
	const [hero, items] = await Promise.all([getHero(), getItems()]);
	return (
		<div className='space-y-6'>
			<SimpleSubHero data={hero} />
			<AdvisoryList data={items} />
		</div>
	);
}
