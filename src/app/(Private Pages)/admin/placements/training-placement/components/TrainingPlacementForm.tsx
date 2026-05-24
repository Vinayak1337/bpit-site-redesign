'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';
import { updateTrainingPlacement } from '@/app/(Private Pages)/actions/training-placement';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import UploadButton from '@/components/cloudinary/upload-button';
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

interface TrainingPlacementFormProps {
	initialData: TrainingPlacementData;
	pageSlug: string;
	onChange?: (data: TrainingPlacementData) => void;
}

interface HeroFormValue {
	icon: string;
	title: string;
	subtitle: string;
	gradient: string;
	iconColor: string;
	textColor: string;
}
interface DirectorMessageFormValue {
	name: string;
	position: string;
	initials: string;
	gradientColor: string;
	message1: string;
	message2: string;
	image?: string;
}
interface TeamMemberFormValue {
	id: string;
	name: string;
	position: string;
	qualifications: string;
	specialization: string;
	image?: string;
}
interface DepartmentFormValue {
	id: string;
	name: string;
	code: string;
	coordinator: string;
	companies: string;
	avgPackage: string;
	placementRate: string;
}
interface TrainingProgramFormValue {
	id: string;
	title: string;
	description: string;
	duration: string;
	participants: string;
	icon: string;
	color: string;
}
interface ObjectiveFormValue {
	id: string;
	title: string;
	description: string;
	icon: string;
}
interface StatisticFormValue {
	id: string;
	number: string;
	label: string;
	sublabel: string;
}

interface FormValues {
	hero: HeroFormValue;
	directorMessage: DirectorMessageFormValue;
	teamTitle: string;
	teamDescription: string;
	teamMembers: TeamMemberFormValue[];
	departmentsTitle: string;
	departmentsDescription: string;
	departments: DepartmentFormValue[];
	trainingTitle: string;
	trainingDescription: string;
	trainingPrograms: TrainingProgramFormValue[];
	objectivesTitle: string;
	objectivesDescription: string;
	objectives: ObjectiveFormValue[];
	statisticsTitle: string;
	statisticsDescription: string;
	statistics: StatisticFormValue[];
}

const ICON_OPTIONS = [
	'Users',
	'Target',
	'Award',
	'BookOpen',
	'Lightbulb',
	'CheckCircle',
	'Quote',
	'MessageCircle',
	'Calendar',
	'TrendingUp',
	'Star'
];

const COLOR_OPTIONS = [
	'blue',
	'green',
	'purple',
	'orange',
	'red',
	'yellow',
	'pink',
	'indigo'
];

const createTeamMember = (): TeamMemberFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	position: '',
	qualifications: '',
	specialization: '',
	image: ''
});
const createDept = (): DepartmentFormValue => ({
	id: crypto.randomUUID(),
	name: '',
	code: '',
	coordinator: '',
	companies: '',
	avgPackage: '',
	placementRate: ''
});
const createProgram = (): TrainingProgramFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	description: '',
	duration: '',
	participants: '',
	icon: 'BookOpen',
	color: 'blue'
});
const createObjective = (): ObjectiveFormValue => ({
	id: crypto.randomUUID(),
	title: '',
	description: '',
	icon: 'Target'
});
const createStatistic = (): StatisticFormValue => ({
	id: crypto.randomUUID(),
	number: '',
	label: '',
	sublabel: ''
});

function createUpdatedData(
	currentData: TrainingPlacementData,
	formValues: Partial<FormValues>
): TrainingPlacementData {
	return {
		...currentData,
		hero: formValues.hero || currentData.hero,
		directorMessage: formValues.directorMessage || currentData.directorMessage,
		teamTitle: formValues.teamTitle ?? currentData.teamTitle,
		teamDescription: formValues.teamDescription ?? currentData.teamDescription,
		teamMembers:
			formValues.teamMembers && formValues.teamMembers.length > 0
				? formValues.teamMembers
						.filter(m => m.name && m.position)
						.map(m => ({ ...m }))
				: currentData.teamMembers,
		departmentsTitle: formValues.departmentsTitle ?? currentData.departmentsTitle,
		departmentsDescription:
			formValues.departmentsDescription ?? currentData.departmentsDescription,
		departments:
			formValues.departments && formValues.departments.length > 0
				? formValues.departments
						.filter(d => d.name && d.code)
						.map(d => ({ ...d }))
				: currentData.departments,
		trainingTitle: formValues.trainingTitle ?? currentData.trainingTitle,
		trainingDescription:
			formValues.trainingDescription ?? currentData.trainingDescription,
		trainingPrograms:
			formValues.trainingPrograms && formValues.trainingPrograms.length > 0
				? formValues.trainingPrograms
						.filter(p => p.title && p.description)
						.map(p => ({ ...p }))
				: currentData.trainingPrograms,
		objectivesTitle: formValues.objectivesTitle ?? currentData.objectivesTitle,
		objectivesDescription:
			formValues.objectivesDescription ?? currentData.objectivesDescription,
		objectives:
			formValues.objectives && formValues.objectives.length > 0
				? formValues.objectives
						.filter(o => o.title && o.description)
						.map(o => ({ ...o }))
				: currentData.objectives,
		statisticsTitle: formValues.statisticsTitle ?? currentData.statisticsTitle,
		statisticsDescription:
			formValues.statisticsDescription ?? currentData.statisticsDescription,
		statistics:
			formValues.statistics && formValues.statistics.length > 0
				? formValues.statistics
						.filter(s => s.number && s.label)
						.map(s => ({ ...s }))
				: currentData.statistics
	};
}

export default function TrainingPlacementForm({
	initialData,
	onChange
}: TrainingPlacementFormProps) {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const [currentData, setCurrentData] =
		useState<TrainingPlacementData>(initialData);

	const form = useForm<FormValues>({
		defaultValues: {
			hero: initialData.hero as HeroFormValue,
			directorMessage: initialData.directorMessage as DirectorMessageFormValue,
			teamTitle: initialData.teamTitle || '',
			teamDescription: initialData.teamDescription || '',
			teamMembers: (initialData.teamMembers || []) as TeamMemberFormValue[],
			departmentsTitle: initialData.departmentsTitle || '',
			departmentsDescription: initialData.departmentsDescription || '',
			departments: (initialData.departments || []) as DepartmentFormValue[],
			trainingTitle: initialData.trainingTitle || '',
			trainingDescription: initialData.trainingDescription || '',
			trainingPrograms: (initialData.trainingPrograms ||
				[]) as TrainingProgramFormValue[],
			objectivesTitle: initialData.objectivesTitle || '',
			objectivesDescription: initialData.objectivesDescription || '',
			objectives: (initialData.objectives || []) as ObjectiveFormValue[],
			statisticsTitle: initialData.statisticsTitle || '',
			statisticsDescription: initialData.statisticsDescription || '',
			statistics: (initialData.statistics || []) as StatisticFormValue[]
		}
	});

	const teamArr = useFieldArray({ control: form.control, name: 'teamMembers' });
	const deptArr = useFieldArray({ control: form.control, name: 'departments' });
	const progArr = useFieldArray({
		control: form.control,
		name: 'trainingPrograms'
	});
	const objArr = useFieldArray({ control: form.control, name: 'objectives' });
	const statArr = useFieldArray({ control: form.control, name: 'statistics' });

	useEffect(() => {
		const sub = form.watch(values => {
			const updated = createUpdatedData(
				currentData,
				values as Partial<FormValues>
			);
			onChange?.(updated);
			setStatus(c => (c.kind === 'idle' ? c : { kind: 'idle' }));
		});
		return () => sub.unsubscribe();
	}, [form, onChange, currentData]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const t = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(t);
	}, [status]);

	const onSubmit = form.handleSubmit(values => {
		setStatus({ kind: 'saving' });
		const payload = createUpdatedData(currentData, values);
		startTransition(async () => {
			try {
				await updateTrainingPlacement(payload);
				setCurrentData(payload);
				setStatus({ kind: 'success', message: 'Saved' });
			} catch (error) {
				console.error('Save error:', error);
				setStatus({ kind: 'error', message: 'Save failed' });
			}
		});
	});

	const iconSelect = (val: string | undefined, set: (v: string) => void) => (
		<Select value={val || 'Target'} onValueChange={set}>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{ICON_OPTIONS.map(i => (
					<SelectItem key={i} value={i}>
						{i}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);

	const directorImage = form.watch('directorMessage.image');

	return (
		<AdminForm onSubmit={onSubmit}>
			<AdminFormSection
				title='Hero'
				description='Top banner copy for the T&P cell page.'>
				<AdminFieldGrid>
					<AdminField label='Icon'>
						{iconSelect(form.watch('hero.icon'), v =>
							form.setValue('hero.icon', v, { shouldDirty: true })
						)}
					</AdminField>
					<AdminField label='Icon color'>
						<Input {...form.register('hero.iconColor')} />
					</AdminField>
					<AdminField label='Text color'>
						<Input {...form.register('hero.textColor')} />
					</AdminField>
				</AdminFieldGrid>
				<AdminField label='Title'>
					<Input {...form.register('hero.title')} />
				</AdminField>
				<AdminField label='Subtitle'>
					<Textarea rows={2} {...form.register('hero.subtitle')} />
				</AdminField>
				<AdminField label='Background gradient (Tailwind classes)'>
					<Input {...form.register('hero.gradient')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title="Director's message">
				<AdminFieldGrid>
					<AdminField label='Name'>
						<Input {...form.register('directorMessage.name')} />
					</AdminField>
					<AdminField label='Position'>
						<Input {...form.register('directorMessage.position')} />
					</AdminField>
					<AdminField label='Initials'>
						<Input {...form.register('directorMessage.initials')} />
					</AdminField>
					<AdminField label='Gradient color'>
						<Input {...form.register('directorMessage.gradientColor')} />
					</AdminField>
				</AdminFieldGrid>
				<AdminField label='Image (optional)'>
					<Input
						placeholder='Image URL'
						{...form.register('directorMessage.image')}
					/>
					<div className='mt-2'>
						<UploadButton
							onUpload={url =>
								form.setValue('directorMessage.image', url, {
									shouldDirty: true
								})
							}
							buttonText='Upload image'
						/>
					</div>
					{directorImage && (
						<div className='mt-3'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={directorImage}
								alt='Director preview'
								className='h-20 w-20 rounded-full border border-slate-200 object-cover'
							/>
						</div>
					)}
				</AdminField>
				<AdminField label='Message paragraph 1'>
					<Textarea rows={4} {...form.register('directorMessage.message1')} />
				</AdminField>
				<AdminField label='Message paragraph 2'>
					<Textarea rows={4} {...form.register('directorMessage.message2')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Team — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('teamTitle')} />
				</AdminField>
				<AdminField label='Section description'>
					<Textarea rows={3} {...form.register('teamDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Team members'>
				<AdminItemList>
					{teamArr.fields.map((field, index) => {
						const image = form.watch(`teamMembers.${index}.image`);
						return (
							<AdminItemCard
								key={field.id}
								index={index}
								total={teamArr.fields.length}
								title={
									form.watch(`teamMembers.${index}.name`) ||
									`Member ${index + 1}`
								}
								subtitle={form.watch(`teamMembers.${index}.position`) || undefined}
								onMove={d => teamArr.move(index, index + d)}
								onRemove={() => teamArr.remove(index)}>
								<AdminFieldGrid>
									<AdminField label='Name'>
										<Input
											{...form.register(`teamMembers.${index}.name` as const)}
										/>
									</AdminField>
									<AdminField label='Position'>
										<Input
											{...form.register(
												`teamMembers.${index}.position` as const
											)}
										/>
									</AdminField>
									<AdminField label='Qualifications'>
										<Input
											{...form.register(
												`teamMembers.${index}.qualifications` as const
											)}
										/>
									</AdminField>
									<AdminField label='Specialization'>
										<Input
											{...form.register(
												`teamMembers.${index}.specialization` as const
											)}
										/>
									</AdminField>
								</AdminFieldGrid>
								<AdminField label='Image'>
									<Input
										placeholder='Image URL'
										{...form.register(`teamMembers.${index}.image` as const)}
									/>
									<div className='mt-2'>
										<UploadButton
											onUpload={url =>
												form.setValue(`teamMembers.${index}.image`, url, {
													shouldDirty: true
												})
											}
											buttonText='Upload image'
										/>
									</div>
									{image && (
										<div className='mt-3'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={image}
												alt='Preview'
												className='h-16 w-16 rounded-full border border-slate-200 object-cover'
											/>
										</div>
									)}
								</AdminField>
							</AdminItemCard>
						);
					})}
				</AdminItemList>
				{teamArr.fields.length === 0 && (
					<AdminEmptyState title='No team members yet' />
				)}
				<AddRowButton onClick={() => teamArr.append(createTeamMember())}>
					Add member
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Departments — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('departmentsTitle')} />
				</AdminField>
				<AdminField label='Section description'>
					<Textarea rows={3} {...form.register('departmentsDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Departments'>
				<AdminItemList>
					{deptArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={deptArr.fields.length}
							title={
								form.watch(`departments.${index}.name`) ||
								`Department ${index + 1}`
							}
							subtitle={form.watch(`departments.${index}.code`) || undefined}
							onMove={d => deptArr.move(index, index + d)}
							onRemove={() => deptArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Name'>
									<Input
										{...form.register(`departments.${index}.name` as const)}
									/>
								</AdminField>
								<AdminField label='Code'>
									<Input
										{...form.register(`departments.${index}.code` as const)}
									/>
								</AdminField>
								<AdminField label='Coordinator'>
									<Input
										{...form.register(
											`departments.${index}.coordinator` as const
										)}
									/>
								</AdminField>
								<AdminField label='Companies'>
									<Input
										{...form.register(
											`departments.${index}.companies` as const
										)}
									/>
								</AdminField>
								<AdminField label='Avg package'>
									<Input
										{...form.register(
											`departments.${index}.avgPackage` as const
										)}
									/>
								</AdminField>
								<AdminField label='Placement rate'>
									<Input
										{...form.register(
											`departments.${index}.placementRate` as const
										)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{deptArr.fields.length === 0 && (
					<AdminEmptyState title='No departments yet' />
				)}
				<AddRowButton onClick={() => deptArr.append(createDept())}>
					Add department
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Training programs — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('trainingTitle')} />
				</AdminField>
				<AdminField label='Section description'>
					<Textarea rows={3} {...form.register('trainingDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Training programs'>
				<AdminItemList>
					{progArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={progArr.fields.length}
							title={
								form.watch(`trainingPrograms.${index}.title`) ||
								`Program ${index + 1}`
							}
							onMove={d => progArr.move(index, index + d)}
							onRemove={() => progArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										{...form.register(
											`trainingPrograms.${index}.title` as const
										)}
									/>
								</AdminField>
								<AdminField label='Duration'>
									<Input
										{...form.register(
											`trainingPrograms.${index}.duration` as const
										)}
									/>
								</AdminField>
								<AdminField label='Participants'>
									<Input
										{...form.register(
											`trainingPrograms.${index}.participants` as const
										)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									{iconSelect(
										form.watch(`trainingPrograms.${index}.icon`),
										v =>
											form.setValue(`trainingPrograms.${index}.icon`, v, {
												shouldDirty: true
											})
									)}
								</AdminField>
								<AdminField label='Color'>
									<Select
										value={
											form.watch(`trainingPrograms.${index}.color`) || 'blue'
										}
										onValueChange={v =>
											form.setValue(`trainingPrograms.${index}.color`, v, {
												shouldDirty: true
											})
										}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{COLOR_OPTIONS.map(c => (
												<SelectItem key={c} value={c}>
													{c}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									{...form.register(
										`trainingPrograms.${index}.description` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{progArr.fields.length === 0 && (
					<AdminEmptyState title='No programs yet' />
				)}
				<AddRowButton onClick={() => progArr.append(createProgram())}>
					Add program
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Objectives — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('objectivesTitle')} />
				</AdminField>
				<AdminField label='Section description'>
					<Textarea rows={3} {...form.register('objectivesDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Objectives'>
				<AdminItemList>
					{objArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={objArr.fields.length}
							title={
								form.watch(`objectives.${index}.title`) ||
								`Objective ${index + 1}`
							}
							onMove={d => objArr.move(index, index + d)}
							onRemove={() => objArr.remove(index)}>
							<AdminFieldGrid>
								<AdminField label='Title'>
									<Input
										{...form.register(`objectives.${index}.title` as const)}
									/>
								</AdminField>
								<AdminField label='Icon'>
									{iconSelect(form.watch(`objectives.${index}.icon`), v =>
										form.setValue(`objectives.${index}.icon`, v, {
											shouldDirty: true
										})
									)}
								</AdminField>
							</AdminFieldGrid>
							<AdminField label='Description'>
								<Textarea
									rows={3}
									{...form.register(
										`objectives.${index}.description` as const
									)}
								/>
							</AdminField>
						</AdminItemCard>
					))}
				</AdminItemList>
				{objArr.fields.length === 0 && (
					<AdminEmptyState title='No objectives yet' />
				)}
				<AddRowButton onClick={() => objArr.append(createObjective())}>
					Add objective
				</AddRowButton>
			</AdminFormSection>

			<AdminFormSection title='Statistics — heading'>
				<AdminField label='Section title'>
					<Input {...form.register('statisticsTitle')} />
				</AdminField>
				<AdminField label='Section description'>
					<Textarea rows={3} {...form.register('statisticsDescription')} />
				</AdminField>
			</AdminFormSection>

			<AdminFormSection title='Statistics'>
				<AdminItemList>
					{statArr.fields.map((field, index) => (
						<AdminItemCard
							key={field.id}
							index={index}
							total={statArr.fields.length}
							title={
								form.watch(`statistics.${index}.label`) ||
								`Stat ${index + 1}`
							}
							subtitle={form.watch(`statistics.${index}.number`) || undefined}
							onMove={d => statArr.move(index, index + d)}
							onRemove={() => statArr.remove(index)}>
							<AdminFieldGrid cols={3}>
								<AdminField label='Number'>
									<Input
										{...form.register(`statistics.${index}.number` as const)}
									/>
								</AdminField>
								<AdminField label='Label'>
									<Input
										{...form.register(`statistics.${index}.label` as const)}
									/>
								</AdminField>
								<AdminField label='Sublabel'>
									<Input
										{...form.register(`statistics.${index}.sublabel` as const)}
									/>
								</AdminField>
							</AdminFieldGrid>
						</AdminItemCard>
					))}
				</AdminItemList>
				{statArr.fields.length === 0 && (
					<AdminEmptyState title='No statistics yet' />
				)}
				<AddRowButton onClick={() => statArr.append(createStatistic())}>
					Add statistic
				</AddRowButton>
			</AdminFormSection>

			<AdminFormFooter status={status} saving={isPending} />
		</AdminForm>
	);
}
