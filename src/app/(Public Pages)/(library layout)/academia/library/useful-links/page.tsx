"use client"

import { ExternalLink, Globe, BookOpen, Database, GraduationCap, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const linkCategories = [
  {
    title: "Academic Databases",
    icon: Database,
    color: "blue",
    links: [
      {
        name: "IEEE Xplore Digital Library",
        url: "https://ieeexplore.ieee.org",
        description: "Access to IEEE journals, conferences, and standards",
      },
      {
        name: "ScienceDirect",
        url: "https://www.sciencedirect.com",
        description: "Elsevier's platform for scientific research",
      },
      {
        name: "SpringerLink",
        url: "https://link.springer.com",
        description: "Scientific, technical and medical content",
      },
      {
        name: "ACM Digital Library",
        url: "https://dl.acm.org",
        description: "Computing and information technology resources",
      },
    ],
  },
  {
    title: "Open Access Resources",
    icon: BookOpen,
    color: "green",
    links: [
      {
        name: "Directory of Open Access Journals (DOAJ)",
        url: "https://doaj.org",
        description: "Quality controlled, open access, scholarly journals",
      },
      {
        name: "arXiv.org",
        url: "https://arxiv.org",
        description: "Open access to research papers in various fields",
      },
      {
        name: "PubMed Central",
        url: "https://www.ncbi.nlm.nih.gov/pmc",
        description: "Free full-text archive of biomedical literature",
      },
      {
        name: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu",
        description: "Free online course materials from MIT",
      },
    ],
  },
  {
    title: "Government & Educational",
    icon: GraduationCap,
    color: "purple",
    links: [
      {
        name: "National Digital Library of India (NDLI)",
        url: "https://ndl.iitkgp.ac.in",
        description: "Digital repository of academic content",
      },
      {
        name: "SWAYAM",
        url: "https://swayam.gov.in",
        description: "Government of India's education platform",
      },
      {
        name: "Shodhganga",
        url: "https://shodhganga.inflibnet.ac.in",
        description: "Digital repository of Indian theses",
      },
      {
        name: "e-PG Pathshala",
        url: "https://epgp.inflibnet.ac.in",
        description: "Postgraduate e-content in various subjects",
      },
    ],
  },
  {
    title: "Reference & Tools",
    icon: Globe,
    color: "orange",
    links: [
      {
        name: "Google Scholar",
        url: "https://scholar.google.com",
        description: "Search scholarly literature across disciplines",
      },
      {
        name: "ResearchGate",
        url: "https://www.researchgate.net",
        description: "Social networking site for scientists and researchers",
      },
      {
        name: "Mendeley",
        url: "https://www.mendeley.com",
        description: "Reference manager and academic social network",
      },
      {
        name: "Zotero",
        url: "https://www.zotero.org",
        description: "Free tool to collect, organize, and cite research",
      },
    ],
  },
]

export default function UsefulLinksPage() {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "text-blue-600 bg-blue-100",
      green: "text-green-600 bg-green-100",
      purple: "text-purple-600 bg-purple-100",
      orange: "text-orange-600 bg-orange-100",
    }
    return colorMap[color as keyof typeof colorMap] || "text-blue-600 bg-blue-100"
  }

  return (
    <div className="space-y-8">
      <div className="border-l-4 border-blue-600 pl-6">
        <div className="flex items-center gap-3 mb-4">
          <ExternalLink className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Useful Links</h1>
        </div>
        <p className="text-lg text-gray-600">
          Explore these carefully curated academic and research resources to enhance your learning and research
          experience.
        </p>
      </div>

      <div className="grid gap-8">
        {linkCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(category.color)}`}
                >
                  <category.icon className="h-5 w-5" />
                </div>
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {category.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{link.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{link.description}</p>
                        <p className="text-blue-600 text-sm font-mono">{link.url}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-shrink-0 bg-transparent"
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Access Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-800">On-Campus Access</h4>
                <p className="text-gray-600 text-sm">
                  Most subscription-based resources are accessible directly from campus network without additional
                  login.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Off-Campus Access</h4>
                <p className="text-gray-600 text-sm">
                  Use VPN or contact library staff for remote access credentials to subscription databases.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Open Access</h4>
                <p className="text-gray-600 text-sm">
                  Resources marked as open access are freely available to everyone without restrictions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                4
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Need Help?</h4>
                <p className="text-gray-600 text-sm">
                  Contact our digital library coordinator for assistance with accessing any resource.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suggest a Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Know of a valuable academic resource that should be included in our list? We welcome suggestions from
            faculty and students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              Email Suggestion
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Send to:</span>
              <a href="mailto:digital.library@bpitindia.ac.in" className="text-blue-600 hover:underline">
                digital.library@bpitindia.ac.in
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
