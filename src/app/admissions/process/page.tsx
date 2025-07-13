'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronDown,
    ChevronRight,
    BookOpen,
    Users,
    Clock,
    GraduationCap,
    Building2,
    Computer,
    Cpu,
    Brain,
    Calculator,
    TrendingUp,
    Award,
    FileText,
    UserPlus
} from 'lucide-react';

const AdmissionsProcessPage = () => {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('');
    const [activeSubsection, setActiveSubsection] = useState('');
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (section: string) => {
        if (expandedSections.includes(section)) {
            setExpandedSections(expandedSections.filter(s => s !== section));
        } else {
            setExpandedSections([...expandedSections, section]);
        }
    };

    const handleSubsectionClick = (subsection: string) => {
        setActiveSubsection(subsection);
        setActiveSection(subsection);
    };

    const handleViewDetails = (programId: string) => {
        router.push(`/admissions/process/${programId}`);
    };

    const handleApplyNow = () => {
        // Add your apply now logic here
        window.open('/apply', '_blank');
    };

    const handleDownloadBrochure = () => {
        // Add your download brochure logic here
        const link = document.createElement('a');
        link.href = '/brochure.pdf';
        link.download = 'BPIT_Admission_Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Program data structure with detailed information
    const programsData = {
        engineering: [
            {
                id: 'cse',
                title: 'B.Tech. Computer Science and Engineering',
                duration: '4 Years',
                intake: '180',
                icon: <Computer className="w-6 h-6" />,
                description: 'Comprehensive program covering programming, algorithms, software engineering, and emerging technologies.',
                highlights: ['AI/ML Specialization', 'Industry Projects', 'Placement Assistance'],
                details: {
                    contentOffering: {
                        statement: 'Our Computer Science and Engineering program is designed to provide students with a strong foundation in computer science principles, programming languages, software engineering, and emerging technologies. The curriculum is regularly updated to align with industry requirements and technological advancements.',
                        keyAreas: ['Programming Fundamentals', 'Data Structures & Algorithms', 'Software Engineering', 'Database Management', 'Computer Networks', 'Artificial Intelligence', 'Machine Learning', 'Web Development', 'Mobile App Development', 'Cloud Computing']
                    },
                    eligibilityAndSelection: {
                        academic: 'Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/Biotechnology/Biology/Computer Science.',
                        minimumMarks: 'Minimum 45% marks (40% for SC/ST) in the above subjects taken together.',
                        entranceExam: 'JEE Main / UPSEE / CUET',
                        selectionProcess: [
                            'Merit in JEE Main / UPSEE / CUET',
                            'Counseling process as per state guidelines',
                            'Document verification',
                            'Medical fitness certificate'
                        ]
                    },
                    programStructure: {
                        semesters: 8,
                        totalCredits: 160,
                        semesterDetails: [
                            { 
                                semester: 1, 
                                title: 'Semester 1',
                                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Chemistry', 'Introduction to Programming', 'Engineering Drawing', 'English Communication']
                            },
                            { 
                                semester: 2, 
                                title: 'Semester 2',
                                subjects: ['Engineering Mathematics II', 'Data Structures', 'Digital Electronics', 'Computer Organization', 'Environmental Science', 'Professional Communication']
                            },
                            { 
                                semester: 3, 
                                title: 'Semester 3',
                                subjects: ['Engineering Mathematics III', 'Database Management Systems', 'Computer Networks', 'Operating Systems', 'Object Oriented Programming', 'Discrete Mathematics']
                            },
                            { 
                                semester: 4, 
                                title: 'Semester 4',
                                subjects: ['Engineering Mathematics IV', 'Software Engineering', 'Design & Analysis of Algorithms', 'Computer Graphics', 'Web Technologies', 'Theory of Computation']
                            },
                            { 
                                semester: 5, 
                                title: 'Semester 5',
                                subjects: ['Artificial Intelligence', 'Machine Learning', 'Compiler Design', 'Cloud Computing', 'Mobile Application Development', 'Professional Elective I']
                            },
                            { 
                                semester: 6, 
                                title: 'Semester 6',
                                subjects: ['Data Mining', 'Cybersecurity', 'Distributed Systems', 'Human Computer Interaction', 'Internet of Things', 'Professional Elective II']
                            },
                            { 
                                semester: 7, 
                                title: 'Semester 7',
                                subjects: ['Big Data Analytics', 'Blockchain Technology', 'Industry Project I', 'Professional Elective III', 'Open Elective I', 'Seminar']
                            },
                            { 
                                semester: 8, 
                                title: 'Semester 8',
                                subjects: ['Industry Project II', 'Dissertation', 'Professional Elective IV', 'Open Elective II', 'Comprehensive Viva', 'Internship']
                            }
                        ]
                    },
                    careerOpportunities: [
                        'Software Developer/Engineer',
                        'Data Scientist/Analyst',
                        'AI/ML Engineer',
                        'Full Stack Developer',
                        'Cybersecurity Specialist',
                        'Cloud Architect',
                        'Product Manager',
                        'Research Scientist',
                        'Entrepreneur/Startup Founder'
                    ],
                    faculty: [
                        { name: 'Dr. Rajesh Kumar', designation: 'Professor & HOD', specialization: 'Artificial Intelligence, Machine Learning', experience: '15+ years', linkedin: 'https://linkedin.com/in/rajesh-kumar-cse' },
                        { name: 'Dr. Priya Sharma', designation: 'Associate Professor', specialization: 'Software Engineering, Database Systems', experience: '12+ years', linkedin: 'https://linkedin.com/in/priya-sharma-cse' },
                        { name: 'Dr. Amit Singh', designation: 'Assistant Professor', specialization: 'Computer Networks, Cybersecurity', experience: '8+ years', linkedin: 'https://linkedin.com/in/amit-singh-cse' },
                        { name: 'Dr. Neha Gupta', designation: 'Assistant Professor', specialization: 'Data Science, Big Data Analytics', experience: '6+ years', linkedin: 'https://linkedin.com/in/neha-gupta-cse' }
                    ]
                }
            },
            {
                id: 'it',
                title: 'B.Tech. Information Technology',
                duration: '4 Years',
                intake: '60',
                icon: <Computer className="w-6 h-6" />,
                description: 'Focus on information systems, software development, database management, and IT infrastructure.',
                highlights: ['Software Development', 'Database Systems', 'Network Security'],
                details: {
                    contentOffering: {
                        statement: 'The Information Technology program focuses on practical applications of computing technology in business and industry. Students learn to design, implement, and manage IT solutions for real-world problems.',
                        keyAreas: ['Programming Languages', 'Web Technologies', 'Database Management', 'Network Administration', 'IT Security', 'System Analysis', 'Project Management', 'Software Testing', 'Cloud Technologies', 'Enterprise Applications']
                    },
                    eligibilityAndSelection: {
                        academic: 'Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/Biotechnology/Biology/Computer Science.',
                        minimumMarks: 'Minimum 45% marks (40% for SC/ST) in the above subjects taken together.',
                        entranceExam: 'JEE Main / UPSEE / CUET',
                        selectionProcess: [
                            'Merit in JEE Main / UPSEE / CUET',
                            'Counseling process as per state guidelines',
                            'Document verification',
                            'Medical fitness certificate'
                        ]
                    },
                    programStructure: {
                        semesters: 8,
                        totalCredits: 160,
                        semesterDetails: [
                            { 
                                semester: 1, 
                                title: 'Semester 1',
                                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Chemistry', 'Programming Fundamentals', 'Engineering Drawing', 'English Communication']
                            },
                            { 
                                semester: 2, 
                                title: 'Semester 2',
                                subjects: ['Engineering Mathematics II', 'Data Structures', 'Digital Electronics', 'Computer Organization', 'Environmental Science', 'Professional Communication']
                            },
                            { 
                                semester: 3, 
                                title: 'Semester 3',
                                subjects: ['Engineering Mathematics III', 'Database Management Systems', 'Computer Networks', 'Operating Systems', 'Object Oriented Programming', 'Discrete Mathematics']
                            },
                            { 
                                semester: 4, 
                                title: 'Semester 4',
                                subjects: ['Engineering Mathematics IV', 'Software Engineering', 'Web Technologies', 'System Analysis & Design', 'Information Security', 'Theory of Computation']
                            },
                            { 
                                semester: 5, 
                                title: 'Semester 5',
                                subjects: ['IT Project Management', 'Network Administration', 'Enterprise Resource Planning', 'Cloud Computing', 'Mobile Computing', 'Professional Elective I']
                            },
                            { 
                                semester: 6, 
                                title: 'Semester 6',
                                subjects: ['Data Warehousing', 'Network Security', 'Distributed Systems', 'E-Commerce', 'Business Intelligence', 'Professional Elective II']
                            },
                            { 
                                semester: 7, 
                                title: 'Semester 7',
                                subjects: ['Software Testing', 'Digital Marketing', 'Industry Project I', 'Professional Elective III', 'Open Elective I', 'Seminar']
                            },
                            { 
                                semester: 8, 
                                title: 'Semester 8',
                                subjects: ['Industry Project II', 'Dissertation', 'Professional Elective IV', 'Open Elective II', 'Comprehensive Viva', 'Internship']
                            }
                        ]
                    },
                    careerOpportunities: [
                        'IT Consultant',
                        'Systems Analyst',
                        'Database Administrator',
                        'Network Engineer',
                        'IT Project Manager',
                        'Software Developer',
                        'Web Developer',
                        'IT Support Specialist',
                        'Business Analyst'
                    ],
                    faculty: [
                        { name: 'Dr. Suresh Patel', designation: 'Professor & HOD', specialization: 'Information Systems, Database Management', experience: '14+ years', linkedin: 'https://linkedin.com/in/suresh-patel-it' },
                        { name: 'Dr. Kavita Jain', designation: 'Associate Professor', specialization: 'Web Technologies, Software Engineering', experience: '10+ years', linkedin: 'https://linkedin.com/in/kavita-jain-it' },
                        { name: 'Prof. Rohit Verma', designation: 'Assistant Professor', specialization: 'Network Security, System Administration', experience: '7+ years', linkedin: 'https://linkedin.com/in/rohit-verma-it' }
                    ]
                }
            },
            {
                id: 'ece',
                title: 'B.Tech. Electronics and Communication Engineering',
                duration: '4 Years',
                intake: '120',
                icon: <Cpu className="w-6 h-6" />,
                description: 'Focus on electronic systems, communication technologies, and embedded systems.',
                highlights: ['VLSI Design', '5G Technology', 'IoT Applications'],
                details: {
                    contentOffering: {
                        statement: 'Electronics and Communication Engineering program provides comprehensive knowledge of electronic circuits, communication systems, and signal processing. The curriculum emphasizes both theoretical foundations and practical applications.',
                        keyAreas: ['Electronic Circuits', 'Digital Signal Processing', 'Communication Systems', 'VLSI Design', 'Embedded Systems', 'Microprocessors', 'Control Systems', 'Wireless Networks', '5G Technology', 'IoT Applications']
                    },
                    eligibilityAndSelection: {
                        academic: 'Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with Chemistry.',
                        minimumMarks: 'Minimum 45% marks (40% for SC/ST) in the above subjects taken together.',
                        entranceExam: 'JEE Main / UPSEE / CUET',
                        selectionProcess: [
                            'Merit in JEE Main / UPSEE / CUET',
                            'Counseling process as per state guidelines',
                            'Document verification',
                            'Medical fitness certificate'
                        ]
                    },
                    programStructure: {
                        semesters: 8,
                        totalCredits: 160,
                        semesterDetails: [
                            { 
                                semester: 1, 
                                title: 'Semester 1',
                                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Chemistry', 'Basic Electronics', 'Engineering Drawing', 'English Communication']
                            },
                            { 
                                semester: 2, 
                                title: 'Semester 2',
                                subjects: ['Engineering Mathematics II', 'Circuit Analysis', 'Electronic Devices', 'Digital Electronics', 'Environmental Science', 'Professional Communication']
                            },
                            { 
                                semester: 3, 
                                title: 'Semester 3',
                                subjects: ['Engineering Mathematics III', 'Signals & Systems', 'Analog Electronics', 'Network Theory', 'Electromagnetic Fields', 'Discrete Mathematics']
                            },
                            { 
                                semester: 4, 
                                title: 'Semester 4',
                                subjects: ['Engineering Mathematics IV', 'Communication Systems', 'Microprocessors', 'Control Systems', 'Digital Signal Processing', 'Transmission Lines']
                            },
                            { 
                                semester: 5, 
                                title: 'Semester 5',
                                subjects: ['VLSI Design', 'Antenna Theory', 'Embedded Systems', 'Optical Communication', 'Wireless Communication', 'Professional Elective I']
                            },
                            { 
                                semester: 6, 
                                title: 'Semester 6',
                                subjects: ['Microwave Engineering', 'Digital Communication', 'Computer Networks', 'Satellite Communication', 'IoT Systems', 'Professional Elective II']
                            },
                            { 
                                semester: 7, 
                                title: 'Semester 7',
                                subjects: ['5G Technology', 'Radar Systems', 'Industry Project I', 'Professional Elective III', 'Open Elective I', 'Seminar']
                            },
                            { 
                                semester: 8, 
                                title: 'Semester 8',
                                subjects: ['Industry Project II', 'Dissertation', 'Professional Elective IV', 'Open Elective II', 'Comprehensive Viva', 'Internship']
                            }
                        ]
                    },
                    careerOpportunities: [
                        'Electronics Engineer',
                        'Communication Engineer',
                        'VLSI Design Engineer',
                        'Embedded Systems Engineer',
                        'RF Engineer',
                        'Signal Processing Engineer',
                        'Telecommunications Engineer',
                        'IoT Developer',
                        'Research & Development Engineer'
                    ],
                    faculty: [
                        { name: 'Dr. Anil Kumaran', designation: 'Professor & HOD', specialization: 'VLSI Design, Digital Signal Processing', experience: '16+ years', linkedin: 'https://linkedin.com/in/anil-kumaran-ece' },
                        { name: 'Dr. Sunita Rani', designation: 'Associate Professor', specialization: 'Communication Systems, Wireless Networks', experience: '11+ years', linkedin: 'https://linkedin.com/in/sunita-rani-ece' },
                        { name: 'Dr. Manoj Kumar', designation: 'Assistant Professor', specialization: 'Embedded Systems, IoT', experience: '9+ years', linkedin: 'https://linkedin.com/in/manoj-kumar-ece' }
                    ]
                }
            },
            {
                id: 'eee',
                title: 'B.Tech. Electrical and Electronics Engineering',
                duration: '4 Years',
                intake: '60',
                icon: <Brain className="w-6 h-6" />,
                description: 'Study of electrical systems, power generation, electronics, and control systems.',
                highlights: ['Power Systems', 'Control Engineering', 'Renewable Energy'],
                details: {
                    contentOffering: {
                        statement: 'Electrical and Electronics Engineering program combines electrical power systems with modern electronics. Students learn to design and maintain electrical infrastructure while working with cutting-edge electronic technologies.',
                        keyAreas: ['Electrical Machines', 'Power Systems', 'Control Systems', 'Power Electronics', 'Renewable Energy', 'Smart Grid', 'Industrial Automation', 'Electric Vehicles', 'Energy Management', 'Protection Systems']
                    },
                    eligibilityAndSelection: {
                        academic: 'Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with Chemistry.',
                        minimumMarks: 'Minimum 45% marks (40% for SC/ST) in the above subjects taken together.',
                        entranceExam: 'JEE Main / UPSEE / CUET',
                        selectionProcess: [
                            'Merit in JEE Main / UPSEE / CUET',
                            'Counseling process as per state guidelines',
                            'Document verification',
                            'Medical fitness certificate'
                        ]
                    },
                    programStructure: {
                        semesters: 8,
                        totalCredits: 160,
                        semesterDetails: [
                            { 
                                semester: 1, 
                                title: 'Semester 1',
                                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Chemistry', 'Basic Electrical Engineering', 'Engineering Drawing', 'English Communication']
                            },
                            { 
                                semester: 2, 
                                title: 'Semester 2',
                                subjects: ['Engineering Mathematics II', 'Circuit Analysis', 'Electronic Devices', 'Digital Electronics', 'Environmental Science', 'Professional Communication']
                            },
                            { 
                                semester: 3, 
                                title: 'Semester 3',
                                subjects: ['Engineering Mathematics III', 'Electrical Machines I', 'Network Theory', 'Electrical Materials', 'Measurement & Instrumentation', 'Discrete Mathematics']
                            },
                            { 
                                semester: 4, 
                                title: 'Semester 4',
                                subjects: ['Engineering Mathematics IV', 'Electrical Machines II', 'Control Systems', 'Power Electronics', 'Electromagnetic Fields', 'Signals & Systems']
                            },
                            { 
                                semester: 5, 
                                title: 'Semester 5',
                                subjects: ['Power Systems I', 'Microprocessors', 'Industrial Automation', 'Renewable Energy Systems', 'Electric Drives', 'Professional Elective I']
                            },
                            { 
                                semester: 6, 
                                title: 'Semester 6',
                                subjects: ['Power Systems II', 'Smart Grid Technology', 'HVDC Transmission', 'Power System Protection', 'Electric Vehicle Technology', 'Professional Elective II']
                            },
                            { 
                                semester: 7, 
                                title: 'Semester 7',
                                subjects: ['Power System Analysis', 'Energy Management', 'Industry Project I', 'Professional Elective III', 'Open Elective I', 'Seminar']
                            },
                            { 
                                semester: 8, 
                                title: 'Semester 8',
                                subjects: ['Industry Project II', 'Dissertation', 'Professional Elective IV', 'Open Elective II', 'Comprehensive Viva', 'Internship']
                            }
                        ]
                    },
                    careerOpportunities: [
                        'Electrical Engineer',
                        'Power Systems Engineer',
                        'Control Systems Engineer',
                        'Automation Engineer',
                        'Renewable Energy Engineer',
                        'Project Engineer',
                        'Maintenance Engineer',
                        'Design Engineer',
                        'Energy Consultant'
                    ],
                    faculty: [
                        { name: 'Dr. Vijay Prakash', designation: 'Professor & HOD', specialization: 'Power Systems, Smart Grid Technology', experience: '18+ years', linkedin: 'https://linkedin.com/in/vijay-prakash-eee' },
                        { name: 'Dr. Rekha Sharma', designation: 'Associate Professor', specialization: 'Control Systems, Industrial Automation', experience: '13+ years', linkedin: 'https://linkedin.com/in/rekha-sharma-eee' },
                        { name: 'Prof. Deepak Agarwal', designation: 'Assistant Professor', specialization: 'Renewable Energy, Power Electronics', experience: '8+ years', linkedin: 'https://linkedin.com/in/deepak-agarwal-eee' }
                    ]
                }
            },
            {
                id: 'cse-lateral',
                title: 'B.Tech. (Lateral Entry) - Computer Science and Engineering',
                duration: '3 Years',
                intake: '18',
                icon: <Computer className="w-6 h-6" />,
                description: 'Direct entry to second year for diploma holders in relevant disciplines.',
                highlights: ['Fast Track Program', 'Industry Focused', 'Research Opportunities'],
                details: {
                    contentOffering: {
                        statement: 'Lateral Entry program for Computer Science Engineering allows diploma holders to directly join the second year of B.Tech program. The curriculum is designed to bridge the gap and provide advanced computer science education.',
                        keyAreas: ['Advanced Programming', 'Software Engineering', 'Database Systems', 'Computer Networks', 'AI/ML', 'Web Development', 'Mobile Computing', 'Cybersecurity', 'Cloud Computing', 'Data Analytics']
                    },
                    eligibilityAndSelection: {
                        academic: 'Diploma in Computer Science/IT/Electronics or equivalent from recognized institution.',
                        minimumMarks: 'Minimum 60% marks in diploma (55% for SC/ST).',
                        entranceExam: 'UPSEE Lateral Entry / State Level Entrance',
                        selectionProcess: [
                            'Merit in UPSEE Lateral Entry',
                            'Diploma marks consideration',
                            'Document verification',
                            'Gap certificate if applicable'
                        ]
                    },
                    programStructure: {
                        semesters: 6,
                        totalCredits: 120,
                        semesterDetails: [
                            { 
                                semester: 3, 
                                title: 'Semester 3',
                                subjects: ['Engineering Mathematics III', 'Database Management Systems', 'Computer Networks', 'Operating Systems', 'Object Oriented Programming', 'Discrete Mathematics']
                            },
                            { 
                                semester: 4, 
                                title: 'Semester 4',
                                subjects: ['Engineering Mathematics IV', 'Software Engineering', 'Design & Analysis of Algorithms', 'Computer Graphics', 'Web Technologies', 'Theory of Computation']
                            },
                            { 
                                semester: 5, 
                                title: 'Semester 5',
                                subjects: ['Artificial Intelligence', 'Machine Learning', 'Compiler Design', 'Cloud Computing', 'Mobile Application Development', 'Professional Elective I']
                            },
                            { 
                                semester: 6, 
                                title: 'Semester 6',
                                subjects: ['Data Mining', 'Cybersecurity', 'Distributed Systems', 'Human Computer Interaction', 'Internet of Things', 'Professional Elective II']
                            },
                            { 
                                semester: 7, 
                                title: 'Semester 7',
                                subjects: ['Big Data Analytics', 'Blockchain Technology', 'Industry Project I', 'Professional Elective III', 'Open Elective I', 'Seminar']
                            },
                            { 
                                semester: 8, 
                                title: 'Semester 8',
                                subjects: ['Industry Project II', 'Dissertation', 'Professional Elective IV', 'Open Elective II', 'Comprehensive Viva', 'Internship']
                            }
                        ]
                    },
                    careerOpportunities: [
                        'Software Developer',
                        'Web Developer',
                        'Mobile App Developer',
                        'Database Administrator',
                        'System Analyst',
                        'Network Administrator',
                        'IT Consultant',
                        'Quality Assurance Engineer',
                        'Technical Support Engineer'
                    ],
                    faculty: [
                        { name: 'Dr. Rajesh Kumar', designation: 'Professor & HOD', specialization: 'Artificial Intelligence, Machine Learning', experience: '15+ years', linkedin: 'https://linkedin.com/in/rajesh-kumar-cse' },
                        { name: 'Dr. Priya Sharma', designation: 'Associate Professor', specialization: 'Software Engineering, Database Systems', experience: '12+ years', linkedin: 'https://linkedin.com/in/priya-sharma-cse' }
                    ]
                }
            },
            // Adding basic details for other lateral entry programs
            {
                id: 'it-lateral',
                title: 'B.Tech. (Lateral Entry) - Information Technology',
                duration: '3 Years',
                intake: '6',
                icon: <Computer className="w-6 h-6" />,
                description: 'Lateral entry program for IT specialization with focus on software and systems.',
                highlights: ['Software Engineering', 'System Integration', 'Project Management'],
                details: {
                    contentOffering: {
                        statement: 'Lateral Entry IT program focuses on advanced information technology concepts and practical applications for diploma holders.',
                        keyAreas: ['System Analysis', 'Web Technologies', 'Database Management', 'Network Security', 'Software Testing', 'Project Management']
                    },
                    eligibilityAndSelection: {
                        academic: 'Diploma in IT/Computer Science/Electronics or equivalent.',
                        minimumMarks: 'Minimum 60% marks in diploma (55% for SC/ST).',
                        entranceExam: 'UPSEE Lateral Entry',
                        selectionProcess: ['Merit in UPSEE Lateral Entry', 'Diploma marks', 'Document verification']
                    },
                    programStructure: { semesters: 6, totalCredits: 120, breakdown: [] },
                    careerOpportunities: ['IT Specialist', 'System Administrator', 'Web Developer', 'Database Admin'],
                    faculty: [{ name: 'Dr. Suresh Patel', designation: 'Professor & HOD', specialization: 'Information Systems', experience: '14+ years', linkedin: 'https://linkedin.com/in/suresh-patel-it' }]
                }
            },
            {
                id: 'ece-lateral',
                title: 'B.Tech. (Lateral Entry) - Electronics and Communication Engineering',
                duration: '3 Years',
                intake: '12',
                icon: <Cpu className="w-6 h-6" />,
                description: 'Lateral entry program for ECE with advanced communication and electronics focus.',
                highlights: ['Digital Communication', 'Embedded Systems', 'Signal Processing'],
                details: {
                    contentOffering: {
                        statement: 'Advanced ECE program for diploma holders focusing on modern communication technologies and electronic systems.',
                        keyAreas: ['Digital Communication', 'VLSI Design', 'Embedded Systems', 'Signal Processing', 'Wireless Communication']
                    },
                    eligibilityAndSelection: {
                        academic: 'Diploma in Electronics/ECE or equivalent.',
                        minimumMarks: 'Minimum 60% marks in diploma (55% for SC/ST).',
                        entranceExam: 'UPSEE Lateral Entry',
                        selectionProcess: ['Merit in UPSEE Lateral Entry', 'Diploma marks', 'Document verification']
                    },
                    programStructure: { semesters: 6, totalCredits: 120, breakdown: [] },
                    careerOpportunities: ['Electronics Engineer', 'Communication Engineer', 'Embedded Systems Developer'],
                    faculty: [{ name: 'Dr. Anil Kumaran', designation: 'Professor & HOD', specialization: 'VLSI Design', experience: '16+ years', linkedin: 'https://linkedin.com/in/anil-kumaran-ece' }]
                }
            },
            {
                id: 'eee-lateral',
                title: 'B.Tech. (Lateral Entry) - Electrical and Electronics Engineering',
                duration: '3 Years',
                intake: '6',
                icon: <Brain className="w-6 h-6" />,
                description: 'Lateral entry program for EEE focusing on electrical systems and power engineering.',
                highlights: ['Power Electronics', 'Industrial Automation', 'Smart Grid Technology'],
                details: {
                    contentOffering: {
                        statement: 'Advanced EEE program for diploma holders with focus on power systems and modern electrical technologies.',
                        keyAreas: ['Power Systems', 'Industrial Automation', 'Power Electronics', 'Smart Grid', 'Renewable Energy']
                    },
                    eligibilityAndSelection: {
                        academic: 'Diploma in Electrical/EEE or equivalent.',
                        minimumMarks: 'Minimum 60% marks in diploma (55% for SC/ST).',
                        entranceExam: 'UPSEE Lateral Entry',
                        selectionProcess: ['Merit in UPSEE Lateral Entry', 'Diploma marks', 'Document verification']
                    },
                    programStructure: { semesters: 6, totalCredits: 120, breakdown: [] },
                    careerOpportunities: ['Electrical Engineer', 'Power Systems Engineer', 'Automation Engineer'],
                    faculty: [{ name: 'Dr. Vijay Prakash', designation: 'Professor & HOD', specialization: 'Power Systems', experience: '18+ years', linkedin: 'https://linkedin.com/in/vijay-prakash-eee' }]
                }
            }
        ],
        ugManagement: [
            {
                id: 'bba',
                title: 'Bachelor of Business Administration (BBA)',
                duration: '3 Years',
                intake: '60',
                icon: <TrendingUp className="w-6 h-6" />,
                description: 'Comprehensive business education with focus on management principles and practices.',
                highlights: ['Industry Internships', 'Entrepreneurship', 'Global Exposure'],
                details: {
                    contentOffering: {
                        statement: 'BBA program provides comprehensive business education covering all aspects of management including finance, marketing, human resources, and operations.',
                        keyAreas: ['Business Management', 'Marketing', 'Finance', 'Human Resources', 'Operations Management', 'Entrepreneurship', 'Business Analytics', 'International Business']
                    },
                    eligibilityAndSelection: {
                        academic: 'Passed 10+2 from recognized board in any stream.',
                        minimumMarks: 'Minimum 50% marks (45% for SC/ST).',
                        entranceExam: 'CUET / University Entrance Test',
                        selectionProcess: ['Merit in qualifying exam', 'Entrance test score', 'Personal interview']
                    },
                    programStructure: { semesters: 6, totalCredits: 120, breakdown: [] },
                    careerOpportunities: ['Business Analyst', 'Marketing Executive', 'HR Executive', 'Operations Manager'],
                    faculty: [{ name: 'Dr. Rakesh Gupta', designation: 'Professor & HOD', specialization: 'Strategic Management', experience: '15+ years', linkedin: 'https://linkedin.com/in/rakesh-gupta-management' }]
                }
            }
        ],
        pgManagement: [
            {
                id: 'mba',
                title: 'Master of Business Administration (MBA)',
                duration: '2 Years',
                intake: '120',
                icon: <Award className="w-6 h-6" />,
                description: 'Advanced management program with specializations in various business domains.',
                highlights: ['Dual Specialization', 'Corporate Partnerships', 'Leadership Development'],
                details: {
                    contentOffering: {
                        statement: 'MBA program offers advanced management education with specialization options in Finance, Marketing, HR, Operations, and IT.',
                        keyAreas: ['Strategic Management', 'Financial Management', 'Marketing Management', 'Operations Research', 'Leadership', 'Business Analytics', 'Digital Marketing']
                    },
                    eligibilityAndSelection: {
                        academic: 'Bachelor\'s degree in any discipline from recognized university.',
                        minimumMarks: 'Minimum 50% marks (45% for SC/ST).',
                        entranceExam: 'CAT / MAT / CMAT / University Entrance',
                        selectionProcess: ['Entrance test score', 'Group discussion', 'Personal interview', 'Work experience']
                    },
                    programStructure: { semesters: 4, totalCredits: 80, breakdown: [] },
                    careerOpportunities: ['Business Manager', 'Consultant', 'Financial Analyst', 'Marketing Manager'],
                    faculty: [{ name: 'Dr. Rakesh Gupta', designation: 'Professor & Director', specialization: 'Strategic Management', experience: '15+ years', linkedin: 'https://linkedin.com/in/rakesh-gupta-management' }]
                }
            }
        ]
    };

    const renderProgramCards = (programs: any[]) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-6"
            >
                {programs.map((program, index) => (
                    <motion.div
                        key={program.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            {program.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    Duration {program.duration}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    Intake - {program.intake}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">{program.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {program.highlights.map((highlight: string, idx: number) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleViewDetails(program.id)}
                                    className="ml-6 px-6 py-2 bg-white border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 whitespace-nowrap">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Admission Criteria & Eligibility</h1>
                    <p className="text-gray-600 mt-2">Explore our undergraduate and postgraduate programs</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-4">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-blue-600" />
                                    Program Categories
                                </h2>
                            </div>

                            <div className="p-4">
                                {/* Undergraduate Section */}
                                <div className="mb-4">
                                    <button
                                        onClick={() => toggleSection('undergraduate')}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <span className="font-semibold text-gray-900">Undergraduate</span>
                                        <motion.div
                                            animate={{ rotate: expandedSections.includes('undergraduate') ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-500" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {expandedSections.includes('undergraduate') && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden ml-4 mt-2"
                                            >
                                                <button
                                                    onClick={() => handleSubsectionClick('engineering')}
                                                    className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 ${
                                                        activeSubsection === 'engineering'
                                                            ? 'bg-blue-500 text-white'
                                                            : 'hover:bg-gray-50 text-gray-700'
                                                    }`}
                                                >
                                                    Engineering and Technology
                                                </button>
                                                <button
                                                    onClick={() => handleSubsectionClick('ugManagement')}
                                                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                                                        activeSubsection === 'ugManagement'
                                                            ? 'bg-blue-500 text-white'
                                                            : 'hover:bg-gray-50 text-gray-700'
                                                    }`}
                                                >
                                                    Management
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Postgraduate Section */}
                                <div>
                                    <button
                                        onClick={() => toggleSection('postgraduate')}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <span className="font-semibold text-gray-900">Postgraduate</span>
                                        <motion.div
                                            animate={{ rotate: expandedSections.includes('postgraduate') ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-500" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {expandedSections.includes('postgraduate') && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden ml-4 mt-2"
                                            >
                                                <button
                                                    onClick={() => handleSubsectionClick('pgManagement')}
                                                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                                                        activeSubsection === 'pgManagement'
                                                            ? 'bg-blue-500 text-white'
                                                            : 'hover:bg-gray-50 text-gray-700'
                                                    }`}
                                                >
                                                    Management
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Card */}
                        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                Admission Support
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Need help with the admission process? Our counselors are here to guide you.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={handleApplyNow}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Apply Now
                                </button>
                                <button 
                                    onClick={handleDownloadBrochure}
                                    className="w-full bg-white border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <FileText className="w-4 h-4" />
                                    Download Brochure
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
                            {/* Content Header */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {activeSubsection === 'engineering' && 'Engineering and Technology Programs'}
                                    {activeSubsection === 'ugManagement' && 'Undergraduate Management Programs'}
                                    {activeSubsection === 'pgManagement' && 'Postgraduate Management Programs'}
                                    {!activeSubsection && 'Select a category to view programs'}
                                </h2>
                                <p className="text-gray-600">
                                    {activeSubsection === 'engineering' && 'Explore our cutting-edge engineering programs designed to meet industry demands.'}
                                    {activeSubsection === 'ugManagement' && 'Build a strong foundation in business and management principles.'}
                                    {activeSubsection === 'pgManagement' && 'Advance your career with our comprehensive postgraduate management programs.'}
                                    {!activeSubsection && 'Choose from our wide range of undergraduate and postgraduate programs.'}
                                </p>
                            </div>

                            {/* Program Cards */}
                            <AnimatePresence mode="wait">
                                {activeSubsection === 'engineering' && (
                                    <motion.div key="engineering">
                                        {renderProgramCards(programsData.engineering)}
                                    </motion.div>
                                )}
                                {activeSubsection === 'ugManagement' && (
                                    <motion.div key="ugManagement">
                                        {renderProgramCards(programsData.ugManagement)}
                                    </motion.div>
                                )}
                                {activeSubsection === 'pgManagement' && (
                                    <motion.div key="pgManagement">
                                        {renderProgramCards(programsData.pgManagement)}
                                    </motion.div>
                                )}
                                {!activeSubsection && (
                                    <motion.div
                                        key="default"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-16"
                                    >
                                        <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-500 mb-2">Select a Program Category</h3>
                                        <p className="text-gray-400">Choose from the sidebar to explore our programs</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionsProcessPage;
