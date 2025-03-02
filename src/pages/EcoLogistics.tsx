
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Package, BarChart, Map, Clock, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";

const EcoLogistics = () => {
  const categories = {
    function: "物流・配送サービス",
    technology: "再生可能エネルギー製品",
    challenge: "カーボンフットプリント削減"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* ヒーローセクション */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">環境物流サービス</h1>
                  <p className="text-xl text-indigo-600 mb-4">持続可能なサプライチェーンとロジスティクスソリューション</p>
                  <p className="text-gray-600 mb-6">当社の環境物流サービスは、お客様の印刷物の配送過程における環境負荷を最小限に抑えます。低排出ガス車両、最適化された配送ルート、環境に配慮した梱包材料を組み合わせ、効率性を損なうことなく持続可能性を実現します。</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      物流・配送サービス
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      再生可能エネルギー製品
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      カーボンフットプリント削減
                    </span>
                  </div>
                  
                  <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
                    <a href="/contact">環境物流を利用する</a>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-xl bg-white">
                  <img 
                    src="/images/eco-logistics.jpg" 
                    alt="環境物流サービス" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">主な特徴</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 mb-4">
                  <Truck className="h-10 w-10" />
                </div>
                <h3 className="font-semibold text-xl mb-2">グリーンフリート</h3>
                <p className="text-gray-600">電気自動車、バイオ燃料車、ハイブリッド車から構成される低排出ガス配送網を活用します。</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 mb-4">
                  <Package className="h-10 w-10" />
                </div>
                <h3 className="font-semibold text-xl mb-2">エコパッケージング</h3>
                <p className="text-gray-600">リサイクル素材、生分解性材料、再利用可能な梱包ソリューションを提供します。</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 mb-4">
                  <BarChart className="h-10 w-10" />
                </div>
                <h3 className="font-semibold text-xl mb-2">炭素排出量追跡</h3>
                <p className="text-gray-600">各配送の環境影響をリアルタイムで監視し、詳細な持続可能性レポートを提供します。</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 mb-4">
                  <Map className="h-10 w-10" />
                </div>
                <h3 className="font-semibold text-xl mb-2">スマートルーティング</h3>
                <p className="text-gray-600">AI最適化アルゴリズムを使用して、最も効率的かつ環境に優しい配送ルートを計画します。</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 mb-4">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="font-semibold text-xl mb-2">タイムスロット配送</h3>
                <p className="text-gray-600">配送時間の正確な指定により、無駄な走行と交通渋滞の影響を軽減します。</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 mb-4">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="font-semibold text-xl mb-2">安全な輸送保証</h3>
                <p className="text-gray-600">環境に優しい方法でありながら、商品の完全な保護と安全を保証します。</p>
              </div>
            </div>
          </div>
        </section>

        {/* メリットセクション */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">導入メリット</h2>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">従来の物流と比較して最大45%のCO2排出量削減</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">生分解性・再利用可能な梱包材料の使用</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">ルート最適化による燃料消費の削減と効率性の向上</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">電気自動車と代替燃料車両の導入</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">環境負荷を測定する詳細な配送レポート</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">地域の環境イニシアチブとの提携によるオフセットプログラム</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="bg-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">今すぐ持続可能な未来へ</h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              環境に配慮した選択が、ビジネスと地球の両方にとって大きな違いを生み出します。
              今日から始めましょう。
            </p>
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100" asChild>
              <a href="/contact">環境物流を利用する</a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EcoLogistics;
