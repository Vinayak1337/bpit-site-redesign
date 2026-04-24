import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-self-learning';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Self-Learning',
	description: 'Self-learning resources curated by the BPIT library — e-books, video lectures, and online courses.',
	alternates: { canonical: '/academia/library/self-learning' }
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
