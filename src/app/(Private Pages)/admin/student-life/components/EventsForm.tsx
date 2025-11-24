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
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import {
	updateEventsFestivals,
	type EventsFestivalsData
} from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: EventsFestivalsData;
	onChange?: (data: EventsFestivalsData) => void;
}

export default function EventsForm({ initialData, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<EventsFestivalsData>({
		defaultValues: initialData
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'events'
	});

	useEffect(() => {
		const subscription = form.watch((values) => {
			// @ts-ignore
			onChange?.(values as EventsFestivalsData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: EventsFestivalsData) => {
		setMessage(null);
		startTransition(async () => {
			const result = await updateEventsFestivals('student-life-events-and-festivals', values);
			if (!result.ok) {
				setMessage('Save failed');
				return;
			}
			setMessage('Saved successfully!');
            setTimeout(() => setMessage(null), 3000);
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<div className="flex items-center justify-between sticky top-0 bg-white z-10 p-4 border-b -mx-4 -mt-4 mb-4 shadow-sm">
					<h3 className="font-semibold text-gray-900">Content</h3>
					<div className="flex items-center gap-4">
						{message && (
							<span className={`text-sm font-medium ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
								{message}
							</span>
						)}
						<Button type="submit" disabled={isPending}>
							{isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
							Save Changes
						</Button>
					</div>
				</div>

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

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<FormLabel className="text-base">Events</FormLabel>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => append({ title: 'New Event', type: 'Cultural', description: '', icon: 'Calendar', month: 'January', highlights: [], image: '' })}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Event
						</Button>
					</div>

					<div className="grid gap-4">
						{fields.map((field, index) => (
							<Card key={field.id}>
								<CardContent className="p-4 space-y-4">
									<div className="flex justify-between items-start">
										<span className="text-sm font-medium text-gray-500">Event #{index + 1}</span>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="text-red-500 hover:text-red-700 hover:bg-red-50"
											onClick={() => remove(index)}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`events.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-xs">Title</FormLabel>
													<FormControl><Input {...field} /></FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
                                        <FormField
											control={form.control}
											name={`events.${index}.type`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-xs">Type</FormLabel>
													<FormControl><Input {...field} placeholder="Cultural, Technical" /></FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
                                        <FormField
											control={form.control}
											name={`events.${index}.icon`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-xs">Icon</FormLabel>
													<FormControl><Input {...field} placeholder="Calendar, Trophy" /></FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
                                        <FormField
											control={form.control}
											name={`events.${index}.month`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-xs">Month/Date</FormLabel>
													<FormControl><Input {...field} placeholder="February" /></FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`events.${index}.image`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Image URL</FormLabel>
                                                <FormControl>
                                                    <div className="flex gap-2">
                                                        <ImageIcon className="w-4 h-4 mt-3 text-gray-400" />
                                                        <Input {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
									<FormField
										control={form.control}
										name={`events.${index}.description`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs">Description</FormLabel>
												<FormControl>
													<Textarea {...field} rows={2} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
                                    <FormField
                                        control={form.control}
                                        name={`events.${index}.highlights`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Highlights (Comma separated)</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field} 
                                                        value={field.value?.join(', ') || ''}
                                                        onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</form>
		</Form>
	);
}

