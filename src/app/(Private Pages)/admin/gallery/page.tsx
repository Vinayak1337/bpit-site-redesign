import React from 'react';
import { getGallery } from '@/app/(Private Pages)/actions/gallery';
import GalleryEditor from './components/GalleryEditor';

export default async function AdminGalleryPage() {
	const data = await getGallery();

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Photo & Video Gallery</h1>
					<p className="text-muted-foreground mt-2">
						Manage your gallery images and categories.
					</p>
				</div>
			</div>
			<GalleryEditor initialData={data} />
		</div>
	);
}

