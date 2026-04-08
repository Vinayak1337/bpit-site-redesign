import { getGallery } from '@/app/(Private Pages)/actions/gallery';
import GalleryCollage from '@/components/gallery/GalleryCollage';

export default async function GalleryPage() {
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
