'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, GraduationCap, Calculator, FileText, CreditCard, Info, ChevronDown, ChevronUp, Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface FeeComponent {
    name: string;
    amount: number;
    description?: string;
}

interface YearFee {
    year: number;
    semester1: FeeComponent[];
    semester2: FeeComponent[];
    totalYearFee: number;
}

interface ProgramFee {
    id: string;
    name: string;
    duration: string;
    years: YearFee[];
    totalProgramFee: number;
    icon: React.ReactElement;
    color: string;
}

export default function FeesPage() {
    const [selectedProgram, setSelectedProgram] = useState<string>('btech');
    const [expandedYear, setExpandedYear] = useState<number | null>(null);

    const programFees: ProgramFee[] = [
        {
            id: 'btech',
            name: 'B.Tech (Engineering)',
            duration: '4 Years',
            icon: <GraduationCap className="w-6 h-6" />,
            color: 'bg-blue-500',
            years: [
                {
                    year: 1,
                    semester1: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' },
                        { name: 'Registration Fee', amount: 5000, description: 'One-time registration' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 195000
                },
                {
                    year: 2,
                    semester1: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 190000
                },
                {
                    year: 3,
                    semester1: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 190000
                },
                {
                    year: 4,
                    semester1: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 190000
                }
            ],
            totalProgramFee: 765000
        },
        {
            id: 'btech-lateral',
            name: 'B.Tech (Lateral Entry)',
            duration: '3 Years',
            icon: <GraduationCap className="w-6 h-6" />,
            color: 'bg-green-500',
            years: [
                {
                    year: 2,
                    semester1: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' },
                        { name: 'Registration Fee', amount: 5000, description: 'One-time registration' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 195000
                },
                {
                    year: 3,
                    semester1: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 190000
                },
                {
                    year: 4,
                    semester1: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 65000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 10000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Laboratory Fee', amount: 15000, description: 'Lab equipment and materials' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 190000
                }
            ],
            totalProgramFee: 575000
        },
        {
            id: 'bba',
            name: 'Bachelor of Business Administration (BBA)',
            duration: '3 Years',
            icon: <FileText className="w-6 h-6" />,
            color: 'bg-purple-500',
            years: [
                {
                    year: 1,
                    semester1: [
                        { name: 'Tuition Fee', amount: 45000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 8000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 2000, description: 'Examination and evaluation' },
                        { name: 'Registration Fee', amount: 3000, description: 'One-time registration' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 45000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 8000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 2000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 117000
                },
                {
                    year: 2,
                    semester1: [
                        { name: 'Tuition Fee', amount: 45000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 8000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 2000, description: 'Examination and evaluation' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 45000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 8000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 2000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 114000
                },
                {
                    year: 3,
                    semester1: [
                        { name: 'Tuition Fee', amount: 45000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 8000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 2000, description: 'Examination and evaluation' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 45000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 8000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 2000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 2000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 114000
                }
            ],
            totalProgramFee: 345000
        },
        {
            id: 'mba',
            name: 'Master of Business Administration (MBA)',
            duration: '2 Years',
            icon: <CreditCard className="w-6 h-6" />,
            color: 'bg-red-500',
            years: [
                {
                    year: 1,
                    semester1: [
                        { name: 'Tuition Fee', amount: 75000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 12000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 3000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' },
                        { name: 'Registration Fee', amount: 7000, description: 'One-time registration' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 75000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 12000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 3000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 193000
                },
                {
                    year: 2,
                    semester1: [
                        { name: 'Tuition Fee', amount: 75000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 12000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 3000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    semester2: [
                        { name: 'Tuition Fee', amount: 75000, description: 'Academic instruction fee' },
                        { name: 'Development Fee', amount: 12000, description: 'Infrastructure development' },
                        { name: 'Library Fee', amount: 3000, description: 'Library access and resources' },
                        { name: 'Examination Fee', amount: 3000, description: 'Examination and evaluation' }
                    ],
                    totalYearFee: 186000
                }
            ],
            totalProgramFee: 379000
        }
    ];

    const currentProgram = programFees.find(p => p.id === selectedProgram);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const toggleYearExpansion = (year: number) => {
        setExpandedYear(expandedYear === year ? null : year);
    };

    const generatePDFContent = (program: ProgramFee, year?: number) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;
        let yPosition = margin;
        
        // Header
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 10;
        
        const title = year ? `${program.name} - Year ${year} Fee Structure` : `${program.name} - Complete Fee Structure`;
        doc.setFontSize(14);
        doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 8;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Academic Year: 2025-26`, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;
        
        // Program Details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`Program: ${program.name}`, margin, yPosition);
        yPosition += 8;
        doc.text(`Duration: ${program.duration}`, margin, yPosition);
        yPosition += 8;
        doc.text(`Total Program Fee: ${formatCurrency(program.totalProgramFee)}`, margin, yPosition);
        yPosition += 15;
        
        // Add a line separator
        doc.setDrawColor(0, 0, 0);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 10;
        
        if (year) {
            const yearData = program.years.find(y => y.year === year);
            if (yearData) {
                // Single year breakdown
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(`YEAR ${year} FEE BREAKDOWN`, margin, yPosition);
                yPosition += 8;
                doc.setFontSize(12);
                doc.text(`Annual Fee: ${formatCurrency(yearData.totalYearFee)}`, margin, yPosition);
                yPosition += 15;
                
                // Semester 1
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('SEMESTER 1:', margin, yPosition);
                yPosition += 8;
                doc.setFont('helvetica', 'normal');
                
                yearData.semester1.forEach(fee => {
                    doc.text(fee.name, margin + 10, yPosition);
                    doc.text(formatCurrency(fee.amount), pageWidth - margin - 30, yPosition);
                    yPosition += 6;
                });
                
                // Semester 1 Total
                doc.line(margin + 10, yPosition, pageWidth - margin, yPosition);
                yPosition += 6;
                doc.setFont('helvetica', 'bold');
                doc.text('Semester 1 Total:', margin + 10, yPosition);
                doc.text(formatCurrency(yearData.semester1.reduce((sum, fee) => sum + fee.amount, 0)), pageWidth - margin - 30, yPosition);
                yPosition += 15;
                
                // Check if we need a new page
                if (yPosition > pageHeight - 60) {
                    doc.addPage();
                    yPosition = margin;
                }
                
                // Semester 2
                doc.setFont('helvetica', 'bold');
                doc.text('SEMESTER 2:', margin, yPosition);
                yPosition += 8;
                doc.setFont('helvetica', 'normal');
                
                yearData.semester2.forEach(fee => {
                    doc.text(fee.name, margin + 10, yPosition);
                    doc.text(formatCurrency(fee.amount), pageWidth - margin - 30, yPosition);
                    yPosition += 6;
                });
                
                // Semester 2 Total
                doc.line(margin + 10, yPosition, pageWidth - margin, yPosition);
                yPosition += 6;
                doc.setFont('helvetica', 'bold');
                doc.text('Semester 2 Total:', margin + 10, yPosition);
                doc.text(formatCurrency(yearData.semester2.reduce((sum, fee) => sum + fee.amount, 0)), pageWidth - margin - 30, yPosition);
                yPosition += 15;
                
                // Annual Total
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('ANNUAL TOTAL:', margin, yPosition);
                doc.text(formatCurrency(yearData.totalYearFee), pageWidth - margin - 30, yPosition);
                yPosition += 20;
            }
        } else {
            // Complete program breakdown
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('COMPLETE PROGRAM BREAKDOWN', margin, yPosition);
            yPosition += 15;
            
            program.years.forEach(yearData => {
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(`YEAR ${yearData.year}`, margin, yPosition);
                doc.text(formatCurrency(yearData.totalYearFee), pageWidth - margin - 30, yPosition);
                yPosition += 6;
                
                doc.setFont('helvetica', 'normal');
                doc.text(`Semester 1: ${formatCurrency(yearData.semester1.reduce((sum, fee) => sum + fee.amount, 0))}`, margin + 10, yPosition);
                doc.text(`Semester 2: ${formatCurrency(yearData.semester2.reduce((sum, fee) => sum + fee.amount, 0))}`, margin + 100, yPosition);
                yPosition += 10;
                
                // Check if we need a new page
                if (yPosition > pageHeight - 80) {
                    doc.addPage();
                    yPosition = margin;
                }
            });
        }
        
        // Check if we need a new page for important notes
        if (yPosition > pageHeight - 100) {
            doc.addPage();
            yPosition = margin;
        }
        
        // Important Notes
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('IMPORTANT NOTES:', margin, yPosition);
        yPosition += 10;
        
        doc.setFont('helvetica', 'normal');
        const notes = [
            'Fees are subject to annual revision and approval by the university',
            'Payment can be made semester-wise or annually as per student preference',
            'Late payment charges may apply for payments made after the due date',
            'Scholarships and fee waivers are available for eligible students',
            'Additional charges may apply for supplementary examinations',
            'Fee refund policy as per university guidelines'
        ];
        
        notes.forEach(note => {
            doc.text(`• ${note}`, margin, yPosition);
            yPosition += 6;
        });
        
        yPosition += 10;
        
        // Contact Information
        doc.setFont('helvetica', 'bold');
        doc.text('CONTACT INFORMATION:', margin, yPosition);
        yPosition += 8;
        
        doc.setFont('helvetica', 'normal');
        doc.text('Accounts Office: accounts@bpit.ac.in', margin, yPosition);
        yPosition += 6;
        doc.text('Phone: +91-11-2757-1101', margin, yPosition);
        yPosition += 6;
        doc.text('Address: PSP-4, Dr. K. N. Katju Marg, Sector-17 Rohini, New Delhi-110089', margin, yPosition);
        yPosition += 15;
        
        // Footer
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
        
        return doc;
    };

    const downloadFeeStructure = (program: ProgramFee, year?: number) => {
        const doc = generatePDFContent(program, year);
        const filename = year 
            ? `${program.name.replace(/[^a-zA-Z0-9]/g, '_')}_Year_${year}_Fee_Structure.pdf`
            : `${program.name.replace(/[^a-zA-Z0-9]/g, '_')}_Complete_Fee_Structure.pdf`;
        
        doc.save(filename);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <IndianRupee className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Fee Structure
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                            Complete Year-wise Fee Structure for All Programs
                        </p>
                        <p className="text-lg text-green-200 mt-4 max-w-2xl mx-auto">
                            Transparent and detailed breakdown of all fees and charges
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Program Selection */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Select Program</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programFees.map((program) => (
                            <motion.button
                                key={program.id}
                                onClick={() => {
                                    setSelectedProgram(program.id);
                                    setExpandedYear(null);
                                }}
                                className={`${program.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    selectedProgram === program.id ? 'ring-4 ring-white scale-105' : 'hover:scale-105'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    {program.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{program.name}</h3>
                                <p className="text-sm opacity-90">{program.duration}</p>
                                <p className="text-xl font-bold mt-4">{formatCurrency(program.totalProgramFee)}</p>
                                <p className="text-xs opacity-75 mb-4">Total Program Fee</p>
                                <div className="flex gap-2">
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            downloadFeeStructure(program);
                                        }}
                                        className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors duration-200 cursor-pointer"
                                    >
                                        <Download className="w-3 h-3" />
                                        Download
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Fee Structure Details */}
                {currentProgram && (
                    <motion.div
                        key={selectedProgram}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className={`${currentProgram.color} text-white p-8`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">{currentProgram.name}</h3>
                                    <p className="text-xl opacity-90">{currentProgram.duration} Program</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold">{formatCurrency(currentProgram.totalProgramFee)}</p>
                                    <p className="text-lg opacity-75">Total Program Fee</p>
                                    <button
                                        onClick={() => downloadFeeStructure(currentProgram)}
                                        className="mt-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Complete Structure
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Year-wise Breakdown */}
                        <div className="p-8">
                            <div className="space-y-6">
                                {currentProgram.years.map((yearData, index) => (
                                    <motion.div
                                        key={yearData.year}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="border border-gray-200 rounded-xl overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleYearExpansion(yearData.year)}
                                            className="w-full bg-gray-50 p-6 text-left hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-xl font-semibold text-gray-800">
                                                        Year {yearData.year}
                                                    </h4>
                                                    <p className="text-gray-600">
                                                        {yearData.semester1.length + yearData.semester2.length} fee components
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold text-gray-800">
                                                            {formatCurrency(yearData.totalYearFee)}
                                                        </p>
                                                        <p className="text-sm text-gray-600">Annual Fee</p>
                                                    </div>
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            downloadFeeStructure(currentProgram, yearData.year);
                                                        }}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Download
                                                    </div>
                                                    {expandedYear === yearData.year ? (
                                                        <ChevronUp className="w-6 h-6 text-gray-500" />
                                                    ) : (
                                                        <ChevronDown className="w-6 h-6 text-gray-500" />
                                                    )}
                                                </div>
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {expandedYear === yearData.year && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="bg-white"
                                                >
                                                    <div className="p-6 border-t border-gray-200">
                                                        <div className="grid md:grid-cols-2 gap-8">
                                                            {/* Semester 1 */}
                                                            <div>
                                                                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                                                    <Calculator className="w-5 h-5 mr-2" />
                                                                    Semester 1
                                                                </h5>
                                                                <div className="space-y-3">
                                                                    {yearData.semester1.map((fee, feeIndex) => (
                                                                        <div key={feeIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                                            <div>
                                                                                <p className="font-medium text-gray-800">{fee.name}</p>
                                                                                {fee.description && (
                                                                                    <p className="text-sm text-gray-600">{fee.description}</p>
                                                                                )}
                                                                            </div>
                                                                            <p className="font-semibold text-gray-800">{formatCurrency(fee.amount)}</p>
                                                                        </div>
                                                                    ))}
                                                                    <div className="pt-3 border-t border-gray-300">
                                                                        <div className="flex justify-between items-center font-semibold text-lg">
                                                                            <span>Semester 1 Total</span>
                                                                            <span className="text-green-600">
                                                                                {formatCurrency(yearData.semester1.reduce((sum, fee) => sum + fee.amount, 0))}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Semester 2 */}
                                                            <div>
                                                                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                                                    <Calculator className="w-5 h-5 mr-2" />
                                                                    Semester 2
                                                                </h5>
                                                                <div className="space-y-3">
                                                                    {yearData.semester2.map((fee, feeIndex) => (
                                                                        <div key={feeIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                                            <div>
                                                                                <p className="font-medium text-gray-800">{fee.name}</p>
                                                                                {fee.description && (
                                                                                    <p className="text-sm text-gray-600">{fee.description}</p>
                                                                                )}
                                                                            </div>
                                                                            <p className="font-semibold text-gray-800">{formatCurrency(fee.amount)}</p>
                                                                        </div>
                                                                    ))}
                                                                    <div className="pt-3 border-t border-gray-300">
                                                                        <div className="flex justify-between items-center font-semibold text-lg">
                                                                            <span>Semester 2 Total</span>
                                                                            <span className="text-green-600">
                                                                                {formatCurrency(yearData.semester2.reduce((sum, fee) => sum + fee.amount, 0))}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Important Notes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8"
                >
                    <div className="flex items-center mb-6">
                        <Info className="w-8 h-8 text-orange-600 mr-3" />
                        <h3 className="text-2xl font-bold text-orange-800">Important Information</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                        <div className="space-y-3">
                            <p className="flex items-start">
                                <span className="text-orange-600 mr-2">•</span>
                                Fees are subject to annual revision and approval by the university.
                            </p>
                            <p className="flex items-start">
                                <span className="text-orange-600 mr-2">•</span>
                                Payment can be made semester-wise or annually as per student preference.
                            </p>
                            <p className="flex items-start">
                                <span className="text-orange-600 mr-2">•</span>
                                Late payment charges may apply for payments made after the due date.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <p className="flex items-start">
                                <span className="text-orange-600 mr-2">•</span>
                                Scholarships and fee waivers are available for eligible students.
                            </p>
                            <p className="flex items-start">
                                <span className="text-orange-600 mr-2">•</span>
                                Additional charges may apply for supplementary examinations.
                            </p>
                            <p className="flex items-start">
                                <span className="text-orange-600 mr-2">•</span>
                                Fee refund policy as per university guidelines.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Contact for Fee Queries */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center"
                >
                    <h3 className="text-2xl font-bold mb-4">Fee Related Queries?</h3>
                    <p className="text-lg mb-6">Contact our accounts office for any fee-related assistance</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="bg-white/20 px-6 py-3 rounded-lg">
                            <p className="font-medium">Accounts Office</p>
                            <p className="text-blue-100">accounts@bpit.ac.in</p>
                        </div>
                        <div className="bg-white/20 px-6 py-3 rounded-lg">
                            <p className="font-medium">Phone</p>
                            <p className="text-blue-100">+91-11-2757-1101</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}