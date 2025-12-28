'use client';

import { useState, useEffect } from 'react';
import { getPlacementStatistics, type PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';
import HeroEditor from './components/HeroEditor';
import StudentsEditor from './components/StudentsEditor';
import MetricsEditor from './components/MetricsEditor';
import DepartmentEditor from './components/DepartmentEditor';
import SectorEditor from './components/SectorEditor';
import TrendsEditor from './components/TrendsEditor';

export default function AdminPlacementStatisticsPage() {
	const [data, setData] = useState<PlacementStatisticsData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedYear, setSelectedYear] = useState('2024');

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await getPlacementStatistics();
				setData(result);
				if (result?.years?.[0]) {
					setSelectedYear(result.years[0]);
				}
			} catch (error) {
				console.error('Error fetching placement statistics:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center'>
				<div className='text-slate-600'>Loading placement statistics...</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className='container mx-auto py-8'>
				<div className='rounded-lg border border-slate-200 bg-white p-8 text-center'>
					<p className='text-slate-600'>
						No placement statistics data found. Please run the seed script.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Page Header */}
			<div className='bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm'>
				<div className='container mx-auto px-4 py-6'>
					<h1 className='text-3xl font-bold text-gray-900'>
						Placement Statistics Management
					</h1>
					<p className='text-gray-600 mt-2'>
						Edit each section independently with live preview
					</p>
				</div>
			</div>

			{/* Sectioned Editors */}
			<div className='space-y-0'>
				<HeroEditor initialData={data} pageSlug='placement-statistics' />
				<StudentsEditor initialData={data} pageSlug='placement-statistics' />
				<MetricsEditor initialData={data} pageSlug='placement-statistics' />
				<DepartmentEditor 
					initialData={data} 
					pageSlug='placement-statistics' 
					selectedYear={selectedYear}
				/>
				<SectorEditor initialData={data} pageSlug='placement-statistics' />
				<TrendsEditor initialData={data} pageSlug='placement-statistics' />
			</div>
		</div>
	);
}
