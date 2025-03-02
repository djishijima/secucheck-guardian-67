
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChartBar, Database, FileText, ShieldCheck, Leaf, Recycle, Users, BarChart4 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ComprehensiveDiagnostics = () => {
  const sustainabilityDiagnostics = [
    {
      title: "サステナビリティ経営診断",
      description: "組織全体のサステナビリティ対応度を評価する診断。ガバナンス、経済性、環境インパクト、社会インパクト、テクノロジー対応などを総合的に評価します。",
      features: [
        "簡易セルフチェックから本格的なコンサルティングまで幅広く対応。",
        "診断結果をもとに価値創造プロセスや改善提案が行われます。"
      ],
      icon: <FileText className="h-12 w-12 text-green-600" />
    },
    {
      title: "サステナブルサプライチェーン診断",
      description: "サプライチェーン全体のESG（環境・社会・ガバナンス）課題への対応状況を評価。",
      features: [
        "ISO26000や国際基準に基づき、ベンチマーク分析やギャップ分析を実施。",
        "人権、労働環境、環境負荷、地政学リスクなど多角的な視点で評価。"
      ],
      icon: <Users className="h-12 w-12 text-green-600" />
    },
    {
      title: "カーボンニュートラル診断",
      description: "温室効果ガス削減に向けた企業活動の現状を評価し、カーボンニュートラルへの移行計画を支援。",
      features: [
        "Scope1〜3の排出量算定だけでなく、削減ポテンシャルや再生可能エネルギー導入のシミュレーションも実施。"
      ],
      icon: <Leaf className="h-12 w-12 text-green-600" />
    },
    {
      title: "サーキュラーエコノミー診断",
      description: "循環型経済への移行度合いを評価し、リサイクル可能性や資源効率性を測定。",
      features: [
        "製品設計や廃棄物管理の改善提案を含む。"
      ],
      icon: <Recycle className="h-12 w-12 text-green-600" />
    },
    {
      title: "サステナビリティ成熟度診断",
      description: "組織のサステナビリティ対応レベル（成熟度）を段階的に評価。",
      features: [
        "クイック診断（簡易版）と詳細診断（高度版）の2段階で提供される。"
      ],
      icon: <BarChart4 className="h-12 w-12 text-green-600" />
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
      icon: <ChartBar className="h-12 w-12 text-blue-600" />
    },
    {
      title: "データ活用度診断",
      description: "データ収集・分析・活用能力を評価し、データドリブン経営への移行支援。",
      features: [
        "BIツールやAI活用状況も含めた包括的な評価。"
      ],
      icon: <Database className="h-12 w-12 text-blue-600" />
    },
    {
      title: "サイバーセキュリティ診断",
      description: "組織のセキュリティ体制や脆弱性を評価し、改善策を提示。",
      features: [
        "DX推進に伴う新たなセキュリティリスクにも対応。"
      ],
      icon: <ShieldCheck className="h-12 w-12 text-blue-600" />
    },
    {
      title: "業務プロセス自動化（RPA）適用診断",
      description: "業務プロセスの自動化可能性を評価し、RPA（ロボティック・プロセス・オートメーション）の導入計画を策定。",
      features: [
        "業務効率化とコスト削減のポテンシャル分析。"
      ],
      icon: <BarChart4 className="h-12 w-12 text-blue-600" />
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
    <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="bg-gray-50 p-2 rounded-lg">
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
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        {link && (
          <Link to={link}>
            <Button variant="outline" className="mt-2">
              診断を受ける
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">サステナブルDX診断サービス</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            持続可能な成長と競争力強化を実現するための診断サービスを提供しています。サステナビリティとDXの両面から企業の現状を評価し、戦略的な改善提案を行います。
          </p>
        </div>

        <Tabs defaultValue="existing-gx" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="existing-gx">GX対応度診断</TabsTrigger>
              <TabsTrigger value="sustainability">サステナビリティ診断</TabsTrigger>
              <TabsTrigger value="dx">DX診断</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="existing-gx" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">GX対応度診断サービス</h2>
              <p className="text-gray-700">
                企業のグリーントランスフォーメーション（GX）対応度を評価し、環境負荷低減と持続可能なビジネスモデル構築をサポートする診断サービスです。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {existingGxDiagnostics.map((diagnostic, index) => (
                <DiagnosticCard 
                  key={index} 
                  title={diagnostic.title} 
                  description={diagnostic.description} 
                  features={diagnostic.features} 
                  icon={diagnostic.icon}
                  link={diagnostic.link}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">サステナビリティ診断サービス</h2>
              <p className="text-gray-700">
                サステナビリティに関する様々な側面から企業活動を評価し、持続可能な事業運営のための具体的な改善策を提案します。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {sustainabilityDiagnostics.map((diagnostic, index) => (
                <DiagnosticCard 
                  key={index} 
                  title={diagnostic.title} 
                  description={diagnostic.description} 
                  features={diagnostic.features} 
                  icon={diagnostic.icon}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dx" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">DX診断サービス</h2>
              <p className="text-gray-700">
                デジタルトランスフォーメーション（DX）の観点から企業のデジタル成熟度を評価し、競争力強化のための戦略的なデジタル化推進を支援します。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {dxDiagnostics.map((diagnostic, index) => (
                <DiagnosticCard 
                  key={index} 
                  title={diagnostic.title} 
                  description={diagnostic.description} 
                  features={diagnostic.features} 
                  icon={diagnostic.icon}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl mt-12 shadow-sm">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">診断サービスをご希望の方へ</h2>
            <p className="text-gray-700 mt-2">
              各診断サービスについてより詳しい情報や、カスタマイズされた診断プランについてはお気軽にお問い合わせください。
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                お問い合わせ
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComprehensiveDiagnostics;
