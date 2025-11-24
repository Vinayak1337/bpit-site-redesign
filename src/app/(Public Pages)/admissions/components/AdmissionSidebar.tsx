'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    BookOpen,
    GraduationCap,
    UserPlus,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdmissionsSidebarProps {
    activeSubsection: string;
    expandedSections: string[];
    onToggleSection: (section: string) => void;
    onSubsectionClick: (subsection: string) => void;
    onApplyNow: () => void;
    onDownloadBrochure: () => void;
    showAdditionalInfo?: boolean;
}

const AdmissionsSidebar: React.FC<AdmissionsSidebarProps> = ({
    activeSubsection,
    expandedSections,
    onToggleSection,
    onSubsectionClick,
    onApplyNow,
    onDownloadBrochure,
    showAdditionalInfo = true
}) => {
    return (
        <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden lg:sticky lg:top-4">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        Program Categories
                    </h2>
                </div>

                <div className="p-4">
                    {/* Undergraduate Section */}
                    <div className="mb-4">
                        <Button
                            variant="ghost"
                            onClick={() => onToggleSection('undergraduate')}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 h-auto"
                            trackingEvent="admissions_toggle_undergraduate"
                        >
                            <span className="font-semibold text-gray-900">Undergraduate</span>
                            <motion.div
                                animate={{ rotate: expandedSections.includes('undergraduate') ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                            </motion.div>
                        </Button>

                        <AnimatePresence>
                            {expandedSections.includes('undergraduate') && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden ml-4 mt-2"
                                >
                                    <Button
                                        variant="ghost"
                                        onClick={() => onSubsectionClick('engineering')}
                                        className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 h-auto justify-start ${
                                            activeSubsection === 'engineering'
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                        trackingEvent="admissions_select_engineering"
                                    >
                                        Engineering and Technology
                                    </Button>
                                    
                                    <Button
                                        variant="ghost"
                                        onClick={() => onSubsectionClick('ugManagement')}
                                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 h-auto justify-start ${
                                            activeSubsection === 'ugManagement'
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                        trackingEvent="admissions_select_ug_management"
                                    >
                                        Management
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Postgraduate Section */}
                    <div>
                        <Button
                            variant="ghost"
                            onClick={() => onToggleSection('postgraduate')}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 h-auto"
                            trackingEvent="admissions_toggle_postgraduate"
                        >
                            <span className="font-semibold text-gray-900">Postgraduate</span>
                            <motion.div
                                animate={{ rotate: expandedSections.includes('postgraduate') ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                            </motion.div>
                        </Button>

                        <AnimatePresence>
                            {expandedSections.includes('postgraduate') && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden ml-4 mt-2"
                                >
                                    <Button
                                        variant="ghost"
                                        onClick={() => onSubsectionClick('pgManagement')}
                                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 h-auto justify-start ${
                                            activeSubsection === 'pgManagement'
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                        trackingEvent="admissions_select_pg_management"
                                    >
                                        Management
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Additional Info Card */}
            {showAdditionalInfo && (
                <div className={`mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 ${
                    activeSubsection ? 'hidden lg:block' : 'block'
                }`}>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        Admission Support
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Need help with the admission process? Our counselors are here to guide you.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button 
                            onClick={onApplyNow}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                            trackingEvent="admissions_apply_now_sidebar"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Apply Now
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={onDownloadBrochure}
                            className="w-full bg-white border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors duration-200"
                            trackingEvent="admissions_download_brochure_sidebar"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Download Brochure
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdmissionsSidebar;
