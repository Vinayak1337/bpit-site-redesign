import React from 'react';
import { getPrincipalMessage } from '@/app/(Private Pages)/actions/about';
import { PRINCIPAL_MESSAGE_SLUG } from '@/lib/page-slugs';
import PrincipalMessageSection from '@/components/about/PrincipalMessageSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Principal\'s Message',
	description: 'Message from the Principal of BPIT on academic excellence, student growth, and research at Bhagwan Parshuram Institute of Technology.',
	alternates: { canonical: '/about/principal-message' }
};



export default async function PrincipalMessagePage() {
  const data = await getPrincipalMessage(PRINCIPAL_MESSAGE_SLUG);
  
  return <PrincipalMessageSection data={data} />;
}
