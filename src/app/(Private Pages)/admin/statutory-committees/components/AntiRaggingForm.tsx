'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Save, Loader2 } from 'lucide-react';
import { updateAntiRagging, type AntiRaggingData } from '@/app/(Private Pages)/actions/statutory-committees';
import { useTransition, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const schema = z.object({
	// Hero removed
	definition: z.object({
		title: z.string().min(1),
		content: z.string().min(1),
		includes: z.array(z.string().min(1))
	}),
	committeeMembers: z.array(
		z.object({
			name: z.string().min(1),
			designation: z.string().min(1),
			department: z.string().min(1),
			phone: z.string().optional(),
			email: z.string().optional()
		})
	),
	preventiveMeasures: z.array(
		z.object({
			title: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1)
		})
	),
	punishments: z.array(z.string().min(1)),
	emergencyContacts: z.array(
		z.object({
			title: z.string().min(1),
			contact: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1),
			bgColor: z.string().min(1)
		})
	)
});

type FormData = z.infer<typeof schema>;

type Props = {
	initialData: AntiRaggingData;
	pageSlug: string;
	onChange?: (data: AntiRaggingData) => void;
};

export default function AntiRaggingForm({ initialData, pageSlug, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	// @ts-ignore - omitting hero
	const { hero, ...restData } = initialData;

	const { register, control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: restData
	});

	const includesFields = useFieldArray({ control, name: 'definition.includes' as any });
	const membersFields = useFieldArray({ control, name: 'committeeMembers' });
	const preventiveMeasuresFields = useFieldArray({ control, name: 'preventiveMeasures' });
	const punishmentsFields = useFieldArray({ control, name: 'punishments' as any });
	const emergencyContactsFields = useFieldArray({ control, name: 'emergencyContacts' });

	const watchedData = watch();
	useEffect(() => {
		if (onChange) {
			onChange({ ...initialData, ...watchedData } as AntiRaggingData);
		}
	}, [watchedData, onChange, initialData]);

	const onSubmit = (data: FormData) => {
		startTransition(async () => {
			try {
				await updateAntiRagging({ ...initialData, ...data }, pageSlug);
				alert('Saved successfully!');
			} catch (error) {
				console.error(error);
				alert('Failed to save.');
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-8 max-w-5xl mx-auto pb-24'>
			
			{/* Definition */}
			<Card>
				<CardHeader>
					<CardTitle>Definition & Scope</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div><Label>Title</Label><Input {...register('definition.title')} /></div>
					<div><Label>Content</Label><Textarea {...register('definition.content')} rows={4} /></div>
					
					<div className='space-y-2'>
						<div className='flex justify-between items-center'>
							<Label>Includes Points</Label>
							<Button type='button' size='sm' variant='outline' onClick={() => includesFields.append('')}>
								<Plus className='w-4 h-4 mr-2' /> Add Point
							</Button>
						</div>
						{includesFields.fields.map((field, index) => (
							<div key={field.id} className='flex gap-2'>
								<Input {...register(`definition.includes.${index}` as const)} />
								<Button type='button' size='icon' variant='ghost' className="text-red-500" onClick={() => includesFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Committee Members */}
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<h3 className='text-xl font-semibold'>Committee Members</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => membersFields.append({ name: '', designation: '', department: '' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Member
					</Button>
				</div>
				<div className='grid md:grid-cols-2 gap-4'>
					{membersFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => membersFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className='pt-6 space-y-3'>
								<div><Label>Name</Label><Input {...register(`committeeMembers.${index}.name`)} /></div>
								<div><Label>Designation</Label><Input {...register(`committeeMembers.${index}.designation`)} /></div>
								<div><Label>Department</Label><Input {...register(`committeeMembers.${index}.department`)} /></div>
								<div className='grid grid-cols-2 gap-2'>
									<div><Label>Phone</Label><Input {...register(`committeeMembers.${index}.phone`)} /></div>
									<div><Label>Email</Label><Input {...register(`committeeMembers.${index}.email`)} /></div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Preventive Measures */}
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<h3 className='text-xl font-semibold'>Preventive Measures</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => preventiveMeasuresFields.append({ title: '', description: '', icon: 'Shield', iconColor: 'text-blue-600' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Measure
					</Button>
				</div>
				<div className='grid md:grid-cols-2 gap-4'>
					{preventiveMeasuresFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => preventiveMeasuresFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className='pt-6 space-y-3'>
								<div><Label>Title</Label><Input {...register(`preventiveMeasures.${index}.title`)} /></div>
								<div className='grid grid-cols-2 gap-2'>
									<div><Label>Icon</Label><Input {...register(`preventiveMeasures.${index}.icon`)} /></div>
									<div><Label>Color</Label><Input {...register(`preventiveMeasures.${index}.iconColor`)} /></div>
								</div>
								<div><Label>Description</Label><Textarea {...register(`preventiveMeasures.${index}.description`)} rows={2} /></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Punishments */}
			<Card>
				<CardHeader>
					<div className='flex justify-between items-center'>
						<CardTitle>Punishments</CardTitle>
						<Button type='button' size='sm' variant='outline' onClick={() => punishmentsFields.append('')}>
							<Plus className='w-4 h-4 mr-2' /> Add Item
						</Button>
					</div>
				</CardHeader>
				<CardContent className='space-y-2'>
					{punishmentsFields.fields.map((field, index) => (
						<div key={field.id} className='flex gap-2 items-center'>
							<span className="text-sm font-mono text-gray-500 w-6">{index + 1}.</span>
							<Input {...register(`punishments.${index}` as const)} />
							<Button type='button' size='icon' variant='ghost' className="text-red-500" onClick={() => punishmentsFields.remove(index)}>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Emergency Contacts */}
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<h3 className='text-xl font-semibold'>Emergency Contacts</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => emergencyContactsFields.append({ title: '', contact: '', description: '', icon: 'Phone', iconColor: 'text-red-600', bgColor: 'bg-red-100' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Contact
					</Button>
				</div>
				<div className='grid md:grid-cols-3 gap-4'>
					{emergencyContactsFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => emergencyContactsFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className='pt-6 space-y-3'>
								<div><Label>Title</Label><Input {...register(`emergencyContacts.${index}.title`)} /></div>
								<div><Label>Contact</Label><Input {...register(`emergencyContacts.${index}.contact`)} /></div>
								<div><Label>Description</Label><Input {...register(`emergencyContacts.${index}.description`)} /></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

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
