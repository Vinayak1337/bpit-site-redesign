'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	aboutBPITItems,
	admissionsItems,
	academicsItems,
	placementsItems,
	studentLifeItems,
	studentPortalItems
} from '@/data/nav-items';
import { Home } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

type NavItem = {
	title: string;
	href: string;
	description?: string;
	icon?: React.ReactNode;
};

type Group = { key: string; label: string; items: NavItem[] };

const NavPagesGrid: React.FC = () => {
	const groups: Group[] = useMemo(
		() => [
			{
				key: 'main',
				label: 'Main Page',
				items: [
					{
						title: 'Homepage',
						href: '/home',
						icon: <Home className='w-5 h-5' />
					}
				] as NavItem[]
			},
			{ key: 'about', label: 'About BPIT', items: aboutBPITItems as NavItem[] },
			{
				key: 'admissions',
				label: 'Admissions',
				items: admissionsItems as NavItem[]
			},
			{
				key: 'academics',
				label: 'Academics',
				items: academicsItems as NavItem[]
			},
			{
				key: 'placements',
				label: 'Placements',
				items: placementsItems as NavItem[]
			},
			{
				key: 'student-life',
				label: 'Student Life',
				items: studentLifeItems as NavItem[]
			},
			{
				key: 'student-portal',
				label: 'Student Portal',
				items: studentPortalItems as NavItem[]
			}
		],
		[]
	);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
			{groups.map(group => (
				<Card key={group.key} className='border-blue-100'>
					<CardHeader>
						<CardTitle className='text-blue-900'>{group.label}</CardTitle>
						<CardDescription>Select a page from this section</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-1 gap-2'>
							{group.items.map(item => (
								<div
									key={item.href}
									className='flex items-center justify-between p-2 rounded-md border transition-colors border-slate-200 hover:bg-slate-50'>
									<div className='flex items-center gap-2'>
										<span className='inline-flex items-center justify-center'>
											{item.icon}
										</span>
										<span className='font-medium'>{item.title}</span>
									</div>
									<div className='flex items-center gap-2'>
										<Link
											href={item.href.replace('home', '')}
											target='_blank'
											aria-label={`Open ${item.title}`}>
											<Button variant='outline' size='sm'>
												Open
											</Button>
										</Link>
										<Link
											href={`/admin/${item.href}`}
											aria-label={`Edit ${item.title}`}>
											<Button size='sm'>Edit</Button>
										</Link>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default NavPagesGrid;
