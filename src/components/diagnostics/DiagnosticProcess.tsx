
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ClipboardCheck, FileText } from 'lucide-react';

const steps = [
  {
    title: 'メール登録＆簡単アンケート',
    description: '基本情報（企業規模、業種等）と関心のある診断サービスを選択していただきます。所要時間は約5分です。',
    icon: <Mail className="h-8 w-8 text-white" />,
    color: 'bg-blue-500',
    delay: 0
  },
  {
    title: '診断実施',
    description: '弊社専門チームがデータをもとに診断を実施します。診断には通常3営業日ほどお時間をいただきます。',
    icon: <ClipboardCheck className="h-8 w-8 text-white" />,
    color: 'bg-green-500',
    delay: 0.1
  },
  {
    title: '診断結果＆改善プランをメールで送付',
    description: '具体的な数値評価と戦略提案レポートを無料でメールにてお届けします。ご不明点があれば専門スタッフがサポートします。',
    icon: <FileText className="h-8 w-8 text-white" />,
    color: 'bg-purple-500',
    delay: 0.2
  }
];

const DiagnosticProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">簡単3ステップで診断完了！</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            シンプルなプロセスで、あなたの企業に合わせた診断結果と改善提案を無料で受け取れます。
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center mb-8 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
            >
              <div className="flex items-center md:items-start">
                <div className={`${step.color} rounded-full h-14 w-14 flex items-center justify-center shadow-lg flex-shrink-0`}>
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block h-24 w-0.5 bg-gray-300 mx-auto my-2 ml-7"></div>
                )}
              </div>
              
              <div className="ml-6 mt-4 md:mt-0 flex-1">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    ステップ {index + 1}: {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticProcess;
