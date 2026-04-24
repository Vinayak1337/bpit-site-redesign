'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm, type Control, type UseFormRegister } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import {
	updateSyllabusPrograms,
	type SyllabusProgramsData,
	type SyllabusProgramItem
} from '@/app/(Private Pages)/actions/academia-syllabus-ordinance';

const TYPES = ['syllabus', 'ordinance'] as const;
const COLORS = [
	'blue',
	'green',
	'purple',
	'orange',
	'indigo',
	'red',
	'yellow',
	'pink',
	'teal',
	'gray'
] as const;

type FormItem = {
	id: string;
	name: string;
	code: string;
	color: string;
	type: 'syllabus' | 'ordinance';
	courses: Array<{ value: string }>;
	syllabusCount: number;
	description: string;
	lastUpdated: string;
	size: string;
	department: string;
	course: string;
	image: string;
	documentUrl: string;
};

type FormValues = { items: FormItem[] };

type Props = {
	initialData: SyllabusProgramsData;
	onChange?: (data: SyllabusProgramsData) => void;
};

const toFormItem = (p: SyllabusProgramItem): FormItem => ({
	id: String(p.id),
	name: p.name,
	code: p.code,
	color: p.color || 'blue',
	type: p.type,
	courses: (p.courses ?? []).map(c => ({ value: c })),
	syllabusCount: p.syllabusCount ?? 0,
	description: p.description ?? '',
	lastUpdated: p.lastUpdated ?? '',
	size: p.size ?? '',
	department: p.department ?? '',
	course: p.course ?? '',
	image: p.image ?? '',
	documentUrl: p.documentUrl ?? ''
});

const normalize = (v: FormValues): SyllabusProgramsData => ({
	items: v.items.map(it => ({
		id: it.id.trim() || Date.now().toString(),
		name: it.name.trim(),
		code: it.code.trim() || 'N/A',
		color: it.color.trim() || 'blue',
		type: it.type,
		courses: it.courses
			.map(c => c.value.trim())
			.filter(Boolean),
		syllabusCount: Number(it.syllabusCount) || 0,
		description: it.description.trim(),
		lastUpdated: it.lastUpdated.trim(),
		size: it.size.trim(),
		department: it.department.trim(),
		course: it.course.trim(),
		image: it.image.trim() ? it.image.trim() : null,
		documentUrl: it.documentUrl.trim()
	}))
});

function CoursesFieldArray({
	control,
	register,
	programIndex
}: {
	control: Control<FormValues>;
	register: UseFormRegister<FormValues>;
	programIndex: number;
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `items.${programIndex}.courses`
	});

	return (
		<div className='space-y-2'>
			<FormLabel>Courses</FormLabel>
			<div className='space-y-2'>
				{fields.map((field, i) => (
					<div key={field.id} className='flex items-center gap-2'>
						<Input
							placeholder='e.g. B.Tech CSE'
							{...register(`items.${programIndex}.courses.${i}.value`)}
						/>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => remove(i)}>
							<Trash2 className='h-4 w-4' />
						</Button>
					</div>
				))}
			</div>
			<Button
				type='button'
				variant='outline'
				size='sm'
				onClick={() => append({ value: '' })}>
				<Plus className='h-4 w-4 mr-1' /> Add Course
			</Button>
		</div>
	);
}

export default function SyllabusProgramsForm({ initialData, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<FormValues>({
		defaultValues: { items: initialData.items.map(toFormItem) }
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	});

	useEffect(() => {
		onChange?.(normalize(form.getValues()));
		const sub = form.watch(v => onChange?.(normalize(v as FormValues)));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalize(values);
		startTransition(async () => {
			const r = await updateSyllabusPrograms(payload);
			setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Programs & Ordinances
					</h3>
					<div className='flex items-center gap-3'>
						{message ? (
							<span
								className={`text-sm font-medium ${
									message.toLowerCase().includes('fail')
										? 'text-red-600'
										: 'text-emerald-600'
								}`}>
								{message}
							</span>
						) : null}
						<Button type='submit' disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...
								</>
							) : (
								<>
									<Save className='mr-2 h-4 w-4' /> Save
								</>
							)}
						</Button>
					</div>
				</div>

				<div className='space-y-4'>
					{fields.map((field, index) => (
						<Card key={field.id}>
							<CardHeader>
								<div className='flex items-center justify-between'>
									<CardTitle className='text-base'>
										Item #{index + 1}
									</CardTitle>
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() => remove(index)}>
										<Trash2 className='h-4 w-4 mr-1' /> Remove
									</Button>
								</div>
								<CardDescription>
									Edit syllabus department or ordinance document.
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name / Title</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.code`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Code</FormLabel>
												<FormControl>
													<Input placeholder='CSE' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.type`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Type</FormLabel>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Type' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{TYPES.map(t => (
															<SelectItem key={t} value={t}>
																{t}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.color`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Color</FormLabel>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Color' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{COLORS.map(c => (
															<SelectItem key={c} value={c}>
																{c}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.syllabusCount`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Syllabus Count</FormLabel>
												<FormControl>
													<Input
														type='number'
														min={0}
														{...field}
														onChange={e =>
															field.onChange(Number(e.target.value) || 0)
														}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<CoursesFieldArray
									control={form.control}
									register={form.register}
									programIndex={index}
								/>

								<FormField
									control={form.control}
									name={`items.${index}.description`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea rows={3} {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.lastUpdated`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Updated</FormLabel>
												<FormControl>
													<Input type='date' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.size`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Size</FormLabel>
												<FormControl>
													<Input placeholder='2.5 MB' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.department`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Department</FormLabel>
												<FormControl>
													<Input placeholder='General' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.course`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Course (for ordinance)</FormLabel>
												<FormControl>
													<Input
														placeholder='All Undergraduate'
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.documentUrl`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Document URL</FormLabel>
												<FormControl>
													<Input placeholder='https://...' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name={`items.${index}.image`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Image URL</FormLabel>
											<FormControl>
												<Input placeholder='https://...' {...field} />
											</FormControl>
											<div className='flex flex-wrap gap-2 pt-2'>
												<CloudinaryUploadButton
													buttonText='Upload Image'
													folder='academia/syllabus-ordinance'
													onUpload={url =>
														form.setValue(
															`items.${index}.image`,
															url,
															{ shouldDirty: true, shouldTouch: true }
														)
													}
													onError={msg => setMessage(msg)}
												/>
												<Button
													type='button'
													variant='outline'
													size='sm'
													onClick={() =>
														form.setValue(`items.${index}.image`, '', {
															shouldDirty: true,
															shouldTouch: true
														})
													}>
													Clear
												</Button>
											</div>
											{field.value ? (
												<div className='mt-3 rounded-lg overflow-hidden border h-24 w-24 relative'>
													{/* eslint-disable-next-line @next/next/no-img-element */}
													<img
														src={field.value}
														alt='Preview'
														className='w-full h-full object-cover'
													/>
												</div>
											) : null}
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					))}
				</div>

				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							id: Date.now().toString(),
							name: 'New Item',
							code: 'NEW',
							color: 'blue',
							type: 'syllabus',
							courses: [],
							syllabusCount: 8,
							description: '',
							lastUpdated: new Date().toISOString().slice(0, 10),
							size: '',
							department: '',
							course: '',
							image: '',
							documentUrl: ''
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Item
				</Button>
			</form>
		</Form>
	);
}
