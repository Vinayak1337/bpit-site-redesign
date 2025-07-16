import { Phone, Mail, MapPin, Clock, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div className="border-l-4 border-blue-600 pl-6">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
        </div>
        <p className="text-lg text-gray-600">
          Get in touch with our library team for assistance, queries, or feedback.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Address</h4>
                <p className="text-gray-600">
                  BPIT Library
                  <br />
                  Bhagwan Parshuram Institute of Technology
                  <br />
                  PSP-4, Sector-17, Rohini
                  <br />
                  New Delhi - 110089
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Phone Numbers</h4>
                <p className="text-gray-600">
                  Main: +91-11-2757-1080
                  <br />
                  Library: +91-11-2757-1084
                  <br />
                  Digital Section: +91-11-2757-1087
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Email Addresses</h4>
                <p className="text-gray-600">
                  General:{" "}
                  <a href="mailto:librarian@bpitindia.ac.in" className="text-blue-600 hover:underline">
                    librarian@bpitindia.ac.in
                  </a>
                  <br />
                  Digital Resources:{" "}
                  <a href="mailto:digital.library@bpitindia.ac.in" className="text-blue-600 hover:underline">
                    digital.library@bpitindia.ac.in
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Operating Hours</h4>
                <p className="text-gray-600">
                  Monday - Friday: 8:00 AM - 8:00 PM
                  <br />
                  Saturday: 9:00 AM - 5:00 PM
                  <br />
                  Sunday: 10:00 AM - 4:00 PM
                  <br />
                  <span className="text-sm text-blue-600">Extended hours during exams</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Enter your email address" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="Enter your message here..." rows={5} />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Personnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Mr. Vikash Pandey</h4>
              <p className="text-blue-600 text-sm">Chief Librarian</p>
              <p className="text-gray-600 text-sm">librarian@bpitindia.ac.in</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Ms. Anjali Verma</h4>
              <p className="text-green-600 text-sm">Assistant Librarian</p>
              <p className="text-gray-600 text-sm">anjali.verma@bpitindia.ac.in</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Ms. Pooja Singh</h4>
              <p className="text-purple-600 text-sm">Digital Library Coordinator</p>
              <p className="text-gray-600 text-sm">pooja.singh@bpitindia.ac.in</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">How do I register for library membership?</h4>
              <p className="text-gray-600 text-sm">
                Visit the library with your valid ID card and fill out the registration form. Membership is free for all
                BPIT students and faculty.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">What are the library timings?</h4>
              <p className="text-gray-600 text-sm">
                The library is open Monday-Friday 8:00 AM - 8:00 PM, Saturday 9:00 AM - 5:00 PM, and Sunday 10:00 AM -
                4:00 PM.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">How can I access digital resources from home?</h4>
              <p className="text-gray-600 text-sm">
                Use your library credentials to access our digital library portal. Contact the digital library
                coordinator for login assistance.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">What is the fine for late book returns?</h4>
              <p className="text-gray-600 text-sm">
                Students are charged ₹2 per day per book, while faculty members are charged ₹5 per day per book for late
                returns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
