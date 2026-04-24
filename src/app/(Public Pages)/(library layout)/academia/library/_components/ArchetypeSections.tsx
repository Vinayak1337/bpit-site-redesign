'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Sparkles,
	Mail,
	Phone,
	MapPin,
	Clock,
	ExternalLink,
	Download,
	FileText,
	User
} from 'lucide-react';
import type {
	SubHeroData,
	SimpleContentData,
	StaffListData,
	AdvisoryListData,
	DownloadsListData,
	UsefulLinksListData,
	ContactData
} from '@/app/(Private Pages)/actions/_library-subpage-shared';

function Ic({ name, className }: { name: string; className?: string }) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Comp = (Icons as any)[name] ?? Icons.BookOpen;
	return <Comp className={className} />;
}

// -------- Sub Hero --------

export function SubHero({ data }: { data: SubHeroData }) {
	const hasBg = !!data.backgroundImage;
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className={`relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br ${data.gradient || 'from-blue-50 to-indigo-100'} p-6 sm:p-8`}
		>
			{hasBg ? (
				<div className='absolute inset-0 opacity-20'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={data.backgroundImage!}
						alt=''
						className='w-full h-full object-cover'
					/>
				</div>
			) : null}
			<div className='relative'>
				{data.eyebrow ? (
					<Badge
						variant='secondary'
						className='bg-white/70 text-blue-700 border border-blue-100 px-3 py-1 text-xs sm:text-sm font-medium'
					>
						<Sparkles className='w-3 h-3 mr-1' />
						{data.eyebrow}
					</Badge>
				) : null}
				<h1 className='mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
					{data.title}
				</h1>
				{data.subtitle ? (
					<p className='mt-3 text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed'>
						{data.subtitle}
					</p>
				) : null}
			</div>
		</motion.div>
	);
}

// -------- Simple content (hero + sections grid + body) --------

export function SimpleContent({ data }: { data: SimpleContentData }) {
	return (
		<div className='space-y-6 md:space-y-8'>
			{data.heading || data.intro || data.eyebrow ? (
				<div>
					{data.eyebrow ? (
						<span className='text-xs sm:text-sm font-semibold uppercase tracking-wide text-blue-700'>
							{data.eyebrow}
						</span>
					) : null}
					{data.heading ? (
						<h2 className='mt-1 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900'>
							{data.heading}
						</h2>
					) : null}
					{data.intro ? (
						<p className='mt-2 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl'>
							{data.intro}
						</p>
					) : null}
				</div>
			) : null}
			{data.sections.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
					{data.sections.map((s, i) => (
						<motion.div
							key={`${s.title}-${i}`}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.05 }}
						>
							<Card className='h-full hover:shadow-lg transition-shadow'>
								<CardContent className='flex items-start gap-4 pt-6'>
									<div className='bg-blue-50 p-3 rounded-lg text-blue-700 shrink-0'>
										<Ic name={s.icon} className='w-5 h-5 sm:w-6 sm:h-6' />
									</div>
									<div className='min-w-0'>
										<h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-1'>
											{s.title}
										</h3>
										{s.description ? (
											<p className='text-sm text-gray-600 leading-relaxed'>
												{s.description}
											</p>
										) : null}
										{s.note ? (
											<p className='mt-2 text-xs text-blue-700 bg-blue-50 rounded-md px-2 py-1 inline-block'>
												{s.note}
											</p>
										) : null}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			) : null}
			{data.body ? (
				<Card className='bg-blue-50/50 border-blue-100'>
					<CardContent className='pt-6'>
						<p className='text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap'>
							{data.body}
						</p>
					</CardContent>
				</Card>
			) : null}
		</div>
	);
}

// -------- Staff list --------

export function StaffList({ data }: { data: StaffListData }) {
	return (
		<div className='grid gap-4'>
			{data.items.map((s, i) => (
				<Card key={`${s.name}-${i}`} className='hover:shadow-md transition-shadow'>
					<CardContent className='p-6'>
						<div className='flex flex-col md:flex-row gap-4'>
							<div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden'>
								{s.avatar ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img src={s.avatar} alt={s.name} className='w-full h-full object-cover' />
								) : (
									<User className='h-10 w-10 text-blue-600' />
								)}
							</div>
							<div className='flex-1 min-w-0'>
								<h3 className='text-lg sm:text-xl font-semibold text-gray-900'>{s.name}</h3>
								<p className='text-blue-600 font-medium mb-2'>{s.role}</p>
								{s.qualification ? (
									<p className='text-sm text-gray-600'>
										<span className='font-medium'>Qualification:</span> {s.qualification}
									</p>
								) : null}
								{s.specialization ? (
									<p className='text-sm text-gray-600 mt-1'>
										<span className='font-medium'>Specialization:</span> {s.specialization}
									</p>
								) : null}
								<div className='flex flex-col sm:flex-row gap-3 mt-3 text-sm'>
									{s.email ? (
										<span className='flex items-center gap-2 text-gray-700'>
											<Mail className='h-4 w-4 text-gray-500' />
											<span className='break-all'>{s.email}</span>
										</span>
									) : null}
									{s.phone ? (
										<span className='flex items-center gap-2 text-gray-700'>
											<Phone className='h-4 w-4 text-gray-500' />
											{s.phone}
										</span>
									) : null}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

// -------- Advisory list --------

export function AdvisoryList({ data }: { data: AdvisoryListData }) {
	return (
		<div className='grid gap-4'>
			{data.items.map((m, i) => (
				<Card key={`${m.name}-${i}`} className='hover:shadow-md transition-shadow'>
					<CardContent className='p-6'>
						<div className='flex items-start gap-4'>
							<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden'>
								{m.avatar ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img src={m.avatar} alt={m.name} className='w-full h-full object-cover' />
								) : (
									<User className='h-8 w-8 text-blue-600' />
								)}
							</div>
							<div className='flex-1 min-w-0'>
								<h3 className='text-lg font-semibold text-gray-900'>{m.name}</h3>
								<p className='text-blue-600 font-medium'>{m.role}</p>
								{m.designation ? (
									<p className='text-sm text-gray-600 mt-1'>{m.designation}</p>
								) : null}
								<div className='flex flex-col sm:flex-row gap-3 mt-2 text-sm'>
									{m.email ? (
										<span className='flex items-center gap-2 text-gray-700'>
											<Mail className='h-4 w-4 text-gray-500' />
											<span className='break-all'>{m.email}</span>
										</span>
									) : null}
									{m.phone ? (
										<span className='flex items-center gap-2 text-gray-700'>
											<Phone className='h-4 w-4 text-gray-500' />
											{m.phone}
										</span>
									) : null}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

// -------- Downloads list --------

export function DownloadsList({ data }: { data: DownloadsListData }) {
	return (
		<div className='grid gap-3'>
			{data.items.map((d, i) => (
				<Card key={`${d.title}-${i}`} className='hover:shadow-md transition-shadow'>
					<CardContent className='p-5'>
						<div className='flex flex-col sm:flex-row items-start sm:justify-between gap-4'>
							<div className='flex items-start gap-3 flex-1 min-w-0'>
								<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0'>
									<FileText className='h-6 w-6 text-blue-600' />
								</div>
								<div className='flex-1 min-w-0'>
									<h3 className='font-semibold text-gray-900 break-words'>{d.title}</h3>
									{d.description ? (
										<p className='text-sm text-gray-600 mt-1 break-words'>{d.description}</p>
									) : null}
									<div className='flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500'>
										{d.fileType ? <span className='font-medium'>{d.fileType}</span> : null}
										{d.fileSize ? <span>{d.fileSize}</span> : null}
										{d.date ? <span>{d.date}</span> : null}
										{d.category ? (
											<span className='bg-blue-100 text-blue-800 px-2 py-0.5 rounded'>
												{d.category}
											</span>
										) : null}
									</div>
								</div>
							</div>
							{d.fileUrl ? (
								<Button asChild size='sm' className='shrink-0 w-full sm:w-auto'>
									<a href={d.fileUrl} target='_blank' rel='noopener noreferrer'>
										<Download className='h-4 w-4 mr-2' /> Download
									</a>
								</Button>
							) : (
								<Button size='sm' variant='outline' disabled className='shrink-0 w-full sm:w-auto'>
									<Download className='h-4 w-4 mr-2' /> Unavailable
								</Button>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

// -------- Useful links list --------

export function UsefulLinksList({ data }: { data: UsefulLinksListData }) {
	const groups = data.items.reduce<Record<string, typeof data.items>>((acc, item) => {
		const key = item.category || 'Other';
		(acc[key] = acc[key] || []).push(item);
		return acc;
	}, {});
	return (
		<div className='space-y-6'>
			{Object.entries(groups).map(([category, items]) => (
				<Card key={category}>
					<CardHeader>
						<CardTitle className='text-base sm:text-lg'>{category}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid gap-3'>
							{items.map((link, i) => (
								<div
									key={`${link.title}-${i}`}
									className='border rounded-lg p-4 hover:shadow-md transition-shadow'
								>
									<div className='flex flex-col sm:flex-row items-start sm:justify-between gap-3'>
										<div className='flex-1 min-w-0'>
											<h3 className='font-semibold text-gray-900 break-words'>{link.title}</h3>
											{link.description ? (
												<p className='text-sm text-gray-600 mt-1 break-words'>{link.description}</p>
											) : null}
											{link.url ? (
												<p className='text-xs text-blue-600 font-mono break-all mt-1'>{link.url}</p>
											) : null}
										</div>
										{link.url ? (
											<Button asChild size='sm' variant='outline' className='shrink-0 w-full sm:w-auto'>
												<a href={link.url} target='_blank' rel='noopener noreferrer'>
													<ExternalLink className='h-4 w-4 mr-2' /> Visit
												</a>
											</Button>
										) : null}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

// -------- Contact block --------

export function ContactBlock({ data }: { data: ContactData }) {
	return (
		<div className='grid gap-4 md:grid-cols-2'>
			<Card>
				<CardHeader>
					<CardTitle className='text-base sm:text-lg'>Contact Information</CardTitle>
					<CardDescription>Reach out to the library team</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					{data.address ? (
						<div className='flex items-start gap-3'>
							<MapPin className='h-5 w-5 text-blue-600 mt-0.5' />
							<div>
								<h4 className='font-medium text-gray-900'>Address</h4>
								<p className='text-gray-600 text-sm whitespace-pre-wrap'>{data.address}</p>
							</div>
						</div>
					) : null}
					{data.phone ? (
						<div className='flex items-start gap-3'>
							<Phone className='h-5 w-5 text-blue-600 mt-0.5' />
							<div>
								<h4 className='font-medium text-gray-900'>Phone</h4>
								<p className='text-gray-600 text-sm whitespace-pre-wrap'>{data.phone}</p>
							</div>
						</div>
					) : null}
					{data.email ? (
						<div className='flex items-start gap-3'>
							<Mail className='h-5 w-5 text-blue-600 mt-0.5' />
							<div>
								<h4 className='font-medium text-gray-900'>Email</h4>
								<p className='text-gray-600 text-sm whitespace-pre-wrap break-all'>
									{data.email}
								</p>
							</div>
						</div>
					) : null}
					{data.hours ? (
						<div className='flex items-start gap-3'>
							<Clock className='h-5 w-5 text-blue-600 mt-0.5' />
							<div>
								<h4 className='font-medium text-gray-900'>Operating Hours</h4>
								<p className='text-gray-600 text-sm whitespace-pre-wrap'>{data.hours}</p>
							</div>
						</div>
					) : null}
				</CardContent>
			</Card>
			{data.mapEmbed ? (
				<Card>
					<CardHeader>
						<CardTitle className='text-base sm:text-lg'>Location</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className='rounded-lg overflow-hidden border aspect-video'
							dangerouslySetInnerHTML={{ __html: data.mapEmbed }}
						/>
					</CardContent>
				</Card>
			) : null}
		</div>
	);
}
