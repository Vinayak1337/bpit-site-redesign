'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ChevronDown,
	ChevronUp,
	Film,
	GripVertical,
	Image as ImageIcon,
	Loader2,
	Pencil,
	Plus,
	Save,
	Trash2
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';
import { z } from 'zod';

import GalleryCollage from '@/components/gallery/GalleryCollage';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { updateGallery } from '@/app/(Private Pages)/actions/gallery';
import {
	galleryDataSchema,
	type GalleryData,
	type GalleryMediaType
} from '@/lib/schemas/gallery';

type GalleryItemSize = NonNullable<GalleryData['items'][number]['size']>;
type GalleryFormData = z.input<typeof galleryDataSchema>;

const SIZE_LABELS: Record<GalleryItemSize, string> = {
	small: '1×1',
	medium: '1×1',
	large: '2×2',
	wide: '2×1',
	tall: '1×2'
};

function detectSizeFromAspectRatio(width: number, height: number): GalleryItemSize {
	if (height === 0) return 'small';
	const ratio = width / height;
	if (ratio >= 1.6) return 'wide';
	if (ratio <= 0.67) return 'tall';
	return 'small';
}

// ─── Item row ────────────────────────────────────────────────────────────────

type GalleryItemRowProps = {
	index: number;
	field: { id: string; [key: string]: unknown };
	register: ReturnType<typeof useForm<GalleryFormData>>['register'];
	watch: ReturnType<typeof useForm<GalleryFormData>>['watch'];
	setValue: ReturnType<typeof useForm<GalleryFormData>>['setValue'];
	categoryOptions: string[];
	categories: string[];
	removeItem: (index: number) => void;
	dragProvided: import('@hello-pangea/dnd').DraggableProvided;
	defaultExpanded?: boolean;
};

function GalleryItemRow({
	index,
	field,
	register,
	watch,
	setValue,
	categoryOptions,
	categories,
	removeItem,
	dragProvided,
	defaultExpanded = false
}: GalleryItemRowProps) {
	const [expanded, setExpanded] = useState(defaultExpanded);

	const currentSrc = watch(`items.${index}.src`) ?? '';
	const currentMediaType =
		(watch(`items.${index}.mediaType`) as GalleryMediaType | undefined) ?? 'image';
	const currentThumbnail = watch(`items.${index}.thumbnail`) ?? '';
	const currentTitle = watch(`items.${index}.title`) ?? '';
	const currentDate = watch(`items.${index}.date`) ?? '';
	const selectedCategory =
		watch(`items.${index}.category`) || (field.category as string) || '';
	const selectedSize =
		(watch(`items.${index}.size`) as GalleryItemSize | undefined) ??
		((field.size as GalleryItemSize | undefined) || 'small');

	// Auto-detect layout size from image aspect ratio when src changes
	useEffect(() => {
		if (!currentSrc || currentMediaType !== 'image') return;
		let cancelled = false;
		const img = new Image();
		img.onload = () => {
			if (cancelled) return;
			setValue(`items.${index}.size`, detectSizeFromAspectRatio(img.naturalWidth, img.naturalHeight), {
				shouldDirty: true
			});
		};
		img.src = currentSrc;
		return () => {
			cancelled = true;
			img.onload = null;
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSrc, currentMediaType]);

	const thumbnailSrc = currentMediaType === 'video' ? currentThumbnail : currentSrc;

	return (
		<div
			ref={dragProvided.innerRef}
			{...dragProvided.draggableProps}
			className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'>

			{/* ── Collapsed header ─────────────────────────────────────── */}
			<div className='flex items-center gap-3 px-3 py-3'>
				<div
					{...dragProvided.dragHandleProps}
					className='flex-shrink-0 cursor-grab text-slate-300 hover:text-slate-500 active:cursor-grabbing'>
					<GripVertical className='h-4 w-4' />
				</div>

				{/* Thumbnail */}
				<div className='relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100'>
					{thumbnailSrc ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={thumbnailSrc} alt='' className='h-full w-full object-cover' />
					) : (
						<div className='flex h-full w-full items-center justify-center text-slate-300'>
							{currentMediaType === 'video' ? (
								<Film className='h-5 w-5' />
							) : (
								<ImageIcon className='h-5 w-5' />
							)}
						</div>
					)}
					{currentMediaType === 'video' ? (
						<div className='absolute inset-0 flex items-center justify-center bg-black/30'>
							<Film className='h-3.5 w-3.5 text-white' />
						</div>
					) : null}
				</div>

				{/* Info */}
				<div className='min-w-0 flex-1'>
					<p className='truncate text-sm font-medium text-slate-800'>
						{currentTitle || <span className='text-slate-400 italic'>Untitled item {index + 1}</span>}
					</p>
					<div className='mt-1 flex flex-wrap items-center gap-1.5'>
						{selectedCategory ? (
							<Badge variant='secondary' className='h-4 px-1.5 text-[10px] font-medium'>
								{selectedCategory}
							</Badge>
						) : null}
						<Badge variant='outline' className='h-4 px-1.5 text-[10px] font-medium text-slate-500'>
							{SIZE_LABELS[selectedSize]}
						</Badge>
						{currentDate ? (
							<span className='text-[10px] text-slate-400'>{currentDate}</span>
						) : null}
					</div>
				</div>

				{/* Actions */}
				<div className='flex flex-shrink-0 items-center gap-1'>
					<button
						type='button'
						onClick={() => setExpanded(e => !e)}
						className='rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors'>
						{expanded ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
					</button>
					<button
						type='button'
						onClick={() => removeItem(index)}
						className='rounded-md p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors'>
						<Trash2 className='h-4 w-4' />
					</button>
				</div>
			</div>

			{/* ── Expanded form ─────────────────────────────────────────── */}
			{expanded ? (
				<div className='border-t border-slate-100 bg-slate-50/60 p-4 space-y-4'>

					{/* Media source */}
					<div className='space-y-2'>
						<Label className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
							Media
						</Label>
						<div className='rounded-lg border border-slate-200 bg-white p-3 space-y-3'>
							<div className='flex gap-3'>
								{/* Preview */}
								<div className='relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100'>
									{currentSrc ? (
										currentMediaType === 'video' ? (
											<video src={currentSrc} className='h-full w-full object-cover' muted playsInline />
										) : (
											// eslint-disable-next-line @next/next/no-img-element
											<img src={currentSrc} alt='Preview' className='h-full w-full object-cover' />
										)
									) : (
										<div className='flex h-full w-full flex-col items-center justify-center gap-1 text-slate-300'>
											{currentMediaType === 'video' ? (
												<Film className='h-6 w-6' />
											) : (
												<ImageIcon className='h-6 w-6' />
											)}
											<span className='text-[10px]'>No media</span>
										</div>
									)}
								</div>
								<div className='flex-1 space-y-2'>
									<Input
										{...register(`items.${index}.src`)}
										placeholder={currentMediaType === 'video' ? 'Video URL' : 'Image URL'}
										className='h-8 text-sm'
									/>
									<div className='flex flex-wrap gap-2'>
										<CloudinaryUploadButton
											buttonText='Upload'
											resourceType={currentMediaType === 'video' ? 'video' : 'image'}
											onUpload={url => setValue(`items.${index}.src`, url, { shouldDirty: true, shouldTouch: true })}
											onError={msg => toast.error(msg)}
										/>
										{currentSrc ? (
											<Button
												type='button' variant='ghost' size='sm'
												className='h-7 text-xs text-slate-500 hover:text-red-500'
												onClick={() => setValue(`items.${index}.src`, '', { shouldDirty: true, shouldTouch: true })}>
												Clear
											</Button>
										) : null}
									</div>
								</div>
							</div>

							{/* Media type toggle */}
							<div className='flex items-center gap-2'>
								<Label className='text-xs text-slate-500 w-24'>Media type</Label>
								<Select
									value={currentMediaType}
									onValueChange={value => {
										setValue(`items.${index}.mediaType`, value as GalleryMediaType, { shouldDirty: true, shouldTouch: true });
										if (value === 'image') {
											setValue(`items.${index}.thumbnail`, '', { shouldDirty: true, shouldTouch: true });
										}
									}}>
									<SelectTrigger className='h-7 w-32 text-xs'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='image'>Image</SelectItem>
										<SelectItem value='video'>Video</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Video thumbnail */}
							{currentMediaType === 'video' ? (
								<div className='space-y-2 pt-2 border-t border-slate-100'>
									<Label className='text-xs text-slate-500'>Video thumbnail</Label>
									<div className='flex gap-2'>
										<Input
											{...register(`items.${index}.thumbnail`)}
											placeholder='Thumbnail URL'
											className='h-8 text-sm'
										/>
										<CloudinaryUploadButton
											buttonText='Upload'
											resourceType='image'
											onUpload={url => setValue(`items.${index}.thumbnail`, url, { shouldDirty: true, shouldTouch: true })}
											onError={msg => toast.error(msg)}
										/>
									</div>
									{currentThumbnail ? (
										<div className='relative h-20 w-32 overflow-hidden rounded-md border'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src={currentThumbnail} alt='Thumbnail' className='h-full w-full object-cover' />
										</div>
									) : null}
								</div>
							) : null}
						</div>
					</div>

					{/* Metadata */}
					<div className='space-y-2'>
						<Label className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
							Details
						</Label>
						<div className='rounded-lg border border-slate-200 bg-white p-3 grid grid-cols-2 gap-3'>
							<div className='col-span-2 space-y-1'>
								<Label className='text-xs text-slate-500'>Title</Label>
								<Input {...register(`items.${index}.title`)} placeholder='e.g. Malhaar Main Stage' className='h-8 text-sm' />
							</div>

							<div className='space-y-1'>
								<Label className='text-xs text-slate-500'>Category</Label>
								<Select
									value={selectedCategory}
									onValueChange={value => setValue(`items.${index}.category`, value, { shouldDirty: true, shouldTouch: true })}>
									<SelectTrigger className='h-8 text-xs'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent>
										{(categoryOptions.length > 0 ? categoryOptions : categories).map(cat => (
											<SelectItem key={cat} value={cat}>{cat}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-1'>
								<Label className='text-xs text-slate-500'>Date</Label>
								<Input {...register(`items.${index}.date`)} placeholder='e.g. 24 Nov 2022' className='h-8 text-sm' />
							</div>

							<div className='col-span-2 space-y-1'>
								<Label className='text-xs text-slate-500'>
									Layout size
									<span className='ml-1 font-normal text-slate-400'>(auto-detected from image)</span>
								</Label>
								<Select
									value={selectedSize}
									onValueChange={value => setValue(`items.${index}.size`, value as GalleryItemSize, { shouldDirty: true, shouldTouch: true })}>
									<SelectTrigger className='h-8 text-xs'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='small'>Small — 1×1</SelectItem>
										<SelectItem value='medium'>Medium — 1×1</SelectItem>
										<SelectItem value='wide'>Wide — 2×1 (landscape)</SelectItem>
										<SelectItem value='tall'>Tall — 1×2 (portrait)</SelectItem>
										<SelectItem value='large'>Large — 2×2 (featured)</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='col-span-2 space-y-1'>
								<Label className='text-xs text-slate-500'>Description</Label>
								<Textarea
									{...register(`items.${index}.description`)}
									placeholder='Short caption…'
									className='h-16 resize-none text-sm'
								/>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

// ─── Form panel ──────────────────────────────────────────────────────────────

type GalleryFormPanelProps = {
	initialData: GalleryData;
	onChange?: (data: GalleryData) => void;
};

function GalleryFormPanel({ initialData, onChange }: GalleryFormPanelProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [activeTab, setActiveTab] = useState<'items' | 'categories'>('items');
	const [isMounted, setIsMounted] = useState(false);
	const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);

	useEffect(() => { setIsMounted(true); }, []);

	const form = useForm<GalleryFormData>({
		resolver: zodResolver(galleryDataSchema),
		defaultValues: initialData
	});

	const { control, register, watch, setValue } = form;

	const {
		fields: itemFields,
		append: appendItem,
		remove: removeItem,
		move: moveItem
	} = useFieldArray({ control, name: 'items' });

	const watchedCategories = watch('categories');
	const categories = useMemo(() => watchedCategories ?? [], [watchedCategories]);
	const categoryOptions = useMemo(
		() => categories.filter(c => c !== 'All'),
		[categories]
	);

	useEffect(() => {
		const subscription = form.watch(values => {
			const parsed = galleryDataSchema.safeParse(values);
			if (parsed.success) onChange?.(parsed.data);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => { form.reset(initialData); }, [form, initialData]);

	const handleDragEnd = (result: DropResult) => {
		if (result.destination) moveItem(result.source.index, result.destination.index);
	};

	async function onSubmit(data: GalleryFormData) {
		setIsSaving(true);
		try {
			await updateGallery(galleryDataSchema.parse(data));
			toast.success('Gallery saved');
		} catch (error) {
			console.error(error);
			toast.error('Failed to save gallery');
		} finally {
			setIsSaving(false);
		}
	}

	if (!isMounted) return null;

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='flex min-h-0 flex-1 flex-col overflow-hidden'>
			{/* Tab bar + save */}
			<div className='flex flex-shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-4 py-2'>
				<Tabs
					value={activeTab}
					onValueChange={v => setActiveTab(v as 'items' | 'categories')}
					className='flex-1'>
					<TabsList className='h-8 gap-0.5 bg-slate-100 p-0.5'>
						<TabsTrigger value='items' className='h-7 gap-1.5 px-3 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm'>
							Items
							<span className='rounded-full bg-slate-200 px-1.5 py-px text-[10px] font-semibold text-slate-600 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700'>
								{itemFields.length}
							</span>
						</TabsTrigger>
						<TabsTrigger value='categories' className='h-7 gap-1.5 px-3 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm'>
							Categories
							<span className='rounded-full bg-slate-200 px-1.5 py-px text-[10px] font-semibold text-slate-600'>
								{categoryOptions.length}
							</span>
						</TabsTrigger>
					</TabsList>
				</Tabs>
				<Button type='submit' disabled={isSaving} size='sm' className='h-8 shrink-0'>
					{isSaving ? <Loader2 className='mr-1.5 h-3.5 w-3.5 animate-spin' /> : <Save className='mr-1.5 h-3.5 w-3.5' />}
					Save
				</Button>
			</div>

			{/* Content */}
			<div className='min-h-0 flex-1 overflow-y-auto'>
				{activeTab === 'items' ? (
					<div className='p-4 space-y-3'>
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable droppableId='gallery-items'>
								{provided => (
									<div {...provided.droppableProps} ref={provided.innerRef} className='space-y-2'>
										{itemFields.map((field, index) => (
											<Draggable key={field.id} draggableId={field.id} index={index}>
												{dragProvided => (
													<GalleryItemRow
														key={field.id}
														index={index}
														field={field}
														register={register}
														watch={watch}
														setValue={setValue}
														categoryOptions={categoryOptions}
														categories={categories}
														removeItem={removeItem}
														dragProvided={dragProvided}
														defaultExpanded={index === lastAddedIndex}
													/>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>

						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => {
								setLastAddedIndex(itemFields.length);
								appendItem({
									id: `new-${Date.now()}`,
									src: '',
									mediaType: 'image',
									thumbnail: '',
									title: '',
									category: categoryOptions[0] || categories[0] || 'General',
									description: '',
									date: '',
									size: 'small'
								});
							}}
							className='w-full border-dashed text-slate-500 hover:text-slate-700'>
							<Plus className='mr-1.5 h-3.5 w-3.5' />
							Add Gallery Item
						</Button>
					</div>
				) : (
					<div className='p-4 space-y-2'>
						<p className='text-xs text-slate-400 mb-3'>
							Categories appear as filter tabs on the gallery page. Renaming a category here will also update all items using it.
						</p>
						{categories
							.filter(c => c !== 'All')
							.map((cat, idx) => {
								const realIdx = categories.indexOf(cat);
								return (
									<div key={idx} className='flex items-center gap-2'>
										<div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-500'>
											{idx + 1}
										</div>
										<Input
											{...register(`categories.${realIdx}`)}
											placeholder='Category name'
											className='h-8 text-sm'
										/>
										<button
											type='button'
											onClick={() => {
												const newCats = categories.filter((_, i) => i !== realIdx);
												setValue('categories', newCats);
											}}
											disabled={categories.filter(c => c !== 'All').length <= 1}
											className='flex-shrink-0 rounded-md p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 transition-colors'>
											<Trash2 className='h-4 w-4' />
										</button>
									</div>
								);
							})}
						<button
							type='button'
							onClick={() => setValue('categories', [...categories, 'New Category'])}
							className='mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-medium text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-colors'>
							<Plus className='h-3.5 w-3.5' />
							Add Category
						</button>
					</div>
				)}
			</div>
		</form>
	);
}

// ─── Main editor ─────────────────────────────────────────────────────────────

export default function GalleryEditor({ initialData }: { initialData: GalleryData }) {
	const [open, setOpen] = useState(false);
	const [previewData, setPreviewData] = useState<GalleryData>(initialData);
	const initial = useMemo(() => initialData, [initialData]);

	return (
		<div className='space-y-6'>
			{/* Trigger */}
			<div className='flex items-center justify-between'>
				<p className='text-sm text-slate-500'>
					{previewData.items.length} items across{' '}
					{previewData.categories.filter(c => c !== 'All').length} categories
				</p>
				<Button onClick={() => setOpen(true)} variant='default'>
					<Pencil className='mr-2 h-4 w-4' />
					Edit Gallery
				</Button>
			</div>

			{/* Preview */}
			<GalleryCollage
				items={previewData.items}
				categories={previewData.categories}
			/>

			{/* Full-screen dialog */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='flex h-[96vh] !w-[98vw] !max-w-[98vw] flex-col gap-0 overflow-hidden rounded-2xl border border-slate-200 p-0 shadow-2xl'>
					{/* Header */}
					<div className='flex flex-shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-6 py-3'>
						<div className='flex-1'>
							<DialogTitle className='text-sm font-semibold text-slate-800'>Gallery Editor</DialogTitle>
							<p className='text-[11px] text-slate-400 mt-0.5'>
								{previewData.items.length} items · {previewData.categories.filter(c => c !== 'All').length} categories
							</p>
						</div>
					</div>

					{/* Body */}
					<div className='flex min-h-0 flex-1 overflow-hidden'>
						{/* Left: Form */}
						<div className='flex w-[460px] flex-shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white'>
							<GalleryFormPanel
								initialData={initial}
								onChange={setPreviewData}
							/>
						</div>

						{/* Right: Live preview — skip hero to save space */}
						<div className='min-w-0 flex-1 overflow-y-auto bg-slate-50/80 p-5'>
							<p className='mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400'>
								Live Preview
							</p>
							<GalleryCollage
								items={previewData.items}
								categories={previewData.categories}
								visibleSections={['filters', 'grid']}
							/>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
