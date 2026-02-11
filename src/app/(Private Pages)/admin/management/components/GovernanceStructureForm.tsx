'use client';

import React, { useState, useTransition, useEffect } from 'react';
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
import type { GovernanceStructureData } from '@/app/(Private Pages)/actions/management';
import { updateGovernanceStructure } from '@/app/(Private Pages)/actions/management';
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
	sections: z.array(z.object({
		id: z.string().min(1, 'Section ID is required'),
		title: z.string().min(1, 'Section title is required'),
		icon: z.string().min(1, 'Section icon is required'),
		iconColor: z.string().min(1, 'Section icon color is required'),
		description: z.string().min(1, 'Section description is required'),
		cards: z.array(z.object({
			title: z.string().min(1, 'Card title is required'),
			bgColor: z.string().min(1, 'Card background color is required'),
			textColor: z.string().min(1, 'Card text color is required'),
			listColor: z.string().min(1, 'Card list color is required'),
			items: z.array(z.string().min(1, 'Item text is required')).min(1, 'At least one item is required')
		})).min(1, 'At least one card is required')
	})).min(1, 'At least one section is required')
});

type FormValues = z.infer<typeof formSchema>;

// Normalize form values to GovernanceStructureData
const normalizeGovernanceStructure = (values: any): GovernanceStructureData => {
	return {
		hero: {
			title: (values?.hero?.title ?? '').trim(),
			subtitle: (values?.hero?.subtitle ?? '').trim(),
			icon: (values?.hero?.icon ?? '').trim(),
			gradient: (values?.hero?.gradient ?? '').trim(),
			iconColor: (values?.hero?.iconColor ?? '').trim(),
			textColor: (values?.hero?.textColor ?? '').trim()
		},
		sections: (values?.sections ?? []).map((section: any) => ({
			id: (section?.id ?? '').trim(),
			title: (section?.title ?? '').trim(),
			icon: (section?.icon ?? '').trim(),
			iconColor: (section?.iconColor ?? '').trim(),
			description: (section?.description ?? '').trim(),
			cards: (section?.cards ?? []).map((card: any) => ({
				title: (card?.title ?? '').trim(),
				bgColor: (card?.bgColor ?? '').trim(),
				textColor: (card?.textColor ?? '').trim(),
				listColor: (card?.listColor ?? '').trim(),
				items: (card?.items ?? []).map((item: any) => (item ?? '').trim()).filter(Boolean)
			}))
		}))
	};
};

interface GovernanceStructureFormProps {
	initialData: GovernanceStructureData;
	pageSlug: string;
	onChange?: (data: GovernanceStructureData) => void;
	visibleSections?: Array<'hero' | 'sections'>;
}

export default function GovernanceStructureForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: GovernanceStructureFormProps) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);
	
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
		control: form.control,
		name: 'sections'
	});

	const onSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalizeGovernanceStructure(values);
		
		startTransition(async () => {
				try {
					await updateGovernanceStructure(payload, pageSlug);
					setMessage({
						type: 'success',
						text: 'Governance structure saved successfully.'
					});
					setTimeout(() => setMessage(null), 3000);
				} catch (error) {
					console.error('Error updating governance structure data:', error);
					setMessage({ type: 'error', text: 'Failed to save governance structure.' });
				}
			});
		};

	const showSection = (section: 'hero' | 'sections') =>
		!visibleSections || visibleSections.includes(section);

	useEffect(() => {
		onChange?.(normalizeGovernanceStructure(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(normalizeGovernanceStructure(values));
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
				<h3 className="text-lg font-semibold text-gray-800">Edit Governance Structure</h3>
					<div className="flex items-center gap-3">
						{message && (
							<Badge variant={message.type === 'success' ? 'default' : 'destructive'}>
								{message.text}
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
						{showSection('hero') && (
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
												<Input {...field} placeholder="Governance Structure" />
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
												<Input {...field} placeholder="Organizational Framework for Excellence" />
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
						)}

						{/* Sections */}
						{showSection('sections') && (
						<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								Sections
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => appendSection({
										id: `section-${Date.now()}`,
										title: 'New Section',
										icon: 'Building2',
										iconColor: 'text-blue-600',
										description: 'Section description',
										cards: [
											{
												title: 'New Card',
												bgColor: 'bg-blue-50',
												textColor: 'text-blue-800',
												listColor: 'text-blue-700',
												items: ['Item 1', 'Item 2']
											}
										]
									})}
								>
									<Plus className="w-4 h-4 mr-2" />
									Add Section
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-8 p-6">
							{sectionFields.map((section, sectionIndex) => (
								<SectionFieldGroup 
									key={section.id} 
									form={form} 
									sectionIndex={sectionIndex} 
									removeSection={removeSection}
									canRemove={sectionFields.length > 1}
								/>
							))}
						</CardContent>
						</Card>
						)}
					</form>
				</Form>
		</div>
	);
}

// Separate component for section fields to manage cards
function SectionFieldGroup({ form, sectionIndex, removeSection, canRemove }: any) {
	const { fields: cardFields, append: appendCard, remove: removeCard } = useFieldArray({
		control: form.control,
		name: `sections.${sectionIndex}.cards`
	});

	return (
		<Card className="border border-gray-200 shadow-sm">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
				<CardTitle className="text-base font-medium">
					Section {sectionIndex + 1}
				</CardTitle>
				{canRemove && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => removeSection(sectionIndex)}
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				)}
			</CardHeader>
			<CardContent className="space-y-6 p-6">
				{/* Section Basic Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name={`sections.${sectionIndex}.id`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section ID</FormLabel>
								<FormControl>
									<Input {...field} placeholder="board-of-governors" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`sections.${sectionIndex}.title`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Board of Governors" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Section Icon and Icon Color */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name={`sections.${sectionIndex}.icon`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Section Icon</FormLabel>
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
						name={`sections.${sectionIndex}.iconColor`}
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
				</div>

				{/* Section Description */}
				<FormField
					control={form.control}
					name={`sections.${sectionIndex}.description`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Section Description</FormLabel>
							<FormControl>
								<Textarea {...field} placeholder="Section description" rows={3} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Cards */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h4 className="text-sm font-medium">Cards</h4>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => appendCard({
								title: 'New Card',
								bgColor: 'bg-blue-50',
								textColor: 'text-blue-800',
								listColor: 'text-blue-700',
								items: ['Item 1', 'Item 2']
							})}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Card
						</Button>
					</div>

					{cardFields.map((card, cardIndex) => (
						<CardFieldGroup 
							key={card.id} 
							form={form} 
							sectionIndex={sectionIndex} 
							cardIndex={cardIndex} 
							removeCard={removeCard}
							canRemove={cardFields.length > 1}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

// Separate component for card fields to manage items
function CardFieldGroup({ form, sectionIndex, cardIndex, removeCard, canRemove }: any) {
	const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
		control: form.control,
		name: `sections.${sectionIndex}.cards.${cardIndex}.items`
	});

	return (
		<Card className="border border-gray-100">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm">Card {cardIndex + 1}</CardTitle>
				{canRemove && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => removeCard(cardIndex)}
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				)}
			</CardHeader>
			<CardContent className="space-y-4 p-4">
				{/* Card Title */}
				<FormField
					control={form.control}
					name={`sections.${sectionIndex}.cards.${cardIndex}.title`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Card Title</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Key Responsibilities" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Card Colors */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name={`sections.${sectionIndex}.cards.${cardIndex}.bgColor`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background Color</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Background" />
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
					<FormField
						control={form.control}
						name={`sections.${sectionIndex}.cards.${cardIndex}.textColor`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Text Color</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Text color" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{COLOR_OPTIONS.map((color) => (
											<SelectItem key={color} value={`text-${color}-800`}>
												text-{color}-800
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				
				{/* List Color in separate row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name={`sections.${sectionIndex}.cards.${cardIndex}.listColor`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>List Color</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="List color" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{COLOR_OPTIONS.map((color) => (
											<SelectItem key={color} value={`text-${color}-700`}>
												text-{color}-700
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Card Items */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h5 className="text-sm font-medium text-gray-700">Items</h5>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => appendItem('New item')}
						>
							<Plus className="w-4 h-4 mr-1" />
							Add Item
						</Button>
					</div>

					<div className="space-y-3">
						{itemFields.map((item, itemIndex) => (
							<div key={item.id} className="flex items-center gap-3">
								<FormField
									control={form.control}
								name={`sections.${sectionIndex}.cards.${cardIndex}.items.${itemIndex}`}
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Input {...field} placeholder="List item" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{itemFields.length > 1 && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeItem(itemIndex)}
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
