'use client';

import React from 'react';
import PageHero from '@/app/(Public Pages)/management/components/PageHero';
import ContentCard from '@/app/(Public Pages)/management/components/ContentCard';
import type { GovernanceStructureData } from '@/app/(Private Pages)/actions/management';

interface GovernanceStructureSectionProps {
	data: GovernanceStructureData;
}

export function GovernanceStructureHeroBlock({
	data
}: GovernanceStructureSectionProps) {
	return <PageHero data={data.hero} />;
}

export function GovernanceStructureSectionsBlock({
	data
}: GovernanceStructureSectionProps) {
	return (
		<div className='space-y-6'>
			{data.sections.map(section => (
				<ContentCard key={section.id} data={section} />
			))}
		</div>
	);
}

export default function GovernanceStructureSection({ data }: GovernanceStructureSectionProps) {
	return (
		<div className='space-y-8'>
			<GovernanceStructureHeroBlock data={data} />
			<GovernanceStructureSectionsBlock data={data} />
		</div>
	);
}
