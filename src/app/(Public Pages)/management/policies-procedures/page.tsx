'use client';

import React from 'react';
import PageHero from '@/app/(Public Pages)/management/components/PageHero';
import PolicyListCard from '@/app/(Public Pages)/management/components/PolicyListCard';
import StepsFramework from '@/app/(Public Pages)/management/components/StepsFramework';
import { policiesProceduresData } from '@/data/management';

const PoliciesProceduresPage = () => {
	return (
		<div className='space-y-8'>
			<PageHero data={policiesProceduresData.hero} />

			<div className='grid md:grid-cols-2 gap-8'>
				<div className='space-y-6'>
					{policiesProceduresData.policyCategories.slice(0, 2).map(category => (
						<PolicyListCard key={category.id} data={category} />
					))}
				</div>

				<div className='space-y-6'>
					{policiesProceduresData.policyCategories.slice(2, 4).map(category => (
						<PolicyListCard key={category.id} data={category} />
					))}
				</div>
			</div>

			<StepsFramework data={policiesProceduresData.implementationFramework} />
		</div>
	);
};

export default PoliciesProceduresPage;
