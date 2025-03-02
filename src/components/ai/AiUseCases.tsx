
import React from 'react';
import { Cpu, Brain } from 'lucide-react';

const AiUseCases = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">AI技術の活用事例</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:shrink-0 bg-blue-100 flex items-center justify-center p-6">
            <Cpu className="h-20 w-20 text-blue-600" />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">大手出版社</div>
            <h3 className="mt-1 text-xl font-semibold text-gray-900">多言語出版物の効率化</h3>
            <p className="mt-2 text-gray-600">
              40カ国以上で展開する教育雑誌の出版社が、当社のAI翻訳システムを導入。翻訳時間を75%削減し、
              人的リソースを創造的な編集作業に集中させることで、品質向上とコスト削減を同時に実現しました。
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:shrink-0 bg-green-100 flex items-center justify-center p-6">
            <Brain className="h-20 w-20 text-green-600" />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-green-500 font-semibold">環境配慮型企業連合</div>
            <h3 className="mt-1 text-xl font-semibold text-gray-900">サステナブルレポートの自動生成</h3>
            <p className="mt-2 text-gray-600">
              100社以上の企業が参加する環境連合が、AIドキュメント分析と環境データ処理技術を活用。
              各社のESGデータを統合・分析し、一貫性のある高品質なサステナビリティレポートを自動生成することに成功しました。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiUseCases;
