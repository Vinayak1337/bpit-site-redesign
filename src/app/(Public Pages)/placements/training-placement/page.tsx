import React from 'react';
import { getTrainingPlacement } from '@/app/(Private Pages)/actions/training-placement';
import TrainingPlacementSection from '@/app/(Private Pages)/admin/placements/training-placement/components/TrainingPlacementSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Training & Placement',
	description: 'Training and placement cell at BPIT — career training, soft skills, industry interaction and placement assistance.',
	alternates: { canonical: '/placements/training-placement' }
};



export default async function TrainingPlacementPage() {
  const data = await getTrainingPlacement();

  return <TrainingPlacementSection data={data} />;
}
