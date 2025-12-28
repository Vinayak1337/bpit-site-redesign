import React from 'react';
import { getFounderTribute } from '@/app/(Private Pages)/actions/about';
import { FOUNDER_TRIBUTE_SLUG } from '@/lib/page-slugs';
import FounderTributeSection from '@/components/about/FounderTributeSection';

export default async function FounderTributePage() {
  const data = await getFounderTribute(FOUNDER_TRIBUTE_SLUG);
  
  return <FounderTributeSection data={data} />;
}
