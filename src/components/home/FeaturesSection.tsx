
import React from 'react';
import { Printer, Database, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">GX × AIの力で、ビジネスを変革</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={featureVariants}
        >
          <Card className="border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader>
              <Printer className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>環境配慮型印刷</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                再生可能素材と省エネルギー技術を活用した、環境負荷の少ない印刷サービスを提供します。
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={featureVariants}
        >
          <Card className="border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader>
              <Database className="h-12 w-12 text-blue-600 mb-2" />
              <CardTitle>AI分析技術</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                高度な機械学習モデルによるデータ分析で、ビジネス意思決定を支援し、効率化を実現します。
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={featureVariants}
        >
          <Card className="border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader>
              <Globe className="h-12 w-12 text-purple-600 mb-2" />
              <CardTitle>持続可能なソリューション</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                SDGsに沿った持続可能なビジネスモデルの構築を支援し、企業の社会的責任を促進します。
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
