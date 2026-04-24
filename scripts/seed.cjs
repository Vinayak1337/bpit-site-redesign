const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Map of friendly names to script filenames
const SCRIPTS = {
	about: 'seed-about.cjs',
	admin: 'seed-admin.cjs',
	contacts: 'seed-contacts.cjs',
	governance: 'seed-governance-policies.cjs',
	home: 'seed-homepage.cjs',
	internships: 'seed-internships.cjs',
	leadership: 'seed-leadership-team.cjs',
	management: 'seed-management.cjs',
	'placement-overview': 'seed-placement-overview.cjs',
	'placement-stats': 'seed-placement-statistics.cjs',
	recruiters: 'seed-recruiters.cjs',
	training: 'seed-training-placement.cjs',
	vision: 'seed-vision-mission.cjs',

	// New Main Pages
	'student-life': 'seed-student-life.cjs',
	admissions: 'seed-admissions.cjs',
	academia: 'seed-academia.cjs',
	'academia-academic-calendar': 'seed-academia-academic-calendar.cjs',
	'academia-examination': 'seed-academia-examination.cjs',
	'academia-notices-circulars': 'seed-academia-notices-circulars.cjs',
	'academia-syllabus-ordinance': 'seed-academia-syllabus-ordinance.cjs',
	'academia-library': 'seed-academia-library.cjs',
	'academia-library-rules': 'seed-academia-library-rules.cjs',
	'academia-library-timings': 'seed-academia-library-timings.cjs',
	'academia-library-moocs': 'seed-academia-library-moocs.cjs',
	'academia-library-delnet': 'seed-academia-library-delnet.cjs',
	'academia-library-ndli': 'seed-academia-library-ndli.cjs',
	'academia-library-newspapers': 'seed-academia-library-newspapers.cjs',
	'academia-library-photocopy-service': 'seed-academia-library-photocopy-service.cjs',
	'academia-library-information': 'seed-academia-library-information.cjs',
	'academia-library-weeding-out': 'seed-academia-library-weeding-out.cjs',
	'academia-library-self-learning': 'seed-academia-library-self-learning.cjs',
	'academia-library-digital-library': 'seed-academia-library-digital-library.cjs',
	'academia-library-book-acquisition': 'seed-academia-library-book-acquisition.cjs',
	'academia-library-book-bank': 'seed-academia-library-book-bank.cjs',
	'academia-library-e-resources': 'seed-academia-library-e-resources.cjs',
	'academia-library-services': 'seed-academia-library-services.cjs',
	'academia-library-collection': 'seed-academia-library-collection.cjs',
	'academia-library-staff': 'seed-academia-library-staff.cjs',
	'academia-library-advisory-committee': 'seed-academia-library-advisory-committee.cjs',
	'academia-library-downloads': 'seed-academia-library-downloads.cjs',
	'academia-library-useful-links': 'seed-academia-library-useful-links.cjs',
	'academia-library-contact': 'seed-academia-library-contact.cjs',

	// Statutory Committees & Aliases
	statutory: 'seed-statutory-committees.cjs',
	committees: 'seed-statutory-committees.cjs',
	iqac: 'seed-statutory-committees.cjs',
	'anti-ragging': 'seed-statutory-committees.cjs',
	'internal-complaints': 'seed-statutory-committees.cjs',
	'student-welfare': 'seed-statutory-committees.cjs', // Placeholder if added to script
	grievance: 'seed-statutory-committees.cjs', // Placeholder if added to script

	gallery: 'seed-gallery.cjs',
	'mandatory-disclosure': 'seed-mandatory-disclosure.cjs',

	// Public pages migrated from hardcoded to DB
	'academia-overview': 'seed-academia-overview.cjs',
	accreditation: 'seed-accreditation.cjs',
	departments: 'seed-departments.cjs',
	'privacy-policy': 'seed-privacy-policy.cjs',
	'terms-of-service': 'seed-terms-of-service.cjs'
};

const args = process.argv.slice(2);

if (args.length === 0) {
	console.log('❌ Please provide at least one script name to run.');
	console.log('\nAvailable scripts:');
	Object.keys(SCRIPTS)
		.sort()
		.forEach(key => {
			console.log(`  - ${key}`);
		});
	console.log('\nUsage: npm run seed <script-name> [script-name-2] ...');
	console.log('Example: npm run seed about contact');
	process.exit(1);
}

// Validate all scripts first
const invalidScripts = args.filter(name => !SCRIPTS[name]);
if (invalidScripts.length > 0) {
	console.error(`❌ Unknown script(s): ${invalidScripts.join(', ')}`);
	console.log('\nAvailable scripts:');
	Object.keys(SCRIPTS)
		.sort()
		.forEach(key => {
			console.log(`  - ${key}`);
		});
	process.exit(1);
}

const runScript = (fileName, aliases) => {
	return new Promise((resolve, reject) => {
		const scriptPath = path.join(__dirname, fileName);

		if (!fs.existsSync(scriptPath)) {
			reject(new Error(`Script file not found: ${fileName}`));
			return;
		}

		const aliasStr = aliases.join(', ');
		console.log(
			`\n🚀 Running seed script: ${fileName} (covering: ${aliasStr})...`
		);

		// Use process.execPath to ensure we use the same node binary
		// Remove shell: true to properly handle paths with spaces
		const child = spawn(process.execPath, [scriptPath], {
			stdio: 'inherit'
		});

		child.on('close', code => {
			if (code === 0) {
				console.log(`✅ Successfully ran ${fileName}`);
				resolve();
			} else {
				reject(new Error(`Script ${fileName} failed with code ${code}`));
			}
		});

		child.on('error', err => {
			reject(err);
		});
	});
};

async function runAll() {
	// Group by filename to run each unique script file only once
	const fileGroups = new Map(); // fileName -> [aliases]

	for (const name of args) {
		const fileName = SCRIPTS[name];
		if (!fileGroups.has(fileName)) {
			fileGroups.set(fileName, []);
		}
		fileGroups.get(fileName).push(name);
	}

	let hasError = false;

	for (const [fileName, aliases] of fileGroups) {
		try {
			await runScript(fileName, aliases);
		} catch (error) {
			console.error(`❌ ${error.message}`);
			hasError = true;
			break;
		}
	}

	if (hasError) {
		process.exit(1);
	} else {
		console.log('\n✨ All requested scripts completed successfully!');
	}
}

runAll();
