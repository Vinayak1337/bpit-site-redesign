'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import type { AdmissionsWhyBpitPageData } from '@/app/(Private Pages)/actions/admissions';
import AdmissionsWhyBpitForm from '@/app/(Private Pages)/admin/admissions/components/AdmissionsWhyBpitForm';
import WhyHero from '@/app/(Public Pages)/admissions/why-bpit/components/WhyHero';
import StatsStrip from '@/app/(Public Pages)/admissions/why-bpit/components/StatsStrip';
import WhyBPITHighlights from '@/app/(Public Pages)/admissions/components/WhyBPITHighlights';
import Accreditations from '@/app/(Public Pages)/admissions/components/Accreditations';
import FinalCTA from '@/app/(Public Pages)/admissions/components/FinalCTA';

type Props = {
	initialData: AdmissionsWhyBpitPageData;
};

export default function AdmissionsWhyBpitEditor({ initialData }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AdmissionsWhyBpitPageData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Why Hero'
				formContent={
					<AdmissionsWhyBpitForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<WhyHero data={previewData.hero} />
			</Editable>

			<Editable
				label='Why Stats'
				formContent={
					<AdmissionsWhyBpitForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['stats']}
					/>
				}>
				<StatsStrip data={previewData.stats} />
			</Editable>

			<Editable
				label='Why Highlights'
				formContent={
					<AdmissionsWhyBpitForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['highlights']}
					/>
				}>
				<WhyBPITHighlights data={previewData.highlights} />
			</Editable>

			<Editable
				label='Why Accreditations'
				formContent={
					<AdmissionsWhyBpitForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['accreditations']}
					/>
				}>
				<Accreditations data={previewData.accreditations} />
			</Editable>

			<Editable
				label='Why Final CTA'
				formContent={
					<AdmissionsWhyBpitForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['finalCta']}
					/>
				}>
				<FinalCTA data={previewData.finalCta} />
			</Editable>
		</div>
	);
}
