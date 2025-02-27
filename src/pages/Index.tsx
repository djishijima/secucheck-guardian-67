
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SecurityScanner from '@/components/SecurityScanner';
import SecurityEducation from '@/components/SecurityEducation';
import Footer from '@/components/Footer';

const Index = () => {
  // Animation variants for staggered entries
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <motion.div
          className="max-w-4xl mx-auto px-4 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <SecurityScanner />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <SecurityEducation />
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
