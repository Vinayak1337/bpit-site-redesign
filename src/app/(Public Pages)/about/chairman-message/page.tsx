import React from 'react';
import { getChairmanMessage } from '@/app/(Private Pages)/actions/about';
import { CHAIRMAN_MESSAGE_SLUG } from '@/lib/page-slugs';
import ChairmanMessageSection from '@/components/about/ChairmanMessageSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Chairman\'s Message',
	description: 'Message from the Chairman of BPIT on the institute\'s mission, values, and continued commitment to quality engineering education.',
	alternates: { canonical: '/about/chairman-message' }
};



export default async function ChairmanMessagePage() {
  const data = await getChairmanMessage(CHAIRMAN_MESSAGE_SLUG);
  
  return <ChairmanMessageSection data={data} />;
}
