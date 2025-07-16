import React from 'react';
import { Copy, Clock, IndianRupee } from 'lucide-react';

export default function PhotocopyService() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Photocopy Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Convenient and affordable photocopying services available within the library premises for academic materials.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Copy className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Photocopy Services</h3>
            </div>
            <p className="text-gray-600">
              Our in-house photocopy service provides quick and economical copying solutions for students and faculty members for academic purposes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Copy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Standard Copying</h3>
              <p className="text-gray-600">
                Black and white copies of books, journals, and academic materials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Quick Service</h3>
              <p className="text-gray-600">
                Fast turnaround time for urgent academic requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <IndianRupee className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Affordable Rates</h3>
              <p className="text-gray-600">
                Student-friendly pricing for all photocopying needs.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Service Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>A4 Size:</strong> ₹1 per page</li>
                <li>• <strong>A3 Size:</strong> ₹2 per page</li>
                <li>• <strong>Double-sided:</strong> ₹1.50 per page</li>
                <li>• <strong>Bulk Orders:</strong> Special rates available</li>
                <li>• <strong>Quality:</strong> High-resolution copies</li>
                <li>• <strong>Paper:</strong> Standard 70 GSM white paper</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold">Operating Hours</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                <li>• <strong>Saturday:</strong> 9:00 AM - 4:00 PM</li>
                <li>• <strong>Sunday:</strong> Closed</li>
                <li>• <strong>Exam Period:</strong> Extended hours</li>
                <li>• <strong>Lunch Break:</strong> 1:00 PM - 2:00 PM</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Guidelines and Policies</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Photocopying is permitted only for academic and research purposes</li>
              <li>• Copyright restrictions apply - limited pages per book/journal</li>
              <li>• Payment must be made in advance for large orders</li>
              <li>• Library reserves the right to refuse copying of certain materials</li>
              <li>• Personal materials can also be photocopied with permission</li>
              <li>• Bulk orders (50+ pages) require advance notice</li>
              <li>• Quality check is performed before delivery</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Copyright Notice</h4>
            <p className="text-yellow-700">
              Photocopying is subject to copyright laws. Users are responsible for ensuring compliance with copyright regulations. The library follows fair use guidelines for educational purposes.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-green-800 mb-2">Contact Information</h4>
            <p className="text-green-700">
              For bulk orders or special requirements, contact the library desk in advance. Phone: Library Extension 123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
