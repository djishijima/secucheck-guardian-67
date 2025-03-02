import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, Recycle, TreePine, Wind, Droplets, Factory, Award, ArrowRight,
  Cpu, Brain, BarChart, Image, Languages, MessageSquare, Lightbulb, FileText
} from 'lucide-react';
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

        {/* AIが変える、印刷の未来セクション */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 shadow-lg text-white">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  AIが変える、印刷の未来
                </h2>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  文唱堂印刷は、最先端のAI技術を活用し、印刷業界に革新をもたらします。データ分析から画像処理、多言語対応まで、AI技術の力でビジネスの可能性を広げます。
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  AI製品を見る <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 私たちのAI技術セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">私たちのAI技術</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Image className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>AIイメージ最適化</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  機械学習アルゴリズムが画像を分析し、印刷に最適な形に自動調整。色彩、コントラスト、シャープネスを最適化し、あらゆる印刷物で美しい仕上がりを実現します。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Languages className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>多言語AI翻訳</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  コンテキストを理解する高精度なAI翻訳が、40以上の言語に対応。文化的ニュアンスも考慮した翻訳で、グローバルなコミュニケーションをサポートします。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>AIドキュメント分析</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  大量の文書から重要な情報を抽出し、インサイトを提供。契約書、報告書など、あらゆるビジネス文書の効率的な管理と分析を実現します。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <BarChart className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>データ駆動型印刷最適化</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  印刷データの分析により、インク使用量、紙の消費、エネルギー使用を最適化。コスト削減と環境負荷低減を同時に実現する、スマートな印刷システムです。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>デザインアシスタントAI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  自然言語による指示からデザイン案を生成。ブランドガイドラインに沿った、一貫性のあるデザインを効率的に作成します。創造的なプロセスをAIがサポートします。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle>予測メンテナンスシステム</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  印刷機器の状態をリアルタイムで監視し、問題を事前に予測。ダウンタイムを最小限に抑え、生産効率を最大化するスマートファクトリーを実現します。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI x GXセクション */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
              <Brain className="mr-2 h-6 w-6 text-blue-600" />
              AI × GXの融合
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              文唱堂印刷では、AI技術とグリーントランスフォーメーション（GX）を融合させ、
              環境に配慮しながら、ビジネス効率を高める革新的なソリューションを提供しています。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-3 text-blue-700">AIによる資源最適化</h3>
                <p className="text-gray-700 mb-4">
                  AI分析により、印刷プロセスでの資源使用量を最小化。必要な量だけのインクと紙を使用し、
                  廃棄物を削減します。これにより、環境負荷の低減とコスト削減を同時に実現します。
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    インク使用量の15%削減
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    紙の無駄を30%低減
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    エネルギー消費の最適化
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-3 text-green-700">カーボンフットプリント計算</h3>
                <p className="text-gray-700 mb-4">
                  AIが印刷物ごとのカーボンフットプリントを正確に計算し、環境影響を可視化。
                  お客様はデータに基づいた環境配慮型の選択ができるようになります。
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    リアルタイムCO2排出量計算
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    環境負荷の少ない代替案の提案
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    企業のESGレポート作成支援
                  </li>
                </ul>
              </div>
            </div>
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

        {/* AI技術の活用事例セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">AI技術の活用事例</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:shrink-0 bg-blue-100 flex items-center justify-center p-6">
                <Cpu className="h-20 w-20 text-blue-600" />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">大手出版社</div>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">多言語出版物の効率化</h3>
                <p className="mt-2 text-gray-600">
                  40カ国以上で展開する教育雑誌の出版社が、当社のAI翻訳システムを導入。翻訳時間を75%削減し、
                  人的リソースを創造的な編集作業に集中させることで、品質向上とコスト削減を同時に実現しました。
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:shrink-0 bg-green-100 flex items-center justify-center p-6">
                <Brain className="h-20 w-20 text-green-600" />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-green-500 font-semibold">環境配慮型企業連合</div>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">サステナブルレポートの自動生成</h3>
                <p className="mt-2 text-gray-600">
                  100社以上の企業が参加する環境連合が、AIドキュメント分析と環境データ処理技術を活用。
                  各社のESGデータを統合・分析し、一貫性のある高品質なサステナビリティレポートを自動生成することに成功しました。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section>
          <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">サステナブルな印刷で、未来を変える</h2>
            <p className="max-w-2xl mx-auto mb-6 text-gray-700">
              文唱堂印刷のGX技術とAI技術を活用して、あなたのビジネスも環境に配慮したものに変えてみませんか？
              環境に優しい印刷物は、企業イメージの向上にもつながります。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                GX製品を見る
              </Button>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                AI製品を見る
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
