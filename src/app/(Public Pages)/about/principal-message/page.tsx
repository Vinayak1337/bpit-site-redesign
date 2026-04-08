import React from 'react';
import { getPrincipalMessage } from '@/app/(Private Pages)/actions/about';
import { PRINCIPAL_MESSAGE_SLUG } from '@/lib/page-slugs';
import PrincipalMessageSection from '@/components/about/PrincipalMessageSection';

export default async function PrincipalMessagePage() {
  const data = await getPrincipalMessage(PRINCIPAL_MESSAGE_SLUG);
  
  return <PrincipalMessageSection data={data} />;
}
