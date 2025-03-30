
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProductListSection from '@/components/home/ProductListSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import { Leaf, ArrowRight, ChartBar, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <HeroSection />
        <ProductListSection />
        <FeaturesSection />
        
        {/* 統合診断サービスプロモーション */}
        <section className="my-16 bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border border-blue-100 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0 pr-4">
              <div className="flex items-center mb-3">
                <Lightbulb className="h-7 w-7 text-yellow-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">あなたの企業のサステナビリティを徹底診断！</h2>
              </div>
              <p className="text-gray-700 mb-4 text-lg">
                サステナビリティ診断、サステナブルDX診断、GX評価、スコープ1～3評価を無料で実施。
                今すぐメール登録して、改善ポイントと戦略をチェック！
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-white bg-opacity-60 rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="text-green-600 mr-1">✓</span> 無料診断
                </div>
                <div className="bg-white bg-opacity-60 rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="text-green-600 mr-1">✓</span> 3営業日で結果
                </div>
                <div className="bg-white bg-opacity-60 rounded-full px-3 py-1 text-sm flex items-center">
                  <span className="text-green-600 mr-1">✓</span> 改善提案付き
                </div>
              </div>
            </div>
            <div>
              <Link to="/diagnostic-landing">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg text-white gap-2 px-6 py-6 h-auto text-lg">
                  無料診断を受ける
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* サステナビリティ診断のプロモーション */}
        <section className="my-16 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <div className="flex items-center mb-2">
                <Leaf className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-bold text-green-800">サステナビリティ自己診断ツール</h2>
              </div>
              <p className="text-gray-700 mb-4">
                無料の自己診断ツールで、貴社のSDGs取り組み状況を可視化。専門家による具体的な改善提案とともに、
                サステナビリティレポート作成のための基礎データを取得できます。
              </p>
              <p className="text-sm text-gray-600 mb-4">
                ✓ 約5分で完了 ✓ 業界別ベンチマーク ✓ AIによる分析レポート
              </p>
            </div>
            <div>
              <Link to="/sustainability-check">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md">
                  今すぐ診断する <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* サステナブルDX診断のプロモーション */}
        <section className="my-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <div className="flex items-center mb-2">
                <ChartBar className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-blue-800">サステナブルDX診断サービス</h2>
              </div>
              <p className="text-gray-700 mb-4">
                サステナビリティとDXの両面から企業の現状を総合的に診断。GX対応度、データ活用、セキュリティなど
                多角的視点での評価と改善提案を提供します。
              </p>
              <p className="text-sm text-gray-600 mb-4">
                ✓ 包括的な診断 ✓ 具体的な改善提案 ✓ 専門家による分析
              </p>
            </div>
            <div>
              <Link to="/comprehensive-diagnostics">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
                  診断サービスを見る <FileText className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
