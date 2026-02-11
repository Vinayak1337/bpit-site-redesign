'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Save, Loader2 } from 'lucide-react';
import { updateInternalComplaints, type InternalComplaintsData } from '@/app/(Private Pages)/actions/statutory-committees';
import { useTransition, useEffect, useState } from 'react';
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
	procedures: z.array(
		z.object({
			step: z.string().min(1),
			title: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1)
		})
	),
	supportServices: z.array(
		z.object({
			title: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1)
		})
	),
	rightsAndResponsibilities: z.object({
		rights: z.array(z.string().min(1)),
		responsibilities: z.array(z.string().min(1))
	}),
	contactInfo: z.array(
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
	initialData: InternalComplaintsData;
	pageSlug: string;
	onChange?: (data: InternalComplaintsData) => void;
	visibleSections?: Array<
		'hero' | 'definition' | 'members' | 'procedures' | 'support' | 'rights' | 'contacts'
	>;
};

export default function InternalComplaintsForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [statusMessage, setStatusMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);
	const restData = { ...initialData };
	delete (restData as Partial<InternalComplaintsData>).hero;

	const { register, control, handleSubmit, watch } = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: restData as FormData
	});

	const includesFields = useFieldArray({ control, name: 'definition.includes' as any });
	const membersFields = useFieldArray({ control, name: 'committeeMembers' });
	const proceduresFields = useFieldArray({ control, name: 'procedures' });
	const supportServicesFields = useFieldArray({ control, name: 'supportServices' });
	const rightsFields = useFieldArray({ control, name: 'rightsAndResponsibilities.rights' as any });
	const responsibilitiesFields = useFieldArray({ control, name: 'rightsAndResponsibilities.responsibilities' as any });
	const contactInfoFields = useFieldArray({ control, name: 'contactInfo' });

	const watchedData = watch();
	useEffect(() => {
		if (onChange) {
			onChange({ ...initialData, ...watchedData } as InternalComplaintsData);
		}
	}, [watchedData, onChange, initialData]);

	const showSection = (
		section: 'hero' | 'definition' | 'members' | 'procedures' | 'support' | 'rights' | 'contacts'
	) => !visibleSections || visibleSections.includes(section);

	const onSubmit = (data: FormData) => {
		setStatusMessage(null);
		startTransition(async () => {
			try {
				await updateInternalComplaints({ ...initialData, ...data }, pageSlug);
				setStatusMessage({ type: 'success', text: 'Saved successfully.' });
			} catch (error) {
				console.error(error);
				setStatusMessage({ type: 'error', text: 'Failed to save.' });
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-8 max-w-5xl mx-auto pb-24'>
			
			{showSection('hero') ? (
				<div className='rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800'>
					Hero content is edited from the internal complaints hero section.
				</div>
			) : null}

			{/* Definition */}
			{showSection('definition') && (
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
			)}

			{/* Committee Members */}
			{showSection('members') && (
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
			)}

			{/* Procedures */}
			{showSection('procedures') && (
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<h3 className='text-xl font-semibold'>Procedures</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => proceduresFields.append({ step: '', title: '', description: '', icon: 'FileText', iconColor: 'text-blue-600' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Step
					</Button>
				</div>
				<div className='grid md:grid-cols-2 gap-4'>
					{proceduresFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => proceduresFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className='pt-6 space-y-3'>
								<div className='grid grid-cols-3 gap-2'>
									<div><Label>Step #</Label><Input {...register(`procedures.${index}.step`)} /></div>
									<div className='col-span-2'><Label>Title</Label><Input {...register(`procedures.${index}.title`)} /></div>
								</div>
								<div><Label>Description</Label><Textarea {...register(`procedures.${index}.description`)} rows={2} /></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
			)}

			{/* Support Services */}
			{showSection('support') && (
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<h3 className='text-xl font-semibold'>Support Services</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => supportServicesFields.append({ title: '', description: '', icon: 'Heart', iconColor: 'text-pink-600' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Service
					</Button>
				</div>
				<div className='grid md:grid-cols-2 gap-4'>
					{supportServicesFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => supportServicesFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className='pt-6 space-y-3'>
								<div><Label>Title</Label><Input {...register(`supportServices.${index}.title`)} /></div>
								<div><Label>Description</Label><Textarea {...register(`supportServices.${index}.description`)} rows={2} /></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
			)}

			{/* Rights & Responsibilities */}
			{showSection('rights') && (
			<div className='grid md:grid-cols-2 gap-8'>
				<Card>
					<CardHeader>
						<div className='flex justify-between items-center'>
							<CardTitle>Rights</CardTitle>
							<Button type='button' size='sm' variant='outline' onClick={() => rightsFields.append('')}>
								<Plus className='w-4 h-4' />
							</Button>
						</div>
					</CardHeader>
					<CardContent className='space-y-2'>
						{rightsFields.fields.map((field, index) => (
							<div key={field.id} className='flex gap-2'>
								<Input {...register(`rightsAndResponsibilities.rights.${index}` as const)} />
								<Button type='button' size='icon' variant='ghost' className="text-red-500" onClick={() => rightsFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
						))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className='flex justify-between items-center'>
							<CardTitle>Responsibilities</CardTitle>
							<Button type='button' size='sm' variant='outline' onClick={() => responsibilitiesFields.append('')}>
								<Plus className='w-4 h-4' />
							</Button>
						</div>
					</CardHeader>
					<CardContent className='space-y-2'>
						{responsibilitiesFields.fields.map((field, index) => (
							<div key={field.id} className='flex gap-2'>
								<Input {...register(`rightsAndResponsibilities.responsibilities.${index}` as const)} />
								<Button type='button' size='icon' variant='ghost' className="text-red-500" onClick={() => responsibilitiesFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
			)}

			{/* Contact Info */}
			{showSection('contacts') && (
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<h3 className='text-xl font-semibold'>Contact Info</h3>
					<Button type='button' size='sm' variant='outline' onClick={() => contactInfoFields.append({ title: '', contact: '', description: '', icon: 'Phone', iconColor: 'text-purple-600', bgColor: 'bg-purple-100' })}>
						<Plus className='w-4 h-4 mr-2' /> Add Contact
					</Button>
				</div>
				<div className='grid md:grid-cols-3 gap-4'>
					{contactInfoFields.fields.map((field, index) => (
						<Card key={field.id} className='relative'>
							<div className='absolute top-2 right-2'>
								<Button type='button' size='icon' variant='ghost' className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => contactInfoFields.remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardContent className='pt-6 space-y-3'>
								<div><Label>Title</Label><Input {...register(`contactInfo.${index}.title`)} /></div>
								<div><Label>Contact</Label><Input {...register(`contactInfo.${index}.contact`)} /></div>
								<div><Label>Description</Label><Input {...register(`contactInfo.${index}.description`)} /></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
			)}

			<div className="sticky bottom-4 bg-white p-4 border rounded-xl shadow-lg flex justify-end z-50">
				{statusMessage ? (
					<div
						className={`mr-3 self-center text-sm font-medium ${
							statusMessage.type === 'error' ? 'text-red-600' : 'text-emerald-600'
						}`}>
						{statusMessage.text}
					</div>
				) : null}
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
