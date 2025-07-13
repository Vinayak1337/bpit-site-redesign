'use client';

import { motion } from 'framer-motion';
import { BookOpen, Award, Users, Globe, GraduationCap, Star, CheckCircle } from 'lucide-react';
import React from 'react';

interface ScholarshipCategory {
    title: string;
    icon: React.ReactElement;
    color: string;
    scholarships: string[];
    portal?: string;
}

export default function ScholarshipPage() {
    const scholarshipCategories: ScholarshipCategory[] = [
        {
            title: "From University (GGSIPU)",
            icon: <GraduationCap className="w-6 h-6" />,
            color: "bg-blue-500",
            scholarships: [
                "EWS Scholarship"
            ],
            portal: "University Portal"
        },
        {
            title: "From Delhi Government (E-District Portal)",
            icon: <Globe className="w-6 h-6" />,
            color: "bg-green-500",
            scholarships: [
                "Merit-cum-Means Income Linked Financial Assistance Scheme of Delhi Higher Education Aid Trust",
                "B.R. Ambedkar State Toppers Award for Students belonging to SC/ST/OBC Category",
                "Merit Scholarship for students belonging to Minority studying in professional/technical colleges. Institutions/Universities",
                "Merit Scholarship to SC/ST/OBC Students of College/Professional Institutions",
                "Post Matric Scholarship for OBC Students(PMS-OBC)",
                "Post matric Scholarship schemes for SC"
            ],
            portal: "E-District Portal"
        },
        {
            title: "From National Scholarship Portal (NSP Portal 2.0)",
            icon: <Award className="w-6 h-6" />,
            color: "bg-purple-500",
            scholarships: [
                "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Riflesmm",
                "Merit-Cum-Means Scholarship for Professional and Technical Courses CS",
                "Central Sector Scheme of Scholarships for College and University Students",
                "Post Matric Scholarship Schemes Minorities CS",
                "Financial Assistance for Education to the Wards Of BEEDI/CINE/IOMC/LSDM- POST MATRIC",
                "Post Matric Scheme for Award of Scholarships under Beedi Workers Welfare Fund",
                "Post Matric Scholarship for SC Students"
            ],
            portal: "NSP Portal 2.0"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const scholarshipItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <BookOpen className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Scholarships
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Detailed Information on Scholarships Students can Apply
                        </p>
                        <p className="text-lg text-blue-200 mt-4 max-w-2xl mx-auto">
                            Explore various scholarship opportunities from different sources to support your educational journey
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Introduction */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
                    >
                        <div className="flex items-center mb-6">
                            <Star className="w-8 h-8 text-yellow-500 mr-3" />
                            <h2 className="text-3xl font-bold text-gray-800">
                                Scholarship Opportunities
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            BPIT is committed to supporting students' educational aspirations through various scholarship programs. 
                            Below are the detailed scholarships available from different sources including the University, Delhi Government, 
                            and National Scholarship Portal.
                        </p>
                    </motion.div>

                    {/* Scholarship Categories */}
                    {scholarshipCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
                        >
                            <div className={`${category.color} p-6 text-white`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {category.icon}
                                        <h3 className="text-2xl font-bold ml-3">
                                            {category.title}
                                        </h3>
                                    </div>
                                    {category.portal && (
                                        <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                            {category.portal}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="grid gap-4">
                                    {category.scholarships.map((scholarship, scholarshipIndex) => (
                                        <motion.div
                                            key={scholarshipIndex}
                                            variants={scholarshipItemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: scholarshipIndex * 0.1 }}
                                            className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 leading-relaxed">
                                                    {scholarship}
                                                </h4>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Important Note */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8"
                    >
                        <div className="flex items-center mb-4">
                            <Users className="w-8 h-8 text-orange-600 mr-3" />
                            <h3 className="text-2xl font-bold text-orange-800">
                                Important Information
                            </h3>
                        </div>
                        <div className="space-y-4 text-gray-700">
                            <p className="text-lg">
                                • Students are encouraged to apply for scholarships through the respective portals mentioned above.
                            </p>
                            <p className="text-lg">
                                • Ensure all eligibility criteria are met before applying for any scholarship.
                            </p>
                            <p className="text-lg">
                                • Keep all necessary documents ready for the application process.
                            </p>
                            <p className="text-lg">
                                • Contact the admissions office for any assistance regarding scholarship applications.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center"
                    >
                        <h3 className="text-2xl font-bold mb-4">
                            Need Help with Scholarship Applications?
                        </h3>
                        <p className="text-lg mb-6">
                            Our admissions team is here to assist you with scholarship applications and queries
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="bg-white/20 px-6 py-3 rounded-lg">
                                <p className="font-medium">Admissions Office</p>
                                <p className="text-blue-100">scholarships@bpit.ac.in</p>
                            </div>
                            <div className="bg-white/20 px-6 py-3 rounded-lg">
                                <p className="font-medium">Phone</p>
                                <p className="text-blue-100">+91-11-2757-1101</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}