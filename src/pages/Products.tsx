
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Filter, ArrowRight, Database, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// サンプル製品データ（拡張版）
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
  },
  {
    id: 5,
    title: "カーボンニュートラル名刺印刷",
    description: "CO2排出量ゼロの名刺印刷サービス。環境に配慮した素材と再生可能エネルギーで制作します。",
    price: 8000,
    category: "名刺・カード",
    tags: ["GX", "カーボンニュートラル", "名刺"]
  },
  {
    id: 6,
    title: "AI画像最適化エンジン",
    description: "印刷物の画像をAIが自動で最適化。色彩や解像度を調整し、最高品質の仕上がりを保証します。",
    price: 19800,
    category: "画像処理",
    tags: ["AI", "画像処理", "最適化"]
  },
  {
    id: 7,
    title: "バイオインク印刷セット",
    description: "生分解性の高いバイオインクを使用した環境配慮型印刷セット。企業のESG対応を強力にサポート。",
    price: 42000,
    category: "インク・素材",
    tags: ["GX", "バイオインク", "ESG"]
  },
  {
    id: 8,
    title: "スマートパッケージングシステム",
    description: "AIとIoTを活用した次世代パッケージング。QRコードから詳細情報にアクセス可能な印刷技術。",
    price: 53000,
    category: "パッケージング",
    tags: ["AI", "IoT", "スマート"]
  }
];

// カテゴリー一覧
const categories = ["すべて", "データ分析", "印刷サービス", "多言語サービス", "サステナブル", "名刺・カード", "画像処理", "インク・素材", "パッケージング"];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [searchTerm, setSearchTerm] = useState("");

  // 製品フィルター処理
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "すべて" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">製品一覧</h1>
                <p className="text-lg opacity-90 mb-4">
                  GXとAIを融合した革新的な製品とサービスをご紹介します。環境に配慮しながら、ビジネスの可能性を広げるソリューションを見つけてください。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 検索・フィルターセクション */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="製品を検索..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-1/3 justify-end">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> フィルター
              </Button>
              <Button variant="outline" className="gap-2">
                <ShoppingCart className="h-4 w-4" /> カート
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {categories.map((category) => (
              <Badge 
                key={category}
                className={`cursor-pointer ${
                  selectedCategory === category 
                    ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </section>

        {/* 製品リストセクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Database className="mr-2 h-6 w-6 text-indigo-600" />
            {selectedCategory === "すべて" ? "全製品" : selectedCategory}
            <span className="ml-2 text-gray-500 text-sm font-normal">({filteredProducts.length}件)</span>
          </h2>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full flex flex-col overflow-hidden border-gray-200 hover:border-indigo-300 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{product.title}</CardTitle>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm">
                        {product.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t pt-4">
                      <p className="font-semibold">¥{product.price.toLocaleString()}</p>
                      <Button size="sm">
                        <ShoppingCart className="mr-2 h-4 w-4" /> カートに追加
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4"><Search className="h-12 w-12 mx-auto" /></div>
              <h3 className="text-xl font-semibold mb-2">検索結果がありません</h3>
              <p className="text-gray-600 mb-4">検索条件を変更して、再度お試しください。</p>
              <Button 
                variant="outline" 
                onClick={() => {setSearchTerm(""); setSelectedCategory("すべて");}}
              >
                すべての製品を表示
              </Button>
            </div>
          )}
        </section>

        {/* CTAセクション */}
        <section>
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">お探しの製品が見つかりませんか？</h2>
            <p className="max-w-2xl mx-auto mb-6 text-gray-700">
              文唱堂印刷では、お客様のニーズに合わせたカスタムソリューションもご提供しています。専門スタッフがお客様の要望をヒアリングし、最適な提案をいたします。
            </p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <BookOpen className="mr-2 h-5 w-5" /> 無料相談を予約する
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
