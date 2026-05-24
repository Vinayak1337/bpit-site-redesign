'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ContactType } from '@prisma/client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { updateContacts } from '@/app/(Private Pages)/actions/contacts';
import {
	AddRowButton,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminItemCard,
	AdminItemList,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

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
			if (value.length === 0) return null;
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
	const defaults = useMemo(() => toFormValues(initialContacts), [initialContacts]);
	const form = useForm<FooterContactsFormValues>({
		defaultValues: defaults,
		mode: 'onChange'
	});
	const fieldArray = useFieldArray({
		control: form.control,
		name: 'contacts'
	});
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });

	useEffect(() => {
		onChange?.(toContactsPayload(form.getValues()));
		const subscription = form.watch(values => {
			onChange?.(toContactsPayload(values as FooterContactsFormValues));
			setStatus(current => (current.kind === 'idle' ? current : { kind: 'idle' }));
		});
		return () => subscription.unsubscribe();
	}, [form, onChange]);

	useEffect(() => {
		if (status.kind !== 'success') return;
		const id = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(id);
	}, [status]);

	const handleSubmit = (values: FooterContactsFormValues) => {
		const payload = toContactsPayload(values);
		if (payload.length === 0) {
			setStatus({
				kind: 'error',
				message: 'Add at least one contact item.'
			});
			return;
		}
		startTransition(async () => {
			setStatus({ kind: 'saving' });
			const result = await updateContacts(payload);
			if (!result.ok) {
				setStatus({
					kind: 'error',
					message:
						result.error === 'invalid_payload'
							? 'Save failed. Check email and value fields.'
							: 'Save failed. Try again.'
				});
				return;
			}
			setStatus({ kind: 'success' });
		});
	};

	return (
		<Form {...form}>
			<AdminForm onSubmit={form.handleSubmit(handleSubmit)}>
				<AdminFormSection
					title='Footer contacts'
					description='Address, phone numbers, and email displayed across the site.'>
					<AdminItemList>
						{fieldArray.fields.map((field, index) => (
							<AdminItemCard
								key={field.id}
								index={index}
								total={fieldArray.fields.length}
								onRemove={() => fieldArray.remove(index)}>
								<AdminFieldGrid cols={2}>
									<FormField
										control={form.control}
										name={`contacts.${index}.type`}
										render={({ field: typeField }) => (
											<FormItem className='space-y-1.5'>
												<AdminField label='Type'>
													<Select
														value={typeField.value}
														onValueChange={typeField.onChange}>
														<FormControl>
															<SelectTrigger className='h-10'>
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
												</AdminField>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`contacts.${index}.value`}
										render={({ field: valueField, fieldState }) => (
											<FormItem className='space-y-1.5'>
												<AdminField
													label='Value'
													error={fieldState.error?.message}>
													<FormControl>
														<Input
															{...valueField}
															placeholder='Enter contact value'
														/>
													</FormControl>
												</AdminField>
												<FormMessage className='hidden' />
											</FormItem>
										)}
									/>
								</AdminFieldGrid>
								<FormField
									control={form.control}
									name={`contacts.${index}.displayValue`}
									render={({ field: displayField }) => (
										<FormItem className='space-y-1.5'>
											<AdminField
												label='Display text'
												hint='Optional. How the value appears in the footer.'>
												<FormControl>
													<Textarea {...displayField} rows={2} />
												</FormControl>
											</AdminField>
										</FormItem>
									)}
								/>
							</AdminItemCard>
						))}
					</AdminItemList>
					<AddRowButton onClick={() => fieldArray.append(createEmptyContact())}>
						Add contact
					</AddRowButton>
				</AdminFormSection>

				<AdminFormFooter status={status} saving={isPending} />
			</AdminForm>
		</Form>
	);
}
