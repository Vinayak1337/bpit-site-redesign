'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
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
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import {
	updateExaminationContent,
	type ExaminationContentData
} from '@/app/(Private Pages)/actions/academia-examination';

type FormValues = {
	eyebrow: string;
	heading: string;
	intro: string;
	sections: {
		icon: string;
		title: string;
		description: string;
		note: string;
	}[];
	body: string;
};

type Props = {
	initialData: ExaminationContentData;
	onChange?: (data: ExaminationContentData) => void;
};

const ICON_OPTIONS = ['FileCheck', 'ClipboardList', 'CalendarClock'] as const;

const normalize = (values: Partial<FormValues>): ExaminationContentData => ({
	eyebrow: (values.eyebrow ?? '').trim(),
	heading: (values.heading ?? '').trim(),
	intro: (values.intro ?? '').trim(),
	sections: (values.sections ?? []).map(s => ({
		icon: (s.icon ?? 'FileCheck').trim(),
		title: (s.title ?? '').trim(),
		description: (s.description ?? '').trim(),
		note: (s.note ?? '').trim()
	})),
	body: (values.body ?? '').trim()
});

export default function ExaminationContentForm({ initialData, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			eyebrow: initialData.eyebrow,
			heading: initialData.heading,
			intro: initialData.intro,
			sections: initialData.sections.map(s => ({
				icon: s.icon ?? 'FileCheck',
				title: s.title,
				description: s.description,
				note: s.note ?? ''
			})),
			body: initialData.body ?? ''
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'sections'
	});

	useEffect(() => {
		onChange?.(normalize(form.getValues()));
		const sub = form.watch(values => onChange?.(normalize(values as FormValues)));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalize(values);
		startTransition(async () => {
			const result = await updateExaminationContent(payload);
			setMessage(result.ok ? 'Saved successfully' : result.error ?? 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Main Content</h3>
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
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Saving...
								</>
							) : (
								<>
									<Save className='mr-2 h-4 w-4' />
									Save
								</>
							)}
						</Button>
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Intro block</CardTitle>
						<CardDescription>
							Eyebrow badge, heading and lead copy for the Examination content.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='eyebrow'
							rules={{ required: 'Eyebrow is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Eyebrow</FormLabel>
									<FormControl>
										<Input placeholder='Examination Cell' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='heading'
							rules={{ required: 'Heading is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Heading</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='intro'
							rules={{ required: 'Intro is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Intro</FormLabel>
									<FormControl>
										<Textarea rows={3} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between gap-2'>
						<div>
							<CardTitle>Info cards</CardTitle>
							<CardDescription>
								Add or remove feature cards. Icon must match one of the preset
								options.
							</CardDescription>
						</div>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() =>
								append({
									icon: 'FileCheck',
									title: '',
									description: '',
									note: ''
								})
							}>
							<Plus className='h-4 w-4 mr-1' />
							Add card
						</Button>
					</CardHeader>
					<CardContent className='space-y-4'>
						{fields.length === 0 ? (
							<p className='text-sm text-gray-500'>
								No cards yet. Click &ldquo;Add card&rdquo; to create one.
							</p>
						) : null}
						{fields.map((fieldItem, idx) => (
							<div
								key={fieldItem.id}
								className='grid gap-3 p-4 rounded-lg border bg-gray-50'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-semibold text-gray-700'>
										Card {idx + 1}
									</span>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() => remove(idx)}>
										<Trash2 className='h-4 w-4 mr-1' />
										Remove
									</Button>
								</div>
								<FormField
									control={form.control}
									name={`sections.${idx}.icon` as const}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select icon' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{ICON_OPTIONS.map(name => (
														<SelectItem key={name} value={name}>
															{name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`sections.${idx}.title` as const}
									rules={{ required: 'Title is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`sections.${idx}.description` as const}
									rules={{ required: 'Description is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea rows={2} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`sections.${idx}.note` as const}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Note (optional)</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Additional body (optional)</CardTitle>
						<CardDescription>
							Plain-text body rendered under the info cards. Line breaks are
							preserved.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name='body'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Body</FormLabel>
									<FormControl>
										<Textarea rows={8} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
