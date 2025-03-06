
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section>
      <div className="bg-gradient-to-r from-indigo-100 to-purple-200 rounded-xl p-8 text-center shadow-lg border border-indigo-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">今すぐ始めましょう</h2>
          <p className="max-w-2xl mx-auto mb-6 text-gray-700">
            文唱堂印刷のGX × AIプロダクトで、ビジネスと環境の両立を実現。無料相談で、最適なソリューションをご提案します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800
                shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                お問い合わせ
              </Button>
            </Link>
            <Link to="/sustainability-check">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                  shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all 
                  duration-200 flex items-center gap-2"
              >
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-1 text-yellow-300" /> 
                  <Leaf className="h-5 w-5 mr-1 text-green-300" /> 
                  <span>サステナビリティ診断を試す</span>
                </div>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
