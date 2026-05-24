'use client';

/**
 * Admin form primitives. See docs/ADMIN_FORM_DESIGN_LANGUAGE.md.
 *
 * Rule of thumb: one bordered surface deep. The Sheet provides the panel; sections
 * are headings; repeatable items use a single light card; fields are flat.
 */

import * as React from 'react';
import {
	ArrowDown,
	ArrowUp,
	Loader2,
	Plus,
	Trash2,
	type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*  Root form                                                                  */
/* -------------------------------------------------------------------------- */

type AdminFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export function AdminForm({ className, children, ...rest }: AdminFormProps) {
	return (
		<form
			{...rest}
			className={cn('flex flex-col gap-6 pb-24', className)}>
			{children}
		</form>
	);
}

/* -------------------------------------------------------------------------- */
/*  Form header (use only when sheet doesn't already title the form)           */
/* -------------------------------------------------------------------------- */

export function AdminFormHeader({
	title,
	description
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className='flex flex-col gap-1'>
			<h2 className='text-xl font-semibold text-slate-900'>{title}</h2>
			{description && (
				<p className='text-sm text-slate-500'>{description}</p>
			)}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function AdminFormSection({
	title,
	description,
	action,
	children
}: {
	title: string;
	description?: string;
	action?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<section className='flex flex-col gap-4'>
			<div className='flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4'>
				<div className='min-w-0'>
					<h3 className='text-base font-semibold text-slate-900'>{title}</h3>
					{description && (
						<p className='mt-0.5 text-sm text-slate-500'>{description}</p>
					)}
				</div>
				{action && <div className='flex-shrink-0'>{action}</div>}
			</div>
			<div className='flex flex-col gap-4'>{children}</div>
		</section>
	);
}

/* -------------------------------------------------------------------------- */
/*  Field                                                                      */
/* -------------------------------------------------------------------------- */

export function AdminField({
	label,
	htmlFor,
	hint,
	error,
	children,
	className
}: {
	label: string;
	htmlFor?: string;
	hint?: string;
	error?: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn('flex flex-col gap-1.5', className)}>
			<Label
				htmlFor={htmlFor}
				className='text-sm font-medium text-slate-700'>
				{label}
			</Label>
			{children}
			{hint && !error && (
				<p className='text-xs text-slate-500'>{hint}</p>
			)}
			{error && <p className='text-xs text-rose-600'>{error}</p>}
		</div>
	);
}

export function AdminFieldGrid({
	cols = 2,
	children,
	className
}: {
	cols?: 1 | 2 | 3;
	children: React.ReactNode;
	className?: string;
}) {
	const colsClass =
		cols === 1
			? 'grid-cols-1'
			: cols === 3
				? 'grid-cols-1 md:grid-cols-3'
				: 'grid-cols-1 md:grid-cols-2';
	return (
		<div className={cn('grid gap-4', colsClass, className)}>{children}</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  Item card (repeatable list element)                                        */
/* -------------------------------------------------------------------------- */

type AdminItemCardProps = {
	index?: number;
	total?: number;
	title?: string;
	subtitle?: string;
	hidden?: boolean;
	onMove?: (direction: -1 | 1) => void;
	onRemove?: () => void;
	headerExtra?: React.ReactNode;
	children: React.ReactNode;
};

export function AdminItemCard({
	index,
	total,
	title,
	subtitle,
	hidden,
	onMove,
	onRemove,
	headerExtra,
	children
}: AdminItemCardProps) {
	const showHeader =
		title !== undefined || onMove || onRemove || hidden || headerExtra;
	const canMoveUp = onMove && index !== undefined && index > 0;
	const canMoveDown =
		onMove && index !== undefined && total !== undefined && index < total - 1;
	return (
		<div className='rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'>
			{showHeader && (
				<div className='mb-3 flex items-start justify-between gap-3'>
					<div className='min-w-0 flex-1'>
						{title !== undefined && (
							<div className='flex items-center gap-2'>
								{index !== undefined && (
									<span className='text-xs font-medium tabular-nums text-slate-400'>
										{String(index + 1).padStart(2, '0')}
									</span>
								)}
								<p className='truncate text-sm font-semibold text-slate-900'>
									{title || 'Untitled'}
								</p>
								{hidden && (
									<span className='rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-600'>
										Hidden
									</span>
								)}
							</div>
						)}
						{subtitle && (
							<p className='truncate text-xs text-slate-500'>{subtitle}</p>
						)}
					</div>
					<div className='flex items-center gap-1'>
						{headerExtra}
						{onMove && (
							<AdminReorderControls
								onUp={() => onMove(-1)}
								onDown={() => onMove(1)}
								disableUp={!canMoveUp}
								disableDown={!canMoveDown}
							/>
						)}
						{onRemove && (
							<Button
								type='button'
								variant='ghost'
								size='icon'
								onClick={onRemove}
								aria-label='Remove'
								className='h-8 w-8 text-slate-500 hover:bg-rose-50 hover:text-rose-600'>
								<Trash2 className='h-4 w-4' />
							</Button>
						)}
					</div>
				</div>
			)}
			<div className='flex flex-col gap-3'>{children}</div>
		</div>
	);
}

export function AdminItemList({ children }: { children: React.ReactNode }) {
	return <div className='flex flex-col gap-3'>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/*  Reorder controls                                                            */
/* -------------------------------------------------------------------------- */

export function AdminReorderControls({
	onUp,
	onDown,
	disableUp,
	disableDown
}: {
	onUp: () => void;
	onDown: () => void;
	disableUp?: boolean;
	disableDown?: boolean;
}) {
	return (
		<div className='inline-flex overflow-hidden rounded-md border border-slate-200 bg-white'>
			<button
				type='button'
				onClick={onUp}
				disabled={disableUp}
				aria-label='Move up'
				className='flex h-8 w-7 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300'>
				<ArrowUp className='h-4 w-4' />
			</button>
			<div className='w-px bg-slate-200' />
			<button
				type='button'
				onClick={onDown}
				disabled={disableDown}
				aria-label='Move down'
				className='flex h-8 w-7 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300'>
				<ArrowDown className='h-4 w-4' />
			</button>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  Toggle (switch)                                                            */
/* -------------------------------------------------------------------------- */

export function AdminToggle({
	label,
	description,
	checked,
	onChange
}: {
	label: string;
	description?: string;
	checked: boolean;
	onChange: (next: boolean) => void;
}) {
	return (
		<label className='flex cursor-pointer items-center justify-between gap-3 text-sm'>
			<span className='flex flex-col'>
				<span className='font-medium text-slate-700'>{label}</span>
				{description && (
					<span className='text-xs text-slate-500'>{description}</span>
				)}
			</span>
			<button
				type='button'
				role='switch'
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				className={cn(
					'relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
					checked ? 'bg-blue-600' : 'bg-slate-300'
				)}>
				<span
					className={cn(
						'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
						checked ? 'translate-x-[18px]' : 'translate-x-0.5'
					)}
				/>
			</button>
		</label>
	);
}

/* -------------------------------------------------------------------------- */
/*  Add-row button                                                             */
/* -------------------------------------------------------------------------- */

export function AddRowButton({
	onClick,
	children
}: {
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<Button
			type='button'
			variant='outline'
			onClick={onClick}
			className='w-full justify-center border-dashed text-slate-600 hover:text-blue-700'>
			<Plus className='mr-2 h-4 w-4' />
			{children}
		</Button>
	);
}

/* -------------------------------------------------------------------------- */
/*  Sticky form footer                                                         */
/* -------------------------------------------------------------------------- */

export type AdminFormStatus =
	| { kind: 'idle' }
	| { kind: 'saving' }
	| { kind: 'success'; message?: string }
	| { kind: 'error'; message: string };

export function AdminFormFooter({
	status,
	saving: savingProp,
	onSave,
	onReset,
	saveLabel = 'Save changes',
	resetLabel = 'Reset',
	disabled
}: {
	status?: AdminFormStatus;
	saving?: boolean;
	onSave?: () => void;
	onReset?: () => void;
	saveLabel?: string;
	resetLabel?: string;
	disabled?: boolean;
}) {
	const saving = savingProp ?? status?.kind === 'saving';
	const statusText =
		status?.kind === 'saving'
			? 'Saving…'
			: status?.kind === 'success'
				? status.message ?? 'Saved'
				: status?.kind === 'error'
					? status.message
					: '';
	const statusTone =
		status?.kind === 'success'
			? 'text-emerald-600'
			: status?.kind === 'error'
				? 'text-rose-600'
				: 'text-slate-500';
	return (
		<div className='sticky bottom-0 -mx-4 mt-2 flex flex-col gap-2 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
			<p
				aria-live='polite'
				className={cn('min-h-5 text-sm', statusTone)}>
				{statusText}
			</p>
			<div className='flex gap-2 sm:justify-end'>
				{onReset && (
					<Button
						type='button'
						variant='outline'
						onClick={onReset}
						disabled={disabled || saving}>
						{resetLabel}
					</Button>
				)}
				<Button
					type={onSave ? 'button' : 'submit'}
					onClick={onSave}
					disabled={disabled || saving}
					className='bg-blue-700 hover:bg-blue-800'>
					{saving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					{saving ? 'Saving…' : saveLabel}
				</Button>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                                */
/* -------------------------------------------------------------------------- */

export function AdminEmptyState({
	icon: Icon,
	title,
	description
}: {
	icon?: LucideIcon;
	title: string;
	description?: string;
}) {
	return (
		<div className='flex flex-col items-center gap-1 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-6 py-8 text-center'>
			{Icon && <Icon className='h-5 w-5 text-slate-400' />}
			<p className='text-sm font-medium text-slate-700'>{title}</p>
			{description && (
				<p className='text-xs text-slate-500'>{description}</p>
			)}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  Icon select                                                                */
/* -------------------------------------------------------------------------- */

import {
	Award,
	BarChart,
	BarChart3,
	Bell,
	BookMarked,
	BookOpen,
	Briefcase,
	Building2,
	Calendar,
	Camera,
	ClipboardList,
	Code2,
	CreditCard,
	Database,
	DollarSign,
	Download,
	Facebook,
	FileText,
	GraduationCap,
	HelpCircle,
	Instagram,
	Link2,
	Linkedin,
	LogIn,
	MessageSquare,
	Music,
	Network,
	Radio,
	Shield,
	Star,
	Target,
	Trophy,
	Twitter,
	Users,
	Youtube
} from 'lucide-react';

export const adminIconMap: Record<string, LucideIcon> = {
	Award,
	BarChart,
	BarChart3,
	Bell,
	BookMarked,
	BookOpen,
	Briefcase,
	Building2,
	Calendar,
	Camera,
	ClipboardList,
	Code2,
	CreditCard,
	Database,
	DollarSign,
	Download,
	Facebook,
	FileText,
	GraduationCap,
	HelpCircle,
	Instagram,
	Linkedin,
	Link2,
	LogIn,
	MessageSquare,
	Music,
	Network,
	Radio,
	Shield,
	Star,
	Target,
	Trophy,
	Twitter,
	Users,
	Youtube
};

export const adminIconNames = Object.keys(adminIconMap).sort();

export function renderAdminIcon(
	name: string | undefined,
	className = 'h-4 w-4'
) {
	const Icon = (name && adminIconMap[name]) || Link2;
	return <Icon className={className} />;
}

export function AdminIconSelect({
	value,
	onChange,
	placeholder = 'Default link icon'
}: {
	value: string;
	onChange: (next: string | undefined) => void;
	placeholder?: string;
}) {
	return (
		<div className='flex items-stretch gap-2'>
			<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600'>
				{renderAdminIcon(value, 'h-4 w-4')}
			</div>
			<select
				value={value}
				onChange={event => onChange(event.target.value || undefined)}
				className='h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
				<option value=''>{placeholder}</option>
				{adminIconNames.map(name => (
					<option key={name} value={name}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}
