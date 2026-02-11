'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import {
	QualityAssuranceBodiesBlock,
	QualityCommitmentsBlock,
	QualityFrameworkBlock,
	QualityPolicyHeroBlock,
	QualityPolicyStatementBlock
} from '@/app/(Public Pages)/vision-mission/components/QualityPolicySection';
import QualityPolicyForm from './QualityPolicyForm';
import type { QualityPolicyData } from '@/app/(Private Pages)/actions/vision-mission';

type Props = {
	initialData: QualityPolicyData;
	pageSlug: string;
};

export default function QualityPolicyEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<QualityPolicyData>(initial);

	return (
		<div className='space-y-6'>
			<Editable
				label='Quality Policy Hero'
				formContent={
					<QualityPolicyForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<QualityPolicyHeroBlock data={previewData} />
			</Editable>

			<Editable
				label='Policy Statement'
				formContent={
					<QualityPolicyForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['policyStatement']}
					/>
				}>
				<QualityPolicyStatementBlock data={previewData} />
			</Editable>

			<Editable
				label='Quality Commitments'
				formContent={
					<QualityPolicyForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['commitments']}
					/>
				}>
				<QualityCommitmentsBlock data={previewData} />
			</Editable>

			<Editable
				label='Quality Framework'
				formContent={
					<QualityPolicyForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['framework']}
					/>
				}>
				<QualityFrameworkBlock data={previewData} />
			</Editable>

			<Editable
				label='Assurance Bodies'
				formContent={
					<QualityPolicyForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['assuranceBodies']}
					/>
				}>
				<QualityAssuranceBodiesBlock data={previewData} />
			</Editable>
		</div>
	);
}
