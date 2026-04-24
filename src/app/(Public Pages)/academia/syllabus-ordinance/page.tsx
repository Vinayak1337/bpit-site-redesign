import type { Metadata } from 'next';
import SyllabusHero from './components/SyllabusHero';
import SyllabusPrograms from './components/SyllabusPrograms';
import {
	getSyllabusHero,
	getSyllabusPrograms
} from '@/app/(Private Pages)/actions/academia-syllabus-ordinance';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Syllabus & Ordinance',
	description:
		'Syllabus and ordinance documents for BTech programmes at BPIT as per the GGSIPU curriculum across all semesters.',
	alternates: { canonical: '/academia/syllabus-ordinance' }
};

export default async function SyllabusOrdinancePage() {
	const [hero, programs] = await Promise.all([
		getSyllabusHero(),
		getSyllabusPrograms()
	]);
	return (
		<>
			<SyllabusHero data={hero} />
			<SyllabusPrograms programs={programs.items} />
		</>
	);
}
