import type { DownloadsListData } from '@/app/(Private Pages)/actions/_library-subpage-shared';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export default function DownloadsList({ data }: { data: DownloadsListData }) {
	return (
		<section className='py-8 md:py-12'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
				{data.items.map((d, i) => (
					<Card key={i} className='border-slate-200'>
						<CardContent className='p-5'>
							<div className='flex items-start gap-4'>
								<div className='shrink-0 h-12 w-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center'>
									<FileText className='h-6 w-6' />
								</div>
								<div className='min-w-0 flex-1 space-y-1'>
									<div className='flex flex-wrap items-center gap-2'>
										<h3 className='text-base font-semibold text-slate-900'>
											{d.title}
										</h3>
										{d.category ? (
											<Badge variant='outline' className='text-xs'>
												{d.category}
											</Badge>
										) : null}
									</div>
									{d.description ? (
										<p className='text-sm text-slate-600'>{d.description}</p>
									) : null}
									<div className='flex flex-wrap gap-3 text-xs text-slate-500 pt-1'>
										{d.fileType ? <span>{d.fileType}</span> : null}
										{d.fileSize ? <span>· {d.fileSize}</span> : null}
										{d.date ? <span>· {d.date}</span> : null}
									</div>
									{d.fileUrl ? (
										<Button
											asChild
											size='sm'
											variant='outline'
											className='mt-2'>
											<a href={d.fileUrl} target='_blank' rel='noreferrer'>
												<Download className='h-4 w-4 mr-1.5' /> Download
											</a>
										</Button>
									) : null}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
