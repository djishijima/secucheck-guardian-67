
import React from 'react';
import { Printer, Mail, Phone, MapPin, Leaf, Cpu, Building, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 製品・サービス */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-green-500" />
              製品・サービス
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition">すべて</Link></li>
              <li><Link to="/products?category=printing" className="text-gray-400 hover:text-white transition">印刷・出版サービス</Link></li>
              <li><Link to="/products?category=logistics" className="text-gray-400 hover:text-white transition">物流・配送サービス</Link></li>
              <li><Link to="/products?category=energy" className="text-gray-400 hover:text-white transition">エネルギー管理</Link></li>
              <li><Link to="/products?category=design" className="text-gray-400 hover:text-white transition">デザイン・マーケティング</Link></li>
              <li><Link to="/products?category=education" className="text-gray-400 hover:text-white transition">教育・研修</Link></li>
              <li><Link to="/products?category=audit" className="text-gray-400 hover:text-white transition">監査・分析</Link></li>
              <li><Link to="/gx-ai-products" className="text-gray-400 hover:text-white transition font-medium">GX×AI製品特集</Link></li>
            </ul>
          </div>
          
          {/* サステナブルDX診断 */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Cpu className="h-5 w-5 mr-2 text-blue-500" />
              診断サービス
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about-gx" className="text-gray-400 hover:text-white transition">サステナビリティについて</Link></li>
              <li><Link to="/sustainability-check" className="text-gray-400 hover:text-white transition">サステナビリティ診断</Link></li>
              <li><Link to="/comprehensive-diagnostics" className="text-gray-400 hover:text-white transition">サステナブルDX診断</Link></li>
              <li><Link to="/scope-one" className="text-gray-400 hover:text-white transition">スコープ1診断</Link></li>
              <li><Link to="/scope-two" className="text-gray-400 hover:text-white transition">スコープ2診断</Link></li>
            </ul>
          </div>
          
          {/* 会社について */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-indigo-500" />
              会社について
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-400 shrink-0" />
                <span className="text-gray-400">〒101-0025 東京都千代田区神田佐久間町3-37</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400 shrink-0" />
                <a href="tel:+810338510111" className="text-gray-400 hover:text-white transition">03-3851-0111</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400 shrink-0" />
                <a href="mailto:info@bunshodoh.co.jp" className="text-gray-400 hover:text-white transition">info@bunshodoh.co.jp</a>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400 ml-7">FAX：03-3861-1979</span>
              </li>
            </ul>
          </div>
          
          {/* お問合せ */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-yellow-500" />
              お問合せ
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">お見積り依頼</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">サンプル請求</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">製品に関するお問合せ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">採用情報</Link></li>
            </ul>
          </div>
        </div>
        
        {/* 会社名と権利表記 */}
        <div className="flex items-center mb-4">
          <Printer className="h-6 w-6 mr-2 text-indigo-400" />
          <span className="font-semibold text-lg">文唱堂印刷株式会社</span>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} 文唱堂印刷株式会社. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-xs text-gray-400 hover:text-white transition">プライバシーポリシー</a>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition">利用規約</a>
              <a href="#" className="text-xs text-gray-400 hover:text-white transition">特定商取引法に基づく表記</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
