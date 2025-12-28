import React from 'react';
import { getTrainingPlacement } from '@/app/(Private Pages)/actions/training-placement';
import TrainingPlacementSection from '@/app/(Private Pages)/admin/placements/training-placement/components/TrainingPlacementSection';

export default async function TrainingPlacementPage() {
  const data = await getTrainingPlacement();

  return <TrainingPlacementSection data={data} />;
}
