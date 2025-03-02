
import React from 'react';
import ProductPageLayout from '@/components/products/ProductPageLayout';
import { Truck, Package, BarChart, Map, Clock, Shield } from 'lucide-react';

const EcoLogistics = () => {
  return (
    <ProductPageLayout
      title="環境物流サービス"
      subtitle="持続可能なサプライチェーンとロジスティクスソリューション"
      description="当社の環境物流サービスは、お客様の印刷物の配送過程における環境負荷を最小限に抑えます。低排出ガス車両、最適化された配送ルート、環境に配慮した梱包材料を組み合わせ、効率性を損なうことなく持続可能性を実現します。"
      imageUrl=""
      benefits={[
        "従来の物流と比較して最大45%のCO2排出量削減",
        "生分解性・再利用可能な梱包材料の使用",
        "ルート最適化による燃料消費の削減と効率性の向上",
        "電気自動車と代替燃料車両の導入",
        "環境負荷を測定する詳細な配送レポート",
        "地域の環境イニシアチブとの提携によるオフセットプログラム"
      ]}
      features={[
        {
          title: "グリーンフリート",
          description: "電気自動車、バイオ燃料車、ハイブリッド車から構成される低排出ガス配送網を活用します。",
          icon: <Truck className="h-10 w-10" />
        },
        {
          title: "エコパッケージング",
          description: "リサイクル素材、生分解性材料、再利用可能な梱包ソリューションを提供します。",
          icon: <Package className="h-10 w-10" />
        },
        {
          title: "炭素排出量追跡",
          description: "各配送の環境影響をリアルタイムで監視し、詳細な持続可能性レポートを提供します。",
          icon: <BarChart className="h-10 w-10" />
        },
        {
          title: "スマートルーティング",
          description: "AI最適化アルゴリズムを使用して、最も効率的かつ環境に優しい配送ルートを計画します。",
          icon: <Map className="h-10 w-10" />
        },
        {
          title: "タイムスロット配送",
          description: "配送時間の正確な指定により、無駄な走行と交通渋滞の影響を軽減します。",
          icon: <Clock className="h-10 w-10" />
        },
        {
          title: "安全な輸送保証",
          description: "環境に優しい方法でありながら、商品の完全な保護と安全を保証します。",
          icon: <Shield className="h-10 w-10" />
        }
      ]}
      ctaText="環境物流を利用する"
      ctaLink="/contact"
    />
  );
};

export default EcoLogistics;
