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
import {
	updateStudentLifeOverview,
	type StudentLifeOverviewData
} from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: StudentLifeOverviewData;
	onChange?: (data: StudentLifeOverviewData) => void;
	visibleSections?: Array<'header' | 'highlights'>;
}

export default function OverviewForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);

	const form = useForm<StudentLifeOverviewData>({
		defaultValues: initialData
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'highlights'
	});

	useEffect(() => {
		const subscription = form.watch((values) => {
			onChange?.(values as StudentLifeOverviewData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: StudentLifeOverviewData) => {
		setMessage(null);
		startTransition(async () => {
			const result = await updateStudentLifeOverview('student-life', values);
			if (!result.ok) {
				setMessage({ type: 'error', text: result.error ?? 'Failed to save overview.' });
				return;
			}
			setMessage({ type: 'success', text: 'Saved successfully.' });
			setTimeout(() => setMessage(null), 3000);
		});
	};

	const showSection = (section: 'header' | 'highlights') =>
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
									<FormLabel>Main Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Introduction Description</FormLabel>
									<FormControl>
										<Textarea {...field} rows={4} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}

				{showSection('highlights') && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<FormLabel className="text-base">Highlight Cards</FormLabel>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => append({ title: '', description: '', icon: 'Building2', href: '/student-life/' })}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Card
						</Button>
					</div>

					<div className="grid gap-4">
						{fields.map((field, index) => (
							<Card key={field.id}>
								<CardContent className="p-4 space-y-4">
									<div className="flex justify-between items-start">
										<span className="text-sm font-medium text-gray-500">Card #{index + 1}</span>
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
											name={`highlights.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-xs">Title</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
                                        <FormField
											control={form.control}
											name={`highlights.${index}.icon`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-xs">Icon Name (Lucide)</FormLabel>
													<FormControl>
														<Input {...field} placeholder="e.g. Building2, Users" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`highlights.${index}.href`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Link Href</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
									<FormField
										control={form.control}
										name={`highlights.${index}.description`}
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
