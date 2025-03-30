
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LeadCaptureForm from './LeadCaptureForm';

const DiagnosticCTASection = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">今すぐ無料診断を受け、未来への一歩を踏み出そう！</h2>
          
          <div className="mb-8 inline-block text-left">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                <span className="text-lg">具体的な数値評価とフィードバック</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                <span className="text-lg">業界別ベンチマークと改善提案</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                <span className="text-lg">専門スタッフによるサポート</span>
              </div>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={() => setIsOpen(true)}
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6 h-auto"
          >
            無料診断を始める
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="mt-4 text-green-100 text-sm">
            ※診断結果は登録いただいたメールアドレスにお送りします
          </p>
        </motion.div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>無料診断サービスに申し込む</DialogTitle>
            <DialogDescription>
              基本情報をご入力いただくと、3営業日以内に診断結果をメールでお送りします。
            </DialogDescription>
          </DialogHeader>
          <LeadCaptureForm />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DiagnosticCTASection;
