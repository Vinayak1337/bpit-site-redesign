'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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
import { BookOpen, Target, Users } from 'lucide-react';
import { updatePrincipalMessage } from '@/app/(Private Pages)/actions/about';
import type { PrincipalMessageData } from '@/app/(Private Pages)/actions/about';

type ParagraphFormValue = { id: string; value: string };

type FormValues = {
	headerTitle: string;
	headerSubtitle: string;
	quote: string;
	paragraphs: ParagraphFormValue[];
	more: ParagraphFormValue[];
	academicLeadershipTitle: string;
	academicLeadershipDescription: string;
	strategicVisionTitle: string;
	strategicVisionDescription: string;
	studentMentorshipTitle: string;
	studentMentorshipDescription: string;
};

type Props = {
	initialData: PrincipalMessageData;
	pageSlug: string;
	onChange?: (data: PrincipalMessageData) => void;
};

const createParagraph = (value = ''): ParagraphFormValue => ({
	id: crypto.randomUUID(),
	value
});

const normalizePrincipalMessage = (values: Partial<FormValues>): PrincipalMessageData => {
	const paragraphs = (values.paragraphs ?? [])
		.map(paragraph => (paragraph.value ?? '').trim())
		.filter(Boolean);
	
	const more = (values.more ?? [])
		.map(paragraph => (paragraph.value ?? '').trim())
		.filter(Boolean);

	return {
		header: {
			title: (values.headerTitle ?? '').trim() || "Principal's Message",
			subtitle: (values.headerSubtitle ?? '').trim() || 'Leading Academic Excellence'
		},
		quote: (values.quote ?? '').trim() || undefined,
		paragraphs,
		more,
		cards: {
			academicLeadership: {
				title: (values.academicLeadershipTitle ?? '').trim() || 'Academic Leadership',
				description: (values.academicLeadershipDescription ?? '').trim() || 'Guiding curriculum development and maintaining academic standards.'
			},
			strategicVision: {
				title: (values.strategicVisionTitle ?? '').trim() || 'Strategic Vision',
				description: (values.strategicVisionDescription ?? '').trim() || 'Developing long-term strategies for institutional growth and excellence.'
			},
			studentMentorship: {
				title: (values.studentMentorshipTitle ?? '').trim() || 'Student Mentorship',
				description: (values.studentMentorshipDescription ?? '').trim() || 'Fostering student development and career guidance.'
			}
		}
	};
};

export default function PrincipalMessageForm({
	initialData,
	pageSlug,
	onChange
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm<FormValues>({
		defaultValues: {
			headerTitle: initialData.header.title,
			headerSubtitle: initialData.header.subtitle,
			quote: initialData.quote || '',
			paragraphs:
				initialData.paragraphs.length > 0
					? initialData.paragraphs.map(value => createParagraph(value))
					: [createParagraph()],
			more:
				initialData.more.length > 0
					? initialData.more.map(value => createParagraph(value))
					: [createParagraph()],
			academicLeadershipTitle: initialData.cards?.academicLeadership?.title || 'Academic Leadership',
			academicLeadershipDescription: initialData.cards?.academicLeadership?.description || 'Guiding curriculum development and maintaining academic standards.',
			strategicVisionTitle: initialData.cards?.strategicVision?.title || 'Strategic Vision',
			strategicVisionDescription: initialData.cards?.strategicVision?.description || 'Developing long-term strategies for institutional growth and excellence.',
			studentMentorshipTitle: initialData.cards?.studentMentorship?.title || 'Student Mentorship',
			studentMentorshipDescription: initialData.cards?.studentMentorship?.description || 'Fostering student development and career guidance.'
		}
	});

	const paragraphsArray = useFieldArray({
		control: form.control,
		name: 'paragraphs'
	});

	const moreArray = useFieldArray({
		control: form.control,
		name: 'more'
	});

	useEffect(() => {
		onChange?.(normalizePrincipalMessage(form.getValues()));
		const subscription = form.watch(values => {
			const formValues: Partial<FormValues> = {
				...values,
				paragraphs: values.paragraphs?.filter(Boolean) as ParagraphFormValue[],
				more: values.more?.filter(Boolean) as ParagraphFormValue[]
			};
			onChange?.(normalizePrincipalMessage(formValues));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		startTransition(async () => {
			try {
				const data = normalizePrincipalMessage(values);
				await updatePrincipalMessage(pageSlug, data);
				setMessage('Principal message updated successfully!');
			} catch (error) {
				console.error('Failed to update principal message:', error);
				setMessage('Failed to update principal message. Please try again.');
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				{message && (
					<div className={`p-3 rounded-lg text-sm ${
						message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
					}`}>
						{message}
					</div>
				)}

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='headerTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Principal's Message" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='headerSubtitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subtitle</FormLabel>
								<FormControl>
									<Input placeholder='Leading Academic Excellence and Innovation' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='quote'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quote</FormLabel>
							<FormControl>
								<Input placeholder='"Dear Students and Academic Community,"' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<FormLabel>Main Content Paragraphs</FormLabel>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => paragraphsArray.append(createParagraph())}>
							Add Paragraph
						</Button>
					</div>
					<div className='space-y-2'>
						{paragraphsArray.fields.map((field, index) => (
							<div key={field.id} className='flex gap-2'>
								<FormField
									control={form.control}
									name={`paragraphs.${index}.value`}
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormControl>
												<Textarea
													placeholder='Enter paragraph content...'
													className='min-h-[80px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{paragraphsArray.fields.length > 1 && (
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() => paragraphsArray.remove(index)}>
										Remove
									</Button>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<FormLabel>Additional Content</FormLabel>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => moreArray.append(createParagraph())}>
							Add More Content
						</Button>
					</div>
					<div className='space-y-2'>
						{moreArray.fields.map((field, index) => (
							<div key={field.id} className='flex gap-2'>
								<FormField
									control={form.control}
									name={`more.${index}.value`}
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormControl>
												<Textarea
													placeholder='Additional content paragraph...'
													className='min-h-[80px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{moreArray.fields.length > 1 && (
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() => moreArray.remove(index)}>
										Remove
									</Button>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='space-y-6'>
					<h3 className='text-lg font-semibold text-gray-900'>Cards Content</h3>
					
					{/* Academic Leadership Card */}
					<div className='space-y-3 p-4 border rounded-lg'>
						<h4 className='font-medium text-green-600 flex items-center gap-2'>
							<BookOpen className='w-4 h-4' />
							Academic Leadership Card
						</h4>
						<FormField
							control={form.control}
							name='academicLeadershipTitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Card title...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='academicLeadershipDescription'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea 
											placeholder='Card description...' 
											{...field} 
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Strategic Vision Card */}
					<div className='space-y-3 p-4 border rounded-lg'>
						<h4 className='font-medium text-blue-600 flex items-center gap-2'>
							<Target className='w-4 h-4' />
							Strategic Vision Card
						</h4>
						<FormField
							control={form.control}
							name='strategicVisionTitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Card title...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='strategicVisionDescription'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea 
											placeholder='Card description...' 
											{...field} 
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Student Mentorship Card */}
					<div className='space-y-3 p-4 border rounded-lg'>
						<h4 className='font-medium text-purple-600 flex items-center gap-2'>
							<Users className='w-4 h-4' />
							Student Mentorship Card
						</h4>
						<FormField
							control={form.control}
							name='studentMentorshipTitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Card title...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='studentMentorshipDescription'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea 
											placeholder='Card description...' 
											{...field} 
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button type='submit' disabled={isPending} className='w-full'>
					{isPending ? 'Saving...' : 'Save Changes'}
				</Button>
			</form>
		</Form>
	);
}