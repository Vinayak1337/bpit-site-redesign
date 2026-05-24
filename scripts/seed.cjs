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

	// Global site chrome (navbar + footer)
	'site-chrome': 'seed-site-chrome.cjs',
	navbar: 'seed-site-chrome.cjs',
	footer: 'seed-site-chrome.cjs'
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
