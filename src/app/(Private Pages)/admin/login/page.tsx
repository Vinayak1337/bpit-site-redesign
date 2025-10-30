import { loginAdmin } from '@/app/(Private Pages)/admin/actions/admin-auth';

export default async function AdminLoginPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
    const sp = (await searchParams) ?? {};
    const error = sp.error;
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white'>
			<div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-blue-100'>
				<h1 className='text-2xl font-semibold text-blue-900 mb-2'>Admin Login</h1>
				<p className='text-sm text-blue-600 mb-6'>Sign in to manage website content</p>
				{error ? (
					<div className='mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3'>Invalid credentials</div>
				) : null}
				<form action={loginAdmin} className='space-y-4'>
					<div>
						<label htmlFor='email' className='block text-sm font-medium text-blue-900'>Email</label>
						<input id='email' name='email' type='email' required className='mt-1 w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
					</div>
					<div>
						<label htmlFor='password' className='block text-sm font-medium text-blue-900'>Password</label>
						<input id='password' name='password' type='password' required className='mt-1 w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
					</div>
					<button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2'>Sign in</button>
				</form>
			</div>
		</div>
	);
}


