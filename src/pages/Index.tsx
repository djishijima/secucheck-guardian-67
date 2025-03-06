
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
import { motion } from 'framer-motion';

const Index = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <HeroSection />
        <ProductListSection />
        <FeaturesSection />
        
        {/* サステナビリティ診断のプロモーション */}
        <motion.section 
          className="my-16 bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200 shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
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
              <p className="text-sm text-gray-600 mb-4 bg-white/70 p-2 rounded-lg inline-block">
                ✓ 約5分で完了 ✓ 業界別ベンチマーク ✓ AIによる分析レポート
              </p>
            </div>
            <div>
              <Link to="/sustainability-check">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                  今すぐ診断する <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
        
        {/* サステナブルDX診断のプロモーション */}
        <motion.section 
          className="my-16 bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200 shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
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
              <p className="text-sm text-gray-600 mb-4 bg-white/70 p-2 rounded-lg inline-block">
                ✓ 包括的な診断 ✓ 具体的な改善提案 ✓ 専門家による分析
              </p>
            </div>
            <div>
              <Link to="/comprehensive-diagnostics">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                  診断サービスを見る <FileText className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
