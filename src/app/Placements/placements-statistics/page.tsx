'use client';

import React, { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import {
	TrendingUp,
	Building2,
	Trophy,
	Users,
	Award,
	Search,
	Filter,
	ChevronDown,
	ChevronUp,
	ArrowUpDown,
	Briefcase,
	GraduationCap,
	ExternalLink,
	BarChart3
} from 'lucide-react';

// Types
interface Student {
	id: string;
	name: string;
	branch: string;
	company: string;
	role: string;
	package: number;
	ctcBreakdown?: {
		baseSalary: number;
		bonus: number;
		stocks: number;
	};
	profilePicture?: string;
}

interface Company {
	id: string;
	name: string;
	logo: string;
	highestPackage: number;
	role: string;
	studentsPlaced: number;
}

interface PlacementBulletin {
	id: string;
	text: string;
	link?: string;
	isNew: boolean;
}

type Branch = 'CSE' | 'IT' | 'ECE' | 'EEE' | 'BBA' | 'MBA';
type Year = '2025' | '2024' | '2023' | '2022';
type PackageSlab = 'all' | '1-3' | '3-6' | '6-10' | '10-15' | '15-20' | '20-30' | '30-40' | '40-50';

const PlacementStatisticsPage = () => {
	const [selectedYear, setSelectedYear] = useState<Year>('2025');
	const [selectedBranch, setSelectedBranch] = useState<Branch>('CSE');
	const [packageFilter, setPackageFilter] = useState<PackageSlab>('all');
	const [companySearch, setCompanySearch] = useState('');
	const [roleSearch, setRoleSearch] = useState('');
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Student;
		direction: 'asc' | 'desc';
	} | null>(null);

	const fadeInUp: Variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
		}
	};

	const staggerContainer: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2
			}
		}
	};

	// Sample data - replace with real data
	const placementBulletins: PlacementBulletin[] = [
		{
			id: '1',
			text: '🎉 RECORD BREAKING: Rahul Sharma (CSE) secures 45 LPA at Google - Highest package in college history!',
			link: '/placement-details/google-2025',
			isNew: true
		},
		{
			id: '2',
			text: '🚀 MICROSOFT MEGA DRIVE: 15 students selected with packages ranging from 28-38 LPA across Software Engineering roles',
			link: '/placement-details/microsoft-2025',
			isNew: true
		},
		{
			id: '3',
			text: '📊 PLACEMENT MILESTONE: 96.8% placement rate achieved for CSE batch 2025 - Surpassing all previous records',
			isNew: true
		},
		{
			id: '4',
			text: '🏆 AMAZON SUCCESS: 8 ECE students placed as SDE-1 with average package of 28 LPA + stock options',
			link: '/placement-details/amazon-2025',
			isNew: false
		},
		{
			id: '5',
			text: '⭐ ADOBE CREATIVE CLOUD: 12 students selected for internships with guaranteed full-time conversion opportunity',
			link: '/placement-details/adobe-2025',
			isNew: true
		},
		{
			id: '6',
			text: '🎯 GOLDMAN SACHS: Technology Analyst positions - 4 students from IT department with 32 LPA packages',
			isNew: false
		},
		{
			id: '7',
			text: '💡 ATLASSIAN EXCELLENCE: 5 offers finalized with average 28 LPA for Full Stack Developer positions',
			isNew: false
		},
		{
			id: '8',
			text: '🔥 DREAM COMPANY SURGE: 65+ students placed in top-tier companies including FAANG, unicorns, and Fortune 500',
			isNew: true
		},
		{
			id: '9',
			text: '🌟 SPOTIFY DEBUT: First-ever placement drive at BPIT - 3 students selected for Backend Engineering roles',
			isNew: true
		},
		{
			id: '10',
			text: '💼 DELOITTE CONSULTING: 6 Business Technology Analyst positions filled with 18 LPA packages',
			isNew: false
		},
		{
			id: '11',
			text: '🎊 FLIPKART BIG WIN: 10 students across departments join as Software Development Engineers - 22 LPA average',
			isNew: true
		},
		{
			id: '12',
			text: '🚀 STARTUP SUCCESS: 15+ students join unicorn startups like Razorpay, Zomato, and Paytm with equity options',
			isNew: false
		}
	];

	const topCompanies: Record<Year, Company[]> = {
		'2025': [
			{
				id: '1',
				name: 'Google',
				logo: '/logos/microsoft.png', // Using available logo as placeholder
				highestPackage: 45,
				role: 'Software Engineer',
				studentsPlaced: 3
			},
			{
				id: '2',
				name: 'Microsoft',
				logo: '/logos/microsoft.png',
				highestPackage: 38,
				role: 'Software Development Engineer',
				studentsPlaced: 15
			},
			{
				id: '3',
				name: 'Amazon',
				logo: '/logos/accenture.png', // Using available logo as placeholder
				highestPackage: 32,
				role: 'Software Development Engineer',
				studentsPlaced: 12
			},
			{
				id: '4',
				name: 'Atlassian',
				logo: '/logos/cognizant.png', // Using available logo as placeholder
				highestPackage: 28,
				role: 'Software Engineer',
				studentsPlaced: 5
			},
			{
				id: '5',
				name: 'Adobe',
				logo: '/logos/ibm.png', // Using available logo as placeholder
				highestPackage: 25,
				role: 'Software Engineer',
				studentsPlaced: 7
			},
			{
				id: '6',
				name: 'Goldman Sachs',
				logo: '/logos/wipro.png', // Using available logo as placeholder
				highestPackage: 22,
				role: 'Technology Analyst',
				studentsPlaced: 4
			},
			{
				id: '7',
				name: 'Infosys',
				logo: '/logos/infosys.png',
				highestPackage: 18,
				role: 'Software Engineer',
				studentsPlaced: 25
			},
			{
				id: '8',
				name: 'TCS',
				logo: '/logos/tcs.png',
				highestPackage: 15,
				role: 'Assistant System Engineer',
				studentsPlaced: 35
			},
			{
				id: '9',
				name: 'Capgemini',
				logo: '/logos/capgemini.png',
				highestPackage: 16,
				role: 'Analyst',
				studentsPlaced: 20
			},
			{
				id: '10',
				name: 'HCL',
				logo: '/logos/hcl.png',
				highestPackage: 14,
				role: 'Software Engineer',
				studentsPlaced: 18
			}
		],
		'2024': [
			{
				id: '1',
				name: 'Microsoft',
				logo: '/logos/microsoft.png',
				highestPackage: 42,
				role: 'Software Development Engineer',
				studentsPlaced: 18
			},
			{
				id: '2',
				name: 'Infosys',
				logo: '/logos/infosys.png',
				highestPackage: 20,
				role: 'Software Engineer',
				studentsPlaced: 30
			},
			{
				id: '3',
				name: 'TCS',
				logo: '/logos/tcs.png',
				highestPackage: 16,
				role: 'Assistant System Engineer',
				studentsPlaced: 40
			},
			{
				id: '4',
				name: 'Wipro',
				logo: '/logos/wipro.png',
				highestPackage: 15,
				role: 'Project Engineer',
				studentsPlaced: 22
			}
		],
		'2023': [
			{
				id: '1',
				name: 'TCS',
				logo: '/logos/tcs.png',
				highestPackage: 14,
				role: 'Assistant System Engineer',
				studentsPlaced: 45
			},
			{
				id: '2',
				name: 'Infosys',
				logo: '/logos/infosys.png',
				highestPackage: 18,
				role: 'Software Engineer',
				studentsPlaced: 28
			},
			{
				id: '3',
				name: 'Cognizant',
				logo: '/logos/cognizant.png',
				highestPackage: 12,
				role: 'Programmer Analyst',
				studentsPlaced: 15
			}
		],
		'2022': [
			{
				id: '1',
				name: 'Infosys',
				logo: '/logos/infosys.png',
				highestPackage: 16,
				role: 'Software Engineer',
				studentsPlaced: 32
			},
			{
				id: '2',
				name: 'TCS',
				logo: '/logos/tcs.png',
				highestPackage: 13,
				role: 'Assistant System Engineer',
				studentsPlaced: 38
			}
		]
	};

	const placementData: Record<Year, Record<Branch, Student[]>> = useMemo(() => ({
		'2025': {
			'CSE': [
				{
					id: '1',
					name: 'Rahul Sharma',
					branch: 'CSE',
					company: 'Google',
					role: 'Software Engineer',
					package: 45,
					ctcBreakdown: { baseSalary: 25, bonus: 10, stocks: 10 }
				},
				{
					id: '2',
					name: 'Priya Singh',
					branch: 'CSE',
					company: 'Microsoft',
					role: 'Software Development Engineer',
					package: 38,
					ctcBreakdown: { baseSalary: 22, bonus: 8, stocks: 8 }
				},
				{
					id: '3',
					name: 'Amit Kumar',
					branch: 'CSE',
					company: 'Amazon',
					role: 'Software Development Engineer',
					package: 32,
					ctcBreakdown: { baseSalary: 18, bonus: 7, stocks: 7 }
				},
				{
					id: '4',
					name: 'Sneha Gupta',
					branch: 'CSE',
					company: 'Adobe',
					role: 'Software Engineer',
					package: 25,
					ctcBreakdown: { baseSalary: 15, bonus: 5, stocks: 5 }
				},
				{
					id: '5',
					name: 'Vikash Patel',
					branch: 'CSE',
					company: 'Atlassian',
					role: 'Software Engineer',
					package: 28,
					ctcBreakdown: { baseSalary: 16, bonus: 6, stocks: 6 }
				},
				{
					id: '6',
					name: 'Arun Khanna',
					branch: 'CSE',
					company: 'Infosys',
					role: 'Software Engineer',
					package: 18,
					ctcBreakdown: { baseSalary: 12, bonus: 3, stocks: 3 }
				},
				{
					id: '7',
					name: 'Neha Joshi',
					branch: 'CSE',
					company: 'TCS',
					role: 'Assistant System Engineer',
					package: 15,
					ctcBreakdown: { baseSalary: 11, bonus: 2, stocks: 2 }
				},
				{
					id: '8',
					name: 'Rohit Malhotra',
					branch: 'CSE',
					company: 'Capgemini',
					role: 'Analyst',
					package: 16,
					ctcBreakdown: { baseSalary: 12, bonus: 2, stocks: 2 }
				}
			],
			'IT': [
				{
					id: '9',
					name: 'Anjali Mehta',
					branch: 'IT',
					company: 'Infosys',
					role: 'System Engineer',
					package: 18,
					ctcBreakdown: { baseSalary: 12, bonus: 3, stocks: 3 }
				},
				{
					id: '10',
					name: 'Rohan Das',
					branch: 'IT',
					company: 'TCS',
					role: 'Assistant System Engineer',
					package: 15,
					ctcBreakdown: { baseSalary: 11, bonus: 2, stocks: 2 }
				},
				{
					id: '11',
					name: 'Kavita Rao',
					branch: 'IT',
					company: 'Wipro',
					role: 'Project Engineer',
					package: 14,
					ctcBreakdown: { baseSalary: 10, bonus: 2, stocks: 2 }
				},
				{
					id: '12',
					name: 'Saurabh Goel',
					branch: 'IT',
					company: 'HCL',
					role: 'Software Engineer',
					package: 12,
					ctcBreakdown: { baseSalary: 9, bonus: 1.5, stocks: 1.5 }
				},
				{
					id: '13',
					name: 'Divya Sharma',
					branch: 'IT',
					company: 'Cognizant',
					role: 'Programmer Analyst',
					package: 10,
					ctcBreakdown: { baseSalary: 7.5, bonus: 1.25, stocks: 1.25 }
				}
			],
			'ECE': [
				{
					id: '14',
					name: 'Kavya Reddy',
					branch: 'ECE',
					company: 'Qualcomm',
					role: 'Hardware Engineer',
					package: 22,
					ctcBreakdown: { baseSalary: 15, bonus: 3.5, stocks: 3.5 }
				},
				{
					id: '15',
					name: 'Rajesh Kumar',
					branch: 'ECE',
					company: 'Samsung',
					role: 'R&D Engineer',
					package: 18,
					ctcBreakdown: { baseSalary: 12, bonus: 3, stocks: 3 }
				},
				{
					id: '16',
					name: 'Pooja Singh',
					branch: 'ECE',
					company: 'TCS',
					role: 'Assistant System Engineer',
					package: 14,
					ctcBreakdown: { baseSalary: 10, bonus: 2, stocks: 2 }
				},
				{
					id: '17',
					name: 'Kiran Nair',
					branch: 'ECE',
					company: 'Infosys',
					role: 'Systems Engineer',
					package: 16,
					ctcBreakdown: { baseSalary: 11, bonus: 2.5, stocks: 2.5 }
				}
			],
			'EEE': [
				{
					id: '18',
					name: 'Arjun Verma',
					branch: 'EEE',
					company: 'General Electric',
					role: 'Electrical Engineer',
					package: 16,
					ctcBreakdown: { baseSalary: 11, bonus: 2.5, stocks: 2.5 }
				},
				{
					id: '19',
					name: 'Meera Gupta',
					branch: 'EEE',
					company: 'Siemens',
					role: 'Power Systems Engineer',
					package: 14,
					ctcBreakdown: { baseSalary: 10, bonus: 2, stocks: 2 }
				},
				{
					id: '20',
					name: 'Suresh Yadav',
					branch: 'EEE',
					company: 'TCS',
					role: 'Assistant System Engineer',
					package: 12,
					ctcBreakdown: { baseSalary: 9, bonus: 1.5, stocks: 1.5 }
				}
			],
			'BBA': [
				{
					id: '21',
					name: 'Sakshi Jain',
					branch: 'BBA',
					company: 'Deloitte',
					role: 'Business Analyst',
					package: 12,
					ctcBreakdown: { baseSalary: 8, bonus: 2, stocks: 2 }
				},
				{
					id: '22',
					name: 'Harsh Agarwal',
					branch: 'BBA',
					company: 'PwC',
					role: 'Associate',
					package: 10,
					ctcBreakdown: { baseSalary: 7, bonus: 1.5, stocks: 1.5 }
				},
				{
					id: '23',
					name: 'Ritu Bansal',
					branch: 'BBA',
					company: 'KPMG',
					role: 'Analyst',
					package: 9,
					ctcBreakdown: { baseSalary: 6.5, bonus: 1.25, stocks: 1.25 }
				}
			],
			'MBA': [
				{
					id: '24',
					name: 'Manish Agarwal',
					branch: 'MBA',
					company: 'McKinsey & Company',
					role: 'Associate Consultant',
					package: 42,
					ctcBreakdown: { baseSalary: 25, bonus: 8.5, stocks: 8.5 }
				},
				{
					id: '25',
					name: 'Priyanka Joshi',
					branch: 'MBA',
					company: 'BCG',
					role: 'Associate',
					package: 38,
					ctcBreakdown: { baseSalary: 22, bonus: 8, stocks: 8 }
				},
				{
					id: '26',
					name: 'Abhishek Sharma',
					branch: 'MBA',
					company: 'Bain & Company',
					role: 'Associate Consultant',
					package: 35,
					ctcBreakdown: { baseSalary: 20, bonus: 7.5, stocks: 7.5 }
				}
			]
		},
		'2024': {
			'CSE': [
				{
					id: '27',
					name: 'Ravi Kumar',
					branch: 'CSE',
					company: 'Microsoft',
					role: 'Software Development Engineer',
					package: 42,
					ctcBreakdown: { baseSalary: 24, bonus: 9, stocks: 9 }
				},
				{
					id: '28',
					name: 'Deepika Singh',
					branch: 'CSE',
					company: 'Google',
					role: 'Software Engineer',
					package: 40,
					ctcBreakdown: { baseSalary: 22, bonus: 9, stocks: 9 }
				},
				{
					id: '29',
					name: 'Akash Gupta',
					branch: 'CSE',
					company: 'Amazon',
					role: 'Software Development Engineer',
					package: 30,
					ctcBreakdown: { baseSalary: 17, bonus: 6.5, stocks: 6.5 }
				}
			],
			'IT': [
				{
					id: '30',
					name: 'Shreya Patel',
					branch: 'IT',
					company: 'Infosys',
					role: 'Software Engineer',
					package: 20,
					ctcBreakdown: { baseSalary: 13, bonus: 3.5, stocks: 3.5 }
				}
			],
			'ECE': [
				{
					id: '31',
					name: 'Nikhil Reddy',
					branch: 'ECE',
					company: 'Intel',
					role: 'Hardware Engineer',
					package: 25,
					ctcBreakdown: { baseSalary: 16, bonus: 4.5, stocks: 4.5 }
				}
			],
			'EEE': [
				{
					id: '32',
					name: 'Sunita Verma',
					branch: 'EEE',
					company: 'ABB',
					role: 'Electrical Engineer',
					package: 18,
					ctcBreakdown: { baseSalary: 12, bonus: 3, stocks: 3 }
				}
			],
			'BBA': [
				{
					id: '33',
					name: 'Vikram Singh',
					branch: 'BBA',
					company: 'EY',
					role: 'Business Analyst',
					package: 11,
					ctcBreakdown: { baseSalary: 7.5, bonus: 1.75, stocks: 1.75 }
				}
			],
			'MBA': [
				{
					id: '34',
					name: 'Anita Sharma',
					branch: 'MBA',
					company: 'McKinsey & Company',
					role: 'Associate Consultant',
					package: 40,
					ctcBreakdown: { baseSalary: 23, bonus: 8.5, stocks: 8.5 }
				}
			]
		},
		'2023': {
			'CSE': [
				{
					id: '35',
					name: 'Rajesh Agarwal',
					branch: 'CSE',
					company: 'TCS',
					role: 'Assistant System Engineer',
					package: 14,
					ctcBreakdown: { baseSalary: 10, bonus: 2, stocks: 2 }
				}
			],
			'IT': [
				{
					id: '36',
					name: 'Preeti Jain',
					branch: 'IT',
					company: 'Infosys',
					role: 'Systems Engineer',
					package: 18,
					ctcBreakdown: { baseSalary: 12, bonus: 3, stocks: 3 }
				}
			],
			'ECE': [],
			'EEE': [],
			'BBA': [],
			'MBA': []
		},
		'2022': {
			'CSE': [
				{
					id: '37',
					name: 'Sandeep Kumar',
					branch: 'CSE',
					company: 'Infosys',
					role: 'Software Engineer',
					package: 16,
					ctcBreakdown: { baseSalary: 11, bonus: 2.5, stocks: 2.5 }
				}
			],
			'IT': [
				{
					id: '38',
					name: 'Rashmi Singh',
					branch: 'IT',
					company: 'TCS',
					role: 'Assistant System Engineer',
					package: 13,
					ctcBreakdown: { baseSalary: 9.5, bonus: 1.75, stocks: 1.75 }
				}
			],
			'ECE': [],
			'EEE': [],
			'BBA': [],
			'MBA': []
		}
	}), []);

	// Filter and sort functions
	const filteredStudents = useMemo(() => {
		let students = placementData[selectedYear][selectedBranch] || [];

		// Filter by package slab
		if (packageFilter !== 'all') {
			const [min, max] = packageFilter.split('-').map(Number);
			students = students.filter(student => 
				student.package >= min && student.package <= max
			);
		}

		// Filter by company search
		if (companySearch) {
			students = students.filter(student =>
				student.company.toLowerCase().includes(companySearch.toLowerCase())
			);
		}

		// Filter by role search
		if (roleSearch) {
			students = students.filter(student =>
				student.role.toLowerCase().includes(roleSearch.toLowerCase())
			);
		}

		// Sort students
		if (sortConfig) {
			students.sort((a, b) => {
				const aValue = a[sortConfig.key];
				const bValue = b[sortConfig.key];
				
				if (aValue == null && bValue == null) return 0;
				if (aValue == null) return 1;
				if (bValue == null) return -1;
				
				if (aValue < bValue) {
					return sortConfig.direction === 'asc' ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === 'asc' ? 1 : -1;
				}
				return 0;
			});
		}

		return students;
	}, [selectedYear, selectedBranch, packageFilter, companySearch, roleSearch, sortConfig, placementData]);

	const topEngineeringStudents = useMemo(() => {
		const engineeringBranches: Branch[] = ['CSE', 'IT', 'ECE', 'EEE'];
		const allEngStudents = engineeringBranches.flatMap(branch => 
			placementData[selectedYear][branch] || []
		);
		return allEngStudents
			.sort((a, b) => b.package - a.package)
			.slice(0, 10);
	}, [selectedYear, placementData]);

	const topBusinessStudents = useMemo(() => {
		const businessBranches: Branch[] = ['BBA', 'MBA'];
		const allBizStudents = businessBranches.flatMap(branch => 
			placementData[selectedYear][branch] || []
		);
		return allBizStudents
			.sort((a, b) => b.package - a.package)
			.slice(0, 10);
	}, [selectedYear, placementData]);

	const handleSort = (key: keyof Student) => {
		setSortConfig(current => ({
			key,
			direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
		}));
	};

	const getSortIcon = (key: keyof Student) => {
		if (sortConfig?.key !== key) {
			return <ArrowUpDown className="w-4 h-4" />;
		}
		return sortConfig.direction === 'asc' ? 
			<ChevronUp className="w-4 h-4" /> : 
			<ChevronDown className="w-4 h-4" />;
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Header */}
			<div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
						className="text-center"
					>
						<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
							Placement Statistics
						</h1>
						<p className="text-xl text-blue-100 max-w-3xl mx-auto">
							Comprehensive placement data showcasing our students&apos; achievements and industry partnerships
						</p>
					</motion.div>
				</div>
			</div>

			{/* Key Statistics Cards */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
					>
						<Card className="border-l-4 border-l-blue-500">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Overall Placement Rate</p>
										<p className="text-3xl font-bold text-blue-600">96.8%</p>
										<p className="text-xs text-green-600 flex items-center">
											<TrendingUp className="w-3 h-3 mr-1" />
											+6.2% from last year
										</p>
									</div>
									<div className="p-3 bg-blue-100 rounded-full">
										<GraduationCap className="w-6 h-6 text-blue-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<Card className="border-l-4 border-l-green-500">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Average Package</p>
										<p className="text-3xl font-bold text-green-600">₹14.2 LPA</p>
										<p className="text-xs text-green-600 flex items-center">
											<TrendingUp className="w-3 h-3 mr-1" />
											+22% growth
										</p>
									</div>
									<div className="p-3 bg-green-100 rounded-full">
										<Trophy className="w-6 h-6 text-green-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<Card className="border-l-4 border-l-purple-500">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Highest Package</p>
										<p className="text-3xl font-bold text-purple-600">₹45 LPA</p>
										<p className="text-xs text-gray-500">
											Google - Software Engineer
										</p>
									</div>
									<div className="p-3 bg-purple-100 rounded-full">
										<Award className="w-6 h-6 text-purple-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<Card className="border-l-4 border-l-orange-500">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">Companies Visited</p>
										<p className="text-3xl font-bold text-orange-600">180+</p>
										<p className="text-xs text-green-600 flex items-center">
											<Building2 className="w-3 h-3 mr-1" />
											42 dream companies
										</p>
									</div>
									<div className="p-3 bg-orange-100 rounded-full">
										<Building2 className="w-6 h-6 text-orange-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>

			{/* Department-wise Statistics */}
			<div className="container mx-auto px-4 pb-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<BarChart3 className="w-5 h-5 text-blue-600" />
								Department-wise Placement Overview
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-4">
									<div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
										<div>
											<p className="font-semibold text-blue-800">Computer Science</p>
											<p className="text-sm text-blue-600">98.5% placed</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-blue-800">₹15.2 LPA</p>
											<p className="text-xs text-blue-600">avg package</p>
										</div>
									</div>
									<div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
										<div>
											<p className="font-semibold text-green-800">Electronics & Comm.</p>
											<p className="text-sm text-green-600">95.8% placed</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-green-800">₹12.8 LPA</p>
											<p className="text-xs text-green-600">avg package</p>
										</div>
									</div>
								</div>
								<div className="space-y-4">
									<div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
										<div>
											<p className="font-semibold text-purple-800">Information Technology</p>
											<p className="text-sm text-purple-600">97.2% placed</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-purple-800">₹14.5 LPA</p>
											<p className="text-xs text-purple-600">avg package</p>
										</div>
									</div>
									<div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
										<div>
											<p className="font-semibold text-orange-800">BBA</p>
											<p className="text-sm text-orange-600">88.4% placed</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-orange-800">₹8.2 LPA</p>
											<p className="text-xs text-orange-600">avg package</p>
										</div>
									</div>
								</div>
								<div className="space-y-4">
									<div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
										<div>
											<p className="font-semibold text-teal-800">Electrical</p>
											<p className="text-sm text-teal-600">91.7% placed</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-teal-800">₹9.8 LPA</p>
											<p className="text-xs text-teal-600">avg package</p>
										</div>
									</div>
									<div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
										<div>
											<p className="font-semibold text-indigo-800">MBA</p>
											<p className="text-sm text-indigo-600">85.3% placed</p>
										</div>
										<div className="text-right">
											<p className="font-bold text-indigo-800">₹7.5 LPA</p>
											<p className="text-xs text-indigo-600">avg package</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>

			{/* Placement Update Bulletin */}
			<div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 sticky top-0 z-50 shadow-lg">
				<div className="container mx-auto px-4">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 text-sm font-semibold">
							<Trophy className="w-5 h-5" />
							<span>Latest Updates:</span>
						</div>
						<div className="flex-1 overflow-hidden">
							<motion.div 
								className="flex gap-12 whitespace-nowrap"
								animate={{ x: ["100%", "-100%"] }}
								transition={{ 
									duration: 20, 
									repeat: Infinity, 
									ease: "linear" 
								}}
							>
								{placementBulletins.map((bulletin) => (
									<div key={bulletin.id} className="flex items-center gap-2">
										{bulletin.isNew && (
											<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
												NEW
											</span>
										)}
										<span>{bulletin.text}</span>
										{bulletin.link && (
											<ExternalLink className="w-4 h-4" />
										)}
									</div>
								))}
							</motion.div>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				{/* Year Toggle */}
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeInUp}
					className="flex justify-center mb-12"
				>
					<div className="bg-white rounded-full p-2 shadow-lg border">
						<div className="flex gap-2">
							{(['2025', '2024', '2023', '2022'] as Year[]).map((year) => (
								<Button
									key={year}
									variant={selectedYear === year ? 'default' : 'ghost'}
									onClick={() => setSelectedYear(year)}
									className={`rounded-full px-6 py-2 transition-all ${
										selectedYear === year
											? 'bg-blue-600 text-white shadow-md'
											: 'hover:bg-blue-50'
									}`}
								>
									Batch {year}
								</Button>
							))}
						</div>
					</div>
				</motion.div>

				{/* Major Companies Section */}
				<motion.section
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="mb-16"
				>
					<motion.div variants={fadeInUp} className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							 Major Companies Offering Above 10 LPA 
							<span className="text-blue-600">(Batch {selectedYear})</span>
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{topCompanies[selectedYear]?.map((company) => (
							<motion.div
								key={company.id}
								variants={fadeInUp}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
							>
								<Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
									<CardHeader className="text-center pb-4">
										<div className="w-10 h-10 mx-auto mb-4 relative">
											<Image
												src={company.logo}
												alt={company.name}
												fill
												className="object-contain group-hover:scale-110 transition-transform duration-300"
											/>
										</div>
										<CardTitle className="text-xl font-bold text-gray-900">
											{company.name}
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-gray-600">Highest Package:</span>
											<span className="font-bold text-green-600 text-lg">
												₹{company.highestPackage} LPA
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-600">Role:</span>
											<span className="font-medium text-gray-900">
												{company.role}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-600">Students Placed:</span>
											<span className="font-bold text-blue-600">
												{company.studentsPlaced}
											</span>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Branch-wise Placement Table */}
				<motion.section
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="mb-16"
				>
					<motion.div variants={fadeInUp} className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							📊 Branch-Wise Placement Data
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
					</motion.div>

					<Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
						<CardHeader>
							{/* Branch Tabs */}
							<div className="flex flex-wrap gap-2 mb-6">
								{(['CSE', 'IT', 'ECE', 'EEE', 'BBA', 'MBA'] as Branch[]).map((branch) => (
									<Button
										key={branch}
										variant={selectedBranch === branch ? 'default' : 'outline'}
										onClick={() => setSelectedBranch(branch)}
										className={`transition-all ${
											selectedBranch === branch
												? 'bg-blue-600 text-white'
												: 'hover:bg-blue-50'
										}`}
									>
										{branch}
									</Button>
								))}
							</div>

							{/* Filters */}
							<div className="flex flex-col lg:flex-row gap-4">
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Filter by Package Range
									</label>
									<Select value={packageFilter} onValueChange={(value: PackageSlab) => setPackageFilter(value)}>
										<SelectTrigger>
											<SelectValue placeholder="Select package range" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Packages</SelectItem>
											<SelectItem value="1-3">1-3 LPA</SelectItem>
											<SelectItem value="3-6">3-6 LPA</SelectItem>
											<SelectItem value="6-10">6-10 LPA</SelectItem>
											<SelectItem value="10-15">10-15 LPA</SelectItem>
											<SelectItem value="15-20">15-20 LPA</SelectItem>
											<SelectItem value="20-30">20-30 LPA</SelectItem>
											<SelectItem value="30-40">30-40 LPA</SelectItem>
											<SelectItem value="40-50">40-50 LPA</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Search by Company
									</label>
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
										<Input
											placeholder="Search company name..."
											value={companySearch}
											onChange={(e) => setCompanySearch(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Search by Role
									</label>
									<div className="relative">
										<Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
										<Input
											placeholder="Search role (e.g. Software Engineer)..."
											value={roleSearch}
											onChange={(e) => setRoleSearch(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
							</div>

							{/* Filter Status and Clear Button */}
							{(packageFilter !== 'all' || companySearch || roleSearch) && (
								<div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
									<div className="flex items-center gap-2 text-sm text-blue-700">
										<Filter className="w-4 h-4" />
										<span>
											Active filters: 
											{packageFilter !== 'all' && ` Package (${packageFilter} LPA)`}
											{companySearch && ` Company (${companySearch})`}
											{roleSearch && ` Role (${roleSearch})`}
										</span>
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											setPackageFilter('all');
											setCompanySearch('');
											setRoleSearch('');
										}}
										className="text-blue-700 border-blue-300 hover:bg-blue-100"
									>
										Clear Filters
									</Button>
								</div>
							)}
						</CardHeader>
						<CardContent>
							{/* Table */}
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-gray-200">
											<th 
												className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
												onClick={() => handleSort('name')}
											>
												<div className="flex items-center gap-2">
													Name
													{getSortIcon('name')}
												</div>
											</th>
											<th 
												className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
												onClick={() => handleSort('company')}
											>
												<div className="flex items-center gap-2">
													Company
													{getSortIcon('company')}
												</div>
											</th>
											<th 
												className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
												onClick={() => handleSort('package')}
											>
												<div className="flex items-center gap-2">
													Package (LPA)
													{getSortIcon('package')}
												</div>
											</th>
											<th 
												className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
												onClick={() => handleSort('role')}
											>
												<div className="flex items-center gap-2">
													Role
													{getSortIcon('role')}
												</div>
											</th>
											<th className="text-left py-3 px-4 font-semibold text-gray-700">
												CTC Breakdown
											</th>
										</tr>
									</thead>
									<tbody>
										{filteredStudents.map((student, index) => (
											<motion.tr
												key={student.id}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 }}
												className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
											>
												<td className="py-4 px-4">
													<div className="flex items-center gap-3">
														{student.profilePicture && (
															<div className="w-8 h-8 rounded-full overflow-hidden">
																<Image
																	src={student.profilePicture}
																	alt={student.name}
																	width={32}
																	height={32}
																	className="object-cover"
																/>
															</div>
														)}
														<span className="font-medium text-gray-900">
															{student.name}
														</span>
													</div>
												</td>
												<td className="py-4 px-4 text-gray-700">
													{student.company}
												</td>
												<td className="py-4 px-4">
													<span className="font-bold text-green-600 text-lg">
														₹{student.package}
													</span>
												</td>
												<td className="py-4 px-4 text-gray-700">
													{student.role}
												</td>
												<td className="py-4 px-4">
													{student.ctcBreakdown ? (
														<div className="text-sm">
															<div>Base: ₹{student.ctcBreakdown.baseSalary}L</div>
															<div>Bonus: ₹{student.ctcBreakdown.bonus}L</div>
															<div>Stocks: ₹{student.ctcBreakdown.stocks}L</div>
														</div>
													) : (
														<span className="text-gray-400">Not available</span>
													)}
												</td>
											</motion.tr>
										))}
									</tbody>
								</table>
								{filteredStudents.length === 0 && (
									<div className="text-center py-12 text-gray-500">
										<Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
										<p>No placement data found for the selected filters.</p>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</motion.section>

				{/* Top Selected Students */}
				<motion.section
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="mb-16"
				>
					<motion.div variants={fadeInUp} className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							🏆 Top Selected Students
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
					</motion.div>

					<div className="grid lg:grid-cols-2 gap-8">
						{/* Engineering Students */}
						<motion.div variants={fadeInUp}>
							<Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl">
								<CardHeader>
									<CardTitle className="flex items-center gap-3 text-2xl text-blue-900">
										<GraduationCap className="w-6 h-6" />
										Top Engineering Students
									</CardTitle>
									<CardDescription className="text-blue-700">
										CSE, IT, ECE, EEE
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{topEngineeringStudents.map((student, index) => (
											<motion.div
												key={student.id}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 }}
												className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
											>
												<div className="flex items-center gap-4">
													<div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
														{index + 1}
													</div>
													<div>
														<div className="font-semibold text-gray-900">
															{student.name}
														</div>
														<div className="text-sm text-gray-600">
															{student.branch} • {student.company}
														</div>
														<div className="text-sm text-gray-600">
															{student.role}
														</div>
													</div>
												</div>
												<div className="text-right">
													<div className="font-bold text-green-600 text-lg">
														₹{student.package} LPA
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* Business Students */}
						<motion.div variants={fadeInUp}>
							<Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-0 shadow-xl">
								<CardHeader>
									<CardTitle className="flex items-center gap-3 text-2xl text-emerald-900">
										<Briefcase className="w-6 h-6" />
										Top Business Students
									</CardTitle>
									<CardDescription className="text-emerald-700">
										BBA, MBA
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{topBusinessStudents.map((student, index) => (
											<motion.div
												key={student.id}
												initial={{ opacity: 0, x: 20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 }}
												className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
											>
												<div className="flex items-center gap-4">
													<div className="flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full font-bold text-sm">
														{index + 1}
													</div>
													<div>
														<div className="font-semibold text-gray-900">
															{student.name}
														</div>
														<div className="text-sm text-gray-600">
															{student.branch} • {student.company}
														</div>
														<div className="text-sm text-gray-600">
															{student.role}
														</div>
													</div>
												</div>
												<div className="text-right">
													<div className="font-bold text-green-600 text-lg">
														₹{student.package} LPA
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</motion.section>

				{/* Statistics Overview */}
				<motion.section
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="mb-16"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<motion.div variants={fadeInUp}>
							<Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-blue-100 text-sm">Total Placements</p>
											<p className="text-3xl font-bold">
												{Object.values(placementData[selectedYear]).flat().length}
											</p>
										</div>
										<Users className="w-8 h-8 text-blue-200" />
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeInUp}>
							<Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-green-100 text-sm">Highest Package</p>
											<p className="text-3xl font-bold">
												₹{(() => {
													const allStudents = Object.values(placementData[selectedYear]).flat();
													return allStudents.length > 0 ? Math.max(...allStudents.map(s => s.package)) : 0;
												})()} LPA
											</p>
										</div>
										<Trophy className="w-8 h-8 text-green-200" />
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeInUp}>
							<Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-purple-100 text-sm">Average Package</p>
											<p className="text-3xl font-bold">
												₹{(() => {
													const allStudents = Object.values(placementData[selectedYear]).flat();
													if (allStudents.length === 0) return 0;
													const total = allStudents.reduce((sum, s) => sum + s.package, 0);
													return (total / allStudents.length).toFixed(1);
												})()} LPA
											</p>
										</div>
										<TrendingUp className="w-8 h-8 text-purple-200" />
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeInUp}>
							<Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-orange-100 text-sm">Top Companies</p>
											<p className="text-3xl font-bold">
												{topCompanies[selectedYear]?.length || 0}
											</p>
										</div>
										<Building2 className="w-8 h-8 text-orange-200" />
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</motion.section>
			</div>
		</div>
	);
};

export default PlacementStatisticsPage;
