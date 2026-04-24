import React from 'react';
import { getManagement } from '@/app/(Private Pages)/actions/management';
import ManagementSection from './components/ManagementSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Management',
	description: 'Governance and management of Bhagwan Parshuram Institute of Technology — leadership, structure, policies and procedures.',
	alternates: { canonical: '/management' }
};



const MANAGEMENT_SLUG = 'management';

export default async function ManagementPage() {
	const managementData = await getManagement(MANAGEMENT_SLUG);

	return <ManagementSection data={managementData} />;
}
