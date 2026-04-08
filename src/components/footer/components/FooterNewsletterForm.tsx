'use client';

import { useState, useTransition } from 'react';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const emailSchema = z
	.string()
	.email('Enter a valid email address')
	.transform(value => value.trim());

const FooterNewsletterForm = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState<string | null>(null);
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validation = emailSchema.safeParse(email);

		if (!validation.success) {
			setStatus('error');
			setMessage(validation.error.issues[0]?.message ?? 'Invalid email');
			return;
		}

		startTransition(async () => {
			try {
				const response = await fetch('/api/newsletter', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email: validation.data })
				});

				if (!response.ok) {
					const errorPayload = (await response.json().catch(() => null)) as
						| { message?: string }
						| null;
					throw new Error(
						errorPayload?.message ?? 'Unable to subscribe right now.'
					);
				}

				setStatus('success');
				setMessage(
					"Thank you! We've added your email to the newsletter queue."
				);
				setEmail('');
			} catch (error) {
				const fallback = error instanceof Error ? error.message : null;
				setStatus('error');
				setMessage(
					fallback ?? 'Something went wrong while subscribing. Try again later.'
				);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-3' noValidate>
			<Input
				type='email'
				value={email}
				onChange={event => {
					setEmail(event.target.value);
					if (status !== 'idle') {
						setStatus('idle');
						setMessage(null);
					}
				}}
				placeholder='Enter your email'
				className='bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/20'
				required
				aria-label='Email address'
			/>
			<Button
				type='submit'
				disabled={isPending}
				className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg'>
				<Send className='w-4 h-4 mr-2' />
				{isPending ? 'Subscribing...' : 'Subscribe'}
			</Button>
			{message ? (
				<p
					className={`text-xs ${
						status === 'success' ? 'text-emerald-300' : 'text-rose-300'
					}`}
					aria-live='polite'>
					{message}
				</p>
			) : null}
		</form>
	);
};

export default FooterNewsletterForm;
