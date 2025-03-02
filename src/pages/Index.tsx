
import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Database, Globe, Search, ShoppingCart, Filter, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ヒーローセクション */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-lg text-white">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="block">文唱堂印刷の</span>
                  <span className="text-yellow-300">GX x AI</span> プロダクトマーケットプレイス
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  持続可能な未来のために。最先端AIと環境配慮型印刷技術の融合で、ビジネスのサステナビリティを加速します。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
                    製品を探す <Search className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    詳細を見る <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 検索・フィルターセクション */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="GXまたはAI製品を検索..."
                className="pl-10 w-full"
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
            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer">すべて</Badge>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">AI製品</Badge>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">GX製品</Badge>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">印刷サービス</Badge>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">データ分析</Badge>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">サステナブル</Badge>
          </div>
        </section>

        {/* 製品リストセクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Database className="mr-2 h-6 w-6 text-indigo-600" />
            おすすめ製品
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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
        </section>

        {/* 特徴セクション */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">GX x AIの力で、ビジネスを変革</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Printer className="h-12 w-12 text-indigo-600 mb-2" />
                <CardTitle>環境配慮型印刷</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  再生可能素材と省エネルギー技術を活用した、環境負荷の少ない印刷サービスを提供します。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Database className="h-12 w-12 text-indigo-600 mb-2" />
                <CardTitle>AI分析技術</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  高度な機械学習モデルによるデータ分析で、ビジネス意思決定を支援し、効率化を実現します。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-indigo-600 mb-2" />
                <CardTitle>持続可能なソリューション</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  SDGsに沿った持続可能なビジネスモデルの構築を支援し、企業の社会的責任を促進します。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTAセクション */}
        <section>
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">今すぐ始めましょう</h2>
            <p className="max-w-2xl mx-auto mb-6 text-gray-700">
              文唱堂印刷のGX x AIプロダクトで、ビジネスと環境の両立を実現。無料相談で、最適なソリューションをご提案します。
            </p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              お問い合わせ
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
