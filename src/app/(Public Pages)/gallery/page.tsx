import { getGallery } from '@/app/(Private Pages)/actions/gallery';
import GalleryCollage from '@/components/gallery/GalleryCollage';

export default async function GalleryPage() {
	const galleryData = await getGallery();

	return (
		<GalleryCollage
			items={galleryData.items}
			categories={galleryData.categories}
		/>
	);
}
