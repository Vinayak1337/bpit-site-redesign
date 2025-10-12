'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    BookOpen,
    TrendingUp,
    Award,
    CheckCircle,
    User,
    Calendar,
    Briefcase,
    ArrowLeft,
    FileText,
    UserPlus,
    Computer,
    Cpu,
    Brain
} from 'lucide-react';

const ProgramDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const programId = params.programId as string;
    
    const [activeSection, setActiveSection] = useState('offering');

    const sidebarSections = [
        { id: 'offering', label: 'Content Offering', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'eligibility', label: 'Eligibility & Selection Criteria', icon: <CheckCircle className="w-5 h-5" /> },
        { id: 'structure', label: 'Programme Structure', icon: <Calendar className="w-5 h-5" /> },
        { id: 'careers', label: 'Career Opportunities', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'faculty', label: 'Faculty', icon: <User className="w-5 h-5" /> }
    ];

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
        'cse': {
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
                ],                    faculty: [
                        { 
                            name: 'Dr. Rajesh Kumar', 
                            designation: 'Professor & HOD', 
                            specialization: 'Artificial Intelligence, Machine Learning', 
                            experience: '15+ years',
                            photo: '/faculty/rajesh-kumar.jpg' // Placeholder - replace with actual photo path
                        },
                        { 
                            name: 'Dr. Priya Sharma', 
                            designation: 'Associate Professor', 
                            specialization: 'Software Engineering, Database Systems', 
                            experience: '12+ years',
                            photo: '/faculty/priya-sharma.jpg' // Placeholder - replace with actual photo path
                        },
                        { 
                            name: 'Dr. Amit Singh', 
                            designation: 'Assistant Professor', 
                            specialization: 'Computer Networks, Cybersecurity', 
                            experience: '8+ years',
                            photo: '/faculty/amit-singh.jpg' // Placeholder - replace with actual photo path
                        },
                        { 
                            name: 'Dr. Neha Gupta', 
                            designation: 'Assistant Professor', 
                            specialization: 'Data Science, Big Data Analytics', 
                            experience: '6+ years',
                            photo: '/faculty/neha-gupta.jpg' // Placeholder - replace with actual photo path
                        }
                    ]
            }
        },
        'it': {
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
                    { 
                        name: 'Dr. Suresh Patel', 
                        designation: 'Professor & HOD', 
                        specialization: 'Information Systems, Database Management', 
                        experience: '14+ years',
                        photo: '/faculty/suresh-patel.jpg'
                    },
                    { 
                        name: 'Dr. Kavita Jain', 
                        designation: 'Associate Professor', 
                        specialization: 'Web Technologies, Software Engineering', 
                        experience: '10+ years',
                        photo: '/faculty/kavita-jain.jpg'
                    },
                    { 
                        name: 'Prof. Rohit Verma', 
                        designation: 'Assistant Professor', 
                        specialization: 'Network Security, System Administration', 
                        experience: '7+ years',
                        photo: '/faculty/rohit-verma.jpg'
                    }
                ]
            }
        },
        // Add more programs as needed
        'ece': {
            id: 'ece',
            title: 'B.Tech. Electronics and Communication Engineering',
            duration: '4 Years',
            intake: '120',
            icon: <Cpu className="w-6 h-6" />,
            description: 'Focus on electronic systems, communication technologies, and embedded systems.',
            highlights: ['VLSI Design', '5G Technology', 'IoT Applications'],
            details: {
                contentOffering: {
                    statement: 'Electronics and Communication Engineering program provides comprehensive knowledge of electronic circuits, communication systems, and signal processing.',
                    keyAreas: ['Electronic Circuits', 'Digital Signal Processing', 'Communication Systems', 'VLSI Design', 'Embedded Systems', 'Microprocessors']
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
                    'Signal Processing Engineer'
                ],
                faculty: [
                    { 
                        name: 'Dr. Anil Kumaran', 
                        designation: 'Professor & HOD', 
                        specialization: 'VLSI Design, Digital Signal Processing', 
                        experience: '16+ years',
                        photo: '/faculty/anil-kumaran.jpg'
                    },
                    { 
                        name: 'Dr. Sunita Rani', 
                        designation: 'Associate Professor', 
                        specialization: 'Communication Systems, Wireless Networks', 
                        experience: '11+ years',
                        photo: '/faculty/sunita-rani.jpg'
                    },
                    { 
                        name: 'Dr. Manoj Kumar', 
                        designation: 'Assistant Professor', 
                        specialization: 'Embedded Systems, IoT', 
                        experience: '9+ years',
                        photo: '/faculty/manoj-kumar.jpg'
                    }
                ]
            }
        },
        'eee': {
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
                    { 
                        name: 'Dr. Vijay Prakash', 
                        designation: 'Professor & HOD', 
                        specialization: 'Power Systems, Smart Grid Technology', 
                        experience: '18+ years',
                        photo: '/faculty/vijay-prakash.jpg'
                    },
                    { 
                        name: 'Dr. Rekha Sharma', 
                        designation: 'Associate Professor', 
                        specialization: 'Control Systems, Industrial Automation', 
                        experience: '13+ years',
                        photo: '/faculty/rekha-sharma.jpg'
                    },
                    { 
                        name: 'Prof. Deepak Agarwal', 
                        designation: 'Assistant Professor', 
                        specialization: 'Renewable Energy, Power Electronics', 
                        experience: '8+ years',
                        photo: '/faculty/deepak-agarwal.jpg'
                    }
                ]
            }
        },
        'cse-lateral': {
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
                    { 
                        name: 'Dr. Rajesh Kumar', 
                        designation: 'Professor & HOD', 
                        specialization: 'Artificial Intelligence, Machine Learning', 
                        experience: '15+ years',
                        photo: '/faculty/rajesh-kumar.jpg'
                    },
                    { 
                        name: 'Dr. Priya Sharma', 
                        designation: 'Associate Professor', 
                        specialization: 'Software Engineering, Database Systems', 
                        experience: '12+ years',
                        photo: '/faculty/priya-sharma.jpg'
                    }
                ]
            }
        },
        'it-lateral': {
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
                careerOpportunities: ['IT Specialist', 'System Administrator', 'Web Developer', 'Database Admin'],
                faculty: [{ name: 'Dr. Suresh Patel', designation: 'Professor & HOD', specialization: 'Information Systems', experience: '14+ years', photo: '/faculty/suresh-patel.jpg' }]
            }
        },
        'ece-lateral': {
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
                programStructure: {
                    semesters: 6,
                    totalCredits: 120,
                    semesterDetails: [
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
                careerOpportunities: ['Electronics Engineer', 'Communication Engineer', 'Embedded Systems Developer'],
                faculty: [{ name: 'Dr. Anil Kumaran', designation: 'Professor & HOD', specialization: 'VLSI Design', experience: '16+ years', photo: '/faculty/anil-kumaran.jpg' }]
            }
        },
        'eee-lateral': {
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
                programStructure: {
                    semesters: 6,
                    totalCredits: 120,
                    semesterDetails: [
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
                careerOpportunities: ['Electrical Engineer', 'Power Systems Engineer', 'Automation Engineer'],
                faculty: [{ name: 'Dr. Vijay Prakash', designation: 'Professor & HOD', specialization: 'Power Systems', experience: '18+ years', photo: '/faculty/vijay-prakash.jpg' }]
            }
        },
        'bba': {
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
                programStructure: {
                    semesters: 6,
                    totalCredits: 120,
                    semesterDetails: [
                        { 
                            semester: 1, 
                            title: 'Semester 1',
                            subjects: ['Principles of Management', 'Business Mathematics', 'Financial Accounting', 'Business Communication', 'Business Economics', 'Computer Applications']
                        },
                        { 
                            semester: 2, 
                            title: 'Semester 2',
                            subjects: ['Organizational Behavior', 'Cost Accounting', 'Marketing Management', 'Business Statistics', 'Business Law', 'Environmental Studies']
                        },
                        { 
                            semester: 3, 
                            title: 'Semester 3',
                            subjects: ['Financial Management', 'Human Resource Management', 'Research Methodology', 'Operations Management', 'Business Ethics', 'Elective I']
                        },
                        { 
                            semester: 4, 
                            title: 'Semester 4',
                            subjects: ['Strategic Management', 'International Business', 'Entrepreneurship', 'Consumer Behavior', 'Digital Marketing', 'Elective II']
                        },
                        { 
                            semester: 5, 
                            title: 'Semester 5',
                            subjects: ['Business Analytics', 'Project Management', 'Supply Chain Management', 'Corporate Finance', 'Elective III', 'Internship']
                        },
                        { 
                            semester: 6, 
                            title: 'Semester 6',
                            subjects: ['Leadership & Change Management', 'Business Intelligence', 'Industry Project', 'Elective IV', 'Comprehensive Viva', 'Dissertation']
                        }
                    ]
                },
                careerOpportunities: ['Business Analyst', 'Marketing Executive', 'HR Executive', 'Operations Manager'],
                faculty: [{ name: 'Dr. Rakesh Gupta', designation: 'Professor & HOD', specialization: 'Strategic Management', experience: '15+ years', photo: '/faculty/rakesh-gupta.jpg' }]
            }
        },
        'mba': {
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
                programStructure: {
                    semesters: 4,
                    totalCredits: 80,
                    semesterDetails: [
                        { 
                            semester: 1, 
                            title: 'Semester 1',
                            subjects: ['Management Principles', 'Managerial Economics', 'Financial Accounting', 'Organizational Behavior', 'Business Communication', 'Quantitative Methods']
                        },
                        { 
                            semester: 2, 
                            title: 'Semester 2',
                            subjects: ['Marketing Management', 'Financial Management', 'Operations Management', 'Human Resource Management', 'Strategic Management', 'Business Research Methods']
                        },
                        { 
                            semester: 3, 
                            title: 'Semester 3',
                            subjects: ['Specialization Subject I', 'Specialization Subject II', 'International Business', 'Entrepreneurship', 'Business Ethics', 'Elective I']
                        },
                        { 
                            semester: 4, 
                            title: 'Semester 4',
                            subjects: ['Specialization Subject III', 'Leadership & Change Management', 'Summer Internship Project', 'Elective II', 'Comprehensive Viva', 'Dissertation']
                        }
                    ]
                },
                careerOpportunities: ['Business Manager', 'Consultant', 'Financial Analyst', 'Marketing Manager'],
                faculty: [{ name: 'Dr. Rakesh Gupta', designation: 'Professor & Director', specialization: 'Strategic Management', experience: '15+ years', photo: '/faculty/rakesh-gupta.jpg' }]
            }
        }
    };

    const currentProgram = programsData[programId as keyof typeof programsData];

    if (!currentProgram) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
                    <button 
                        onClick={() => router.back()}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'offering':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Content Offering Statement</h2>
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                {currentProgram.details.contentOffering.statement}
                            </p>
                            
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Key Areas of Study</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {currentProgram.details.contentOffering.keyAreas.map((area: string, index: number) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm sm:text-base">{area}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'eligibility':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria & Selection Process</h2>
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Qualification</h3>
                                <p className="text-gray-700">{currentProgram.details.eligibilityAndSelection.academic}</p>
                            </div>
                            
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Minimum Marks Required</h3>
                                <p className="text-gray-700">{currentProgram.details.eligibilityAndSelection.minimumMarks}</p>
                            </div>
                            
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Entrance Examination</h3>
                                <p className="text-gray-700">{currentProgram.details.eligibilityAndSelection.entranceExam}</p>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selection Process</h3>
                                <div className="space-y-3">
                                    {currentProgram.details.eligibilityAndSelection.selectionProcess.map((criteria: string, index: number) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                                                {index + 1}
                                            </div>
                                            <span className="text-gray-700">{criteria}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'structure':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Programme Structure</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 text-center">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{currentProgram.details.programStructure.semesters}</h3>
                                    <p className="text-sm sm:text-base text-gray-600">Total Semesters</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 text-center">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{currentProgram.details.programStructure.totalCredits}</h3>
                                    <p className="text-sm sm:text-base text-gray-600">Total Credits</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 text-center sm:col-span-2 lg:col-span-1">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{currentProgram.duration}</h3>
                                    <p className="text-sm sm:text-base text-gray-600">Duration</p>
                                </div>
                            </div>
                            
                            {currentProgram.details.programStructure.semesterDetails && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Semester-wise Curriculum</h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                        {currentProgram.details.programStructure.semesterDetails.map((semester: { semester: number; title: string; subjects: string[] }, index: number) => (
                                            <motion.div 
                                                key={index} 
                                                className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span className="text-blue-600 font-bold text-sm sm:text-base">S{semester.semester}</span>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{semester.title}</h4>
                                                        <p className="text-xs sm:text-sm text-gray-600">{semester.subjects.length} Subjects</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    {semester.subjects.map((subject: string, subIndex: number) => (
                                                        <div key={subIndex} className="flex items-start gap-2">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
                                                            <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{subject}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );

            case 'careers':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Career Opportunities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentProgram.details.careerOpportunities.map((career: string, index: number) => (
                                <div key={index} className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                                        <span className="font-medium text-gray-900 text-sm sm:text-base">{career}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );

            case 'faculty':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Faculty Members</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {currentProgram.details.faculty.map((faculty: { name: string; designation: string; specialization: string; experience: string; photo: string }, index: number) => (
                                <motion.div 
                                    key={index} 
                                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Faculty Photo */}
                                    <div className="relative h-48 sm:h-64 bg-gray-100">
                                        {faculty.photo ? (
                                            <Image 
                                                src={faculty.photo} 
                                                alt={faculty.name}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                onError={(e) => {
                                                    // Fallback to initials if image fails to load
                                                    e.currentTarget.style.display = 'none';
                                                    const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                                                    if (sibling) {
                                                        sibling.style.display = 'flex';
                                                    }
                                                }}
                                            />
                                        ) : null}
                                        {/* Fallback initials with gradient (always available as backup) */}
                                        <div 
                                            className={`w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold grayscale group-hover:grayscale-0 transition-all duration-500 ${faculty.photo ? 'hidden' : 'flex'}`}
                                        >
                                            {faculty.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                        </div>
                                    </div>
                                    
                                    {/* Faculty Information */}
                                    <div className="p-4 sm:p-6 text-center">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                            {faculty.name}
                                        </h3>
                                        <p className="text-gray-600 text-xs sm:text-sm mb-1">
                                            {faculty.designation}
                                        </p>
                                        <p className="text-gray-500 text-xs sm:text-sm mb-2 leading-relaxed">
                                            {faculty.specialization}
                                        </p>
                                        <p className="text-gray-900 text-xs sm:text-sm font-medium mb-4">
                                            Engineering and Technology
                                        </p>
                                        
                                        {/* Connect Button */}
                                        <button 
                                            onClick={() => {
                                                // Connect functionality can be added here
                                            }}
                                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 text-sm"
                                        >
                                            Connect
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                {currentProgram.icon}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{currentProgram.title}</h1>
                                <p className="text-gray-600">{currentProgram.duration} • Intake: {currentProgram.intake}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600">{currentProgram.description}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-80 lg:flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden lg:sticky lg:top-4">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">Program Details</h2>
                            </div>

                            <div className="p-4">
                                {sidebarSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 flex items-center gap-3 ${
                                            activeSection === section.id
                                                ? 'bg-blue-500 text-white'
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <span className={activeSection === section.id ? 'text-white' : 'text-blue-600'}>
                                            {section.icon}
                                        </span>
                                        {section.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200 space-y-3">
                            <button 
                                onClick={handleApplyNow}
                                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <UserPlus className="w-4 h-4" />
                                Apply Now
                            </button>
                            <button 
                                onClick={handleDownloadBrochure}
                                className="w-full bg-white border-2 border-blue-500 text-blue-500 py-3 px-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                Download Brochure
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl p-8 min-h-[600px]">
                            <AnimatePresence mode="wait">
                                {renderContent()}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetailsPage;
