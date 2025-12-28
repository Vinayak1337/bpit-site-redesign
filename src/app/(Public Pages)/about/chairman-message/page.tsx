import React from 'react';
import { getChairmanMessage } from '@/app/(Private Pages)/actions/about';
import { CHAIRMAN_MESSAGE_SLUG } from '@/lib/page-slugs';
import ChairmanMessageSection from '@/components/about/ChairmanMessageSection';

export default async function ChairmanMessagePage() {
  const data = await getChairmanMessage(CHAIRMAN_MESSAGE_SLUG);
  
  return <ChairmanMessageSection data={data} />;
}
