import { UserCheck, Mail, Phone, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const libraryStaff = [
  {
    name: "Mr. Vikash Pandey",
    position: "Chief Librarian",
    qualification: "M.Lib.I.Sc., Ph.D.",
    experience: "15 years",
    email: "librarian@bpitindia.ac.in",
    phone: "+91-11-2757-1084",
    specialization: "Digital Library Management, Information Systems",
  },
  {
    name: "Ms. Anjali Verma",
    position: "Assistant Librarian",
    qualification: "M.Lib.I.Sc.",
    experience: "8 years",
    email: "anjali.verma@bpitindia.ac.in",
    phone: "+91-11-2757-1085",
    specialization: "Cataloguing, Reference Services",
  },
  {
    name: "Mr. Suresh Kumar",
    position: "Library Assistant",
    qualification: "B.Lib.I.Sc.",
    experience: "12 years",
    email: "suresh.kumar@bpitindia.ac.in",
    phone: "+91-11-2757-1086",
    specialization: "Circulation, Book Maintenance",
  },
  {
    name: "Ms. Pooja Singh",
    position: "Digital Library Coordinator",
    qualification: "M.C.A., M.Lib.I.Sc.",
    experience: "6 years",
    email: "pooja.singh@bpitindia.ac.in",
    phone: "+91-11-2757-1087",
    specialization: "E-Resources, Database Management",
  },
  {
    name: "Mr. Ramesh Chand",
    position: "Library Attendant",
    qualification: "B.A.",
    experience: "10 years",
    email: "ramesh.chand@bpitindia.ac.in",
    phone: "+91-11-2757-1088",
    specialization: "Stack Maintenance, General Assistance",
  },
]

export default function LibraryStaffPage() {
  return (
    <div className="space-y-8">
      <div className="border-l-4 border-blue-600 pl-6">
        <div className="flex items-center gap-3 mb-4">
          <UserCheck className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Library Staff</h1>
        </div>
        <p className="text-lg text-gray-600">
          Meet our dedicated library team committed to providing excellent information services and support.
        </p>
      </div>

      <div className="grid gap-6">
        {libraryStaff.map((staff, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCheck className="h-12 w-12 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{staff.name}</h3>
                  <p className="text-blue-600 font-medium text-lg mb-3">{staff.position}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{staff.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-medium">Experience:</span>
                      <span className="text-gray-600">{staff.experience}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500 font-medium mb-1">Specialization:</p>
                    <p className="text-gray-600">{staff.specialization}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${staff.email}`} className="text-blue-600 hover:underline">
                        {staff.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{staff.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Responsibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Administrative Functions</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Library policy implementation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Budget planning and management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Staff supervision and training
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Collection development oversight
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">User Services</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Reference and information services
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  User orientation and training
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Circulation services management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Digital resource support
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
