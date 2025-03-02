
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Leaf, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CallToAction from '@/components/shared/CallToAction';

const EcoLogistics = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                  <Truck className="mr-3 h-8 w-8" />
                  環境物流サービス
                </h1>
                <p className="text-lg opacity-90 mb-6">
                  環境負荷を最小限に抑えた配送システムと包装資材で、サプライチェーン全体のサステナビリティを実現します。
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  無料相談を予約する <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* サービス内容セクション */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">環境物流サービス内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">01</Badge>
                  低炭素配送
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  電気自動車、ハイブリッド車、バイオ燃料車を活用した低炭素な配送システム。最適なルート設計により、燃料消費とCO2排出を最小化します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">02</Badge>
                  エコパッケージング
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  リサイクル素材、生分解性素材を使用した環境配慮型包装。最小限の資材で最大限の保護機能を実現する設計技術で、廃棄物を削減します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">03</Badge>
                  共同配送システム
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  複数企業の配送を一元化し、トラック台数と走行距離を削減。空車率の低減とCO2排出量の大幅削減を実現します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">04</Badge>
                  再利用可能コンテナ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  使い捨て包装資材を廃止し、耐久性の高い再利用可能コンテナを導入。回収・洗浄システムにより、長期的な資源効率と廃棄物削減を実現します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">05</Badge>
                  排出量可視化
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  物流プロセス全体のCO2排出量をリアルタイムで計測・可視化。詳細なデータに基づいた改善提案とレポーティングで、継続的な環境負荷低減を支援します。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Badge className="mr-2 bg-green-100 text-green-800">06</Badge>
                  モーダルシフト
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  トラック輸送から鉄道・船舶輸送への転換を促進。長距離輸送におけるCO2排出量を大幅に削減し、輸送効率を向上させます。
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
                <CardTitle>大手通販企業様</CardTitle>
                <Badge className="bg-green-100 text-green-800">配送システム最適化</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  電気自動車フリートと再利用可能パッケージの導入により、配送におけるCO2排出量を年間2,500トン削減。顧客満足度も向上しました。
                </p>
                <p className="text-gray-700 font-semibold">
                  結果: 環境負荷削減とコスト削減の両立、サステナビリティ報告書での高評価獲得
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>食品メーカー様</CardTitle>
                <Badge className="bg-green-100 text-green-800">共同配送システム導入</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  同業他社との共同配送システム構築により、配送車両数を40%削減。積載率の向上と最適ルート設計で、燃料消費とCO2排出量を大幅に削減しました。
                </p>
                <p className="text-gray-700 font-semibold">
                  結果: 年間物流コスト30%削減と環境負荷の大幅軽減
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

export default EcoLogistics;
