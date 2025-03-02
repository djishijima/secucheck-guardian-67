
import React from 'react';
import { motion } from 'framer-motion';

interface ProductBenefitsSectionProps {
  benefits: string[];
}

const ProductBenefitsSection: React.FC<ProductBenefitsSectionProps> = ({ benefits }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">導入メリット</h2>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start"
              >
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductBenefitsSection;
