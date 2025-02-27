
import React from 'react';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium text-gray-700">SecurityGuardian</span>
          </div>
          <div className="text-sm text-gray-500">
            <p>このツールは実際の脆弱性スキャンを実行します。法的許可のある環境でのみ使用してください。</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-700">セキュリティ警告</h3>
                <p className="text-sm text-red-600">
                  日本の企業の97%がセキュリティ侵害を経験しています。実際の攻撃は示されたデモよりも深刻で、
                  企業データの完全な流出、金銭的損失、風評被害につながる可能性があります。
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <div className="flex items-center mb-1">
                <AlertCircle className="h-4 w-4 text-yellow-600 mr-1" />
                <span className="font-medium text-yellow-800">2023年日本サイバー攻撃統計</span>
              </div>
              <ul className="list-disc list-inside text-yellow-700 space-y-1 pl-1">
                <li>中小企業の67%が何らかのサイバー攻撃を受けています</li>
                <li>侵害されたWebサイトの平均検出時間: 197日</li>
                <li>データ漏洩の平均コスト: 4億2千万円</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="flex items-center mb-1">
                <Shield className="h-4 w-4 text-blue-600 mr-1" />
                <span className="font-medium text-blue-800">推奨セキュリティ対策</span>
              </div>
              <ul className="list-disc list-inside text-blue-700 space-y-1 pl-1">
                <li>定期的な脆弱性スキャンの実施（月1回以上）</li>
                <li>多要素認証の導入</li>
                <li>従業員のセキュリティ教育</li>
                <li>専門セキュリティ会社によるリスク評価</li>
              </ul>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-500">
            実際のセキュリティリスクは表示されるデモよりも深刻です。<span className="font-semibold">あなたのビジネスを今すぐ保護してください。</span>
          </p>
          <p className="mt-1 text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} SecurityGuardian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
