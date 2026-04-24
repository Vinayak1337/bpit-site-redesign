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
import { Separator } from '@/components/ui/separator';
import { MapPin, Library, Sparkles } from 'lucide-react';
import type {
	LibraryHeroData,
	LibraryStatsData,
	LibraryMissionData,
	LibraryFeaturesData,
	LibraryInfoData
} from '@/app/(Private Pages)/actions/academia-library';

function Ic({ name, className }: { name: string; className?: string }) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Comp = (Icons as any)[name] ?? Icons.BookOpen;
	return <Comp className={className} />;
}

export function LibraryHeader({ data }: { data: LibraryHeroData }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='text-center space-y-3'>
			<Badge
				variant='secondary'
				className='bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 text-xs sm:text-sm font-medium'>
				<Sparkles className='w-3 h-3' />
				{data.eyebrow}
			</Badge>
			<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900'>
				{data.title}{' '}
				<span className='bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
					{data.titleAccent}
				</span>
			</h1>
			<p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
				{data.subtitle}
			</p>
		</motion.div>
	);
}

export function LibraryStats({ data }: { data: LibraryStatsData }) {
	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
			{data.items.map((s, index) => (
				<motion.div
					key={`${s.label}-${index}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: index * 0.08 }}>
					<Card className='h-full text-center hover:shadow-md transition-shadow'>
						<CardContent className='flex flex-col items-center gap-2 py-2'>
							<div className={`inline-flex p-3 rounded-lg ${s.accent}`}>
								<Ic name={s.icon} className='w-6 h-6 sm:w-7 sm:h-7' />
							</div>
							<div className='text-xl sm:text-2xl font-bold text-gray-900'>
								{s.value}
							</div>
							<div className='text-xs sm:text-sm text-gray-600'>{s.label}</div>
						</CardContent>
					</Card>
				</motion.div>
			))}
		</div>
	);
}

export function LibraryMission({ data }: { data: LibraryMissionData }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}>
			<Card className='bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-100'>
				<CardHeader>
					<div className='flex items-center gap-2 text-blue-700'>
						<Library className='w-5 h-5' />
						<span className='text-xs sm:text-sm font-semibold uppercase tracking-wide'>
							{data.eyebrow}
						</span>
					</div>
					<CardTitle className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-2'>
						{data.heading}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed'>
						{data.body}
					</p>
				</CardContent>
			</Card>
		</motion.div>
	);
}

export function LibraryFeatures({ data }: { data: LibraryFeaturesData }) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
			{data.items.map((f, index) => (
				<motion.div
					key={`${f.title}-${index}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: index * 0.08 }}>
					<Card className='h-full hover:shadow-lg transition-shadow'>
						<CardContent className='flex items-start gap-4'>
							<div className='bg-blue-50 p-3 rounded-lg text-blue-700 shrink-0'>
								<Ic name={f.icon} className='w-5 h-5 sm:w-6 sm:h-6' />
							</div>
							<div className='min-w-0'>
								<h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-1'>
									{f.title}
								</h3>
								<p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
									{f.description}
								</p>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			))}
		</div>
	);
}

export function LibraryInfo({ data }: { data: LibraryInfoData }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}>
			<Card>
				<CardHeader>
					<CardTitle className='text-lg sm:text-xl font-bold text-gray-900'>
						{data.heading}
					</CardTitle>
					<CardDescription>{data.description}</CardDescription>
				</CardHeader>
				<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='flex items-start gap-3'>
						<div className='bg-blue-50 p-2 rounded-md text-blue-700 shrink-0'>
							<MapPin className='w-5 h-5' />
						</div>
						<div className='min-w-0'>
							<h3 className='text-sm sm:text-base font-semibold text-gray-900 mb-1'>
								{data.locationTitle}
							</h3>
							{data.locationLine1 ? (
								<p className='text-sm text-gray-600'>{data.locationLine1}</p>
							) : null}
							{data.locationLine2 ? (
								<p className='text-sm text-gray-600'>{data.locationLine2}</p>
							) : null}
						</div>
					</div>
					<div className='flex items-start gap-3'>
						<div className='bg-blue-50 p-2 rounded-md text-blue-700 shrink-0'>
							<Sparkles className='w-5 h-5' />
						</div>
						<div className='min-w-0'>
							<h3 className='text-sm sm:text-base font-semibold text-gray-900 mb-2'>
								{data.quickLinksHeading}
							</h3>
							<div className='flex flex-wrap gap-1.5'>
								{data.quickLinks.map((ql, i) => (
									<Badge
										key={`${ql.label}-${i}`}
										variant='outline'
										className='font-normal'>
										{ql.label}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

export function LibraryHub(props: {
	hero: LibraryHeroData;
	stats: LibraryStatsData;
	mission: LibraryMissionData;
	features: LibraryFeaturesData;
	info: LibraryInfoData;
}) {
	return (
		<div className='space-y-8 md:space-y-10'>
			<LibraryHeader data={props.hero} />
			<Separator />
			<LibraryStats data={props.stats} />
			<LibraryMission data={props.mission} />
			<LibraryFeatures data={props.features} />
			<LibraryInfo data={props.info} />
		</div>
	);
}
