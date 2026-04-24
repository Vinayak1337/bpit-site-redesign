import type { Metadata } from 'next';
import ExaminationHero from './components/ExaminationHero';
import ExaminationContent from './components/ExaminationContent';
import {
	getExaminationHero,
	getExaminationContent
} from '@/app/(Private Pages)/actions/academia-examination';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Examination',
	description:
		'Examination information at BPIT — schedules, exam cell contacts, policies, re-evaluation, and related academic procedures.',
	alternates: { canonical: '/academia/examination' }
};

export default async function ExaminationPage() {
	const [hero, content] = await Promise.all([
		getExaminationHero(),
		getExaminationContent()
	]);
	return (
		<>
			<ExaminationHero data={hero} />
			<ExaminationContent data={content} />
		</>
	);
}
