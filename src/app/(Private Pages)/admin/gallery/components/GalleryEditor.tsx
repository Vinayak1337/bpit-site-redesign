'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Loader2, Plus, Trash2, Save, Image as ImageIcon, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
import {
	updateGallery
} from '@/app/(Private Pages)/actions/gallery';
import { galleryDataSchema, GalleryData } from '@/lib/schemas/gallery';

interface GalleryEditorProps {
	initialData: GalleryData;
}

export default function GalleryEditor({ initialData }: GalleryEditorProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [activeTab, setActiveTab] = useState('items');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

	const form = useForm<GalleryData>({
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

	const categories = watch('categories');

	async function onSubmit(data: GalleryData) {
		setIsSaving(true);
		try {
			await updateGallery(data);
			toast.success('Gallery updated successfully');
		} catch (error) {
			console.error(error);
			toast.error('Failed to update gallery');
		} finally {
			setIsSaving(false);
		}
	}

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        moveItem(result.source.index, result.destination.index);
    };

    if (!isMounted) {
        return null; // Or a loading skeleton
    }

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<div className="flex justify-end space-x-4">
				<Button type="submit" disabled={isSaving}>
					{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					<Save className="mr-2 h-4 w-4" />
					Save Changes
				</Button>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="grid w-full grid-cols-2 max-w-[400px]">
					<TabsTrigger value="items">Gallery Items</TabsTrigger>
					<TabsTrigger value="categories">Categories</TabsTrigger>
				</TabsList>

				<TabsContent value="items" className="space-y-6">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="gallery-items">
                            {(provided) => (
                                <div 
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef}
                                    className="space-y-4"
                                >
                                    {itemFields.map((field, index) => (
                                        <Draggable key={field.id} draggableId={field.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className="bg-white border rounded-lg shadow-sm"
                                                >
                                                    <div className="flex items-center p-4 gap-4">
                                                        <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600">
                                                            <GripVertical className="h-5 w-5" />
                                                        </div>
                                                        
                                                        <div className="flex-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                            {/* Image Preview & URL */}
                                                            <div className="space-y-2 row-span-2">
                                                                <Label>Image Source</Label>
                                                                <div className="flex gap-2">
                                                                    <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0 border">
                                                                        {watch(`items.${index}.src`) ? (
                                                                            // eslint-disable-next-line @next/next/no-img-element
                                                                            <img 
                                                                                src={watch(`items.${index}.src`)} 
                                                                                alt="Preview" 
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                                <ImageIcon className="h-8 w-8" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <Input 
                                                                        {...register(`items.${index}.src`)} 
                                                                        placeholder="Image URL"
                                                                        className="h-9"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Title</Label>
                                                                <Input {...register(`items.${index}.title`)} placeholder="Event Title" className="h-9" />
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Category</Label>
                                                                <Select
                                                                    onValueChange={(value) => setValue(`items.${index}.category`, value)}
                                                                    defaultValue={field.category}
                                                                >
                                                                    <SelectTrigger className="h-9">
                                                                        <SelectValue placeholder="Select Category" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {categories.map((cat) => (
                                                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Date</Label>
                                                                <Input {...register(`items.${index}.date`)} placeholder="e.g. 24 Nov 2022" className="h-9" />
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Size (Layout)</Label>
                                                                <Select
                                                                    onValueChange={(value: any) => setValue(`items.${index}.size`, value)}
                                                                    defaultValue={field.size || 'small'}
                                                                >
                                                                    <SelectTrigger className="h-9">
                                                                        <SelectValue placeholder="Select Size" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="small">Small (1x1)</SelectItem>
                                                                        <SelectItem value="medium">Medium (1x1)</SelectItem>
                                                                        <SelectItem value="large">Large (2x2)</SelectItem>
                                                                        <SelectItem value="wide">Wide (2x1)</SelectItem>
                                                                        <SelectItem value="tall">Tall (1x2)</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            
                                                            <div className="col-span-full">
                                                                <Label>Description</Label>
                                                                <Textarea 
                                                                    {...register(`items.${index}.description`)} 
                                                                    placeholder="Short description..." 
                                                                    className="h-16 resize-none" 
                                                                />
                                                            </div>
                                                        </div>

                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeItem(index)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 self-start"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

					<Button
						type="button"
						variant="outline"
						onClick={() => appendItem({
                            id: `new-${Date.now()}`,
                            src: '',
                            title: '',
                            category: categories[0] || 'All',
                            description: '',
                            date: '',
                            size: 'small'
                        })}
						className="w-full border-dashed"
					>
						<Plus className="mr-2 h-4 w-4" />
						Add Gallery Item
					</Button>
				</TabsContent>

				<TabsContent value="categories">
					<Card>
						<CardHeader>
							<CardTitle>Manage Categories</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4">
								{categories.map((cat, index) => (
									<div key={index} className="flex items-center gap-2">
										<Input
											{...register(`categories.${index}`)}
                                            placeholder="Category Name"
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => {
                                                const newCats = [...categories];
                                                newCats.splice(index, 1);
                                                setValue('categories', newCats);
                                            }}
                                            disabled={categories.length <= 1}
											className="text-red-500 hover:text-red-700"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>
							<Button
								type="button"
								variant="outline"
								onClick={() => {
                                    const newCats = [...categories, 'New Category'];
                                    setValue('categories', newCats);
                                }}
							>
								<Plus className="mr-2 h-4 w-4" />
								Add Category
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</form>
	);
}
