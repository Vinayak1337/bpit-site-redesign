import React from 'react';
import { getInternshipsData } from '@/app/(Private Pages)/actions/internships';
import InternshipsClient from './InternshipsClient';

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