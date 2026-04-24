'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';
import { updatePlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import { Plus, Trash2 } from 'lucide-react';

const BG_COLOR_OPTIONS = [
	{ label: 'Blue/20', value: 'bg-blue-500/20' },
	{ label: 'Green/20', value: 'bg-green-500/20' },
	{ label: 'Purple/20', value: 'bg-purple-500/20' },
	{ label: 'Orange/20', value: 'bg-orange-500/20' },
	{ label: 'White/20', value: 'bg-white/20' },
	{ label: 'White/10', value: 'bg-white/10' },
	{ label: 'Indigo/20', value: 'bg-indigo-500/20' },
];

const TEXT_COLOR_OPTIONS = [
	'text-blue-100', 'text-white', 'text-green-100',
	'text-purple-100', 'text-orange-100', 'text-gray-100',
];

type ContactFormValue = {
	id: string;
	icon: string;
	title: string;
	value: string;
	iconColor: string;
	textColor: string;
};

type FormValues = {
	contactTitle: string;
	contactDescription: string;
	contactButtonText: string;
	contacts: ContactFormValue[];
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

const FALLBACK_ICON = 'GraduationCap';

const createEmptyContact = (): ContactFormValue => ({
	id: crypto.randomUUID(),
	icon: FALLBACK_ICON,
	title: '',
	value: '',
	iconColor: 'blue',
	textColor: 'black'
});

export default function ContactForm({ initialData, pageSlug, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm<FormValues>({
		defaultValues: {
			contactTitle: initialData.contactTitle || '',
			contactDescription: initialData.contactDescription || '',
			contactButtonText: initialData.contactButtonText || '',
			contacts: initialData.contacts.length > 0 ? initialData.contacts : [createEmptyContact()]
		}
	});

	const contactsArray = useFieldArray({
		control: form.control,
		name: 'contacts'
	});

	const iconOptions = SUPPORTED_ICON_NAMES;

	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: PlacementOverviewData = {
					...initialData,
					contactTitle: values.contactTitle || '',
					contactDescription: values.contactDescription || '',
					contactButtonText: values.contactButtonText || '',
					contacts: (values.contacts || [])
						.map(contact => ({
							icon: contact?.icon?.trim().length ? contact.icon.trim() : FALLBACK_ICON,
							title: (contact?.title ?? '').trim(),
							value: (contact?.value ?? '').trim(),
							iconColor: contact?.iconColor ?? 'blue',
							textColor: contact?.textColor ?? 'black'
						}))
						.filter(contact => contact.title.length > 0 && contact.value.length > 0)
				};
				onChange(updatedData);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, onChange, initialData]);

	const onSubmit = async (values: FormValues) => {
		setSaveStatus('saving');
		startTransition(async () => {
			try {
				const updatedData: PlacementOverviewData = {
					...initialData,
					contactTitle: values.contactTitle,
					contactDescription: values.contactDescription,
					contactButtonText: values.contactButtonText,
					contacts: values.contacts
						.map(contact => ({
							icon: contact.icon?.trim().length ? contact.icon.trim() : FALLBACK_ICON,
							title: (contact.title ?? '').trim(),
							value: (contact.value ?? '').trim(),
							iconColor: contact.iconColor ?? 'blue',
							textColor: contact.textColor ?? 'black'
						}))
						.filter(contact => contact.title.length > 0 && contact.value.length > 0)
				};

				await updatePlacementOverview(pageSlug, updatedData);
				setSaveStatus('saved');
				setTimeout(() => setSaveStatus('idle'), 2000);
			} catch (error) {
				console.error('Failed to save:', error);
				setSaveStatus('error');
				setTimeout(() => setSaveStatus('idle'), 3000);
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Contact Section Headers */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-slate-900">Contact Section</h3>
					
					<FormField
						control={form.control}
						name="contactTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contact Title</FormLabel>
								<FormControl>
									<Input placeholder="Get in Touch" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="contactDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contact Description</FormLabel>
								<FormControl>
									<Textarea 
										placeholder="Brief description for contact section"
										rows={3}
										{...field} 
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="contactButtonText"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Button Text</FormLabel>
								<FormControl>
									<Input placeholder="Contact Us Today" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Contacts */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => contactsArray.append(createEmptyContact())}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Contact
						</Button>
					</div>
					<div className="space-y-4">
						{contactsArray.fields.map((field, index) => (
							<div
								key={field.id}
								className="rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50/50"
							>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-slate-700">
										Contact {index + 1}
									</span>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => contactsArray.remove(index)}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={`contacts.${index}.title`}
										rules={{ required: 'Title is required' }}
										render={({ field: titleField }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder="Phone" {...titleField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`contacts.${index}.value`}
										rules={{ required: 'Value is required' }}
										render={({ field: valueField }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input placeholder="+91-123-456-7890" {...valueField} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`contacts.${index}.icon`}
										render={({ field: iconField }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
												<FormControl>
													<Select
														onValueChange={iconField.onChange}
														value={iconField.value}
													>
														<SelectTrigger>
															<SelectValue placeholder="Select icon" />
														</SelectTrigger>
														<SelectContent>
															{iconOptions.map(option => (
																<SelectItem key={option} value={option}>
																	{option}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`contacts.${index}.iconColor`}
										render={({ field: colorField }) => (
											<FormItem>
												<FormLabel>Icon Background Color</FormLabel>
												<Select onValueChange={colorField.onChange} value={colorField.value ?? ''}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select bg color' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{BG_COLOR_OPTIONS.map(opt => (
															<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`contacts.${index}.textColor`}
										render={({ field: textColorField }) => (
											<FormItem>
												<FormLabel>Text Color</FormLabel>
												<Select onValueChange={textColorField.onChange} value={textColorField.value ?? ''}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select text color' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{TEXT_COLOR_OPTIONS.map(c => (
															<SelectItem key={c} value={c}>{c}</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="flex items-center justify-between pt-6 border-t">
					<div>
						{saveStatus === 'saved' && (
							<p className="text-sm text-green-600">Changes saved successfully!</p>
						)}
						{saveStatus === 'error' && (
							<p className="text-sm text-red-600">Failed to save changes.</p>
						)}
					</div>
					<Button type="submit" disabled={isPending || saveStatus === 'saving'}>
						{saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
