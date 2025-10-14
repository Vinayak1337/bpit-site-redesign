import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
	// TODO: add auth check to restrict to admins
	const body = await req.json().catch(() => ({}));
	const { timestamp, folder, eager, public_id } = body || {};

	const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
	const apiKey = process.env.CLOUDINARY_API_KEY;
	const apiSecret = process.env.CLOUDINARY_API_SECRET;

	if (!cloudName || !apiKey || !apiSecret) {
		return NextResponse.json({ error: 'Cloudinary env not configured' }, { status: 500 });
	}

	const params = new URLSearchParams();
	if (eager) params.append('eager', eager);
	if (folder) params.append('folder', folder);
	if (public_id) params.append('public_id', public_id);
	params.append('timestamp', String(timestamp || Math.floor(Date.now() / 1000)));

	const toSign = params.toString() + apiSecret;
	const signature = crypto.createHash('sha1').update(toSign).digest('hex');

	return NextResponse.json({
		cloudName,
		apiKey,
		signature,
		timestamp: Number(params.get('timestamp'))
	});
}




