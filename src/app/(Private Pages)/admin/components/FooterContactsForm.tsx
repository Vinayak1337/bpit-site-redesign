'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ContactType } from '@prisma/client';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { updateContacts } from '@/app/(Private Pages)/actions/contacts';
import { Plus, Trash2 } from 'lucide-react';

type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

type ContactFieldValue = {
	id: string;
	type: ContactType;
	value: string;
	displayValue: string;
};

export type FooterContactsFormValues = {
	contacts: ContactFieldValue[];
};

type FooterContactsFormProps = {
	initialContacts: ContactDTO[];
	onChange?: (contacts: ContactDTO[]) => void;
};

const CONTACT_TYPE_LABELS: Record<ContactType, string> = {
	PHONE: 'Phone',
	EMAIL: 'Email',
	ADDRESS: 'Address'
};

const createEmptyContact = (
	type: ContactType = ContactType.PHONE
): ContactFieldValue => ({
	id: crypto.randomUUID(),
	type,
	value: '',
	displayValue: ''
});

const toFormValues = (contacts: ContactDTO[]): FooterContactsFormValues => ({
	contacts:
		contacts.length > 0
			? contacts.map(contact => ({
					id: crypto.randomUUID(),
					type: contact.type,
					value: contact.value,
					displayValue: contact.displayValue ?? ''
			  }))
			: [createEmptyContact()]
});

const toContactsPayload = (values: FooterContactsFormValues): ContactDTO[] =>
	values.contacts
		.map(contact => {
			const value = contact.value.trim();
			if (value.length === 0) {
				return null;
			}
			const display = contact.displayValue.trim();
			return {
				type: contact.type,
				value,
				displayValue: display.length > 0 ? display : null
			};
		})
		.filter((contact): contact is ContactDTO => contact !== null);

export default function FooterContactsForm({
	initialContacts,
	onChange
}: FooterContactsFormProps) {
	const defaults = useMemo(
		() => toFormValues(initialContacts),
		[initialContacts]
	);
	const form = useForm<FooterContactsFormValues>({
		defaultValues: defaults,
		mode: 'onChange'
	});
	const fieldArray = useFieldArray({
		control: form.control,
		name: 'contacts'
	});
	const [isPending, startTransition] = useTransition();
	const [statusMessage, setStatusMessage] = useState<string | null>(null);
	const [statusVariant, setStatusVariant] = useState<
		'success' | 'error' | null
	>(null);

	useEffect(() => {
		onChange?.(toContactsPayload(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(toContactsPayload(values as FooterContactsFormValues));
			setStatusMessage(null);
			setStatusVariant(null);
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	const handleSubmit = (values: FooterContactsFormValues) => {
		const payload = toContactsPayload(values);
		if (payload.length === 0) {
			setStatusVariant('error');
			setStatusMessage('Add at least one contact item.');
			return;
		}
		setStatusMessage(null);
		setStatusVariant(null);
		startTransition(async () => {
			const result = await updateContacts(payload);
			if (!result.ok) {
				setStatusVariant('error');
				const errorMessage =
					result.error === 'invalid_payload'
						? 'Save failed. Ensure email addresses are valid and values are not empty.'
						: 'Save failed. Check the contact details and try again.';
				setStatusMessage(errorMessage);
				return;
			}
			setStatusVariant('success');
			setStatusMessage('Saved');
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
				<div>
					<h3 className='text-lg font-semibold text-slate-900'>
						Footer Contacts
					</h3>
					<p className='text-sm text-slate-500'>
						Manage address, phone numbers, and email displayed across the site.
					</p>
				</div>
				<div className='space-y-4'>
					{fieldArray.fields.map((field, index) => (
						<div
							key={field.id}
							className='space-y-4 rounded-lg border border-slate-200 bg-slate-50/60 p-4'>
							<div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
								<FormField
									control={form.control}
									name={`contacts.${index}.type`}
									render={({ field: typeField }) => (
										<FormItem className='w-full sm:w-40'>
											<FormLabel>Type</FormLabel>
											<Select
												value={typeField.value}
												onValueChange={typeField.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select type' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.values(ContactType).map(option => (
														<SelectItem key={option} value={option}>
															{CONTACT_TYPE_LABELS[option]}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<div className='flex-1 space-y-4'>
									<FormField
										control={form.control}
										name={`contacts.${index}.value`}
										render={({ field: valueField }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input
														{...valueField}
														placeholder='Enter contact value'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`contacts.${index}.displayValue`}
										render={({ field: displayField }) => (
											<FormItem>
												<FormLabel>Display Value (optional)</FormLabel>
												<FormControl>
													<Textarea
														{...displayField}
														rows={2}
														placeholder='How the value should appear in the footer'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button
									type='button'
									variant='ghost'
									size='icon'
									onClick={() => fieldArray.remove(index)}
									className='self-start text-slate-500 hover:text-red-600'>
									<Trash2 className='h-5 w-5' />
								</Button>
							</div>
						</div>
					))}
				</div>
				<Button
					type='button'
					variant='outline'
					onClick={() => fieldArray.append(createEmptyContact())}
					className='w-full border-dashed border-slate-300 text-slate-600 hover:text-blue-600'>
					<Plus className='mr-2 h-4 w-4' /> Add contact
				</Button>
				<div className='flex items-center justify-between border-t border-slate-200 pt-4'>
					{statusMessage ? (
						<p
							className={`text-sm ${
								statusVariant === 'success'
									? 'text-emerald-600'
									: 'text-red-600'
							}`}>
							{statusMessage}
						</p>
					) : (
						<span className='text-sm text-slate-400'>
							Changes apply instantly to the preview.
						</span>
					)}
					<Button type='submit' disabled={isPending}>
						Save changes
					</Button>
				</div>
			</form>
		</Form>
	);
}
