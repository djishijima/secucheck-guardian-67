
import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Recycle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CallToAction from '@/components/shared/CallToAction';

const GXPrinting = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-8 text-white">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                  <Recycle className="mr-3 h-8 w-8" />
                  GX印刷サービス
                </h1>
                <p className="text-lg opacity-90 mb-6">
                  最先端の印刷技術と環境配慮を融合させたグリーントランスフォーメーション印刷サービス。従来の印刷の概念を覆し、持続可能な社会実現に貢献します。
                </p>
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100">
                  無料相談を予約する <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* サービス内容セクション */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">GX印刷サービス内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">01</Badge>
                  カーボンニュートラル印刷
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  印刷工程におけるCO2排出量をゼロに。再生可能エネルギーを100%使用した印刷設備と、排出量に応じたカーボンクレジット購入によるオフセットで実現します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">02</Badge>
                  循環型印刷素材
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  生分解性素材、リサイクル素材、再生可能素材を活用した印刷。製品ライフサイクル全体を設計し、廃棄後も環境負荷を最小限に抑えます。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">03</Badge>
                  デジタルトランスフォーメーション連携
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  デジタルとフィジカルを融合。QRコードやARを活用し、紙媒体の価値を高めながら、情報更新コストと資源消費を削減します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">04</Badge>
                  ライフサイクルアセスメント
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  製品の原材料調達から廃棄までの環境影響を科学的に評価。詳細なデータに基づいたサステナビリティレポートを提供し、企業のESG活動をサポートします。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">05</Badge>
                  バイオマスインク技術
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  植物由来の原料を75%以上使用した独自開発のバイオマスインク。高品質な印刷表現を維持しながら、環境負荷を大幅に削減します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">06</Badge>
                  サーキュラーエコノミー対応
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  使用後の印刷物回収・リサイクルシステムの構築。素材ごとの適切な分別と再資源化により、廃棄ゼロを目指します。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 事例セクション */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">導入事例</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle>サステナブルファッションブランド様</CardTitle>
                <Badge className="bg-teal-100 text-teal-800">ブランドカタログ</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  完全循環型素材を使用したカタログ制作。使用後はコンポスト化可能な素材設計により、廃棄時の環境負荷をゼロに。QRコード連携で最新情報へのアクセスも実現しました。
                </p>
                <p className="text-gray-700 font-semibold">
                  結果: サステナビリティアワード受賞と、ブランド認知度の大幅向上
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle>大手飲料メーカー様</CardTitle>
                <Badge className="bg-teal-100 text-teal-800">プロモーション資材</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  カーボンニュートラル印刷とAR技術を組み合わせたプロモーション展開。紙の使用量を60%削減しながら、デジタルコンテンツとの連携で顧客体験を向上させました。
                </p>
                <p className="text-gray-700 font-semibold">
                  結果: 環境負荷削減と顧客エンゲージメント向上の両立
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTAセクション */}
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default GXPrinting;
