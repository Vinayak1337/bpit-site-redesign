import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const requestSchema = z.object({
	email: z.string().email()
});

const smtpConfigSchema = z.object({
	host: z.string().min(1),
	port: z.number().int().positive(),
	secure: z.boolean(),
	user: z.string().min(1),
	pass: z.string().min(1),
	from: z.string().min(1),
	to: z.string().min(1)
});

const resolveSmtpConfig = () => {
	const portValue = Number(process.env.SMTP_PORT ?? '465');
	const secureFlag =
		process.env.SMTP_SECURE?.toLowerCase() === 'true' || portValue === 465;

	const rawConfig = {
		host: process.env.SMTP_HOST ?? '',
		port: Number.isNaN(portValue) ? 465 : portValue,
		secure: secureFlag,
		user: process.env.SMTP_USER ?? '',
		pass: process.env.SMTP_PASSWORD ?? '',
		from: process.env.SMTP_FROM ?? process.env.SMTP_USER ?? '',
		to: process.env.SMTP_TO ?? process.env.SMTP_USER ?? ''
	};

	return smtpConfigSchema.safeParse(rawConfig);
};

export async function POST(request: Request) {
	const body = await request.json().catch(() => null);
	const parsedBody = requestSchema.safeParse(body);

	if (!parsedBody.success) {
		return NextResponse.json(
			{ message: 'Please provide a valid email address.' },
			{ status: 400 }
		);
	}

	const smtpConfiguration = resolveSmtpConfig();

	if (!smtpConfiguration.success) {
		return NextResponse.json(
			{
				message:
					'SMTP is not configured yet. Set SMTP_* environment variables to enable subscriptions.'
			},
			{ status: 500 }
		);
	}

	try {
		const transporter = nodemailer.createTransport({
			host: smtpConfiguration.data.host,
			port: smtpConfiguration.data.port,
			secure: smtpConfiguration.data.secure,
			auth: {
				user: smtpConfiguration.data.user,
				pass: smtpConfiguration.data.pass
			}
		});

		await transporter.sendMail({
			from: smtpConfiguration.data.from,
			to: smtpConfiguration.data.to,
			subject: 'New newsletter subscription',
			text: `A new visitor subscribed to the BPIT newsletter: ${parsedBody.data.email}`,
			html: `<p>A new visitor subscribed to the BPIT newsletter:</p><p><strong>${parsedBody.data.email}</strong></p>`
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: 'Unable to send subscription email.';
		return NextResponse.json({ message }, { status: 500 });
	}
}
