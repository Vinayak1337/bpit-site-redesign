'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import InternalComplaintsForm from './InternalComplaintsForm';
import {
	InternalComplaintsHeroSection,
	InternalComplaintsDefinitionSection,
	InternalComplaintsMembersSection,
	InternalComplaintsProceduresSection,
	InternalComplaintsSupportSection,
	InternalComplaintsRightsSection,
	InternalComplaintsContactsSection
} from '@/components/statutory-committees/InternalComplaintsView';
import type { InternalComplaintsData } from '@/app/(Private Pages)/actions/statutory-committees';

type Props = {
	initialData: InternalComplaintsData;
	pageSlug: string;
};

export default function InternalComplaintsEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<InternalComplaintsData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Internal Complaints Hero'
				formContent={
					<InternalComplaintsForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<InternalComplaintsHeroSection data={previewData.hero} />
			</Editable>

			<Editable
				label='Definition and Scope'
				formContent={
					<InternalComplaintsForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['definition']}
					/>
				}>
				<InternalComplaintsDefinitionSection data={previewData.definition} />
			</Editable>

			<Editable
				label='Committee Members'
				formContent={
					<InternalComplaintsForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['members']}
					/>
				}>
				<InternalComplaintsMembersSection data={previewData.committeeMembers} />
			</Editable>

			<Editable
				label='Complaint Procedure'
				formContent={
					<InternalComplaintsForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['procedures']}
					/>
				}>
				<InternalComplaintsProceduresSection data={previewData.procedures} />
			</Editable>

			<Editable
				label='Support Services'
				formContent={
					<InternalComplaintsForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['support']}
					/>
				}>
				<InternalComplaintsSupportSection data={previewData.supportServices} />
			</Editable>

			<Editable
				label='Rights and Responsibilities'
				formContent={
					<InternalComplaintsForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['rights']}
					/>
				}>
				<InternalComplaintsRightsSection data={previewData.rightsAndResponsibilities} />
			</Editable>

			<Editable
				label='Contact and Reporting'
				formContent={
					<InternalComplaintsForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['contacts']}
					/>
				}>
				<InternalComplaintsContactsSection data={previewData.contactInfo} />
			</Editable>
		</div>
	);
}
