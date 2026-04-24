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
import {
	updateCalendarEvents,
	type CalendarEventsData,
	type CalendarEventItem
} from '@/app/(Private Pages)/actions/academia-academic-calendar';

const TYPES = ['exam', 'holiday', 'academic', 'orientation', 'fest'] as const;
const PRIORITIES = ['high', 'medium', 'low'] as const;

type FormValues = {
	items: Array<{
		id: string;
		title: string;
		description: string;
		date: string;
		endDate: string;
		time: string;
		location: string;
		type: (typeof TYPES)[number];
		semester: string;
		department: string;
		priority: (typeof PRIORITIES)[number];
	}>;
};

type Props = {
	initialData: CalendarEventsData;
	onChange?: (data: CalendarEventsData) => void;
};

const toFormItem = (e: CalendarEventItem) => ({
	id: String(e.id),
	title: e.title,
	description: e.description ?? '',
	date: e.date,
	endDate: e.endDate ?? '',
	time: e.time ?? '',
	location: e.location ?? '',
	type: e.type,
	semester: e.semester ?? '',
	department: e.department ?? '',
	priority: e.priority
});

const normalize = (v: FormValues): CalendarEventsData => ({
	items: v.items.map(it => ({
		id: it.id.trim() || Date.now().toString(),
		title: it.title.trim(),
		description: it.description.trim(),
		date: it.date.trim(),
		endDate: it.endDate.trim(),
		time: it.time.trim(),
		location: it.location.trim(),
		type: it.type,
		semester: it.semester.trim(),
		department: it.department.trim(),
		priority: it.priority
	}))
});

export default function CalendarEventsForm({ initialData, onChange }: Props) {
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
			const r = await updateCalendarEvents(payload);
			setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Calendar Events
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
										Event #{index + 1}
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
									Edit the fields for this calendar event.
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-3'>
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
									name={`items.${index}.description`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea rows={2} {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.date`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Start Date (YYYY-MM-DD)</FormLabel>
												<FormControl>
													<Input type='date' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.endDate`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>End Date (optional)</FormLabel>
												<FormControl>
													<Input type='date' {...field} />
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
										name={`items.${index}.time`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Time</FormLabel>
												<FormControl>
													<Input placeholder='9:00 AM' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
									<FormField
										control={form.control}
										name={`items.${index}.location`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Location</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`items.${index}.semester`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Semester</FormLabel>
												<FormControl>
													<Input {...field} />
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
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
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
							title: 'New event',
							description: '',
							date: new Date().toISOString().slice(0, 10),
							endDate: '',
							time: '',
							location: '',
							type: 'academic',
							semester: '',
							department: '',
							priority: 'medium'
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Event
				</Button>
			</form>
		</Form>
	);
}
