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
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';
import { updatePlacementOverview } from '@/app/(Private Pages)/actions/placement-overview';
import { Plus, Trash2 } from 'lucide-react';

type FeatureItem = { value: string };
type ObjectiveItem = { value: string };

type FormValues = {
	missionTitle: string;
	missionDescription: string;
	missionContent: {
		paragraph1: string;
		paragraph2: string;
		features: FeatureItem[];
		objectives: ObjectiveItem[];
	};
};

type Props = {
	initialData: PlacementOverviewData;
	pageSlug: string;
	onChange?: (data: PlacementOverviewData) => void;
};

export default function MissionForm({ initialData, pageSlug, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

	const form = useForm<FormValues>({
		defaultValues: {
			missionTitle: initialData.missionTitle || '',
			missionDescription: initialData.missionDescription || '',
			missionContent: {
				paragraph1: initialData.missionContent?.paragraph1 || '',
				paragraph2: initialData.missionContent?.paragraph2 || '',
				features: (initialData.missionContent?.features || ['']).map(f => ({ value: f })),
				objectives: (initialData.missionContent?.objectives || ['']).map(o => ({ value: o }))
			}
		}
	});

	const featuresArray = useFieldArray({
		control: form.control,
		name: 'missionContent.features'
	});

	const objectivesArray = useFieldArray({
		control: form.control,
		name: 'missionContent.objectives'
	});

	useEffect(() => {
		const subscription = form.watch((values) => {
			if (onChange) {
				const updatedData: PlacementOverviewData = {
					...initialData,
					missionTitle: values.missionTitle || '',
					missionDescription: values.missionDescription || '',
					missionContent: {
						paragraph1: values.missionContent?.paragraph1 || '',
						paragraph2: values.missionContent?.paragraph2 || '',
						features: (values.missionContent?.features || [])
							.map(f => f?.value ?? '')
							.filter(f => f.trim().length > 0),
						objectives: (values.missionContent?.objectives || [])
							.map(o => o?.value ?? '')
							.filter(o => o.trim().length > 0)
					}
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
					missionTitle: values.missionTitle,
					missionDescription: values.missionDescription,
					missionContent: {
						paragraph1: values.missionContent.paragraph1,
						paragraph2: values.missionContent.paragraph2,
						features: values.missionContent.features.map(f => f.value).filter(f => f.trim().length > 0),
						objectives: values.missionContent.objectives.map(o => o.value).filter(o => o.trim().length > 0)
					}
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
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-slate-900">Mission Section</h3>
					
					<FormField
						control={form.control}
						name="missionTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mission Title</FormLabel>
								<FormControl>
									<Input placeholder="Our Mission" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="missionDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mission Description</FormLabel>
								<FormControl>
									<Textarea 
										placeholder="Brief description of the mission"
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
						name="missionContent.paragraph1"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Paragraph 1</FormLabel>
								<FormControl>
									<Textarea 
										placeholder="First paragraph of mission content"
										rows={4}
										{...field} 
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="missionContent.paragraph2"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Paragraph 2</FormLabel>
								<FormControl>
									<Textarea 
										placeholder="Second paragraph of mission content"
										rows={4}
										{...field} 
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Features */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-slate-900">Features</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => featuresArray.append({ value: '' })}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Feature
						</Button>
					</div>
					<div className="space-y-2">
						{featuresArray.fields.map((field, index) => (
							<div key={field.id} className="flex items-center gap-2">
								<FormField
									control={form.control}
									name={`missionContent.features.${index}.value`}
									render={({ field: featureField }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input placeholder="Feature text" {...featureField} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => featuresArray.remove(index)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>

				{/* Objectives */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-slate-900">Key Objectives</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => objectivesArray.append({ value: '' })}
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Objective
						</Button>
					</div>
					<div className="space-y-2">
						{objectivesArray.fields.map((field, index) => (
							<div key={field.id} className="flex items-center gap-2">
								<FormField
									control={form.control}
									name={`missionContent.objectives.${index}.value`}
									render={({ field: objectiveField }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input placeholder="Objective text" {...objectiveField} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => objectivesArray.remove(index)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
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
