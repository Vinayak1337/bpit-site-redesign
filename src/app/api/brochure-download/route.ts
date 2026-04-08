import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_HOSTS = new Set(['www.ipu.ac.in', 'ipu.ac.in']);

const sanitizeFilename = (value: string): string =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 80) || 'admissions-brochure';

export async function GET(request: NextRequest) {
	const urlParam = request.nextUrl.searchParams.get('url');
	const titleParam = request.nextUrl.searchParams.get('title') || 'Admissions Brochure';
	const mode = request.nextUrl.searchParams.get('mode') === 'view' ? 'view' : 'download';

	if (!urlParam) {
		return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
	}

	let remoteUrl: URL;
	try {
		remoteUrl = new URL(urlParam);
	} catch {
		return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
	}

	if (!['http:', 'https:'].includes(remoteUrl.protocol)) {
		return NextResponse.json({ error: 'Unsupported protocol' }, { status: 400 });
	}

	if (!ALLOWED_HOSTS.has(remoteUrl.hostname.toLowerCase())) {
		return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
	}

	if (!remoteUrl.pathname.toLowerCase().endsWith('.pdf')) {
		return NextResponse.json({ error: 'Only PDF brochures are supported' }, { status: 400 });
	}

	try {
		const remoteResponse = await fetch(remoteUrl.toString(), {
			redirect: 'follow',
			cache: 'no-store'
		});

		if (!remoteResponse.ok) {
			return NextResponse.json(
				{ error: `Unable to fetch brochure (${remoteResponse.status})` },
				{ status: 502 }
			);
		}

		const contentType = remoteResponse.headers.get('content-type') || 'application/pdf';
		const arrayBuffer = await remoteResponse.arrayBuffer();
		const filename = `${sanitizeFilename(titleParam)}.pdf`;
		const disposition = mode === 'view' ? 'inline' : 'attachment';

		return new NextResponse(arrayBuffer, {
			status: 200,
			headers: {
				'Content-Type': contentType,
				'Content-Disposition': `${disposition}; filename="${filename}"`,
				'Cache-Control': 'no-store'
			}
		});
	} catch {
		return NextResponse.json({ error: 'Failed to download brochure' }, { status: 500 });
	}
}
