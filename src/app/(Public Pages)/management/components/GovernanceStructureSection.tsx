'use client';

import React from 'react';
import PageHero from '@/app/(Public Pages)/management/components/PageHero';
import ContentCard from '@/app/(Public Pages)/management/components/ContentCard';
import type { GovernanceStructureData } from '@/app/(Private Pages)/actions/management';

interface GovernanceStructureSectionProps {
	data: GovernanceStructureData;
}

export default function GovernanceStructureSection({ data }: GovernanceStructureSectionProps) {
	return (
		<div className='space-y-8'>
			<PageHero data={data.hero} />

			<div className='space-y-6'>
				{data.sections.map(section => (
					<ContentCard key={section.id} data={section} />
				))}
			</div>
		</div>
	);
}