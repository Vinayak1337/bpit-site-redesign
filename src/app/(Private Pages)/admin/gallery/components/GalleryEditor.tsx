'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Loader2,
	Plus,
	Trash2,
	Save,
	Image as ImageIcon,
	GripVertical,
	Film
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Editable from '@/components/ui/Editable';
import GalleryCollage from '@/components/gallery/GalleryCollage';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { updateGallery } from '@/app/(Private Pages)/actions/gallery';
import {
	galleryDataSchema,
	type GalleryData,
	type GalleryMediaType
} from '@/lib/schemas/gallery';

interface GalleryEditorProps {
	initialData: GalleryData;
}

type GalleryTab = 'items' | 'categories';
type GalleryItemSize = NonNullable<GalleryData['items'][number]['size']>;
type GalleryFormData = z.input<typeof galleryDataSchema>;

type GalleryFormPanelProps = {
	initialData: GalleryData;
	onChange?: (data: GalleryData) => void;
	visibleTabs?: GalleryTab[];
};

function GalleryFormPanel({
	initialData,
	onChange,
	visibleTabs
}: GalleryFormPanelProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);
	const [activeTab, setActiveTab] = useState<GalleryTab>('items');
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

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
	} = useFieldArray({
		control,
		name: 'items'
	});

	const watchedCategories = watch('categories');
	const categories = useMemo(
		() => watchedCategories ?? [],
		[watchedCategories]
	);
	const categoryOptions = useMemo(
		() => categories.filter(category => category !== 'All'),
		[categories]
	);

	useEffect(() => {
		const subscription = form.watch(values => {
			const parsed = galleryDataSchema.safeParse(values);
			if (parsed.success) {
				onChange?.(parsed.data);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		form.reset(initialData);
	}, [form, initialData]);

	useEffect(() => {
		if (!visibleTabs || visibleTabs.length === 0) return;
		if (!visibleTabs.includes(activeTab)) {
			setActiveTab(visibleTabs[0]);
		}
	}, [activeTab, visibleTabs]);

	const showTab = (tab: GalleryTab) => !visibleTabs || visibleTabs.includes(tab);

	async function onSubmit(data: GalleryFormData) {
		setMessage(null);
		setIsSaving(true);
		try {
			const parsedData = galleryDataSchema.parse(data);
			await updateGallery(parsedData);
			toast.success('Gallery updated successfully');
			setMessage({ type: 'success', text: 'Saved successfully.' });
		} catch (error) {
			console.error(error);
			toast.error('Failed to update gallery');
			setMessage({ type: 'error', text: 'Failed to save gallery changes.' });
		} finally {
			setIsSaving(false);
		}
	}

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		moveItem(result.source.index, result.destination.index);
	};

	if (!isMounted) {
		return null;
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
			<div className='sticky top-0 z-10 -mx-4 -mt-4 mb-2 border-b bg-white p-4 shadow-sm'>
				<div className='flex items-center justify-between gap-3'>
					{message ? (
						<span
							className={`text-sm font-medium ${
								message.type === 'error' ? 'text-red-600' : 'text-emerald-600'
							}`}>
							{message.text}
						</span>
					) : (
						<span className='text-sm text-slate-500'>Edit and save this section.</span>
					)}
					<Button type='submit' disabled={isSaving}>
						{isSaving ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Save className='mr-2 h-4 w-4' />}
						Save
					</Button>
				</div>
			</div>

			<Tabs value={activeTab} onValueChange={value => setActiveTab(value as GalleryTab)}>
				<TabsList className='grid w-full max-w-[400px] grid-cols-2'>
					{showTab('items') ? <TabsTrigger value='items'>Gallery Items</TabsTrigger> : null}
					{showTab('categories') ? <TabsTrigger value='categories'>Categories</TabsTrigger> : null}
				</TabsList>

				{showTab('items') ? (
					<TabsContent value='items' className='space-y-6'>
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable droppableId='gallery-items'>
								{provided => (
									<div {...provided.droppableProps} ref={provided.innerRef} className='space-y-4'>
										{itemFields.map((field, index) => {
											const currentSrc = watch(`items.${index}.src`) ?? '';
											const currentMediaType =
												(watch(`items.${index}.mediaType`) as GalleryMediaType | undefined) ??
												'image';
											const currentThumbnail = watch(`items.${index}.thumbnail`) ?? '';
											const selectedCategory =
												watch(`items.${index}.category`) || field.category || '';
											const selectedSize =
												(watch(`items.${index}.size`) as GalleryItemSize | undefined) ??
												(field.size || 'small');

											return (
												<Draggable key={field.id} draggableId={field.id} index={index}>
													{dragProvided => (
														<div
															ref={dragProvided.innerRef}
															{...dragProvided.draggableProps}
															className='rounded-lg border bg-white shadow-sm'>
															<div className='flex items-center gap-4 p-4'>
																<div
																	{...dragProvided.dragHandleProps}
																	className='cursor-move text-gray-400 hover:text-gray-600'>
																	<GripVertical className='h-5 w-5' />
																</div>

																<div className='grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
																	<div className='row-span-2 space-y-2'>
																		<Label>Media Source URL</Label>
																		<div className='flex gap-2'>
																			<div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border bg-gray-100'>
																				{currentSrc ? (
																					currentMediaType === 'video' ? (
																						<video
																							src={currentSrc}
																							className='h-full w-full object-cover'
																							muted
																							playsInline
																						/>
																					) : (
																						// eslint-disable-next-line @next/next/no-img-element
																						<img
																							src={currentSrc}
																							alt='Preview'
																							className='h-full w-full object-cover'
																						/>
																					)
																				) : (
																					<div className='flex h-full w-full items-center justify-center text-gray-400'>
																						{currentMediaType === 'video' ? (
																							<Film className='h-8 w-8' />
																						) : (
																							<ImageIcon className='h-8 w-8' />
																						)}
																					</div>
																				)}
																			</div>
																			<Input
																				{...register(`items.${index}.src`)}
																				placeholder={
																					currentMediaType === 'video'
																						? 'Video URL'
																						: 'Image URL'
																				}
																				className='h-9'
																			/>
																		</div>
																		<div className='flex flex-wrap gap-2'>
																			<CloudinaryUploadButton
																				buttonText='Upload Media'
																				resourceType={
																					currentMediaType === 'video'
																						? 'video'
																						: 'image'
																				}
																				onUpload={url =>
																					setValue(`items.${index}.src`, url, {
																						shouldDirty: true,
																						shouldTouch: true
																					})
																				}
																				onError={errorMessage =>
																					toast.error(errorMessage)
																				}
																			/>
																			<Button
																				type='button'
																				variant='outline'
																				size='sm'
																				onClick={() =>
																					setValue(`items.${index}.src`, '', {
																						shouldDirty: true,
																						shouldTouch: true
																					})
																				}>
																				Clear
																			</Button>
																		</div>
																	</div>

																	<div className='space-y-2'>
																		<Label>Title</Label>
																		<Input
																			{...register(`items.${index}.title`)}
																			placeholder='Event Title'
																			className='h-9'
																		/>
																	</div>

																	<div className='space-y-2'>
																		<Label>Media Type</Label>
																		<Select
																			onValueChange={value => {
																				setValue(
																					`items.${index}.mediaType`,
																					value as GalleryMediaType,
																					{
																						shouldDirty: true,
																						shouldTouch: true
																					}
																				);
																				if (value === 'image') {
																					setValue(`items.${index}.thumbnail`, '', {
																						shouldDirty: true,
																						shouldTouch: true
																					});
																				}
																			}}
																			value={currentMediaType}>
																			<SelectTrigger className='h-9'>
																				<SelectValue placeholder='Select Type' />
																			</SelectTrigger>
																			<SelectContent>
																				<SelectItem value='image'>Image</SelectItem>
																				<SelectItem value='video'>Video</SelectItem>
																			</SelectContent>
																		</Select>
																	</div>

																	<div className='space-y-2'>
																		<Label>Category</Label>
																		<Select
																			onValueChange={value =>
																				setValue(`items.${index}.category`, value, {
																					shouldDirty: true,
																					shouldTouch: true
																				})
																			}
																			value={selectedCategory}>
																			<SelectTrigger className='h-9'>
																				<SelectValue placeholder='Select Category' />
																			</SelectTrigger>
																			<SelectContent>
																				{(categoryOptions.length > 0
																					? categoryOptions
																					: categories
																				).map(cat => (
																					<SelectItem key={cat} value={cat}>
																						{cat}
																					</SelectItem>
																				))}
																			</SelectContent>
																		</Select>
																	</div>

																	<div className='space-y-2'>
																		<Label>Date</Label>
																		<Input
																			{...register(`items.${index}.date`)}
																			placeholder='e.g. 24 Nov 2022'
																			className='h-9'
																		/>
																	</div>

																	<div className='space-y-2'>
																		<Label>Size (Layout)</Label>
																		<Select
																			onValueChange={value =>
																				setValue(`items.${index}.size`, value as GalleryItemSize, {
																					shouldDirty: true,
																					shouldTouch: true
																				})
																			}
																			value={selectedSize}>
																			<SelectTrigger className='h-9'>
																				<SelectValue placeholder='Select Size' />
																			</SelectTrigger>
																			<SelectContent>
																				<SelectItem value='small'>Small (1x1)</SelectItem>
																				<SelectItem value='medium'>Medium (1x1)</SelectItem>
																				<SelectItem value='large'>Large (2x2)</SelectItem>
																				<SelectItem value='wide'>Wide (2x1)</SelectItem>
																				<SelectItem value='tall'>Tall (1x2)</SelectItem>
																			</SelectContent>
																		</Select>
																	</div>

																	{currentMediaType === 'video' ? (
																		<div className='col-span-full space-y-2'>
																			<Label>Video Thumbnail (Optional)</Label>
																			<Input
																				{...register(`items.${index}.thumbnail`)}
																				placeholder='Thumbnail image URL'
																				className='h-9'
																			/>
																			<div className='flex flex-wrap gap-2'>
																				<CloudinaryUploadButton
																					buttonText='Upload Thumbnail'
																					resourceType='image'
																					onUpload={url =>
																						setValue(`items.${index}.thumbnail`, url, {
																							shouldDirty: true,
																							shouldTouch: true
																						})
																					}
																					onError={errorMessage =>
																						toast.error(errorMessage)
																					}
																				/>
																				<Button
																					type='button'
																					variant='outline'
																					size='sm'
																					onClick={() =>
																						setValue(`items.${index}.thumbnail`, '', {
																							shouldDirty: true,
																							shouldTouch: true
																						})
																					}>
																					Clear
																				</Button>
																			</div>
																			{currentThumbnail ? (
																				<div className='relative h-28 w-44 overflow-hidden rounded border'>
																					{/* eslint-disable-next-line @next/next/no-img-element */}
																					<img
																						src={currentThumbnail}
																						alt='Thumbnail preview'
																						className='h-full w-full object-cover'
																					/>
																				</div>
																			) : null}
																		</div>
																	) : null}

																	<div className='col-span-full'>
																		<Label>Description</Label>
																		<Textarea
																			{...register(`items.${index}.description`)}
																			placeholder='Short description...'
																			className='h-16 resize-none'
																		/>
																	</div>
																</div>

																<Button
																	type='button'
																	variant='ghost'
																	size='icon'
																	onClick={() => removeItem(index)}
																	className='self-start text-red-500 hover:bg-red-50 hover:text-red-700'>
																	<Trash2 className='h-4 w-4' />
																</Button>
															</div>
														</div>
													)}
												</Draggable>
											);
										})}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>

						<Button
							type='button'
							variant='outline'
							onClick={() =>
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
								})
							}
							className='w-full border-dashed'>
							<Plus className='mr-2 h-4 w-4' />
							Add Gallery Item
						</Button>
					</TabsContent>
				) : null}

				{showTab('categories') ? (
					<TabsContent value='categories'>
						<Card>
							<CardHeader>
								<CardTitle>Manage Categories</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='grid gap-4'>
									{categories.map((cat, index) => (
										<div key={index} className='flex items-center gap-2'>
											<Input {...register(`categories.${index}`)} placeholder='Category Name' />
											<Button
												type='button'
												variant='ghost'
												size='icon'
												onClick={() => {
													const newCats = [...categories];
													newCats.splice(index, 1);
													setValue('categories', newCats);
												}}
												disabled={categories.length <= 1}
												className='text-red-500 hover:text-red-700'>
												<Trash2 className='h-4 w-4' />
											</Button>
										</div>
									))}
								</div>
								<Button
									type='button'
									variant='outline'
									onClick={() => {
										const newCats = [...categories, 'New Category'];
										setValue('categories', newCats);
									}}>
									<Plus className='mr-2 h-4 w-4' />
									Add Category
								</Button>
							</CardContent>
						</Card>
					</TabsContent>
				) : null}
			</Tabs>
		</form>
	);
}

export default function GalleryEditor({ initialData }: GalleryEditorProps) {
	const [previewData, setPreviewData] = useState<GalleryData>(initialData);

	const initial = useMemo(() => initialData, [initialData]);

	return (
		<div className='space-y-8'>
			<Editable
				label='Gallery Filters'
				formContent={
					<GalleryFormPanel
						initialData={initial}
						onChange={setPreviewData}
						visibleTabs={['categories']}
					/>
				}>
				<div className='rounded-xl border bg-white p-4'>
					<GalleryCollage
						items={previewData.items}
						categories={previewData.categories}
						visibleSections={['filters']}
					/>
				</div>
			</Editable>

			<Editable
				label='Gallery Collage'
				formContent={
					<GalleryFormPanel
						initialData={initial}
						onChange={setPreviewData}
						visibleTabs={['items']}
					/>
				}>
				<div className='rounded-xl border bg-white p-4'>
					<GalleryCollage
						items={previewData.items}
						categories={previewData.categories}
						visibleSections={['grid']}
					/>
				</div>
			</Editable>
		</div>
	);
}
