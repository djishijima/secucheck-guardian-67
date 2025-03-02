
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBar, ArrowLeft, ArrowRight, Download, BarChart3, PieChart, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

// Scope 2 emission data example (indirect emissions from purchased energy)
const scopeTwoData = {
  total: 532.7,
  unit: 'tCO2e',
  categories: [
    { name: '電力', value: 468.5, percentage: 87.9, color: 'bg-purple-500' },
    { name: '熱供給', value: 45.8, percentage: 8.6, color: 'bg-pink-500' },
    { name: '蒸気', value: 18.4, percentage: 3.5, color: 'bg-red-500' },
  ],
  monthlyTrend: [
    { month: '4月', value: 44.5 },
    { month: '5月', value: 42.8 },
    { month: '6月', value: 43.2 },
    { month: '7月', value: 49.7 },
    { month: '8月', value: 51.2 },
    { month: '9月', value: 47.3 },
    { month: '10月', value: 43.5 },
    { month: '11月', value: 42.8 },
    { month: '12月', value: 44.6 },
    { month: '1月', value: 43.9 },
    { month: '2月', value: 41.2 },
    { month: '3月', value: 38.0 },
  ],
  yearOverYear: [
    { year: '2020年度', value: 628.3 },
    { year: '2021年度', value: 571.5 },
    { year: '2022年度', value: 532.7 },
  ],
  locations: [
    { name: '本社', value: 215.6, percentage: 40.5 },
    { name: '工場A', value: 187.8, percentage: 35.3 },
    { name: '営業所', value: 76.3, percentage: 14.3 },
    { name: 'データセンター', value: 42.2, percentage: 7.9 },
    { name: 'その他拠点', value: 10.8, percentage: 2.0 },
  ],
  reductionTargets: [
    { year: '2023年度', target: 480.0, status: '進行中' },
    { year: '2024年度', target: 430.0, status: '計画中' },
    { year: '2025年度', target: 370.0, status: '計画中' },
    { year: '2030年度', target: 250.0, status: '計画中' },
  ]
};

const ScopeTwo = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const downloadReport = () => {
    toast({
      title: "レポートのダウンロード",
      description: "Scope 2排出量の詳細レポートがダウンロードされました。",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-8 text-white shadow-xl">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-purple-200 mb-2">
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
                  <ChartBar className="mr-3 h-8 w-8" />
                  Scope 2排出量データ
                </h1>
                <p className="text-lg opacity-90 mb-4">
                  購入した電力・熱の使用に伴う間接的な温室効果ガス排出量のデータ分析と可視化。
                  再生可能エネルギーへの切り替えなど、効果的な削減策の策定をサポートします。
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ナビゲーションリンク */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Link to="/scope-one">
            <Button variant="outline">
              Scope 1
            </Button>
          </Link>
          <Link to="/scope-two">
            <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
              Scope 2
            </Button>
          </Link>
          <Link to="/scope-three">
            <Button variant="outline">
              Scope 3
            </Button>
          </Link>
        </div>
        
        {/* タブナビゲーション */}
        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="details">詳細分析</TabsTrigger>
            <TabsTrigger value="reduction">削減計画</TabsTrigger>
          </TabsList>
          
          {/* 概要タブ */}
          <TabsContent value="overview">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* 総排出量カード */}
              <Card className="overflow-hidden border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-purple-800">Scope 2 総排出量</CardTitle>
                  <CardDescription>2022年度実績</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                      <span className="text-5xl font-bold text-purple-700">{scopeTwoData.total}</span>
                      <span className="text-xl ml-2 text-gray-500">{scopeTwoData.unit}</span>
                      <p className="text-gray-600 mt-2">前年度比 {((1 - scopeTwoData.total / scopeTwoData.yearOverYear[1].value) * 100).toFixed(1)}% 削減</p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex gap-2" onClick={downloadReport}>
                        <Download className="h-4 w-4" />
                        レポート
                      </Button>
                      <Link to={`/scope-two?tab=details`}>
                        <Button className="flex gap-2 bg-purple-600 hover:bg-purple-700">
                          詳細を見る
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* カテゴリ別排出量 */}
              <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-purple-800">エネルギー源別排出量</CardTitle>
                  <CardDescription>購入したエネルギー別の内訳</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {scopeTwoData.categories.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">{category.name}</span>
                            <div className="text-right">
                              <span className="font-semibold">{category.value}</span>
                              <span className="text-sm text-gray-500 ml-1">{scopeTwoData.unit}</span>
                              <span className="text-gray-400 text-sm ml-2">({category.percentage}%)</span>
                            </div>
                          </div>
                          <Progress value={category.percentage} className={`h-2 ${category.color}`} />
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center items-center">
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        {/* 円グラフの簡易表現 */}
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {scopeTwoData.categories.map((category, index) => {
                            const previousPercentages = scopeTwoData.categories
                              .slice(0, index)
                              .reduce((acc, cat) => acc + cat.percentage, 0);
                            const start = previousPercentages * 3.6; // 360度の円を100%で割った値
                            const end = start + category.percentage * 3.6;
                            
                            const startAngle = (start - 90) * (Math.PI / 180);
                            const endAngle = (end - 90) * (Math.PI / 180);
                            
                            const startX = 50 + 40 * Math.cos(startAngle);
                            const startY = 50 + 40 * Math.sin(startAngle);
                            const endX = 50 + 40 * Math.cos(endAngle);
                            const endY = 50 + 40 * Math.sin(endAngle);
                            
                            const largeArcFlag = category.percentage > 50 ? 1 : 0;
                            
                            const pathData = [
                              `M 50 50`,
                              `L ${startX} ${startY}`,
                              `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                              `Z`
                            ].join(' ');
                            
                            return (
                              <path
                                key={index}
                                d={pathData}
                                fill={category.color.replace('bg-', 'fill-').replace('-500', '-400')}
                                stroke="#fff"
                                strokeWidth="1"
                              />
                            );
                          })}
                          <circle cx="50" cy="50" r="25" fill="white" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <PieChart className="h-6 w-6 text-purple-500 mb-1" />
                          <span className="text-sm font-medium">エネルギー源別</span>
                          <span className="text-xs text-gray-500">排出割合</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 拠点別排出量 */}
              <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-purple-800">拠点別排出量</CardTitle>
                  <CardDescription>施設・拠点ごとの排出量</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {scopeTwoData.locations.map((location, index) => (
                      <motion.div 
                        key={index} 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">{location.name}</span>
                          <div className="text-right">
                            <span className="font-semibold">{location.value}</span>
                            <span className="text-sm text-gray-500 ml-1">{scopeTwoData.unit}</span>
                            <span className="text-gray-400 text-sm ml-2">({location.percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="h-full bg-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${location.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + (index * 0.1) }}
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* 月次推移 */}
              <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
                <CardHeader className="bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-purple-800">月次排出量推移</CardTitle>
                  <CardDescription>2022年度</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 overflow-x-auto">
                  <div className="min-w-[600px] h-64 px-4">
                    <div className="flex justify-between items-end h-48 mb-4">
                      {scopeTwoData.monthlyTrend.map((month, index) => {
                        const heightPercentage = (month.value / Math.max(...scopeTwoData.monthlyTrend.map(m => m.value))) * 100;
                        return (
                          <motion.div 
                            key={index}
                            className="flex flex-col items-center"
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercentage}%` }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                          >
                            <div className="relative w-10">
                              <div className="absolute bottom-0 w-full bg-purple-500 hover:bg-purple-600 transition-all rounded-t"></div>
                              <motion.div 
                                className="absolute bottom-0 w-full bg-purple-500 hover:bg-purple-600 transition-all rounded-t"
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercentage}%` }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                              ></motion.div>
                              <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium text-gray-700">
                                {month.value.toFixed(1)}
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                    <div className="flex justify-between">
                      {scopeTwoData.monthlyTrend.map((month, index) => (
                        <div key={index} className="text-center w-10">
                          <span className="text-xs text-gray-500">{month.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* 詳細分析タブ */}
          <TabsContent value="details">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* 年次推移 */}
              <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
                <CardHeader className="bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-purple-800">年次排出量推移</CardTitle>
                  <CardDescription>過去3年間の推移</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scopeTwoData.yearOverYear.map((year, index) => (
                      <motion.div 
                        key={index}
                        className={`p-4 rounded-lg border ${index === scopeTwoData.yearOverYear.length - 1 ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="text-lg font-semibold text-gray-800 mb-2">{year.year}</div>
                        <div className="text-3xl font-bold text-purple-700 mb-2">{year.value} <span className="text-lg text-gray-500">{scopeTwoData.unit}</span></div>
                        {index > 0 && (
                          <div className={`text-sm font-medium ${
                            year.value < scopeTwoData.yearOverYear[index - 1].value ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {((1 - year.value / scopeTwoData.yearOverYear[index - 1].value) * 100).toFixed(1)}% {
                              year.value < scopeTwoData.yearOverYear[index - 1].value ? '削減' : '増加'
                            }
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 h-64">
                    <div className="h-4 border-b border-gray-200 mb-2 relative">
                      <div className="absolute top-0 right-0 text-sm text-gray-500">tCO2e</div>
                    </div>
                    <div className="flex justify-around items-end h-48 mb-4">
                      {scopeTwoData.yearOverYear.map((year, index) => {
                        const heightPercentage = (year.value / Math.max(...scopeTwoData.yearOverYear.map(y => y.value))) * 100;
                        return (
                          <motion.div 
                            key={index}
                            className="flex flex-col items-center w-1/3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                          >
                            <div className="relative w-20">
                              <motion.div 
                                className={`w-full ${
                                  index === scopeTwoData.yearOverYear.length - 1 
                                    ? 'bg-purple-500' 
                                    : 'bg-gray-400'
                                } rounded-t-lg transition-all`}
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercentage}%` }}
                                transition={{ duration: 0.7, delay: index * 0.2 }}
                              ></motion.div>
                              <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium text-gray-700">
                                {year.value.toFixed(1)}
                              </div>
                            </div>
                            <div className="mt-2 text-center">
                              <span className="text-sm font-medium">{year.year}</span>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 電力調達分析 */}
              <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-purple-800">電力調達分析</CardTitle>
                  <CardDescription>電源構成と再エネ比率</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">現在の電源構成</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">石炭火力</span>
                            <span className="font-medium">32%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gray-700"
                              initial={{ width: 0 }}
                              animate={{ width: '32%' }}
                              transition={{ duration: 0.8 }}
                            ></motion.div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">LNG火力</span>
                            <span className="font-medium">38%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-yellow-500"
                              initial={{ width: 0 }}
                              animate={{ width: '38%' }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                            ></motion.div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">原子力</span>
                            <span className="font-medium">6%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-purple-400"
                              initial={{ width: 0 }}
                              animate={{ width: '6%' }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            ></motion.div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">水力</span>
                            <span className="font-medium">9%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-blue-400"
                              initial={{ width: 0 }}
                              animate={{ width: '9%' }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                            ></motion.div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">太陽光・風力</span>
                            <span className="font-medium">12%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-green-500"
                              initial={{ width: 0 }}
                              animate={{ width: '12%' }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                            ></motion.div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">その他</span>
                            <span className="font-medium">3%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gray-400"
                              initial={{ width: 0 }}
                              animate={{ width: '3%' }}
                              transition={{ duration: 0.8, delay: 0.5 }}
                            ></motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">再生可能エネルギー比率</h3>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700 font-medium">現在の再エネ比率</span>
                          <span className="text-xl font-bold text-purple-700">21%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
                          <motion.div 
                            className="h-full bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: '21%' }}
                            transition={{ duration: 1 }}
                          ></motion.div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700 font-medium">2030年目標</span>
                          <span className="text-xl font-bold text-green-600">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
                          <div className="h-full bg-gray-400 w-[60%]"></div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mt-4">
                          <p className="mb-2">再エネ電力への切り替えによる削減ポテンシャル:</p>
                          <p className="font-medium text-green-700">約 187 tCO2e/年</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 border rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          電力調達の選択肢
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                            <span>再エネ電力メニューへの切り替え</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                            <span>オンサイト太陽光発電の導入</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                            <span>コーポレートPPA（電力購入契約）</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                            <span>非化石証書・J-クレジットの購入</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* 削減計画タブ */}
          <TabsContent value="reduction">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* 目標と進捗 */}
              <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-purple-800">排出量削減目標</CardTitle>
                  <CardDescription>短期・中期・長期目標の設定と進捗</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold text-gray-800">2030年度までの削減目標</h3>
                    </div>
                    
                    <div className="relative pt-6 pb-12">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
                      
                      {scopeTwoData.reductionTargets.map((target, index) => {
                        const progress = Math.min(100, Math.max(0, 100 - (target.target / scopeTwoData.yearOverYear[0].value * 100)));
                        return (
                          <motion.div 
                            key={index}
                            className="relative mb-8 pl-8"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                          >
                            <div className="absolute left-0 top-2 -ml-2.5 h-5 w-5 rounded-full bg-white border-2 border-purple-500"></div>
                            <div className="flex flex-col md:flex-row md:items-center">
                              <div className="mb-2 md:mb-0 md:w-1/4">
                                <span className="text-lg font-semibold text-gray-800">{target.year}</span>
                                <span className="text-sm ml-2 text-gray-500">({target.status})</span>
                              </div>
                              <div className="md:w-3/4">
                                <div className="mb-2 flex justify-between">
                                  <span className="text-gray-700">目標: <span className="font-medium">{target.target}</span> {scopeTwoData.unit}</span>
                                  <span className="text-gray-700">基準年比 {((1 - target.target / scopeTwoData.yearOverYear[0].value) * 100).toFixed(0)}% 削減</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-green-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, delay: 0.3 + (index * 0.2) }}
                                  ></motion.div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* 主要削減施策 */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      主要削減施策
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        className="border rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2">再生可能エネルギーへの切り替え</h4>
                        <p className="text-sm text-gray-600 mb-2">2025年までに電力の40%、2030年までに60%を再エネ由来に切り替え</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">想定削減量</span>
                          <span className="font-medium text-green-600">約187 tCO2e/年</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="border rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2">オンサイト太陽光発電の導入</h4>
                        <p className="text-sm text-gray-600 mb-2">本社および工場Aの屋上に太陽光パネルを設置し、自家消費型の再エネを確保</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">想定削減量</span>
                          <span className="font-medium text-green-600">約65 tCO2e/年</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="border rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2">建物のエネルギー効率化</h4>
                        <p className="text-sm text-gray-600 mb-2">LED照明への全面切り替え、高効率空調の導入、断熱改修の実施</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">想定削減量</span>
                          <span className="font-medium text-green-600">約78 tCO2e/年</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="border rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2">省エネ運用の強化</h4>
                        <p className="text-sm text-gray-600 mb-2">エネルギーマネジメントシステムの導入、デマンドレスポンスの実施</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">想定削減量</span>
                          <span className="font-medium text-green-600">約45 tCO2e/年</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 投資計画と回収期間 */}
              <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-purple-50 border-b border-purple-100">
                  <CardTitle className="text-purple-800">投資計画</CardTitle>
                  <CardDescription>削減施策の経済性分析</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">施策</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">初期投資額</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年間削減額</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">単純回収年</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO2削減単価</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">再エネ電力への切り替え</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">0円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">-350万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">-</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">18,700円/t-CO2</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">オンサイト太陽光発電</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5,600万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">580万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">9.7年</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">8,600円/t-CO2</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">LED照明への切り替え</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2,200万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">450万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">4.9年</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5,500円/t-CO2</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">高効率空調導入</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">3,800万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">520万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">7.3年</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">7,900円/t-CO2</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">エネルギー管理システム</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1,200万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">380万円</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">3.2年</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2,700円/t-CO2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeTwo;
