
import React from 'react';
import { ShieldCheck, Truck, FileSearch, LineChart, Gauge, ListFilter } from 'lucide-react';
import ProductPageLayout from '@/components/products/ProductPageLayout';

const GxSupplyChainAudit = () => {
  const benefits = [
    "サプライチェーン全体のCO2排出量を可視化",
    "Scope 1〜3までの包括的な排出量診断",
    "環境リスクの高いサプライヤーを特定",
    "規制遵守状況の自動監査",
    "コスト削減と環境負荷低減の両立を実現"
  ];

  const features = [
    {
      title: "排出量総合診断",
      description: "Scope 1（直接排出）、Scope 2（電力等の間接排出）、Scope 3（その他の間接排出）を包括的に診断し可視化します。",
      icon: <Gauge className="h-12 w-12" />
    },
    {
      title: "サプライヤー環境評価",
      description: "取引先の環境への取り組みをAIが評価し、リスクと改善機会を特定します。持続可能な調達の実現をサポートします。",
      icon: <ListFilter className="h-12 w-12" />
    },
    {
      title: "改善シミュレーション",
      description: "様々な改善施策のシミュレーションを行い、コストとCO2削減効果のバランスが最適な選択肢を提案します。",
      icon: <LineChart className="h-12 w-12" />
    },
    {
      title: "コンプライアンス監査",
      description: "環境規制の遵守状況を自動的に監査し、リスク領域を特定。将来の規制強化にも対応できる体制づくりを支援します。",
      icon: <FileSearch className="h-12 w-12" />
    }
  ];

  // Use icon instead of placeholder image
  return (
    <ProductPageLayout
      title="GXサプライチェーンAI監査"
      subtitle="サプライチェーン全体の環境負荷を最適化"
      description="サプライチェーン全体での環境負荷やCO2排出量をAIが監査し、改善提案を行うサービスです。Scope 1〜3に対応した排出量診断、サプライヤーごとの環境リスク評価、コスト削減と環境負荷軽減を両立する改善プランを提供します。"
      imageUrl=""
      benefits={benefits}
      features={features}
      ctaText="GXサプライチェーンAI監査に問い合わせる"
      ctaLink="/contact"
    />
  );
};

export default GxSupplyChainAudit;
