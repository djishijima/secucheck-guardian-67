
import React from 'react';
import { ChartBar, Database, FileText, ShieldCheck, Leaf, Recycle, Users, BarChart4 } from 'lucide-react';

export interface DiagnosticItem {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  link: string;
}

export const sustainabilityDiagnostics: DiagnosticItem[] = [
  {
    title: "サステナビリティ経営診断",
    description: "組織全体のサステナビリティ対応度を評価する診断。ガバナンス、経済性、環境インパクト、社会インパクト、テクノロジー対応などを総合的に評価します。",
    features: [
      "簡易セルフチェックから本格的なコンサルティングまで幅広く対応。",
      "診断結果をもとに価値創造プロセスや改善提案が行われます。"
    ],
    icon: <FileText className="h-12 w-12 text-green-600" />,
    link: "/contact"
  },
  {
    title: "サステナブルサプライチェーン診断",
    description: "サプライチェーン全体のESG（環境・社会・ガバナンス）課題への対応状況を評価。",
    features: [
      "ISO26000や国際基準に基づき、ベンチマーク分析やギャップ分析を実施。",
      "人権、労働環境、環境負荷、地政学リスクなど多角的な視点で評価。"
    ],
    icon: <Users className="h-12 w-12 text-green-600" />,
    link: "/contact"
  },
  {
    title: "カーボンニュートラル診断",
    description: "温室効果ガス削減に向けた企業活動の現状を評価し、カーボンニュートラルへの移行計画を支援。",
    features: [
      "Scope1〜3の排出量算定だけでなく、削減ポテンシャルや再生可能エネルギー導入のシミュレーションも実施。"
    ],
    icon: <Leaf className="h-12 w-12 text-green-600" />,
    link: "/contact"
  },
  {
    title: "サーキュラーエコノミー診断",
    description: "循環型経済への移行度合いを評価し、リサイクル可能性や資源効率性を測定。",
    features: [
      "製品設計や廃棄物管理の改善提案を含む。"
    ],
    icon: <Recycle className="h-12 w-12 text-green-600" />,
    link: "/contact"
  },
  {
    title: "サステナビリティ成熟度診断",
    description: "組織のサステナビリティ対応レベル（成熟度）を段階的に評価。",
    features: [
      "クイック診断（簡易版）と詳細診断（高度版）の2段階で提供される。"
    ],
    icon: <BarChart4 className="h-12 w-12 text-green-600" />,
    link: "/contact"
  }
];

export const dxDiagnostics: DiagnosticItem[] = [
  {
    title: "DX成熟度診断",
    description: "組織のデジタル化対応状況やDX推進レベルを評価。",
    features: [
      "ITインフラ、業務プロセス、自動化技術、人材スキルなど多方面から分析。",
      "デジタル技術導入による競争優位性の強化提案も行われます。"
    ],
    icon: <ChartBar className="h-12 w-12 text-blue-600" />,
    link: "/contact"
  },
  {
    title: "データ活用度診断",
    description: "データ収集・分析・活用能力を評価し、データドリブン経営への移行支援。",
    features: [
      "BIツールやAI活用状況も含めた包括的な評価。"
    ],
    icon: <Database className="h-12 w-12 text-blue-600" />,
    link: "/contact"
  },
  {
    title: "サイバーセキュリティ診断",
    description: "組織のセキュリティ体制や脆弱性を評価し、改善策を提示。",
    features: [
      "DX推進に伴う新たなセキュリティリスクにも対応。"
    ],
    icon: <ShieldCheck className="h-12 w-12 text-blue-600" />,
    link: "/contact"
  },
  {
    title: "業務プロセス自動化（RPA）適用診断",
    description: "業務プロセスの自動化可能性を評価し、RPA（ロボティック・プロセス・オートメーション）の導入計画を策定。",
    features: [
      "業務効率化とコスト削減のポテンシャル分析。"
    ],
    icon: <BarChart4 className="h-12 w-12 text-blue-600" />,
    link: "/contact"
  }
];

export const existingGxDiagnostics: DiagnosticItem[] = [
  {
    title: "GX対応度診断",
    description: "企業のグリーントランスフォーメーション（GX）への対応状況を評価し、改善点を明確化。",
    features: [
      "CO2排出量の算定とカーボンフットプリントの評価",
      "再生可能エネルギー転換計画の策定支援",
      "グリーン投資やESG対応の状況分析"
    ],
    icon: <Leaf className="h-12 w-12 text-emerald-600" />,
    link: "/gx-assessment"
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
