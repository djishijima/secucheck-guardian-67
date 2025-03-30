
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Lightbulb, BarChart3, BarChart4 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    title: 'サステナビリティ診断',
    description: '企業の環境・社会への取り組みを総合評価',
    features: [
      '環境貢献度の数値化',
      '改善ポイントの明確化',
      '成功事例のフィードバック'
    ],
    icon: <Leaf className="h-12 w-12 text-green-600" />,
    iconBg: 'bg-green-50',
    delay: 0
  },
  {
    title: 'サステナブルDX診断',
    description: 'デジタル技術を活用した持続可能性向上の可能性を診断',
    features: [
      'DX推進状況の評価',
      '業務プロセスの効率化提案',
      '環境負荷低減のアドバイス'
    ],
    icon: <Lightbulb className="h-12 w-12 text-amber-600" />,
    iconBg: 'bg-amber-50',
    delay: 0.1
  },
  {
    title: 'GX評価ツール',
    description: '脱炭素経営への取り組み状況を数値化',
    features: [
      'CO2排出削減目標設定',
      'グリーン調達状況評価',
      '改善シナリオ提案'
    ],
    icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
    iconBg: 'bg-blue-50',
    delay: 0.2
  },
  {
    title: 'スコープ1～3評価',
    description: '各スコープごとの排出量を評価し、具体的な削減アクションを提案',
    features: [
      '排出源の特定と数値化',
      '削減ポテンシャル分析',
      '投資対効果の高い施策提案'
    ],
    icon: <BarChart4 className="h-12 w-12 text-indigo-600" />,
    iconBg: 'bg-indigo-50',
    delay: 0.3
  }
];

const DiagnosticServiceCards = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">選べる診断サービス</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            お客様のビジネスニーズや課題に合わせて、最適な診断サービスをお選びいただけます。
            各診断は独立して実施することも、組み合わせて総合的な評価を受けることも可能です。
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: service.delay }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4" 
                style={{ borderTopColor: service.iconBg === 'bg-green-50' ? '#10b981' : 
                                       service.iconBg === 'bg-amber-50' ? '#f59e0b' : 
                                       service.iconBg === 'bg-blue-50' ? '#3b82f6' : 
                                       '#6366f1' }}>
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <div className={`p-3 rounded-lg ${service.iconBg} mr-4`}>
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="mt-1">{service.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticServiceCards;
