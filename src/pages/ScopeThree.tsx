
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LineChart, BarChart3, PieChart, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ScopeThree = () => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  
  const handleShowForm = () => {
    setShowForm(true);
    toast({
      title: "開発中の機能",
      description: "Scope 3データ入力機能は現在開発中です。近日公開予定です。",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <div className="mb-8">
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl p-8 text-white shadow-xl">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-amber-200 mb-2">
                  <Link to="/sustainability-check" className="hover:text-white flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> サステナビリティ診断
                  </Link>
                  <span>/</span>
                  <span>排出量データ</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                    <PieChart className="mr-3 h-8 w-8" />
                    Scope 3排出量データ
                  </h1>
                  <p className="text-lg opacity-90 mb-4 text-white">
                    バリューチェーン全体で発生する温室効果ガス排出（調達、販売、製品使用など）の包括的なデータ分析と可視化。サプライチェーン全体での排出削減に向けた戦略立案に役立ちます。
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>
        
        {/* スコープナビゲーション */}
        <div className="mb-8">
          <Card className="border-amber-100">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <Link to="/scope-one">
                  <Button 
                    variant="outline"
                    className="border-blue-200 text-blue-700 flex items-center gap-2"
                  >
                    <LineChart className="h-4 w-4" />
                    Scope 1
                  </Button>
                </Link>
                <Link to="/scope-two">
                  <Button 
                    variant="outline"
                    className="border-blue-200 text-blue-700 flex items-center gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Scope 2
                  </Button>
                </Link>
                <Link to="/scope-three">
                  <Button 
                    variant="default"
                    className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
                  >
                    <PieChart className="h-4 w-4" />
                    Scope 3
                  </Button>
                </Link>
                <div className="ml-auto">
                  <Button 
                    onClick={handleShowForm}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                  >
                    自社データを入力する
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* コンテンツ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 my-8"
        >
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800">開発中の機能</AlertTitle>
            <AlertDescription className="text-amber-700">
              Scope 3（その他の間接排出）の計測・管理機能は現在開発中です。近日公開予定ですので、今しばらくお待ちください。
            </AlertDescription>
          </Alert>
          
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-xl text-amber-800">Scope 3とは</CardTitle>
              <CardDescription>サプライチェーン全体での温室効果ガス排出</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Scope 3排出量とは、企業の事業活動に関連する「その他の間接排出」を指します。
                自社の直接排出（Scope 1）や電力使用による間接排出（Scope 2）以外の、
                バリューチェーン全体で発生する排出量が対象となります。
              </p>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h3 className="font-semibold text-amber-800 mb-2">Scope 3カテゴリー（例）</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>購入した物品・サービス</li>
                  <li>資本財</li>
                  <li>燃料・エネルギー関連活動</li>
                  <li>輸送・流通（上流）</li>
                  <li>事業から出る廃棄物</li>
                  <li>出張</li>
                  <li>従業員の通勤</li>
                  <li>リース資産（上流）</li>
                  <li>輸送・流通（下流）</li>
                  <li>販売した製品の加工</li>
                  <li>販売した製品の使用</li>
                  <li>販売した製品の廃棄</li>
                  <li>リース資産（下流）</li>
                  <li>フランチャイズ</li>
                  <li>投資</li>
                </ul>
              </div>
              
              <p className="text-gray-700">
                Scope 3排出量は、多くの企業にとって全体の温室効果ガス排出量の大部分を占めています。
                そのため、効果的な気候変動対策には、Scope 3排出量の把握と削減が不可欠です。
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline"
              onClick={() => toast({
                title: "お知らせ登録",
                description: "Scope 3機能のリリース時にお知らせいたします。",
              })}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Scope 3機能のリリース通知を受け取る
            </Button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeThree;
