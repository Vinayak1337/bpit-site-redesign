import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

export default async function AdminLogsPage() {
	await requireAdmin();
	const logs = await prisma.auditLog.findMany({
		orderBy: { createdAt: 'desc' },
		include: { actor: true, changes: true },
		take: 200
	});

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6 lg:p-8'>
			<div className='max-w-6xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-md border border-blue-100 p-4 sm:p-6'>
				<h1 className='text-xl sm:text-2xl font-semibold text-blue-900'>
					Audit Logs
				</h1>

				<div className='mt-4 space-y-3 md:hidden'>
					{logs.map(log => (
						<article
							key={log.id}
							className='rounded-lg border border-blue-100 bg-white p-3 shadow-sm'>
							<div className='flex flex-wrap items-center gap-2 text-xs text-slate-500'>
								<span>{new Date(log.createdAt).toLocaleString()}</span>
								<span className='rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-700'>
									{log.action}
								</span>
								<span className='rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700'>
									{log.resourceType}
								</span>
							</div>
							<p className='mt-2 break-words text-sm font-medium text-blue-900'>
								{log.summary ?? 'No summary'}
							</p>
							<p className='mt-1 break-all text-xs text-slate-600'>
								{log.actor?.email ?? 'Unknown'}
							</p>
							{log.changes.length > 0 ? (
								<div className='mt-3 space-y-2'>
									{log.changes.map(change => (
										<details
											key={change.id}
											className='rounded border border-slate-200 p-2 text-xs text-slate-600'>
											<summary className='cursor-pointer select-none text-slate-700'>
												Change details
											</summary>
											<div className='mt-2 space-y-2'>
												<p className='break-all font-mono text-[11px]'>
													Resource ID: {change.resourceId}
												</p>
												<pre className='max-h-48 overflow-auto whitespace-pre-wrap break-words rounded bg-slate-50 p-2'>
													<code>
														{JSON.stringify(change.previousData, null, 2)}
													</code>
												</pre>
												<pre className='max-h-48 overflow-auto whitespace-pre-wrap break-words rounded bg-slate-50 p-2'>
													<code>{JSON.stringify(change.newData, null, 2)}</code>
												</pre>
											</div>
										</details>
									))}
								</div>
							) : null}
						</article>
					))}
				</div>

				<div className='mt-6 hidden overflow-x-auto border border-blue-100 rounded-md md:block'>
					<table className='min-w-[60rem] text-sm'>
						<thead className='bg-blue-50 text-blue-900'>
							<tr>
								<th className='text-left px-3 py-2'>Time</th>
								<th className='text-left px-3 py-2'>Actor</th>
								<th className='text-left px-3 py-2'>Action</th>
								<th className='text-left px-3 py-2'>Resource</th>
								<th className='text-left px-3 py-2'>Summary</th>
								<th className='text-left px-3 py-2'>Changes</th>
							</tr>
						</thead>
						<tbody>
							{logs.map(log => (
								<tr key={log.id} className='border-t border-blue-100 align-top'>
									<td className='px-3 py-2 whitespace-nowrap'>
										{new Date(log.createdAt).toLocaleString()}
									</td>
									<td className='px-3 py-2'>{log.actor?.email ?? 'Unknown'}</td>
									<td className='px-3 py-2'>{log.action}</td>
									<td className='px-3 py-2'>{log.resourceType}</td>
									<td className='px-3 py-2'>{log.summary ?? '-'}</td>
									<td className='px-3 py-2'>
										{log.changes.length === 0 ? (
											<span className='text-slate-500'>-</span>
										) : (
											<div className='space-y-2'>
												{log.changes.map(change => (
													<div
														key={change.id}
														className='rounded border border-slate-200 p-2'>
														<div className='text-xs text-slate-600 mb-1'>
															Resource ID:{' '}
															<span className='font-mono'>
																{change.resourceId}
															</span>{' '}
															{change.field ? `· Field: ${change.field}` : ''}
														</div>
														<details className='text-xs text-slate-600'>
															<summary className='cursor-pointer select-none rounded bg-slate-100 px-2 py-1 text-slate-700 hover:bg-slate-200'>
																Show change details
															</summary>
															<div className='mt-2 grid grid-cols-1 gap-2 md:grid-cols-2'>
																<pre className='max-h-64 overflow-auto whitespace-pre-wrap break-words rounded bg-slate-50 p-2'>
																	<code>
																		{JSON.stringify(
																			change.previousData,
																			null,
																			2
																		)}
																	</code>
																</pre>
																<pre className='max-h-64 overflow-auto whitespace-pre-wrap break-words rounded bg-slate-50 p-2'>
																	<code>
																		{JSON.stringify(change.newData, null, 2)}
																	</code>
																</pre>
															</div>
														</details>
													</div>
												))}
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
