
import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  benefits: string[];
  features: {
    title: string;
    description: string;
    icon: ReactNode;
  }[];
  ctaText?: string;
  ctaLink?: string;
  additionalContent?: ReactNode;
  categories?: {
    function?: string;
    technology?: string;
    challenge?: string;
  };
}

const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  benefits,
  features,
  ctaText = "今すぐ注文する",
  ctaLink = "/contact",
  additionalContent,
  categories
}) => {
  // Check if the image is a placeholder or missing
  const isPlaceholderImage = imageUrl === '/placeholder.svg' || !imageUrl;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* ヒーローセクション */}
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

        {/* 特徴セクション */}
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

        {/* メリットセクション */}
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

        {/* 追加コンテンツ */}
        {additionalContent && additionalContent}

        {/* CTAセクション */}
        <section className="bg-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">今すぐ持続可能な未来へ</h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              環境に配慮した選択が、ビジネスと地球の両方にとって大きな違いを生み出します。
              今日から始めましょう。
            </p>
            <Link to={ctaLink}>
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                {ctaText}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPageLayout;
