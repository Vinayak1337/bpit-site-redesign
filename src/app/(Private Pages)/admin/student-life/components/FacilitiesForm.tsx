'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
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
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Save, Plus, Trash2, Image as ImageIcon, ChevronDown } from 'lucide-react';
import {
	updateCampusFacilities,
	type CampusFacilitiesData
} from '@/app/(Private Pages)/actions/student-life';
import UploadButton from '@/components/cloudinary/upload-button';

interface Props {
	initialData: CampusFacilitiesData;
	onChange?: (data: CampusFacilitiesData) => void;
	visibleSections?: Array<'header' | 'sections'>;
}

// Helper component for nested Items list
const FacilityItemsList = ({ nestIndex, control }: { nestIndex: number, control: Control<CampusFacilitiesData> }) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `sections.${nestIndex}.items`
	});

	return (
		<div className="space-y-4 mt-4">
			<div className="flex justify-between items-center">
				<h4 className="text-sm font-semibold">Facility Items</h4>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => append({ title: 'New Item', description: '', icon: 'Building2', image: '', features: [] })}
				>
					<Plus className="w-3 h-3 mr-1" /> Add Item
				</Button>
			</div>
			<div className="grid gap-4">
				{fields.map((item, k) => (
					<Card key={item.id} className="bg-gray-50">
						<CardContent className="p-4 space-y-3">
							<div className="flex justify-between">
								<span className="text-xs font-medium">Item #{k + 1}</span>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="h-6 w-6 p-0 text-red-500"
									onClick={() => remove(k)}
								>
									<Trash2 className="w-3 h-3" />
								</Button>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<FormField
									control={control}
									name={`sections.${nestIndex}.items.${k}.title`}
									render={({ field }) => (
										<FormItem>
											<FormControl><Input placeholder="Title" {...field} className="bg-white" /></FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name={`sections.${nestIndex}.items.${k}.icon`}
									render={({ field }) => (
										<FormItem>
											<FormControl><Input placeholder="Icon" {...field} className="bg-white" /></FormControl>
										</FormItem>
									)}
								/>
							</div>
                            <FormField
                                control={control}
                                name={`sections.${nestIndex}.items.${k}.image`}
                                render={({ field }) => (
                                    <FormItem>
										<FormLabel className='text-xs'>Image URL</FormLabel>
                                        <FormControl>
                                            <div className="space-y-2">
												<div className='flex gap-2'>
                                                <ImageIcon className="w-4 h-4 mt-3 text-gray-400" />
                                                <Input placeholder="Image URL" {...field} className="bg-white" />
												</div>
												<UploadButton
													onUpload={url => field.onChange(url)}
													buttonText='Upload Facility Image'
													className='w-full'
												/>
												{field.value ? (
													<div className='h-16 w-16 overflow-hidden rounded border'>
														<img
															src={field.value}
															alt='Facility preview'
															className='h-full w-full object-cover'
														/>
													</div>
												) : null}
											</div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
							<FormField
								control={control}
								name={`sections.${nestIndex}.items.${k}.description`}
								render={({ field }) => (
									<FormItem>
										<FormControl><Textarea placeholder="Description" {...field} className="bg-white" rows={2} /></FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name={`sections.${nestIndex}.items.${k}.features`}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-xs">Features (Comma separated)</FormLabel>
										<FormControl>
											<Input 
                                                placeholder="AC, Wi-Fi, Projector" 
                                                className="bg-white" 
                                                {...field} 
                                                value={field.value?.join(', ') || ''}
                                                onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                            />
										</FormControl>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default function FacilitiesForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);

	const form = useForm<CampusFacilitiesData>({
		defaultValues: initialData
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'sections'
	});

	useEffect(() => {
		const subscription = form.watch((values) => {
			onChange?.(values as CampusFacilitiesData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: CampusFacilitiesData) => {
		setMessage(null);
		startTransition(async () => {
			const result = await updateCampusFacilities('student-life-campus-facilities', values);
			if (!result.ok) {
				setMessage({ type: 'error', text: result.error ?? 'Failed to save facilities data.' });
				return;
			}
			setMessage({ type: 'success', text: 'Saved successfully.' });
			setTimeout(() => setMessage(null), 3000);
		});
	};

	const showSection = (section: 'header' | 'sections') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<div className="flex items-center justify-between sticky top-0 bg-white z-10 p-4 border-b -mx-4 -mt-4 mb-4 shadow-sm">
					<h3 className="font-semibold text-gray-900">Content</h3>
					<div className="flex items-center gap-4">
						{message && (
							<span
								className={`text-sm font-medium ${
									message.type === 'error' ? 'text-red-600' : 'text-green-600'
								}`}>
								{message.text}
							</span>
						)}
						<Button type="submit" disabled={isPending}>
							{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
							Save Changes
						</Button>
					</div>
				</div>

				{showSection('header') && (
					<>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Page Title</FormLabel>
									<FormControl><Input {...field} /></FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl><Textarea {...field} rows={3} /></FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}

				{showSection('sections') && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<FormLabel className="text-base">Facility Sections</FormLabel>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => append({ title: 'New Section', items: [] })}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Section
						</Button>
					</div>

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <details key={field.id} className="group border rounded-lg bg-white px-4 open:pb-4">
                                <summary className="flex items-center justify-between py-4 cursor-pointer list-none">
                                    <div className="flex items-center gap-2 font-medium">
                                        <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                                        <span>{form.watch(`sections.${index}.title`) || `Section #${index + 1}`}</span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Note: stopPropagation on summary might prevent details toggle, handled by separate button
                                            if(confirm('Are you sure?')) remove(index);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </summary>
                                <div className="space-y-4 pt-2 border-t mt-2">
                                    <FormField
                                        control={form.control}
                                        name={`sections.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Section Title</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FacilityItemsList nestIndex={index} control={form.control} />
                                </div>
                            </details>
                        ))}
                    </div>
				</div>
				)}
			</form>
		</Form>
	);
}
