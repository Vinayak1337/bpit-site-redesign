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
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import {
	updateGrievanceCell,
	type GrievanceCellData
} from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: GrievanceCellData;
	onChange?: (data: GrievanceCellData) => void;
	visibleSections?: Array<'header' | 'contacts' | 'process'>;
}

export default function GrievanceForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);

	const form = useForm<GrievanceCellData>({
		defaultValues: initialData
	});

	const { fields: contactFields, append: appendContact, remove: removeContact } = useFieldArray({
		control: form.control,
		name: 'contactInfo'
	});

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
		control: form.control,
		name: 'processSteps'
	});

	useEffect(() => {
		const subscription = form.watch((values) => {
			onChange?.(values as GrievanceCellData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: GrievanceCellData) => {
		setMessage(null);
		startTransition(async () => {
			const result = await updateGrievanceCell('student-life-student-grievance-cell', values);
			if (!result.ok) {
				setMessage({
					type: 'error',
					text: result.error ?? 'Failed to save grievance data.'
				});
				return;
			}
			setMessage({ type: 'success', text: 'Saved successfully.' });
			setTimeout(() => setMessage(null), 3000);
		});
	};

	const showSection = (section: 'header' | 'contacts' | 'process') =>
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

                {/* Contact Info */}
				{showSection('contacts') && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<FormLabel className="text-base">Contact Information</FormLabel>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => appendContact({ title: 'New Contact', icon: 'Phone', details: [], sub: '' })}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Contact
						</Button>
					</div>

					<div className="grid gap-4">
						{contactFields.map((field, index) => (
							<Card key={field.id} className="bg-gray-50">
								<CardContent className="p-4 space-y-3">
									<div className="flex justify-between items-start">
										<span className="text-xs font-medium">Contact #{index + 1}</span>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-6 w-6 p-0 text-red-500"
											onClick={() => removeContact(index)}
										>
											<Trash2 className="w-3 h-3" />
										</Button>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<FormField
											control={form.control}
											name={`contactInfo.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormControl><Input placeholder="Title" {...field} className="bg-white" /></FormControl>
												</FormItem>
											)}
										/>
                                        <FormField
											control={form.control}
											name={`contactInfo.${index}.icon`}
											render={({ field }) => (
												<FormItem>
													<Select onValueChange={field.onChange} value={field.value ?? ''}>
														<FormControl>
															<SelectTrigger className="bg-white">
																<SelectValue placeholder="Select icon" />
															</SelectTrigger>
														</FormControl>
														<SelectContent className="max-h-60 overflow-y-auto">
															{SUPPORTED_ICON_NAMES.map(icon => (
																<SelectItem key={icon} value={icon}>{icon}</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`contactInfo.${index}.details`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Details (Comma separated)</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        className="bg-white" 
                                                        {...field} 
                                                        value={field.value?.join(', ') || ''}
                                                        onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`contactInfo.${index}.sub`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl><Input placeholder="Subtitle / Timing" {...field} className="bg-white" /></FormControl>
                                            </FormItem>
                                        )}
                                    />
								</CardContent>
							</Card>
						))}
					</div>
				</div>
				)}

                {/* Process Steps */}
                {showSection('process') && (
                <div className="space-y-4 pt-6 border-t">
					<div className="flex items-center justify-between">
						<FormLabel className="text-base">Process Steps</FormLabel>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => appendStep({ step: stepFields.length + 1, title: 'New Step', description: '' })}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Step
						</Button>
					</div>

					<div className="grid gap-4">
						{stepFields.map((field, index) => (
							<Card key={field.id} className="bg-gray-50">
								<CardContent className="p-4 space-y-3">
									<div className="flex justify-between items-start">
										<span className="text-xs font-medium">Step #{index + 1}</span>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-6 w-6 p-0 text-red-500"
											onClick={() => removeStep(index)}
										>
											<Trash2 className="w-3 h-3" />
										</Button>
									</div>

                                    <div className="flex gap-3">
                                        <div className="w-20">
                                            <FormField
                                                control={form.control}
                                                name={`processSteps.${index}.step`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                className="bg-white"
                                                                onChange={e => {
                                                                    const parsed = Number(e.target.value);
                                                                    field.onChange(Number.isFinite(parsed) ? parsed : 0);
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <FormField
                                                control={form.control}
                                                name={`processSteps.${index}.title`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl><Input placeholder="Title" {...field} className="bg-white" /></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`processSteps.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl><Textarea placeholder="Description" {...field} className="bg-white" rows={2} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
								</CardContent>
							</Card>
						))}
					</div>
				</div>
				)}
			</form>
		</Form>
	);
}
