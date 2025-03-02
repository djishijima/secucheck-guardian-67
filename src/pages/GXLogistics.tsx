
import React from 'react';
import ProductPageLayout from '@/components/products/ProductPageLayout';
import { Network, BarChart3, Globe, Truck, Cpu, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const GXLogisticsAdditionalContent = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">GX物流の革新的アプローチ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: "予測配送モデル", 
            content: "機械学習アルゴリズムが過去のデータを分析し、需要を予測。在庫レベルを最適化し、無駄な移動を削減します。" 
          },
          { 
            title: "ブロックチェーン追跡", 
            content: "ブロックチェーン技術により、製品のサプライチェーン全体の透明性を確保。持続可能性の取り組みを検証可能な形で証明します。" 
          },
          { 
            title: "協調型配送ネットワーク", 
            content: "他企業との共同配送ネットワークにより、配送効率を高め、車両の積載率を最大化し、コストと排出量を削減します。" 
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-3 text-green-700">{item.title}</h3>
                <p className="text-gray-600 flex-grow">{item.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const GXLogistics = () => {
  return (
    <ProductPageLayout
      title="GX物流ソリューション"
      subtitle="デジタル技術と持続可能性を融合した次世代物流システム"
      description="文唱堂印刷のGX物流ソリューションは、AI、IoT、ブロックチェーンを活用して、従来の物流の概念を一新します。環境への配慮だけでなく、効率性、透明性、コスト削減を同時に実現する革新的なシステムで、お客様のビジネスと地球環境の両方に貢献します。"
      imageUrl=""
      benefits={[
        "AI需要予測による在庫と輸送の最適化で無駄を80%削減",
        "リアルタイム追跡と調整によるサプライチェーンの完全な可視化",
        "分散型物流ネットワークによる配送距離と時間の短縮",
        "エネルギー効率の高い倉庫運営と自動化システム",
        "完全にデジタル化された書類手続きによるペーパーレス業務",
        "データ駆動型の継続的改善による環境パフォーマンスの向上",
        "循環型サプライチェーンモデルによる資源の再利用促進"
      ]}
      features={[
        {
          title: "統合物流プラットフォーム",
          description: "AIを活用したプラットフォームが、複数の配送チャネルと倉庫ネットワークを一元管理します。",
          icon: <Network className="h-10 w-10" />
        },
        {
          title: "リアルタイム環境モニタリング",
          description: "配送プロセス全体の炭素排出量とエネルギー消費をリアルタイムで測定・分析します。",
          icon: <BarChart3 className="h-10 w-10" />
        },
        {
          title: "グローバルGX物流ネットワーク",
          description: "世界中の持続可能な物流パートナーと連携し、国際的な環境配慮型配送を実現します。",
          icon: <Globe className="h-10 w-10" />
        },
        {
          title: "自律型配送システム",
          description: "低排出ガスの自律配送車両とドローン技術を活用した革新的な配送ソリューションです。",
          icon: <Truck className="h-10 w-10" />
        },
        {
          title: "AI最適化エンジン",
          description: "数百の変数を考慮し、最も環境に優しく効率的な配送計画を自動的に生成します。",
          icon: <Cpu className="h-10 w-10" />
        },
        {
          title: "スマートエネルギー管理",
          description: "倉庫と物流拠点の再生可能エネルギー利用と消費の最適化を行います。",
          icon: <Zap className="h-10 w-10" />
        }
      ]}
      ctaText="GX物流を導入する"
      ctaLink="/contact"
      additionalContent={<GXLogisticsAdditionalContent />}
    />
  );
};

export default GXLogistics;
