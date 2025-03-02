
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Cpu, Target, ShieldCheck, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const GxAiProducts = () => {
  const products = [
    {
      id: 1,
      title: "GXエコデザインAI",
      description: "AIを活用して環境に配慮した製品デザインを最適化するサービス。",
      features: [
        "製品のライフサイクルアセスメント（LCA）をAIがシミュレーション",
        "素材選定や製造プロセスにおけるCO2排出量削減を提案",
        "サステナブルなパッケージデザインも自動生成"
      ],
      price: 25000,
      icon: <Palette className="h-16 w-16 text-green-600" />,
      link: "/gx-eco-design",
      useCases: ["環境配慮型製品の開発支援", "持続可能なデザイン戦略の構築"]
    },
    {
      id: 2,
      title: "GX AIエネルギーマネジメント",
      description: "AIを活用して企業のエネルギー使用状況をリアルタイムで最適化するシステム。",
      features: [
        "再生可能エネルギーの利用比率を最大化",
        "エネルギー消費パターンを分析し、効率的な運用提案",
        "CO2排出量削減レポートを自動生成"
      ],
      price: 30000,
      icon: <Cpu className="h-16 w-16 text-blue-600" />,
      link: "/gx-energy-management",
      useCases: ["工場やオフィスのエネルギー管理", "カーボンニュートラル目標達成の支援"]
    },
    {
      id: 3,
      title: "GXサステナブルマーケティングAI",
      description: "AIを活用してサステナビリティに特化したマーケティング戦略を提供するサービス。",
      features: [
        "消費者の環境意識データを分析し、ターゲット層に最適な広告キャンペーンを設計",
        "サステナブル製品の市場トレンド予測",
        "ESG（環境・社会・ガバナンス）レポート作成支援"
      ],
      price: 35000,
      icon: <Target className="h-16 w-16 text-purple-600" />,
      link: "/gx-sustainable-marketing",
      useCases: ["サステナブルブランドの認知拡大", "環境配慮型商品の販売促進"]
    },
    {
      id: 4,
      title: "GXサプライチェーンAI監査",
      description: "サプライチェーン全体での環境負荷やCO2排出量をAIが監査し、改善提案を行うサービス。",
      features: [
        "Scope1〜3に対応した排出量診断",
        "サプライヤーごとの環境リスク評価",
        "改善プランとコスト削減シミュレーションを提供"
      ],
      price: 40000,
      icon: <ShieldCheck className="h-16 w-16 text-teal-600" />,
      link: "/gx-supply-chain-audit",
      useCases: ["サプライチェーン全体でのカーボンフットプリント削減", "持続可能な取引先選定"]
    },
    {
      id: 5,
      title: "GX教育・研修AIプラットフォーム",
      description: "AIを活用した従業員向けのサステナビリティ教育・研修プラットフォーム。",
      features: [
        "個別学習プランをAIが作成し、従業員ごとの理解度に応じて調整",
        "ESGやGXに関する最新知識と実践的スキルを提供",
        "学習進捗や成果レポートも自動生成"
      ],
      price: 20000,
      icon: <GraduationCap className="h-16 w-16 text-amber-600" />,
      link: "/gx-education-platform",
      useCases: ["サステナビリティ意識向上と人材育成", "ESG目標達成に向けた社内教育"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ヒーローセクション */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-yellow-300 mr-2" />
                <h1 className="text-3xl md:text-4xl font-bold">GX×AI製品</h1>
              </div>
              <p className="text-lg opacity-90 mb-6">
                グリーントランスフォーメーション（GX）と人工知能（AI）を組み合わせた革新的な製品ラインアップ。
                環境配慮と効率性を両立させ、企業のサステナビリティ目標達成を支援します。
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 hover:bg-white/30">LCAシミュレーション</Badge>
                <Badge className="bg-white/20 hover:bg-white/30">エネルギー最適化</Badge>
                <Badge className="bg-white/20 hover:bg-white/30">ESG対応</Badge>
                <Badge className="bg-white/20 hover:bg-white/30">Scope1〜3対応</Badge>
                <Badge className="bg-white/20 hover:bg-white/30">人材育成</Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 製品リスト */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">GX×AI製品ラインアップ</h2>
          
          <div className="space-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
                    <div className="text-center">
                      {product.icon}
                      <h3 className="text-xl font-bold mt-4 mb-2">{product.title}</h3>
                      <p className="text-2xl font-semibold text-gray-700">¥{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <h4 className="font-semibold text-gray-800 mb-2">主な特徴:</h4>
                    <ul className="mb-4 space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="font-semibold text-gray-800 mb-2">用途:</h4>
                    <ul className="mb-6 space-y-2">
                      {product.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between items-center">
                      <Link to={product.link}>
                        <Button className="gap-2">
                          詳細を見る <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline" className="gap-2">
                          {product.title}お問合せ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* 比較表 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">製品比較</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border">プロダクト名</th>
                  <th className="p-3 text-left border">主な機能</th>
                  <th className="p-3 text-left border">特徴</th>
                  <th className="p-3 text-left border">価格</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-medium">GXエコデザインAI</td>
                  <td className="p-3 border">環境配慮型製品デザイン最適化</td>
                  <td className="p-3 border">LCAシミュレーション、自動デザイン生成</td>
                  <td className="p-3 border">¥25,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border font-medium">GX AIエネルギーマネジメント</td>
                  <td className="p-3 border">エネルギー使用最適化</td>
                  <td className="p-3 border">再生可能エネルギー比率最大化</td>
                  <td className="p-3 border">¥30,000</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">GXサステナブルマーケティングAI</td>
                  <td className="p-3 border">環境意識分析と広告戦略設計</td>
                  <td className="p-3 border">消費者トレンド予測、ESG対応</td>
                  <td className="p-3 border">¥35,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border font-medium">GXサプライチェーンAI監査</td>
                  <td className="p-3 border">サプライチェーン全体の環境負荷診断</td>
                  <td className="p-3 border">Scope1〜3対応、リスク評価</td>
                  <td className="p-3 border">¥40,000</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">GX教育・研修AIプラットフォーム</td>
                  <td className="p-3 border">ESG/GX教育研修</td>
                  <td className="p-3 border">個別学習プラン、自動進捗管理</td>
                  <td className="p-3 border">¥20,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* CTAセクション */}
        <section>
          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">今すぐGX×AI製品で企業変革を</h2>
            <p className="max-w-2xl mx-auto mb-6 text-gray-700">
              グリーントランスフォーメーションと人工知能を組み合わせた製品で、
              企業のサステナビリティ目標達成とビジネス成長の両立を実現しましょう。
              専門コンサルタントが最適なソリューションをご提案します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  無料相談を予約する
                </Button>
              </Link>
              <Link to="/sustainability-check">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50"
                >
                  サステナビリティ診断を試す
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GxAiProducts;
