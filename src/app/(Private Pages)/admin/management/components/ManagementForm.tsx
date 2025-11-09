'use client';

import React, { useCallback, useTransition, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import type { ManagementData } from '@/app/(Private Pages)/actions/management';
import { updateManagement } from '@/app/(Private Pages)/actions/management';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import UploadButton from '@/components/cloudinary/upload-button';

// Available color options for styling
const COLOR_OPTIONS = ['blue', 'green', 'purple', 'orange', 'red', 'indigo', 'gray', 'teal', 'pink'];

// Form schema matching the Management data structure
const formSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	titleIcon: z.string().optional(),
	titleIconColor: z.string().optional(),
	titleGradient: z.string().optional(),
	leaders: z.array(z.object({
		id: z.string(),
		name: z.string().min(1, 'Name is required'),
		position: z.string().min(1, 'Position is required'),
		description: z.array(z.string().min(1, 'Description item is required')),
		delay: z.number().min(0).max(2),
		image: z.string().optional(),
		iconColor: z.string().optional(),
		bgColor: z.string().optional()
	})).min(1, 'At least one leader is required'),
	vision: z.object({
		title: z.string().min(1, 'Vision title is required'),
		quote: z.string().min(1, 'Vision quote is required'),
		delay: z.number().min(0).max(2),
		icon: z.string().optional(),
		iconColor: z.string().optional(),
		bgColor: z.string().optional()
	})
});

type FormValues = z.infer<typeof formSchema>;

interface ManagementFormProps {
	initialData: ManagementData;
	pageSlug: string;
	onChange?: (data: ManagementData) => void;
}

export default function ManagementForm({ initialData, pageSlug, onChange }: ManagementFormProps) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const { fields: leaderFields, append: appendLeader, remove: removeLeader } = useFieldArray({
		control: form.control,
		name: 'leaders'
	});

	const handleDataChange = useCallback((values: FormValues) => {
		onChange?.(values);
	}, [onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		startTransition(async () => {
			try {
				const result = await updateManagement(values, pageSlug);
				if (result.success) {
					setMessage('Saved');
				} else {
					setMessage('Save failed');
				}
			} catch (error) {
				console.error('Error updating management data:', error);
				setMessage('Save failed');
			}
		});
	};

	// Call handleDataChange when form values change
	React.useEffect(() => {
		const subscription = form.watch((value) => {
			if (value && typeof handleDataChange === 'function') {
				handleDataChange(value as FormValues);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, handleDataChange]);

	// Reset form when initialData changes (for proper data updates)
	React.useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	return (
		<Form {...form}>
			<form
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-[70vh] overflow-y-auto overflow-x-hidden'
				onSubmit={form.handleSubmit(handleSubmit)}>
				
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-slate-900'>
							Management Page
						</h3>
						<p className='text-sm text-slate-500'>
							Edit leadership team, styling, and vision content.
						</p>
					</div>
					<div className='flex items-center gap-2'>
						{message && (
							<span className='rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700'>
								{message}
							</span>
						)}
						<Button type='submit' disabled={isPending}>
							{isPending ? 'Saving...' : 'Save changes'}
						</Button>
					</div>
				</div>

				{/* Title Section */}
				<Card>
					<CardHeader>
						<CardTitle>Page Title & Hero Section</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Page Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Management Team" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="titleIcon"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title Icon</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select an icon" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{SUPPORTED_ICON_NAMES.map((icon) => (
													<SelectItem key={icon} value={icon}>
														{icon}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="titleIconColor"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Icon Color</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select icon color" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{COLOR_OPTIONS.map((color) => (
													<SelectItem key={color} value={`bg-${color}-600`}>
														bg-{color}-600
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="titleGradient"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Background Gradient</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select gradient" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{COLOR_OPTIONS.map((color) => (
													<SelectItem key={color} value={`from-${color}-50 to-${color}-100`}>
														from-{color}-50 to-{color}-100
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Leaders Section */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							Leadership Team
							<Button
								type="button"
								variant="outline"
								size="sm"
							onClick={() => appendLeader({
								id: Date.now().toString(),
								name: 'New Leader',
								position: 'Position',
								description: ['Leadership description'],
								delay: 0.2,
								image: '',
								iconColor: 'text-blue-600',
								bgColor: 'bg-blue-50'
							})}
							>
								<Plus className="w-4 h-4 mr-1" />
								Add Leader
							</Button>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{leaderFields.map((field, index) => (
							<Card key={field.id} className="border-gray-200">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg flex items-center justify-between">
										Leader {index + 1}
										{leaderFields.length > 1 && (
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => removeLeader(index)}
											>
												<Trash2 className="w-4 h-4" />
											</Button>
										)}
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`leaders.${index}.name`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input {...field} placeholder="Leader name" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`leaders.${index}.position`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Position</FormLabel>
													<FormControl>
														<Input {...field} placeholder="Chairman, Director, etc." />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* Image Upload Section */}
									<FormField
										control={form.control}
										name={`leaders.${index}.image`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Profile Image</FormLabel>
												<FormControl>
													<div className="space-y-2">
														<Input {...field} placeholder="Image URL" />
														<UploadButton
															onUpload={(url) => field.onChange(url)}
															className="w-full"
															buttonText="Upload Profile Image"
														/>
														{field.value && (
															<div className="mt-2">
																<img 
																	src={field.value} 
																	alt="Profile preview" 
																	className="w-20 h-20 rounded-lg object-cover"
																/>
															</div>
														)}
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Color Options */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`leaders.${index}.iconColor`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Icon/Text Color</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select color" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{COLOR_OPTIONS.map((color) => (
																<SelectItem key={color} value={`text-${color}-600`}>
																	text-{color}-600
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`leaders.${index}.bgColor`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Background Color</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select background" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{COLOR_OPTIONS.map((color) => (
																<SelectItem key={color} value={`bg-${color}-50`}>
																	bg-{color}-50
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									
									<FormField
										control={form.control}
										name={`leaders.${index}.delay`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Animation Delay (seconds)</FormLabel>
												<FormControl>
													<Input 
														{...field} 
														type="number" 
														step="0.1" 
														min="0" 
														max="2"
														onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div>
										<FormLabel>Description Paragraphs</FormLabel>
										<div className="space-y-2 mt-2">
											{form.watch(`leaders.${index}.description`).map((_, itemIndex) => (
												<div key={itemIndex} className="flex items-center space-x-2">
													<FormField
														control={form.control}
														name={`leaders.${index}.description.${itemIndex}`}
														render={({ field }) => (
															<FormItem className="flex-1">
																<FormControl>
																	<Textarea {...field} placeholder="Description paragraph" rows={3} />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													{form.watch(`leaders.${index}.description`).length > 1 && (
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={() => {
																const currentDescription = form.getValues(`leaders.${index}.description`);
																const newDescription = currentDescription.filter((_, i) => i !== itemIndex);
																form.setValue(`leaders.${index}.description`, newDescription);
															}}
														>
															<Trash2 className="w-4 h-4" />
														</Button>
													)}
												</div>
											))}
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => {
													const currentDescription = form.getValues(`leaders.${index}.description`);
													form.setValue(`leaders.${index}.description`, [...currentDescription, '']);
												}}
											>
												<Plus className="w-4 h-4 mr-1" />
												Add Paragraph
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</CardContent>
				</Card>

				{/* Vision Section */}
				<Card>
					<CardHeader>
						<CardTitle>Leadership Vision</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="vision.title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vision Title</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Our Leadership Vision" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Vision Icon and Color Selection */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<FormField
								control={form.control}
								name="vision.icon"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Vision Icon</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select icon" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{SUPPORTED_ICON_NAMES.map((icon) => (
													<SelectItem key={icon} value={icon}>
														{icon}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="vision.iconColor"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Icon Color</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select color" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{COLOR_OPTIONS.map((color) => (
													<SelectItem key={color} value={`text-${color}-600`}>
														text-{color}-600
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="vision.bgColor"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Background Color</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select background" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{COLOR_OPTIONS.map((color) => (
													<SelectItem key={color} value={`bg-${color}-50`}>
														bg-{color}-50
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						
						<FormField
							control={form.control}
							name="vision.quote"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vision Quote</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Vision statement" rows={4} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="vision.delay"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Animation Delay (seconds)</FormLabel>
									<FormControl>
										<Input 
											{...field} 
											type="number" 
											step="0.1" 
											min="0" 
											max="2"
											onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}