
import React from 'react';
import { Palette, Leaf, Recycle, PanelLeft, Package, BarChart3 } from 'lucide-react';
import ProductPageLayout from '@/components/products/ProductPageLayout';

const GxEcoDesign = () => {
  const benefits = [
    "製品のライフサイクル全体でのCO2排出量を平均20%削減",
    "サステナブル素材の選定により環境負荷を最小化",
    "AIによる最適デザイン生成で開発時間を50%短縮",
    "ESG評価向上によるステークホルダーからの信頼獲得",
    "環境規制への先行的対応によるリスク低減"
  ];

  const features = [
    {
      title: "ライフサイクルアセスメント",
      description: "製品の原材料調達から廃棄までのライフサイクル全体における環境影響をAIが分析し視覚化します。",
      icon: <Recycle className="h-12 w-12" />
    },
    {
      title: "素材最適化",
      description: "環境負荷の少ない代替素材をAIが提案し、性能や価格とのバランスを考慮した最適な選択肢を提示します。",
      icon: <PanelLeft className="h-12 w-12" />
    },
    {
      title: "パッケージデザイン生成",
      description: "サステナブルなパッケージデザインをAIが自動生成。廃棄物削減と機能性を両立したデザインを提供します。",
      icon: <Package className="h-12 w-12" />
    },
    {
      title: "環境影響レポート",
      description: "製品のカーボンフットプリントやその他の環境指標を詳細に分析したレポートを自動生成します。",
      icon: <BarChart3 className="h-12 w-12" />
    }
  ];

  return (
    <ProductPageLayout
      title="GXエコデザインAI"
      subtitle="AIが実現する環境配慮型製品デザイン"
      description="製品のライフサイクル全体での環境影響を最小化するため、AIを活用して環境に配慮した製品デザインを最適化するサービスです。素材選定からパッケージデザインまで、サステナビリティと機能性を両立させた製品開発をサポートします。"
      imageUrl="/placeholder.svg"
      benefits={benefits}
      features={features}
      ctaText="GXエコデザインAIに問い合わせる"
      ctaLink="/contact"
      additionalContent={
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">導入事例</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-xl mb-2">A社（食品パッケージメーカー）</h3>
              <p className="text-gray-700 mb-4">
                GXエコデザインAIを活用して、バイオプラスチックと従来素材のハイブリッドパッケージを開発。
                CO2排出量を35%削減しながらも、コストを抑制することに成功しました。
              </p>
              <div className="text-sm text-gray-600">
                導入効果：パッケージの環境負荷35%削減、開発期間40%短縮、環境配慮型企業としてのブランド価値向上
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-2">B社（家電メーカー）</h3>
              <p className="text-gray-700 mb-4">
                製品全体のライフサイクルアセスメントにGXエコデザインAIを活用し、
                部品点数の削減と再生材料の最適配置により、環境負荷と製造コストの両方を削減しました。
              </p>
              <div className="text-sm text-gray-600">
                導入効果：製品の環境負荷25%削減、材料コスト15%削減、環境認証の迅速な取得
              </div>
            </div>
          </div>
        </section>
      }
    />
  );
};

export default GxEcoDesign;
