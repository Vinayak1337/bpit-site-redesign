'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	type AdmissionsOverviewPageData,
	updateAdmissionsOverviewDepartments,
	updateAdmissionsOverviewHero,
	updateAdmissionsOverviewLinks,
	updateAdmissionsOverviewNotes,
	updateAdmissionsOverviewStats
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_ICON_NAMES } from '@/lib/admissions-icons';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { createClientId } from '@/lib/utils';
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

type Props = {
	initialData: AdmissionsOverviewPageData;
	onChange?: (data: AdmissionsOverviewPageData) => void;
	visibleSections?: Array<'intro' | 'stats' | 'links' | 'departments' | 'notes'>;
};

type FormValues = {
	heroTitle: string;
	heroSubtitle: string;
	heroDescription: string;
	programCountLabel: string;
	statsEyebrow: string;
	statsTitle: string;
	statsDescription: string;
	stats: Array<{ id: string; value: string; label: string; icon: string }>;
	linksEyebrow: string;
	linksTitle: string;
	linksDescription: string;
	links: Array<{ id: string; title: string; description: string; href: string; icon: string }>;
	departmentsEyebrow: string;
	departmentsTitle: string;
	departmentsDescription: string;
	departments: Array<{ id: string; name: string }>;
	notesEyebrow: string;
	notesTitle: string;
	notesDescription: string;
	notes: Array<{ id: string; value: string }>;
};

const createStat = () => ({
	id: createClientId('admissions-overview-stat'),
	value: '',
	label: '',
	icon: 'Building2'
});
const createLink = () => ({
	id: createClientId('admissions-overview-link'),
	title: '',
	description: '',
	href: '',
	icon: 'FileText'
});
const createDepartment = () => ({
	id: createClientId('admissions-overview-department'),
	name: ''
});
const createNote = () => ({
	id: createClientId('admissions-overview-note'),
	value: ''
});

const normalizeData = (values: FormValues): AdmissionsOverviewPageData => ({
	hero: {
		title: values.heroTitle.trim(),
		subtitle: values.heroSubtitle.trim(),
		description: values.heroDescription.trim(),
		programCountLabel: values.programCountLabel.trim()
	},
	stats: {
		eyebrow: values.statsEyebrow.trim(),
		title: values.statsTitle.trim(),
		description: values.statsDescription.trim(),
		items: values.stats
			.map(i => ({ value: i.value.trim(), label: i.label.trim(), icon: i.icon.trim() }))
			.filter(i => i.value && i.label)
	},
	links: {
		eyebrow: values.linksEyebrow.trim(),
		title: values.linksTitle.trim(),
		description: values.linksDescription.trim(),
		items: values.links
			.map(i => ({
				title: i.title.trim(),
				description: i.description.trim(),
				href: i.href.trim(),
				icon: i.icon.trim()
			}))
			.filter(i => i.title && i.description && i.href)
	},
	departments: {
		eyebrow: values.departmentsEyebrow.trim(),
		title: values.departmentsTitle.trim(),
		description: values.departmentsDescription.trim(),
		items: values.departments
			.map(i => ({ name: i.name.trim() }))
			.filter(i => i.name)
	},
	notes: {
		eyebrow: values.notesEyebrow.trim(),
		title: values.notesTitle.trim(),
		description: values.notesDescription.trim(),
		items: values.notes.map(i => i.value.trim()).filter(Boolean)
	}
});

const includes = <T extends string>(visibleSections: T[] | undefined, value: T) =>
	!visibleSections || visibleSections.includes(value);

export default function AdmissionsOverviewForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	const defaults = useMemo<FormValues>(
		() => ({
			heroTitle: initialData.hero.title,
			heroSubtitle: initialData.hero.subtitle,
			heroDescription: initialData.hero.description,
			programCountLabel: initialData.hero.programCountLabel,
			statsEyebrow: initialData.stats.eyebrow,
			statsTitle: initialData.stats.title,
			statsDescription: initialData.stats.description,
			stats:
				initialData.stats.items.length > 0
					? initialData.stats.items.map((item, idx) => ({
							id: `overview-stat-${idx}`,
							value: item.value,
							label: item.label,
							icon: item.icon ?? 'Building2'
						}))
					: [createStat()],
			linksEyebrow: initialData.links.eyebrow,
			linksTitle: initialData.links.title,
			linksDescription: initialData.links.description,
			links:
				initialData.links.items.length > 0
					? initialData.links.items.map((item, idx) => ({
							id: `overview-link-${idx}`,
							title: item.title,
							description: item.description,
							href: item.href,
							icon: item.icon
						}))
					: [createLink()],
			departmentsEyebrow: initialData.departments.eyebrow,
			departmentsTitle: initialData.departments.title,
			departmentsDescription: initialData.departments.description,
			departments:
				initialData.departments.items.length > 0
					? initialData.departments.items.map((item, idx) => ({
							id: `overview-department-${idx}`,
							name: item.name
						}))
					: [createDepartment()],
			notesEyebrow: initialData.notes.eyebrow,
			notesTitle: initialData.notes.title,
			notesDescription: initialData.notes.description,
			notes:
				initialData.notes.items.length > 0
					? initialData.notes.items.map((item, idx) => ({
							id: `overview-note-${idx}`,
							value: item
						}))
					: [createNote()]
		}),
		[initialData]
	);

	const form = useForm<FormValues>({ defaultValues: defaults });
	const statsArray = useFieldArray({ control: form.control, name: 'stats' });
	const linksArray = useFieldArray({ control: form.control, name: 'links' });
	const departmentsArray = useFieldArray({
		control: form.control,
		name: 'departments'
	});
	const notesArray = useFieldArray({ control: form.control, name: 'notes' });

	useEffect(() => {
		form.reset(defaults);
	}, [defaults, form]);

	useEffect(() => {
		onChange?.(normalizeData(form.getValues()));
		const sub = form.watch(v => {
			onChange?.(normalizeData(v as FormValues));
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const handleSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const payload = normalizeData(values);
		startTransition(async () => {
			const tasks: Promise<{ ok: boolean }>[] = [];
			if (includes(visibleSections, 'intro'))
				tasks.push(updateAdmissionsOverviewHero(payload.hero));
			if (includes(visibleSections, 'stats'))
				tasks.push(updateAdmissionsOverviewStats(payload.stats));
			if (includes(visibleSections, 'links'))
				tasks.push(updateAdmissionsOverviewLinks(payload.links));
			if (includes(visibleSections, 'departments'))
				tasks.push(updateAdmissionsOverviewDepartments(payload.departments));
			if (includes(visibleSections, 'notes'))
				tasks.push(updateAdmissionsOverviewNotes(payload.notes));
			const results = await Promise.all(tasks);
			setStatus(
				results.every(r => r.ok)
					? { kind: 'success', message: 'Saved' }
					: { kind: 'error', message: 'Save failed' }
			);
		});
	});

	return (
		<AdminForm onSubmit={handleSubmit}>
			{includes(visibleSections, 'intro') && (
				<AdminFormSection
					title='Intro'
					description='Hero copy for the admissions overview page.'>
					<AdminField label='Title' htmlFor='ovw-title'>
						<Input id='ovw-title' {...form.register('heroTitle')} />
					</AdminField>
					<AdminField label='Eyebrow' htmlFor='ovw-eyebrow'>
						<Input id='ovw-eyebrow' {...form.register('heroSubtitle')} />
					</AdminField>
					<AdminField label='Description' htmlFor='ovw-desc'>
						<Textarea
							id='ovw-desc'
							rows={4}
							className='resize-none'
							{...form.register('heroDescription')}
						/>
					</AdminField>
					<AdminField label='Program count label' htmlFor='ovw-pcl'>
						<Input
							id='ovw-pcl'
							placeholder='Programs available'
							{...form.register('programCountLabel')}
						/>
					</AdminField>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'stats') && (
				<AdminFormSection title='Stats'>
					<AdminFieldGrid>
						<AdminField label='Eyebrow'>
							<Input {...form.register('statsEyebrow')} />
						</AdminField>
						<AdminField label='Title'>
							<Input {...form.register('statsTitle')} />
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('statsDescription')}
						/>
					</AdminField>
					<AdminItemList>
						{statsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={statsArray.fields.length}
								title={form.watch(`stats.${index}.label`) || `Stat ${index + 1}`}
								onMove={d => statsArray.move(index, index + d)}
								onRemove={() => statsArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Value'>
										<Input {...form.register(`stats.${index}.value` as const)} />
									</AdminField>
									<AdminField label='Label'>
										<Input {...form.register(`stats.${index}.label` as const)} />
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`stats.${index}.icon`) || 'Building2'}
										onValueChange={v =>
											form.setValue(`stats.${index}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select icon' />
										</SelectTrigger>
										<SelectContent>
											{ADMISSIONS_ICON_NAMES.map(icon => (
												<SelectItem key={icon} value={icon}>
													{icon}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{statsArray.fields.length === 0 && (
						<AdminEmptyState title='No stats yet' />
					)}
					<AddRowButton onClick={() => statsArray.append(createStat())}>
						Add stat
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'links') && (
				<AdminFormSection title='Quick links'>
					<AdminFieldGrid>
						<AdminField label='Eyebrow'>
							<Input {...form.register('linksEyebrow')} />
						</AdminField>
						<AdminField label='Title'>
							<Input {...form.register('linksTitle')} />
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('linksDescription')}
						/>
					</AdminField>
					<AdminItemList>
						{linksArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={linksArray.fields.length}
								title={form.watch(`links.${index}.title`) || `Link ${index + 1}`}
								subtitle={form.watch(`links.${index}.href`) || undefined}
								onMove={d => linksArray.move(index, index + d)}
								onRemove={() => linksArray.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Title'>
										<Input {...form.register(`links.${index}.title` as const)} />
									</AdminField>
									<AdminField label='Href'>
										<Input {...form.register(`links.${index}.href` as const)} />
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Description'>
									<Textarea
										rows={3}
										className='resize-none'
										{...form.register(`links.${index}.description` as const)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									<Select
										value={form.watch(`links.${index}.icon`) || 'FileText'}
										onValueChange={v =>
											form.setValue(`links.${index}.icon`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue placeholder='Select icon' />
										</SelectTrigger>
										<SelectContent>
											{ADMISSIONS_ICON_NAMES.map(icon => (
												<SelectItem key={icon} value={icon}>
													{icon}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{linksArray.fields.length === 0 && (
						<AdminEmptyState title='No links yet' />
					)}
					<AddRowButton onClick={() => linksArray.append(createLink())}>
						Add link
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'departments') && (
				<AdminFormSection title='Departments'>
					<AdminField label='Eyebrow'>
						<Input {...form.register('departmentsEyebrow')} />
					</AdminField>
					<AdminField label='Title'>
						<Input {...form.register('departmentsTitle')} />
					</AdminField>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('departmentsDescription')}
						/>
					</AdminField>
					<AdminItemList>
						{departmentsArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={departmentsArray.fields.length}
								title={
									form.watch(`departments.${index}.name`) ||
									`Department ${index + 1}`
								}
								onMove={d => departmentsArray.move(index, index + d)}
								onRemove={() => departmentsArray.remove(index)}>
								<AdminField label='Department name'>
									<Input
										{...form.register(`departments.${index}.name` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{departmentsArray.fields.length === 0 && (
						<AdminEmptyState title='No departments yet' />
					)}
					<AddRowButton
						onClick={() => departmentsArray.append(createDepartment())}>
						Add department
					</AddRowButton>
				</AdminFormSection>
			)}

			{includes(visibleSections, 'notes') && (
				<AdminFormSection title='Notes'>
					<AdminField label='Eyebrow'>
						<Input {...form.register('notesEyebrow')} />
					</AdminField>
					<AdminField label='Title'>
						<Input {...form.register('notesTitle')} />
					</AdminField>
					<AdminField label='Description'>
						<Textarea
							rows={3}
							className='resize-none'
							{...form.register('notesDescription')}
						/>
					</AdminField>
					<AdminItemList>
						{notesArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={notesArray.fields.length}
								title={`Note ${index + 1}`}
								onMove={d => notesArray.move(index, index + d)}
								onRemove={() => notesArray.remove(index)}>
								<AdminField label='Note'>
									<Textarea
										rows={2}
										className='resize-none'
										{...form.register(`notes.${index}.value` as const)}
									/>
								</AdminField>
							</AdminItemCard>
						))}
					</AdminItemList>
					{notesArray.fields.length === 0 && (
						<AdminEmptyState title='No notes yet' />
					)}
					<AddRowButton onClick={() => notesArray.append(createNote())}>
						Add note
					</AddRowButton>
				</AdminFormSection>
			)}

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
