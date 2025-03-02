
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Recycle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CallToAction from '@/components/shared/CallToAction';

const GXLogistics = () => {
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
                  <Truck className="mr-3 h-8 w-8" />
                  GX物流サービス
                </h1>
                <p className="text-lg opacity-90 mb-6">
                  デジタル技術と環境配慮を融合した次世代物流ソリューション。サプライチェーン全体のグリーントランスフォーメーションを実現します。
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
          <h2 className="text-2xl font-bold mb-8 text-center">GX物流サービス内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">01</Badge>
                  ゼロエミッション物流
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  EV車両100%と再生可能エネルギーで稼働する物流センターにより、物流プロセス全体でCO2排出ゼロを実現。地球温暖化対策に貢献します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">02</Badge>
                  AIルート最適化
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  人工知能による配送ルート最適化で、走行距離・時間・燃料を最小化。リアルタイムの交通データと気象条件を考慮した動的ルート設計を実現します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">03</Badge>
                  循環型パッケージングシステム
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  使い捨て包装材をゼロにする完全循環型パッケージングシステム。IoTセンサー搭載の再利用可能コンテナで、場所や状態のリアルタイム管理も可能にします。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">04</Badge>
                  ブロックチェーン追跡システム
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  ブロックチェーン技術を活用した透明性の高いサプライチェーン管理。原材料の調達から製品の配送まで、環境影響を含むすべての情報をセキュアに記録・共有します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">05</Badge>
                  デジタルツイン物流
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  物流ネットワーク全体のデジタルツインを構築し、あらゆるシナリオをシミュレーション。環境負荷とコストの最適バランスを見つけ、継続的に改善します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100 hover:border-teal-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-teal-100 text-teal-800">06</Badge>
                  サーキュラーエコノミー連携
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  製品回収・リサイクルのリバースロジスティクスシステムを構築。素材の循環利用を促進し、廃棄物ゼロのサプライチェーンを実現します。
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
                <CardTitle>大手電機メーカー様</CardTitle>
                <Badge className="bg-teal-100 text-teal-800">サプライチェーン全体最適化</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  AIルート最適化とEV物流の導入で、物流CO2排出量を70%削減。ブロックチェーン追跡システムにより、部品調達から製品配送までの環境影響の透明性を確保しました。
                </p>
                <p className="text-gray-700 font-semibold">
                  結果: 国際的なサステナビリティ評価でトップランクを獲得、物流コスト25%削減
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle>アパレル企業グループ様</CardTitle>
                <Badge className="bg-teal-100 text-teal-800">循環型物流システム</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  再利用可能輸送コンテナとリバースロジスティクスシステムの導入により、包装廃棄物を年間200トン削減。顧客からの使用済み製品回収も物流システムに統合しました。
                </p>
                <p className="text-gray-700 font-semibold">
                  結果: 環境配慮型ブランドとしての評価向上と顧客ロイヤルティ強化
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

export default GXLogistics;
