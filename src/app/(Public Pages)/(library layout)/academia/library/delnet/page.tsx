import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-delnet';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'DELNET',
	description: 'Access information for DELNET (Developing Library Network) resources available through the BPIT library.',
	alternates: { canonical: '/academia/library/delnet' }
};



export const revalidate = 3600;

export default async function Page() {
	const [hero, content] = await Promise.all([getHero(), getContent()]);
	return (
		<div className='space-y-6'>
			<SimpleSubHero data={hero} />
			<SimpleSubContent data={content} />
		</div>
	);
}
