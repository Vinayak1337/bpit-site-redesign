'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import type * as React from 'react';
import { ContactType } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Editable from '@/components/ui/Editable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CloudinaryUploadButton from '@/components/cloudinary/upload-button';
import Header from '@/components/header/header';
import Footer from '@/components/footer/BPITFooter';
import {
	updateSiteChromeFooterConfig,
	updateSiteChromeHeaderConfig
} from '@/app/(Private Pages)/actions/site-chrome';
import {
	updateContacts,
	type ContactsPayload
} from '@/app/(Private Pages)/actions/contacts';
import {
	AddRowButton,
	AdminField,
	AdminFieldGrid,
	AdminForm,
	AdminFormFooter,
	AdminFormSection,
	AdminIconSelect,
	AdminItemCard,
	AdminItemList,
	AdminToggle,
	type AdminFormStatus
} from '@/app/(Private Pages)/admin/components/form-kit';

type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

type ContactDraft = {
	type: ContactType;
	value: string;
	displayValue: string;
};

type SiteChromeEditorProps = {
	variant: 'header' | 'footer';
	initialConfig: SiteChromeConfig;
	initialContacts: ContactDTO[];
	announcementsData: HeaderAnnouncementsData;
};

const defaultGradientClass = 'from-blue-600 to-blue-700';

const createId = (prefix: string): string =>
	`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const reorder = <T extends { order: number }>(
	items: T[],
	index: number,
	direction: -1 | 1
): T[] => {
	const targetIndex = index + direction;
	if (targetIndex < 0 || targetIndex >= items.length) return items;
	const next = [...items];
	const [item] = next.splice(index, 1);
	next.splice(targetIndex, 0, item);
	return next.map((current, currentIndex) => ({
		...current,
		order: (currentIndex + 1) * 10
	}));
};

const normalizeOrders = <T extends { order: number }>(items: T[]): T[] =>
	items.map((item, index) => ({ ...item, order: (index + 1) * 10 }));

const toContactsDraft = (contacts: ContactDTO[]): ContactDraft[] =>
	contacts.map(contact => ({
		type: contact.type,
		value: contact.value,
		displayValue: contact.displayValue ?? ''
	}));

const toContactsPayload = (contacts: ContactDraft[]): ContactsPayload =>
	contacts
		.map(contact => ({
			type: contact.type,
			value: contact.value.trim(),
			displayValue: contact.displayValue.trim() || null
		}))
		.filter(contact => contact.value.length > 0);

const prepareConfig = (config: SiteChromeConfig): SiteChromeConfig => ({
	logo: {
		src: config.logo.src.trim() || '/logo.png',
		alt: config.logo.alt.trim() || 'BPIT Logo'
	},
	navSections: normalizeOrders(
		config.navSections.map(section => ({
			...section,
			label: section.label.trim(),
			icon: section.icon?.trim() || undefined,
			items: normalizeOrders(
				section.items.map(item => ({
					...item,
					label: item.label.trim(),
					href: item.href.trim(),
					description: item.description?.trim() || undefined,
					icon: item.icon?.trim() || undefined
				}))
			)
		}))
	),
	footer: {
		quickLinks: normalizeOrders(
			config.footer.quickLinks.map(link => ({
				...link,
				label: link.label.trim(),
				href: link.href.trim(),
				description: link.description?.trim() || undefined,
				icon: link.icon?.trim() || undefined
			}))
		),
		socialLinks: normalizeOrders(
			config.footer.socialLinks.map(link => ({
				...link,
				label: link.label.trim(),
				href: link.href.trim(),
				icon: link.icon?.trim() || undefined,
				gradientClass: link.gradientClass?.trim() || defaultGradientClass,
				ariaLabel:
					link.ariaLabel?.trim() || `Visit BPIT on ${link.label.trim()}`
			}))
		),
		stats: normalizeOrders(
			config.footer.stats.map(stat => ({
				...stat,
				number: stat.number.trim(),
				label: stat.label.trim(),
				icon: stat.icon?.trim() || undefined
			}))
		),
		bottomText: {
			copyright: config.footer.bottomText.copyright.trim(),
			accreditation: config.footer.bottomText.accreditation.trim()
		}
	}
});

export default function SiteChromeEditor({
	variant,
	initialConfig,
	initialContacts,
	announcementsData
}: SiteChromeEditorProps) {
	const [config, setConfig] = useState<SiteChromeConfig>(initialConfig);
	const [contacts, setContacts] = useState<ContactDraft[]>(
		toContactsDraft(initialContacts)
	);
	const [status, setStatus] = useState<AdminFormStatus>({ kind: 'idle' });
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		if (status.kind !== 'success') return;
		const id = setTimeout(() => setStatus({ kind: 'idle' }), 4000);
		return () => clearTimeout(id);
	}, [status]);

	const previewContacts = useMemo<ContactDTO[]>(
		() =>
			contacts.map(contact => ({
				type: contact.type,
				value: contact.value,
				displayValue: contact.displayValue || null
			})),
		[contacts]
	);

	const updateLogo = (patch: Partial<SiteChromeLogoConfig>) => {
		setConfig(current => ({
			...current,
			logo: { ...current.logo, ...patch }
		}));
	};

	const updateNavSection = (
		sectionIndex: number,
		patch: Partial<SiteChromeNavSection>
	) => {
		setConfig(current => ({
			...current,
			navSections: current.navSections.map((section, index) =>
				index === sectionIndex ? { ...section, ...patch } : section
			)
		}));
	};

	const updateNavItem = (
		sectionIndex: number,
		itemIndex: number,
		patch: Partial<SiteChromeLinkItem>
	) => {
		setConfig(current => ({
			...current,
			navSections: current.navSections.map((section, index) =>
				index === sectionIndex
					? {
							...section,
							items: section.items.map((item, nestedIndex) =>
								nestedIndex === itemIndex ? { ...item, ...patch } : item
							)
						}
					: section
			)
		}));
	};

	const addNavSection = () => {
		setConfig(current => ({
			...current,
			navSections: [
				...current.navSections,
				{
					id: createId('nav-section'),
					label: 'New Section',
					icon: 'Link2',
					enabled: true,
					order: (current.navSections.length + 1) * 10,
					items: []
				}
			]
		}));
	};

	const removeNavSection = (sectionIndex: number) => {
		if (!window.confirm('Remove this navbar section?')) return;
		setConfig(current => ({
			...current,
			navSections: current.navSections.filter((_, index) => index !== sectionIndex)
		}));
	};

	const moveNavSection = (sectionIndex: number, direction: -1 | 1) => {
		setConfig(current => ({
			...current,
			navSections: reorder(current.navSections, sectionIndex, direction)
		}));
	};

	const addNavItem = (sectionIndex: number) => {
		setConfig(current => ({
			...current,
			navSections: current.navSections.map((section, index) =>
				index === sectionIndex
					? {
							...section,
							items: [
								...section.items,
								{
									id: createId('nav-link'),
									label: 'New Link',
									href: '/',
									description: '',
									icon: 'Link2',
									enabled: true,
									order: (section.items.length + 1) * 10
								}
							]
						}
					: section
			)
		}));
	};

	const removeNavItem = (sectionIndex: number, itemIndex: number) => {
		if (!window.confirm('Remove this navbar link?')) return;
		setConfig(current => ({
			...current,
			navSections: current.navSections.map((section, index) =>
				index === sectionIndex
					? {
							...section,
							items: section.items.filter(
								(_, nestedIndex) => nestedIndex !== itemIndex
							)
						}
					: section
			)
		}));
	};

	const moveNavItem = (
		sectionIndex: number,
		itemIndex: number,
		direction: -1 | 1
	) => {
		setConfig(current => ({
			...current,
			navSections: current.navSections.map((section, index) =>
				index === sectionIndex
					? { ...section, items: reorder(section.items, itemIndex, direction) }
					: section
			)
		}));
	};

	const updateContact = (index: number, patch: Partial<ContactDraft>) => {
		setContacts(current =>
			current.map((contact, contactIndex) =>
				contactIndex === index ? { ...contact, ...patch } : contact
			)
		);
	};

	const addContact = () => {
		setContacts(current => [
			...current,
			{ type: ContactType.PHONE, value: '', displayValue: '' }
		]);
	};

	const removeContact = (index: number) => {
		if (!window.confirm('Remove this contact item?')) return;
		setContacts(current =>
			current.filter((_, contactIndex) => contactIndex !== index)
		);
	};

	const updateFooterLink = (
		index: number,
		patch: Partial<SiteChromeLinkItem>
	) => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				quickLinks: current.footer.quickLinks.map((link, linkIndex) =>
					linkIndex === index ? { ...link, ...patch } : link
				)
			}
		}));
	};

	const addFooterLink = () => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				quickLinks: [
					...current.footer.quickLinks,
					{
						id: createId('footer-link'),
						label: 'New Link',
						href: '/',
						icon: 'Link2',
						enabled: true,
						order: (current.footer.quickLinks.length + 1) * 10
					}
				]
			}
		}));
	};

	const removeFooterLink = (index: number) => {
		if (!window.confirm('Remove this footer quick link?')) return;
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				quickLinks: current.footer.quickLinks.filter(
					(_, linkIndex) => linkIndex !== index
				)
			}
		}));
	};

	const moveFooterLink = (index: number, direction: -1 | 1) => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				quickLinks: reorder(current.footer.quickLinks, index, direction)
			}
		}));
	};

	const updateSocialLink = (
		index: number,
		patch: Partial<SiteChromeFooterSocialLink>
	) => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				socialLinks: current.footer.socialLinks.map((link, linkIndex) =>
					linkIndex === index ? { ...link, ...patch } : link
				)
			}
		}));
	};

	const addSocialLink = () => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				socialLinks: [
					...current.footer.socialLinks,
					{
						id: createId('social-link'),
						label: 'New Social Link',
						href: 'https://',
						icon: 'Link2',
						gradientClass: defaultGradientClass,
						ariaLabel: 'Visit BPIT',
						enabled: true,
						order: (current.footer.socialLinks.length + 1) * 10
					}
				]
			}
		}));
	};

	const removeSocialLink = (index: number) => {
		if (!window.confirm('Remove this social link?')) return;
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				socialLinks: current.footer.socialLinks.filter(
					(_, linkIndex) => linkIndex !== index
				)
			}
		}));
	};

	const moveSocialLink = (index: number, direction: -1 | 1) => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				socialLinks: reorder(current.footer.socialLinks, index, direction)
			}
		}));
	};

	const updateStat = (index: number, patch: Partial<SiteChromeFooterStat>) => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				stats: current.footer.stats.map((stat, statIndex) =>
					statIndex === index ? { ...stat, ...patch } : stat
				)
			}
		}));
	};

	const addStat = () => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				stats: [
					...current.footer.stats,
					{
						id: createId('footer-stat'),
						number: '0',
						label: 'New Stat',
						icon: 'Award',
						enabled: true,
						order: (current.footer.stats.length + 1) * 10
					}
				]
			}
		}));
	};

	const removeStat = (index: number) => {
		if (!window.confirm('Remove this footer stat?')) return;
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				stats: current.footer.stats.filter((_, statIndex) => statIndex !== index)
			}
		}));
	};

	const moveStat = (index: number, direction: -1 | 1) => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				stats: reorder(current.footer.stats, index, direction)
			}
		}));
	};

	const updateBottomText = (patch: Partial<SiteChromeFooterBottomText>) => {
		setConfig(current => ({
			...current,
			footer: {
				...current.footer,
				bottomText: { ...current.footer.bottomText, ...patch }
			}
		}));
	};

	const resetForm = () => {
		if (!window.confirm('Reset unsaved edits?')) return;
		setConfig(initialConfig);
		setContacts(toContactsDraft(initialContacts));
		setStatus({ kind: 'idle' });
	};

	const handleSave = () => {
		const contactsPayload = toContactsPayload(contacts);
		if (variant === 'footer' && contactsPayload.length === 0) {
			setStatus({
				kind: 'error',
				message: 'Add at least one footer contact before saving.'
			});
			return;
		}

		startTransition(async () => {
			setStatus({ kind: 'saving' });
			const prepared = prepareConfig(config);
			const siteResult =
				variant === 'header'
					? await updateSiteChromeHeaderConfig({
							logo: prepared.logo,
							navSections: prepared.navSections
						})
					: await updateSiteChromeFooterConfig(prepared.footer);
			if (!siteResult.ok) {
				setStatus({
					kind: 'error',
					message:
						variant === 'header'
							? 'Header settings could not be saved.'
							: 'Footer settings could not be saved.'
				});
				return;
			}
			if (variant === 'footer') {
				const contactsResult = await updateContacts(contactsPayload);
				if (!contactsResult.ok) {
					setConfig(siteResult.data);
					setStatus({
						kind: 'error',
						message: 'Footer saved, but contacts could not be saved.'
					});
					return;
				}
			}
			setConfig(siteResult.data);
			setStatus({ kind: 'success' });
		});
	};

	const formContent =
		variant === 'header' ? (
			<HeaderForm
				config={config}
				status={status}
				saving={isPending}
				onSave={handleSave}
				onReset={resetForm}
				onUpdateLogo={updateLogo}
				onAddNavSection={addNavSection}
				onRemoveNavSection={removeNavSection}
				onMoveNavSection={moveNavSection}
				onUpdateNavSection={updateNavSection}
				onAddNavItem={addNavItem}
				onRemoveNavItem={removeNavItem}
				onMoveNavItem={moveNavItem}
				onUpdateNavItem={updateNavItem}
				onUploadError={message => setStatus({ kind: 'error', message })}
			/>
		) : (
			<FooterForm
				config={config}
				contacts={contacts}
				status={status}
				saving={isPending}
				onSave={handleSave}
				onReset={resetForm}
				onAddContact={addContact}
				onUpdateContact={updateContact}
				onRemoveContact={removeContact}
				onAddFooterLink={addFooterLink}
				onUpdateFooterLink={updateFooterLink}
				onRemoveFooterLink={removeFooterLink}
				onMoveFooterLink={moveFooterLink}
				onAddSocialLink={addSocialLink}
				onUpdateSocialLink={updateSocialLink}
				onRemoveSocialLink={removeSocialLink}
				onMoveSocialLink={moveSocialLink}
				onAddStat={addStat}
				onUpdateStat={updateStat}
				onRemoveStat={removeStat}
				onMoveStat={moveStat}
				onUpdateBottomText={updateBottomText}
			/>
		);

	if (variant === 'header') {
		return (
			<Editable
				label='Header / Navbar'
				presentation='sheet'
				contentClassName='sm:max-w-2xl md:max-w-3xl lg:max-w-4xl'
				formContent={formContent}>
				<Header
					contacts={previewContacts}
					announcementsData={announcementsData}
					siteChromeConfig={config}
				/>
			</Editable>
		);
	}

	return (
		<Editable
			label='Footer'
			presentation='sheet'
			contentClassName='sm:max-w-2xl md:max-w-3xl lg:max-w-4xl'
			formContent={formContent}>
			<Footer contacts={previewContacts} siteChromeConfig={config} />
		</Editable>
	);
}

/* -------------------------------------------------------------------------- */
/*  Header form                                                                */
/* -------------------------------------------------------------------------- */

type HeaderFormProps = {
	config: SiteChromeConfig;
	status: AdminFormStatus;
	saving: boolean;
	onSave: () => void;
	onReset: () => void;
	onUpdateLogo: (patch: Partial<SiteChromeLogoConfig>) => void;
	onAddNavSection: () => void;
	onRemoveNavSection: (index: number) => void;
	onMoveNavSection: (index: number, direction: -1 | 1) => void;
	onUpdateNavSection: (
		index: number,
		patch: Partial<SiteChromeNavSection>
	) => void;
	onAddNavItem: (sectionIndex: number) => void;
	onRemoveNavItem: (sectionIndex: number, itemIndex: number) => void;
	onMoveNavItem: (
		sectionIndex: number,
		itemIndex: number,
		direction: -1 | 1
	) => void;
	onUpdateNavItem: (
		sectionIndex: number,
		itemIndex: number,
		patch: Partial<SiteChromeLinkItem>
	) => void;
	onUploadError: (message: string) => void;
};

function HeaderForm(props: HeaderFormProps) {
	const { config, status, saving, onSave, onReset } = props;
	return (
		<AdminForm onSubmit={event => event.preventDefault()}>
			<Tabs defaultValue='navigation' className='flex flex-col gap-6'>
				<TabsList className='self-start'>
					<TabsTrigger value='navigation'>Navigation</TabsTrigger>
					<TabsTrigger value='logo'>Logo</TabsTrigger>
				</TabsList>

				<TabsContent value='navigation' className='mt-0'>
					<AdminFormSection
						title='Navbar sections'
						description='Dropdown sections and their links. Disable to hide without deleting.'
						action={
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={props.onAddNavSection}>
								Add section
							</Button>
						}>
						{config.navSections.length === 0 ? (
							<p className='rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-4 py-6 text-center text-sm text-slate-500'>
								No navbar sections yet.
							</p>
						) : (
							<AdminItemList>
								{config.navSections.map((section, sectionIndex) => (
									<NavSectionRow
										key={section.id}
										section={section}
										index={sectionIndex}
										total={config.navSections.length}
										onUpdate={patch =>
											props.onUpdateNavSection(sectionIndex, patch)
										}
										onMove={direction =>
											props.onMoveNavSection(sectionIndex, direction)
										}
										onRemove={() => props.onRemoveNavSection(sectionIndex)}
										onAddItem={() => props.onAddNavItem(sectionIndex)}
										onUpdateItem={(itemIndex, patch) =>
											props.onUpdateNavItem(sectionIndex, itemIndex, patch)
										}
										onMoveItem={(itemIndex, direction) =>
											props.onMoveNavItem(sectionIndex, itemIndex, direction)
										}
										onRemoveItem={itemIndex =>
											props.onRemoveNavItem(sectionIndex, itemIndex)
										}
									/>
								))}
							</AdminItemList>
						)}
					</AdminFormSection>
				</TabsContent>

				<TabsContent value='logo' className='mt-0'>
					<AdminFormSection
						title='Logo'
						description='Upload or paste a logo URL. Falls back to the packaged BPIT logo if empty.'>
						<div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
							<div className='flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white p-3'>
								<img
									src={config.logo.src || '/logo.png'}
									alt={config.logo.alt || 'BPIT Logo'}
									className='max-h-full max-w-full object-contain'
								/>
							</div>
							<div className='flex w-full flex-col gap-4'>
								<AdminFieldGrid cols={2}>
									<AdminField label='Logo URL / path'>
										<Input
											value={config.logo.src}
											onChange={event =>
												props.onUpdateLogo({ src: event.target.value })
											}
											placeholder='/logo.png'
										/>
									</AdminField>
									<AdminField label='Alt text'>
										<Input
											value={config.logo.alt}
											onChange={event =>
												props.onUpdateLogo({ alt: event.target.value })
											}
											placeholder='BPIT Logo'
										/>
									</AdminField>
								</AdminFieldGrid>
								<CloudinaryUploadButton
									buttonText='Upload logo'
									folder='site-chrome'
									onUpload={url => props.onUpdateLogo({ src: url })}
									onError={props.onUploadError}
								/>
							</div>
						</div>
					</AdminFormSection>
				</TabsContent>
			</Tabs>

			<AdminFormFooter
				status={status}
				saving={saving}
				onSave={onSave}
				onReset={onReset}
			/>
		</AdminForm>
	);
}

function NavSectionRow({
	section,
	index,
	total,
	onUpdate,
	onMove,
	onRemove,
	onAddItem,
	onUpdateItem,
	onMoveItem,
	onRemoveItem
}: {
	section: SiteChromeNavSection;
	index: number;
	total: number;
	onUpdate: (patch: Partial<SiteChromeNavSection>) => void;
	onMove: (direction: -1 | 1) => void;
	onRemove: () => void;
	onAddItem: () => void;
	onUpdateItem: (itemIndex: number, patch: Partial<SiteChromeLinkItem>) => void;
	onMoveItem: (itemIndex: number, direction: -1 | 1) => void;
	onRemoveItem: (itemIndex: number) => void;
}) {
	const [open, setOpen] = useState(true);
	return (
		<AdminItemCard
			index={index}
			total={total}
			title={section.label || 'Untitled section'}
			subtitle={`${section.items.length} link${section.items.length === 1 ? '' : 's'}`}
			hidden={!section.enabled}
			onMove={onMove}
			onRemove={onRemove}
			headerExtra={
				<button
					type='button'
					onClick={() => setOpen(value => !value)}
					className='rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100'>
					{open ? 'Collapse' : 'Expand'}
				</button>
			}>
			{open && (
				<>
					<AdminFieldGrid cols={2}>
						<AdminField label='Section label'>
							<Input
								value={section.label}
								onChange={event => onUpdate({ label: event.target.value })}
							/>
						</AdminField>
						<AdminField label='Icon'>
							<AdminIconSelect
								value={section.icon ?? ''}
								onChange={value => onUpdate({ icon: value })}
							/>
						</AdminField>
					</AdminFieldGrid>
					<AdminToggle
						label='Show this section'
						checked={section.enabled}
						onChange={value => onUpdate({ enabled: value })}
					/>
					<div className='mt-1 flex items-center justify-between'>
						<h4 className='text-sm font-medium text-slate-700'>Links</h4>
						<Button
							type='button'
							variant='ghost'
							size='sm'
							className='text-blue-700 hover:bg-blue-50'
							onClick={onAddItem}>
							Add link
						</Button>
					</div>
					{section.items.length === 0 ? (
						<p className='rounded border border-dashed border-slate-200 px-3 py-3 text-xs text-slate-500'>
							No links yet.
						</p>
					) : (
						<div className='flex flex-col divide-y divide-slate-200/70 rounded-md border border-slate-200 bg-white'>
							{section.items.map((item, itemIndex) => (
								<NavLinkRow
									key={item.id}
									item={item}
									index={itemIndex}
									total={section.items.length}
									onChange={patch => onUpdateItem(itemIndex, patch)}
									onMove={direction => onMoveItem(itemIndex, direction)}
									onRemove={() => onRemoveItem(itemIndex)}
								/>
							))}
						</div>
					)}
				</>
			)}
		</AdminItemCard>
	);
}

function NavLinkRow({
	item,
	index,
	total,
	onChange,
	onMove,
	onRemove
}: {
	item: SiteChromeLinkItem;
	index: number;
	total: number;
	onChange: (patch: Partial<SiteChromeLinkItem>) => void;
	onMove: (direction: -1 | 1) => void;
	onRemove: () => void;
}) {
	const [open, setOpen] = useState(false);
	return (
		<div className='flex flex-col gap-3 p-3'>
			<div className='flex items-center justify-between gap-3'>
				<button
					type='button'
					onClick={() => setOpen(value => !value)}
					className='min-w-0 flex-1 text-left'>
					<p className='truncate text-sm font-medium text-slate-800'>
						{item.label || 'Untitled link'}
					</p>
					<p className='truncate text-xs text-slate-500'>
						{item.href || 'No URL set'}
					</p>
				</button>
				<div className='flex items-center gap-2'>
					{!item.enabled && (
						<span className='rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500'>
							Hidden
						</span>
					)}
					<button
						type='button'
						onClick={() => setOpen(value => !value)}
						className='text-xs font-medium text-slate-500 hover:text-slate-700'>
						{open ? 'Close' : 'Edit'}
					</button>
				</div>
			</div>
			{open && (
				<div className='flex flex-col gap-3'>
					<AdminFieldGrid cols={2}>
						<AdminField label='Label'>
							<Input
								value={item.label}
								onChange={event => onChange({ label: event.target.value })}
							/>
						</AdminField>
						<AdminField label='URL / path'>
							<Input
								value={item.href}
								onChange={event => onChange({ href: event.target.value })}
							/>
						</AdminField>
						<AdminField label='Icon'>
							<AdminIconSelect
								value={item.icon ?? ''}
								onChange={value => onChange({ icon: value })}
							/>
						</AdminField>
					</AdminFieldGrid>
					<AdminField label='Description'>
						<Textarea
							rows={2}
							value={item.description ?? ''}
							onChange={event =>
								onChange({ description: event.target.value })
							}
						/>
					</AdminField>
					<div className='flex items-center justify-between'>
						<AdminToggle
							label='Show this link'
							checked={item.enabled}
							onChange={value => onChange({ enabled: value })}
						/>
					</div>
					<div className='flex items-center justify-end gap-2'>
						<button
							type='button'
							onClick={() => onMove(-1)}
							disabled={index === 0}
							className='rounded border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 disabled:text-slate-300'>
							Up
						</button>
						<button
							type='button'
							onClick={() => onMove(1)}
							disabled={index === total - 1}
							className='rounded border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 disabled:text-slate-300'>
							Down
						</button>
						<button
							type='button'
							onClick={onRemove}
							className='rounded px-2 py-1 text-xs text-rose-600 hover:bg-rose-50'>
							Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  Footer form                                                                */
/* -------------------------------------------------------------------------- */

type FooterFormProps = {
	config: SiteChromeConfig;
	contacts: ContactDraft[];
	status: AdminFormStatus;
	saving: boolean;
	onSave: () => void;
	onReset: () => void;
	onAddContact: () => void;
	onUpdateContact: (index: number, patch: Partial<ContactDraft>) => void;
	onRemoveContact: (index: number) => void;
	onAddFooterLink: () => void;
	onUpdateFooterLink: (
		index: number,
		patch: Partial<SiteChromeLinkItem>
	) => void;
	onRemoveFooterLink: (index: number) => void;
	onMoveFooterLink: (index: number, direction: -1 | 1) => void;
	onAddSocialLink: () => void;
	onUpdateSocialLink: (
		index: number,
		patch: Partial<SiteChromeFooterSocialLink>
	) => void;
	onRemoveSocialLink: (index: number) => void;
	onMoveSocialLink: (index: number, direction: -1 | 1) => void;
	onAddStat: () => void;
	onUpdateStat: (index: number, patch: Partial<SiteChromeFooterStat>) => void;
	onRemoveStat: (index: number) => void;
	onMoveStat: (index: number, direction: -1 | 1) => void;
	onUpdateBottomText: (patch: Partial<SiteChromeFooterBottomText>) => void;
};

function FooterForm(props: FooterFormProps) {
	const { config, contacts, status, saving, onSave, onReset } = props;
	return (
		<AdminForm onSubmit={event => event.preventDefault()}>
			<Tabs defaultValue='contacts' className='flex flex-col gap-6'>
				<TabsList className='self-start'>
					<TabsTrigger value='contacts'>Contacts</TabsTrigger>
					<TabsTrigger value='quick-links'>Quick links</TabsTrigger>
					<TabsTrigger value='social'>Social</TabsTrigger>
					<TabsTrigger value='stats'>Stats</TabsTrigger>
					<TabsTrigger value='bottom'>Bottom text</TabsTrigger>
				</TabsList>

				<TabsContent value='contacts' className='mt-0'>
					<AdminFormSection
						title='Contacts'
						description='Address, phone, and email shown across the site.'>
						<AdminItemList>
							{contacts.map((contact, index) => (
								<AdminItemCard
									key={`${contact.type}-${index}`}
									index={index}
									total={contacts.length}
									title={contact.value || `New ${contact.type.toLowerCase()}`}
									subtitle={contact.type}
									onRemove={() => props.onRemoveContact(index)}>
									<AdminFieldGrid cols={2}>
										<AdminField label='Type'>
											<select
												value={contact.type}
												onChange={event =>
													props.onUpdateContact(index, {
														type: event.target.value as ContactType
													})
												}
												className='h-10 w-full rounded-md border border-input bg-white px-3 text-sm'>
												{Object.values(ContactType).map(type => (
													<option key={type} value={type}>
														{type}
													</option>
												))}
											</select>
										</AdminField>
										<AdminField label='Value'>
											<Input
												value={contact.value}
												onChange={event =>
													props.onUpdateContact(index, {
														value: event.target.value
													})
												}
												placeholder='Email, phone, or address'
											/>
										</AdminField>
									</AdminFieldGrid>
									<AdminField
										label='Display text'
										hint='Optional. Overrides the value when displayed publicly.'>
										<Input
											value={contact.displayValue}
											onChange={event =>
												props.onUpdateContact(index, {
													displayValue: event.target.value
												})
											}
										/>
									</AdminField>
								</AdminItemCard>
							))}
						</AdminItemList>
						<AddRowButton onClick={props.onAddContact}>Add contact</AddRowButton>
					</AdminFormSection>
				</TabsContent>

				<TabsContent value='quick-links' className='mt-0'>
					<AdminFormSection
						title='Quick links'
						description='Links in the footer Quick Links column. Disabled links stay saved but hidden.'>
						<AdminItemList>
							{config.footer.quickLinks.map((link, index) => (
								<FooterLinkRow
									key={link.id}
									item={link}
									index={index}
									total={config.footer.quickLinks.length}
									onChange={patch => props.onUpdateFooterLink(index, patch)}
									onMove={direction => props.onMoveFooterLink(index, direction)}
									onRemove={() => props.onRemoveFooterLink(index)}
								/>
							))}
						</AdminItemList>
						<AddRowButton onClick={props.onAddFooterLink}>
							Add quick link
						</AddRowButton>
					</AdminFormSection>
				</TabsContent>

				<TabsContent value='social' className='mt-0'>
					<AdminFormSection
						title='Social links'
						description='Follow Us buttons. Gradient classes use Tailwind color stops, e.g. from-blue-600 to-blue-700.'>
						<AdminItemList>
							{config.footer.socialLinks.map((link, index) => (
								<AdminItemCard
									key={link.id}
									index={index}
									total={config.footer.socialLinks.length}
									title={link.label || 'New social link'}
									subtitle={link.href || 'No URL set'}
									hidden={!link.enabled}
									onMove={direction => props.onMoveSocialLink(index, direction)}
									onRemove={() => props.onRemoveSocialLink(index)}>
									<AdminFieldGrid cols={2}>
										<AdminField label='Label'>
											<Input
												value={link.label}
												onChange={event =>
													props.onUpdateSocialLink(index, {
														label: event.target.value
													})
												}
											/>
										</AdminField>
										<AdminField label='URL'>
											<Input
												value={link.href}
												onChange={event =>
													props.onUpdateSocialLink(index, {
														href: event.target.value
													})
												}
											/>
										</AdminField>
										<AdminField label='Icon'>
											<AdminIconSelect
												value={link.icon ?? ''}
												onChange={value =>
													props.onUpdateSocialLink(index, { icon: value })
												}
											/>
										</AdminField>
										<AdminField label='Gradient classes'>
											<Input
												value={link.gradientClass ?? ''}
												onChange={event =>
													props.onUpdateSocialLink(index, {
														gradientClass: event.target.value
													})
												}
												placeholder={defaultGradientClass}
											/>
										</AdminField>
									</AdminFieldGrid>
									<AdminField label='Accessible label'>
										<Input
											value={link.ariaLabel ?? ''}
											onChange={event =>
												props.onUpdateSocialLink(index, {
													ariaLabel: event.target.value
												})
											}
											placeholder={`Visit BPIT on ${link.label}`}
										/>
									</AdminField>
									<AdminToggle
										label='Show this link'
										checked={link.enabled}
										onChange={value =>
											props.onUpdateSocialLink(index, { enabled: value })
										}
									/>
								</AdminItemCard>
							))}
						</AdminItemList>
						<AddRowButton onClick={props.onAddSocialLink}>
							Add social link
						</AddRowButton>
					</AdminFormSection>
				</TabsContent>

				<TabsContent value='stats' className='mt-0'>
					<AdminFormSection
						title='Stats'
						description='Short highlight metrics near the top of the footer.'>
						<AdminItemList>
							{config.footer.stats.map((stat, index) => (
								<AdminItemCard
									key={stat.id}
									index={index}
									total={config.footer.stats.length}
									title={`${stat.number || '0'} · ${stat.label || 'Label'}`}
									hidden={!stat.enabled}
									onMove={direction => props.onMoveStat(index, direction)}
									onRemove={() => props.onRemoveStat(index)}>
									<AdminFieldGrid cols={3}>
										<AdminField label='Value'>
											<Input
												value={stat.number}
												onChange={event =>
													props.onUpdateStat(index, {
														number: event.target.value
													})
												}
											/>
										</AdminField>
										<AdminField label='Label'>
											<Input
												value={stat.label}
												onChange={event =>
													props.onUpdateStat(index, {
														label: event.target.value
													})
												}
											/>
										</AdminField>
										<AdminField label='Icon'>
											<AdminIconSelect
												value={stat.icon ?? ''}
												onChange={value =>
													props.onUpdateStat(index, { icon: value })
												}
											/>
										</AdminField>
									</AdminFieldGrid>
									<AdminToggle
										label='Show this stat'
										checked={stat.enabled}
										onChange={value =>
											props.onUpdateStat(index, { enabled: value })
										}
									/>
								</AdminItemCard>
							))}
						</AdminItemList>
						<AddRowButton onClick={props.onAddStat}>Add stat</AddRowButton>
					</AdminFormSection>
				</TabsContent>

				<TabsContent value='bottom' className='mt-0'>
					<AdminFormSection
						title='Bottom text'
						description='The current year is added automatically on the public footer.'>
						<AdminFieldGrid cols={2}>
							<AdminField label='Copyright text'>
								<Input
									value={config.footer.bottomText.copyright}
									onChange={event =>
										props.onUpdateBottomText({ copyright: event.target.value })
									}
								/>
							</AdminField>
							<AdminField label='Accreditation / supporting text'>
								<Input
									value={config.footer.bottomText.accreditation}
									onChange={event =>
										props.onUpdateBottomText({
											accreditation: event.target.value
										})
									}
								/>
							</AdminField>
						</AdminFieldGrid>
						<p className='text-xs text-slate-500'>
							Preview: © {new Date().getFullYear()}{' '}
							{config.footer.bottomText.copyright || '…'} ·{' '}
							{config.footer.bottomText.accreditation || '…'}
						</p>
					</AdminFormSection>
				</TabsContent>
			</Tabs>

			<AdminFormFooter
				status={status}
				saving={saving}
				onSave={onSave}
				onReset={onReset}
			/>
		</AdminForm>
	);
}

function FooterLinkRow({
	item,
	index,
	total,
	onChange,
	onMove,
	onRemove
}: {
	item: SiteChromeLinkItem;
	index: number;
	total: number;
	onChange: (patch: Partial<SiteChromeLinkItem>) => void;
	onMove: (direction: -1 | 1) => void;
	onRemove: () => void;
}) {
	return (
		<AdminItemCard
			index={index}
			total={total}
			title={item.label || 'Untitled link'}
			subtitle={item.href || 'No URL set'}
			hidden={!item.enabled}
			onMove={onMove}
			onRemove={onRemove}>
			<AdminFieldGrid cols={2}>
				<AdminField label='Label'>
					<Input
						value={item.label}
						onChange={event => onChange({ label: event.target.value })}
					/>
				</AdminField>
				<AdminField label='URL / path'>
					<Input
						value={item.href}
						onChange={event => onChange({ href: event.target.value })}
					/>
				</AdminField>
				<AdminField label='Icon'>
					<AdminIconSelect
						value={item.icon ?? ''}
						onChange={value => onChange({ icon: value })}
					/>
				</AdminField>
			</AdminFieldGrid>
			<AdminToggle
				label='Show this link'
				checked={item.enabled}
				onChange={value => onChange({ enabled: value })}
			/>
		</AdminItemCard>
	);
}
