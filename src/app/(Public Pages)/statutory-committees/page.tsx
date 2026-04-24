import { getStatutoryOverview } from '@/app/(Private Pages)/actions/statutory-committees';
import StatutoryOverviewView from '@/components/statutory-committees/StatutoryOverviewView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Statutory Committees',
	description: 'Statutory committees at BPIT — IQAC, Anti-Ragging, Internal Complaints, Student Welfare and Grievance Redressal.',
	alternates: { canonical: '/statutory-committees' }
};



export default async function StatutoryCommitteesPage() {
	const data = await getStatutoryOverview('statutory-committees');
	return <StatutoryOverviewView data={data} />;
}
