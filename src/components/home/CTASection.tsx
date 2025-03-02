
import React from 'react';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section>
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">今すぐ始めましょう</h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-700">
          文唱堂印刷のGX x AIプロダクトで、ビジネスと環境の両立を実現。無料相談で、最適なソリューションをご提案します。
        </p>
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
          お問い合わせ
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
