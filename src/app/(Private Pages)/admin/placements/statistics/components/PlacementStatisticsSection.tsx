'use client';

import { useState } from 'react';
import HeroSection from '@/components/placements/statistics/HeroSection';
import TopStudentsSection from '@/components/placements/statistics/TopStudentsSection';
import YearDeptFilters from '@/components/placements/statistics/YearDeptFilters';
import KeyMetricsSection from '@/components/placements/statistics/KeyMetricsSection';
import DepartmentSection from '@/components/placements/statistics/DepartmentSection';
import SectorSection from '@/components/placements/statistics/SectorSection';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface PlacementStatisticsSectionProps {
	data: PlacementStatisticsData | null;
}

export default function PlacementStatisticsSection({ data }: PlacementStatisticsSectionProps) {
	const [selectedYear, setSelectedYear] = useState(data?.years?.[0] || '2024');
	const [selectedDepartment, setSelectedDepartment] = useState('All');

	if (!data) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center'>
				<p className='text-gray-500'>No placement statistics data available.</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
			<HeroSection data={data} />
			<TopStudentsSection data={data} />
			<YearDeptFilters
				data={data}
				selectedYear={selectedYear}
				selectedDepartment={selectedDepartment}
				onYearChange={setSelectedYear}
				onDepartmentChange={setSelectedDepartment}
			/>
			<KeyMetricsSection data={data} selectedYear={selectedYear} />
			{selectedDepartment === 'All' && (
				<DepartmentSection data={data} selectedYear={selectedYear} />
			)}
			<SectorSection data={data} />
		</div>
	);
}
