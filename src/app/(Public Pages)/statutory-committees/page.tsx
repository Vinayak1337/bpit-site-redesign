import React from 'react';
import { getStatutoryOverview } from '@/app/(Private Pages)/actions/statutory-committees';
import StatutoryCommitteesSection from './components/StatutoryCommitteesSection';

const STATUTORY_SLUG = 'statutory-committees';

export const metadata = {
	title: 'Statutory Committees | BPIT',
	description:
		'Statutory Committees at BPIT - Ensuring compliance, quality, and student welfare through various regulatory bodies.'
};

export default async function StatutoryCommitteesPage() {
	const data = await getStatutoryOverview(STATUTORY_SLUG);

	return <StatutoryCommitteesSection data={data} />;
}
