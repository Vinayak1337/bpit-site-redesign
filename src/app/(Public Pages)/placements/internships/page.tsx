import React from 'react';
import { getInternshipsData } from '@/app/(Private Pages)/actions/internships';
import InternshipsClient from './InternshipsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Internships',
	description: 'Internship opportunities and programmes for BPIT students — industry, research and summer internships.',
	alternates: { canonical: '/placements/internships' }
};



export const revalidate = 3600; // Revalidate every hour

export default async function InternshipsPage() {
  const data = await getInternshipsData();

  if (!data) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-lg text-slate-600'>No internships data available.</p>
      </div>
    );
  }

  return <InternshipsClient data={data} />;
}