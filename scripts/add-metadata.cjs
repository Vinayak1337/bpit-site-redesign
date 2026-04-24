#!/usr/bin/env node
/**
 * One-shot SEO metadata injector.
 * Adds `export const metadata: Metadata = {...}` to public route files that lack it.
 * Skips client components (prepends a sibling layout.tsx instead if one doesn't exist).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_ROOT = path.join(ROOT, 'src/app/(Public Pages)');

// route path → { title, description }
const META = {
	'/': {
		title: 'Home',
		description:
			'Bhagwan Parshuram Institute of Technology — GGSIPU-affiliated, NBA-accredited engineering college in Rohini, Delhi offering BTech programs in CSE, IT, ECE, EEE and allied branches.'
	},
	'/about': {
		title: 'About BPIT',
		description:
			'Learn about Bhagwan Parshuram Institute of Technology — our history, vision, academic ethos, and commitment to engineering excellence in Delhi.'
	},
	'/about/founder-tribute': {
		title: 'Founder Tribute',
		description:
			'A tribute to the founder whose vision shaped BPIT into a leading engineering institute affiliated with GGSIPU in Delhi.'
	},
	'/about/chairman-message': {
		title: "Chairman's Message",
		description:
			"Message from the Chairman of BPIT on the institute's mission, values, and continued commitment to quality engineering education."
	},
	'/about/principal-message': {
		title: "Principal's Message",
		description:
			"Message from the Principal of BPIT on academic excellence, student growth, and research at Bhagwan Parshuram Institute of Technology."
	},
	'/vision-mission': {
		title: 'Vision & Mission',
		description:
			'The vision and mission of BPIT — guiding principles that drive teaching, research, innovation and industry engagement at the institute.'
	},
	'/vision-mission/mission': {
		title: 'Mission',
		description:
			'The mission of BPIT — delivering quality technical education, fostering research, and producing industry-ready engineers with strong ethics.'
	},
	'/vision-mission/quality-policy': {
		title: 'Quality Policy',
		description:
			'BPIT quality policy outlining our commitment to continual improvement in teaching, learning, research and student outcomes.'
	},
	'/management': {
		title: 'Management',
		description:
			'Governance and management of Bhagwan Parshuram Institute of Technology — leadership, structure, policies and procedures.'
	},
	'/management/leadership-team': {
		title: 'Leadership Team',
		description:
			'Meet the BPIT leadership team driving academic, administrative and strategic direction at the institute.'
	},
	'/management/governance-structure': {
		title: 'Governance Structure',
		description:
			"Organisational and governance structure of BPIT detailing committees, reporting lines and the institute's management hierarchy."
	},
	'/management/policies-procedures': {
		title: 'Policies & Procedures',
		description:
			'Institutional policies and procedures covering academics, administration, HR, and student services at BPIT.'
	},
	'/statutory-committees': {
		title: 'Statutory Committees',
		description:
			'Statutory committees at BPIT — IQAC, Anti-Ragging, Internal Complaints, Student Welfare and Grievance Redressal.'
	},
	'/mandatory-disclosure': {
		title: 'Mandatory Disclosure',
		description:
			'Mandatory disclosures of BPIT as per regulatory requirements — institutional, academic and infrastructure details.'
	},
	'/gallery': {
		title: 'Gallery',
		description:
			'Photo gallery of BPIT — campus life, events, festivals, labs, workshops, cultural and academic moments from the institute.'
	},
	'/accreditation': {
		title: 'Accreditation',
		description:
			'Accreditations, approvals and affiliations held by BPIT — NBA, AICTE, GGSIPU and other recognitions of academic quality.'
	},
	'/privacy-policy': {
		title: 'Privacy Policy',
		description:
			"BPIT privacy policy — how the institute's website collects, uses, and protects visitor information."
	},
	'/terms-of-service': {
		title: 'Terms of Service',
		description:
			'Terms of service governing the use of the BPIT website and its content.'
	},
	// Academia
	'/academia': {
		title: 'Academia',
		description:
			'Academic programmes, examination, calendar, syllabus, notices and library at Bhagwan Parshuram Institute of Technology.'
	},
	'/academia/academic-calendar': {
		title: 'Academic Calendar',
		description:
			'BPIT academic calendar — semester schedules, examination dates, holidays, and key academic events for the current session.'
	},
	'/academia/examination': {
		title: 'Examination',
		description:
			'Examination information at BPIT — schedules, exam cell contacts, policies, re-evaluation, and related academic procedures.'
	},
	'/academia/syllabus-ordinance': {
		title: 'Syllabus & Ordinance',
		description:
			'Syllabus and ordinance documents for BTech programmes at BPIT as per the GGSIPU curriculum across all semesters.'
	},
	'/academia/notices-circulars': {
		title: 'Notices & Circulars',
		description:
			'Latest official notices and circulars issued by BPIT for students, faculty and staff.'
	},
	// Library hub + subpages
	'/academia/library': {
		title: 'Library',
		description:
			'The BPIT Library — books, journals, digital resources, research support and modern study spaces for students and faculty.'
	},
	'/academia/library/rules': {
		title: 'Library Rules',
		description:
			'Library rules and code of conduct at BPIT — borrowing limits, silence zones, and guidelines for students and faculty.'
	},
	'/academia/library/timings': {
		title: 'Library Timings',
		description:
			'Working hours of the BPIT library on regular days, weekends, exam periods and holidays.'
	},
	'/academia/library/moocs': {
		title: 'MOOCs',
		description:
			'Massive Open Online Courses (MOOCs) curated by the BPIT library — SWAYAM, NPTEL and other platforms for skill development.'
	},
	'/academia/library/delnet': {
		title: 'DELNET',
		description:
			'Access information for DELNET (Developing Library Network) resources available through the BPIT library.'
	},
	'/academia/library/ndli': {
		title: 'National Digital Library of India',
		description:
			'Using the National Digital Library of India (NDLI) through BPIT — millions of e-books, journals and multimedia resources.'
	},
	'/academia/library/newspapers': {
		title: 'Newspapers & Magazines',
		description:
			'Newspapers, magazines and periodicals subscribed by the BPIT library for daily reading and current affairs.'
	},
	'/academia/library/photocopy-service': {
		title: 'Photocopy Service',
		description:
			'In-library photocopy service details and rates available to BPIT students and faculty.'
	},
	'/academia/library/information': {
		title: 'Library Information',
		description:
			'General information about the BPIT library — location, contact, services and facilities.'
	},
	'/academia/library/weeding-out': {
		title: 'Weeding-Out Policy',
		description:
			'Weeding-out policy followed by the BPIT library for removing outdated or unused titles from the collection.'
	},
	'/academia/library/self-learning': {
		title: 'Self-Learning',
		description:
			'Self-learning resources curated by the BPIT library — e-books, video lectures, and online courses.'
	},
	'/academia/library/digital-library': {
		title: 'Digital Library',
		description:
			'Digital library resources at BPIT — e-books, journals, databases and research tools available online to students and faculty.'
	},
	'/academia/library/book-acquisition': {
		title: 'Book Acquisition',
		description:
			'Book acquisition policy and requisition process followed by the BPIT library.'
	},
	'/academia/library/book-bank': {
		title: 'Book Bank',
		description:
			'BPIT library book bank scheme — eligibility, procedures and available titles for long-term lending.'
	},
	'/academia/library/e-resources': {
		title: 'E-Resources',
		description:
			'Electronic resources subscribed by the BPIT library — databases, e-journals, and online research platforms.'
	},
	'/academia/library/services': {
		title: 'Library Services',
		description:
			'Services offered by the BPIT library — reference, circulation, inter-library loans, research support and more.'
	},
	'/academia/library/collection': {
		title: 'Collection',
		description:
			'Overview of the BPIT library collection — books, journals, reports, thesis and digital media across engineering disciplines.'
	},
	'/academia/library/staff': {
		title: 'Library Staff',
		description:
			'BPIT library staff directory — librarians and support team with contact details and specialisations.'
	},
	'/academia/library/advisory-committee': {
		title: 'Library Advisory Committee',
		description:
			'Members of the BPIT library advisory committee overseeing policy, acquisitions and service quality.'
	},
	'/academia/library/downloads': {
		title: 'Library Downloads',
		description:
			'Downloadable forms, policies, and documents from the BPIT library.'
	},
	'/academia/library/useful-links': {
		title: 'Useful Links',
		description:
			'Curated useful links for BPIT students and faculty — databases, portals, tools and learning resources.'
	},
	'/academia/library/contact': {
		title: 'Library Contact',
		description:
			'Contact information for the BPIT library — phone, email, address and working hours.'
	},
	// Admissions
	'/admissions': {
		title: 'Admissions',
		description:
			'Admissions at BPIT — BTech programmes, eligibility, process, fees, scholarships and brochures for the upcoming intake.'
	},
	'/admissions/why-bpit': {
		title: 'Why BPIT',
		description:
			'Reasons to choose BPIT — accreditation, placements, faculty, infrastructure, campus life and industry partnerships.'
	},
	'/admissions/process': {
		title: 'Admission Process',
		description:
			'Step-by-step admission process at BPIT — eligibility, CET, JAC Delhi counselling, documents required and reporting.'
	},
	'/admissions/fees': {
		title: 'Fees',
		description:
			'BTech and other programme fees at BPIT — tuition, development, hostel, and payment schedule per GGSIPU norms.'
	},
	'/admissions/scholarship': {
		title: 'Scholarships',
		description:
			'Scholarships and financial assistance available to BPIT students — government, institutional and merit-based schemes.'
	},
	'/admissions/brochure': {
		title: 'Brochure',
		description:
			'Download the official BPIT admissions brochure with programme details, fees and campus information.'
	},
	'/admissions/faqs': {
		title: 'Admissions FAQs',
		description:
			'Frequently asked questions about BPIT admissions — eligibility, counselling, documents, fees and programme specifics.'
	},
	// Placements
	'/placements/overview': {
		title: 'Placements Overview',
		description:
			'Placement highlights at BPIT — recruiters, packages, success stories, and training support for students.'
	},
	'/placements/training-placement': {
		title: 'Training & Placement',
		description:
			'Training and placement cell at BPIT — career training, soft skills, industry interaction and placement assistance.'
	},
	'/placements/recruiters': {
		title: 'Recruiters',
		description:
			'Companies that have recruited from BPIT — a diverse list of top tech, core engineering and consulting recruiters.'
	},
	'/placements/statistics': {
		title: 'Placement Statistics',
		description:
			'Year-wise BPIT placement statistics — offers, average and highest packages, branch-wise performance.'
	},
	'/placements/internships': {
		title: 'Internships',
		description:
			'Internship opportunities and programmes for BPIT students — industry, research and summer internships.'
	},
	// Student life
	'/student-life': {
		title: 'Student Life',
		description:
			'Student life at BPIT — clubs, societies, campus facilities, events, festivals and support services.'
	},
	'/student-life/campus-facilities': {
		title: 'Campus Facilities',
		description:
			'Facilities on BPIT campus — labs, library, sports, cafeteria, transport, Wi-Fi and learning spaces.'
	},
	'/student-life/clubs-and-societies': {
		title: 'Clubs & Societies',
		description:
			'Student clubs and societies at BPIT — technical, cultural, literary and entrepreneurship groups on campus.'
	},
	'/student-life/events-and-festivals': {
		title: 'Events & Festivals',
		description:
			'Annual events and festivals at BPIT — technical fests, cultural celebrations, workshops and more.'
	},
	'/student-life/student-grievance-cell': {
		title: 'Student Grievance Cell',
		description:
			'Student grievance cell at BPIT — how to raise concerns, contact points and resolution process.'
	},
	'/student-life/code-of-conduct': {
		title: 'Code of Conduct',
		description:
			'Student code of conduct at BPIT outlining discipline, academic integrity and campus behaviour expectations.'
	},
	// Departments
	'/departments': {
		title: 'Departments',
		description:
			'Academic departments at BPIT — programmes, faculty, research areas and departmental highlights across engineering branches.'
	},
	'/departments/cse': {
		title: 'Computer Science & Engineering',
		description:
			'Department of Computer Science and Engineering at BPIT — programmes, faculty, labs, research and student activities.'
	}
};

function relativeRoute(filePath) {
	// strip PUBLIC_ROOT and trailing /page.tsx
	let rel = filePath.substring(PUBLIC_ROOT.length).replace(/\/page\.tsx$/, '');
	// strip route groups like (library layout)
	rel = rel.replace(/\/\([^)]+\)/g, '');
	return rel === '' ? '/' : rel;
}

function walk(dir) {
	const out = [];
	for (const name of fs.readdirSync(dir)) {
		const full = path.join(dir, name);
		const stat = fs.statSync(full);
		if (stat.isDirectory()) out.push(...walk(full));
		else if (name === 'page.tsx') out.push(full);
	}
	return out;
}

function hasMetadata(src) {
	return (
		/export\s+const\s+metadata\s*[:=]/.test(src) ||
		/export\s+async\s+function\s+generateMetadata/.test(src)
	);
}

function isClient(src) {
	return /^['"]use client['"]/.test(src.trim().split('\n')[0]);
}

function injectMetadata(src, route, meta) {
	const titleEscaped = meta.title.replace(/'/g, "\\'");
	const descEscaped = meta.description.replace(/'/g, "\\'");
	const alreadyHasMetadataImport =
		/import[^;]*\{[^}]*\bMetadata\b[^}]*\}[^;]*from\s+['"]next['"]/.test(src);
	const typeImport = alreadyHasMetadataImport
		? ''
		: `import type { Metadata } from 'next';\n`;
	const metaDecl = `\nexport const metadata: Metadata = {\n\ttitle: '${titleEscaped}',\n\tdescription: '${descEscaped}',\n\talternates: { canonical: '${route}' }\n};\n\n`;

	// Walk top of file and find end of import block (tracking brace depth).
	const lines = src.split('\n');
	let i = 0;
	let insertAt = 0;
	// Skip leading blanks and pragmas like 'use client' / comments
	while (i < lines.length) {
		const t = lines[i].trim();
		if (t === '' || t.startsWith('//') || t.startsWith('/*') || t.startsWith("'use ") || t.startsWith('"use ')) {
			i++;
			insertAt = i;
			continue;
		}
		break;
	}
	// Consume import statements (possibly multi-line)
	while (i < lines.length) {
		const t = lines[i].trim();
		if (t === '' || t.startsWith('//')) {
			i++;
			insertAt = i;
			continue;
		}
		if (t.startsWith('import ')) {
			// Find matching end: when line has matching ; or 'from ...' terminator and braces balanced.
			let depth = 0;
			let j = i;
			while (j < lines.length) {
				const lj = lines[j];
				for (const ch of lj) {
					if (ch === '{') depth++;
					else if (ch === '}') depth--;
				}
				if (depth <= 0 && /;\s*(\/\/.*)?$/.test(lj.trimEnd())) {
					break;
				}
				j++;
			}
			i = j + 1;
			insertAt = i;
			continue;
		}
		break;
	}

	const block = `${typeImport}${metaDecl}`;
	lines.splice(insertAt, 0, block);
	return lines.join('\n');
}

function createLayoutWithMetadata(dir, route, meta) {
	const layoutPath = path.join(dir, 'layout.tsx');
	if (fs.existsSync(layoutPath)) {
		const existing = fs.readFileSync(layoutPath, 'utf-8');
		if (hasMetadata(existing)) return null; // already handled
		// inject metadata into existing layout
		const updated = injectMetadata(existing, route, meta);
		fs.writeFileSync(layoutPath, updated);
		return layoutPath;
	}
	const titleEscaped = meta.title.replace(/'/g, "\\'");
	const descEscaped = meta.description.replace(/'/g, "\\'");
	const content = `import type { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n\ttitle: '${titleEscaped}',\n\tdescription: '${descEscaped}',\n\talternates: { canonical: '${route}' }\n};\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n\treturn <>{children}</>;\n}\n`;
	fs.writeFileSync(layoutPath, content);
	return layoutPath;
}

const pages = walk(PUBLIC_ROOT);
let edited = 0;
let newLayouts = 0;
let skipped = [];

for (const p of pages) {
	const route = relativeRoute(p);
	const meta = META[route];
	if (!meta) {
		skipped.push({ route, reason: 'no-meta-entry' });
		continue;
	}
	const src = fs.readFileSync(p, 'utf-8');
	if (hasMetadata(src)) {
		skipped.push({ route, reason: 'already-has-metadata' });
		continue;
	}
	if (isClient(src)) {
		const layout = createLayoutWithMetadata(path.dirname(p), route, meta);
		if (layout) {
			newLayouts++;
			console.log('+ LAYOUT ' + path.relative(ROOT, layout));
		} else {
			skipped.push({ route, reason: 'layout-exists-with-metadata' });
		}
		continue;
	}
	const updated = injectMetadata(src, route, meta);
	fs.writeFileSync(p, updated);
	edited++;
	console.log('~ PAGE   ' + path.relative(ROOT, p));
}

console.log('\n=== Summary ===');
console.log('Pages edited:      ' + edited);
console.log('Layouts created:   ' + newLayouts);
console.log('Skipped:           ' + skipped.length);
if (skipped.length) {
	const grouped = {};
	for (const s of skipped) {
		grouped[s.reason] = (grouped[s.reason] || 0) + 1;
	}
	console.log('Skip reasons:      ' + JSON.stringify(grouped));
}
