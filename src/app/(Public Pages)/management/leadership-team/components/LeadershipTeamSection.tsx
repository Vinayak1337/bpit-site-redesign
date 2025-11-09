'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import PageHero from '@/app/(Public Pages)/management/components/PageHero';
import LeadershipCard from '@/app/(Public Pages)/management/components/LeadershipCard';
import type { LeadershipTeamData } from '@/app/(Private Pages)/actions/management';

interface LeadershipTeamSectionProps {
	data: LeadershipTeamData;
}

const getIcon = (iconName: string) => {
	const IconComponent = (Icons as any)[iconName];
	return IconComponent || Icons.UserCheck;
};

export default function LeadershipTeamSection({ data }: LeadershipTeamSectionProps) {
	return (
		<div className='space-y-8'>
			<PageHero data={data.hero} />

			<div className='grid md:grid-cols-2 gap-8'>
				{data.leaders.map(leader => (
					<LeadershipCard key={leader.id} data={leader} />
				))}
			</div>
		</div>
	);
}