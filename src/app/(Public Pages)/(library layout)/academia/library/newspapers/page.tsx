import React from 'react';
import { Newspaper, Clock } from 'lucide-react';

export default function Newspapers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Newspapers</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Stay updated with current affairs and industry news through our collection of national and international newspapers.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Newspaper Collection</h3>
            </div>
            <p className="text-gray-600">
              Our library subscribes to various newspapers in English and Hindi to keep our academic community informed about national and international developments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">English Newspapers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• The Times of India</li>
                <li>• The Hindu</li>
                <li>• Hindustan Times</li>
                <li>• Indian Express</li>
                <li>• Economic Times</li>
                <li>• Business Standard</li>
                <li>• Deccan Herald</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Hindi Newspapers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• दैनिक जागरण (Dainik Jagran)</li>
                <li>• अमर उजाला (Amar Ujala)</li>
                <li>• दैनिक भास्कर (Dainik Bhaskar)</li>
                <li>• राजस्थान पत्रिका (Rajasthan Patrika)</li>
                <li>• नवभारत टाइम्स (Navbharat Times)</li>
                <li>• पंजाब केसरी (Punjab Kesari)</li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Specialized Publications</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Engineering magazines</li>
                <li>• Technology journals</li>
                <li>• Trade publications</li>
                <li>• Industry newsletters</li>
                <li>• Research bulletins</li>
                <li>• Government gazettes</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold">Reading Schedule</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Fresh newspapers available by 9:00 AM</li>
                <li>• Previous day's papers archived</li>
                <li>• Weekly magazines updated regularly</li>
                <li>• Monthly journals cataloged</li>
                <li>• Back issues available on request</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Newspaper Reading Guidelines</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Newspapers are for reading within the library premises only</li>
              <li>• Handle newspapers carefully to ensure they remain readable for others</li>
              <li>• Return newspapers to the designated rack after reading</li>
              <li>• Back issues can be accessed by requesting library staff</li>
              <li>• Digital versions of some newspapers are available on library computers</li>
              <li>• Photocopying of specific articles is allowed with staff assistance</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Digital Access</h4>
            <p className="text-blue-700">
              Digital archives of major newspapers are accessible through library computers. Ask the reference desk for assistance in accessing online newspaper databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
