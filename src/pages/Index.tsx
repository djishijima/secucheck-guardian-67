
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProductListSection from '@/components/home/ProductListSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import { Leaf, ArrowRight, ChartBar, FileText } from 'lucide-react';
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
        
        {/* サステナビリティ診断のプロモーション */}
        <section className="my-16 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <div className="flex items-center mb-2">
                <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
                <h2 className="text-2xl font-bold text-emerald-800">サステナビリティ自己診断ツール</h2>
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
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md">
                  今すぐ診断する <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* サステナブルDX診断のプロモーション */}
        <section className="my-16 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <div className="flex items-center mb-2">
                <ChartBar className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-bold text-indigo-800">サステナブルDX診断サービス</h2>
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
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md">
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
