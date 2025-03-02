
import React from 'react';
import { Printer, Database, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">GX x AIの力で、ビジネスを変革</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <Printer className="h-12 w-12 text-indigo-600 mb-2" />
            <CardTitle>環境配慮型印刷</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              再生可能素材と省エネルギー技術を活用した、環境負荷の少ない印刷サービスを提供します。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Database className="h-12 w-12 text-indigo-600 mb-2" />
            <CardTitle>AI分析技術</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              高度な機械学習モデルによるデータ分析で、ビジネス意思決定を支援し、効率化を実現します。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Globe className="h-12 w-12 text-indigo-600 mb-2" />
            <CardTitle>持続可能なソリューション</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              SDGsに沿った持続可能なビジネスモデルの構築を支援し、企業の社会的責任を促進します。
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
