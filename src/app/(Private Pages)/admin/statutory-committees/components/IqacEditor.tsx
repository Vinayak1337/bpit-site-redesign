'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import IqacForm from './IqacForm';
import {
	IqacAboutSection,
	IqacObjectivesSection,
	IqacFunctionsSection,
	IqacMembersSection,
	IqacInitiativesSection,
	IqacAqarSection
} from '@/components/statutory-committees/IqacView';
import type { IqacData } from '@/app/(Private Pages)/actions/statutory-committees';

type Props = {
	initialData: IqacData;
	pageSlug: string;
};

export default function IqacEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<IqacData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='IQAC About'
				formContent={
					<IqacForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['about']}
					/>
				}>
				<IqacAboutSection data={previewData.about} />
			</Editable>

			<Editable
				label='IQAC Objectives'
				formContent={
					<IqacForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['objectives']}
					/>
				}>
				<IqacObjectivesSection data={previewData.objectives} />
			</Editable>

			<Editable
				label='IQAC Functions'
				formContent={
					<IqacForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['functions']}
					/>
				}>
				<IqacFunctionsSection data={previewData.functions} />
			</Editable>

			<Editable
				label='IQAC Members'
				formContent={
					<IqacForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['members']}
					/>
				}>
				<IqacMembersSection data={previewData.committeeMembers} />
			</Editable>

			<Editable
				label='IQAC Initiatives'
				formContent={
					<IqacForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['initiatives']}
					/>
				}>
				<IqacInitiativesSection data={previewData.initiatives} />
			</Editable>

			<Editable
				label='IQAC AQAR'
				formContent={
					<IqacForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['aqar']}
					/>
				}>
				<IqacAqarSection data={previewData.aqar} />
			</Editable>
		</div>
	);
}
