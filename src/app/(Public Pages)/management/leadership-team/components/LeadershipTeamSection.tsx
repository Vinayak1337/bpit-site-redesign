'use client';

import PageHero from '@/app/(Public Pages)/management/components/PageHero';
import LeadershipCard from '@/app/(Public Pages)/management/components/LeadershipCard';
import type { LeadershipTeamData } from '@/app/(Private Pages)/actions/management';

interface LeadershipTeamSectionProps {
	data: LeadershipTeamData;
}

export function LeadershipTeamHeroBlock({ data }: LeadershipTeamSectionProps) {
	return <PageHero data={data.hero} />;
}

export function LeadershipTeamLeadersBlock({ data }: LeadershipTeamSectionProps) {
	return (
		<div className='grid md:grid-cols-2 gap-8'>
			{data.leaders.map(leader => (
				<LeadershipCard key={leader.id} data={leader} />
			))}
		</div>
	);
}

export default function LeadershipTeamSection({ data }: LeadershipTeamSectionProps) {
	return (
		<div className='space-y-8'>
			<LeadershipTeamHeroBlock data={data} />
			<LeadershipTeamLeadersBlock data={data} />
		</div>
	);
}
