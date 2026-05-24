const baseUrl = process.env.SITE_URL || 'http://localhost:3001';
const currentYear = String(new Date().getFullYear());

const checks = [];

const assert = (condition, message) => {
	if (!condition) {
		throw new Error(message);
	}
	checks.push(message);
};

const fetchText = async path => {
	const response = await fetch(`${baseUrl}${path}`, {
		redirect: 'manual'
	});
	const text = await response.text();
	return { response, text };
};

const publicHome = await fetchText('/');
assert(publicHome.response.ok, 'public homepage responds successfully');
assert(
	publicHome.text.includes(currentYear),
	'public footer includes the current year'
);
assert(
	!publicHome.text.includes('Sitemap'),
	'public footer does not include Sitemap'
);
assert(
	publicHome.text.includes('BPIT Logo') || publicHome.text.includes('/logo.png'),
	'public header renders a logo fallback'
);

const adminHome = await fetchText('/admin/home');
assert(
	adminHome.response.status === 200 ||
		adminHome.response.status === 303 ||
		adminHome.response.status === 307 ||
		adminHome.response.status === 308,
	'admin home responds or redirects to login'
);

if (adminHome.response.status === 200) {
	assert(
		adminHome.text.includes('Global site chrome') ||
			adminHome.text.includes('Admin Login'),
		'admin home renders the site chrome editor or login gate'
	);
}

console.log(`Verified site chrome smoke checks against ${baseUrl}`);
checks.forEach(message => console.log(`- ${message}`));
