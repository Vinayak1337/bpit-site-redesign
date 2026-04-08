'use client';

import { Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAdmissionsIcon } from '@/lib/admissions-icons';
import type { AdmissionsProgramCatalogItem } from '@/app/(Private Pages)/actions/admissions';

type Props = {
	program: AdmissionsProgramCatalogItem;
	onViewDetails: (programId: string) => void;
	durationLabel?: string;
	intakeLabel?: string;
	ctaLabel?: string;
};

export default function ProcessProgramCard({
	program,
	onViewDetails,
	durationLabel = 'Duration',
	intakeLabel = 'Intake',
	ctaLabel = 'View Details'
}: Props) {
	const ProgramIcon = getAdmissionsIcon(program.icon);

	return (
		<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg'>
			<div className='p-4 sm:p-6'>
				<div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
					<div className='flex-1'>
						<div className='mb-3 flex items-center gap-3'>
							<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 sm:h-12 sm:w-12'>
								<ProgramIcon className='h-6 w-6' />
							</div>
							<div className='min-w-0 flex-1'>
								<h3 className='text-lg font-bold leading-tight text-gray-900 sm:text-xl'>
									{program.title}
								</h3>
								<div className='mt-1 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-4'>
									<span className='flex items-center gap-1'>
										<Clock className='h-4 w-4' />
										{durationLabel} {program.duration}
									</span>
									<span className='flex items-center gap-1'>
										<Users className='h-4 w-4' />
										{intakeLabel} - {program.intake}
									</span>
								</div>
							</div>
						</div>
						<p className='mb-4 text-sm text-gray-600 sm:text-base'>{program.description}</p>
						<div className='mb-4 flex flex-wrap gap-2'>
							{program.highlights.map(highlight => (
								<span
									key={highlight}
									className='rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 sm:px-3 sm:text-sm'>
									{highlight}
								</span>
							))}
						</div>
					</div>
					<Button
						variant='outline'
						onClick={() => onViewDetails(program.id)}
						className='w-full whitespace-nowrap rounded-lg border-2 border-blue-500 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-500 hover:text-white sm:ml-6 sm:w-auto sm:px-6 sm:text-base'
						trackingEvent='admissions_view_program_details'
						trackingData={{ programId: program.id, programTitle: program.title }}>
						{ctaLabel}
					</Button>
				</div>
			</div>
		</div>
	);
}
