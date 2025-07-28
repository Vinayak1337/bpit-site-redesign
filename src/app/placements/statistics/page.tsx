'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Award,
  Building2,
  Calendar,
  Target,
  Star,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  ChevronDown,
  ChevronRight,
  Briefcase,
  GraduationCap,
  ChevronLeft,
  Search,
  Sliders,
  Trophy,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const StatisticsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [animatedStats, setAnimatedStats] = useState(false);
  
  // New state for student filters
  const [studentFilters, setStudentFilters] = useState({
    year: '2024',
    department: 'All',
    company: 'All',
    minSalary: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const years = ['2024', '2023', '2022', '2021', '2020'];
  const departments = ['All', 'CSE', 'IT', 'ECE', 'EEE', 'MBA'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const overallStats = {
    '2024': {
      placementRate: 87,
      totalStudents: 650,
      studentsPlaced: 565,
      companiesVisited: 95,
      highestPackage: 15.5,
      averagePackage: 6.8,
      medianPackage: 6.2
    },
    '2023': {
      placementRate: 85,
      totalStudents: 620,
      studentsPlaced: 527,
      companiesVisited: 88,
      highestPackage: 14.2,
      averagePackage: 6.5,
      medianPackage: 6.0
    },
    '2022': {
      placementRate: 82,
      totalStudents: 580,
      studentsPlaced: 476,
      companiesVisited: 82,
      highestPackage: 13.8,
      averagePackage: 6.2,
      medianPackage: 5.8
    }
  };

  const departmentStats = {
    '2024': {
      'CSE': { placed: 145, total: 160, avgPackage: 7.5, highest: 15.5, companies: 45 },
      'IT': { placed: 138, total: 150, avgPackage: 7.2, highest: 14.8, companies: 42 },
      'ECE': { placed: 125, total: 155, avgPackage: 6.5, highest: 12.5, companies: 38 },
      'EEE': { placed: 118, total: 140, avgPackage: 6.2, highest: 11.8, companies: 35 },
      'MBA': { placed: 39, total: 45, avgPackage: 8.2, highest: 15.0, companies: 25 }
    }
  };

  const sectorWiseData = [
    { sector: 'IT Services', percentage: 45, companies: ['TCS', 'Infosys', 'Wipro', 'Cognizant'], color: 'from-blue-500 to-cyan-600' },
    { sector: 'Product Companies', percentage: 25, companies: ['Microsoft', 'Amazon', 'Google', 'IBM'], color: 'from-purple-500 to-violet-600' },
    { sector: 'Consulting', percentage: 15, companies: ['Accenture', 'Deloitte', 'PwC', 'EY'], color: 'from-green-500 to-emerald-600' },
    { sector: 'Core Engineering', percentage: 10, companies: ['Samsung', 'Siemens', 'ABB', 'GE'], color: 'from-orange-500 to-red-600' },
    { sector: 'Banking & Finance', percentage: 5, companies: ['HDFC', 'ICICI', 'SBI', 'Axis'], color: 'from-pink-500 to-rose-600' }
  ];

  const packageDistribution = [
    { range: '₹15+ LPA', count: 25, percentage: 4.4 },
    { range: '₹10-15 LPA', count: 85, percentage: 15.0 },
    { range: '₹7-10 LPA', count: 165, percentage: 29.2 },
    { range: '₹5-7 LPA', count: 190, percentage: 33.6 },
    { range: '₹3-5 LPA', count: 100, percentage: 17.7 }
  ];

  const yearlyTrends = [
    { year: '2020', rate: 78, avg: 5.8, companies: 65 },
    { year: '2021', rate: 80, avg: 6.0, companies: 72 },
    { year: '2022', rate: 82, avg: 6.2, companies: 82 },
    { year: '2023', rate: 85, avg: 6.5, companies: 88 },
    { year: '2024', rate: 87, avg: 6.8, companies: 95 }
  ];

  // Enhanced student placement data
  const allStudentPlacements = [
    // 2024 Batch - Top Tier
    { name: 'Arjun Sharma', department: 'CSE', company: 'Microsoft', package: 15.5, batch: '2024', role: 'Software Engineer' },
    { name: 'Priya Gupta', department: 'IT', company: 'Amazon', package: 14.8, batch: '2024', role: 'SDE-1' },
    { name: 'Rohit Kumar', department: 'CSE', company: 'Google', package: 14.5, batch: '2024', role: 'Software Developer' },
    { name: 'Vikash Singh', department: 'MBA', company: 'McKinsey', package: 15.0, batch: '2024', role: 'Business Analyst' },
    { name: 'Sneha Agarwal', department: 'ECE', company: 'Samsung', package: 12.5, batch: '2024', role: 'R&D Engineer' },
    { name: 'Ankit Verma', department: 'CSE', company: 'Adobe', package: 13.8, batch: '2024', role: 'Software Engineer' },
    { name: 'Riya Sharma', department: 'IT', company: 'Salesforce', package: 13.5, batch: '2024', role: 'Developer' },
    { name: 'Karthik Reddy', department: 'CSE', company: 'Oracle', package: 12.8, batch: '2024', role: 'Software Developer' },
    { name: 'Meera Jain', department: 'ECE', company: 'Qualcomm', package: 12.2, batch: '2024', role: 'Hardware Engineer' },
    { name: 'Samarth Gupta', department: 'IT', company: 'Zomato', package: 11.5, batch: '2024', role: 'Full Stack Developer' },
    
    // 2024 Batch - Mid Tier
    { name: 'Aarti Singh', department: 'CSE', company: 'TCS', package: 9.2, batch: '2024', role: 'Software Engineer' },
    { name: 'Deepak Kumar', department: 'IT', company: 'Infosys', package: 8.8, batch: '2024', role: 'Systems Engineer' },
    { name: 'Neha Agrawal', department: 'ECE', company: 'Wipro', package: 8.5, batch: '2024', role: 'Project Engineer' },
    { name: 'Rahul Mishra', department: 'EEE', company: 'L&T', package: 8.2, batch: '2024', role: 'Graduate Trainee' },
    { name: 'Pooja Yadav', department: 'MBA', company: 'HDFC Bank', package: 9.5, batch: '2024', role: 'Management Trainee' },
    { name: 'Amit Patel', department: 'CSE', company: 'Cognizant', package: 7.8, batch: '2024', role: 'Programmer Analyst' },
    { name: 'Shruti Joshi', department: 'IT', company: 'HCL', package: 7.5, batch: '2024', role: 'Software Engineer' },
    { name: 'Varun Thakur', department: 'ECE', company: 'Tech Mahindra', package: 7.2, batch: '2024', role: 'Associate Engineer' },
    { name: 'Kavya Reddy', department: 'EEE', company: 'ABB', package: 6.8, batch: '2024', role: 'Graduate Engineer' },
    { name: 'Harsh Agarwal', department: 'MBA', company: 'ICICI Bank', package: 8.8, batch: '2024', role: 'Officer' },
    
    // 2024 Batch - Entry Level
    { name: 'Nisha Kumari', department: 'CSE', company: 'Accenture', package: 6.5, batch: '2024', role: 'Associate' },
    { name: 'Rajesh Sharma', department: 'IT', company: 'Capgemini', package: 6.2, batch: '2024', role: 'Analyst' },
    { name: 'Manisha Singh', department: 'ECE', company: 'Deloitte', package: 6.8, batch: '2024', role: 'Consultant' },
    { name: 'Akash Gupta', department: 'EEE', company: 'Siemens', package: 6.5, batch: '2024', role: 'Trainee Engineer' },
    { name: 'Priyanka Jain', department: 'MBA', company: 'Axis Bank', package: 7.2, batch: '2024', role: 'Executive' },
    
    // 2023 Batch
    { name: 'Abhishek Tiwari', department: 'CSE', company: 'Microsoft', package: 14.2, batch: '2023', role: 'Software Engineer' },
    { name: 'Shreya Kapoor', department: 'IT', company: 'Amazon', package: 13.8, batch: '2023', role: 'SDE-1' },
    { name: 'Vishal Kumar', department: 'CSE', company: 'Google', package: 13.5, batch: '2023', role: 'Software Developer' },
    { name: 'Anjali Sharma', department: 'ECE', company: 'Intel', package: 11.8, batch: '2023', role: 'Design Engineer' },
    { name: 'Nikhil Agarwal', department: 'MBA', company: 'Bain & Company', package: 14.5, batch: '2023', role: 'Associate Consultant' },
    
    // 2022 Batch
    { name: 'Siddharth Rao', department: 'CSE', company: 'Apple', package: 13.8, batch: '2022', role: 'Software Engineer' },
    { name: 'Divya Gupta', department: 'IT', company: 'Netflix', package: 13.2, batch: '2022', role: 'Software Developer' },
    { name: 'Mohit Singh', department: 'ECE', company: 'NVIDIA', package: 12.5, batch: '2022', role: 'Hardware Engineer' },
    { name: 'Ritu Sharma', department: 'MBA', company: 'BCG', package: 14.8, batch: '2022', role: 'Business Analyst' },
    { name: 'Gaurav Kumar', department: 'EEE', company: 'GE', package: 10.5, batch: '2022', role: 'Graduate Engineer' }
  ];

  // Get unique companies for filter
  const allCompanies = ['All', ...Array.from(new Set(allStudentPlacements.map(s => s.company))).sort()];

  // Filter students based on criteria
  const filteredStudents = allStudentPlacements.filter(student => {
    const matchesYear = studentFilters.year === 'All' || student.batch === studentFilters.year;
    const matchesDept = studentFilters.department === 'All' || student.department === studentFilters.department;
    const matchesCompany = studentFilters.company === 'All' || student.company === studentFilters.company;
    const matchesSalary = student.package >= studentFilters.minSalary;
    
    return matchesYear && matchesDept && matchesCompany && matchesSalary;
  }).sort((a, b) => b.package - a.package); // Sort by package descending

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  const currentStats = overallStats[selectedYear as keyof typeof overallStats];

  const AnimatedNumber = ({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!animatedStats) return;
      
      let start = 0;
      const end = value;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value, duration, animatedStats]); // eslint-disable-line react-hooks/exhaustive-deps

    return <span>{displayValue}{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        {/* Background Animation */}
        <div className="absolute inset-0">
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <BarChart3 className="w-12 h-12" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Placement Statistics
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
              Data-driven insights into our placement success and student achievements
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Top Placed Students Section - Moved to Top */}
      <section className="py-16 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top Placed Students
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our students&apos; exceptional placement achievements with advanced filtering
            </p>
          </motion.div>

          {/* Enhanced Filter Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto mb-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sliders className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Filter Students</h3>
                    <p className="text-gray-600 text-sm">Refine your search</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="text-lg font-bold text-blue-700">{filteredStudents.length}</span>
                  <span className="text-sm text-blue-600">results</span>
                </div>
              </div>
              
              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Batch Year
                  </label>
                  <Select value={studentFilters.year} onValueChange={(value) => {
                    setStudentFilters({...studentFilters, year: value});
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-full h-12 border border-gray-300 hover:border-blue-400 focus:border-blue-500 rounded-lg bg-white transition-colors">
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Years</SelectItem>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-green-600" />
                    Department
                  </label>
                  <Select value={studentFilters.department} onValueChange={(value) => {
                    setStudentFilters({...studentFilters, department: value});
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-full h-12 border border-gray-300 hover:border-green-400 focus:border-green-500 rounded-lg bg-white transition-colors">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    Company
                  </label>
                  <Select value={studentFilters.company} onValueChange={(value) => {
                    setStudentFilters({...studentFilters, company: value});
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-full h-12 border border-gray-300 hover:border-purple-400 focus:border-purple-500 rounded-lg bg-white transition-colors">
                      <SelectValue placeholder="All Companies" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCompanies.map(company => (
                        <SelectItem key={company} value={company}>{company}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-orange-600" />
                    Min Package (LPA)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={studentFilters.minSalary}
                    onChange={(e) => {
                      setStudentFilters({...studentFilters, minSalary: parseFloat(e.target.value) || 0});
                      setCurrentPage(1);
                    }}
                    className="h-12 border border-gray-300 hover:border-orange-400 focus:border-orange-500 rounded-lg bg-white transition-colors"
                    placeholder="0.0"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => {
                    setStudentFilters({ year: 'All', department: 'All', company: 'All', minSalary: 0 });
                    setCurrentPage(1);
                  }}
                  variant="outline"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
                <Button
                  onClick={() => {
                    setStudentFilters({ ...studentFilters, year: '2024', minSalary: 10 });
                    setCurrentPage(1);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Top Packages 2024
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Student Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Student Placements
                </h3>
                <p className="text-gray-600">
                  {currentPage === 1 ? 'Showing top results' : `Page ${currentPage} of ${totalPages}`} • Sorted by package (highest first)
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-3 rounded-2xl border">
                  <div className="font-semibold text-gray-800">
                    {startIndex + 1}-{Math.min(startIndex + studentsPerPage, filteredStudents.length)} of {filteredStudents.length}
                  </div>
                  <div className="text-xs text-gray-500">students</div>
                </div>
              </div>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="w-14 h-14 text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No students found</h3>
                <p className="text-gray-600 text-lg">Try adjusting your filter criteria to see more results</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 mb-16">
                  <AnimatePresence>
                    {currentStudents.map((student, index) => {
                      const globalIndex = startIndex + index;
                      const isTopThree = globalIndex < 3;
                      
                      return (
                        <motion.div
                          key={`${student.name}-${student.company}-page-${currentPage}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className={`relative bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 ${
                            isTopThree && currentPage === 1 
                              ? globalIndex === 0 
                                ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100' 
                                : globalIndex === 1 
                                ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100'
                                : 'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100'
                              : 'border-blue-200 hover:border-blue-300'
                          }`}
                        >
                          {/* Ranking badge for top 3 on first page */}
                          {isTopThree && currentPage === 1 && (
                            <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                              {globalIndex + 1}
                            </div>
                          )}
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4 flex-1">
                              <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${
                                isTopThree && currentPage === 1
                                  ? globalIndex === 0 
                                    ? 'from-yellow-500 to-yellow-600' 
                                    : globalIndex === 1 
                                    ? 'from-gray-500 to-gray-600'
                                    : 'from-orange-500 to-orange-600'
                                  : 'from-blue-500 to-blue-700'
                              } rounded-2xl flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-lg flex-shrink-0`}>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 truncate">{student.name}</h4>
                                <div className="space-y-1 sm:space-y-2">
                                  <div className="flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
                                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                    <span className="font-semibold truncate">{student.department}</span>
                                    <span className="text-gray-400 hidden sm:inline">•</span>
                                    <span className="truncate hidden sm:inline">Batch {student.batch}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
                                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                    <span className="font-semibold truncate">{student.company}</span>
                                    <span className="text-gray-400 hidden sm:inline">•</span>
                                    <span className="truncate hidden sm:inline">{student.role}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-gray-600 text-sm sm:hidden">
                                    <span>Batch {student.batch}</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="truncate">{student.role}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">₹{student.package}</div>
                              <div className="text-sm text-gray-500 font-semibold">LPA</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      variant="outline"
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-2xl border-2 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Previous
                    </Button>
                    
                    <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 sm:pb-0">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            className={`w-10 h-10 sm:w-14 sm:h-14 p-0 font-bold text-sm sm:text-lg rounded-xl sm:rounded-2xl border-2 transition-all duration-200 flex-shrink-0 ${
                              currentPage === pageNum 
                                ? 'bg-blue-600 text-white shadow-lg scale-105 sm:scale-110' 
                                : 'text-gray-600 hover:bg-blue-50 hover:border-blue-300'
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-2xl border-2 disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters for Statistics */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Academic Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Department</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Key Metrics for {selectedYear}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive overview of our placement performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Target, label: 'Placement Rate', value: currentStats.placementRate, suffix: '%', color: 'from-green-500 to-emerald-600', trend: 'up' },
              { icon: Users, label: 'Students Placed', value: currentStats.studentsPlaced, suffix: '', color: 'from-blue-500 to-cyan-600', trend: 'up' },
              { icon: Building2, label: 'Companies Visited', value: currentStats.companiesVisited, suffix: '', color: 'from-purple-500 to-violet-600', trend: 'up' },
              { icon: DollarSign, label: 'Highest Package', value: currentStats.highestPackage, suffix: ' LPA', color: 'from-orange-500 to-red-600', trend: 'up' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center text-white`}>
                    <metric.icon className="w-8 h-8" />
                  </div>
                  <div className={`flex items-center space-x-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">+5.2%</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                </h3>
                <p className="text-gray-600 font-medium">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Package Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Package Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Package</span>
                  <span className="text-2xl font-bold text-blue-600">₹{currentStats.averagePackage} LPA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Median Package</span>
                  <span className="text-xl font-semibold text-green-600">₹{currentStats.medianPackage} LPA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Students</span>
                  <span className="text-xl font-semibold text-gray-900">{currentStats.totalStudents}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Package Distribution</h3>
              <div className="space-y-4">
                {packageDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium text-gray-700">{item.range}</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full"
                        />
                      </div>
                    </div>
                    <div className="w-16 text-sm font-semibold text-gray-900 text-right">{item.count}</div>
                    <div className="w-12 text-sm text-gray-600 text-right">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department-wise Statistics */}
      {selectedDepartment === 'All' && departmentStats[selectedYear as keyof typeof departmentStats] && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Department-wise Performance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Detailed breakdown of placement statistics by department
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(departmentStats[selectedYear as keyof typeof departmentStats] || {}).map(([dept, stats], index) => (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                      dept === 'CSE' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                      dept === 'IT' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                      dept === 'ECE' ? 'bg-gradient-to-r from-purple-500 to-violet-600' :
                      dept === 'EEE' ? 'bg-gradient-to-r from-orange-500 to-red-600' :
                      'bg-gradient-to-r from-pink-500 to-rose-600'
                    }`}>
                      {dept}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{Math.round((stats.placed / stats.total) * 100)}%</p>
                      <p className="text-sm text-gray-600">Placement Rate</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students Placed</span>
                      <span className="font-semibold">{stats.placed}/{stats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Package</span>
                      <span className="font-semibold text-green-600">₹{stats.avgPackage} LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highest Package</span>
                      <span className="font-semibold text-blue-600">₹{stats.highest} LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Companies</span>
                      <span className="font-semibold">{stats.companies}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sector-wise Distribution */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sector-wise Distribution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry sectors where our students are making their mark
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {sectorWiseData.map((sector, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{sector.sector}</h3>
                    <span className="text-2xl font-bold text-gray-900">{sector.percentage}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 mb-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sector.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`bg-gradient-to-r ${sector.color} h-full rounded-full`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sector.companies.map((company, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Yearly Trends</h3>
              <div className="space-y-6">
                {yearlyTrends.map((trend, index) => (
                  <div key={index} className="flex items-center space-x-6">
                    <div className="w-16 text-lg font-bold text-gray-900">{trend.year}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Placement Rate</span>
                        <span className="font-semibold">{trend.rate}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${trend.rate}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Avg: ₹{trend.avg} LPA</span>
                        <span>{trend.companies} companies</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default StatisticsPage;