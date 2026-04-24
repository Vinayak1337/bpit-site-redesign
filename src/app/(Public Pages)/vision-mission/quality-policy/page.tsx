import React from 'react';
import { getQualityPolicy } from '@/app/(Private Pages)/actions/vision-mission';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import QualityPolicySection from '../components/QualityPolicySection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quality Policy',
	description: 'BPIT quality policy outlining our commitment to continual improvement in teaching, learning, research and student outcomes.',
	alternates: { canonical: '/vision-mission/quality-policy' }
};



export default async function QualityPolicyPage() {
	const qualityPolicyData = await getQualityPolicy(VISION_MISSION_SLUG);

	return <QualityPolicySection data={qualityPolicyData} />;
}
