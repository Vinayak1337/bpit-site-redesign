'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Phone, Mail, MapPin, Users, Award, GraduationCap } from 'lucide-react';

interface FAQ {
    id: number;
    question: string;
    answer: string;
    category?: string;
}

export default function FAQPage() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const faqs: FAQ[] = [
        {
            id: 1,
            question: "What is the medium of communication in class in BPIT?",
            answer: "Medium of instruction is English. Students are encouraged to communicate in English within the campus.",
            category: "General"
        },
        {
            id: 2,
            question: "Is BPIT an autonomous institute?",
            answer: "Please contact the admissions office for detailed information about the institutional status.",
            category: "General"
        },
        {
            id: 3,
            question: "What is the eligibility criteria for admission in engineering programmes in BPIT?",
            answer: "Please refer to our admissions process page for detailed eligibility criteria for all engineering programs.",
            category: "Admissions"
        },
        {
            id: 4,
            question: "What is the process to apply in BPIT?",
            answer: "Please visit our admissions process page for step-by-step application procedures for all programs.",
            category: "Admissions"
        },
        {
            id: 5,
            question: "What are the required documents for B.Tech/BBA/MBA admission in BPIT?",
            answer: "Please check our admissions process page for the complete list of required documents for each program.",
            category: "Admissions"
        },
        {
            id: 6,
            question: "What is the process to apply for B.Tech./BBA/MBA Program in BPIT?",
            answer: "Detailed application procedures for all programs are available on our admissions process page.",
            category: "Admissions"
        },
        {
            id: 7,
            question: "How can we reach BPIT?",
            answer: "We can be reached at: PSP-4, Dr. K. N. Katju Marg, Sector-17 Rohini, New Delhi-110089. Telephone: +91 – 11 – 27574635/27571080/27572227, E-Mail: chairman@bpitindia.com.",
            category: "Contact"
        },
        {
            id: 8,
            question: "Does BPIT provide hostel accommodation to students?",
            answer: "Please contact the admissions office for information about hostel facilities and accommodation options.",
            category: "Facilities"
        },
        {
            id: 9,
            question: "Is there an internet facility at BPIT?",
            answer: "Please contact the admissions office for details about internet and IT facilities available on campus.",
            category: "Facilities"
        },
        {
            id: 10,
            question: "What are the placement opportunities provided to the student of BPIT?",
            answer: "BPIT has a dedicated placement cell that works with leading companies to provide excellent career opportunities. Please visit our placement section for more details.",
            category: "Placements"
        },
        {
            id: 11,
            question: "What is the average package offered by companies to the students of BPIT in previous year?",
            answer: "Please contact the placement cell or check our placement statistics for the most recent package information.",
            category: "Placements"
        },
        {
            id: 12,
            question: "What are the Research & Development facilities provided by the BPIT college?",
            answer: "BPIT provides state-of-the-art R&D facilities across various departments. Please contact the respective departments for specific research opportunities.",
            category: "Academic"
        },
        {
            id: 13,
            question: "What are the scholarship schemes available in BPIT?",
            answer: "BPIT supports all government scholarships. It offers scholarships to meritorious students in the form of fee waivers or assistantships on the basis of economic status of the student and also aids the single parent students.",
            category: "Scholarships"
        },
        {
            id: 14,
            question: "What is the procedure to get the documents required for Bank Loans?",
            answer: "Please contact the admissions office for assistance with documentation required for educational loans.",
            category: "Financial"
        },
        {
            id: 15,
            question: "Does BPIT have clubs and societies?",
            answer: "Yes, BPIT has various clubs and societies for student engagement. Please contact the student affairs office for more information.",
            category: "Student Life"
        },
        {
            id: 16,
            question: "Are the faculty of BPIT well qualified and experienced?",
            answer: "BPIT has highly qualified and experienced faculty members across all departments. Please visit our faculty sections for detailed profiles.",
            category: "Academic"
        },
        {
            id: 17,
            question: "Who are the top recruiters of B.Tech in BPIT?",
            answer: "BPIT has partnerships with leading companies across various industries. Please visit our placement section for the complete list of recruiters.",
            category: "Placements"
        }
    ];

    const categories = Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)));

    const filteredFaqs = selectedCategory 
        ? faqs.filter(faq => faq.category === selectedCategory)
        : faqs;

    const toggleFAQ = (id: number) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(selectedCategory === category ? null : category);
        setOpenFAQ(null); // Close any open FAQ when switching categories
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'General': return <HelpCircle className="w-5 h-5" />;
            case 'Admissions': return <GraduationCap className="w-5 h-5" />;
            case 'Contact': return <Phone className="w-5 h-5" />;
            case 'Facilities': return <MapPin className="w-5 h-5" />;
            case 'Placements': return <Award className="w-5 h-5" />;
            case 'Academic': return <Users className="w-5 h-5" />;
            case 'Scholarships': return <Award className="w-5 h-5" />;
            case 'Financial': return <Award className="w-5 h-5" />;
            case 'Student Life': return <Users className="w-5 h-5" />;
            default: return <HelpCircle className="w-5 h-5" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'General': return 'bg-blue-500';
            case 'Admissions': return 'bg-green-500';
            case 'Contact': return 'bg-purple-500';
            case 'Facilities': return 'bg-orange-500';
            case 'Placements': return 'bg-red-500';
            case 'Academic': return 'bg-indigo-500';
            case 'Scholarships': return 'bg-yellow-500';
            case 'Financial': return 'bg-pink-500';
            case 'Student Life': return 'bg-teal-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <HelpCircle className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Frequently Asked Questions
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Find answers to common questions about BPIT admissions, programs, and campus life
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Browse by Category</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`${selectedCategory === null ? 'bg-gray-800 ring-2 ring-white shadow-lg scale-105' : 'bg-gray-600'} text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200`}
                        >
                            <HelpCircle className="w-5 h-5" />
                            All Questions
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category || 'General')}
                                className={`${getCategoryColor(category || 'General')} text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-all duration-200 ${selectedCategory === category ? 'ring-2 ring-white shadow-lg scale-105' : 'hover:scale-105'}`}
                            >
                                {getCategoryIcon(category || 'General')}
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    {selectedCategory && (
                        <div className="mb-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Showing questions for: <span className="text-blue-600">{selectedCategory}</span>
                            </h3>
                            <p className="text-gray-500 mt-2">
                                {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} found
                            </p>
                        </div>
                    )}
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory || 'all'}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >                            {filteredFaqs.map((faq, index) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`${getCategoryColor(faq.category || 'General')} w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                                                Q{faq.id}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800 pr-4">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {faq.category && !selectedCategory && (
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                                    {faq.category}
                                                </span>
                                            )}
                                            {openFAQ === faq.id ? (
                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            )}
                                        </div>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {openFAQ === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-t border-gray-200"
                                            >
                                                <div className="px-6 py-4">
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8"
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">
                            Still Have Questions?
                        </h3>
                        <p className="text-lg mb-6 text-blue-100">
                            Can&apos;t find what you&apos;re looking for? Get in touch with our admissions team
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/20 rounded-lg p-4">
                                <Phone className="w-6 h-6 mx-auto mb-2" />
                                <p className="font-medium">Phone</p>
                                <p className="text-sm text-blue-100">+91-11-27574635</p>
                            </div>
                            <div className="bg-white/20 rounded-lg p-4">
                                <Mail className="w-6 h-6 mx-auto mb-2" />
                                <p className="font-medium">Email</p>
                                <p className="text-sm text-blue-100">chairman@bpitindia.com</p>
                            </div>
                            <div className="bg-white/20 rounded-lg p-4">
                                <MapPin className="w-6 h-6 mx-auto mb-2" />
                                <p className="font-medium">Visit Us</p>
                                <p className="text-sm text-blue-100">Sector-17, Rohini, Delhi</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Admission Enquiry Call-to-Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-8 text-center"
                >
                    <h3 className="text-2xl font-bold mb-4">
                        Ready to Apply?
                    </h3>
                    <p className="text-lg mb-6">
                        Start your admission enquiry process today
                    </p>
                    <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
                        Admission Enquiry Here
                    </button>
                </motion.div>
            </div>
        </div>
    );
}