import React from 'react';
import { getFounderTribute } from '@/app/(Private Pages)/actions/about';
import { FOUNDER_TRIBUTE_SLUG } from '@/lib/page-slugs';
import FounderTributeSection from '@/components/about/FounderTributeSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Founder Tribute',
	description: 'A tribute to the founder whose vision shaped BPIT into a leading engineering institute affiliated with GGSIPU in Delhi.',
	alternates: { canonical: '/about/founder-tribute' }
};



export default async function FounderTributePage() {
  const data = await getFounderTribute(FOUNDER_TRIBUTE_SLUG);
  
  return <FounderTributeSection data={data} />;
}
