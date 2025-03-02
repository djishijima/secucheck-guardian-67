
import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import ProductHeroSection from './ProductHeroSection';
import ProductFeaturesSection from './ProductFeaturesSection';
import ProductBenefitsSection from './ProductBenefitsSection';
import ProductCTASection from './ProductCTASection';

export interface ProductCategories {
  function?: string;
  technology?: string;
  challenge?: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface ProductPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  benefits: string[];
  features: ProductFeature[];
  ctaText?: string;
  ctaLink?: string;
  additionalContent?: ReactNode;
  categories?: ProductCategories;
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
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <ProductHeroSection 
          title={title}
          subtitle={subtitle}
          description={description}
          imageUrl={imageUrl}
          ctaText={ctaText}
          ctaLink={ctaLink}
          categories={categories}
        />

        <ProductFeaturesSection features={features} />

        <ProductBenefitsSection benefits={benefits} />

        {/* 追加コンテンツ */}
        {additionalContent && additionalContent}

        <ProductCTASection ctaText={ctaText} ctaLink={ctaLink} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPageLayout;
