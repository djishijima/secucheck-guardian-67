
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, TreePine, Wind, Droplets, Factory, Award, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutGX = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ヒーローセクション */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 md:p-12 shadow-lg text-white">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  グリーントランスフォーメーション（GX）の取り組み
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  文唱堂印刷は、持続可能な社会の実現に向けて、印刷業界におけるグリーントランスフォーメーションを推進しています。
                </p>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  GX製品を見る <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* GXとは？セクション */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">GXとは？</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                グリーントランスフォーメーション（GX）とは、企業や社会が環境負荷を低減し、持続可能な経済システムへ移行するための変革を指します。気候変動対策や資源循環、生物多様性保全などの環境課題に対応するため、ビジネスモデルや生産プロセスを根本から見直し、環境と経済の両立を図る取り組みです。
              </p>
              <p className="text-gray-700 mb-4">
                文唱堂印刷では、この概念を中核に据え、印刷産業におけるGXの先駆者として、持続可能な未来の実現に貢献します。私たちは、環境に配慮した素材選びから省エネルギー技術の導入、廃棄物削減まで、バリューチェーン全体を通じて環境負荷の低減に取り組んでいます。
              </p>
            </div>
          </div>
        </section>

        {/* 私たちのGX取り組みセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">私たちのGX取り組み</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>サステナブル素材</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  FSC認証紙やリサイクル素材、バイオマスインクなど、環境負荷の少ない素材を積極的に採用しています。また、独自開発のバイオインクは、生分解性に優れ、環境への影響を最小限に抑えます。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Recycle className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>ゼロウェイスト生産</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  生産工程で発生する廃棄物を削減し、リサイクルを徹底することで、埋立廃棄物ゼロを目指しています。裁断くずや余剰紙は、新たな紙製品へと再生されます。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TreePine className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>カーボンオフセット</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  印刷工程で発生するCO2を算出し、森林保全プロジェクトへの投資を通じてカーボンオフセットを実施。お客様の印刷物がカーボンニュートラルとなるよう支援しています。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Wind className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>再生可能エネルギー</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  工場の電力を100%再生可能エネルギーに切り替え、太陽光発電パネルの設置により、自家発電も推進。エネルギー効率の高い最新設備への投資も行っています。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Droplets className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>水資源保護</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  水性インクの採用と高度な水処理システムにより、水質汚染を防止。印刷工程での水使用量も削減し、貴重な水資源の保護に貢献しています。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Factory className="h-12 w-12 text-green-600 mb-2" />
                <CardTitle>グリーンサプライチェーン</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  調達から配送まで、サプライチェーン全体での環境負荷低減を推進。取引先にも環境基準を設け、持続可能な事業運営を奨励しています。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 環境認証セクション */}
        <section className="mb-16 bg-gray-100 rounded-xl p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
              <Award className="mr-2 h-6 w-6 text-green-600" />
              取得認証・受賞歴
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-3">環境認証</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    ISO 14001（環境マネジメントシステム）
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    FSC認証（森林管理協議会）
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    カーボンニュートラル認証
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    エコマーク認定事業者
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    グリーンプリンティング認定
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-3">受賞歴</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    2023年 環境経営大賞
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    2022年 グリーンイノベーションアワード
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    2021年 サステナブルプリンティング優秀賞
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    2020年 環境配慮型企業表彰
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    2019年 資源循環技術・システム表彰
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section>
          <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">サステナブルな印刷で、未来を変える</h2>
            <p className="max-w-2xl mx-auto mb-6 text-gray-700">
              文唱堂印刷のGX技術を活用して、あなたのビジネスも環境に配慮したものに変えてみませんか？
              環境に優しい印刷物は、企業イメージの向上にもつながります。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                GX製品を見る
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                お問い合わせ
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutGX;
