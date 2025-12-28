'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Save, Loader2 } from 'lucide-react';
import { updateIqac, type IqacData } from '@/app/(Private Pages)/actions/statutory-committees';
import { useTransition, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const schema = z.object({
	// Hero removed as it inherits from parent layout
	about: z.object({
		title: z.string().min(1, 'Title is required'),
		content: z.array(z.string().min(1, 'Paragraph cannot be empty')),
		vision: z.string().min(1, 'Vision is required'),
		mission: z.string().min(1, 'Mission is required')
	}),
	objectives: z.array(
		z.object({
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			icon: z.string().min(1, 'Icon is required'),
			iconColor: z.string().min(1, 'Icon Color is required')
		})
	),
	functions: z.array(z.string().min(1, 'Function cannot be empty')),
	committeeMembers: z.array(
		z.object({
			name: z.string().min(1, 'Name is required'),
			designation: z.string().min(1, 'Designation is required'),
			department: z.string().min(1, 'Department is required'),
			qualification: z.string().optional()
		})
	),
	initiatives: z.array(
		z.object({
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			icon: z.string().min(1, 'Icon is required'),
			iconColor: z.string().min(1, 'Icon Color is required')
		})
	),
	aqar: z.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(1, 'Description is required'),
		reports: z.array(
			z.object({
				year: z.string().min(1, 'Year is required'),
				title: z.string().min(1, 'Title is required'),
				description: z.string().min(1, 'Description is required'),
				buttonText: z.string().min(1, 'Button Text is required'),
				buttonColor: z.string().min(1, 'Button Color is required')
			})
		)
	})
});

type FormData = z.infer<typeof schema>;

type Props = {
	initialData: IqacData;
	pageSlug: string;
	onChange?: (data: IqacData) => void;
};

export default function IqacForm({ initialData, pageSlug, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	// @ts-ignore - omitting hero from initialData for form
	const { hero, ...restData } = initialData;
	
	const { register, control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: restData
	});

	const aboutContentFields = useFieldArray({ control, name: 'about.content' as any });
	const objectivesFields = useFieldArray({ control, name: 'objectives' });
	const functionsFields = useFieldArray({ control, name: 'functions' as any });
	const membersFields = useFieldArray({ control, name: 'committeeMembers' });
	const initiativesFields = useFieldArray({ control, name: 'initiatives' });
	const aqarReportsFields = useFieldArray({ control, name: 'aqar.reports' as any });

	const watchedData = watch();
	useEffect(() => {
		if (onChange) {
			// Re-add hero to data when passing up, or handle it in the parent/action
			// Ideally, the action should merge or ignore hero if we don't send it.
			// But strict types might complain.
			// For now, we'll just pass what we have, assuming the type allows partial or we cast.
			// Or better, we assume initialData.hero is preserved if we don't touch it? 
			// No, onChange usually expects full object.
			onChange({ ...initialData, ...watchedData } as IqacData);
		}
	}, [watchedData, onChange, initialData]);

	const onSubmit = (data: FormData) => {
		startTransition(async () => {
			try {
				// Merge with original hero data to satisfy type
				await updateIqac({ ...initialData, ...data }, pageSlug);
				alert('Saved successfully!');
			} catch (error) {
				console.error(error);
				alert('Failed to save.');
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-8 max-w-5xl mx-auto pb-24'>
			
			{/* About Section */}
			<Card>
				<CardHeader>
					<CardTitle>About IQAC</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div>
						<Label>Title</Label>
						<Input {...register('about.title')} />
					</div>
					<div>
						<Label>Vision Statement</Label>
						<Textarea {...register('about.vision')} rows={3} />
					</div>
					<div>
						<Label>Mission Statement</Label>
						<Textarea {...register('about.mission')} rows={3} />
					</div>
					
					<div className="space-y-2">
						<div className='flex justify-between items-center'>
							<Label>About Content Paragraphs</Label>
							<Button type='button' size='sm' variant='outline' onClick={() => aboutContentFields.append('')}>
								<Plus className='w-4 h-4 mr-2' /> Add Paragraph
							</Button>
						</div>
						{aboutContentFields.fields.map((field, index) => (
							<div key={field.id} className='flex gap-2'>
								<Textarea {...register(`about.content.${index}` as const)} rows={3} />
								<Button type='button' size='icon' variant='ghost' className="text-red-500" onClick={() => aboutContentFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Objectives */}
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<h3 className='text-xl font-semibold'>Objectives</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => objectivesFields.append({ title: '', description: '', icon: 'Target', iconColor: 'text-blue-600' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Objective
					</Button>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					{objectivesFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => objectivesFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className="pt-6 space-y-3">
								<div><Label>Title</Label><Input {...register(`objectives.${index}.title`)} /></div>
								<div className="grid grid-cols-2 gap-2">
									<div><Label>Icon</Label><Input {...register(`objectives.${index}.icon`)} /></div>
									<div><Label>Color</Label><Input {...register(`objectives.${index}.iconColor`)} /></div>
								</div>
								<div><Label>Description</Label><Textarea {...register(`objectives.${index}.description`)} rows={2} /></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Functions */}
			<Card>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle>Functions</CardTitle>
						<Button type='button' size='sm' variant='outline' onClick={() => functionsFields.append('')}>
							<Plus className='w-4 h-4 mr-2' /> Add Function
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					{functionsFields.fields.map((field, index) => (
						<div key={field.id} className='flex gap-2 items-center'>
							<span className="text-sm font-mono text-gray-500 w-6">{index + 1}.</span>
							<Input {...register(`functions.${index}` as const)} />
							<Button type='button' size='icon' variant='ghost' className="text-red-500" onClick={() => functionsFields.remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Committee Members */}
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<h3 className='text-xl font-semibold'>Committee Members</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => membersFields.append({ name: '', designation: '', department: '' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Member
					</Button>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					{membersFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => membersFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className="pt-6 space-y-3">
								<div><Label>Name</Label><Input {...register(`committeeMembers.${index}.name`)} /></div>
								<div><Label>Designation</Label><Input {...register(`committeeMembers.${index}.designation`)} /></div>
								<div><Label>Department</Label><Input {...register(`committeeMembers.${index}.department`)} /></div>
								<div><Label>Qualification</Label><Input {...register(`committeeMembers.${index}.qualification`)} /></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Initiatives */}
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<h3 className='text-xl font-semibold'>Initiatives</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => initiativesFields.append({ title: '', description: '', icon: 'Award', iconColor: 'text-purple-600' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Initiative
					</Button>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					{initiativesFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => initiativesFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className="pt-6 space-y-3">
								<div><Label>Title</Label><Input {...register(`initiatives.${index}.title`)} /></div>
								<div className="grid grid-cols-2 gap-2">
									<div><Label>Icon</Label><Input {...register(`initiatives.${index}.icon`)} /></div>
									<div><Label>Color</Label><Input {...register(`initiatives.${index}.iconColor`)} /></div>
								</div>
								<div><Label>Description</Label><Textarea {...register(`initiatives.${index}.description`)} rows={2} /></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* AQAR Reports */}
			<Card>
				<CardHeader>
					<CardTitle>AQAR Reports</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className="grid md:grid-cols-2 gap-4">
						<div><Label>Section Title</Label><Input {...register('aqar.title')} /></div>
						<div><Label>Description</Label><Textarea {...register('aqar.description')} rows={2} /></div>
					</div>
					
					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							<Label className="text-base">Report Files</Label>
							<Button type='button' size='sm' variant='outline' onClick={() => aqarReportsFields.append({ year: '', title: '', description: '', buttonText: 'Download PDF', buttonColor: 'bg-green-600' })}>
								<Plus className='w-4 h-4 mr-2' /> Add Report
							</Button>
						</div>
						{aqarReportsFields.fields.map((field, index) => (
							<div key={field.id} className='border p-4 rounded-lg relative bg-gray-50/50'>
								<Button type='button' size='icon' variant='ghost' className='absolute top-2 right-2 text-red-500' onClick={() => aqarReportsFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<div><Label>Year</Label><Input {...register(`aqar.reports.${index}.year`)} /></div>
									<div className="md:col-span-2"><Label>Title</Label><Input {...register(`aqar.reports.${index}.title`)} /></div>
									<div className='md:col-span-3'><Label>Description</Label><Input {...register(`aqar.reports.${index}.description`)} /></div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<div className="sticky bottom-4 bg-white p-4 border rounded-xl shadow-lg flex justify-end z-50">
				<Button type='submit' disabled={isPending} className='w-full md:w-auto min-w-[150px]'>
					{isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Saving...
						</>
					) : (
						<>
							<Save className="mr-2 h-4 w-4" />
							Save Changes
						</>
					)}
				</Button>
			</div>
		</form>
	);
}
