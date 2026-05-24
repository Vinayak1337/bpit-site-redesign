'use client';

import React, { useEffect, useState, useTransition } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import type { PoliciesProceduresData } from '@/app/(Private Pages)/actions/management';
import { updatePoliciesProcedures } from '@/app/(Private Pages)/actions/management';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import {
	AddRowButton,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

const COLOR_OPTIONS = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'indigo',
	'gray',
	'teal',
	'pink'
];
const GRADIENT_OPTIONS = COLOR_OPTIONS.map(c => ({
	value: `from-${c}-50 to-${c}-100`,
	label: `${c.charAt(0).toUpperCase()}${c.slice(1)} gradient`
}));

const formSchema = z.object({
	hero: z.object({
		icon: z.string().min(1, 'Hero icon is required'),
		title: z.string().min(1, 'Hero title is required'),
		subtitle: z.string().min(1, 'Hero subtitle is required'),
		gradient: z.string().min(1, 'Hero gradient is required'),
		iconColor: z.string().min(1, 'Hero icon color is required'),
		textColor: z.string().min(1, 'Hero text color is required')
	}),
	policyCategories: z
		.array(
			z.object({
				id: z.string().min(1, 'Category ID is required'),
				title: z.string().min(1, 'Category title is required'),
				icon: z.string().min(1, 'Category icon is required'),
				iconColor: z.string().min(1, 'Category icon color is required'),
				bulletColor: z.string().min(1, 'Category bullet color is required'),
				policies: z
					.array(z.string().min(1, 'Policy name is required'))
					.min(1, 'At least one policy is required')
			})
		)
		.min(1, 'At least one policy category is required'),
	implementationFramework: z.object({
		title: z.string().min(1, 'Framework title is required'),
		steps: z
			.array(
				z.object({
					id: z.string().min(1, 'Step ID is required'),
					title: z.string().min(1, 'Step title is required'),
					description: z.string().min(1, 'Step description is required'),
					icon: z.string().min(1, 'Step icon is required'),
					iconColor: z.string().min(1, 'Step icon color is required'),
					iconTextColor: z
						.string()
						.min(1, 'Step icon text color is required')
				})
			)
			.min(1, 'At least one step is required')
	})
});

type FormValues = z.infer<typeof formSchema>;

const normalizePoliciesProcedures = (
	values: FormValues
): PoliciesProceduresData => ({
	hero: {
		title: values.hero.title.trim(),
		subtitle: values.hero.subtitle.trim(),
		icon: values.hero.icon.trim(),
		gradient: values.hero.gradient.trim(),
		iconColor: values.hero.iconColor.trim(),
		textColor: values.hero.textColor.trim()
	},
	policyCategories: values.policyCategories.map(cat => ({
		id: cat.id.trim(),
		title: cat.title.trim(),
		icon: cat.icon.trim(),
		iconColor: cat.iconColor.trim(),
		bulletColor: cat.bulletColor.trim(),
		policies: cat.policies.map(p => p.trim()).filter(Boolean)
	})),
	implementationFramework: {
		title: values.implementationFramework.title.trim(),
		steps: values.implementationFramework.steps.map(s => ({
			id: s.id.trim(),
			title: s.title.trim(),
			description: s.description.trim(),
			icon: s.icon.trim(),
			iconColor: s.iconColor.trim(),
			iconTextColor: s.iconTextColor.trim()
		}))
	}
});

interface Props {
	initialData: PoliciesProceduresData;
	pageSlug: string;
	onChange?: (data: PoliciesProceduresData) => void;
	visibleSections?: Array<'hero' | 'categories' | 'framework'>;
}

function CategoryFields({
	form,
	index
}: {
	form: UseFormReturn<FormValues>;
	index: number;
}) {
	const policies = form.watch(`policyCategories.${index}.policies`) ?? [];
	const setPolicies = (next: string[]) =>
		form.setValue(`policyCategories.${index}.policies`, next, {
			shouldDirty: true
		});
	return (
		<>
			<AdminFieldGrid>
				<AdminField label='Category ID'>
					<Input
						placeholder='academic-policies'
						{...form.register(`policyCategories.${index}.id`)}
					/>
				</AdminField>
				<AdminField label='Category title'>
					<Input
						placeholder='Academic Policies'
						{...form.register(`policyCategories.${index}.title`)}
					/>
				</AdminField>
				<AdminField label='Icon'>
					<Select
						value={form.watch(`policyCategories.${index}.icon`) || ''}
						onValueChange={v =>
							form.setValue(`policyCategories.${index}.icon`, v, {
								shouldDirty: true
							})
						}>
						<SelectTrigger>
							<SelectValue placeholder='Select icon' />
						</SelectTrigger>
						<SelectContent>
							{SUPPORTED_ICON_NAMES.map(icon => (
								<SelectItem key={icon} value={icon}>
									{icon}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</AdminField>
				<AdminField label='Icon color'>
					<Select
						value={form.watch(`policyCategories.${index}.iconColor`) || ''}
						onValueChange={v =>
							form.setValue(`policyCategories.${index}.iconColor`, v, {
								shouldDirty: true
							})
						}>
						<SelectTrigger>
							<SelectValue placeholder='Select color' />
						</SelectTrigger>
						<SelectContent>
							{COLOR_OPTIONS.map(c => (
								<SelectItem key={c} value={`text-${c}-600`}>
									text-{c}-600
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</AdminField>
				<AdminField label='Bullet color'>
					<Select
						value={form.watch(`policyCategories.${index}.bulletColor`) || ''}
						onValueChange={v =>
							form.setValue(`policyCategories.${index}.bulletColor`, v, {
								shouldDirty: true
							})
						}>
						<SelectTrigger>
							<SelectValue placeholder='Select bullet color' />
						</SelectTrigger>
						<SelectContent>
							{COLOR_OPTIONS.map(c => (
								<SelectItem key={c} value={`bg-${c}-500`}>
									bg-{c}-500
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</AdminField>
			</AdminFieldGrid>
			<div className='flex flex-col gap-2'>
				<p className='text-xs font-medium text-slate-500'>Policies</p>
				{policies.map((_, pi) => (
					<div key={pi} className='flex items-start gap-2'>
						<Input
							placeholder='Policy name'
							className='flex-1'
							{...form.register(
								`policyCategories.${index}.policies.${pi}` as const
							)}
						/>
						{policies.length > 1 && (
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='h-10 w-10 text-slate-500 hover:bg-rose-50 hover:text-rose-600'
								onClick={() => setPolicies(policies.filter((_, i) => i !== pi))}>
								<Trash2 className='h-4 w-4' />
							</Button>
						)}
					</div>
				))}
				<AddRowButton onClick={() => setPolicies([...policies, 'New policy'])}>
					Add policy
				</AddRowButton>
			</div>
		</>
	);
}

export default function PoliciesProceduresForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const categoriesArr = useFieldArray({
		control: form.control,
		name: 'policyCategories'
	});
	const stepsArr = useFieldArray({
		control: form.control,
		name: 'implementationFramework.steps'
	});

	useEffect(() => {
		onChange?.(normalizePoliciesProcedures(form.getValues() as FormValues));
		const sub = form.watch(values => {
			onChange?.(normalizePoliciesProcedures(values as FormValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		startTransition(async () => {
			try {
				await updatePoliciesProcedures(
					normalizePoliciesProcedures(values),
					pageSlug
				);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Error updating policies procedures data:', error);
				setStatus({ kind: 'error', message: 'Failed to save' });
			}
		});
	});

	const showSection = (s: 'hero' | 'categories' | 'framework') =>
		!visibleSections || visibleSections.includes(s);

	return (
		<AdminForm onSubmit={onSubmit}>
			{showSection('hero') && (
				<AdminFormSection
					title='Hero section'
					description='Headline copy and accent styling for the policies & procedures page.'>
					<AdminFieldGrid>
						<AdminField label='Hero title'>
							<Input
								placeholder='Policies & Procedures'
								{...form.register('hero.title')}
							/>
						</AdminField>
						<AdminField label='Hero subtitle'>
							<Input
								placeholder='Operational Excellence Framework'
								{...form.register('hero.subtitle')}
							/>
						</AdminField>
						<AdminField label='Hero icon'>
							<Select
								value={form.watch('hero.icon') || ''}
								onValueChange={v =>
									form.setValue('hero.icon', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select icon' />
								</SelectTrigger>
								<SelectContent>
									{SUPPORTED_ICON_NAMES.map(icon => (
										<SelectItem key={icon} value={icon}>
											{icon}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Background gradient'>
							<Select
								value={form.watch('hero.gradient') || ''}
								onValueChange={v =>
									form.setValue('hero.gradient', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select gradient' />
								</SelectTrigger>
								<SelectContent>
									{GRADIENT_OPTIONS.map(g => (
										<SelectItem key={g.value} value={g.value}>
											{g.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Icon background color'>
							<Select
								value={form.watch('hero.iconColor') || ''}
								onValueChange={v =>
									form.setValue('hero.iconColor', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select color' />
								</SelectTrigger>
								<SelectContent>
									{COLOR_OPTIONS.map(c => (
										<SelectItem key={c} value={`bg-${c}-600`}>
											bg-{c}-600
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
						<AdminField label='Text color'>
							<Select
								value={form.watch('hero.textColor') || ''}
								onValueChange={v =>
									form.setValue('hero.textColor', v, { shouldDirty: true })
								}>
								<SelectTrigger>
									<SelectValue placeholder='Select text color' />
								</SelectTrigger>
								<SelectContent>
									{COLOR_OPTIONS.map(c => (
										<SelectItem key={c} value={`text-${c}-600`}>
											text-{c}-600
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</AdminField>
					</AdminFieldGrid>
				</AdminFormSection>
			)}

			{showSection('categories') && (
				<AdminFormSection title='Policy categories'>
					<AdminItemList>
						{categoriesArr.fields.map((cat, index) => (
							<AdminItemCard
								key={cat.id}
								index={index}
								total={categoriesArr.fields.length}
								title={
									form.watch(`policyCategories.${index}.title`) ||
									`Category ${index + 1}`
								}
								onMove={d => categoriesArr.move(index, index + d)}
								onRemove={
									categoriesArr.fields.length > 1
										? () => categoriesArr.remove(index)
										: undefined
								}>
								<CategoryFields form={form} index={index} />
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton
						onClick={() =>
							categoriesArr.append({
								id: `category-${Date.now()}`,
								title: 'New Category',
								icon: 'Building2',
								iconColor: 'text-blue-600',
								bulletColor: 'bg-blue-500',
								policies: ['New policy']
							})
						}>
						Add category
					</AddRowButton>
				</AdminFormSection>
			)}

			{showSection('framework') && (
				<AdminFormSection title='Implementation framework'>
					<AdminField label='Framework title'>
						<Input
							placeholder='How we implement these policies'
							{...form.register('implementationFramework.title')}
						/>
					</AdminField>
					<AdminItemList>
						{stepsArr.fields.map((step, index) => (
							<AdminItemCard
								key={step.id}
								index={index}
								total={stepsArr.fields.length}
								title={
									form.watch(`implementationFramework.steps.${index}.title`) ||
									`Step ${index + 1}`
								}
								onMove={d => stepsArr.move(index, index + d)}
								onRemove={
									stepsArr.fields.length > 1
										? () => stepsArr.remove(index)
										: undefined
								}>
								<AdminFieldGrid>
									<AdminField label='Step ID'>
										<Input
											placeholder='step-1'
											{...form.register(
												`implementationFramework.steps.${index}.id`
											)}
										/>
									</AdminField>
									<AdminField label='Step title'>
										<Input
											placeholder='Plan'
											{...form.register(
												`implementationFramework.steps.${index}.title`
											)}
										/>
									</AdminField>
									<AdminField label='Step icon'>
										<Select
											value={
												form.watch(
													`implementationFramework.steps.${index}.icon`
												) || ''
											}
											onValueChange={v =>
												form.setValue(
													`implementationFramework.steps.${index}.icon`,
													v,
													{ shouldDirty: true }
												)
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select icon' />
											</SelectTrigger>
											<SelectContent>
												{SUPPORTED_ICON_NAMES.map(icon => (
													<SelectItem key={icon} value={icon}>
														{icon}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Icon background'>
										<Select
											value={
												form.watch(
													`implementationFramework.steps.${index}.iconColor`
												) || ''
											}
											onValueChange={v =>
												form.setValue(
													`implementationFramework.steps.${index}.iconColor`,
													v,
													{ shouldDirty: true }
												)
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select color' />
											</SelectTrigger>
											<SelectContent>
												{COLOR_OPTIONS.map(c => (
													<SelectItem key={c} value={`bg-${c}-100`}>
														bg-{c}-100
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
									<AdminField label='Icon text color'>
										<Select
											value={
												form.watch(
													`implementationFramework.steps.${index}.iconTextColor`
												) || ''
											}
											onValueChange={v =>
												form.setValue(
													`implementationFramework.steps.${index}.iconTextColor`,
													v,
													{ shouldDirty: true }
												)
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select color' />
											</SelectTrigger>
											<SelectContent>
												{COLOR_OPTIONS.map(c => (
													<SelectItem key={c} value={`text-${c}-600`}>
														text-{c}-600
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={3}
										placeholder='Step description'
										{...form.register(
											`implementationFramework.steps.${index}.description`
										)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton
						onClick={() =>
							stepsArr.append({
								id: `step-${Date.now()}`,
								title: 'New Step',
								description: 'Step description',
								icon: 'CheckCircle',
								iconColor: 'bg-blue-100',
								iconTextColor: 'text-blue-600'
							})
						}>
						Add step
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
