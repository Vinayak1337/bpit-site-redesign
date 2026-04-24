import React from 'react';
import { getRecruitersData } from '@/app/(Private Pages)/actions/recruiters';
import RecruitersClient from './RecruitersClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Recruiters',
	description: 'Companies that have recruited from BPIT — a diverse list of top tech, core engineering and consulting recruiters.',
	alternates: { canonical: '/placements/recruiters' }
};



export default async function RecruitersPage() {
	const data = await getRecruitersData();

	if (!data) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						Recruiters Data Not Found
					</h1>
					<p className="text-gray-600">
						Please run the seed script to populate recruiters data.
					</p>
				</div>
			</div>
		);
	}

	return <RecruitersClient data={data} />;
}
