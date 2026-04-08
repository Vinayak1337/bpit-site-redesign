import Link from 'next/link';
import './not-found.css';

export default function NotFound() {
	return (
		<div className='nf-page'>
			<div className='nf-content'>
				<h2 className='nf-code'>404</h2>
				<h3 className='nf-title'>Page Not Found</h3>
				<p className='nf-desc'>Could not find the requested resource.</p>
				<Link href='/' className='nf-home-link'>
					Return Home
				</Link>
			</div>
		</div>
	);
}
