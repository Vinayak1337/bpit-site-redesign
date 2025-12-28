'use client';

import { useState, useCallback, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	QualityPolicyData,
	updateQualityPolicy
} from '@/app/(Private Pages)/actions/vision-mission';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import { z } from 'zod';

// Available color options for styling
const COLOR_OPTIONS = ['blue', 'green', 'purple', 'orange', 'red', 'indigo'];

const GRADIENT_OPTIONS = [
	'from-blue-50 to-blue-100',
	'from-green-50 to-green-100',
	'from-purple-50 to-purple-100',
	'from-orange-50 to-orange-100',
	'from-red-50 to-red-100',
	'from-indigo-50 to-indigo-100',
	'from-gray-50 to-gray-100'
];

const BORDER_COLOR_OPTIONS = [
	'border-blue-500',
	'border-green-500',
	'border-purple-500',
	'border-orange-500',
	'border-red-500',
	'border-indigo-500',
	'border-gray-500'
];

// Form schema matching the original Quality Policy data structure
const formSchema = z.object({
	hero: z.object({
		title: z.string().min(1, 'Title is required'),
		subtitle: z.string().min(1, 'Subtitle is required'),
		icon: z.string().min(1, 'Icon is required'),
		gradient: z.string().min(1, 'Gradient is required'),
		borderColor: z.string().min(1, 'Border color is required'),
		iconBg: z.string().min(1, 'Icon background is required')
	}),
	policyStatement: z.object({
		title: z.string().min(1, 'Title is required'),
		icon: z.string().min(1, 'Icon is required'),
		gradient: z.string().min(1, 'Gradient is required'),
		borderColor: z.string().min(1, 'Border color is required'),
		quote: z.string().min(1, 'Quote is required')
	}),
	commitments: z.array(z.object({
		icon: z.string().min(1, 'Icon is required'),
		title: z.string().min(1, 'Title is required'),
		description: z.array(z.string().min(1, 'Description item is required')).min(1, 'At least one description item is required'),
		iconColor: z.string().min(1, 'Icon color is required'),
		bgColor: z.string().min(1, 'Background color is required')
	})).min(1, 'At least one commitment is required'),
	framework: z.object({
		title: z.string().min(1, 'Title is required'),
		icon: z.string().min(1, 'Icon is required'),
		gradient: z.string().min(1, 'Gradient is required'),
		steps: z.array(z.object({
			icon: z.string().min(1, 'Icon is required'),
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			iconColor: z.string().min(1, 'Icon color is required'),
			bgColor: z.string().min(1, 'Background color is required')
		})).min(1, 'At least one step is required')
	}),
	assuranceBodies: z.object({
		title: z.string().min(1, 'Title is required'),
		items: z.array(z.object({
			icon: z.string().min(1, 'Icon is required'),
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			iconBg: z.string().min(1, 'Icon background is required'),
			gradient: z.string().min(1, 'Gradient is required')
		})).min(1, 'At least one assurance body is required')
	})
});

type FormValues = z.infer<typeof formSchema>;

interface QualityPolicyFormProps {
	initialData: QualityPolicyData;
	pageSlug: string;
	onChange: (data: QualityPolicyData) => void;
}

export default function QualityPolicyForm({ initialData, pageSlug, onChange }: QualityPolicyFormProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const {
		fields: commitmentFields,
		append: appendCommitment,
		remove: removeCommitment
	} = useFieldArray({
		control: form.control,
		name: 'commitments'
	});

	const {
		fields: stepFields,
		append: appendStep,
		remove: removeStep
	} = useFieldArray({
		control: form.control,
		name: 'framework.steps'
	});

	const {
		fields: assuranceBodyFields,
		append: appendAssuranceBody,
		remove: removeAssuranceBody
	} = useFieldArray({
		control: form.control,
		name: 'assuranceBodies.items'
	});

	// Initialize preview with initial data
	useEffect(() => {
		onChange(initialData);
	}, [initialData, onChange]);

	// Only call onChange on submit or major changes, not on every form change
	const handleFormChange = useCallback(() => {
		// Only update preview when form is valid and has meaningful changes
		const formValues = form.getValues();
		if (formValues && Object.keys(formValues).length > 0) {
			onChange(formValues as QualityPolicyData);
		}
	}, [form, onChange]);

	// Handle form submission
	const onSubmit = async (data: FormValues) => {
		setIsSaving(true);
		setMessage(null);
		
		try {
			await updateQualityPolicy(pageSlug, data);
			setMessage({ type: 'success', text: 'Quality Policy updated successfully!' });
			// Update preview after successful save
			handleFormChange();
		} catch (error) {
			console.error('Error saving quality policy:', error);
			setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' });
		} finally {
			setIsSaving(false);
		}
	};

	const addCommitmentItem = (commitmentIndex: number) => {
		const currentCommitments = form.getValues(`commitments.${commitmentIndex}.description`);
		form.setValue(`commitments.${commitmentIndex}.description`, [...currentCommitments, '']);
	};

	const removeCommitmentItem = (commitmentIndex: number, itemIndex: number) => {
		const currentCommitments = form.getValues(`commitments.${commitmentIndex}.description`);
		const newCommitments = currentCommitments.filter((_, index) => index !== itemIndex);
		form.setValue(`commitments.${commitmentIndex}.description`, newCommitments);
	};

	return (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="flex flex-col space-y-4 pb-6 border-b border-gray-200">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">Edit Quality Policy</h2>
					<p className="text-sm text-gray-600 mt-1">
						Update quality policy content including hero section, policy statement, commitments, framework, and assurance bodies
					</p>
				</div>
				
				<div className="flex items-center space-x-4">
					<Button
						onClick={form.handleSubmit(onSubmit)}
						disabled={isSaving}
						className="bg-blue-600 hover:bg-blue-700"
					>
						{isSaving ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
								Saving...
							</>
						) : (
							<>
								<Check className="w-4 h-4 mr-2" />
								Save Changes
							</>
						)}
					</Button>

					{message && (
						<Alert className={`max-w-md ${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
							<AlertCircle className={`h-4 w-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`} />
							<AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
								{message.text}
							</AlertDescription>
						</Alert>
					)}
				</div>
			</div>

			<Form {...form}>
				<form className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Hero Section */}
						<Card>
							<CardHeader>
								<CardTitle>Hero Section</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField
									control={form.control}
									name="hero.title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Quality Policy" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="hero.subtitle"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subtitle</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Commitment to Excellence" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="hero.icon"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select an icon" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{SUPPORTED_ICON_NAMES.map((iconName) => (
														<SelectItem key={iconName} value={iconName}>
															{iconName}
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
									name="hero.gradient"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Gradient</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select gradient" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{GRADIENT_OPTIONS.map((gradient) => (
														<SelectItem key={gradient} value={gradient}>
															{gradient}
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
									name="hero.borderColor"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Border Color</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select border color" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{BORDER_COLOR_OPTIONS.map((borderColor) => (
														<SelectItem key={borderColor} value={borderColor}>
															{borderColor}
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
									name="hero.iconBg"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon Background</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select icon background" />
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
							</CardContent>
						</Card>

						{/* Policy Statement */}
						<Card>
							<CardHeader>
								<CardTitle>Policy Statement</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField
									control={form.control}
									name="policyStatement.title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Quality Policy Statement" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="policyStatement.quote"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Statement</FormLabel>
											<FormControl>
												<Textarea 
													{...field} 
													placeholder="Enter quality policy statement"
													rows={4}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					</div>

					{/* Commitments Section */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								Commitments
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => appendCommitment({
										icon: 'Star',
										title: 'New Commitment',
										description: ['New commitment description'],
										iconColor: 'text-blue-600',
										bgColor: 'bg-blue-100'
									})}
								>
									<Plus className="w-4 h-4 mr-1" />
									Add Commitment
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{commitmentFields.map((field, index) => (
								<Card key={field.id} className="border-gray-200">
									<CardHeader className="pb-3">
										<CardTitle className="text-lg flex items-center justify-between">
											Commitment {index + 1}
											{commitmentFields.length > 1 && (
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => removeCommitment(index)}
												>
													<Trash2 className="w-4 h-4" />
												</Button>
											)}
										</CardTitle>
									</CardHeader>
									<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`commitments.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input {...field} placeholder="Commitment title" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`commitments.${index}.icon`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
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
										<FormField
											control={form.control}
											name={`commitments.${index}.iconColor`}
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
											name={`commitments.${index}.bgColor`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Background Color</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select background color" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{COLOR_OPTIONS.map((color) => (
																<SelectItem key={color} value={`bg-${color}-100`}>
																	bg-{color}-100
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="md:col-span-2">
											<FormLabel>Description Items</FormLabel>
											<div className="space-y-2 mt-2">
												{form.watch(`commitments.${index}.description`).map((_, itemIndex) => (
													<div key={itemIndex} className="flex items-center space-x-2">
														<FormField
															control={form.control}
															name={`commitments.${index}.description.${itemIndex}`}
															render={({ field }) => (
																<FormItem className="flex-1">
																	<FormControl>
																		<Input {...field} placeholder="Description item" />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														{form.watch(`commitments.${index}.description`).length > 1 && (
															<Button
																type="button"
																variant="outline"
																size="sm"
																onClick={() => removeCommitmentItem(index, itemIndex)}
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
													onClick={() => addCommitmentItem(index)}
												>
													<Plus className="w-4 h-4 mr-1" />
													Add Item
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</CardContent>
					</Card>

					{/* Framework Section */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								Framework
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => appendStep({
										icon: 'Target',
										title: 'New Step',
										description: 'New step description',
										iconColor: 'text-blue-600',
										bgColor: 'bg-blue-50'
									})}
								>
									<Plus className="w-4 h-4 mr-1" />
									Add Step
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="framework.title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Framework Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Quality Management Framework" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="framework.icon"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Framework Icon</FormLabel>
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
							
							{stepFields.map((field, index) => (
								<Card key={field.id} className="border-gray-200">
									<CardHeader className="pb-3">
										<CardTitle className="text-lg flex items-center justify-between">
											Step {index + 1}
											{stepFields.length > 1 && (
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => removeStep(index)}
												>
													<Trash2 className="w-4 h-4" />
												</Button>
											)}
										</CardTitle>
									</CardHeader>
									<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`framework.steps.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input {...field} placeholder="Step title" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`framework.steps.${index}.icon`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
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
										<FormField
											control={form.control}
											name={`framework.steps.${index}.iconColor`}
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
											name={`framework.steps.${index}.bgColor`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Background Color</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select background color" />
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
										<div className="md:col-span-2">
											<FormField
												control={form.control}
												name={`framework.steps.${index}.description`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Description</FormLabel>
														<FormControl>
															<Textarea {...field} placeholder="Step description" />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</CardContent>
								</Card>
							))}
						</CardContent>
					</Card>

					{/* Assurance Bodies Section */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								Assurance Bodies
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => appendAssuranceBody({
										icon: 'Award',
										title: 'New Body',
										description: 'New assurance body description',
										iconBg: 'bg-blue-600',
										gradient: 'from-blue-50 to-blue-100'
									})}
								>
									<Plus className="w-4 h-4 mr-1" />
									Add Body
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="assuranceBodies.title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Section Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Quality Assurance Bodies" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							
							{assuranceBodyFields.map((field, index) => (
								<Card key={field.id} className="border-gray-200">
									<CardHeader className="pb-3">
										<CardTitle className="text-lg flex items-center justify-between">
											Body {index + 1}
											{assuranceBodyFields.length > 1 && (
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => removeAssuranceBody(index)}
												>
													<Trash2 className="w-4 h-4" />
												</Button>
											)}
										</CardTitle>
									</CardHeader>
									<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`assuranceBodies.items.${index}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input {...field} placeholder="Body title" />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`assuranceBodies.items.${index}.icon`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Icon</FormLabel>
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
										<FormField
											control={form.control}
											name={`assuranceBodies.items.${index}.iconBg`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Icon Background</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select icon background" />
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
											name={`assuranceBodies.items.${index}.gradient`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Gradient</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select gradient" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{GRADIENT_OPTIONS.map((gradient) => (
																<SelectItem key={gradient} value={gradient}>
																	{gradient}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="md:col-span-2">
											<FormField
												control={form.control}
												name={`assuranceBodies.items.${index}.description`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Description</FormLabel>
														<FormControl>
															<Textarea {...field} placeholder="Body description" />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</CardContent>
								</Card>
							))}
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	);
}