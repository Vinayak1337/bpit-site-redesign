'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Save, Loader2 } from 'lucide-react';
import { updateStatutoryOverview, type StatutoryOverviewData } from '@/app/(Private Pages)/actions/statutory-committees';
import { useTransition, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ICON_COLOR_OPTIONS = [
	'text-blue-600', 'text-green-600', 'text-purple-600',
	'text-orange-600', 'text-red-600', 'text-indigo-600',
	'text-teal-600', 'text-pink-600', 'text-yellow-600', 'text-gray-600'
] as const;

const schema = z.object({
	hero: z.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(1, 'Description is required')
	}),
	committees: z.array(
		z.object({
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			icon: z.string().min(1, 'Icon is required'),
			iconColor: z.string().min(1, 'Icon Color is required'),
			href: z.string().min(1, 'Href is required'),
			key: z.string()  // internal routing key — preserved via hidden input, not shown in UI
		})
	)
});

type FormData = z.infer<typeof schema>;

type Props = {
	initialData: StatutoryOverviewData;
	pageSlug: string;
	onChange?: (data: StatutoryOverviewData) => void;
	visibleSections?: Array<'hero' | 'committees'>;
};

export default function StatutoryOverviewForm({
	initialData,
	pageSlug,
	onChange,
	visibleSections
}: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		type: 'success' | 'error';
		text: string;
	} | null>(null);
	const { register, control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: initialData
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'committees'
	});

	// Watch for changes to update preview
	const watchedData = watch();
	useEffect(() => {
		if (onChange) {
			onChange(watchedData as StatutoryOverviewData);
		}
	}, [watchedData, onChange]);

	const onSubmit = (data: FormData) => {
		setMessage(null);
		startTransition(async () => {
			try {
				await updateStatutoryOverview(data, pageSlug);
				setMessage({ type: 'success', text: 'Saved successfully.' });
			} catch (error) {
				console.error(error);
				setMessage({ type: 'error', text: 'Failed to save statutory overview.' });
			}
		});
	};

	const showSection = (section: 'hero' | 'committees') =>
		!visibleSections || visibleSections.includes(section);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-8 max-w-4xl mx-auto'>
			{showSection('hero') && (
			<Card>
				<CardHeader>
					<CardTitle>Hero Section</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div>
						<Label>Title</Label>
						<Input {...register('hero.title')} placeholder="e.g. Statutory Committees" />
						{errors.hero?.title && <p className='text-red-500 text-sm mt-1'>{errors.hero.title.message}</p>}
					</div>
					<div>
						<Label>Description</Label>
						<Textarea {...register('hero.description')} placeholder="Enter a brief description..." rows={3} />
						{errors.hero?.description && <p className='text-red-500 text-sm mt-1'>{errors.hero.description.message}</p>}
					</div>
				</CardContent>
			</Card>
			)}

			{showSection('committees') && (
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Committees List</h3>
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={() =>
							append({
								title: '',
								description: '',
								icon: 'Shield',
								iconColor: 'text-blue-600',
								href: '',
								key: ''  // auto-set based on href when saved
							})
						}>
						<Plus className='w-4 h-4 mr-2' />
						Add Committee
					</Button>
				</div>

				<div className="grid gap-4">
					{fields.map((field, index) => (
						<Card key={field.id} className="relative overflow-hidden">
							<div className="absolute top-0 right-0 p-2 z-10">
								<Button
									type='button'
									variant='ghost'
									size='icon'
									className='text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full'
									onClick={() => remove(index)}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
							<CardHeader className="pb-2">
								<CardTitle className="text-base font-medium">Committee #{index + 1}</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4">
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div>
										<Label>Title</Label>
										<Input {...register(`committees.${index}.title`)} placeholder="e.g. Anti-Ragging Committee" />
										{errors.committees?.[index]?.title && (
											<p className='text-red-500 text-sm mt-1'>{errors.committees[index]?.title?.message}</p>
										)}
									</div>
									{/* key is a developer-only routing field — hidden from admin UI */}
									<input type='hidden' {...register(`committees.${index}.key`)} />
									<div>
										<Label>Icon Name (Lucide)</Label>
										<Input {...register(`committees.${index}.icon`)} placeholder="e.g. UserX" />
									</div>
									<div>
										<Label>Icon Color</Label>
										<Controller
											control={control}
											name={`committees.${index}.iconColor`}
											render={({ field }) => (
												<Select onValueChange={field.onChange} value={field.value}>
													<SelectTrigger>
														<SelectValue placeholder='Select color' />
													</SelectTrigger>
													<SelectContent>
														{ICON_COLOR_OPTIONS.map(c => (
															<SelectItem key={c} value={c}>{c}</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
									</div>
									<div className='md:col-span-2'>
										<Label>Link Href</Label>
										<Input {...register(`committees.${index}.href`)} placeholder="e.g. /statutory-committees/anti-ragging" />
									</div>
									<div className='md:col-span-2'>
										<Label>Description</Label>
										<Textarea {...register(`committees.${index}.description`)} placeholder="Brief description of the committee..." rows={2} />
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
			)}

			<div className="sticky bottom-4 bg-white p-4 border rounded-xl shadow-lg flex justify-end z-50">
				{message ? (
					<div
						className={`mr-3 self-center text-sm font-medium ${
							message.type === 'error' ? 'text-red-600' : 'text-emerald-600'
						}`}>
						{message.text}
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
