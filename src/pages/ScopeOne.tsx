
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBar, ArrowLeft, ArrowRight, Download, BarChart3, PieChart, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Scope 1 emission data example (direct emissions)
const defaultScopeOneData = {
  total: 245.8,
  unit: 'tCO2e',
  categories: [
    { name: '社有車', value: 68.2, percentage: 27.7, color: 'bg-blue-500' },
    { name: '定置燃焼機器', value: 125.4, percentage: 51.0, color: 'bg-green-500' },
    { name: '空調設備', value: 42.3, percentage: 17.2, color: 'bg-amber-500' },
    { name: 'その他', value: 9.9, percentage: 4.1, color: 'bg-red-400' },
  ],
  monthlyTrend: [
    { month: '4月', value: 22.3 },
    { month: '5月', value: 20.1 },
    { month: '6月', value: 21.5 },
    { month: '7月', value: 25.6 },
    { month: '8月', value: 24.8 },
    { month: '9月', value: 20.9 },
    { month: '10月', value: 21.3 },
    { month: '11月', value: 22.1 },
    { month: '12月', value: 23.5 },
    { month: '1月', value: 24.8 },
    { month: '2月', value: 19.2 },
    { month: '3月', value: 19.7 },
  ],
  yearOverYear: [
    { year: '2020年度', value: 295.6 },
    { year: '2021年度', value: 268.9 },
    { year: '2022年度', value: 245.8 },
  ],
  reductionTargets: [
    { year: '2023年度', target: 220.0, status: '進行中' },
    { year: '2024年度', target: 200.0, status: '計画中' },
    { year: '2025年度', target: 180.0, status: '計画中' },
    { year: '2030年度', target: 100.0, status: '計画中' },
  ]
};

const ScopeOne = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const [scopeOneData, setScopeOneData] = useState(defaultScopeOneData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    companyVehicles: defaultScopeOneData.categories[0].value,
    stationaryEquipment: defaultScopeOneData.categories[1].value,
    hvacEquipment: defaultScopeOneData.categories[2].value,
    other: defaultScopeOneData.categories[3].value,
    targetYear: '2023年度'
  });
  
  const downloadReport = () => {
    toast({
      title: "レポートのダウンロード",
      description: "Scope 1排出量の詳細レポートがダウンロードされました。",
      duration: 3000,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate new total
    const total = Object.values(formData)
      .filter((value): value is number => typeof value === 'number')
      .reduce((sum, value) => sum + value, 0);

    // Calculate new percentages
    const categories = [
      {
        name: '社有車',
        value: formData.companyVehicles,
        percentage: parseFloat(((formData.companyVehicles / total) * 100).toFixed(1)),
        color: 'bg-blue-500'
      },
      {
        name: '定置燃焼機器',
        value: formData.stationaryEquipment,
        percentage: parseFloat(((formData.stationaryEquipment / total) * 100).toFixed(1)),
        color: 'bg-green-500'
      },
      {
        name: '空調設備',
        value: formData.hvacEquipment,
        percentage: parseFloat(((formData.hvacEquipment / total) * 100).toFixed(1)),
        color: 'bg-amber-500'
      },
      {
        name: 'その他',
        value: formData.other,
        percentage: parseFloat(((formData.other / total) * 100).toFixed(1)),
        color: 'bg-red-400'
      }
    ];

    // Update the data
    setScopeOneData(prev => ({
      ...prev,
      total,
      categories,
      // Update the current year value in yearOverYear
      yearOverYear: prev.yearOverYear.map(item => 
        item.year === '2022年度' ? { ...item, value: total } : item
      ),
      // Update corresponding target
      reductionTargets: prev.reductionTargets.map(target => 
        target.year === formData.targetYear 
          ? { ...target, target: Math.round(total * 0.9) }
          : target
      )
    }));

    toast({
      title: "データ更新",
      description: "Scope 1排出量データが更新されました。",
      duration: 3000,
    });

    setShowForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      targetYear: value
    }));
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-xl">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-blue-200 mb-2">
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
                  Scope 1排出量データ
                </h1>
                <p className="text-lg opacity-90 mb-4">
                  企業が直接排出する温室効果ガス（自社所有の設備や車両からの排出）のデータ分析と可視化。削減目標に対する進捗状況を確認し、効果的な排出削減策を策定するためのインサイトを提供します。
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* データ入力フォーム */}
        {!showForm ? (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-green-600 hover:bg-green-700 font-semibold"
            >
              自社データを入力する
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-green-100 shadow-md overflow-hidden">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-green-800">Scope 1排出量データ入力</CardTitle>
                <CardDescription>自社の直接排出データを入力してください</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="companyVehicles">社有車 (tCO2e)</Label>
                        <Input 
                          id="companyVehicles" 
                          type="number" 
                          step="0.1"
                          value={formData.companyVehicles.toString()} 
                          onChange={(e) => handleInputChange('companyVehicles', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stationaryEquipment">定置燃焼機器 (tCO2e)</Label>
                        <Input 
                          id="stationaryEquipment" 
                          type="number" 
                          step="0.1"
                          value={formData.stationaryEquipment.toString()} 
                          onChange={(e) => handleInputChange('stationaryEquipment', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="hvacEquipment">空調設備 (tCO2e)</Label>
                        <Input 
                          id="hvacEquipment" 
                          type="number" 
                          step="0.1"
                          value={formData.hvacEquipment.toString()} 
                          onChange={(e) => handleInputChange('hvacEquipment', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="other">その他 (tCO2e)</Label>
                        <Input 
                          id="other" 
                          type="number" 
                          step="0.1"
                          value={formData.other.toString()} 
                          onChange={(e) => handleInputChange('other', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Label htmlFor="targetYear">削減目標年度</Label>
                    <Select value={formData.targetYear} onValueChange={handleSelectChange}>
                      <SelectTrigger className="w-full md:w-[200px] mt-1">
                        <SelectValue placeholder="年度を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {scopeOneData.reductionTargets.map((target, index) => (
                          <SelectItem key={index} value={target.year}>
                            {target.year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowForm(false)}
                    >
                      キャンセル
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-green-600 hover:bg-green-700"
                    >
                      データを更新
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ナビゲーションリンク */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Link to="/scope-one">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Scope 1
            </Button>
          </Link>
          <Link to="/scope-two">
            <Button variant="outline">
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
              <Card className="overflow-hidden border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-800">Scope 1 総排出量</CardTitle>
                  <CardDescription>2022年度実績</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                      <span className="text-5xl font-bold text-blue-700">{scopeOneData.total}</span>
                      <span className="text-xl ml-2 text-gray-500">{scopeOneData.unit}</span>
                      <p className="text-gray-600 mt-2">前年度比 {((1 - scopeOneData.total / scopeOneData.yearOverYear[1].value) * 100).toFixed(1)}% 削減</p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex gap-2" onClick={downloadReport}>
                        <Download className="h-4 w-4" />
                        レポート
                      </Button>
                      <Link to={`/scope-one?tab=details`}>
                        <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700">
                          詳細を見る
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* カテゴリ別排出量 */}
              <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-800">カテゴリ別排出量</CardTitle>
                  <CardDescription>排出源ごとの内訳</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {scopeOneData.categories.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">{category.name}</span>
                            <div className="text-right">
                              <span className="font-semibold">{category.value}</span>
                              <span className="text-sm text-gray-500 ml-1">{scopeOneData.unit}</span>
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
                          {scopeOneData.categories.map((category, index) => {
                            const previousPercentages = scopeOneData.categories
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
                          <PieChart className="h-6 w-6 text-blue-500 mb-1" />
                          <span className="text-sm font-medium">カテゴリ別</span>
                          <span className="text-xs text-gray-500">排出割合</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 月次推移 */}
              <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-800">月次排出量推移</CardTitle>
                  <CardDescription>2022年度</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 overflow-x-auto">
                  <div className="min-w-[600px] h-64 px-4">
                    <div className="flex justify-between items-end h-48 mb-4">
                      {scopeOneData.monthlyTrend.map((month, index) => {
                        const heightPercentage = (month.value / Math.max(...scopeOneData.monthlyTrend.map(m => m.value))) * 100;
                        return (
                          <motion.div 
                            key={index}
                            className="flex flex-col items-center"
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercentage}%` }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                          >
                            <div className="relative w-10">
                              <div className="absolute bottom-0 w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-t"></div>
                              <motion.div 
                                className="absolute bottom-0 w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-t"
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
                      {scopeOneData.monthlyTrend.map((month, index) => (
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
              <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-800">年次排出量推移</CardTitle>
                  <CardDescription>過去3年間の推移</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scopeOneData.yearOverYear.map((year, index) => (
                      <motion.div 
                        key={index}
                        className={`p-4 rounded-lg border ${index === scopeOneData.yearOverYear.length - 1 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="text-lg font-semibold text-gray-800 mb-2">{year.year}</div>
                        <div className="text-3xl font-bold text-blue-700 mb-2">{year.value} <span className="text-lg text-gray-500">{scopeOneData.unit}</span></div>
                        {index > 0 && (
                          <div className={`text-sm font-medium ${
                            year.value < scopeOneData.yearOverYear[index - 1].value ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {((1 - year.value / scopeOneData.yearOverYear[index - 1].value) * 100).toFixed(1)}% {
                              year.value < scopeOneData.yearOverYear[index - 1].value ? '削減' : '増加'
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
                      {scopeOneData.yearOverYear.map((year, index) => {
                        const heightPercentage = (year.value / Math.max(...scopeOneData.yearOverYear.map(y => y.value))) * 100;
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
                                  index === scopeOneData.yearOverYear.length - 1 
                                    ? 'bg-blue-500' 
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
              
              {/* 詳細なカテゴリ別分析 */}
              <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-800">カテゴリ別詳細</CardTitle>
                  <CardDescription>各排出源の詳細分析</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    {scopeOneData.categories.map((category, index) => (
                      <motion.div 
                        key={index}
                        className="p-4 border rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                          <h3 className="text-lg font-semibold">{category.name}</h3>
                          <div className="ml-auto text-right">
                            <span className="text-xl font-bold">{category.value}</span>
                            <span className="text-sm ml-1">{scopeOneData.unit}</span>
                            <div className="text-sm text-gray-500">総排出量の {category.percentage}%</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-600 mb-2">主な排出源</h4>
                            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                              {category.name === '社有車' && (
                                <>
                                  <li>社用車のガソリン・軽油使用</li>
                                  <li>営業・配送用車両</li>
                                  <li>通勤バス</li>
                                </>
                              )}
                              {category.name === '定置燃焼機器' && (
                                <>
                                  <li>ボイラー設備</li>
                                  <li>自家発電機</li>
                                  <li>調理・加熱設備</li>
                                </>
                              )}
                              {category.name === '空調設備' && (
                                <>
                                  <li>冷媒ガスの漏洩</li>
                                  <li>空調機器のメンテナンス</li>
                                </>
                              )}
                              {category.name === 'その他' && (
                                <>
                                  <li>非常用発電機</li>
                                  <li>小型機器燃料</li>
                                </>
                              )}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-600 mb-2">削減対策例</h4>
                            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                              {category.name === '社有車' && (
                                <>
                                  <li>EV車両への切り替え</li>
                                  <li>エコドライブ研修</li>
                                  <li>配送ルート最適化</li>
                                </>
                              )}
                              {category.name === '定置燃焼機器' && (
                                <>
                                  <li>高効率設備への更新</li>
                                  <li>バイオマス燃料の利用</li>
                                  <li>運転最適化</li>
                                </>
                              )}
                              {category.name === '空調設備' && (
                                <>
                                  <li>定期点検の強化</li>
                                  <li>低GWP冷媒への切り替え</li>
                                </>
                              )}
                              {category.name === 'その他' && (
                                <>
                                  <li>使用頻度の見直し</li>
                                  <li>代替エネルギーの検討</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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
              <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-800">排出量削減目標</CardTitle>
                  <CardDescription>短期・中期・長期目標の設定と進捗</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-800">2030年度までの削減目標</h3>
                    </div>
                    
                    <div className="relative pt-6 pb-12">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
                      
                      {scopeOneData.reductionTargets.map((target, index) => {
                        const progress = Math.min(100, Math.max(0, 100 - (target.target / scopeOneData.yearOverYear[0].value * 100)));
                        return (
                          <motion.div 
                            key={index}
                            className="relative mb-8 pl-8"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                          >
                            <div className="absolute left-0 top-2 -ml-2.5 h-5 w-5 rounded-full bg-white border-2 border-blue-500"></div>
                            <div className="flex flex-col md:flex-row md:items-center">
                              <div className="mb-2 md:mb-0 md:w-1/4">
                                <span className="text-lg font-semibold text-gray-800">{target.year}</span>
                                <span className="text-sm ml-2 text-gray-500">({target.status})</span>
                              </div>
                              <div className="md:w-3/4">
                                <div className="mb-2 flex justify-between">
                                  <span className="text-gray-700">目標: <span className="font-medium">{target.target}</span> {scopeOneData.unit}</span>
                                  <span className="text-gray-700">基準年比 {((1 - target.target / scopeOneData.yearOverYear[0].value) * 100).toFixed(0)}% 削減</span>
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
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      主要削減施策
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2">電気自動車への切り替え</h4>
                        <p className="text-sm text-gray-600 mb-2">社有車の50%をEVに切り替え。充電インフラの整備も並行して実施。</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">想定削減量</span>
                          <span className="font-medium text-green-600">約30 tCO2e/年</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2">高効率ボイラーの導入</h4>
                        <p className="text-sm text-gray-600 mb-2">老朽化した既存ボイラーを最新の高効率モデルに交換。エネルギー効率を25%向上。</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">想定削減量</span>
                          <span className="font-medium text-green-600">約45 tCO2e/年</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2">空調設備の冷媒管理強化</h4>
                        <p className="text-sm text-gray-600 mb-2">定期点検頻度の増加と漏洩検知システムの導入。低GWP冷媒への計画的な切り替え。</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">想定削減量</span>
                          <span className="font-medium text-green-600">約15 tCO2e/年</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        <h4 className="font-medium text-gray-800 mb-2">燃料使用の最適化</h4>
                        <p className="text-sm text-gray-600 mb-2">運転時間の見直しと負荷管理によるエネルギー消費の削減。遠隔モニタリングの導入。</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">想定削減量</span>
                          <span className="font-medium text-green-600">約20 tCO2e/年</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 削減シミュレーション */}
              <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-800">削減シミュレーション</CardTitle>
                  <CardDescription>施策実施による将来予測</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-64 mb-6">
                    <div className="h-60 relative">
                      {/* 簡易的なシミュレーショングラフ */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
                      <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-300"></div>
                      
                      {/* 実績線 */}
                      <svg className="absolute top-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path 
                          d="M 0,20 L 10,25 L 20,32"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                        {/* 予測線 */}
                        <motion.path 
                          d="M 20,32 L 30,40 L 40,48 L 60,60 L 80,72 L 100,85"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                        {/* 目標線 */}
                        <motion.path 
                          d="M 20,32 L 30,37 L 40,42 L 60,55 L 80,65 L 100,75"
                          stroke="#10B981"
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 1.2 }}
                        />
                      </svg>
                      
                      {/* Y軸ラベル */}
                      <div className="absolute -left-10 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                        <span>300</span>
                        <span>200</span>
                        <span>100</span>
                        <span>0</span>
                      </div>
                      
                      {/* X軸ラベル */}
                      <div className="absolute left-0 right-0 -bottom-6 flex justify-between text-xs text-gray-500">
                        <span>2020</span>
                        <span>2022</span>
                        <span>2024</span>
                        <span>2026</span>
                        <span>2028</span>
                        <span>2030</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-blue-500"></div>
                      <span className="text-sm text-gray-600">現状予測</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-green-500"></div>
                      <span className="text-sm text-gray-600">施策実施後</span>
                    </div>
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

export default ScopeOne;
