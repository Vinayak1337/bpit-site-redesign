import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
	requireAdmin,
	logoutAdmin,
	createAdminUser,
	deleteAdminUser
} from '@/app/(Private Pages)/actions/admin-auth';

export default async function AdminDashboardPage() {
	const admin = await requireAdmin();
	const users = await prisma.adminUser.findMany({
		select: { id: true, email: true, role: true, createdAt: true },
		orderBy: { createdAt: 'desc' }
	});
	return (
		<div className='min-h-screen p-8 bg-gradient-to-br from-blue-50 to-white'>
			<div className='max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-blue-100 p-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-semibold text-blue-900'>
							Admin Dashboard
						</h1>
						<p className='text-sm text-blue-600'>
							Signed in as {admin.email} ({admin.role})
						</p>
					</div>
					<form action={logoutAdmin}>
						<button
							type='submit'
							className='px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium'>
							Logout
						</button>
					</form>
				</div>

				<div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{admin.role === 'ADMIN' ? (
						<div>
							<h2 className='text-lg font-semibold text-blue-900 mb-3'>
								Create User
							</h2>
							<form action={createAdminUser} className='space-y-3'>
								<div>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-blue-900'>
										Email
									</label>
									<input
										id='email'
										name='email'
										type='email'
										required
										className='mt-1 w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									/>
								</div>
								<div>
									<label
										htmlFor='name'
										className='block text-sm font-medium text-blue-900'>
										Name
									</label>
									<input
										id='name'
										name='name'
										type='text'
										className='mt-1 w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									/>
								</div>
								<div>
									<label
										htmlFor='password'
										className='block text-sm font-medium text-blue-900'>
										Password
									</label>
									<input
										id='password'
										name='password'
										type='password'
										required
										className='mt-1 w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
									/>
								</div>
								<div>
									<label
										htmlFor='role'
										className='block text-sm font-medium text-blue-900'>
										Role
									</label>
									<select
										id='role'
										name='role'
										defaultValue='EDITOR'
										className='mt-1 w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
										<option value='EDITOR'>EDITOR</option>
										<option value='ADMIN'>ADMIN</option>
									</select>
								</div>
								<button
									type='submit'
									className='px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold'>
									Create
								</button>
							</form>
						</div>
					) : null}

					<div>
						<h2 className='text-lg font-semibold text-blue-900 mb-3'>Users</h2>
						<div className='overflow-x-auto border border-blue-100 rounded-md'>
							<table className='min-w-full text-sm'>
								<thead className='bg-blue-50 text-blue-900'>
									<tr>
										<th className='text-left px-3 py-2'>Email</th>
										<th className='text-left px-3 py-2'>Role</th>
										<th className='text-left px-3 py-2'>Created</th>
										{admin.role === 'ADMIN' ? (
											<th className='text-left px-3 py-2'>Actions</th>
										) : null}
									</tr>
								</thead>
								<tbody>
									{users.map(u => (
										<tr key={u.id} className='border-t border-blue-100'>
											<td className='px-3 py-2'>{u.email}</td>
											<td className='px-3 py-2'>{u.role}</td>
											<td className='px-3 py-2'>
												{new Date(u.createdAt).toLocaleString()}
											</td>
											{admin.role === 'ADMIN' ? (
												<td className='px-3 py-2'>
													{u.id !== admin.id ? (
														<form action={deleteAdminUser}>
															<input type='hidden' name='userId' value={u.id} />
															<button
																type='submit'
																className='px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-semibold'>
																Delete
															</button>
														</form>
													) : (
														<span className='text-xs text-slate-400'>You</span>
													)}
												</td>
											) : null}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className='mt-6 text-blue-800'>
					<p className='mb-4'>Welcome! Use the quick links below to manage your website content:</p>
					
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
						<Link
							href='/admin/about'
							className='block p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors'>
							<h3 className='font-semibold text-blue-900 mb-2'>About Pages</h3>
							<p className='text-sm text-blue-700'>Edit About, Chairman Message, Principal Message, and Founder Tribute</p>
						</Link>
						
						<Link
							href='/admin/vision-mission'
							className='block p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors'>
							<h3 className='font-semibold text-green-900 mb-2'>Vision & Mission</h3>
							<p className='text-sm text-green-700'>Edit vision statement, pillars, and future aspirations</p>
						</Link>
						
						<Link
							href='/admin/home'
							className='block p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors'>
							<h3 className='font-semibold text-purple-900 mb-2'>Homepage</h3>
							<p className='text-sm text-purple-700'>Edit hero section, announcements, and events</p>
						</Link>
						
						<Link
							href='/admin/placements/overview'
							className='block p-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors'>
							<h3 className='font-semibold text-orange-900 mb-2'>Placement Overview</h3>
							<p className='text-sm text-orange-700'>Edit placement statistics, features, mission, and contact information</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
