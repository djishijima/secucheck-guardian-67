
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Tag, Sparkles } from 'lucide-react';
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
    <section id="product-hero" className="py-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 -z-10"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="20" cy="20" r="3" fill="#4F46E5"></circle>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {isPlaceholderImage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-indigo-800 font-medium mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>{subtitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">{description}</p>
            
            {categories && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.function && (
                  <span className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Tag className="h-3 w-3" />
                    {categories.function}
                  </span>
                )}
                {categories.technology && (
                  <span className="flex items-center gap-1 bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Tag className="h-3 w-3" />
                    {categories.technology}
                  </span>
                )}
                {categories.challenge && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Tag className="h-3 w-3" />
                    {categories.challenge}
                  </span>
                )}
              </div>
            )}
            
            <Link to={ctaLink}>
              <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                {ctaText}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-indigo-800 font-medium mb-6 shadow-sm">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>{subtitle}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{description}</p>
              
              {categories && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {categories.function && (
                    <span className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
                      <Tag className="h-3 w-3" />
                      {categories.function}
                    </span>
                  )}
                  {categories.technology && (
                    <span className="flex items-center gap-1 bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1.5 rounded-full">
                      <Tag className="h-3 w-3" />
                      {categories.technology}
                    </span>
                  )}
                  {categories.challenge && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">
                      <Tag className="h-3 w-3" />
                      {categories.challenge}
                    </span>
                  )}
                </div>
              )}
              
              <Link to={ctaLink}>
                <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  {ctaText}
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-3">
                {/* Inner shadow/glow effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl shadow-inner"></div>
                </div>
                
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductHeroSection;
