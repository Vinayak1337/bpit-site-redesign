import { getHero, getItems } from '@/app/(Private Pages)/actions/academia-library-downloads';
import SimpleSubHero from '../_shared/SimpleSubHero';
import DownloadsList from '../_shared/DownloadsList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Library Downloads',
	description: 'Downloadable forms, policies, and documents from the BPIT library.',
	alternates: { canonical: '/academia/library/downloads' }
};



export const revalidate = 3600;

export default async function Page() {
	const [hero, items] = await Promise.all([getHero(), getItems()]);
	return (
		<div className='space-y-6'>
			<SimpleSubHero data={hero} />
			<DownloadsList data={items} />
		</div>
	);
}
