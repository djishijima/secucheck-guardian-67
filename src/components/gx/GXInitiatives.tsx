
import React from 'react';
import { Leaf, Recycle, TreePine, Wind, Droplets, Factory } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GXInitiatives = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-10 text-center">私たちのGX取り組み</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <Leaf className="h-12 w-12 text-green-600 mb-2" />
            <CardTitle>サステナブル素材</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              FSC認証紙やリサイクル素材、バイオマスインクなど、環境負荷の少ない素材を積極的に採用しています。また、独自開発のバイオインクは、生分解性に優れ、環境への影響を最小限に抑えます。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Recycle className="h-12 w-12 text-green-600 mb-2" />
            <CardTitle>ゼロウェイスト生産</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              生産工程で発生する廃棄物を削減し、リサイクルを徹底することで、埋立廃棄物ゼロを目指しています。裁断くずや余剰紙は、新たな紙製品へと再生されます。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <TreePine className="h-12 w-12 text-green-600 mb-2" />
            <CardTitle>カーボンオフセット</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              印刷工程で発生するCO2を算出し、森林保全プロジェクトへの投資を通じてカーボンオフセットを実施。お客様の印刷物がカーボンニュートラルとなるよう支援しています。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Wind className="h-12 w-12 text-green-600 mb-2" />
            <CardTitle>再生可能エネルギー</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              工場の電力を100%再生可能エネルギーに切り替え、太陽光発電パネルの設置により、自家発電も推進。エネルギー効率の高い最新設備への投資も行っています。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Droplets className="h-12 w-12 text-green-600 mb-2" />
            <CardTitle>水資源保護</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              水性インクの採用と高度な水処理システムにより、水質汚染を防止。印刷工程での水使用量も削減し、貴重な水資源の保護に貢献しています。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Factory className="h-12 w-12 text-green-600 mb-2" />
            <CardTitle>グリーンサプライチェーン</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              調達から配送まで、サプライチェーン全体での環境負荷低減を推進。取引先にも環境基準を設け、持続可能な事業運営を奨励しています。
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GXInitiatives;
