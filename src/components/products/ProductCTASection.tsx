
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Leaf, Sparkles } from 'lucide-react';

interface ProductCTASectionProps {
  ctaText: string;
  ctaLink: string;
}

const ProductCTASection: React.FC<ProductCTASectionProps> = ({ ctaText, ctaLink }) => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-indigo-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="h-8 w-8 text-green-300 mr-2" />
          <Sparkles className="h-8 w-8 text-yellow-300" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-white">今すぐ持続可能な未来へ</h2>
        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
          環境に配慮した選択が、ビジネスと地球の両方にとって大きな違いを生み出します。
          文唱堂印刷のGX製品とAIソリューションで、サステナブルな未来を構築しましょう。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ctaLink}>
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              {ctaText}
            </Button>
          </Link>
          <Link to="/sustainability-check">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              サステナビリティ診断を試す
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCTASection;
