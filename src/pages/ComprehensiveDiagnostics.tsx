
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChartBar, Database, FileText, ShieldCheck, Leaf, Recycle, Users, BarChart4, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

const ComprehensiveDiagnostics = () => {
  const [activeTab, setActiveTab] = useState("existing-gx");

  const sustainabilityDiagnostics = [
    {
      title: "サステナビリティ経営診断",
      description: "組織全体のサステナビリティ対応度を評価する診断。ガバナンス、経済性、環境インパクト、社会インパクト、テクノロジー対応などを総合的に評価します。",
      features: [
        "簡易セルフチェックから本格的なコンサルティングまで幅広く対応。",
        "診断結果をもとに価値創造プロセスや改善提案が行われます。"
      ],
      icon: <FileText className="h-12 w-12 text-green-600" />,
      link: "/contact" // Adding link property
    },
    {
      title: "サステナブルサプライチェーン診断",
      description: "サプライチェーン全体のESG（環境・社会・ガバナンス）課題への対応状況を評価。",
      features: [
        "ISO26000や国際基準に基づき、ベンチマーク分析やギャップ分析を実施。",
        "人権、労働環境、環境負荷、地政学リスクなど多角的な視点で評価。"
      ],
      icon: <Users className="h-12 w-12 text-green-600" />,
      link: "/contact" // Adding link property
    },
    {
      title: "カーボンニュートラル診断",
      description: "温室効果ガス削減に向けた企業活動の現状を評価し、カーボンニュートラルへの移行計画を支援。",
      features: [
        "Scope1〜3の排出量算定だけでなく、削減ポテンシャルや再生可能エネルギー導入のシミュレーションも実施。"
      ],
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      link: "/contact" // Adding link property
    },
    {
      title: "サーキュラーエコノミー診断",
      description: "循環型経済への移行度合いを評価し、リサイクル可能性や資源効率性を測定。",
      features: [
        "製品設計や廃棄物管理の改善提案を含む。"
      ],
      icon: <Recycle className="h-12 w-12 text-green-600" />,
      link: "/contact" // Adding link property
    },
    {
      title: "サステナビリティ成熟度診断",
      description: "組織のサステナビリティ対応レベル（成熟度）を段階的に評価。",
      features: [
        "クイック診断（簡易版）と詳細診断（高度版）の2段階で提供される。"
      ],
      icon: <BarChart4 className="h-12 w-12 text-green-600" />,
      link: "/contact" // Adding link property
    }
  ];

  const dxDiagnostics = [
    {
      title: "DX成熟度診断",
      description: "組織のデジタル化対応状況やDX推進レベルを評価。",
      features: [
        "ITインフラ、業務プロセス、自動化技術、人材スキルなど多方面から分析。",
        "デジタル技術導入による競争優位性の強化提案も行われます。"
      ],
      icon: <ChartBar className="h-12 w-12 text-blue-600" />,
      link: "/contact" // Adding link property
    },
    {
      title: "データ活用度診断",
      description: "データ収集・分析・活用能力を評価し、データドリブン経営への移行支援。",
      features: [
        "BIツールやAI活用状況も含めた包括的な評価。"
      ],
      icon: <Database className="h-12 w-12 text-blue-600" />,
      link: "/contact" // Adding link property
    },
    {
      title: "サイバーセキュリティ診断",
      description: "組織のセキュリティ体制や脆弱性を評価し、改善策を提示。",
      features: [
        "DX推進に伴う新たなセキュリティリスクにも対応。"
      ],
      icon: <ShieldCheck className="h-12 w-12 text-blue-600" />,
      link: "/contact" // Adding link property
    },
    {
      title: "業務プロセス自動化（RPA）適用診断",
      description: "業務プロセスの自動化可能性を評価し、RPA（ロボティック・プロセス・オートメーション）の導入計画を策定。",
      features: [
        "業務効率化とコスト削減のポテンシャル分析。"
      ],
      icon: <BarChart4 className="h-12 w-12 text-blue-600" />,
      link: "/contact" // Adding link property
    }
  ];

  const existingGxDiagnostics = [
    {
      title: "GX対応度診断",
      description: "企業のグリーントランスフォーメーション（GX）への対応状況を評価し、改善点を明確化。",
      features: [
        "CO2排出量の算定とカーボンフットプリントの評価",
        "再生可能エネルギー転換計画の策定支援",
        "グリーン投資やESG対応の状況分析"
      ],
      icon: <Leaf className="h-12 w-12 text-emerald-600" />,
      link: "/sustainability-check"
    },
    {
      title: "Scope 1 排出量診断",
      description: "自社の直接的な温室効果ガス排出（Scope 1）を詳細に分析し、削減策を提案。",
      features: [
        "燃料燃焼、社有車、特定の製造プロセスなどからの直接排出量を算定",
        "排出源ごとの削減ポテンシャル評価",
        "削減目標設定と長期戦略立案支援"
      ],
      icon: <ChartBar className="h-12 w-12 text-emerald-600" />,
      link: "/scope-one"
    },
    {
      title: "Scope 2 排出量診断",
      description: "購入した電力・熱などのエネルギー使用による間接排出（Scope 2）を評価。",
      features: [
        "購入電力・蒸気・熱・冷却からの間接排出量の算定",
        "再生可能エネルギーへの転換シミュレーション",
        "コスト効率の高い削減策の提案"
      ],
      icon: <ChartBar className="h-12 w-12 text-emerald-600" />,
      link: "/scope-two"
    }
  ];

  const DiagnosticCard = ({ title, description, features, icon, link }) => (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <Card className="mb-6 hover:border-green-300 transition-all duration-300">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-3 rounded-lg shadow-sm">
            {icon}
          </div>
          <div className="space-y-1.5">
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-none pl-0 mb-4 space-y-2 text-gray-700">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {link && (
            <Link to={link}>
              <Button variant="default" className="mt-2 w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 gap-2">
                診断を受ける
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const TabButton = ({ value, icon, label }) => (
    <TabsTrigger 
      value={value} 
      className={`flex items-center gap-2 px-4 py-3 ${activeTab === value ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {icon}
      <span>{label}</span>
    </TabsTrigger>
  );

  const ServiceSection = ({ title, description, diagnostics }) => (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-700 border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-md">
          {description}
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-6">
        {diagnostics.map((diagnostic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <DiagnosticCard 
              title={diagnostic.title} 
              description={diagnostic.description} 
              features={diagnostic.features} 
              icon={diagnostic.icon}
              link={diagnostic.link}
            />
          </motion.div>
        ))}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-2 px-4 bg-green-100 rounded-full text-green-800 font-medium mb-4">
            持続可能な未来へのビジネス変革
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">サステナブルDX診断サービス</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            持続可能な成長と競争力強化を実現するための診断サービスを提供しています。
            サステナビリティとDXの両面から企業の現状を評価し、明確なアクションプランをご提案します。
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-12 p-6 bg-white rounded-xl shadow-sm"
        >
          <div className="flex justify-center mb-8">
            <Tabs defaultValue={activeTab} className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabButton 
                    value="existing-gx" 
                    icon={<Leaf className="h-4 w-4 text-green-600" />} 
                    label="GX対応度診断" 
                  />
                  <TabButton 
                    value="sustainability" 
                    icon={<Recycle className="h-4 w-4 text-green-600" />} 
                    label="サステナビリティ診断" 
                  />
                  <TabButton 
                    value="dx" 
                    icon={<Database className="h-4 w-4 text-blue-600" />} 
                    label="DX診断" 
                  />
                </TabsList>
              </div>

              <TabsContent value="existing-gx" className="space-y-4">
                <ServiceSection 
                  title="GX対応度診断サービス" 
                  description="企業のグリーントランスフォーメーション（GX）対応度を評価し、環境負荷低減と持続可能なビジネスモデル構築をサポートします。" 
                  diagnostics={existingGxDiagnostics} 
                />
              </TabsContent>

              <TabsContent value="sustainability" className="space-y-4">
                <ServiceSection 
                  title="サステナビリティ診断サービス" 
                  description="サステナビリティに関する様々な側面から企業活動を評価し、持続可能な事業運営のための具体的な改善策を提案します。" 
                  diagnostics={sustainabilityDiagnostics} 
                />
              </TabsContent>

              <TabsContent value="dx" className="space-y-4">
                <ServiceSection 
                  title="DX診断サービス" 
                  description="デジタルトランスフォーメーション（DX）の観点から企業のデジタル成熟度を評価し、競争力強化のための戦略的なデジタル化推進を支援します。" 
                  diagnostics={dxDiagnostics} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-xl shadow-lg text-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">診断から改善までトータルサポート</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                診断結果に基づいた具体的な改善プランの提案から実行支援まで、
                一貫したサポートで貴社のサステナブルDX推進をお手伝いします。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">診断レポート</h3>
                <p className="text-white/80 text-sm">
                  現状の課題と機会を明確に可視化したレポートを提供します
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-3">
                  <BarChart4 className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">改善プラン</h3>
                <p className="text-white/80 text-sm">
                  優先度付きの具体的なアクションプランを策定します
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">実行支援</h3>
                <p className="text-white/80 text-sm">
                  改善プランの実行をサポートし、継続的な発展をお手伝いします
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 gap-2">
                  詳細を問い合わせる
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-5xl mx-auto mt-12"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              よくある質問
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-green-700 mb-2">診断にはどれくらいの時間がかかりますか？</h3>
                <p className="text-gray-600">
                  簡易診断は約2週間、詳細診断は企業規模や範囲によって3〜6週間程度です。オンライン診断ツールを使った自己診断は即時結果が得られます。
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-green-700 mb-2">診断結果はどのような形で提供されますか？</h3>
                <p className="text-gray-600">
                  診断結果は詳細なレポートとして提供され、経営層向けのエグゼクティブサマリーと実務担当者向けの詳細分析が含まれます。オプションでプレゼンテーションも可能です。
                </p>
              </div>
              <div>
                <h3 className="font-medium text-green-700 mb-2">中小企業でも利用できますか？</h3>
                <p className="text-gray-600">
                  はい、企業規模に合わせたプランをご用意しています。中小企業向けの簡易診断パッケージもございますので、お気軽にご相談ください。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/sustainability-check">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 gap-2">
                    無料の簡易診断を試してみる
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-green-800 text-white">
                <p>所要時間約5分の簡易診断を無料でお試しいただけます</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComprehensiveDiagnostics;
