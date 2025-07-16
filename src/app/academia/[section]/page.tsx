"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  BookOpen,
  DollarSign,
  GraduationCap,
  Users,
  Search,
  Download,
  Eye,
  FileText,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const academicSections = [
  {
    id: "calendar",
    title: "Academic Calendar",
    icon: Calendar,
    description: "Important academic dates and semester schedules",
  },
  {
    id: "syllabus",
    title: "Scheme & Syllabus",
    icon: BookOpen,
    description: "Course curriculum and subject details",
  },
  {
    id: "fee-structure",
    title: "Fee Structure",
    icon: DollarSign,
    description: "Program fees and payment information",
  },
  {
    id: "scholarships",
    title: "Scholarships",
    icon: GraduationCap,
    description: "Financial assistance and merit scholarships",
  },
  {
    id: "students",
    title: "List of Students",
    icon: Users,
    description: "List of students in the current batch",
  },
]

const branches = [
  { code: "CSE", name: "Computer Science Engineering", program: "BTech" },
  { code: "IT", name: "Information Technology", program: "BTech" },
  { code: "ECE", name: "Electronics & Communication Engineering", program: "BTech" },
  { code: "CSE-DS", name: "CSE - Data Science", program: "BTech" },
  { code: "AI-ML", name: "Artificial Intelligence & Machine Learning", program: "BTech" },
  { code: "BBA", name: "Bachelor of Business Administration", program: "BBA" },
  { code: "MBA", name: "Master of Business Administration", program: "MBA" },
]

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]

const syllabusData = [
  { branch: "CSE", year: "1st Year", releaseDate: "2024-07-15" },
  { branch: "CSE", year: "2nd Year", releaseDate: "2024-07-10" },
  { branch: "CSE", year: "3rd Year", releaseDate: "2024-07-05" },
  { branch: "CSE", year: "4th Year", releaseDate: "2024-07-01" },
  { branch: "IT", year: "1st Year", releaseDate: "2024-07-15" },
  { branch: "IT", year: "2nd Year", releaseDate: "2024-07-10" },
  { branch: "IT", year: "3rd Year", releaseDate: "2024-07-05" },
  { branch: "IT", year: "4th Year", releaseDate: "2024-07-01" },
  { branch: "ECE", year: "1st Year", releaseDate: "2024-07-14" },
  { branch: "ECE", year: "2nd Year", releaseDate: "2024-07-09" },
  { branch: "ECE", year: "3rd Year", releaseDate: "2024-07-04" },
  { branch: "ECE", year: "4th Year", releaseDate: "2024-06-30" },
  { branch: "CSE-DS", year: "1st Year", releaseDate: "2024-07-15" },
  { branch: "CSE-DS", year: "2nd Year", releaseDate: "2024-07-10" },
  { branch: "CSE-DS", year: "3rd Year", releaseDate: "2024-07-05" },
  { branch: "CSE-DS", year: "4th Year", releaseDate: "2024-07-01" },
  { branch: "AI-ML", year: "1st Year", releaseDate: "2024-07-15" },
  { branch: "AI-ML", year: "2nd Year", releaseDate: "2024-07-10" },
  { branch: "AI-ML", year: "3rd Year", releaseDate: "2024-07-05" },
  { branch: "AI-ML", year: "4th Year", releaseDate: "2024-07-01" },
  { branch: "BBA", year: "1st Year", releaseDate: "2024-07-12" },
  { branch: "BBA", year: "2nd Year", releaseDate: "2024-07-08" },
  { branch: "BBA", year: "3rd Year", releaseDate: "2024-07-03" },
  { branch: "MBA", year: "1st Year", releaseDate: "2024-07-12" },
  { branch: "MBA", year: "2nd Year", releaseDate: "2024-07-08" },
]

const sampleStudents = [
  { name: "Aarav Sharma", branch: "CSE", program: "BTech", enrollmentNo: "2024CSE001", year: "1st Year" },
  { name: "Priya Patel", branch: "IT", program: "BTech", enrollmentNo: "2024IT001", year: "1st Year" },
  { name: "Rohit Kumar", branch: "CSE-DS", program: "BTech", enrollmentNo: "2024DS001", year: "1st Year" },
  { name: "Sneha Singh", branch: "AI-ML", program: "BTech", enrollmentNo: "2024AI001", year: "1st Year" },
  { name: "Arjun Gupta", branch: "BBA", program: "BBA", enrollmentNo: "2024BBA001", year: "1st Year" },
  { name: "Kavya Reddy", branch: "MBA", program: "MBA", enrollmentNo: "2024MBA001", year: "1st Year" },
  { name: "Vikram Joshi", branch: "CSE", program: "BTech", enrollmentNo: "2023CSE002", year: "2nd Year" },
  { name: "Ananya Das", branch: "IT", program: "BTech", enrollmentNo: "2023IT002", year: "2nd Year" },
  { name: "Ravi Sharma", branch: "CSE", program: "BTech", enrollmentNo: "2022CSE003", year: "3rd Year" },
  { name: "Meera Gupta", branch: "BBA", program: "BBA", enrollmentNo: "2022BBA002", year: "3rd Year" },
]

const scholarshipData = [
  {
    title: "Merit Scholarship",
    description:
      "For students with outstanding academic performance in their qualifying examinations. This scholarship recognizes and rewards academic excellence.",
    eligibility: "Minimum 85% in previous qualifying examination, consistent academic performance",
    amount: "Up to ₹50,000 per year",
    applicationProcess: "Apply through the Academic Office with mark sheets and certificates",
    deadline: "31st August 2024",
  },
  {
    title: "Need-based Scholarship",
    description:
      "Financial assistance program designed to support economically disadvantaged students in pursuing their education without financial constraints.",
    eligibility: "Family income below ₹2,00,000 per annum, valid income certificate required",
    amount: "Up to ₹30,000 per year",
    applicationProcess: "Submit application to Student Welfare Office with income proof and supporting documents",
    deadline: "15th September 2024",
  },
  {
    title: "Sports Scholarship",
    description:
      "Recognition and financial support for students who have excelled in sports and athletics at state or national level competitions.",
    eligibility: "State/National level sports achievements, active participation in college sports activities",
    amount: "Up to ₹25,000 per year",
    applicationProcess: "Contact Sports Department with achievement certificates and recommendation letter",
    deadline: "30th September 2024",
  },
  {
    title: "Research Excellence Scholarship",
    description:
      "Encouraging students to pursue research activities and innovation projects during their academic tenure.",
    eligibility: "Enrolled in final year, research project proposal, faculty recommendation",
    amount: "Up to ₹40,000 per year",
    applicationProcess: "Submit research proposal to Research & Development Cell with faculty endorsement",
    deadline: "20th October 2024",
  },
]

export default function AcademiaSection() {
  const params = useParams()
  const section = params.section as string
  const [activeSection, setActiveSection] = useState(section || "calendar")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (section) {
      setActiveSection(section)
    }
  }, [section])

  const groupedSyllabus = branches.reduce(
    (acc, branch) => {
      const branchData = syllabusData.filter((item) => {
        const matchesBranch = selectedBranch === "all" || item.branch === selectedBranch
        const matchesYear = selectedYear === "all" || item.year === selectedYear
        return item.branch === branch.code && matchesBranch && matchesYear
      })
      if (branchData.length > 0) {
        acc[branch.code] = {
          ...branch,
          data: branchData,
        }
      }
      return acc
    },
    {} as Record<string, any>,
  )

  const filteredStudents = sampleStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollmentNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = selectedBranch === "all" || student.branch === selectedBranch
    const matchesYear = selectedYear === "all" || student.year === selectedYear
    const matchesProgram = selectedProgram === "all" || student.program === selectedProgram
    return matchesSearch && matchesBranch && matchesYear && matchesProgram
  })

  const SidebarContent = () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Academia</h3>
      <nav className="space-y-2">
        {academicSections.map((sectionItem) => {
          const Icon = sectionItem.icon
          return (
            <motion.a
              key={sectionItem.id}
              href={`/academia/${sectionItem.id}`}
              className={`block w-full text-left p-3 rounded-lg transition-all duration-200 ${
                activeSection === sectionItem.id
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{sectionItem.title}</div>
                  <div className="text-xs text-gray-500 mt-1 hidden sm:block">{sectionItem.description}</div>
                </div>
              </div>
            </motion.a>
          )
        })}
      </nav>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "calendar":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 h-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Academic Calendar</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
            <Card className="flex-1">
              <CardContent className="p-4 sm:p-6 h-full">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Calendar className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-sm sm:text-base">Academic Calendar PDF Viewer</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      Click download to view the complete academic calendar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case "syllabus":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 h-full"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Scheme & Syllabus</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch.code} value={branch.code}>
                        {branch.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-white rounded-lg border overflow-hidden flex-1">
              <div className="overflow-y-auto max-h-[500px] sm:max-h-[600px]">
                {Object.keys(groupedSyllabus).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No syllabus found matching your criteria</div>
                ) : (
                  <div className="space-y-0">
                    {Object.entries(groupedSyllabus).map(([branchCode, branchInfo], branchIndex) => (
                      <motion.div
                        key={branchCode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: branchIndex * 0.1 }}
                      >
                        {/* Branch Header */}
                        <div className="bg-blue-50 border-b px-4 sm:px-6 py-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                  {branchCode}
                                </Badge>
                                <span className="hidden sm:inline">{branchInfo.name}</span>
                              </h3>
                              <p className="text-sm text-blue-700 mt-1 sm:hidden">{branchInfo.name}</p>
                            </div>
                            <Badge variant="outline" className="text-blue-600 border-blue-200 w-fit">
                              {branchInfo.program}
                            </Badge>
                          </div>
                        </div>

                        {/* Years Data */}
                        <div className="divide-y">
                          {branchInfo.data.map((item: any, index: number) => (
                            <div key={`${item.branch}-${item.year}`} className="px-4 sm:px-6 py-4 hover:bg-gray-50">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <span className="font-medium text-gray-900">{item.year}</span>
                                    <span className="text-sm text-gray-500">
                                      Released: {new Date(item.releaseDate).toLocaleDateString("en-IN")}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="bg-transparent text-xs sm:text-sm">
                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    View
                                  </Button>
                                  <Button size="sm" variant="outline" className="bg-transparent text-xs sm:text-sm">
                                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )

      case "fee-structure":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 h-full"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Fee Structure</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch.code} value={branch.code}>
                        {branch.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            <Card className="flex-1">
              <CardContent className="p-4 sm:p-6 h-full">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <FileText className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-sm sm:text-base">Fee Structure PDF Viewer</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      {selectedBranch !== "all" && `Showing fee structure for ${selectedBranch}`}
                      {selectedYear !== "all" && ` - ${selectedYear}`}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Click download to view the complete fee structure
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case "scholarships":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 h-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Scholarships</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Download Guidelines
              </Button>
            </div>

            <div className="space-y-6 overflow-y-auto max-h-[500px] sm:max-h-[600px] pr-2">
              {scholarshipData.map((scholarship, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{scholarship.title}</h3>
                        <p className="text-green-600 font-semibold text-sm sm:text-base">{scholarship.amount}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-red-600 border-red-200 w-fit text-xs sm:text-sm">
                      Deadline: {scholarship.deadline}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{scholarship.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Eligibility Criteria:</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{scholarship.eligibility}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">How to Apply:</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{scholarship.applicationProcess}</p>
                    </div>
                  </div>

                  {index < scholarshipData.length - 1 && <Separator className="mt-6" />}
                </motion.div>
              ))}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-3">Important Information</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-700">
                  <li>• All scholarship applications must be submitted before the respective deadlines</li>
                  <li>• Required documents must be verified and submitted along with the application</li>
                  <li>• Scholarship renewal is subject to maintaining minimum academic performance</li>
                  <li>• For queries, contact the Student Welfare Office during working hours</li>
                  <li>• Multiple scholarships cannot be availed simultaneously</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )

      case "students":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 h-full"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">List of Students</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="BTech">BTech</SelectItem>
                    <SelectItem value="BBA">BBA</SelectItem>
                    <SelectItem value="MBA">MBA</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch.code} value={branch.code}>
                        {branch.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="flex-1">
              <CardContent className="p-0">
                <div className="overflow-x-auto overflow-y-auto max-h-[500px] sm:max-h-[600px]">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-50 border-b sticky top-0">
                      <tr>
                        <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">Enrollment No.</th>
                        <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">Name</th>
                        <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">Program</th>
                        <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">Branch</th>
                        <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence mode="wait">
                        {filteredStudents.map((student, index) => (
                          <motion.tr
                            key={student.enrollmentNo}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3 sm:p-4 font-mono text-xs sm:text-sm">{student.enrollmentNo}</td>
                            <td className="p-3 sm:p-4 font-medium text-sm sm:text-base">{student.name}</td>
                            <td className="p-3 sm:p-4">
                              <Badge variant="outline" className="text-xs">
                                {student.program}
                              </Badge>
                            </td>
                            <td className="p-3 sm:p-4">
                              <Badge variant="secondary" className="text-xs">
                                {student.branch}
                              </Badge>
                            </td>
                            <td className="p-3 sm:p-4 text-sm sm:text-base">{student.year}</td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                  {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
                      No students found matching your criteria
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-4 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border sticky top-8 h-fit">
              <SidebarContent />
            </div>
          </div>

          {/* Mobile Sidebar */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-50 bg-white">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 min-h-[600px] sm:min-h-[700px] flex flex-col">
              <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
