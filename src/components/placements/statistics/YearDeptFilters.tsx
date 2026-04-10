'use client';

import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import type { PlacementStatisticsData } from '@/app/(Private Pages)/actions/placement-statistics';

interface YearDeptFiltersProps {
	data: PlacementStatisticsData;
	selectedYear: string;
	selectedDepartment: string;
	onYearChange: (year: string) => void;
	onDepartmentChange: (dept: string) => void;
}

export default function YearDeptFilters({
	data, selectedYear, selectedDepartment, onYearChange, onDepartmentChange
}: YearDeptFiltersProps) {
	return (
		<section className='py-8 bg-gradient-to-br from-gray-50 to-blue-50'>
			<div className='container mx-auto px-4 sm:px-6'>
				<div className='max-w-2xl mx-auto bg-white rounded-2xl p-5 shadow-lg border border-gray-200'>
					<div className='flex flex-col sm:flex-row gap-4 items-center justify-center' role='group' aria-label='Statistics filters'>
						<div className='space-y-1 w-full sm:w-auto'>
							<label className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Academic Year</label>
							<Select value={selectedYear} onValueChange={onYearChange} aria-label='Select academic year'>
								<SelectTrigger className='w-full sm:w-36'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{(data.years || []).map(year => (
										<SelectItem key={year} value={year}>{year}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-1 w-full sm:w-auto'>
							<label className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Department</label>
							<Select value={selectedDepartment} onValueChange={onDepartmentChange} aria-label='Select department'>
								<SelectTrigger className='w-full sm:w-48'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{(data.departments || []).map(dept => (
										<SelectItem key={dept} value={dept}>
											{dept === 'All' ? 'All Departments' : dept}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
