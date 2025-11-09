import React from 'react';
import { getManagement } from '@/app/(Private Pages)/actions/management';
import ManagementSection from './components/ManagementSection';

const MANAGEMENT_SLUG = 'management';

export default async function ManagementPage() {
	const managementData = await getManagement(MANAGEMENT_SLUG);

	return <ManagementSection data={managementData} />;
}
