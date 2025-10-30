'use client';

import React from 'react';
import PageHero from '@/app/(Public Pages)/management/components/PageHero';
import ContentCard from '@/app/(Public Pages)/management/components/ContentCard';
import { governanceStructureData } from '@/data/management';

const GovernanceStructurePage = () => {
	return (
		<div className='space-y-8'>
			<PageHero data={governanceStructureData.hero} />

			<div className='space-y-6'>
				{governanceStructureData.sections.map(section => (
					<ContentCard key={section.id} data={section} />
				))}
			</div>
		</div>
	);
};

export default GovernanceStructurePage;
