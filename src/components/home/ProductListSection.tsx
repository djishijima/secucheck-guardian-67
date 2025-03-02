
import React from 'react';
import { Database, Leaf } from 'lucide-react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

// 更新した製品データ
const products = [
  {
    id: 1,
    title: "エコプリンティング",
    description: "環境に配慮した素材と工程による印刷サービス。CO2排出量を従来比30%削減し、持続可能な企業活動に貢献します。",
    price: 15000,
    category: "印刷サービス",
    tags: ["環境配慮", "SDGs", "CO2削減"],
    image: "/images/eco-printing.jpg",
    link: "/eco-printing"
  },
  {
    id: 2,
    title: "GXプリントオンデマンド",
    description: "グリーントランスフォーメーションを推進する高品質印刷。バイオマスインクと再生可能エネルギーによる製造で環境負荷を最小限に。",
    price: 18000,
    category: "印刷サービス",
    tags: ["GX", "環境配慮", "オンデマンド"],
    image: "/images/gx-printing.jpg",
    link: "/gx-printing"
  },
  {
    id: 3,
    title: "AI翻訳・多言語印刷パッケージ",
    description: "40以上の言語に対応するAI翻訳と印刷をワンストップで提供。グローバルビジネスの拡大をサポートします。",
    price: 48000,
    category: "多言語サービス",
    tags: ["AI", "翻訳", "グローバル"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: 4,
    title: "GXロジスティクス",
    description: "エコフレンドリーな配送システムで、印刷から配送までのカーボンフットプリントを最小化。電気自動車と最適化された配送ルートで環境負荷を削減。",
    price: 22000,
    category: "物流サービス",
    tags: ["GX", "物流", "カーボンニュートラル"],
    image: "/images/gx-logistics.jpg",
    link: "/gx-logistics"
  }
];

const ProductListSection = () => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-green-600" />
          サステナブル製品
        </h2>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          すべての製品を見る →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductListSection;
