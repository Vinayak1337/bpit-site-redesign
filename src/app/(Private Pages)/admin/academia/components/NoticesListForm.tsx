'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
	updateNoticesList,
	type NoticesData,
	type NoticeItem
} from '@/app/(Private Pages)/actions/academia-notices-circulars';

const CATEGORIES = [
	'Academic',
	'Financial Aid',
	'Admission',
	'Sports',
	'Library',
	'Innovation',
	'General'
] as const;

const PRIORITIES = ['high', 'medium', 'low'] as const;

type FormValues = {
	items: Array<{
		id: string;
		category: string;
		title: string;
		subtitle: string;
		date: string;
		time: string;
		priority: 'high' | 'medium' | 'low';
		tagsCsv: string;
		description: string;
		pinned: boolean;
		urgent: boolean;
		image: string;
		link: string;
	}>;
};

type Props = {
	initialData: NoticesData;
	onChange?: (data: NoticesData) => void;
};

const toFormItem = (n: NoticeItem) => ({
	id: String(n.id),
	category: n.category,
	title: n.title,
	subtitle: n.subtitle ?? '',
	date: n.date,
	time: n.time ?? '',
	priority: n.priority,
	tagsCsv: (n.tags ?? []).join(', '),
	description: n.description ?? '',
	pinned: !!n.pinned,
	urgent: !!n.urgent,
	image: n.image ?? '',
	link: n.link ?? ''
});

const normalize = (v: FormValues): NoticesData => ({
	items: v.items.map(it => ({
		id: it.id.trim() || Date.now().toString(),
		category: it.category.trim() || 'General',
		title: it.title.trim(),
		subtitle: it.subtitle.trim(),
		date: it.date.trim(),
		time: it.time.trim(),
		priority: it.priority,
		tags: it.tagsCsv
			.split(',')
			.map(s => s.trim())
			.filter(Boolean),
		description: it.description.trim(),
		pinned: !!it.pinned,
		urgent: !!it.urgent,
		image: it.image.trim() ? it.image.trim() : null,
		link: it.link.trim()
	}))
});

export default function NoticesListForm({ initialData, onChange }: Props) {
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
			const r = await updateNoticesList(payload);
			setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Notices List</h3>
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
										Notice #{index + 1}
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
									Edit the fields for this notice. Image is optional.
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.title`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.subtitle`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Subtitle</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.category`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Category</FormLabel>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Category' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{CATEGORIES.map(c => (
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
										name={`items.${index}.priority`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Priority</FormLabel>
												<Select
													value={field.value}
													onValueChange={field.onChange}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Priority' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{PRIORITIES.map(p => (
															<SelectItem key={p} value={p}>
																{p}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.date`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Date (YYYY-MM-DD)</FormLabel>
												<FormControl>
													<Input type='date' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.time`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Time</FormLabel>
												<FormControl>
													<Input placeholder='10:00 AM' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.link`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Link</FormLabel>
												<FormControl>
													<Input placeholder='/...' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name={`items.${index}.tagsCsv`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tags (comma-separated)</FormLabel>
											<FormControl>
												<Input
													placeholder='Exam, Schedule, Important'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
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

								<div className='flex flex-wrap items-center gap-4 pt-1'>
									<label className='inline-flex items-center gap-2 text-sm'>
										<input
											type='checkbox'
											{...form.register(`items.${index}.pinned`)}
										/>
										Pinned
									</label>
									<label className='inline-flex items-center gap-2 text-sm'>
										<input
											type='checkbox'
											{...form.register(`items.${index}.urgent`)}
										/>
										Urgent
									</label>
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
													folder='academia/notices'
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
														form.setValue(
															`items.${index}.image`,
															'',
															{ shouldDirty: true, shouldTouch: true }
														)
													}>
													Clear
												</Button>
											</div>
											{field.value ? (
												<div className='mt-3 rounded-lg overflow-hidden border h-24 w-24 relative'>
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
							category: 'General',
							title: 'New notice',
							subtitle: '',
							date: new Date().toISOString().slice(0, 10),
							time: '',
							priority: 'medium',
							tagsCsv: '',
							description: '',
							pinned: false,
							urgent: false,
							image: '',
							link: '/'
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Notice
				</Button>
			</form>
		</Form>
	);
}
