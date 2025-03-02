
import React from 'react';
import { Cpu, Bolt, BarChart4, Sun, Wind, ListChecks } from 'lucide-react';
import ProductPageLayout from '@/components/products/ProductPageLayout';

const GxEnergyManagement = () => {
  const benefits = [
    "エネルギー消費量を平均15-25%削減",
    "再生可能エネルギーの利用比率最大化",
    "リアルタイムのエネルギー使用状況のモニタリングと分析",
    "ピーク需要時のコスト削減",
    "カーボンニュートラル達成に向けた明確な道筋の提示"
  ];

  const features = [
    {
      title: "AIによるエネルギー最適化",
      description: "機械学習アルゴリズムにより、エネルギー使用パターンを分析し、最適な運用計画を自動的に生成します。",
      icon: <Cpu className="h-12 w-12" />
    },
    {
      title: "再生可能エネルギー統合",
      description: "太陽光や風力などの再生可能エネルギーの発電予測と需要予測を組み合わせ、最適なエネルギーミックスを実現します。",
      icon: <Sun className="h-12 w-12" />
    },
    {
      title: "リアルタイムモニタリング",
      description: "エネルギー使用状況をリアルタイムで監視し、異常検知や無駄な消費の特定を自動化します。",
      icon: <ListChecks className="h-12 w-12" />
    },
    {
      title: "CO2排出量削減レポート",
      description: "エネルギー最適化による CO2 排出量の削減効果を定量化し、詳細なレポートを自動生成します。",
      icon: <BarChart4 className="h-12 w-12" />
    }
  ];

  return (
    <ProductPageLayout
      title="GX AIエネルギーマネジメント"
      subtitle="AIが実現するエネルギー使用の最適化"
      description="AIを活用して企業のエネルギー使用状況をリアルタイムで分析し、最適化するシステムです。再生可能エネルギーの利用比率を最大化し、効率的な運用を提案することで、コスト削減とカーボンニュートラル達成を同時に実現します。"
      imageUrl="/placeholder.svg"
      benefits={benefits}
      features={features}
      ctaText="GX AIエネルギーマネジメントに問い合わせる"
      ctaLink="/contact"
    />
  );
};

export default GxEnergyManagement;
