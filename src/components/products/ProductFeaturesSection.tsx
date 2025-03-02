
import React from 'react';
import { motion } from 'framer-motion';
import { ProductFeature } from './ProductPageLayout';

interface ProductFeaturesSectionProps {
  features: ProductFeature[];
}

const ProductFeaturesSection: React.FC<ProductFeaturesSectionProps> = ({ features }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">主な特徴</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;
