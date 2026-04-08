'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type {
	AdmissionsFaqContact,
	AdmissionsFaqIntro,
	AdmissionsFaqItem
} from '@/app/(Private Pages)/actions/admissions';

type Props = {
	intro?: AdmissionsFaqIntro | null;
	items?: AdmissionsFaqItem[];
	contact?: AdmissionsFaqContact | null;
};

const EMPTY_INTRO: AdmissionsFaqIntro = {
	badge: '',
	title: '',
	subtitle: '',
	browseTitle: ''
};

const EMPTY_CONTACT: AdmissionsFaqContact = {
	title: '',
	description: '',
	phone: '',
	email: '',
	address: ''
};

export default function FaqExplorer({ intro, items = [], contact }: Props) {
	const [openId, setOpenId] = useState<number | null>(null);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const safeIntro = intro ?? EMPTY_INTRO;
	const safeContact = contact ?? EMPTY_CONTACT;
	const categories = useMemo(
		() => Array.from(new Set(items.map(item => item.category))),
		[items]
	);
	const hasIntroSection = Boolean(
		safeIntro.badge || safeIntro.title || safeIntro.subtitle
	);
	const hasBrowseSection = Boolean(safeIntro.browseTitle || categories.length > 0);
	const hasContactSection = Boolean(
		safeContact.title ||
			safeContact.description ||
			safeContact.phone ||
			safeContact.email ||
			safeContact.address
	);

	const filteredItems = useMemo(
		() =>
			activeCategory ? items.filter(item => item.category === activeCategory) : items,
		[items, activeCategory]
	);

	return (
		<div className='space-y-6'>
			{hasIntroSection ? (
				<section className='rounded-xl border border-slate-200 bg-white p-6'>
					{safeIntro.badge ? (
						<div className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700'>
							<HelpCircle className='h-4 w-4' />
							{safeIntro.badge}
						</div>
					) : null}
					{safeIntro.title ? (
						<h1 className='mt-3 text-3xl font-bold text-slate-900 md:text-4xl'>{safeIntro.title}</h1>
					) : null}
					{safeIntro.subtitle ? <p className='mt-2 text-slate-600'>{safeIntro.subtitle}</p> : null}
				</section>
			) : null}

			{hasBrowseSection ? (
				<section className='rounded-xl border border-slate-200 bg-white p-5'>
					{safeIntro.browseTitle ? (
						<h2 className='text-lg font-semibold text-slate-900'>{safeIntro.browseTitle}</h2>
					) : null}
					<div className='mt-3 flex flex-wrap gap-2'>
						<Button
							variant={activeCategory === null ? 'default' : 'outline'}
							onClick={() => {
								setActiveCategory(null);
								setOpenId(null);
							}}
							className={activeCategory === null ? 'bg-blue-700 hover:bg-blue-800' : ''}>
							All
						</Button>
						{categories.map(category => (
							<Button
								key={category}
								variant={activeCategory === category ? 'default' : 'outline'}
								onClick={() => {
									setActiveCategory(activeCategory === category ? null : category);
									setOpenId(null);
								}}
								className={activeCategory === category ? 'bg-blue-700 hover:bg-blue-800' : ''}>
								{category}
							</Button>
						))}
					</div>
				</section>
			) : null}

			<section className='space-y-3'>
				{filteredItems.map(item => {
					const isOpen = item.id !== undefined && openId === item.id;
					return (
						<article key={item.id} className='overflow-hidden rounded-xl border border-slate-200 bg-white'>
							<button
								type='button'
								onClick={() => setOpenId(isOpen ? null : (item.id ?? null))}
								className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left'>
								<div>
									<h3 className='text-sm font-semibold text-slate-900 md:text-base'>{item.question}</h3>
									<p className='mt-1 text-xs text-slate-500'>{item.category}</p>
								</div>
								{isOpen ? <ChevronUp className='h-4 w-4 text-slate-500' /> : <ChevronDown className='h-4 w-4 text-slate-500' />}
							</button>
							{isOpen ? (
								<div className='border-t border-slate-200 px-5 py-4 text-sm text-slate-700'>{item.answer}</div>
							) : null}
						</article>
					);
				})}
			</section>

			{hasContactSection ? (
				<section className='rounded-xl border border-blue-200 bg-blue-50 p-6'>
					{safeContact.title ? (
						<h2 className='text-lg font-semibold text-blue-900'>{safeContact.title}</h2>
					) : null}
					{safeContact.description ? (
						<p className='mt-2 text-sm text-blue-900/90'>{safeContact.description}</p>
					) : null}
					<div className='mt-4 grid gap-2 text-sm text-blue-900 md:grid-cols-2'>
						{safeContact.phone ? (
							<p className='inline-flex items-center gap-2'>
								<Phone className='h-4 w-4' />
								{safeContact.phone}
							</p>
						) : null}
						{safeContact.email ? (
							<p className='inline-flex items-center gap-2'>
								<Mail className='h-4 w-4' />
								{safeContact.email}
							</p>
						) : null}
						{safeContact.address ? (
							<p className='inline-flex items-center gap-2 md:col-span-2'>
								<MapPin className='h-4 w-4' />
								{safeContact.address}
							</p>
						) : null}
					</div>
				</section>
			) : null}
		</div>
	);
}
