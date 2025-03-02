
import React from 'react';
import { Target, BarChart, Users, TrendingUp, MessageSquare, FileSpreadsheet } from 'lucide-react';
import ProductPageLayout from '@/components/products/ProductPageLayout';

const GxSustainableMarketing = () => {
  const benefits = [
    "環境意識の高い消費者層へのターゲティング精度向上",
    "サステナブル製品の差別化ポイントの明確化",
    "ESGに基づくマーケティング戦略の構築",
    "ブランドの環境への取り組みを効果的に訴求",
    "グリーンウォッシングを避けた信頼性の高いマーケティング活動"
  ];

  const features = [
    {
      title: "消費者環境意識分析",
      description: "SNSやサーベイデータからAIが消費者の環境意識を分析し、ターゲットセグメントの詳細なプロファイルを作成します。",
      icon: <Users className="h-12 w-12" />
    },
    {
      title: "サステナブル市場トレンド予測",
      description: "環境配慮型製品の市場動向をAIが分析し、将来のトレンドを予測。機会とリスクを特定します。",
      icon: <TrendingUp className="h-12 w-12" />
    },
    {
      title: "ESGレポート作成支援",
      description: "環境・社会・ガバナンスに関する情報を整理し、ステークホルダー向けの説得力のあるレポートを自動生成します。",
      icon: <FileSpreadsheet className="h-12 w-12" />
    },
    {
      title: "サステナブルコミュニケーション最適化",
      description: "環境配慮に関するメッセージを、ターゲットオーディエンスに最も響く形で伝えるための施策を提案します。",
      icon: <MessageSquare className="h-12 w-12" />
    }
  ];

  // Use icon instead of placeholder image
  return (
    <ProductPageLayout
      title="GXサステナブルマーケティングAI"
      subtitle="サステナビリティを軸とした効果的なマーケティング戦略"
      description="AIを活用してサステナビリティに特化したマーケティング戦略を提供するサービスです。消費者の環境意識データを分析し、ターゲット層に最適な広告キャンペーンを設計するとともに、ESGレポート作成も支援します。"
      imageUrl=""
      benefits={benefits}
      features={features}
      ctaText="GXサステナブルマーケティングAIに問い合わせる"
      ctaLink="/contact"
    />
  );
};

export default GxSustainableMarketing;
