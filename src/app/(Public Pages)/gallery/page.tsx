import { getGallery } from '@/app/(Private Pages)/actions/gallery';
import GalleryCollage from '@/components/gallery/GalleryCollage';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery',
	description: 'Photo gallery of BPIT — campus life, events, festivals, labs, workshops, cultural and academic moments from the institute.',
	alternates: { canonical: '/gallery' }
};



export default async function GalleryPage() {
	return notFound();
	const galleryData = await getGallery();

	return (
		<main className='min-h-screen bg-slate-50'>
			<div className='container mx-auto px-4 py-10 md:py-14'>
				<GalleryCollage
					items={galleryData.items}
					categories={galleryData.categories}
				/>
			</div>
		</main>
	);
}
