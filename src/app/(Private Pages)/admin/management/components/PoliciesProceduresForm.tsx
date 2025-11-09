'use client';

import React, { useState, useTransition, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';
import type { PoliciesProceduresData } from '@/app/(Private Pages)/actions/management';
import { updatePoliciesProcedures } from '@/app/(Private Pages)/actions/management';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';

const COLOR_OPTIONS = ['blue', 'green', 'purple', 'orange', 'red', 'indigo', 'gray', 'teal', 'pink'];

const GRADIENT_OPTIONS = [
	{ value: 'from-blue-50 to-blue-100', label: 'Blue Gradient' },
	{ value: 'from-green-50 to-green-100', label: 'Green Gradient' },
	{ value: 'from-purple-50 to-purple-100', label: 'Purple Gradient' },
	{ value: 'from-orange-50 to-orange-100', label: 'Orange Gradient' },
	{ value: 'from-red-50 to-red-100', label: 'Red Gradient' },
	{ value: 'from-indigo-50 to-indigo-100', label: 'Indigo Gradient' },
	{ value: 'from-gray-50 to-gray-100', label: 'Gray Gradient' },
	{ value: 'from-teal-50 to-teal-100', label: 'Teal Gradient' },
	{ value: 'from-pink-50 to-pink-100', label: 'Pink Gradient' }
];

const formSchema = z.object({
	hero: z.object({
		icon: z.string().min(1, 'Hero icon is required'),
		title: z.string().min(1, 'Hero title is required'),
		subtitle: z.string().min(1, 'Hero subtitle is required'),
		gradient: z.string().min(1, 'Hero gradient is required'),
		iconColor: z.string().min(1, 'Hero icon color is required'),
		textColor: z.string().min(1, 'Hero text color is required')
	}),
	policyCategories: z.array(z.object({
		id: z.string().min(1, 'Category ID is required'),
		title: z.string().min(1, 'Category title is required'),
		icon: z.string().min(1, 'Category icon is required'),
		iconColor: z.string().min(1, 'Category icon color is required'),
		bulletColor: z.string().min(1, 'Category bullet color is required'),
		policies: z.array(z.string().min(1, 'Policy name is required')).min(1, 'At least one policy is required')
	})).min(1, 'At least one policy category is required'),
	implementationFramework: z.object({
		title: z.string().min(1, 'Framework title is required'),
		steps: z.array(z.object({
			id: z.string().min(1, 'Step ID is required'),
			title: z.string().min(1, 'Step title is required'),
			description: z.string().min(1, 'Step description is required'),
			icon: z.string().min(1, 'Step icon is required'),
			iconColor: z.string().min(1, 'Step icon color is required'),
			iconTextColor: z.string().min(1, 'Step icon text color is required')
		})).min(1, 'At least one step is required')
	})
});

type FormValues = z.infer<typeof formSchema>;

// Normalize form values to PoliciesProceduresData
const normalizePoliciesProcedures = (values: any): PoliciesProceduresData => {
	return {
		hero: {
			title: (values?.hero?.title ?? '').trim(),
			subtitle: (values?.hero?.subtitle ?? '').trim(),
			icon: (values?.hero?.icon ?? '').trim(),
			gradient: (values?.hero?.gradient ?? '').trim(),
			iconColor: (values?.hero?.iconColor ?? '').trim(),
			textColor: (values?.hero?.textColor ?? '').trim()
		},
		policyCategories: (values?.policyCategories ?? []).map((category: any) => ({
			id: (category?.id ?? '').trim(),
			title: (category?.title ?? '').trim(),
			icon: (category?.icon ?? '').trim(),
			iconColor: (category?.iconColor ?? '').trim(),
			bulletColor: (category?.bulletColor ?? '').trim(),
			policies: (category?.policies ?? []).map((policy: any) => (policy ?? '').trim()).filter(Boolean)
		})),
		implementationFramework: {
			title: (values?.implementationFramework?.title ?? '').trim(),
			steps: (values?.implementationFramework?.steps ?? []).map((step: any) => ({
				id: (step?.id ?? '').trim(),
				title: (step?.title ?? '').trim(),
				description: (step?.description ?? '').trim(),
				icon: (step?.icon ?? '').trim(),
				iconColor: (step?.iconColor ?? '').trim(),
				iconTextColor: (step?.iconTextColor ?? '').trim()
			}))
		}
	};
};

interface PoliciesProceduresFormProps {
	initialData: PoliciesProceduresData;
	pageSlug: string;
	onChange?: (data: PoliciesProceduresData) => void;
}

export default function PoliciesProceduresForm({ initialData, pageSlug, onChange }: PoliciesProceduresFormProps) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
		control: form.control,
		name: 'policyCategories'
	});

	const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
		control: form.control,
		name: 'implementationFramework.steps'
	});

	const handleDataChange = useCallback((values: FormValues) => {
		onChange?.(normalizePoliciesProcedures(values));
	}, [onChange]);

	const onSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizePoliciesProcedures(values);
		
		startTransition(async () => {
			try {
				await updatePoliciesProcedures(payload, pageSlug);
				setMessage('Policies & procedures updated successfully!');
				setTimeout(() => setMessage(null), 3000);
			} catch (error) {
				console.error('Error updating policies procedures data:', error);
				setMessage('Save failed');
			}
		});
	};

	useEffect(() => {
		onChange?.(normalizePoliciesProcedures(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(normalizePoliciesProcedures(values));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	return (
		<div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
			{/* Header with Save Button */}
			<div className="flex items-center justify-between border-b pb-4">
				<h3 className="text-lg font-semibold text-gray-800">Edit Policies & Procedures</h3>
				<div className="flex items-center gap-3">
					{message && (
						<Badge variant={message.includes('successfully') ? 'default' : 'destructive'}>
							{message}
						</Badge>
					)}
					<Button 
						onClick={form.handleSubmit(onSubmit)}
						disabled={isPending}
						size="sm"
					>
						{isPending ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					{/* Hero Section */}
					<Card>
						<CardHeader>
							<CardTitle>Hero Section</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6 p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="hero.title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Hero Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Policies & Procedures" />
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
											<FormLabel>Hero Subtitle</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Framework for Institutional Excellence" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Hero Icon and Colors Row */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="hero.icon"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Hero Icon</FormLabel>
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
									name="hero.gradient"
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
													{GRADIENT_OPTIONS.map((gradient) => (
														<SelectItem key={gradient.value} value={gradient.value}>
															{gradient.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Hero Color Options Row */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="hero.iconColor"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon Background Color</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select color" />
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
									name="hero.textColor"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Text Color</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select text color" />
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
							</div>
						</CardContent>
					</Card>

					{/* Policy Categories */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								Policy Categories
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => appendCategory({
										id: `category-${Date.now()}`,
										title: 'New Category',
										icon: 'BookOpen',
										iconColor: 'text-blue-600',
										bulletColor: 'bg-blue-600',
										policies: ['Policy 1', 'Policy 2']
									})}
								>
									<Plus className="w-4 h-4 mr-2" />
									Add Category
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-8 p-6">
							{categoryFields.map((category, categoryIndex) => (
								<CategoryFieldGroup 
									key={category.id} 
									form={form} 
									categoryIndex={categoryIndex} 
									removeCategory={removeCategory}
									canRemove={categoryFields.length > 1}
								/>
							))}
						</CardContent>
					</Card>

					{/* Implementation Framework */}
					<Card>
						<CardHeader>
							<CardTitle>Implementation Framework</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6 p-6">
							<FormField
								control={form.control}
								name="implementationFramework.title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Framework Title</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Policy Implementation Framework" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h4 className="text-sm font-medium">Framework Steps</h4>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => appendStep({
											id: `step-${Date.now()}`,
											title: 'New Step',
											description: 'Step description',
											icon: 'Eye',
											iconColor: 'bg-blue-100',
											iconTextColor: 'text-blue-600'
										})}
									>
										<Plus className="w-4 h-4 mr-2" />
										Add Step
									</Button>
								</div>

								{stepFields.map((step, stepIndex) => (
									<StepFieldGroup 
										key={step.id} 
										form={form} 
										stepIndex={stepIndex} 
										removeStep={removeStep}
										canRemove={stepFields.length > 1}
									/>
								))}
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	);
}

// Category field group component
function CategoryFieldGroup({ form, categoryIndex, removeCategory, canRemove }: any) {
	const { fields: policyFields, append: appendPolicy, remove: removePolicy } = useFieldArray({
		control: form.control,
		name: `policyCategories.${categoryIndex}.policies`
	});

	return (
		<Card className="border border-gray-200 shadow-sm">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
				<CardTitle className="text-base font-medium">
					Category {categoryIndex + 1}
				</CardTitle>
				{canRemove && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => removeCategory(categoryIndex)}
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				)}
			</CardHeader>
			<CardContent className="space-y-6 p-6">
				{/* Category Basic Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name={`policyCategories.${categoryIndex}.id`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category ID</FormLabel>
								<FormControl>
									<Input {...field} placeholder="academic-policies" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`policyCategories.${categoryIndex}.title`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Academic Policies" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Category Icon and Colors */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name={`policyCategories.${categoryIndex}.icon`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category Icon</FormLabel>
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
						name={`policyCategories.${categoryIndex}.iconColor`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Icon Color</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Icon color" />
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
				</div>
				
				{/* Bullet Color in separate row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name={`policyCategories.${categoryIndex}.bulletColor`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bullet Color</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Bullet color" />
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
				</div>

				{/* Category Policies */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h5 className="text-sm font-medium text-gray-700">Policies</h5>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => appendPolicy('New policy')}
						>
							<Plus className="w-4 h-4 mr-1" />
							Add Policy
						</Button>
					</div>

					<div className="space-y-3">
						{policyFields.map((policy, policyIndex) => (
							<div key={policy.id} className="flex items-center gap-3">
								<FormField
									control={form.control}
									name={`policyCategories.${categoryIndex}.policies.${policyIndex}`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input {...field} placeholder="Policy name" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{policyFields.length > 1 && (
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => removePolicy(policyIndex)}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								)}
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

// Step field group component
function StepFieldGroup({ form, stepIndex, removeStep, canRemove }: any) {
	return (
		<Card className="border border-gray-100">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm">Step {stepIndex + 1}</CardTitle>
				{canRemove && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => removeStep(stepIndex)}
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				)}
			</CardHeader>
			<CardContent className="space-y-4 p-4">
				{/* Step Basic Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name={`implementationFramework.steps.${stepIndex}.id`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Step ID</FormLabel>
								<FormControl>
									<Input {...field} placeholder="review" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`implementationFramework.steps.${stepIndex}.title`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Step Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Review" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name={`implementationFramework.steps.${stepIndex}.description`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Step Description</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder="Step description" rows={2} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Step Icon and Colors */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name={`implementationFramework.steps.${stepIndex}.icon`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Step Icon</FormLabel>
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
						name={`implementationFramework.steps.${stepIndex}.iconColor`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Icon Color</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Icon color" />
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
				</div>
				
				{/* Icon Text Color in separate row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name={`implementationFramework.steps.${stepIndex}.iconTextColor`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Icon Text Color</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Text color" />
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
				</div>
			</CardContent>
		</Card>
	);
}