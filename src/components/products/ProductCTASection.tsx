
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface ProductCTASectionProps {
  ctaText: string;
  ctaLink: string;
}

const ProductCTASection: React.FC<ProductCTASectionProps> = ({ ctaText, ctaLink }) => {
  return (
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
  );
};

export default ProductCTASection;
