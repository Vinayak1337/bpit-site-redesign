'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	updateStatutoryOverview,
	type StatutoryOverviewData
} from '@/app/(Private Pages)/actions/statutory-committees';
import { useEffect, useState, useTransition } from 'react';
import {
	AddRowButton,
	AdminEmptyState,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

const schema = z.object({
	hero: z.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(1, 'Description is required')
	}),
	committees: z.array(
		z.object({
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			icon: z.string().min(1, 'Icon is required'),
			iconColor: z.string().min(1, 'Icon Color is required'),
			href: z.string().min(1, 'Href is required'),
			key: z.string().min(1, 'Key is required')
		})
	)
});

type FormData = z.infer<typeof schema>;

type Props = {
	initialData: StatutoryOverviewData;
	pageSlug: string;
	onChange?: (data: StatutoryOverviewData) => void;
	visibleSections?: Array<'hero' | 'committees'>;
};

export default function StatutoryOverviewForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: initialData
	});

	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'committees'
	});

	const watchedData = watch();
	useEffect(() => {
		onChange?.(watchedData as StatutoryOverviewData);
		setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
	}, [watchedData, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = handleSubmit(data => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updateStatutoryOverview(data, pageSlug);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error(error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const showSection = (section: 'hero' | 'committees') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<AdminForm onSubmit={onSubmit}>
			{showSection('hero') && (
				<AdminFormSection
					title='Hero'
					description='Header copy for the statutory committees landing page.'>
					<AdminField
						label='Title'
						htmlFor='so-title'
						error={errors.hero?.title?.message}>
						<Input
							id='so-title'
							placeholder='e.g. Statutory Committees'
							{...register('hero.title')}
						/>
					</AdminField>
					<AdminField
						label='Description'
						htmlFor='so-desc'
						error={errors.hero?.description?.message}>
						<Textarea
							id='so-desc'
							rows={3}
							placeholder='Enter a brief description…'
							{...register('hero.description')}
						/>
					</AdminField>
				</AdminFormSection>
			)}

			{showSection('committees') && (
				<AdminFormSection title='Committees list'>
					<AdminItemList>
						{fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fields.length}
								title={
									watch(`committees.${index}.title`) ||
									`Committee ${index + 1}`
								}
								subtitle={watch(`committees.${index}.href`) || undefined}
								onMove={d => move(index, index + d)}
								onRemove={() => remove(index)}>
								<AdminFieldGrid>
									<AdminField
										label='Title'
										error={errors.committees?.[index]?.title?.message}>
										<Input
											placeholder='e.g. Anti-Ragging Committee'
											{...register(`committees.${index}.title` as const)}
										/>
									</AdminField>
									<AdminField label='Key (unique ID)'>
										<Input
											placeholder='e.g. anti-ragging'
											{...register(`committees.${index}.key` as const)}
										/>
									</AdminField>
									<AdminField label='Icon name (Lucide)'>
										<Input
											placeholder='e.g. UserX'
											{...register(`committees.${index}.icon` as const)}
										/>
									</AdminField>
									<AdminField label='Icon color class'>
										<Input
											placeholder='e.g. text-red-600'
											{...register(`committees.${index}.iconColor` as const)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Link href'>
									<Input
										placeholder='e.g. /statutory-committees/anti-ragging'
										{...register(`committees.${index}.href` as const)}
									/>
								</AdminField>
								<AdminField label='Description'>
									<Textarea
										rows={2}
										placeholder='Brief description of the committee…'
										{...register(`committees.${index}.description` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{fields.length === 0 && <AdminEmptyState title='No committees yet' />}
					<AddRowButton
						onClick={() =>
							append({
								title: '',
								description: '',
								icon: 'Shield',
								iconColor: 'text-blue-600',
								href: '',
								key: ''
							})
						}>
						Add committee
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
