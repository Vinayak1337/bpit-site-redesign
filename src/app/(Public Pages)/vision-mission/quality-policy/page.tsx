import React from 'react';
import { getQualityPolicy } from '@/app/(Private Pages)/actions/vision-mission';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import QualityPolicySection from '../components/QualityPolicySection';

export default async function QualityPolicyPage() {
	const qualityPolicyData = await getQualityPolicy(VISION_MISSION_SLUG);

	return <QualityPolicySection data={qualityPolicyData} />;
}
