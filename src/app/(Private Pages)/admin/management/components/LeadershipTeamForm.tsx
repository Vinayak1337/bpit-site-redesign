'use client';

import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';
import type { LeadershipTeamData } from '@/app/(Private Pages)/actions/management';
import { updateLeadershipTeam } from '@/app/(Private Pages)/actions/management';
import { SUPPORTED_ICON_NAMES } from '@/components/about/icons';
import UploadButton from '@/components/cloudinary/upload-button';

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
	leaders: z.array(z.object({
		id: z.string().min(1, 'Leader ID is required'),
		name: z.string().min(1, 'Name is required'),
		position: z.string().min(1, 'Position is required'),
		image: z.string().optional(),
		icon: z.string().optional(),
		iconColor: z.string().optional(),
		iconTextColor: z.string().optional(),
		textColor: z.string().min(1, 'Text color is required'),
		details: z.array(z.object({
			icon: z.string().min(1, 'Detail icon is required'),
			text: z.string().min(1, 'Detail text is required')
		})).min(1, 'At least one detail is required'),
		description: z.string().min(1, 'Description is required')
	})).min(1, 'At least one leader is required')
});

type FormValues = z.infer<typeof formSchema>;

// Normalize form values to LeadershipTeamData
const normalizeLeadershipTeam = (values: any): LeadershipTeamData => {
	return {
		hero: {
			title: (values?.hero?.title ?? '').trim(),
			subtitle: (values?.hero?.subtitle ?? '').trim(),
			icon: (values?.hero?.icon ?? '').trim(),
			gradient: (values?.hero?.gradient ?? '').trim(),
			iconColor: (values?.hero?.iconColor ?? '').trim(),
			textColor: (values?.hero?.textColor ?? '').trim()
		},
		leaders: (values?.leaders ?? []).map((leader: any) => ({
			id: (leader?.id ?? '').trim(),
			name: (leader?.name ?? '').trim(),
			position: (leader?.position ?? '').trim(),
			image: (leader?.image ?? '').trim(),
			description: (leader?.description ?? '').trim(),
			icon: (leader?.icon ?? '').trim(),
			iconColor: (leader?.iconColor ?? '').trim(),
			iconTextColor: (leader?.iconTextColor ?? '').trim(),
			textColor: (leader?.textColor ?? '').trim(),
			details: (leader?.details ?? []).map((detail: any) => ({
				icon: (detail?.icon ?? '').trim(),
				text: (detail?.text ?? '').trim()
			}))
		}))
	};
};

interface LeadershipTeamFormProps {
	initialData: LeadershipTeamData;
	pageSlug: string;
	onChange?: (data: LeadershipTeamData) => void;
	visibleSections?: Array<'hero' | 'leaders'>;
}

export default function LeadershipTeamForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: LeadershipTeamFormProps) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const { fields: leaderFields, append: appendLeader, remove: removeLeader } = useFieldArray({
		control: form.control,
		name: 'leaders'
	});

	useEffect(() => {
		onChange?.(normalizeLeadershipTeam(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(normalizeLeadershipTeam(values));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	const onSubmit = (values: FormValues) => {
		startTransition(async () => {
			try {
				await updateLeadershipTeam(normalizeLeadershipTeam(values), pageSlug);
				setMessage({ type: 'success', text: 'Leadership team saved successfully.' });
				setTimeout(() => setMessage(null), 3000);
			} catch (error) {
				console.error('Error updating leadership team data:', error);
				setMessage({ type: 'error', text: 'Failed to save leadership team.' });
				setTimeout(() => setMessage(null), 3000);
			}
		});
	};

	const showSection = (section: 'hero' | 'leaders') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<div className="space-y-6">
			{/* Header with Save Button */}
			<div className="flex items-center justify-between border-b pb-4">
				<h3 className="text-lg font-semibold text-gray-800">Edit Leadership Team</h3>
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
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="hero.title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Hero Title</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Our Leadership Team" />
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
												<Input {...field} placeholder="Experienced Leaders Driving Excellence" />
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

						{/* Leaders Section */}
						{showSection('leaders') && (
						<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								Leaders
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => appendLeader({
										id: `leader-${Date.now()}`,
										name: '',
										position: '',
										image: '',
										icon: 'User',
										iconColor: 'bg-blue-100',
										iconTextColor: 'text-blue-600',
										textColor: 'text-blue-600',
										details: [{ icon: 'GraduationCap', text: '' }],
										description: ''
									})}
								>
									<Plus className="w-4 h-4 mr-2" />
									Add Leader
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-8">
							{leaderFields.map((leader, index) => (
								<Card key={leader.id} className="border border-gray-200 shadow-sm">
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
										<CardTitle className="text-base font-medium">
											Leader {index + 1}
										</CardTitle>
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
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<FormField
												control={form.control}
												name={`leaders.${index}.name`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Name</FormLabel>
														<FormControl>
															<Input {...field} placeholder="Dr. [Name]" />
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
															<Input {...field} placeholder="Principal, Dean, etc." />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={form.control}
											name={`leaders.${index}.image`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Avatar Image</FormLabel>
													<FormControl>
														<div className='space-y-2'>
															<Input {...field} placeholder='Image URL' />
															<UploadButton
																onUpload={url => field.onChange(url)}
																buttonText='Upload Avatar'
																className='w-full'
															/>
															{field.value ? (
																<div className='h-16 w-16 overflow-hidden rounded-full border'>
																	<img
																		src={field.value}
																		alt='Avatar preview'
																		className='h-full w-full object-cover'
																	/>
																</div>
															) : null}
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<FormField
												control={form.control}
												name={`leaders.${index}.textColor`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Position Text Color</FormLabel>
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder='Select text color' />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{COLOR_OPTIONS.map(color => (
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

										<FormField
											control={form.control}
											name={`leaders.${index}.description`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea {...field} placeholder="Leader description" rows={3} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Details Section */}
										<div className="space-y-4">
											<FormLabel>Details</FormLabel>
											{form.watch(`leaders.${index}.details`).map((_, detailIndex) => (
												<div key={detailIndex} className="flex items-center space-x-2">
													<FormField
														control={form.control}
														name={`leaders.${index}.details.${detailIndex}.icon`}
														render={({ field }) => (
															<FormItem className="flex-none w-32">
																<Select onValueChange={field.onChange} defaultValue={field.value}>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue placeholder="Icon" />
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
														name={`leaders.${index}.details.${detailIndex}.text`}
														render={({ field }) => (
															<FormItem className="flex-1">
																<FormControl>
																	<Input {...field} placeholder="Detail text" />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													{form.watch(`leaders.${index}.details`).length > 1 && (
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={() => {
																const currentDetails = form.getValues(`leaders.${index}.details`);
																const newDetails = currentDetails.filter((_, i) => i !== detailIndex);
																form.setValue(`leaders.${index}.details`, newDetails);
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
													const currentDetails = form.getValues(`leaders.${index}.details`);
													form.setValue(`leaders.${index}.details`, [...currentDetails, { icon: 'GraduationCap', text: '' }]);
												}}
											>
												<Plus className="w-4 h-4 mr-2" />
												Add Detail
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</CardContent>
						</Card>
						)}
					</form>
				</Form>
			</div>
	);
}
