
import React from 'react';
import ProductPageLayout from '@/components/products/ProductPageLayout';
import { BarChart3, Factory, Target, Lightbulb, Cpu, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const GXPrintingAdditionalContent = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">GX印刷の技術革新</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">AI印刷パラメータ最適化</h3>
              <p className="text-gray-600">
                AI技術により、インク使用量、紙の選択、プレス設定を最適化し、最小限の資源で最高品質の印刷を実現。エネルギー消費を削減しながら、鮮明な色彩と高解像度を維持します。
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">予測メンテナンスシステム</h3>
              <p className="text-gray-600">
                IoTセンサーとAI予測アルゴリズムにより、印刷機器の問題を事前に検知。突然のダウンタイムを防ぎ、修理コストを削減すると同時に、機器の寿命を延ばし、資源の無駄を削減します。
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  </section>
);

const GXPrinting = () => {
  return (
    <ProductPageLayout
      title="GX印刷ソリューション"
      subtitle="AIとデータ駆動型技術で実現する次世代の環境配慮型印刷"
      description="当社のGX（グリーントランスフォーメーション）印刷ソリューションは、最先端のAI技術と環境科学を融合させ、印刷産業の未来を形作ります。従来の環境印刷の限界を超え、データ分析、機械学習、IoTセンサーを活用して、持続可能性とビジネス成長を両立させます。"
      imageUrl=""
      benefits={[
        "AI駆動の資源最適化により廃棄物を75%削減",
        "クラウドベースのワークフローによるペーパーレス設計プロセス",
        "循環型経済モデルによる印刷材料の完全リサイクル",
        "リアルタイム環境影響ダッシュボードによる透明性の確保",
        "スマートロジスティクスによる配送の炭素排出量削減",
        "デジタル認証による持続可能性の証明と追跡",
        "予測メンテナンスによる機器寿命の延長と資源の節約"
      ]}
      features={[
        {
          title: "データ駆動型最適化",
          description: "AIアルゴリズムを使用して、インク使用量、エネルギー消費、材料選択を最適化し、廃棄物を削減します。",
          icon: <BarChart3 className="h-10 w-10" />
        },
        {
          title: "スマートファクトリー統合",
          description: "IoTセンサーと機械学習により、印刷プロセス全体をリアルタイムで監視・最適化します。",
          icon: <Factory className="h-10 w-10" />
        },
        {
          title: "精密資源割り当て",
          description: "プロジェクトごとに正確な材料とエネルギーの使用量を計算し、余剰在庫とコストを削減します。",
          icon: <Target className="h-10 w-10" />
        },
        {
          title: "イノベーションラボ",
          description: "持続可能な印刷技術の研究開発チームが、継続的に新しい環境ソリューションを開発します。",
          icon: <Lightbulb className="h-10 w-10" />
        },
        {
          title: "AIコンテンツ最適化",
          description: "印刷前にAIがコンテンツを分析し、インク使用量と読みやすさのバランスを最適化します。",
          icon: <Cpu className="h-10 w-10" />
        },
        {
          title: "GX認証プログラム",
          description: "独自のGX認証を通じて、顧客の持続可能性への取り組みを市場でアピールできます。",
          icon: <Award className="h-10 w-10" />
        }
      ]}
      ctaText="GX印刷を始める"
      ctaLink="/contact"
      additionalContent={<GXPrintingAdditionalContent />}
    />
  );
};

export default GXPrinting;
