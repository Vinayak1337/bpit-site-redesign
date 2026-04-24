import type { Metadata } from 'next';
import NoticesHero from './components/NoticesHero';
import NoticesList from './components/NoticesList';
import {
	getNoticesHero,
	getNoticesList
} from '@/app/(Private Pages)/actions/academia-notices-circulars';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Notices & Circulars',
	description:
		'Latest official notices and circulars issued by BPIT for students, faculty and staff.',
	alternates: { canonical: '/academia/notices-circulars' }
};

export default async function NoticesCircularsPage() {
	const [hero, notices] = await Promise.all([
		getNoticesHero(),
		getNoticesList()
	]);
	return (
		<>
			<NoticesHero data={hero} />
			<NoticesList notices={notices.items} />
		</>
	);
}
