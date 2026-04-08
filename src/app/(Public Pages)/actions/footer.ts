import 'server-only';

import { footerBottomLeftContent } from '@/data/header';

export async function getFooterData(): Promise<{
	bottomLeftContent: FooterBottomLeftContent;
}> {
	return {
		bottomLeftContent: footerBottomLeftContent
	};
}
