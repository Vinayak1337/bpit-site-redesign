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
	CardHeader,
	CardTitle,
	CardDescription
} from '@/components/ui/card';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import SimpleSubContent from '@/app/(Public Pages)/(library layout)/academia/library/_shared/SimpleSubContent';
import type {
	SimpleContentData,
	SimpleContentSection
} from '@/app/(Private Pages)/actions/_library-subpage-shared';

type FormValues = {
	eyebrow: string;
	heading: string;
	intro: string;
	sections: SimpleContentSection[];
	body: string;
};

function ContentForm({
	initialData,
	updateAction,
	onChange
}: {
	initialData: SimpleContentData;
	updateAction: (
		data: SimpleContentData
	) => Promise<{ ok: boolean; error?: string }>;
	onChange?: (d: SimpleContentData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<FormValues>({
		defaultValues: {
			eyebrow: initialData.eyebrow,
			heading: initialData.heading,
			intro: initialData.intro,
			sections: initialData.sections,
			body: initialData.body
		}
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'sections'
	});

	useEffect(() => {
		onChange?.(form.getValues() as SimpleContentData);
		const sub = form.watch(v => onChange?.(v as SimpleContentData));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateAction(v as SimpleContentData);
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Content</h3>
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

				<Card>
					<CardHeader>
						<CardTitle>Main text</CardTitle>
						<CardDescription>
							Eyebrow, heading, intro paragraph and closing body.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-3'>
						<FormField
							control={form.control}
							name='eyebrow'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Eyebrow</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='heading'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Heading</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='intro'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Intro</FormLabel>
									<FormControl>
										<Textarea rows={3} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='body'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Body (closing note)</FormLabel>
									<FormControl>
										<Textarea rows={3} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<h4 className='text-base font-semibold text-gray-900'>Sections</h4>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() =>
								append({
									icon: 'Info',
									title: 'New section',
									description: '',
									note: ''
								})
							}>
							<Plus className='h-4 w-4 mr-1' /> Add Section
						</Button>
					</div>
					{fields.map((f, i) => (
						<Card key={f.id}>
							<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-4'>
								<FormField
									control={form.control}
									name={`sections.${i}.icon`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<FormControl>
												<Input placeholder='BookOpen' {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`sections.${i}.title`}
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
									name={`sections.${i}.description`}
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea rows={2} {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`sections.${i}.note`}
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Note (optional)</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<div className='md:col-span-2 flex justify-end'>
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() => remove(i)}>
										<Trash2 className='h-4 w-4 mr-1' /> Remove
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</form>
		</Form>
	);
}

export default function SimpleContentEditor({
	initialData,
	updateAction
}: {
	initialData: SimpleContentData;
	updateAction: (
		data: SimpleContentData
	) => Promise<{ ok: boolean; error?: string }>;
}) {
	const [data, setData] = useState<SimpleContentData>(initialData);
	return (
		<Editable
			label='Content'
			presentation='dialog'
			formContent={
				<ContentForm
					initialData={initialData}
					updateAction={updateAction}
					onChange={setData}
				/>
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<SimpleSubContent data={data} />
			</div>
		</Editable>
	);
}
