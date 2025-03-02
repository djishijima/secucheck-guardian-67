
import React from 'react';
import { Award } from 'lucide-react';

const GxCertifications = () => {
  return (
    <section className="mb-16 bg-gray-100 rounded-xl p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <Award className="mr-2 h-6 w-6 text-green-600" />
          取得認証・受賞歴
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-3">環境認証</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                ISO 14001（環境マネジメントシステム）
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                FSC認証（森林管理協議会）
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                カーボンニュートラル認証
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                エコマーク認定事業者
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                グリーンプリンティング認定
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-3">受賞歴</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                2023年 環境経営大賞
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                2022年 グリーンイノベーションアワード
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                2021年 サステナブルプリンティング優秀賞
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                2020年 環境配慮型企業表彰
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                2019年 資源循環技術・システム表彰
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GxCertifications;
