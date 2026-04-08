'use client';

import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LibraryRulesPage() {
  return (
    <div className="space-y-8">
      <div className="border-l-4 border-blue-600 pl-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">General Library Rules</h1>
        </div>
        <p className="text-lg text-gray-600">
          Please follow these rules to ensure a conducive learning environment for all library users.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          All library users must carry their valid ID cards and follow the established rules and regulations.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Entry and Access Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <span>Valid ID card is mandatory for library entry</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <span>Register your entry and exit in the library register</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <span>Visitors must obtain permission from the librarian</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <span>Library bags and personal belongings to be deposited at the counter</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Book Borrowing Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Students</h4>
                <ul className="space-y-2">
                  <li>• Maximum 3 books for 15 days</li>
                  <li>• Renewal allowed once for 7 days</li>
                  <li>• Fine: ₹2 per day per book</li>
                  <li>• Reference books: Library use only</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Faculty</h4>
                <ul className="space-y-2">
                  <li>• Maximum 10 books for 30 days</li>
                  <li>• Renewal allowed twice</li>
                  <li>• Fine: ₹5 per day per book</li>
                  <li>• Research material: Extended period</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              Prohibited Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <span>Talking loudly or making noise in the reading area</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <span>Using mobile phones inside the library</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <span>Eating or drinking in the library premises</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <span>Damaging or marking library materials</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <span>Removing books without proper checkout</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Digital Library Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Use computers only for academic and research purposes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Maximum 2 hours continuous use per session</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>No downloading of unauthorized software</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <span>Report technical issues to library staff immediately</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penalties and Fines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Violation</th>
                    <th className="border border-gray-300 p-3 text-left">Penalty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Late return of books</td>
                    <td className="border border-gray-300 p-3">₹2-5 per day per book</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Damage to library material</td>
                    <td className="border border-gray-300 p-3">Cost of replacement + ₹50 processing fee</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Loss of library book</td>
                    <td className="border border-gray-300 p-3">2x cost of book + ₹100 processing fee</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Violation of library rules</td>
                    <td className="border border-gray-300 p-3">Warning/Temporary suspension</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
