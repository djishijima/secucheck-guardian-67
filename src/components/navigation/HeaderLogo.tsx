
import React from 'react';
import { Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const HeaderLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center"
    >
      <Link to="/" className="flex items-center">
        <Printer className="h-8 w-8 text-indigo-600 mr-2" />
        <div className="text-lg font-semibold">
          <span className="text-indigo-700">文唱堂印刷</span>
          <span className="text-sm text-gray-500 block md:inline md:ml-2">サステナブルDX</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default HeaderLogo;
