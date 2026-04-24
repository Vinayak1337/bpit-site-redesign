'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import Editable from '@/components/ui/Editable';
import ContactBlock from '@/app/(Public Pages)/(library layout)/academia/library/_shared/ContactBlock';
import type { ContactData } from '@/app/(Private Pages)/actions/_library-subpage-shared';

function ContactForm({
	initialData,
	updateAction,
	onChange
}: {
	initialData: ContactData;
	updateAction: (d: ContactData) => Promise<{ ok: boolean; error?: string }>;
	onChange?: (d: ContactData) => void;
}) {
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<string | null>(null);
	const form = useForm<ContactData>({ defaultValues: initialData });
	useEffect(() => {
		onChange?.(form.getValues());
		const sub = form.watch(v => onChange?.(v as ContactData));
		return () => sub.unsubscribe();
	}, [form, onChange]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(v => {
					setMessage(null);
					startTransition(async () => {
						const r = await updateAction(v);
						setMessage(r.ok ? 'Saved successfully' : r.error ?? 'Save failed');
					});
				})}
				className='space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900'>Contact</h3>
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
						<CardTitle>Contact details</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Textarea rows={3} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hours'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hours</FormLabel>
									<FormControl>
										<Textarea rows={3} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='mapEmbed'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Map Embed URL (optional)</FormLabel>
									<FormControl>
										<Input placeholder='https://www.google.com/maps/embed?...' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}

export default function ContactEditor({
	initialData,
	updateAction
}: {
	initialData: ContactData;
	updateAction: (d: ContactData) => Promise<{ ok: boolean; error?: string }>;
}) {
	const [data, setData] = useState<ContactData>(initialData);
	return (
		<Editable
			label='Contact'
			presentation='dialog'
			formContent={
				<ContactForm
					initialData={initialData}
					updateAction={updateAction}
					onChange={setData}
				/>
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50 p-4'>
				<ContactBlock data={data} />
			</div>
		</Editable>
	);
}
