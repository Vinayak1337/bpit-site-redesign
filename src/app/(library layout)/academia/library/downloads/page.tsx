import { Download, FileText, File, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const downloadableFiles = [
  {
    title: "Library Registration Form",
    description: "Form for new library membership registration",
    type: "PDF",
    size: "245 KB",
    date: "2024-01-15",
    category: "Forms",
  },
  {
    title: "Book Request Form",
    description: "Form to request new books for library collection",
    type: "PDF",
    size: "180 KB",
    date: "2024-01-10",
    category: "Forms",
  },
  {
    title: "Library Rules and Regulations",
    description: "Complete guide to library policies and procedures",
    type: "PDF",
    size: "520 KB",
    date: "2024-01-05",
    category: "Guidelines",
  },
  {
    title: "Digital Library Access Guide",
    description: "Step-by-step guide to access digital resources",
    type: "PDF",
    size: "1.2 MB",
    date: "2023-12-20",
    category: "Guidelines",
  },
  {
    title: "Research Paper Template",
    description: "Standard template for academic research papers",
    type: "DOCX",
    size: "85 KB",
    date: "2023-12-15",
    category: "Templates",
  },
  {
    title: "Thesis Submission Guidelines",
    description: "Guidelines for thesis formatting and submission",
    type: "PDF",
    size: "680 KB",
    date: "2023-12-10",
    category: "Guidelines",
  },
  {
    title: "Library Catalog Search Guide",
    description: "How to effectively search the library catalog",
    type: "PDF",
    size: "420 KB",
    date: "2023-12-01",
    category: "Guidelines",
  },
  {
    title: "Inter-Library Loan Form",
    description: "Form for requesting books from other libraries",
    type: "PDF",
    size: "195 KB",
    date: "2023-11-25",
    category: "Forms",
  },
]

const categories = ["All", "Forms", "Guidelines", "Templates"]

export default function DownloadsPage() {
  return (
    <div className="space-y-8">
      <div className="border-l-4 border-blue-600 pl-6">
        <div className="flex items-center gap-3 mb-4">
          <Download className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Downloads</h1>
        </div>
        <p className="text-lg text-gray-600">
          Download forms, guidelines, and other useful documents for library services.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {downloadableFiles.map((file, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {file.type === "PDF" ? (
                        <FileText className="h-6 w-6 text-red-600" />
                      ) : (
                        <File className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{file.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{file.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <File className="h-3 w-3" />
                          {file.type}
                        </span>
                        <span>{file.size}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {file.date}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{file.category}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Download Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Select Document</h4>
                <p className="text-gray-600 text-sm">Choose the document you need from the list above</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Click Download</h4>
                <p className="text-gray-600 text-sm">Click the download button to save the file to your device</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Complete and Submit</h4>
                <p className="text-gray-600 text-sm">
                  Fill out forms completely and submit to library staff as required
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            If you're having trouble downloading any document or need assistance with forms, please contact our library
            staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Email:</span>
              <a href="mailto:librarian@bpitindia.ac.in" className="text-blue-600 hover:underline">
                librarian@bpitindia.ac.in
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Phone:</span>
              <span className="text-gray-600">+91-11-2757-1084</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
