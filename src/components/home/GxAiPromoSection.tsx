
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const GxAiPromoSection: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
      <h3 className="text-lg font-semibold mb-2 text-blue-800">GX×AI製品の特徴</h3>
      <p className="text-gray-700 mb-4">
        これらのGX×AI製品は、印刷・出版サービスと組み合わせることで、より包括的なサステナビリティ戦略を提供します。
        特にサプライチェーンAI監査やエコデザインAIは、企業のSDGsやカーボンニュートラル目標達成に大きく貢献します。
      </p>
      <Link to="/gx-ai-products">
        <Button variant="outline" className="bg-white hover:bg-blue-50 border-blue-200 text-blue-700">
          GX×AI製品の詳細を見る
        </Button>
      </Link>
    </div>
  );
};

export default GxAiPromoSection;
