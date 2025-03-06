
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, BadgeCheck } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const DiagnosticCTA: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className="mt-12"
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200 shadow-md text-center"
    >
      <h3 className="text-xl font-bold text-green-800 mb-4">
        あなたの企業のサステナビリティレベルを診断
      </h3>
      
      <p className="mb-6 text-gray-700 max-w-2xl mx-auto">
        無料の自己診断ツールで、貴社のSDGs取り組み状況を可視化。専門家による具体的な改善提案と共に、サステナビリティレポート作成のための基礎データを取得できます。
      </p>
      
      <div className="flex justify-center gap-4 items-center mb-6">
        <div className="flex items-center text-sm text-green-700">
          <Clock className="h-4 w-4 mr-1" />
          <span>約5分で完了</span>
        </div>
        <div className="flex items-center text-sm text-green-700">
          <BadgeCheck className="h-4 w-4 mr-1" />
          <span>業界別ベンチマーク</span>
        </div>
      </div>
    
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/sustainability-check">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2 shadow-lg hover:shadow-xl transition-all text-white">
                無料の自己診断ツールを試してみる
                <ArrowRight className="h-4 w-4 animate-pulse" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-green-800 text-white border-green-700">
            <p>所要時間約5分の自己診断を無料でお試しいただけます</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  </motion.div>
);

export default DiagnosticCTA;
