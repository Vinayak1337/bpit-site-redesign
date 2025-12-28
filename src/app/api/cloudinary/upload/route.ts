import { NextResponse } from 'next/server';
import { v2 as cloudinary, type UploadApiOptions, type UploadApiResponse } from 'cloudinary';

const cloudinaryCloudName =
	process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY ?? '';
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET ?? '';

const isCloudinaryConfigured =
	cloudinaryCloudName.length > 0 &&
	cloudinaryApiKey.length > 0 &&
	cloudinaryApiSecret.length > 0;

if (isCloudinaryConfigured) {
	cloudinary.config({
		cloud_name: cloudinaryCloudName,
		api_key: cloudinaryApiKey,
		api_secret: cloudinaryApiSecret,
		secure: true
	});
}

const allowedResourceTypes = new Set(['image', 'video', 'auto']);

export async function POST(request: Request) {
	if (!isCloudinaryConfigured) {
		return NextResponse.json(
			{ error: { message: 'Cloudinary configuration missing' } },
			{ status: 500 }
		);
	}

	const formData = await request.formData();
	const fileEntry = formData.get('file');
	if (!(fileEntry instanceof File)) {
		return NextResponse.json(
			{ error: { message: 'Missing file' } },
			{ status: 400 }
		);
	}

	const folder = extractString(formData.get('folder'));
	const uploadPreset = extractString(formData.get('uploadPreset'));
	const resourceTypeEntry = extractString(formData.get('resourceType'));
	const resourceType = allowedResourceTypes.has(resourceTypeEntry ?? '')
		? (resourceTypeEntry as 'image' | 'video' | 'auto')
		: 'image';

	const arrayBuffer = await fileEntry.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const options: UploadApiOptions = { resource_type: resourceType };
	if (folder) {
		options.folder = folder;
	}
	if (uploadPreset) {
		options.upload_preset = uploadPreset;
	}

	try {
		const result = await uploadBuffer(buffer, options);
		return NextResponse.json({ secureUrl: result.secure_url }, { status: 201 });
	} catch (error) {
		const message = extractUploadErrorMessage(error);
		console.error('Cloudinary upload failed', error);
		return NextResponse.json(
			{ error: { message } },
			{ status: 500 }
		);
	}
}

const extractString = (value: FormDataEntryValue | null): string | undefined => {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

const uploadBuffer = (
	buffer: Buffer,
	options: UploadApiOptions
): Promise<UploadApiResponse> => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
			if (error) {
				reject(error);
				return;
			}
			if (!result) {
				reject(new Error('Upload failed without result'));
				return;
			}
			resolve(result);
		});
		stream.end(buffer);
	});
};

const extractUploadErrorMessage = (error: unknown): string => {
	if (typeof error === 'object' && error !== null) {
		if ('message' in error && typeof (error as { message: unknown }).message === 'string') {
			return (error as { message: string }).message;
		}
		if ('error' in error && typeof (error as { error: unknown }).error === 'object') {
			const nested = (error as { error: unknown }).error;
			if (
				typeof nested === 'object' &&
				nested !== null &&
				'message' in nested &&
				typeof (nested as { message: unknown }).message === 'string'
			) {
				return (nested as { message: string }).message;
			}
		}
	}
	return 'Cloudinary upload failed';
};

