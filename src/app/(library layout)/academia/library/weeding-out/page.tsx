import React from 'react';
import { Trash2, BookOpen, RefreshCw } from 'lucide-react';

export default function WeedingOut() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Weeding Out</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Our systematic weeding process ensures the library collection remains current, relevant, and space-efficient by removing outdated materials.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">What is Weeding?</h3>
            </div>
            <p className="text-gray-600">
              Weeding is the systematic process of removing outdated, damaged, or irrelevant materials from the library collection to maintain quality and make space for new acquisitions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Quality Control</h3>
              <p className="text-gray-600">
                Maintaining high standards by removing worn-out and obsolete materials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <RefreshCw className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collection Refresh</h3>
              <p className="text-gray-600">
                Making room for new and updated materials that better serve users.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Trash2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Space Management</h3>
              <p className="text-gray-600">
                Optimizing shelf space and improving accessibility of materials.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Weeding Criteria</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Age:</strong> Publications older than 10-15 years</li>
                <li>• <strong>Condition:</strong> Damaged or deteriorated books</li>
                <li>• <strong>Usage:</strong> Materials not borrowed in 5+ years</li>
                <li>• <strong>Obsolescence:</strong> Outdated technical information</li>
                <li>• <strong>Duplication:</strong> Multiple copies of same title</li>
                <li>• <strong>Relevance:</strong> No longer aligned with curriculum</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Protected Materials</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Historical Value:</strong> Books of historical significance</li>
                <li>• <strong>Rare Books:</strong> Unique or rare publications</li>
                <li>• <strong>Reference Works:</strong> Standard reference materials</li>
                <li>• <strong>Local Authors:</strong> Works by institutional faculty</li>
                <li>• <strong>Research Value:</strong> Materials for ongoing research</li>
                <li>• <strong>Last Copies:</strong> Sole copy of important works</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Weeding Process</h3>
            <ol className="space-y-3 text-gray-600">
              <li>
                <strong>1. Planning:</strong> Annual weeding schedule prepared with department input
              </li>
              <li>
                <strong>2. Review:</strong> Subject librarians examine materials section by section
              </li>
              <li>
                <strong>3. Faculty Consultation:</strong> Department heads consulted for specialized materials
              </li>
              <li>
                <strong>4. Evaluation:</strong> Materials assessed against weeding criteria
              </li>
              <li>
                <strong>5. Decision:</strong> Items marked for retention, replacement, or removal
              </li>
              <li>
                <strong>6. Documentation:</strong> Withdrawn items recorded in library database
              </li>
              <li>
                <strong>7. Disposal:</strong> Removed books donated or responsibly disposed
              </li>
            </ol>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Benefits of Weeding</h4>
              <ul className="text-green-700 space-y-1">
                <li>• Improved collection quality</li>
                <li>• Better space utilization</li>
                <li>• Enhanced user experience</li>
                <li>• Cost-effective maintenance</li>
                <li>• Updated information resources</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Faculty Input Welcome</h4>
              <p className="text-blue-700">
                Faculty members are encouraged to provide input on materials in their subject areas before weeding decisions are finalized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
