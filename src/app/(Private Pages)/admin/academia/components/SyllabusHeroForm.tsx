'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
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
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import {
	updateSyllabusHero,
	type SyllabusHeroData
} from '@/app/(Private Pages)/actions/academia-syllabus-ordinance';

type FormValues = { title: string; subtitle: string };

type Props = {
	initialData: SyllabusHeroData;
	onChange?: (data: SyllabusHeroData) => void;
};

const normalize = (v: Partial<FormValues>): SyllabusHeroData => ({
	title: (v.title ?? '').trim(),
	subtitle: (v.subtitle ?? '').trim()
});

export default function SyllabusHeroForm({ initialData, onChange }: Props) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<FormValues>({
		defaultValues: { title: initialData.title, subtitle: initialData.subtitle }
	});

	useEffect(() => {
		onChange?.(normalize(form.getValues()));
		const sub = form.watch(v => onChange?.(normalize(v)));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FormValues) => {
		setMessage(null);
		const payload = normalize(values);
		startTransition(async () => {
			const r = await updateSyllabusHero(payload);
			setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Syllabus Hero
					</h3>
					<div className='flex items-center gap-3'>
						{message ? (
							<span
								className={`text-sm font-medium ${
									message.toLowerCase().includes('fail')
										? 'text-red-600'
										: 'text-emerald-600'
								}`}>
								{message}
							</span>
						) : null}
						<Button type='submit' disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...
								</>
							) : (
								<>
									<Save className='mr-2 h-4 w-4' /> Save
								</>
							)}
						</Button>
					</div>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Header</CardTitle>
						<CardDescription>
							Title and subtitle shown at the top of Syllabus & Ordinance.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='title'
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='subtitle'
							rules={{ required: 'Subtitle is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtitle</FormLabel>
									<FormControl>
										<Textarea rows={3} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
