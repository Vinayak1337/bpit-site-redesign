'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
	updatePlacementStatistics,
	getPlacementStatistics,
	type PlacementStatisticsData,
	type YearlyTrend
} from '@/app/(Private Pages)/actions/placement-statistics';
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

interface TrendsFormProps {
	initialData: PlacementStatisticsData;
	pageSlug: string;
	onChange: (data: PlacementStatisticsData) => void;
}

interface TrendsFormData {
	trends: YearlyTrend[];
}

export default function TrendsForm({ initialData, onChange }: TrendsFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<TrendsFormData>({
		defaultValues: { trends: initialData.yearlyTrends || [] }
	});

	const { fields, append, remove, move } = useFieldArray({
		control: form.control,
		name: 'trends'
	});

	useEffect(() => {
		const sub = form.watch(values => {
			if (!values.trends) return;
			const yearlyTrends: YearlyTrend[] = values.trends.map(t => ({
				year: t?.year || '',
				rate: t?.rate || 0,
				avg: t?.avg || 0,
				companies: t?.companies || 0
			}));
			onChange({ ...initialData, yearlyTrends });
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, initialData, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				const yearlyTrends: YearlyTrend[] = values.trends.map(t => ({
					year: t.year,
					rate: t.rate,
					avg: t.avg,
					companies: t.companies
				}));
				const result = await updatePlacementStatistics({
					...initialData,
					yearlyTrends
				});
				if (result.success) {
					const freshData = await getPlacementStatistics();
					if (freshData) form.reset({ trends: freshData.yearlyTrends || [] });
					setStatus({ kind: 'success', message: 'Saved' });
				} else {
					setStatus({ kind: 'error', message: 'Save failed' });
				}
			} catch (error) {
				console.error('Failed to save yearly trends:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection title='Yearly trends'>
				<AdminItemList>
					{fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={fields.length}
							title={form.watch(`trends.${index}.year`) || `Year ${index + 1}`}
							onMove={d => move(index, index + d)}
							onRemove={() => remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Year'>
									<Input
										placeholder='2024'
										{...form.register(`trends.${index}.year` as const)}
									/>
								</AdminField>
								<AdminField label='Placement rate (%)'>
									<Input
										type='number'
										step='0.1'
										placeholder='85.5'
										{...form.register(`trends.${index}.rate` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
								<AdminField label='Average package (LPA)'>
									<Input
										type='number'
										step='0.1'
										placeholder='6.5'
										{...form.register(`trends.${index}.avg` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
								<AdminField label='Companies visited'>
									<Input
										type='number'
										placeholder='120'
										{...form.register(`trends.${index}.companies` as const, {
											valueAsNumber: true
										})}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{fields.length === 0 && <AdminEmptyState title='No yearly data yet' />}
				<AddRowButton
					onClick={() =>
						append({ year: '', rate: 0, avg: 0, companies: 0 })
					}>
					Add year
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
