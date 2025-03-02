
import React from 'react';
import ProductPageLayout from '@/components/products/ProductPageLayout';
import { RecycleIcon, Leaf, TreePine, MessageSquare, FileCheck, PaintBucket } from 'lucide-react';

const EcoPrinting = () => {
  const categories = {
    function: "印刷・出版サービス",
    technology: "バイオマテリアル製品",
    challenge: "ESG対応支援"
  };

  return (
    <ProductPageLayout
      title="環境印刷サービス"
      subtitle="持続可能な未来のための環境配慮型印刷ソリューション"
      description="再生紙、植物性インク、省エネルギー技術を組み合わせた当社の環境印刷サービスは、品質を妥協することなく、カーボンフットプリントを大幅に削減します。FSC認証取得済みの素材と最新の環境技術で、あなたのブランドの持続可能性を高めます。"
      imageUrl=""
      benefits={[
        "従来の印刷方法と比較して最大60%のCO2排出量削減",
        "FSC認証済み再生紙と非毒性植物性インクを使用",
        "水使用量を最大40%削減する革新的な印刷プロセス",
        "印刷廃棄物ゼロを目指した完全なリサイクルシステム",
        "カーボンオフセットプログラムによる残りの環境影響の相殺",
        "環境配慮型印刷を選択したという証明書の発行"
      ]}
      features={[
        {
          title: "再生素材",
          description: "100%再生紙またはFSC認証済み持続可能な森林由来の素材を使用し、新しい木材の使用を削減します。",
          icon: <RecycleIcon className="h-10 w-10" />
        },
        {
          title: "バイオインク",
          description: "石油由来の従来のインクに代わり、大豆や野菜由来の環境に優しいインクを使用します。",
          icon: <PaintBucket className="h-10 w-10" />
        },
        {
          title: "カーボンニュートラル",
          description: "印刷プロセス全体のカーボンフットプリントを計算し、森林再生プロジェクトを通じてオフセットします。",
          icon: <Leaf className="h-10 w-10" />
        },
        {
          title: "水使用量削減",
          description: "従来の方法と比較して水使用量を大幅に削減する革新的な印刷技術を採用しています。",
          icon: <TreePine className="h-10 w-10" />
        },
        {
          title: "環境認証",
          description: "国際的に認められた環境認証を取得しており、製品の持続可能性を保証します。",
          icon: <FileCheck className="h-10 w-10" />
        },
        {
          title: "専門コンサルティング",
          description: "持続可能性の専門家があなたのプロジェクトに最適な環境ソリューションをアドバイスします。",
          icon: <MessageSquare className="h-10 w-10" />
        }
      ]}
      ctaText="環境印刷を始める"
      ctaLink="/contact"
      categories={categories}
    />
  );
};

export default EcoPrinting;
