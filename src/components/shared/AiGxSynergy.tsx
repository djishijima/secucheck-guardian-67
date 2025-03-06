
import React from 'react';
import { Brain } from 'lucide-react';

const AiGxSynergy = () => {
  return (
    <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <Brain className="mr-2 h-6 w-6 text-blue-600" />
          AI × GXの融合
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          文唱堂印刷では、AI技術とグリーントランスフォーメーション（GX）を融合させ、
          環境に配慮しながら、ビジネス効率を高める革新的なソリューションを提供しています。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-3 text-blue-700">AIによる資源最適化</h3>
            <p className="text-gray-700 mb-4">
              AI分析により、印刷プロセスでの資源使用量を最小化。必要な量だけのインクと紙を使用し、
              廃棄物を削減します。これにより、環境負荷の低減とコスト削減を同時に実現します。
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                インク使用量の15%削減
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                紙の無駄を30%低減
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                エネルギー消費の最適化
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-3 text-green-700">カーボンフットプリント計算</h3>
            <p className="text-gray-700 mb-4">
              AIが印刷物ごとのカーボンフットプリントを正確に計算し、環境影響を可視化。
              お客様はデータに基づいた環境配慮型の選択ができるようになります。
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                リアルタイムCO2排出量計算
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                環境負荷の少ない代替案の提案
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                企業のESGレポート作成支援
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiGxSynergy;
