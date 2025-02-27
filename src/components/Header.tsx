
import React from 'react';
import { Shield, AlertTriangle, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4"
          >
            <div className="bg-blue-700 p-3 rounded-full">
              <Shield className="h-8 w-8" />
            </div>
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            SecurityGuardian
          </motion.h1>
          <motion.p 
            className="text-blue-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ウェブサイトのセキュリティ脆弱性を迅速にスキャンし、
            セキュリティリスクに対する理解と対策を支援します。
          </motion.p>
        </div>
      </div>
    </header>
  );
};

export default Header;
