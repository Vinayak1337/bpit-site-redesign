import React from 'react';
import { ShoppingCart, BookOpen, TrendingUp } from 'lucide-react';

export default function BookAcquisition() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Acquisition</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Our systematic approach to acquiring new books and resources ensures the library collection remains current and comprehensive.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Acquisition Process</h3>
            </div>
            <p className="text-gray-600">
              We follow a structured process for acquiring books that includes recommendations from faculty, student requests, curriculum requirements, and market research.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Selection Criteria</h3>
              <p className="text-gray-600">
                Books are selected based on curriculum relevance, author reputation, and academic value.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Latest Editions</h3>
              <p className="text-gray-600">
                Priority given to acquiring the latest editions and newly published titles.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <ShoppingCart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Budget Planning</h3>
              <p className="text-gray-600">
                Strategic budget allocation across different subjects and departments.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Acquisition Sources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Publishers:</strong> Direct purchase from publishers</li>
                <li>• <strong>Distributors:</strong> Authorized book distributors</li>
                <li>• <strong>Online Platforms:</strong> E-commerce websites</li>
                <li>• <strong>Book Fairs:</strong> Educational book exhibitions</li>
                <li>• <strong>Donations:</strong> Gifts from alumni and faculty</li>
                <li>• <strong>Exchange:</strong> Inter-library exchanges</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Priority Categories</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Textbooks:</strong> Core curriculum books</li>
                <li>• <strong>Reference Books:</strong> Handbooks and guides</li>
                <li>• <strong>Research Materials:</strong> Advanced topics</li>
                <li>• <strong>Journals:</strong> Academic periodicals</li>
                <li>• <strong>Digital Resources:</strong> E-books and databases</li>
                <li>• <strong>Competitive Exams:</strong> Preparation materials</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Book Request Process</h3>
            <ol className="space-y-3 text-gray-600">
              <li>
                <strong>1. Submit Request:</strong> Faculty and students can submit book requests through the library portal or request forms
              </li>
              <li>
                <strong>2. Review Process:</strong> Library committee reviews requests for relevance and budget considerations
              </li>
              <li>
                <strong>3. Approval:</strong> Approved requests are prioritized and added to the acquisition list
              </li>
              <li>
                <strong>4. Procurement:</strong> Books are ordered from appropriate vendors and suppliers
              </li>
              <li>
                <strong>5. Processing:</strong> New books are cataloged, labeled, and made available for circulation
              </li>
              <li>
                <strong>6. Notification:</strong> Requesters are informed when books become available
              </li>
            </ol>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Submit Book Requests</h4>
            <p className="text-blue-700">
              Faculty and students can submit book acquisition requests at the library circulation desk or through the online portal. Include complete bibliographic details for faster processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
