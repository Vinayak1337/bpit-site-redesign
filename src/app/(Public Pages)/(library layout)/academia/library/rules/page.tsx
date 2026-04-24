import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-rules';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Library Rules',
	description: 'Library rules and code of conduct at BPIT — borrowing limits, silence zones, and guidelines for students and faculty.',
	alternates: { canonical: '/academia/library/rules' }
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
