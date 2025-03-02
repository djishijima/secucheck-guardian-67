
import React from 'react';
import { Database } from 'lucide-react';
import ProductCard from './ProductCard';

// サンプル製品データ
const products = [
  {
    id: 1,
    title: "AIドキュメント分析ツール",
    description: "ビジネス文書をAIが分析し、重要なインサイトを抽出します。効率的な情報管理を実現します。",
    price: 29800,
    category: "データ分析",
    tags: ["AI", "文書管理", "分析"]
  },
  {
    id: 2,
    title: "GXプリントオンデマンド",
    description: "高品質なグリーントランスフォーメーション印刷を、必要な時に必要な分だけ。環境に配慮した印刷サービス。",
    price: 15000,
    category: "印刷サービス",
    tags: ["GX", "環境配慮", "オンデマンド"]
  },
  {
    id: 3,
    title: "AI翻訳・多言語印刷パッケージ",
    description: "AIによる高精度翻訳と多言語対応の印刷をワンストップで提供。グローバルビジネスをサポートします。",
    price: 48000,
    category: "多言語サービス",
    tags: ["AI", "翻訳", "グローバル"]
  },
  {
    id: 4,
    title: "持続可能素材カタログ生成システム",
    description: "環境に優しい素材のみを使用したカタログをAIがデザイン。SDGsに配慮した企業ブランディングに。",
    price: 35000,
    category: "サステナブル",
    tags: ["GX", "SDGs", "デザイン"]
  }
];

const ProductListSection = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Database className="mr-2 h-6 w-6 text-indigo-600" />
        おすすめ製品
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductListSection;
