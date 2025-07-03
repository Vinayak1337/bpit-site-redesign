import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900'>
			<div className='text-center text-white'>
				<h2 className='text-6xl font-bold mb-4'>404</h2>
				<h3 className='text-2xl font-semibold mb-4'>Page Not Found</h3>
				<p className='text-gray-300 mb-8'>
					Could not find the requested resource.
				</p>
				<Link
					href='/'
					className='bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300'>
					Return Home
				</Link>
			</div>
		</div>
	);
}
