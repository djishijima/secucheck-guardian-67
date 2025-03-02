
import React from 'react';
import { Image, Languages, FileText, BarChart, MessageSquare, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AITechnologies = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-10 text-center">私たちのAI技術</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <Image className="h-12 w-12 text-blue-600 mb-2" />
            <CardTitle>AIイメージ最適化</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              機械学習アルゴリズムが画像を分析し、印刷に最適な形に自動調整。色彩、コントラスト、シャープネスを最適化し、あらゆる印刷物で美しい仕上がりを実現します。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Languages className="h-12 w-12 text-blue-600 mb-2" />
            <CardTitle>多言語AI翻訳</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              コンテキストを理解する高精度なAI翻訳が、40以上の言語に対応。文化的ニュアンスも考慮した翻訳で、グローバルなコミュニケーションをサポートします。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <FileText className="h-12 w-12 text-blue-600 mb-2" />
            <CardTitle>AIドキュメント分析</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              大量の文書から重要な情報を抽出し、インサイトを提供。契約書、報告書など、あらゆるビジネス文書の効率的な管理と分析を実現します。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <BarChart className="h-12 w-12 text-blue-600 mb-2" />
            <CardTitle>データ駆動型印刷最適化</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              印刷データの分析により、インク使用量、紙の消費、エネルギー使用を最適化。コスト削減と環境負荷低減を同時に実現する、スマートな印刷システムです。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <MessageSquare className="h-12 w-12 text-blue-600 mb-2" />
            <CardTitle>デザインアシスタントAI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              自然言語による指示からデザイン案を生成。ブランドガイドラインに沿った、一貫性のあるデザインを効率的に作成します。創造的なプロセスをAIがサポートします。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Lightbulb className="h-12 w-12 text-blue-600 mb-2" />
            <CardTitle>予測メンテナンスシステム</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              印刷機器の状態をリアルタイムで監視し、問題を事前に予測。ダウンタイムを最小限に抑え、生産効率を最大化するスマートファクトリーを実現します。
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AITechnologies;
