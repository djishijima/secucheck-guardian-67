
import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Leaf, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CallToAction from '@/components/shared/CallToAction';

const EcoPrinting = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                  <Leaf className="mr-3 h-8 w-8" />
                  環境印刷サービス
                </h1>
                <p className="text-lg opacity-90 mb-6">
                  自然環境に配慮した印刷技術と素材を使用し、企業のサステナビリティ目標達成をサポートする環境印刷サービスをご提供しています。
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  無料相談を予約する <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">環境印刷の特徴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">01</Badge>
                  環境に優しい素材
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  FSC認証紙、再生紙、非木材紙など、環境負荷の少ない素材を使用。バイオマスインクや植物油インクなど、VOC（揮発性有機化合物）の発生を抑えた印刷素材を採用しています。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">02</Badge>
                  省エネルギー印刷
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  最新の省エネ印刷機器を導入し、印刷工程におけるエネルギー消費を大幅に削減。LED-UV印刷技術により、従来の印刷方式と比較して電力使用量を最大40%削減しています。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">03</Badge>
                  廃棄物削減
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  印刷工程で発生する廃棄物を最小限に抑え、再利用・リサイクルを徹底。水なし印刷方式を採用し、有害な化学物質の使用と排出を削減しています。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">04</Badge>
                  カーボンオフセット
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  印刷工程で発生するCO2を算出し、森林保全や再生可能エネルギープロジェクトへの投資を通じてカーボンオフセットを実施。カーボンニュートラルな印刷物を提供します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">05</Badge>
                  環境認証取得
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  ISO 14001、FSC認証、グリーンプリンティング認定など、国際的な環境基準に準拠した印刷サービスを提供。第三者機関による認証で、環境への取り組みの信頼性を担保しています。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">06</Badge>
                  環境報告書作成
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  お客様の印刷物に関する環境影響評価レポートを提供。CO2排出量、資源使用量、廃棄物削減量などを可視化し、企業のESG報告やサステナビリティ報告書作成をサポートします。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 事例セクション */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">導入事例</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>大手化粧品メーカー様</CardTitle>
                <Badge className="bg-green-100 text-green-800">製品カタログ</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  従来のカタログと比較して、CO2排出量を35%削減。植物由来インクと再生紙を使用し、環境に配慮しながらも高級感のあるカタログ制作を実現しました。
                </p>
                <p className="text-gray-700 font-semibold">
                  結果: 取引先からの環境配慮への高評価と、消費者からのブランドイメージ向上
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>食品製造会社様</CardTitle>
                <Badge className="bg-green-100 text-green-800">パッケージ印刷</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  食品パッケージを環境配慮型素材に切り替え、生分解性のあるバイオマスインクを使用。パッケージのライフサイクル全体でのCO2排出量を50%削減しました。
                </p>
                <p className="text-gray-700 font-semibold">
                  結果: 環境に配慮した企業としてのブランド価値向上と、新規顧客層の開拓
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

export default EcoPrinting;
