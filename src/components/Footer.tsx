
import React from 'react';
import { Printer, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 会社情報 */}
          <div>
            <div className="flex items-center mb-4">
              <Printer className="h-6 w-6 mr-2 text-indigo-400" />
              <span className="font-semibold text-lg">文唱堂印刷株式会社</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              環境に配慮した印刷技術とAIの力で、ビジネスと社会の持続可能な発展に貢献します。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* 製品とサービス */}
          <div>
            <h3 className="font-semibold text-lg mb-4">製品とサービス</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">GX印刷ソリューション</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">AI分析ツール</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">サステナブル素材カタログ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">多言語翻訳・印刷</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">オンデマンド印刷</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">環境配慮型パッケージ</a></li>
            </ul>
          </div>
          
          {/* 会社について */}
          <div>
            <h3 className="font-semibold text-lg mb-4">会社について</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">会社概要</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">サステナビリティへの取り組み</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">採用情報</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">ニュースリリース</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">パートナー企業</a></li>
            </ul>
          </div>
          
          {/* お問い合わせ */}
          <div>
            <h3 className="font-semibold text-lg mb-4">お問い合わせ</h3>
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
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
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
