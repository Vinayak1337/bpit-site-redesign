'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, BookOpen, Calendar, Users, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SyllabusOrdinancePage() {
	const departments = [
		{
			name: "Computer Science & Engineering",
			code: "CSE",
			color: "blue",
			courses: ["B.Tech CSE", "M.Tech CSE"],
			syllabusCount: 8
		},
		{
			name: "Electronics & Communication",
			code: "ECE",
			color: "green",
			courses: ["B.Tech ECE", "M.Tech ECE"],
			syllabusCount: 8
		},
		{
			name: "Mechanical Engineering",
			code: "ME",
			color: "purple",
			courses: ["B.Tech ME", "M.Tech Production"],
			syllabusCount: 8
		},
		{
			name: "Electrical Engineering",
			code: "EE",
			color: "orange",
			courses: ["B.Tech EE"],
			syllabusCount: 8
		},
		{
			name: "Information Technology",
			code: "IT",
			color: "indigo",
			courses: ["B.Tech IT"],
			syllabusCount: 8
		}
	];

	const ordinances = [
		{
			title: "General Ordinance for Undergraduate Programs",
			description: "Complete guidelines for B.Tech programs, examination rules, and academic regulations",
			lastUpdated: "2024-01-15",
			size: "2.5 MB"
		},
		{
			title: "General Ordinance for Postgraduate Programs",
			description: "Guidelines for M.Tech programs, thesis requirements, and academic policies",
			lastUpdated: "2024-01-15",
			size: "1.8 MB"
		},
		{
			title: "Credit Transfer & Migration Policy",
			description: "Rules for credit transfer between institutions and migration procedures",
			lastUpdated: "2023-12-10",
			size: "850 KB"
		}
	];

	return (
		<div className="space-y-8">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center"
			>
				<div className="flex justify-center mb-4">
					<div className="p-4 bg-blue-100 rounded-full">
						<FileText className="w-8 h-8 text-blue-600" />
					</div>
				</div>
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Syllabus & Ordinance
				</h1>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto">
					Access comprehensive curriculum details, course syllabi, and academic ordinances 
					for all undergraduate and postgraduate programs at BPIT.
				</p>
			</motion.div>

			{/* Academic Ordinances Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Ordinances</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{ordinances.map((ordinance, index) => (
						<Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<CardHeader className="pb-4">
								<div className="flex items-start justify-between mb-2">
									<FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
									<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
										{ordinance.size}
									</span>
								</div>
								<CardTitle className="text-lg leading-tight">{ordinance.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 mb-4">{ordinance.description}</p>
								<div className="flex items-center justify-between">
									<span className="text-xs text-gray-500">
										Updated: {new Date(ordinance.lastUpdated).toLocaleDateString()}
									</span>
									<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
										<Download className="w-4 h-4 mr-1" />
										Download
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</motion.div>

			{/* Department Syllabi Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
			>
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Department-wise Syllabi</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{departments.map((dept, index) => (
						<Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-${dept.color}-50 to-${dept.color}-100`}>
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between mb-2">
									<div className={`p-2 bg-${dept.color}-600 rounded-lg`}>
										<BookOpen className="w-5 h-5 text-white" />
									</div>
									<span className={`text-xs font-semibold text-${dept.color}-700 bg-white px-2 py-1 rounded`}>
										{dept.code}
									</span>
								</div>
								<CardTitle className={`text-lg text-${dept.color}-900`}>{dept.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div>
										<span className="text-sm font-medium text-gray-700">Courses Offered:</span>
										<div className="flex flex-wrap gap-1 mt-1">
											{dept.courses.map((course, courseIndex) => (
												<span key={courseIndex} className={`text-xs bg-${dept.color}-200 text-${dept.color}-800 px-2 py-1 rounded`}>
													{course}
												</span>
											))}
										</div>
									</div>
									<div className="flex items-center justify-between">
										<span className={`text-sm text-${dept.color}-700`}>
											{dept.syllabusCount} Semester Syllabi
										</span>
										<Button size="sm" className={`bg-${dept.color}-600 hover:bg-${dept.color}-700`}>
											View Syllabi
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</motion.div>

			{/* Quick Stats */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
			>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div>
						<GraduationCap className="w-12 h-12 text-blue-200 mx-auto mb-3" />
						<h3 className="text-3xl font-bold mb-2">5</h3>
						<p className="text-blue-100">Engineering Departments</p>
					</div>
					<div>
						<Calendar className="w-12 h-12 text-blue-200 mx-auto mb-3" />
						<h3 className="text-3xl font-bold mb-2">8</h3>
						<p className="text-blue-100">Semesters per Program</p>
					</div>
					<div>
						<Users className="w-12 h-12 text-blue-200 mx-auto mb-3" />
						<h3 className="text-3xl font-bold mb-2">180+</h3>
						<p className="text-blue-100">Credits per Degree</p>
					</div>
				</div>
			</motion.div>

			{/* Additional Information */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
			>
				<div className="flex items-start space-x-3">
					<div className="flex-shrink-0">
						<div className="p-2 bg-yellow-100 rounded-lg">
							<FileText className="w-5 h-5 text-yellow-600" />
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
						<p className="text-yellow-700 text-sm leading-relaxed">
							All syllabi and ordinances are updated regularly as per GGSIPU guidelines. 
							Students are advised to download the latest versions before each academic session. 
							For any queries regarding curriculum or academic regulations, please contact the respective department offices.
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
