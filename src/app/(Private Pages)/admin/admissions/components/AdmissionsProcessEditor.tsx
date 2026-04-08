'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, PencilLine } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import type {
	AdmissionsProcessMeta,
	AdmissionsProgramCatalogItem
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsProcessForm from '@/app/(Private Pages)/admin/admissions/components/AdmissionsProcessForm';
import ProcessExplorer from '@/app/(Public Pages)/admissions/process/components/ProcessExplorer';
import ProgramDetailView from '@/app/(Public Pages)/admissions/process/components/ProgramDetailView';

type ProcessPageData = {
	meta: AdmissionsProcessMeta;
	programs: AdmissionsProgramCatalogItem[];
};

type Props = {
	initialData: ProcessPageData;
};

function EditTriggerCard({
	title,
	description
}: {
	title: string;
	description: string;
}) {
	return (
		<div className='rounded-2xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 via-white to-slate-50 px-5 py-5 shadow-sm transition-all duration-200'>
			<div className='mb-3 inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white'>
				<PencilLine className='h-3.5 w-3.5' />
				Click To Edit
			</div>
			<div className='flex items-start justify-between gap-4'>
				<div className='space-y-2'>
					<h3 className='text-lg font-semibold text-slate-900'>{title}</h3>
					<p className='text-sm leading-6 text-slate-600'>{description}</p>
				</div>
				<ArrowRight className='mt-1 h-5 w-5 flex-shrink-0 text-blue-600' />
			</div>
		</div>
	);
}

function ProcessCatalogPreview({ data }: { data: ProcessPageData }) {
	const previewProgram = data.programs[0] ?? null;

	return (
		<div className='space-y-10'>
			<ProcessExplorer
				meta={data.meta}
				programs={data.programs}
			/>
			{previewProgram ? (
				<div className='space-y-3'>
					<p className='px-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>
						Sample detail preview
					</p>
					<ProgramDetailView
						program={previewProgram}
						meta={data.meta}
					/>
				</div>
			) : null}
		</div>
	);
}

export default function AdmissionsProcessEditor({ initialData }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<ProcessPageData>(initial);

	return (
		<div className='space-y-8'>
			<div className='grid gap-4 lg:grid-cols-2'>
				<Editable
					label='Process Meta'
					formContent={
						<AdmissionsProcessForm
							initialData={initial}
							onChange={setPreviewData}
							visibleSections={['meta']}
						/>
					}>
					<EditTriggerCard
						title='Edit taxonomy and process copy'
						description='Click this card to manage categories, subcategories, sidebar copy, breadcrumbs, tabs, and other text used across the process UI.'
					/>
				</Editable>

				<Editable
					label='Process Program Catalog'
					presentation='dialog'
					contentClassName='bg-slate-50'
					formContent={
						<AdmissionsProcessForm
							initialData={initial}
							onChange={setPreviewData}
							visibleSections={['programs']}
						/>
					}>
					<EditTriggerCard
						title='Edit program catalog'
						description='Click this card to assign programs to category and subcategory pairs, then manage their details, structure, careers, and faculty.'
					/>
				</Editable>
			</div>

			<section className='space-y-4'>
				<div className='space-y-1'>
					<h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-slate-600'>
						Interactive Process Preview
					</h3>
					<p className='text-sm text-slate-500'>
						Use the two edit cards above to open forms. This preview stays clickable so you can
						test both the process list and the sample detail view in one place.
					</p>
				</div>
				<ProcessCatalogPreview data={previewData} />
			</section>
		</div>
	);
}
