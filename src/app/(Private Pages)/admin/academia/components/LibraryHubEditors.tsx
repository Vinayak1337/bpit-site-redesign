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
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import Editable from '@/components/ui/Editable';
import {
	LibraryHeader,
	LibraryStats,
	LibraryMission,
	LibraryFeatures,
	LibraryInfo
} from '@/app/(Public Pages)/(library layout)/academia/library/components/LibrarySections';
import {
	updateLibraryHero,
	updateLibraryStats,
	updateLibraryMission,
	updateLibraryFeatures,
	updateLibraryInfo,
	type LibraryHeroData,
	type LibraryStatsData,
	type LibraryMissionData,
	type LibraryFeaturesData,
	type LibraryInfoData
} from '@/app/(Private Pages)/actions/academia-library';

function StatusButton({
	isPending,
	message
}: {
	isPending: boolean;
	message: string | null;
}) {
	return (
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
	);
}

// ---------------- HERO ----------------

type HeroValues = {
	eyebrow: string;
	title: string;
	titleAccent: string;
	subtitle: string;
	backgroundImage: string;
};
const normalizeHero = (v: Partial<HeroValues>): LibraryHeroData => ({
	eyebrow: (v.eyebrow ?? '').trim(),
	title: (v.title ?? '').trim(),
	titleAccent: (v.titleAccent ?? '').trim(),
	subtitle: (v.subtitle ?? '').trim(),
	backgroundImage:
		(v.backgroundImage ?? '').trim().length > 0
			? (v.backgroundImage ?? '').trim()
			: null
});

function LibraryHeroForm({
	initialData,
	onChange
}: {
	initialData: LibraryHeroData;
	onChange?: (d: LibraryHeroData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<HeroValues>({
		defaultValues: {
			eyebrow: initialData.eyebrow,
			title: initialData.title,
			titleAccent: initialData.titleAccent,
			subtitle: initialData.subtitle,
			backgroundImage: initialData.backgroundImage ?? ''
		}
	});
	useEffect(() => {
		onChange?.(normalizeHero(form.getValues()));
		const sub = form.watch(v => onChange?.(normalizeHero(v)));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					const payload = normalizeHero(v);
					startTransition(async () => {
						const r = await updateLibraryHero(payload);
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Library Header</h3>
					<StatusButton isPending={isPending} message={message} />
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Header</CardTitle>
						<CardDescription>Badge, title and subtitle.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='eyebrow'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Eyebrow (Badge)</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
							<FormField
								control={form.control}
								name='title'
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
								name='titleAccent'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title Accent (gradient word)</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='subtitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Textarea rows={3} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='backgroundImage'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Background Image (optional)</FormLabel>
									<FormControl>
										<Input placeholder='https://...' {...field} />
									</FormControl>
									<div className='flex flex-wrap gap-2 pt-2'>
										<CloudinaryUploadButton
											buttonText='Upload Image'
											folder='academia/library'
											onUpload={url =>
												form.setValue('backgroundImage', url, {
													shouldDirty: true,
													shouldTouch: true
												})
											}
											onError={msg => setMessage(msg)}
										/>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() =>
												form.setValue('backgroundImage', '', {
													shouldDirty: true,
													shouldTouch: true
												})
											}>
											Clear
										</Button>
									</div>
									{field.value ? (
										<div className='mt-3 rounded-lg overflow-hidden border h-32 relative'>
											<img
												src={field.value}
												alt='Background'
												className='w-full h-full object-cover'
											/>
										</div>
									) : null}
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}

export function LibraryHeroEditor({
	initialData
}: {
	initialData: LibraryHeroData;
}) {
	const [data, setData] = useState<LibraryHeroData>(initialData);
	return (
		<Editable
			label='Library Header'
			presentation='dialog'
			formContent={
				<LibraryHeroForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<LibraryHeader data={data} />
			</div>
		</Editable>
	);
}

// ---------------- STATS ----------------

type StatsValues = { items: LibraryStatsData['items'] };

function LibraryStatsForm({
	initialData,
	onChange
}: {
	initialData: LibraryStatsData;
	onChange?: (d: LibraryStatsData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<StatsValues>({
		defaultValues: { items: initialData.items }
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	});
	useEffect(() => {
		onChange?.({ items: form.getValues('items') });
		const sub = form.watch(v =>
			onChange?.({ items: (v.items ?? []) as LibraryStatsData['items'] })
		);
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateLibraryStats({ items: v.items });
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Library Stats</h3>
					<StatusButton isPending={isPending} message={message} />
				</div>
				<div className='space-y-3'>
					{fields.map((f, i) => (
						<Card key={f.id}>
							<CardContent className='grid grid-cols-1 md:grid-cols-4 gap-3 pt-4'>
								<FormField
									control={form.control}
									name={`items.${i}.icon`}
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
									name={`items.${i}.value`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Value</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`items.${i}.label`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Label</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`items.${i}.accent`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Accent classes</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<div className='md:col-span-4 flex justify-end'>
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
				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							icon: 'BookOpen',
							value: '0',
							label: 'New stat',
							accent: 'bg-blue-50 text-blue-700'
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Stat
				</Button>
			</form>
		</Form>
	);
}

export function LibraryStatsEditor({
	initialData
}: {
	initialData: LibraryStatsData;
}) {
	const [data, setData] = useState<LibraryStatsData>(initialData);
	return (
		<Editable
			label='Library Stats'
			presentation='dialog'
			formContent={
				<LibraryStatsForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<LibraryStats data={data} />
			</div>
		</Editable>
	);
}

// ---------------- MISSION ----------------

function LibraryMissionForm({
	initialData,
	onChange
}: {
	initialData: LibraryMissionData;
	onChange?: (d: LibraryMissionData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<LibraryMissionData>({ defaultValues: initialData });
	useEffect(() => {
		onChange?.(form.getValues());
		const sub = form.watch(v => onChange?.(v as LibraryMissionData));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateLibraryMission(v);
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Mission</h3>
					<StatusButton isPending={isPending} message={message} />
				</div>
				<Card>
					<CardContent className='space-y-3 pt-4'>
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
							name='body'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Body</FormLabel>
									<FormControl>
										<Textarea rows={5} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}

export function LibraryMissionEditor({
	initialData
}: {
	initialData: LibraryMissionData;
}) {
	const [data, setData] = useState<LibraryMissionData>(initialData);
	return (
		<Editable
			label='Library Mission'
			presentation='dialog'
			formContent={
				<LibraryMissionForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<LibraryMission data={data} />
			</div>
		</Editable>
	);
}

// ---------------- FEATURES ----------------

type FeaturesValues = { items: LibraryFeaturesData['items'] };

function LibraryFeaturesForm({
	initialData,
	onChange
}: {
	initialData: LibraryFeaturesData;
	onChange?: (d: LibraryFeaturesData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<FeaturesValues>({
		defaultValues: { items: initialData.items }
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items'
	});
	useEffect(() => {
		onChange?.({ items: form.getValues('items') });
		const sub = form.watch(v =>
			onChange?.({ items: (v.items ?? []) as LibraryFeaturesData['items'] })
		);
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateLibraryFeatures({ items: v.items });
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Features</h3>
					<StatusButton isPending={isPending} message={message} />
				</div>
				<div className='space-y-3'>
					{fields.map((f, i) => (
						<Card key={f.id}>
							<CardContent className='grid grid-cols-1 md:grid-cols-3 gap-3 pt-4'>
								<FormField
									control={form.control}
									name={`items.${i}.icon`}
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
									name={`items.${i}.description`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<div className='md:col-span-3 flex justify-end'>
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
				<Button
					type='button'
					variant='outline'
					onClick={() =>
						append({
							icon: 'BookOpen',
							title: 'New feature',
							description: ''
						})
					}>
					<Plus className='h-4 w-4 mr-1' /> Add Feature
				</Button>
			</form>
		</Form>
	);
}

export function LibraryFeaturesEditor({
	initialData
}: {
	initialData: LibraryFeaturesData;
}) {
	const [data, setData] = useState<LibraryFeaturesData>(initialData);
	return (
		<Editable
			label='Library Features'
			presentation='dialog'
			formContent={
				<LibraryFeaturesForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<LibraryFeatures data={data} />
			</div>
		</Editable>
	);
}

// ---------------- INFO ----------------

function LibraryInfoForm({
	initialData,
	onChange
}: {
	initialData: LibraryInfoData;
	onChange?: (d: LibraryInfoData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<LibraryInfoData>({ defaultValues: initialData });
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'quickLinks'
	});
	useEffect(() => {
		onChange?.(form.getValues());
		const sub = form.watch(v => onChange?.(v as LibraryInfoData));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateLibraryInfo(v);
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Info Panel</h3>
					<StatusButton isPending={isPending} message={message} />
				</div>
				<Card>
					<CardContent className='space-y-3 pt-4'>
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
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
							<FormField
								control={form.control}
								name='locationTitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='locationLine1'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location Line 1</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='locationLine2'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location Line 2</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='quickLinksHeading'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quick Links Heading</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<div className='space-y-2'>
							{fields.map((f, i) => (
								<div key={f.id} className='grid grid-cols-12 gap-2 items-end'>
									<FormField
										control={form.control}
										name={`quickLinks.${i}.label`}
										render={({ field }) => (
											<FormItem className='col-span-5'>
												<FormLabel>Label</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`quickLinks.${i}.href`}
										render={({ field }) => (
											<FormItem className='col-span-6'>
												<FormLabel>Href</FormLabel>
												<FormControl>
													<Input placeholder='/academia/library/...' {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<Button
										type='button'
										variant='outline'
										size='sm'
										className='col-span-1'
										onClick={() => remove(i)}>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
							))}
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => append({ label: 'New link', href: '/' })}>
								<Plus className='h-4 w-4 mr-1' /> Add Quick Link
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}

export function LibraryInfoEditor({
	initialData
}: {
	initialData: LibraryInfoData;
}) {
	const [data, setData] = useState<LibraryInfoData>(initialData);
	return (
		<Editable
			label='Library Info'
			presentation='dialog'
			formContent={
				<LibraryInfoForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<LibraryInfo data={data} />
			</div>
		</Editable>
	);
}
