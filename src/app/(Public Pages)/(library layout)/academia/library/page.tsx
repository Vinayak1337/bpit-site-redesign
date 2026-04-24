import type { Metadata } from 'next';
import {
	getLibraryHero,
	getLibraryStats,
	getLibraryMission,
	getLibraryFeatures,
	getLibraryInfo
} from '@/app/(Private Pages)/actions/academia-library';
import { LibraryHub } from './components/LibrarySections';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Library',
	description:
		'The BPIT Library — books, journals, digital resources, research support and modern study spaces for students and faculty.',
	alternates: { canonical: '/academia/library' }
};

export default async function LibraryPage() {
	const [hero, stats, mission, features, info] = await Promise.all([
		getLibraryHero(),
		getLibraryStats(),
		getLibraryMission(),
		getLibraryFeatures(),
		getLibraryInfo()
	]);

	return (
		<LibraryHub
			hero={hero}
			stats={stats}
			mission={mission}
			features={features}
			info={info}
		/>
	);
}
