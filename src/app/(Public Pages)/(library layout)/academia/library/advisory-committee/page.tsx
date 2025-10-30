'use client';

import { Users, User, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const committeeMembers = [
  {
    name: "Dr. Rajesh Kumar",
    position: "Chairman",
    department: "Principal",
    email: "principal@bpitindia.ac.in",
    phone: "+91-11-2757-1080",
  },
  {
    name: "Dr. Priya Sharma",
    position: "Member",
    department: "Computer Science & Engineering",
    email: "priya.sharma@bpitindia.ac.in",
    phone: "+91-11-2757-1081",
  },
  {
    name: "Prof. Amit Singh",
    position: "Member",
    department: "Electronics & Communication",
    email: "amit.singh@bpitindia.ac.in",
    phone: "+91-11-2757-1082",
  },
  {
    name: "Dr. Sunita Gupta",
    position: "Member",
    department: "Mechanical Engineering",
    email: "sunita.gupta@bpitindia.ac.in",
    phone: "+91-11-2757-1083",
  },
  {
    name: "Mr. Vikash Pandey",
    position: "Member Secretary",
    department: "Chief Librarian",
    email: "librarian@bpitindia.ac.in",
    phone: "+91-11-2757-1084",
  },
]

export default function AdvisoryCommitteePage() {
  return (
    <div className="space-y-8">
      <div className="border-l-4 border-blue-600 pl-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Library Advisory Committee</h1>
        </div>
        <p className="text-lg text-gray-600">
          The Library Advisory Committee provides strategic guidance and oversight for library operations and
          development.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Committee Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Formulate policies for library development and management</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Review and approve annual library budget and expenditure</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Evaluate library services and suggest improvements</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span>Oversee collection development and resource allocation</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold text-gray-800">Committee Members</h2>
        {committeeMembers.map((member, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 mb-3">{member.department}</p>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{member.phone}</span>
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
          <CardTitle>Meeting Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p>
              <strong>Regular Meetings:</strong> First Monday of every month
            </p>
            <p>
              <strong>Time:</strong> 2:00 PM - 4:00 PM
            </p>
            <p>
              <strong>Venue:</strong> Conference Room, Administrative Block
            </p>
            <p>
              <strong>Special Meetings:</strong> As and when required
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
