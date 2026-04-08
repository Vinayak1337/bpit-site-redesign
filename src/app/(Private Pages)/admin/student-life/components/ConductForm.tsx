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
import { Loader2, Save, Plus, Trash2, ChevronDown } from 'lucide-react';
import {
	updateCodeOfConduct,
	type CodeOfConductData
} from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: CodeOfConductData;
	onChange?: (data: CodeOfConductData) => void;
	visibleSections?: Array<'header' | 'rules' | 'note'>;
}

export default function ConductForm({
	initialData,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);

	const form = useForm<CodeOfConductData>({
		defaultValues: initialData
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'sections'
	});

	useEffect(() => {
		const subscription = form.watch((values) => {
			onChange?.(values as CodeOfConductData);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: CodeOfConductData) => {
		setMessage(null);
		startTransition(async () => {
			const result = await updateCodeOfConduct('student-life-code-of-conduct', values);
			if (!result.ok) {
				setMessage({ type: 'error', text: result.error ?? 'Failed to save conduct data.' });
				return;
			}
			setMessage({ type: 'success', text: 'Saved successfully.' });
			setTimeout(() => setMessage(null), 3000);
		});
	};

	const showSection = (section: 'header' | 'rules' | 'note') =>
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

				{showSection('rules') && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<FormLabel className="text-base">Rule Sections</FormLabel>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => append({ category: 'New Category', icon: 'BookOpen', rules: [] })}
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
                                        <span>{form.watch(`sections.${index}.category`) || `Section #${index + 1}`}</span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if(confirm('Are you sure?')) remove(index);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </summary>
                                <div className="space-y-4 pt-2 border-t mt-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`sections.${index}.category`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category Name</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`sections.${index}.icon`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Icon</FormLabel>
                                                    <FormControl><Input {...field} placeholder="e.g. Shield, BookOpen" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    
                                    <FormField
                                        control={form.control}
                                        name={`sections.${index}.rules`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Rules (One per line)</FormLabel>
                                                <FormControl>
                                                    <Textarea 
                                                        rows={5}
                                                        {...field} 
                                                        value={field.value?.join('\n') || ''}
                                                        onChange={(e) => field.onChange(e.target.value.split('\n').filter(Boolean))}
                                                        placeholder="Enter each rule on a new line..."
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </details>
                        ))}
                    </div>
				</div>
				)}

				{showSection('note') ? (
					<div className='rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800'>
						Note card content is static and does not require additional fields.
					</div>
				) : null}
			</form>
		</Form>
	);
}
