'use client';

import React from 'react';
import PageHero from '@/app/(Public Pages)/management/components/PageHero';
import PolicyListCard from '@/app/(Public Pages)/management/components/PolicyListCard';
import StepsFramework from '@/app/(Public Pages)/management/components/StepsFramework';
import type { PoliciesProceduresData } from '@/app/(Private Pages)/actions/management';

interface PoliciesProceduresSectionProps {
	data: PoliciesProceduresData;
}

export default function PoliciesProceduresSection({ data }: PoliciesProceduresSectionProps) {
	return (
		<div className='space-y-8'>
			<PageHero data={data.hero} />

			<div className='grid md:grid-cols-2 gap-8'>
				<div className='space-y-6'>
					{data.policyCategories.slice(0, 2).map(category => (
						<PolicyListCard key={category.id} data={category} />
					))}
				</div>

				<div className='space-y-6'>
					{data.policyCategories.slice(2, 4).map(category => (
						<PolicyListCard key={category.id} data={category} />
					))}
				</div>
			</div>

			<StepsFramework data={data.implementationFramework} />
		</div>
	);
}