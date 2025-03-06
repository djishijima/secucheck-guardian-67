
import React from 'react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section>
      <div className="bg-gradient-to-r from-emerald-50 to-teal-100 rounded-xl p-6 sm:p-8 text-center shadow-md border border-emerald-200">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-emerald-800">サステナブルな印刷で、未来を変える</h2>
        <p className="max-w-2xl mx-auto mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base">
          文唱堂印刷のGX技術とAI技術を活用して、あなたのビジネスも環境に配慮したものに変えてみませんか？
          環境に優しい印刷物は、企業イメージの向上にもつながります。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-12 sm:h-auto shadow-md transform hover:-translate-y-1 transition-all duration-200">
            GX製品を見る
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 sm:h-auto shadow-md transform hover:-translate-y-1 transition-all duration-200">
            AI製品を見る
          </Button>
          <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 h-12 sm:h-auto shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200">
            お問い合わせ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
