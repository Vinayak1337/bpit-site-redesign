import React from 'react';
import { headers } from 'next/headers';

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersList = await headers();
	const matchedPath = headersList.get('x-matched-path');
	const routeResult = headersList.get('x-nextjs-route-result');
	const isNotFoundRoute =
		routeResult === 'notFound' ||
		matchedPath === '/404' ||
		matchedPath === '/_not-found';

	if (isNotFoundRoute) {
		return (
			<html lang='en'>
				<body>{children}</body>
			</html>
		);
	}

	return <>{children}</>;
}
