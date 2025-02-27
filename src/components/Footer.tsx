
import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium text-gray-700">SecurityGuardian</span>
          </div>
          <div className="text-sm text-gray-500">
            <p>このツールは教育目的のみに使用してください。実際の攻撃は行いません。</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-6 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SecurityGuardian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
