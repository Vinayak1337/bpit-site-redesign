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
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import Editable from '@/components/ui/Editable';
import StaffList from '@/app/(Public Pages)/(library layout)/academia/library/_shared/StaffList';
import AdvisoryList from '@/app/(Public Pages)/(library layout)/academia/library/_shared/AdvisoryList';
import DownloadsList from '@/app/(Public Pages)/(library layout)/academia/library/_shared/DownloadsList';
import UsefulLinksList from '@/app/(Public Pages)/(library layout)/academia/library/_shared/UsefulLinksList';
import type {
	AdvisoryItem,
	AdvisoryListData,
	DownloadItem,
	DownloadsListData,
	StaffItem,
	StaffListData,
	UsefulLinkItem,
	UsefulLinksListData
} from '@/app/(Private Pages)/actions/_library-subpage-shared';

function Header({
	title,
	isPending,
	message
}: {
	title: string;
	isPending: boolean;
	message: string | null;
}) {
	return (
		<div className='flex items-center justify-between'>
			<h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
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
	);
}

// ================= STAFF =================

type StaffValues = { items: StaffItem[] };

function normalizeStaff(items: StaffItem[]): StaffItem[] {
	return items.map(it => ({
		...it,
		avatar: it.avatar && it.avatar.trim().length > 0 ? it.avatar : null
	}));
}

function StaffForm({
	initialData,
	slug,
	updateAction,
	onChange
}: {
	initialData: StaffListData;
	slug: string;
	updateAction: (
		d: StaffListData
	) => Promise<{ ok: boolean; error?: string }>;
	onChange?: (d: StaffListData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<StaffValues>({
		defaultValues: {
			items: initialData.items.map(i => ({ ...i, avatar: i.avatar ?? '' })) as StaffItem[]
		}
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	});
	useEffect(() => {
		onChange?.({ items: normalizeStaff(form.getValues('items')) });
		const sub = form.watch(v =>
			onChange?.({ items: normalizeStaff((v.items ?? []) as StaffItem[]) })
		);
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateAction({
							items: normalizeStaff(v.items as StaffItem[])
						});
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-4'>
				<Header title='Staff Members' isPending={isPending} message={message} />
				{fields.map((f, i) => (
					<Card key={f.id}>
						<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-4'>
							<FormField
								control={form.control}
								name={`items.${i}.name`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.role`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.email`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.phone`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.qualification`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Qualification</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.specialization`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Specialization</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.avatar`}
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Avatar URL</FormLabel>
										<FormControl>
											<Input
												placeholder='https://...'
												value={field.value ?? ''}
												onChange={field.onChange}
												onBlur={field.onBlur}
												name={field.name}
												ref={field.ref}
											/>
										</FormControl>
										<div className='flex gap-2 pt-2'>
											<CloudinaryUploadButton
												buttonText='Upload Avatar'
												folder={`academia/library/${slug}`}
												onUpload={url =>
													form.setValue(`items.${i}.avatar`, url, {
														shouldDirty: true,
														shouldTouch: true
													})
												}
												onError={m => setMessage(m)}
											/>
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={() =>
													form.setValue(`items.${i}.avatar`, '', {
														shouldDirty: true,
														shouldTouch: true
													})
												}>
												Clear
											</Button>
										</div>
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
				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							name: '',
							role: '',
							email: '',
							phone: '',
							avatar: null,
							qualification: '',
							specialization: ''
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Staff
				</Button>
			</form>
		</Form>
	);
}

export function StaffListEditor({
	initialData,
	slug,
	updateAction
}: {
	initialData: StaffListData;
	slug: string;
	updateAction: (
		d: StaffListData
	) => Promise<{ ok: boolean; error?: string }>;
}) {
	const [data, setData] = useState<StaffListData>(initialData);
	return (
		<Editable
			label='Staff List'
			presentation='dialog'
			formContent={
				<StaffForm
					initialData={initialData}
					slug={slug}
					updateAction={updateAction}
					onChange={setData}
				/>
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<StaffList data={data} />
			</div>
		</Editable>
	);
}

// ================= ADVISORY =================

type AdvisoryValues = { items: AdvisoryItem[] };

function normalizeAdvisory(items: AdvisoryItem[]): AdvisoryItem[] {
	return items.map(it => ({
		...it,
		avatar: it.avatar && it.avatar.trim().length > 0 ? it.avatar : null
	}));
}

function AdvisoryForm({
	initialData,
	slug,
	updateAction,
	onChange
}: {
	initialData: AdvisoryListData;
	slug: string;
	updateAction: (
		d: AdvisoryListData
	) => Promise<{ ok: boolean; error?: string }>;
	onChange?: (d: AdvisoryListData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<AdvisoryValues>({
		defaultValues: {
			items: initialData.items.map(i => ({
				...i,
				avatar: i.avatar ?? ''
			})) as AdvisoryItem[]
		}
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	});
	useEffect(() => {
		onChange?.({ items: normalizeAdvisory(form.getValues('items')) });
		const sub = form.watch(v =>
			onChange?.({
				items: normalizeAdvisory((v.items ?? []) as AdvisoryItem[])
			})
		);
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateAction({
							items: normalizeAdvisory(v.items as AdvisoryItem[])
						});
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-4'>
				<Header title='Advisory Members' isPending={isPending} message={message} />
				{fields.map((f, i) => (
					<Card key={f.id}>
						<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-4'>
							<FormField
								control={form.control}
								name={`items.${i}.name`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.designation`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Designation</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.role`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.email`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.phone`}
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.avatar`}
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Avatar URL</FormLabel>
										<FormControl>
											<Input
												placeholder='https://...'
												value={field.value ?? ''}
												onChange={field.onChange}
												onBlur={field.onBlur}
												name={field.name}
												ref={field.ref}
											/>
										</FormControl>
										<div className='flex gap-2 pt-2'>
											<CloudinaryUploadButton
												buttonText='Upload Avatar'
												folder={`academia/library/${slug}`}
												onUpload={url =>
													form.setValue(`items.${i}.avatar`, url, {
														shouldDirty: true,
														shouldTouch: true
													})
												}
												onError={m => setMessage(m)}
											/>
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={() =>
													form.setValue(`items.${i}.avatar`, '', {
														shouldDirty: true,
														shouldTouch: true
													})
												}>
												Clear
											</Button>
										</div>
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
				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							name: '',
							designation: '',
							role: '',
							email: '',
							phone: '',
							avatar: null
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Member
				</Button>
			</form>
		</Form>
	);
}

export function AdvisoryListEditor({
	initialData,
	slug,
	updateAction
}: {
	initialData: AdvisoryListData;
	slug: string;
	updateAction: (
		d: AdvisoryListData
	) => Promise<{ ok: boolean; error?: string }>;
}) {
	const [data, setData] = useState<AdvisoryListData>(initialData);
	return (
		<Editable
			label='Advisory List'
			presentation='dialog'
			formContent={
				<AdvisoryForm
					initialData={initialData}
					slug={slug}
					updateAction={updateAction}
					onChange={setData}
				/>
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<AdvisoryList data={data} />
			</div>
		</Editable>
	);
}

// ================= DOWNLOADS =================

type DownloadsValues = { items: DownloadItem[] };

function DownloadsForm({
	initialData,
	updateAction,
	onChange
}: {
	initialData: DownloadsListData;
	updateAction: (
		d: DownloadsListData
	) => Promise<{ ok: boolean; error?: string }>;
	onChange?: (d: DownloadsListData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<DownloadsValues>({
		defaultValues: { items: initialData.items }
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	});
	useEffect(() => {
		onChange?.({ items: form.getValues('items') as DownloadItem[] });
		const sub = form.watch(v =>
			onChange?.({ items: (v.items ?? []) as DownloadItem[] })
		);
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateAction({ items: v.items as DownloadItem[] });
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-4'>
				<Header title='Downloads' isPending={isPending} message={message} />
				{fields.map((f, i) => (
					<Card key={f.id}>
						<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-4'>
							<FormField
								control={form.control}
								name={`items.${i}.title`}
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.description`}
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
								name={`items.${i}.fileUrl`}
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>File URL</FormLabel>
										<FormControl>
											<Input placeholder='https://...' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.date`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date</FormLabel>
										<FormControl>
											<Input placeholder='YYYY-MM-DD' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.fileSize`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>File Size</FormLabel>
										<FormControl>
											<Input placeholder='245 KB' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.fileType`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>File Type</FormLabel>
										<FormControl>
											<Input placeholder='PDF' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.category`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
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
				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							title: '',
							description: '',
							fileUrl: '',
							date: '',
							fileSize: '',
							fileType: 'PDF',
							category: 'Forms'
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Download
				</Button>
			</form>
		</Form>
	);
}

export function DownloadsListEditor({
	initialData,
	updateAction
}: {
	initialData: DownloadsListData;
	updateAction: (
		d: DownloadsListData
	) => Promise<{ ok: boolean; error?: string }>;
}) {
	const [data, setData] = useState<DownloadsListData>(initialData);
	return (
		<Editable
			label='Downloads'
			presentation='dialog'
			formContent={
				<DownloadsForm
					initialData={initialData}
					updateAction={updateAction}
					onChange={setData}
				/>
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<DownloadsList data={data} />
			</div>
		</Editable>
	);
}

// ================= USEFUL LINKS =================

type UsefulValues = { items: UsefulLinkItem[] };

function UsefulLinksForm({
	initialData,
	updateAction,
	onChange
}: {
	initialData: UsefulLinksListData;
	updateAction: (
		d: UsefulLinksListData
	) => Promise<{ ok: boolean; error?: string }>;
	onChange?: (d: UsefulLinksListData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<UsefulValues>({
		defaultValues: { items: initialData.items }
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	});
	useEffect(() => {
		onChange?.({ items: form.getValues('items') as UsefulLinkItem[] });
		const sub = form.watch(v =>
			onChange?.({ items: (v.items ?? []) as UsefulLinkItem[] })
		);
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateAction({
							items: v.items as UsefulLinkItem[]
						});
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-4'>
				<Header title='Useful Links' isPending={isPending} message={message} />
				{fields.map((f, i) => (
					<Card key={f.id}>
						<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-4'>
							<FormField
								control={form.control}
								name={`items.${i}.title`}
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
								name={`items.${i}.category`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.url`}
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>URL</FormLabel>
										<FormControl>
											<Input placeholder='https://...' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${i}.description`}
								render={({ field }) => (
									<FormItem className='md:col-span-2'>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea rows={2} {...field} />
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
				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							title: '',
							url: '',
							description: '',
							category: 'Reference & Tools'
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Link
				</Button>
			</form>
		</Form>
	);
}

export function UsefulLinksListEditor({
	initialData,
	updateAction
}: {
	initialData: UsefulLinksListData;
	updateAction: (
		d: UsefulLinksListData
	) => Promise<{ ok: boolean; error?: string }>;
}) {
	const [data, setData] = useState<UsefulLinksListData>(initialData);
	return (
		<Editable
			label='Useful Links'
			presentation='dialog'
			formContent={
				<UsefulLinksForm
					initialData={initialData}
					updateAction={updateAction}
					onChange={setData}
				/>
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<UsefulLinksList data={data} />
			</div>
		</Editable>
	);
}
