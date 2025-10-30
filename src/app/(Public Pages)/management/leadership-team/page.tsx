'use client';

import React from 'react';
import PageHero from '@/app/(Public Pages)/management/components/PageHero';
import LeadershipCard from '@/app/(Public Pages)/management/components/LeadershipCard';
import { leadershipTeamData } from '@/data/management';

const LeadershipTeamPage = () => {
	return (
		<div className='space-y-8'>
			<PageHero data={leadershipTeamData.hero} />

			<div className='grid md:grid-cols-2 gap-8'>
				{leadershipTeamData.leaders.map(leader => (
					<LeadershipCard key={leader.id} data={leader} />
				))}
			</div>
		</div>
	);
};

export default LeadershipTeamPage;
