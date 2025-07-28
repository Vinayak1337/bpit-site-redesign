'use client';

import React from 'react';
import { Database, Wifi, Globe } from 'lucide-react';

export default function EResources() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">E-Resources</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Access our comprehensive collection of electronic resources including databases, e-journals, e-books, and digital archives.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Electronic Resources</h3>
            </div>
            <p className="text-gray-600">
              Our e-resources provide 24/7 access to scholarly content, research databases, and digital publications to support academic and research activities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Databases</h3>
              <p className="text-gray-600">
                Specialized academic databases with peer-reviewed content and research papers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">E-Journals</h3>
              <p className="text-gray-600">
                Online access to current and archived issues of academic journals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Wifi className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Remote Access</h3>
              <p className="text-gray-600">
                Off-campus access to subscribed resources for registered users.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Engineering Databases</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>IEEE Xplore:</strong> IEEE publications and conference papers</li>
                <li>• <strong>ASME Digital:</strong> Mechanical engineering content</li>
                <li>• <strong>ACM Digital Library:</strong> Computing and IT resources</li>
                <li>• <strong>ScienceDirect:</strong> Elsevier scientific publications</li>
                <li>• <strong>SpringerLink:</strong> Springer journals and books</li>
                <li>• <strong>Wiley Online:</strong> Engineering and science journals</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">General Academic Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>JSTOR:</strong> Academic journals archive</li>
                <li>• <strong>ProQuest:</strong> Dissertations and theses</li>
                <li>• <strong>EBSCO:</strong> Academic search databases</li>
                <li>• <strong>Taylor & Francis:</strong> Social sciences and humanities</li>
                <li>• <strong>Sage Publications:</strong> Research methodologies</li>
                <li>• <strong>Oxford Academic:</strong> University press content</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Access Instructions</h3>
            <ol className="space-y-3 text-gray-600">
              <li>
                <strong>1. On-Campus Access:</strong> Connect to campus WiFi and access resources directly through library website
              </li>
              <li>
                <strong>2. User Authentication:</strong> Use your student/faculty credentials for database access
              </li>
              <li>
                <strong>3. Remote Access:</strong> Configure VPN for off-campus access to subscribed resources
              </li>
              <li>
                <strong>4. Search Techniques:</strong> Use advanced search options and boolean operators for better results
              </li>
              <li>
                <strong>5. Download & Save:</strong> Download PDFs and save citations using reference management tools
              </li>
              <li>
                <strong>6. Technical Support:</strong> Contact library IT support for access issues
              </li>
            </ol>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Usage Guidelines</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Respect copyright and licensing terms</li>
                <li>• Use resources for educational purposes only</li>
                <li>• Do not share login credentials</li>
                <li>• Avoid systematic downloading</li>
                <li>• Cite sources properly in academic work</li>
                <li>• Report access issues to library staff</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Training & Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Regular workshops on database usage</li>
                <li>• One-on-one training sessions</li>
                <li>• Research methodology guidance</li>
                <li>• Citation management training</li>
                <li>• Subject-specific resource tours</li>
                <li>• Online tutorials and guides</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
            <p className="text-blue-700">
              Library staff are available to help you navigate e-resources effectively. Schedule a consultation at the reference desk or email library@bpitindia.edu.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
