#!/usr/bin/env node
/**
 * Programmatic flattening pass over every admin form.
 *
 * Applies the rules in docs/ADMIN_FORM_DESIGN_LANGUAGE.md uniformly:
 *  - strips the outer "rounded-xl border bg-white p-6 shadow-sm" wrapper from <form>
 *  - removes max-h-[70vh]/overflow-y-auto from form roots (sheet owns scroll)
 *  - flattens repeating "rounded-lg border bg-white/95 p-5 shadow-sm hover:shadow-md"
 *    item cards down to a single light surface
 *  - replaces gradient save buttons with the solid primary
 *  - normalises status pills to plain text
 *
 * This is intentionally regex-based — the per-file structures are too varied for
 * a full migration, but these substitutions remove the dominant clutter sources
 * affecting every form. Forms can be migrated to form-kit primitives over time.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const adminRoot = path.resolve(
	here,
	'..',
	'src',
	'app',
	'(Private Pages)',
	'admin'
);

/** @type {Array<[RegExp, string]>} */
const substitutions = [
	// Outer form card wrapper variants → flat
	[
		/className=(['"`])space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-\[70vh\] overflow-y-auto overflow-x-hidden\1/g,
		"className=$1space-y-6$1"
	],
	[
		/className=(['"`])space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-\[70vh\] overflow-y-auto\1/g,
		"className=$1space-y-6$1"
	],
	[
		/className=(['"`])space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm\1/g,
		"className=$1space-y-6$1"
	],
	[
		/className=(['"`])space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-h-\[70vh\] overflow-y-auto overflow-x-hidden\1/g,
		"className=$1space-y-8$1"
	],
	[
		/className=(['"`])space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm\1/g,
		"className=$1space-y-8$1"
	],
	[
		/className=(['"`])space-y-6 p-6 max-h-\[80vh\] overflow-y-auto\1/g,
		"className=$1space-y-6$1"
	],
	[
		/ max-h-\[70vh\] overflow-y-auto overflow-x-hidden/g,
		''
	],
	[/ max-h-\[70vh\] overflow-y-auto/g, ''],
	[/ max-h-\[80vh\] overflow-y-auto/g, ''],

	// Per-item card chrome → single calm surface
	[
		/rounded-lg border border-slate-200 bg-white\/95 p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'
	],
	[
		/rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'
	],
	[
		/rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'
	],
	[
		/rounded-lg border border-slate-200 bg-white\/95 p-5 shadow-sm/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4'
	],
	[
		/rounded-lg border border-slate-200 bg-slate-50 p-4/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4'
	],

	// Gradient buttons → solid primary
	[
		/bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-lg hover:from-sky-400 hover:via-blue-400 hover:to-indigo-400/g,
		'bg-blue-700 text-white hover:bg-blue-800'
	],
	[
		/bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500[^"'`]*hover:from-sky-400[^"'`]*hover:to-indigo-400/g,
		'bg-blue-700 text-white hover:bg-blue-800'
	],
	[
		/bg-gradient-to-r from-blue-600 to-indigo-600[^"'`]*hover:from-blue-700[^"'`]*hover:to-indigo-700/g,
		'bg-blue-700 text-white hover:bg-blue-800'
	],
	[
		/bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600[^"'`]*/g,
		'bg-blue-700 text-white hover:bg-blue-800'
	],

	// Custom focus ring stacking on top of shadcn → remove
	[/ focus:border-blue-500 focus:ring-blue-500\/40/g, ''],
	[/ focus:border-blue-500 focus:ring-2 focus:ring-blue-500\/40/g, ''],
	[/ border-slate-200 bg-white text-slate-900 placeholder:text-slate-400/g, ''],

	// Decorative gradient header strips → simple heading
	[
		/bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50/g,
		'bg-slate-50'
	],

	// Per-item gradient pills/badges → calm slate
	[
		/bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200/g,
		'bg-blue-50 text-blue-700'
	],

	// Status pill emerald → text
	[
		/rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700/g,
		'text-sm text-emerald-600'
	],

	// Section wrappers that double as cards → flat (no border, no bg)
	[
		/className=(['"`])space-y-4 rounded-xl border border-slate-200 bg-slate-50\/60 p-5\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])space-y-6 rounded-xl border border-slate-200 bg-slate-50\/60 p-5\1/g,
		"className=$1space-y-6$1"
	],
	[
		/className=(['"`])space-y-4 rounded-2xl border border-slate-200 bg-slate-50\/60 p-6\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])space-y-4 rounded-xl border border-slate-200 bg-white\/70 p-5\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])rounded-xl border border-slate-200 bg-slate-50\/60 p-5\1/g,
		'className=$1$1'
	],

	// Items nested INSIDE the above section wrappers (now flat) → single calm surface
	[
		/className=(['"`])space-y-4 rounded-xl border border-slate-200 bg-white p-4\1/g,
		"className=$1space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],
	[
		/className=(['"`])space-y-3 rounded-xl border border-slate-200 bg-white p-4\1/g,
		"className=$1space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],
	[
		/className=(['"`])rounded-xl border border-slate-200 bg-white p-4\1/g,
		"className=$1rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],
	[
		/className=(['"`])space-y-4 rounded-lg border border-slate-200 bg-slate-50\/50 p-4\1/g,
		"className=$1space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],
	[
		/className=(['"`])rounded-lg border border-slate-200 p-4 space-y-4 bg-slate-50\/50\1/g,
		"className=$1space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],
	[
		/className=(['"`])rounded-lg border border-slate-200 bg-slate-50\/50 p-4 space-y-3\1/g,
		"className=$1space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],
	[
		/className=(['"`])rounded-lg border border-slate-200 bg-slate-50\/50 p-4 space-y-4\1/g,
		"className=$1space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],

	// Decorative emerald/success pills → quiet text
	[
		/rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700/g,
		'text-sm text-emerald-600'
	],
	[
		/rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700/g,
		'text-sm text-rose-600'
	],
	[
		/rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700/g,
		'text-sm text-rose-600'
	],

	// Section wrapper variants with responsive padding → flat
	[
		/className=(['"`])space-y-4 rounded-xl border border-slate-200 bg-slate-50\/60 p-4 sm:p-5\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])space-y-6 rounded-xl border border-slate-200 bg-slate-50\/60 p-4 sm:p-5\1/g,
		"className=$1space-y-6$1"
	],
	[
		/className=(['"`])space-y-4 rounded-xl border border-slate-200 bg-slate-50\/60 p-4 sm:p-6\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])space-y-4 rounded-2xl border border-slate-200 bg-slate-50\/60 p-5\1/g,
		"className=$1space-y-4$1"
	],

	// Item cards with sm:p-5 / shadow-sm hover:shadow → single light surface
	[
		/rounded-xl border border-slate-200 bg-slate-50\/80 p-4 sm:p-5 shadow-sm transition hover:border-slate-300 hover:shadow/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'
	],
	[
		/rounded-xl border border-slate-200 bg-slate-50\/80 p-4 sm:p-5 shadow-sm/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4'
	],
	[
		/rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition hover:border-slate-300 hover:shadow/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50'
	],
	[
		/rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm/g,
		'rounded-lg border border-slate-200 bg-slate-50/60 p-4'
	],

	// Misc remaining: bg-slate-50/70 variants, bg-white items
	[
		/className=(['"`])space-y-4 rounded-xl border border-slate-200 bg-slate-50\/70 p-4\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])space-y-3 rounded-xl border border-slate-200 bg-slate-50\/70 p-4\1/g,
		"className=$1space-y-3$1"
	],
	[
		/className=(['"`])space-y-5 rounded-2xl border border-slate-200 bg-white p-5\1/g,
		"className=$1space-y-5$1"
	],
	[
		/className=(['"`])flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4\1/g,
		"className=$1flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],
	[
		/className=(['"`])flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4\1/g,
		"className=$1flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50$1"
	],
	[
		/(['"`])space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5\1/g,
		"$1space-y-4$1"
	],

	// Form roots with p-6 padding when sheet already pads
	[
		/className=(['"`])space-y-6 p-6\1/g,
		"className=$1space-y-6$1"
	],
	[
		/className=(['"`])space-y-8 p-6\1/g,
		"className=$1space-y-8$1"
	],

	// Class-order variants of "p-4 border rounded-lg + space-y-*"
	[
		/className=(['"`])p-4 border rounded-lg space-y-3\1/g,
		"className=$1space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4$1"
	],
	[
		/className=(['"`])p-4 border rounded-lg space-y-4\1/g,
		"className=$1space-y-4 rounded-lg border border-slate-200 bg-slate-50/60 p-4$1"
	],
	[
		/className=(['"`])bg-white border rounded-lg shadow-sm\1/g,
		"className=$1rounded-lg border border-slate-200 bg-slate-50/60$1"
	],
	[
		/className=(['"`])bg-white border rounded-lg shadow-sm p-4\1/g,
		"className=$1rounded-lg border border-slate-200 bg-slate-50/60 p-4$1"
	],

	// Destructive button text/bg colors → consistent rose-600
	[/ text-red-500 hover:text-red-700 hover:bg-red-50/g, ' text-rose-600 hover:bg-rose-50 hover:text-rose-700'],
	[/ text-red-600 hover:bg-red-50/g, ' text-rose-600 hover:bg-rose-50'],

	// Bare <Card> as a section wrapper → flat (no border/bg/shadow)
	[
		/<Card>\n/g,
		'<Card className="border-0 bg-transparent shadow-none p-0">\n'
	],

	// Bare <Card> / <Card key={...}> with no className → calm slate
	[
		/<Card key=\{([^}]+)\}>/g,
		'<Card key={$1} className="border-slate-200 bg-slate-50/60 shadow-none">'
	],
	[
		/<Card key=\{([^}]+)\} className=(['"`])relative\2>/g,
		'<Card key={$1} className=$2relative border-slate-200 bg-slate-50/60 shadow-none$2>'
	],
	[
		/<Card key=\{([^}]+)\} className=(['"`])relative overflow-hidden\2>/g,
		'<Card key={$1} className=$2relative overflow-hidden border-slate-200 bg-slate-50/60 shadow-none$2>'
	],

	// Normalize all shadcn Card item wrappers to calm slate surface
	[
		/<Card([^>]*) className=(['"`])border border-gray-200 shadow-sm\2/g,
		'<Card$1 className=$2border-slate-200 bg-slate-50/60 shadow-none$2'
	],
	[
		/<Card([^>]*) className=(['"`])border border-gray-100\2/g,
		'<Card$1 className=$2border-slate-200 bg-slate-50/60 shadow-none$2'
	],
	[
		/<Card([^>]*) className=(['"`])border-gray-200\2/g,
		'<Card$1 className=$2border-slate-200 bg-slate-50/60 shadow-none$2'
	],

	// shadcn Card wrapping item content → minimal wrapper
	// We can't easily transform JSX Card→div via regex; instead style its props
	[
		/<Card([^>]*) className=(['"`])bg-gray-50\2/g,
		'<Card$1 className=$2border-slate-200 bg-slate-50/60 shadow-none$2'
	],
	[
		/<Card([^>]*) className=(['"`])bg-gray-50 (.+?)\2/g,
		'<Card$1 className=$2border-slate-200 bg-slate-50/60 shadow-none $3$2'
	],

	// Generic "p-4 border rounded-lg" item without colors → light surface
	[
		/className=(['"`])space-y-3 p-4 border rounded-lg\1/g,
		"className=$1space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4$1"
	],
	[
		/className=(['"`])space-y-4 p-4 border rounded-lg\1/g,
		"className=$1space-y-4 rounded-lg border border-slate-200 bg-slate-50/60 p-4$1"
	],
	[
		/className=(['"`])p-4 border rounded-lg\1/g,
		"className=$1rounded-lg border border-slate-200 bg-slate-50/60 p-4$1"
	],

	// Inline sticky save-bars with shadow-lg → match AdminFormFooter style
	[
		/sticky bottom-4 bg-white p-4 border rounded-xl shadow-lg flex justify-end z-50/g,
		'sticky bottom-0 -mx-4 mt-2 flex justify-end gap-2 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6'
	],

	// Loud empty states (orange/blue/gray with border-2 border-dashed) → quiet slate
	[
		/text-center py-12 bg-(?:orange|blue|gray|red|green|purple|yellow)-50 rounded-2xl border-2 border-dashed border-(?:orange|blue|gray|red|green|purple|yellow)-300/g,
		'text-center py-8 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 text-slate-500'
	],
	[
		/p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 space-y-4 relative/g,
		'space-y-4'
	],

	// Decorative gradient banners around form sections → flat space-y-4
	[
		/className=(['"`])bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-blue-200\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 space-y-4\1/g,
		"className=$1space-y-4$1"
	],
	[
		/className=(['"`])p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200\1/g,
		"className=$1space-y-4$1"
	],
	[
		/p-6 bg-gradient-to-br from-(?:blue|sky|indigo|purple|pink|orange|emerald)-50 to-[a-z]+-50 rounded-2xl border-2 border-[a-z]+-200/g,
		'space-y-4'
	],
	[
		/bg-gradient-to-r from-(?:blue|sky|indigo|purple|pink|orange|emerald)-50 (?:via-[a-z]+-50 )?to-[a-z]+-50 p-6 rounded-2xl border(?:-2)? border-[a-z]+-200/g,
		'space-y-4'
	],

	// border-2 anywhere on form chrome → border (per design doc, no border-2)
	[/ border-2 border-blue-200/g, ' border border-slate-200'],
	[/ border-2 border-orange-200/g, ' border border-slate-200'],
	[/ border-2 border-purple-200/g, ' border border-slate-200'],

	// Double-bordered nested cards inside cards: a common pattern was
	//   <div class="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
	//     <div class="rounded-md border border-slate-200 bg-white p-3">
	// → drop the inner box, keep content
	[
		/className=(['"`])rounded-md border border-slate-200 bg-white p-3\1/g,
		'className=$1p-1$1'
	]
];

async function* walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			yield* walk(full);
		} else if (entry.isFile() && entry.name.endsWith('Form.tsx')) {
			yield full;
		}
	}
}

let touched = 0;
let scanned = 0;
const changedFiles = [];

for await (const file of walk(adminRoot)) {
	scanned += 1;
	const original = await fs.readFile(file, 'utf8');
	let next = original;
	for (const [pattern, replacement] of substitutions) {
		next = next.replace(pattern, replacement);
	}
	if (next !== original) {
		await fs.writeFile(file, next);
		touched += 1;
		changedFiles.push(path.relative(path.resolve(here, '..'), file));
	}
}

console.log(`Scanned ${scanned} *Form.tsx files; updated ${touched}.`);
for (const file of changedFiles) {
	console.log(`  • ${file}`);
}
