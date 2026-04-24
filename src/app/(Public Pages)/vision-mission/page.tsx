import React from 'react';
import { getVisionMission } from '@/app/(Private Pages)/actions/vision-mission';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import VisionMissionSection from './components/VisionMissionSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Vision & Mission',
	description: 'The vision and mission of BPIT — guiding principles that drive teaching, research, innovation and industry engagement at the institute.',
	alternates: { canonical: '/vision-mission' }
};



export default async function VisionPage() {
	const data = await getVisionMission(VISION_MISSION_SLUG);

	return <VisionMissionSection data={data} />;
}
