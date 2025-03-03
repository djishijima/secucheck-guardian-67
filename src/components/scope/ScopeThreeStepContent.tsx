
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ScopeThreeStepContentProps {
  activeStepId: string;
}

const ScopeThreeStepContent: React.FC<ScopeThreeStepContentProps> = ({
  activeStepId
}) => {
  // For now, Scope Three just displays a "coming soon" message for all steps
  return (
    <div className="space-y-6">
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <AlertTitle className="text-amber-800">開発中の機能</AlertTitle>
        <AlertDescription className="text-amber-700">
          Scope 3（その他の間接排出）の計測・管理機能は現在開発中です。近日公開予定ですので、今しばらくお待ちください。
        </AlertDescription>
      </Alert>
      
      <Card className="border-amber-100">
        <CardHeader>
          <CardTitle className="text-xl text-amber-800">Scope 3とは</CardTitle>
          <CardDescription>サプライチェーン全体での温室効果ガス排出</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Scope 3排出量とは、企業の事業活動に関連する「その他の間接排出」を指します。
            自社の直接排出（Scope 1）や電力使用による間接排出（Scope 2）以外の、
            バリューチェーン全体で発生する排出量が対象となります。
          </p>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h3 className="font-semibold text-amber-800 mb-2">Scope 3カテゴリー（例）</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>購入した物品・サービス</li>
              <li>資本財</li>
              <li>燃料・エネルギー関連活動</li>
              <li>輸送・流通（上流）</li>
              <li>事業から出る廃棄物</li>
              <li>出張</li>
              <li>従業員の通勤</li>
              <li>リース資産（上流）</li>
              <li>輸送・流通（下流）</li>
              <li>販売した製品の加工</li>
              <li>販売した製品の使用</li>
              <li>販売した製品の廃棄</li>
              <li>リース資産（下流）</li>
              <li>フランチャイズ</li>
              <li>投資</li>
            </ul>
          </div>
          
          <p className="text-gray-700">
            Scope 3排出量は、多くの企業にとって全体の温室効果ガス排出量の大部分を占めています。
            そのため、効果的な気候変動対策には、Scope 3排出量の把握と削減が不可欠です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScopeThreeStepContent;
