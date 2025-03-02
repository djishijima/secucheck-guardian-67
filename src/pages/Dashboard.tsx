
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, PieChart, LineChart, Activity, ArrowUpRight, ArrowDownRight, TrendingUp, Leaf, Recycle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';

const carbonData = [
  { name: '1月', 排出量: 4000 },
  { name: '2月', 排出量: 3800 },
  { name: '3月', 排出量: 3600 },
  { name: '4月', 排出量: 3400 },
  { name: '5月', 排出量: 3200 },
  { name: '6月', 排出量: 3000 },
];

const recycleData = [
  { name: 'リサイクル', value: 68 },
  { name: '再利用', value: 22 },
  { name: '廃棄', value: 10 },
];

const energyData = [
  { name: '1月', 使用量: 500 },
  { name: '2月', 使用量: 480 },
  { name: '3月', 使用量: 460 },
  { name: '4月', 使用量: 440 },
  { name: '5月', 使用量: 420 },
  { name: '6月', 使用量: 400 },
];

const COLORS = ['#4ade80', '#60a5fa', '#f87171'];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ダッシュボードヘッダー */}
        <section className="mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold">サステナビリティダッシュボード</h1>
              <p className="text-gray-600">環境パフォーマンスと持続可能性指標のリアルタイム可視化</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">レポート出力</Button>
              <Button size="sm">データ更新</Button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">CO2排出削減量</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">125.4t</div>
                  <Badge className="bg-green-100 text-green-800 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    12.5%
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">前年比</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">リサイクル率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">68%</div>
                  <Badge className="bg-green-100 text-green-800 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    8.3%
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">前年比</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">再生可能エネルギー比率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">42%</div>
                  <Badge className="bg-green-100 text-green-800 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    15%
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">前年比</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* チャートセクション */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-blue-600" />
                  CO2排出量推移
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={carbonData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="排出量" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-green-600" />
                  廃棄物処理内訳
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={recycleData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {recycleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-purple-600" />
                エネルギー使用量推移
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={energyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="使用量" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* サステナビリティ目標セクション */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-green-600" />
            サステナビリティ目標進捗
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="mr-2 h-5 w-5 text-green-600" />
                  2030年カーボンニュートラル
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-600">進捗状況: 35%</span>
                  <span className="text-sm font-medium">35% / 100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  2030年までに事業活動全体でのカーボンニュートラルを達成するための取り組み。現在、再生可能エネルギーへの切り替えとオフセットにより35%達成。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Recycle className="mr-2 h-5 w-5 text-green-600" />
                  サーキュラーエコノミー移行
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-600">進捗状況: 62%</span>
                  <span className="text-sm font-medium">62% / 100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  2025年までに製品・サービスの80%を循環型経済モデルに転換する目標。リサイクル素材の活用と廃棄物削減の取り組みにより、現在62%達成。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="mr-2 h-5 w-5 text-green-600" />
                  バリューチェーンGX
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-600">進捗状況: 45%</span>
                  <span className="text-sm font-medium">45% / 100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  2027年までにサプライチェーン全体の環境負荷を50%削減する目標。取引先との連携強化とグリーン調達の推進により、現在45%達成。
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <PieChart className="mr-2 h-5 w-5 text-green-600" />
                  廃棄物ゼロ化
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-600">進捗状況: 78%</span>
                  <span className="text-sm font-medium">78% / 100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  2024年までに埋立廃棄物ゼロを達成する目標。分別の徹底とリサイクルシステムの強化により、現在78%達成しています。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
