
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PieChart, BarChart4, LineChart } from 'lucide-react';
import GraphDataInputForm from '@/components/scope/graph/GraphDataInputForm';
import GraphDisplay from '@/components/scope/graph/GraphDisplay';

interface DataPoint {
  label: string;
  value: number;
}

interface GraphData {
  title: string;
  description: string;
  dataPoints: DataPoint[];
}

const GraphingTool = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [graphType, setGraphType] = useState<'bar' | 'line'>('bar');
  const [graphData, setGraphData] = useState<GraphData>({
    title: '年間CO2排出量の推移',
    description: '2020年から2023年までの当社のCO2排出量の推移を示します',
    dataPoints: [
      { label: '2020年', value: 180.5 },
      { label: '2021年', value: 165.2 },
      { label: '2022年', value: 148.7 },
      { label: '2023年', value: 132.3 },
    ]
  });

  const handleSubmit = (data: GraphData) => {
    setGraphData(data);
    setActiveTab('display');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <BarChart4 className="mr-3 h-8 w-8 text-green-600" />
            グラフ作成ツール
          </h1>
          <p className="text-gray-600 mt-2">
            排出量データの可視化やレポート作成に役立つグラフを簡単に作成できます
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="input" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
                データ入力
              </TabsTrigger>
              <TabsTrigger value="display" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
                グラフ表示
              </TabsTrigger>
            </TabsList>
            
            {activeTab === 'display' && (
              <div className="flex gap-2">
                <Button
                  variant={graphType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGraphType('bar')}
                  className={graphType === 'bar' ? 'bg-green-600 hover:bg-green-700' : 'border-green-200 text-green-700'}
                >
                  <BarChart4 className="h-4 w-4 mr-1" />
                  棒グラフ
                </Button>
                <Button
                  variant={graphType === 'line' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGraphType('line')}
                  className={graphType === 'line' ? 'bg-green-600 hover:bg-green-700' : 'border-green-200 text-green-700'}
                >
                  <LineChart className="h-4 w-4 mr-1" />
                  折れ線グラフ
                </Button>
              </div>
            )}
          </div>
          
          <TabsContent value="input">
            <GraphDataInputForm
              onSubmit={handleSubmit}
              initialData={graphData}
            />
          </TabsContent>
          
          <TabsContent value="display">
            <GraphDisplay
              title={graphData.title}
              description={graphData.description}
              dataPoints={graphData.dataPoints}
              type={graphType}
            />
            
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => setActiveTab('input')}
                variant="outline"
                className="border-green-200 text-green-700"
              >
                データを編集する
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default GraphingTool;
