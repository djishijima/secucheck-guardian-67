
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCategories } from './ProductPageLayout';

interface ProductHeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  categories?: ProductCategories;
}

const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  ctaText,
  ctaLink,
  categories
}) => {
  // Check if the image is a placeholder or missing
  const isPlaceholderImage = imageUrl === '/placeholder.svg' || !imageUrl;

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        {isPlaceholderImage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-indigo-600 mb-4">{subtitle}</p>
            <p className="text-gray-600 mb-6">{description}</p>
            {categories && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categories.function && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {categories.function}
                  </span>
                )}
                {categories.technology && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {categories.technology}
                  </span>
                )}
                {categories.challenge && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {categories.challenge}
                  </span>
                )}
              </div>
            )}
            <Link to={ctaLink}>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {ctaText}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
                <p className="text-xl text-indigo-600 mb-4">{subtitle}</p>
                <p className="text-gray-600 mb-6">{description}</p>
                {categories && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.function && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {categories.function}
                      </span>
                    )}
                    {categories.technology && (
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {categories.technology}
                      </span>
                    )}
                    {categories.challenge && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {categories.challenge}
                      </span>
                    )}
                  </div>
                )}
                <Link to={ctaLink}>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {ctaText}
                  </Button>
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg overflow-hidden shadow-xl bg-white"
              >
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductHeroSection;
