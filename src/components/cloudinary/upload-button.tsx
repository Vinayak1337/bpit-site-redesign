'use client';

import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

interface CloudinaryUploadButtonProps {
	onUpload: (url: string) => void;
	buttonText?: string;
	folder?: string;
	className?: string;
	onError?: (message: string) => void;
	resourceType?: 'image' | 'video' | 'auto';
}

export default function CloudinaryUploadButton({
	onUpload,
	buttonText = 'Upload',
	folder,
	className,
	onError,
	resourceType = 'image'
}: CloudinaryUploadButtonProps) {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
	const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
	const uploadFolder =
		folder ?? process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER ?? undefined;

	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const missingConfig = !cloudName;
	const uploadEndpoint = '/api/cloudinary/upload';

	const handleButtonClick = () => {
		if (missingConfig || isUploading) return;
		fileInputRef.current?.click();
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file || missingConfig) {
			event.target.value = '';
			return;
		}

		const formData = new FormData();
		formData.append('file', file);
		formData.append('resourceType', resourceType);
		if (uploadFolder) {
			formData.append('folder', uploadFolder);
		}
		if (uploadPreset) {
			formData.append('uploadPreset', uploadPreset);
		}

		setIsUploading(true);
		try {
			const response = await fetch(uploadEndpoint, {
				method: 'POST',
				body: formData
			});
			let payload: unknown;
			try {
				payload = await response.json();
			} catch (parseError) {
				payload = undefined;
			}
			if (!response.ok) {
				const message = extractErrorMessage(payload) ?? 'Upload failed';
				console.error('Cloudinary upload failed', payload);
				onError?.(message);
				return;
			}
			if (isUploadSuccess(payload)) {
				onUpload(payload.secureUrl);
				return;
			}
			console.error('Cloudinary upload failed: missing secureUrl', payload);
			onError?.('Upload failed');
		} catch (error) {
			console.error('Cloudinary upload error', error);
			onError?.('Upload failed');
		} finally {
			setIsUploading(false);
			event.target.value = '';
		}
	};

	const displayText = missingConfig
		? 'Configure Cloudinary'
		: isUploading
        ? 'Uploading...'
		: buttonText;
	const disabled = missingConfig || isUploading;
	const accept =
		resourceType === 'video'
			? 'video/*'
			: resourceType === 'auto'
			? 'image/*,video/*'
			: 'image/*';

	return (
		<>
			<Button
				type='button'
				variant='outline'
				size='sm'
				disabled={disabled}
				onClick={handleButtonClick}
				className={className}>
				<UploadCloud className='mr-2 h-4 w-4' />
				{displayText}
			</Button>
			<input
				type='file'
				accept={accept}
				ref={fileInputRef}
				onChange={handleFileChange}
				className='hidden'
				aria-hidden='true'
				tabIndex={-1}
			/>
		</>
	);
}

interface UploadSuccessPayload {
	secureUrl: string;
}

const isUploadSuccess = (payload: unknown): payload is UploadSuccessPayload => {
	return (
		typeof payload === 'object' &&
		payload !== null &&
		'secureUrl' in payload &&
		typeof (payload as { secureUrl: unknown }).secureUrl === 'string'
	);
};

const extractErrorMessage = (payload: unknown): string | undefined => {
	if (typeof payload !== 'object' || payload === null) return undefined;
	if (
		'error' in payload &&
		typeof payload.error === 'object' &&
		payload.error
	) {
		const errorObj = payload.error as { message?: unknown };
		if (typeof errorObj.message === 'string') return errorObj.message;
	}
	if (
		'message' in payload &&
		typeof (payload as { message: unknown }).message === 'string'
	) {
		return (payload as { message: string }).message;
	}
	return undefined;
};

