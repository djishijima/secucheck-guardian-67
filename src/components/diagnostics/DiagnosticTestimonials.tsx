
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'サステナビリティ診断を受けたことで、具体的な改善策が明確になりました！ESG投資家からの評価も上がり、資金調達にもプラスになっています。',
    author: '製造業 A社 CSR担当',
    delay: 0
  },
  {
    quote: 'GX評価ツールのおかげで、脱炭素戦略が加速。取引先からの信頼感も向上し、新規契約獲得につながりました。',
    author: '小売業 B社 経営者',
    delay: 0.1
  },
  {
    quote: 'サステナブルDX診断で業務プロセスを見直したところ、コスト削減と同時に環境負荷も低減できました。社員の意識改革にも役立っています。',
    author: 'サービス業 C社 DX推進部長',
    delay: 0.2
  }
];

// 導入実績のダミーデータ
const stats = [
  { label: 'サポート企業数', value: '500+' },
  { label: '平均満足度', value: '4.8/5.0' },
  { label: '改善提案実現率', value: '87%' }
];

const DiagnosticTestimonials = () => {
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">導入企業からの高評価</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            多くの企業様に診断サービスをご利用いただき、具体的な成果を上げていただいています。
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: testimonial.delay }}
              className="bg-gray-50 rounded-lg p-6 shadow-md relative"
            >
              <div className="absolute -top-4 left-6 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                <Quote className="h-4 w-4 text-white" />
              </div>
              <p className="text-gray-700 mb-4 pt-4">{testimonial.quote}</p>
              <p className="text-gray-500 font-medium text-right">— {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 shadow-md border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">導入実績</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-700">
              様々な業種・規模の企業様にご利用いただいています。あなたの企業に最適な診断と改善提案をご提供します。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosticTestimonials;
