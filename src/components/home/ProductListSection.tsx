
import React, { useState } from 'react';
import { Leaf, Cpu, BarChart3, Truck, Languages, Palette, Target, ShieldCheck, GraduationCap } from 'lucide-react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 既存の製品データを新しいカテゴライズで更新
const existingProducts = [
  {
    id: 1,
    title: "エコプリンティング",
    description: "環境に配慮した素材と工程による印刷サービス。CO2排出量を従来比30%削減し、持続可能な企業活動に貢献します。",
    price: 15000,
    categories: {
      function: "印刷・出版サービス",
      technology: "バイオマテリアル製品",
      challenge: "ESG対応支援"
    },
    tags: ["環境配慮", "SDGs", "CO2削減"],
    icon: <Leaf className="h-12 w-12 text-green-600" />,
    link: "/eco-printing"
  },
  {
    id: 2,
    title: "GXプリントオンデマンド",
    description: "グリーントランスフォーメーションを推進する高品質印刷。バイオマスインクと再生可能エネルギーによる製造で環境負荷を最小限に。",
    price: 18000,
    categories: {
      function: "印刷・出版サービス",
      technology: "バイオマテリアル製品",
      challenge: "カーボンフットプリント削減"
    },
    tags: ["GX", "環境配慮", "オンデマンド"],
    icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
    link: "/gx-printing"
  },
  {
    id: 3,
    title: "AI翻訳・多言語印刷パッケージ",
    description: "40以上の言語に対応するAI翻訳と印刷をワンストップで提供。グローバルビジネスの拡大をサポートします。",
    price: 48000,
    categories: {
      function: "印刷・出版サービス",
      technology: "AI活用製品",
      challenge: "サステナブルブランディング"
    },
    tags: ["AI", "翻訳", "グローバル"],
    icon: <Languages className="h-12 w-12 text-purple-600" />,
    link: "#"
  },
  {
    id: 4,
    title: "GXロジスティクス",
    description: "エコフレンドリーな配送システムで、印刷から配送までのカーボンフットプリントを最小化。電気自動車と最適化された配送ルートで環境負荷を削減。",
    price: 22000,
    categories: {
      function: "物流・配送サービス",
      technology: "再生可能エネルギー製品",
      challenge: "カーボンフットプリント削減"
    },
    tags: ["GX", "物流", "カーボンニュートラル"],
    icon: <Truck className="h-12 w-12 text-teal-600" />,
    link: "/gx-logistics"
  }
];

// 新しいGX×AI製品データも新しいカテゴライズに更新
const gxAiProducts = [
  {
    id: 5,
    title: "GXエコデザインAI",
    description: "AIを活用して環境に配慮した製品デザインを最適化。素材選定や製造プロセスにおけるCO2排出量削減とサステナブルなパッケージデザインの自動生成。",
    price: 25000,
    categories: {
      function: "デザイン・マーケティング",
      technology: "AI活用製品",
      challenge: "サステナブルブランディング"
    },
    tags: ["GX", "AI", "LCA"],
    icon: <Palette className="h-12 w-12 text-green-600" />,
    link: "/gx-eco-design"
  },
  {
    id: 6,
    title: "GX AIエネルギーマネジメント",
    description: "AIを活用して企業のエネルギー使用状況をリアルタイムで最適化。再生可能エネルギーの利用比率を最大化し、効率的な運用を提案します。",
    price: 30000,
    categories: {
      function: "エネルギー管理",
      technology: "AI活用製品",
      challenge: "カーボンフットプリント削減"
    },
    tags: ["GX", "AI", "カーボンニュートラル"],
    icon: <Cpu className="h-12 w-12 text-blue-600" />,
    link: "/gx-energy-management"
  },
  {
    id: 7,
    title: "GXサステナブルマーケティングAI",
    description: "消費者の環境意識データを分析し、サステナビリティに特化したマーケティング戦略を提供。市場トレンド予測とESGレポート作成を支援します。",
    price: 35000,
    categories: {
      function: "デザイン・マーケティング",
      technology: "AI活用製品",
      challenge: "サステナブルブランディング"
    },
    tags: ["GX", "AI", "ESG"],
    icon: <Target className="h-12 w-12 text-purple-600" />,
    link: "/gx-sustainable-marketing"
  },
  {
    id: 8,
    title: "GXサプライチェーンAI監査",
    description: "サプライチェーン全体での環境負荷やCO2排出量をAIが監査。Scope1〜3に対応した排出量診断と改善プランを提供します。",
    price: 40000,
    categories: {
      function: "監査・分析",
      technology: "AI活用製品",
      challenge: "ESG対応支援"
    },
    tags: ["GX", "AI", "サプライチェーン"],
    icon: <ShieldCheck className="h-12 w-12 text-teal-600" />,
    link: "/gx-supply-chain-audit"
  },
  {
    id: 9,
    title: "GX教育・研修AIプラットフォーム",
    description: "AIを活用した従業員向けのサステナビリティ教育・研修プラットフォーム。個別学習プランの作成と進捗管理を自動化します。",
    price: 20000,
    categories: {
      function: "教育・研修",
      technology: "AI活用製品",
      challenge: "ESG対応支援"
    },
    tags: ["GX", "AI", "人材育成"],
    icon: <GraduationCap className="h-12 w-12 text-amber-600" />,
    link: "/gx-education-platform"
  }
];

// 全製品
const allProducts = [...existingProducts, ...gxAiProducts];

const ProductListSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // タブとカテゴリに基づいて表示する製品をフィルタリング
  const filteredProducts = allProducts.filter(product => {
    // タブによるフィルタリング
    const matchesTab = activeTab === "all" || 
      (activeTab === "function" && product.categories && product.categories.function) || 
      (activeTab === "technology" && product.categories && product.categories.technology) || 
      (activeTab === "challenge" && product.categories && product.categories.challenge);
    
    // カテゴリによるフィルタリング
    let matchesCategory = true;
    if (activeCategory !== "all") {
      // カテゴリフィルタの形式: "type:value" (例: "function:印刷・出版サービス")
      const [type, value] = activeCategory.split(':');
      if (product.categories && type && value) {
        matchesCategory = product.categories[type] === value;
      }
    }
    
    return matchesTab && matchesCategory;
  });

  // 機能カテゴリの一覧
  const functionCategories = [
    {id: "all", name: "すべて"},
    {id: "function:印刷・出版サービス", name: "印刷・出版サービス"},
    {id: "function:物流・配送サービス", name: "物流・配送サービス"},
    {id: "function:エネルギー管理", name: "エネルギー管理"},
    {id: "function:デザイン・マーケティング", name: "デザイン・マーケティング"},
    {id: "function:教育・研修", name: "教育・研修"},
    {id: "function:監査・分析", name: "監査・分析"}
  ];

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-green-600" />
          サステナブル製品
        </h2>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          すべての製品を見る →
        </Link>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">すべての製品</TabsTrigger>
          <TabsTrigger value="function">機能別</TabsTrigger>
          <TabsTrigger value="technology">技術別</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* 機能カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-6">
        {functionCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {activeTab === "technology" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
          <h3 className="text-lg font-semibold mb-2 text-indigo-800">GX×AI製品の特徴</h3>
          <p className="text-gray-700 mb-4">
            これらの新しいGX×AI製品は、既存の商品ラインアップと組み合わせることで、より包括的なサステナビリティ戦略を提供します。
            特にサプライチェーンAI監査やエコデザインAIは、企業のSDGsやカーボンニュートラル目標達成に大きく貢献します。
          </p>
          <Link to="/gx-ai-products">
            <Button variant="outline" className="bg-white hover:bg-indigo-50">
              GX×AI製品の詳細を見る
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductListSection;
