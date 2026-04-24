// Shared default content for library sub-page seeds. Imported by each
// seed-academia-library-<slug>.cjs. Keep in sync with
// src/app/(Private Pages)/actions/_library-subpage-defaults.ts.

const SIMPLE_DEFAULTS = {
	rules: {
		pageTitle: 'Library Rules',
		hero: {
			eyebrow: 'Library Policies',
			title: 'General Library Rules',
			subtitle:
				'Please follow these rules to ensure a conducive learning environment for all library users.',
			backgroundImage: null,
			gradient: 'from-blue-50 to-indigo-100'
		},
		content: {
			eyebrow: 'Rules & Regulations',
			heading: 'Everything you need to know',
			intro:
				'All library users must carry their valid ID cards and follow the established rules and regulations.',
			sections: [
				{ icon: 'CheckCircle', title: 'Entry and Access Rules', description: 'Valid ID card is mandatory. Register entry/exit in the register. Visitors need librarian permission. Bags to be deposited at the counter.', note: '' },
				{ icon: 'FileText', title: 'Book Borrowing Rules', description: 'Students: 3 books for 15 days, renewable once for 7 days, fine ₹2/day/book. Faculty: 10 books for 30 days, renewable twice, fine ₹5/day/book. Reference books are for library use only.', note: '' },
				{ icon: 'XCircle', title: 'Prohibited Activities', description: 'No loud talking, mobile phone use, eating, drinking, marking of library material, or removing books without proper checkout.', note: '' },
				{ icon: 'Monitor', title: 'Digital Library Rules', description: 'Computers are for academic use only. Maximum 2 hours per session. No unauthorized software downloads. Report technical issues to staff.', note: '' },
				{ icon: 'AlertCircle', title: 'Penalties and Fines', description: 'Late returns: ₹2–5 per day per book. Damage: replacement cost + ₹50 processing. Loss: 2× book cost + ₹100 processing. Rule violations may lead to warning or temporary suspension.', note: '' }
			],
			body: ''
		}
	},
	timings: {
		pageTitle: 'Library Timings',
		hero: { eyebrow: 'Hours of Operation', title: 'Library Timings', subtitle: 'Plan your library visits with our comprehensive timing schedule. Extended hours available during examination periods.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Schedule',
			heading: 'Regular and Examination Hours',
			intro: 'Library cards are required during all hours. Holiday timings may vary.',
			sections: [
				{ icon: 'Calendar', title: 'Monday – Friday', description: '8:00 AM – 8:00 PM', note: 'Regular weekday hours' },
				{ icon: 'Calendar', title: 'Saturday', description: '9:00 AM – 6:00 PM', note: '' },
				{ icon: 'Calendar', title: 'Sunday', description: '10:00 AM – 5:00 PM', note: '' },
				{ icon: 'AlertCircle', title: 'Examination Period', description: 'Monday – Sunday: 8:00 AM – 10:00 PM', note: 'Extended hours during mid-semester and final examinations.' },
				{ icon: 'BookOpen', title: 'Reading Hall', description: '24/7 Access — Available for students with extended study hours.', note: '' },
				{ icon: 'Database', title: 'Digital Library', description: '24/7 Online — Access digital resources anytime from anywhere.', note: '' },
				{ icon: 'Clock', title: 'Reference Section', description: '9:00 AM – 6:00 PM — Librarian assistance available during these hours.', note: '' }
			],
			body: 'Silent zones are maintained in reading areas. Food and beverages are not allowed inside the library. Mobile phones must be kept on silent mode.'
		}
	},
	moocs: {
		pageTitle: 'MOOCs',
		hero: { eyebrow: 'Online Learning', title: 'MOOCs (Massive Open Online Courses)', subtitle: 'MOOCs and online learning resources curated for our academic community.', backgroundImage: null, gradient: 'from-slate-50 to-indigo-50' },
		content: { eyebrow: 'Coming Soon', heading: 'Online Courses', intro: 'MOOCs and online learning resources will be available here soon.', sections: [], body: '' }
	},
	delnet: {
		pageTitle: 'DELNET',
		hero: { eyebrow: 'Developing Library Network', title: 'DELNET Services', subtitle: "BPIT is a proud member of DELNET — one of India's premier library networks — providing access to vast information resources, research databases, and collaborative services nationwide.", backgroundImage: null, gradient: 'from-indigo-50 to-blue-100' },
		content: {
			eyebrow: 'Services', heading: 'Connecting Knowledge Nationwide', intro: 'Services available to BPIT students and faculty through DELNET.',
			sections: [
				{ icon: 'Database', title: 'Union Catalog Access', description: 'Access to comprehensive library catalogs across India.', note: '' },
				{ icon: 'BookOpen', title: 'Interlibrary Loans', description: 'Borrow resources from partner institutions.', note: '' },
				{ icon: 'Download', title: 'Document Delivery', description: 'Fast delivery of research papers and documents.', note: '' },
				{ icon: 'Share2', title: 'Collaborative Networks', description: 'Connect with libraries nationwide.', note: '' },
				{ icon: 'Users', title: 'Membership Benefits', description: 'Access to 3000+ library collections, professional development, technical training, research collaboration, and cost-effective information access.', note: '' }
			],
			body: 'How to access: Visit the library for DELNET access credentials, complete registration, and start exploring databases and services.'
		}
	},
	ndli: {
		pageTitle: 'NDLI',
		hero: { eyebrow: 'National Digital Library', title: 'NDLI (National Digital Library of India)', subtitle: 'A single-window facility to access digital educational content across disciplines.', backgroundImage: null, gradient: 'from-slate-50 to-indigo-50' },
		content: { eyebrow: 'Coming Soon', heading: 'Access NDLI', intro: 'National Digital Library of India resources will be available here soon.', sections: [], body: '' }
	},
	newspapers: {
		pageTitle: 'Newspapers',
		hero: { eyebrow: 'Current Affairs', title: 'Newspapers', subtitle: 'Stay updated with current affairs and industry news through our collection of national and international newspapers.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Collection', heading: 'Newspaper Collection', intro: 'Our library subscribes to various newspapers in English and Hindi to keep our academic community informed.',
			sections: [
				{ icon: 'Newspaper', title: 'English Newspapers', description: 'The Times of India, The Hindu, Hindustan Times, Indian Express, Economic Times, Business Standard, Deccan Herald.', note: '' },
				{ icon: 'Newspaper', title: 'Hindi Newspapers', description: 'Dainik Jagran, Amar Ujala, Dainik Bhaskar, Rajasthan Patrika, Navbharat Times, Punjab Kesari.', note: '' },
				{ icon: 'BookOpen', title: 'Specialized Publications', description: 'Engineering magazines, technology journals, trade publications, industry newsletters, research bulletins, government gazettes.', note: '' },
				{ icon: 'Clock', title: 'Reading Schedule', description: 'Fresh newspapers by 9:00 AM. Previous day archived. Weekly magazines updated regularly. Back issues available on request.', note: '' }
			],
			body: 'Newspapers are for reading within library premises only. Digital archives of major newspapers are accessible via library computers.'
		}
	},
	'photocopy-service': {
		pageTitle: 'Photocopy Service',
		hero: { eyebrow: 'Services', title: 'Photocopy Service', subtitle: 'Convenient and affordable photocopying services available within the library premises for academic materials.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'In-House Service', heading: 'Quick and economical copying', intro: 'Our in-house photocopy service provides quick and economical copying solutions for students and faculty members for academic purposes.',
			sections: [
				{ icon: 'Copy', title: 'Standard Copying', description: 'Black-and-white copies of books, journals, and academic materials.', note: '' },
				{ icon: 'Clock', title: 'Quick Service', description: 'Fast turnaround time for urgent academic requirements.', note: '' },
				{ icon: 'IndianRupee', title: 'Affordable Rates', description: 'A4: ₹1/page. A3: ₹2/page. Double-sided: ₹1.50/page. Bulk orders: special rates.', note: '' },
				{ icon: 'Clock', title: 'Operating Hours', description: 'Mon–Fri 9:00 AM – 6:00 PM. Sat 9:00 AM – 4:00 PM. Sun: Closed. Lunch break: 1:00 PM – 2:00 PM.', note: '' }
			],
			body: 'Photocopying is permitted for academic purposes only and subject to copyright restrictions. Bulk orders (50+ pages) require advance notice.'
		}
	},
	information: {
		pageTitle: 'Library Information',
		hero: { eyebrow: 'About the Library', title: 'Library Information', subtitle: 'Complete information about BPIT Library facilities, policies, and services. Everything you need to know for an effective library experience.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Overview', heading: 'Facilities, policies and contact', intro: '',
			sections: [
				{ icon: 'MapPin', title: 'Location', description: 'Ground Floor, Academic Block, Bhagwan Parshuram Institute of Technology, PSP-4, Sector-17, Rohini, New Delhi – 110089.', note: '' },
				{ icon: 'Clock', title: 'Operating Hours', description: 'Mon–Fri: 8:00 AM – 8:00 PM. Sat: 9:00 AM – 6:00 PM. Sun: 10:00 AM – 5:00 PM. Exam period: extended hours.', note: '' },
				{ icon: 'Users', title: 'Library Staff', description: 'Chief Librarian: Mr. Vikash Pandey. Assistant Librarian: Ms. Anjali Verma. Digital Coordinator: Ms. Pooja Singh. Support Staff: 3 members.', note: '' },
				{ icon: 'BookOpen', title: 'Collection Size', description: 'Total Books: 50,000+. Digital Resources: 10,000+. Journals: 200+. Online Databases: 25+.', note: '' },
				{ icon: 'Phone', title: 'Direct Contact', description: 'Library: +91-11-2757-1084. Email: librarian@bpitindia.ac.in.', note: '' }
			],
			body: 'Library timings may change during holidays and examinations. Digital resources are accessible 24/7 via the library website. Food and beverages are strictly prohibited.'
		}
	},
	'weeding-out': {
		pageTitle: 'Weeding Out',
		hero: { eyebrow: 'Collection Management', title: 'Weeding Out', subtitle: 'Our systematic weeding process ensures the library collection remains current, relevant, and space-efficient by removing outdated materials.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Process', heading: 'Maintaining a quality collection', intro: 'Weeding is the systematic process of removing outdated, damaged, or irrelevant materials from the library collection.',
			sections: [
				{ icon: 'BookOpen', title: 'Quality Control', description: 'Maintaining high standards by removing worn-out and obsolete materials.', note: '' },
				{ icon: 'RefreshCw', title: 'Collection Refresh', description: 'Making room for new and updated materials that better serve users.', note: '' },
				{ icon: 'Trash2', title: 'Space Management', description: 'Optimizing shelf space and improving accessibility of materials.', note: '' },
				{ icon: 'CheckCircle', title: 'Weeding Criteria', description: 'Age (10–15+ years), condition, usage (not borrowed in 5+ years), obsolescence, duplication, and curriculum relevance.', note: '' },
				{ icon: 'Shield', title: 'Protected Materials', description: 'Historical value works, rare books, reference works, local author works, research-value items, and last copies are retained.', note: '' }
			],
			body: 'Weeding follows planning, review, faculty consultation, evaluation, decision, documentation, and responsible disposal (donation where possible).'
		}
	},
	'self-learning': {
		pageTitle: 'Self Learning',
		hero: { eyebrow: 'Independent Study', title: 'Self Learning Resources', subtitle: 'Empowering Independent Study and Research.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Resources', heading: 'Make the most of your study time', intro: '',
			sections: [
				{ icon: 'BookOpen', title: 'Study Areas', description: 'Quiet zones for individual study and research. Silent reading rooms, individual carrels, comfortable seating.', note: '' },
				{ icon: 'Target', title: 'Research Assistance', description: 'Reference materials, academic databases, research guides.', note: '' },
				{ icon: 'Lightbulb', title: 'Learning Resources', description: 'E-books and journals, course materials, past question papers.', note: '' },
				{ icon: 'Users', title: 'Group Study', description: 'Discussion rooms, group tables, presentation facilities.', note: '' }
			],
			body: 'Tips: use the online catalog to locate resources; take advantage of extended hours during exam periods; maintain silence in quiet zones; book group study rooms in advance.'
		}
	},
	'digital-library': {
		pageTitle: 'Digital Library',
		hero: { eyebrow: 'Digital Resources', title: 'Digital Library', subtitle: 'Comprehensive Digital Resources & Research Database.', backgroundImage: null, gradient: 'from-purple-50 to-indigo-100' },
		content: {
			eyebrow: 'Collections', heading: 'Thousands of resources at your fingertips', intro: '',
			sections: [
				{ icon: 'BookOpen', title: 'E-Books Collection', description: '50,000+ engineering textbooks, reference materials, academic publications.', note: '' },
				{ icon: 'Globe', title: 'Online Journals', description: '15,000+ peer-reviewed research papers, conference proceedings, academic articles.', note: '' },
				{ icon: 'Database', title: 'Research Databases', description: '100+ databases including IEEE Xplore, ACM Digital Library, SpringerLink.', note: '' },
				{ icon: 'Search', title: 'Search Portal', description: 'Cross-database search, advanced filters, citation tools.', note: '' },
				{ icon: 'Clock', title: 'Key Features', description: '24/7 access, secure login, download support, multi-user concurrent access.', note: '' }
			],
			body: 'How to access: log in with your student credentials, search using advanced tools, then download, bookmark, or read online. Cite sources for your research.'
		}
	},
	'book-acquisition': {
		pageTitle: 'Book Acquisition',
		hero: { eyebrow: 'Collection Development', title: 'Book Acquisition', subtitle: 'Our systematic approach to acquiring new books and resources ensures the library collection remains current and comprehensive.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Process', heading: 'How we build the collection', intro: 'We follow a structured process including faculty recommendations, student requests, curriculum requirements, and market research.',
			sections: [
				{ icon: 'BookOpen', title: 'Selection Criteria', description: 'Books are selected based on curriculum relevance, author reputation, and academic value.', note: '' },
				{ icon: 'TrendingUp', title: 'Latest Editions', description: 'Priority given to the latest editions and newly published titles.', note: '' },
				{ icon: 'ShoppingCart', title: 'Budget Planning', description: 'Strategic budget allocation across different subjects and departments.', note: '' },
				{ icon: 'Globe', title: 'Acquisition Sources', description: 'Direct publishers, authorized distributors, online platforms, book fairs, donations, inter-library exchanges.', note: '' },
				{ icon: 'Star', title: 'Priority Categories', description: 'Textbooks, reference books, research materials, journals, digital resources, competitive exam materials.', note: '' }
			],
			body: 'Book request process: submit request, review, approval, procurement, processing, notification. Faculty and students may submit requests via the library portal or circulation desk.'
		}
	},
	'book-bank': {
		pageTitle: 'Book Bank',
		hero: { eyebrow: 'Welfare Scheme', title: 'Book Bank', subtitle: 'Our Book Bank scheme provides textbooks to economically disadvantaged students, ensuring equal access to educational resources.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Scheme', heading: 'Equal access to education', intro: 'The Book Bank is a welfare initiative that provides free textbooks to deserving students for the entire academic year.',
			sections: [
				{ icon: 'BookMarked', title: 'Free Textbooks', description: 'Essential textbooks provided at no cost for the academic year.', note: '' },
				{ icon: 'Users', title: 'Merit & Need Based', description: 'Selection based on academic merit and financial need assessment.', note: '' },
				{ icon: 'GraduationCap', title: 'Academic Support', description: 'Comprehensive support to ensure academic success for all students.', note: '' },
				{ icon: 'CheckCircle', title: 'Eligibility Criteria', description: 'Annual family income below ₹2,00,000; 75% attendance; no backlogs; Indian citizenship; valid income certificate; regular student.', note: '' },
				{ icon: 'Calendar', title: 'Important Dates', description: 'Application opens at the start of each semester. Last date: 15 days after semester begins. Return by the last working day of the semester.', note: '' }
			],
			body: 'Application process: collect form, submit documents, verification, selection, book allotment, return in good condition at year end.'
		}
	},
	'e-resources': {
		pageTitle: 'E-Resources',
		hero: { eyebrow: 'Digital Access', title: 'E-Resources', subtitle: 'Access our comprehensive collection of electronic resources including databases, e-journals, e-books, and digital archives.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Available Resources', heading: 'Scholarly content, anytime', intro: 'Our e-resources provide 24/7 access to scholarly content, research databases, and digital publications.',
			sections: [
				{ icon: 'Database', title: 'Databases', description: 'Specialized academic databases with peer-reviewed content and research papers.', note: '' },
				{ icon: 'Globe', title: 'E-Journals', description: 'Online access to current and archived issues of academic journals.', note: '' },
				{ icon: 'Wifi', title: 'Remote Access', description: 'Off-campus access to subscribed resources for registered users.', note: '' },
				{ icon: 'Cpu', title: 'Engineering Databases', description: 'IEEE Xplore, ASME Digital, ACM Digital Library, ScienceDirect, SpringerLink, Wiley Online.', note: '' },
				{ icon: 'BookOpen', title: 'General Academic Resources', description: 'JSTOR, ProQuest, EBSCO, Taylor & Francis, Sage Publications, Oxford Academic.', note: '' }
			],
			body: 'On-campus: connect to WiFi and access directly. Off-campus: configure VPN and use your credentials. Support: library@bpitindia.edu.in.'
		}
	},
	services: {
		pageTitle: 'Library Services',
		hero: { eyebrow: 'What We Offer', title: 'Library Services', subtitle: 'Comprehensive library services designed to support your academic and research needs — from traditional book lending to cutting-edge digital resources.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Services', heading: 'Everything our library offers', intro: '',
			sections: [
				{ icon: 'BookOpen', title: 'Book Lending', description: 'Borrow books with flexible policies. 15-day period, renewals, online reservations, inter-library loans.', note: '' },
				{ icon: 'Search', title: 'Reference Services', description: 'Expert assistance: research guidance, citation help, database training, literature search.', note: '' },
				{ icon: 'Database', title: 'Digital Resources', description: 'IEEE Xplore, SpringerLink, ScienceDirect and 24/7 online access.', note: '' },
				{ icon: 'Users', title: 'Study Spaces', description: 'Silent zones, group study rooms, reading halls, and research carrels.', note: '' },
				{ icon: 'Wifi', title: 'Internet & WiFi', description: 'Free WiFi, computer terminals, laptop charging, 24/7 connectivity.', note: '' },
				{ icon: 'Printer', title: 'Printing & Scanning', description: 'Color and B&W printing, scanning, binding facilities at affordable rates.', note: '' },
				{ icon: 'FileText', title: 'Document Delivery', description: 'Inter-library loans, article delivery, research support.', note: '' },
				{ icon: 'Headphones', title: 'Audio-Visual Services', description: 'DVD/CD collection, audio books, video lectures, multimedia equipment.', note: '' },
				{ icon: 'Globe', title: 'Online Catalog', description: 'OPAC with advanced search, book reservations, and account management.', note: '' },
				{ icon: 'Archive', title: 'Archive Services', description: 'Thesis archive, institution history, faculty publications, research repository.', note: '' }
			],
			body: 'How to access: present your library card, fill out the service form, pay applicable fees, and collect your receipt. Faculty and research scholars get priority access; some services require advance booking.'
		}
	},
	collection: {
		pageTitle: 'Book Collection',
		hero: { eyebrow: 'Our Library', title: 'Book Collection', subtitle: 'Explore our extensive collection of books, journals, and digital resources covering all major academic disciplines and research areas.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' },
		content: {
			eyebrow: 'Collections', heading: '50,000+ titles across disciplines', intro: '',
			sections: [
				{ icon: 'Cpu', title: 'Engineering & Technology', description: '15,000+ books covering Computer Science, Electronics, Mechanical, Civil, and Electrical.', note: '' },
				{ icon: 'Calculator', title: 'Mathematics & Physics', description: '8,000+ titles on pure and applied mathematics, physics, and statistics.', note: '' },
				{ icon: 'Beaker', title: 'Science & Research', description: '12,000+ titles: chemistry, biology, environmental and materials science.', note: '' },
				{ icon: 'PenTool', title: 'Management & Humanities', description: '6,000+ titles on management, economics, English literature, philosophy.', note: '' },
				{ icon: 'FileText', title: 'Reference Materials', description: '3,000+ encyclopedias, handbooks, standards, and dictionaries.', note: '' },
				{ icon: 'Database', title: 'Digital Resources', description: '10,000+ e-books, online journals and digital databases (IEEE Xplore, SpringerLink, ScienceDirect, ACM).', note: '' },
				{ icon: 'BookOpen', title: 'Thesis & Dissertations', description: '500+ M.Tech project reports, 50+ Ph.D. dissertations, 1000+ research papers.', note: '' },
				{ icon: 'Archive', title: 'Rare Books & Archives', description: 'First-edition technical books, historical engineering texts, institution archives.', note: '' }
			],
			body: 'Borrowing — Students: 3 books for 15 days. Faculty: 10 books for 30 days. Research Scholars: 5 books for 21 days. Reference books are for library use only.'
		}
	}
};

const STAFF_HERO = { eyebrow: 'Library Team', title: 'Library Staff', subtitle: 'Meet our dedicated library team committed to providing excellent information services and support.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' };
const STAFF_LIST = { items: [
	{ name: 'Mr. Vikash Pandey', role: 'Chief Librarian', email: 'librarian@bpitindia.ac.in', phone: '+91-11-2757-1084', avatar: null, qualification: 'M.Lib.I.Sc., Ph.D.', specialization: 'Digital Library Management, Information Systems' },
	{ name: 'Ms. Anjali Verma', role: 'Assistant Librarian', email: 'anjali.verma@bpitindia.ac.in', phone: '+91-11-2757-1085', avatar: null, qualification: 'M.Lib.I.Sc.', specialization: 'Cataloguing, Reference Services' },
	{ name: 'Mr. Suresh Kumar', role: 'Library Assistant', email: 'suresh.kumar@bpitindia.ac.in', phone: '+91-11-2757-1086', avatar: null, qualification: 'B.Lib.I.Sc.', specialization: 'Circulation, Book Maintenance' },
	{ name: 'Ms. Pooja Singh', role: 'Digital Library Coordinator', email: 'pooja.singh@bpitindia.ac.in', phone: '+91-11-2757-1087', avatar: null, qualification: 'M.C.A., M.Lib.I.Sc.', specialization: 'E-Resources, Database Management' },
	{ name: 'Mr. Ramesh Chand', role: 'Library Attendant', email: 'ramesh.chand@bpitindia.ac.in', phone: '+91-11-2757-1088', avatar: null, qualification: 'B.A.', specialization: 'Stack Maintenance, General Assistance' }
] };

const ADVISORY_HERO = { eyebrow: 'Governance', title: 'Library Advisory Committee', subtitle: 'The Library Advisory Committee provides strategic guidance and oversight for library operations and development.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' };
const ADVISORY_LIST = { items: [
	{ name: 'Dr. Rajesh Kumar', designation: 'Principal', role: 'Chairman', avatar: null, email: 'principal@bpitindia.ac.in', phone: '+91-11-2757-1080' },
	{ name: 'Dr. Priya Sharma', designation: 'Computer Science & Engineering', role: 'Member', avatar: null, email: 'priya.sharma@bpitindia.ac.in', phone: '+91-11-2757-1081' },
	{ name: 'Prof. Amit Singh', designation: 'Electronics & Communication', role: 'Member', avatar: null, email: 'amit.singh@bpitindia.ac.in', phone: '+91-11-2757-1082' },
	{ name: 'Dr. Sunita Gupta', designation: 'Mechanical Engineering', role: 'Member', avatar: null, email: 'sunita.gupta@bpitindia.ac.in', phone: '+91-11-2757-1083' },
	{ name: 'Mr. Vikash Pandey', designation: 'Chief Librarian', role: 'Member Secretary', avatar: null, email: 'librarian@bpitindia.ac.in', phone: '+91-11-2757-1084' }
] };

const DOWNLOADS_HERO = { eyebrow: 'Forms & Guidelines', title: 'Downloads', subtitle: 'Download forms, guidelines, and other useful documents for library services.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' };
const DOWNLOADS_LIST = { items: [
	{ title: 'Library Registration Form', description: 'Form for new library membership registration', fileUrl: '', date: '2024-01-15', fileSize: '245 KB', fileType: 'PDF', category: 'Forms' },
	{ title: 'Book Request Form', description: 'Form to request new books for library collection', fileUrl: '', date: '2024-01-10', fileSize: '180 KB', fileType: 'PDF', category: 'Forms' },
	{ title: 'Library Rules and Regulations', description: 'Complete guide to library policies and procedures', fileUrl: '', date: '2024-01-05', fileSize: '520 KB', fileType: 'PDF', category: 'Guidelines' },
	{ title: 'Digital Library Access Guide', description: 'Step-by-step guide to access digital resources', fileUrl: '', date: '2023-12-20', fileSize: '1.2 MB', fileType: 'PDF', category: 'Guidelines' },
	{ title: 'Research Paper Template', description: 'Standard template for academic research papers', fileUrl: '', date: '2023-12-15', fileSize: '85 KB', fileType: 'DOCX', category: 'Templates' },
	{ title: 'Thesis Submission Guidelines', description: 'Guidelines for thesis formatting and submission', fileUrl: '', date: '2023-12-10', fileSize: '680 KB', fileType: 'PDF', category: 'Guidelines' },
	{ title: 'Library Catalog Search Guide', description: 'How to effectively search the library catalog', fileUrl: '', date: '2023-12-01', fileSize: '420 KB', fileType: 'PDF', category: 'Guidelines' },
	{ title: 'Inter-Library Loan Form', description: 'Form for requesting books from other libraries', fileUrl: '', date: '2023-11-25', fileSize: '195 KB', fileType: 'PDF', category: 'Forms' }
] };

const USEFUL_LINKS_HERO = { eyebrow: 'Curated Resources', title: 'Useful Links', subtitle: 'Explore these carefully curated academic and research resources to enhance your learning and research experience.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' };
const USEFUL_LINKS_LIST = { items: [
	{ title: 'IEEE Xplore Digital Library', url: 'https://ieeexplore.ieee.org', description: 'Access to IEEE journals, conferences, and standards', category: 'Academic Databases' },
	{ title: 'ScienceDirect', url: 'https://www.sciencedirect.com', description: "Elsevier's platform for scientific research", category: 'Academic Databases' },
	{ title: 'SpringerLink', url: 'https://link.springer.com', description: 'Scientific, technical and medical content', category: 'Academic Databases' },
	{ title: 'ACM Digital Library', url: 'https://dl.acm.org', description: 'Computing and information technology resources', category: 'Academic Databases' },
	{ title: 'Directory of Open Access Journals (DOAJ)', url: 'https://doaj.org', description: 'Quality controlled, open access, scholarly journals', category: 'Open Access' },
	{ title: 'arXiv.org', url: 'https://arxiv.org', description: 'Open access to research papers in various fields', category: 'Open Access' },
	{ title: 'PubMed Central', url: 'https://www.ncbi.nlm.nih.gov/pmc', description: 'Free full-text archive of biomedical literature', category: 'Open Access' },
	{ title: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu', description: 'Free online course materials from MIT', category: 'Open Access' },
	{ title: 'National Digital Library of India (NDLI)', url: 'https://ndl.iitkgp.ac.in', description: 'Digital repository of academic content', category: 'Government & Educational' },
	{ title: 'SWAYAM', url: 'https://swayam.gov.in', description: "Government of India's education platform", category: 'Government & Educational' },
	{ title: 'Shodhganga', url: 'https://shodhganga.inflibnet.ac.in', description: 'Digital repository of Indian theses', category: 'Government & Educational' },
	{ title: 'e-PG Pathshala', url: 'https://epgp.inflibnet.ac.in', description: 'Postgraduate e-content in various subjects', category: 'Government & Educational' },
	{ title: 'Google Scholar', url: 'https://scholar.google.com', description: 'Search scholarly literature across disciplines', category: 'Reference & Tools' },
	{ title: 'ResearchGate', url: 'https://www.researchgate.net', description: 'Social networking site for scientists and researchers', category: 'Reference & Tools' },
	{ title: 'Mendeley', url: 'https://www.mendeley.com', description: 'Reference manager and academic social network', category: 'Reference & Tools' },
	{ title: 'Zotero', url: 'https://www.zotero.org', description: 'Free tool to collect, organize, and cite research', category: 'Reference & Tools' }
] };

const CONTACT_HERO = { eyebrow: 'Get in Touch', title: 'Contact Us', subtitle: 'Get in touch with our library team for assistance, queries, or feedback.', backgroundImage: null, gradient: 'from-blue-50 to-indigo-100' };
const CONTACT_BLOCK = {
	phone: '+91-11-2757-1080 · Library: +91-11-2757-1084 · Digital: +91-11-2757-1087',
	email: 'librarian@bpitindia.ac.in · digital.library@bpitindia.ac.in',
	address: 'BPIT Library, Bhagwan Parshuram Institute of Technology, PSP-4, Sector-17, Rohini, New Delhi – 110089',
	hours: 'Monday – Friday: 8:00 AM – 8:00 PM · Saturday: 9:00 AM – 5:00 PM · Sunday: 10:00 AM – 4:00 PM (Extended hours during exams)',
	mapEmbed: ''
};

module.exports = {
	SIMPLE_DEFAULTS,
	STAFF_HERO, STAFF_LIST,
	ADVISORY_HERO, ADVISORY_LIST,
	DOWNLOADS_HERO, DOWNLOADS_LIST,
	USEFUL_LINKS_HERO, USEFUL_LINKS_LIST,
	CONTACT_HERO, CONTACT_BLOCK
};
