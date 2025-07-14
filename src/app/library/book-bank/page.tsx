import React from 'react';
import { BookMarked, Users, GraduationCap } from 'lucide-react';

export default function BookBank() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Bank</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Our Book Bank scheme provides textbooks to economically disadvantaged students, ensuring equal access to educational resources.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BookMarked className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Book Bank Scheme</h3>
            </div>
            <p className="text-gray-600">
              The Book Bank is a welfare initiative that provides free textbooks to deserving students for the entire academic year, reducing financial burden and promoting education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <BookMarked className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Free Textbooks</h3>
              <p className="text-gray-600">
                Essential textbooks provided at no cost for the academic year.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Merit & Need Based</h3>
              <p className="text-gray-600">
                Selection based on academic merit and financial need assessment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Academic Support</h3>
              <p className="text-gray-600">
                Comprehensive support to ensure academic success for all students.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Eligibility Criteria</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Annual family income below ₹2,00,000</li>
                <li>• Minimum 75% attendance in previous semester</li>
                <li>• Good academic standing (no backlogs)</li>
                <li>• Indian citizenship</li>
                <li>• Valid income certificate from competent authority</li>
                <li>• Regular student of the institute</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Available Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Core subject textbooks</li>
                <li>• Laboratory manuals</li>
                <li>• Reference books for competitive exams</li>
                <li>• Previous year question papers</li>
                <li>• Study guides and handbooks</li>
                <li>• Digital resources access</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Application Process</h3>
            <ol className="space-y-3 text-gray-600">
              <li>
                <strong>1. Application Form:</strong> Collect and fill the Book Bank application form from the library
              </li>
              <li>
                <strong>2. Document Submission:</strong> Submit required documents including income certificate and academic records
              </li>
              <li>
                <strong>3. Verification:</strong> Documents verified by the Book Bank committee
              </li>
              <li>
                <strong>4. Selection:</strong> Merit list prepared based on eligibility criteria
              </li>
              <li>
                <strong>5. Book Allotment:</strong> Selected students receive books for the academic year
              </li>
              <li>
                <strong>6. Return Process:</strong> Books must be returned in good condition at year-end
              </li>
            </ol>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Terms & Conditions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Books must be returned by specified date</li>
                <li>• No marking or writing in books allowed</li>
                <li>• Replacement cost charged for damaged books</li>
                <li>• Books cannot be transferred to others</li>
                <li>• Regular attendance mandatory</li>
                <li>• Academic performance monitored</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Important Dates</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Application Start:</strong> Beginning of each semester</li>
                <li>• <strong>Last Date:</strong> 15 days after semester begins</li>
                <li>• <strong>Book Issue:</strong> Within one month of selection</li>
                <li>• <strong>Return Date:</strong> Last working day of semester</li>
                <li>• <strong>Fine Period:</strong> Grace period of 7 days</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-green-800 mb-2">Apply Now</h4>
            <p className="text-green-700">
              Eligible students can apply for the Book Bank scheme at the beginning of each semester. Contact the library circulation desk for application forms and assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
