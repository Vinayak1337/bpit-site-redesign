'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Loader2, Plus, Trash2, Save, FileText, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    updateMandatoryDisclosure
} from '@/app/(Private Pages)/actions/mandatory-disclosure';
import { DisclosureData, disclosureDataSchema } from '@/lib/schemas/mandatory-disclosure';

interface DisclosureEditorProps {
    initialData: DisclosureData;
}

export default function DisclosureEditor({ initialData }: DisclosureEditorProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<DisclosureData>({
        resolver: zodResolver(disclosureDataSchema),
        defaultValues: initialData
    });

    const { control, register, watch, setValue } = form;

    const {
        fields,
        append,
        remove,
        move
    } = useFieldArray({
        control,
        name: 'items'
    });

    // Extract unique categories for suggestions
    const items = watch('items');
    const existingCategories = Array.from(new Set(items.map(item => item.category).filter(Boolean))) as string[];

    async function onSubmit(data: DisclosureData) {
        setIsSaving(true);
        try {
            await updateMandatoryDisclosure(data);
            toast.success('Mandatory Disclosure updated successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update mandatory disclosure');
        } finally {
            setIsSaving(false);
        }
    }

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        move(result.source.index, result.destination.index);
    };

    if (!isMounted) {
        return null;
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

            <div className="space-y-6">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="disclosure-items">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4"
                            >
                                {fields.map((field, index) => (
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

                                                    <div className="flex-1 grid gap-4 md:grid-cols-3">
                                                        <div className="space-y-2">
                                                            <Label>Title</Label>
                                                            <Input
                                                                {...register(`items.${index}.title`)}
                                                                placeholder="Document Title"
                                                                className="h-9"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>URL / Link</Label>
                                                            <div className="flex gap-2">
                                                                <FileText className="w-4 h-4 text-gray-400 mt-2.5" />
                                                                <Input
                                                                    {...register(`items.${index}.url`)}
                                                                    placeholder="https://..."
                                                                    className="h-9"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Category</Label>
                                                            <div className="relative">
                                                                <Input
                                                                    {...register(`items.${index}.category`)}
                                                                    placeholder="e.g. Approvals"
                                                                    className="h-9"
                                                                    list={`categories-${index}`}
                                                                />
                                                                <datalist id={`categories-${index}`}>
                                                                    {existingCategories.map((cat) => (
                                                                        <option key={cat} value={cat} />
                                                                    ))}
                                                                </datalist>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => remove(index)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 self-start mt-6"
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
                    onClick={() => append({
                        id: `new-${Date.now()}`,
                        title: '',
                        url: '',
                        category: 'General'
                    })}
                    className="w-full border-dashed"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Document
                </Button>
            </div>
        </form>
    );
}
