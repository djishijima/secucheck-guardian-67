
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface GxAssessmentQuestionSectionProps {
  answers: Record<string, boolean>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onComplete: () => void;
}

const GxAssessmentQuestionSection: React.FC<GxAssessmentQuestionSectionProps> = ({
  answers,
  setAnswers,
  onComplete
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(Object.keys(gxQuestionData)[0]);
  const [animateQuestions, setAnimateQuestions] = useState(true);
  const { toast } = useToast();
  
  // 質問への回答を設定
  const handleQuestionChange = (questionId: string, value: boolean) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
    }));
    
    // チェックを入れた時のみトースト表示
    if (value) {
      toast({
        description: "回答を記録しました",
        duration: 1500,
      });
    }
  };
  
  // カテゴリを変更
  const changeCategory = (category: string) => {
    setAnimateQuestions(false);
    setTimeout(() => {
      setActiveCategory(category);
      setAnimateQuestions(true);
    }, 300);
  };
  
  // 診断を完了する
  const completeAssessment = () => {
    // 回答率をチェック
    const totalQuestions = Object.keys(gxQuestionData).reduce(
      (sum, category) => sum + gxQuestionData[category].length, 0
    );
    const answeredCount = Object.keys(answers).length;
    const answerRate = Math.round((answeredCount / totalQuestions) * 100);
    
    if (answerRate < 50) {
      toast({
        title: "回答率が低いです",
        description: `現在の回答率は${answerRate}%です。より正確な診断のため、できるだけ多くの質問に回答してください。`,
        variant: "destructive"
      });
      return;
    }
    
    onComplete();
  };
  
  return (
    <motion.section 
      className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center text-green-700">
        <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
        GX対応度チェック
      </h2>
      <p className="text-gray-600 mb-6">各項目について、該当する取り組みを行っている場合はチェックを入れてください</p>
      
      {/* カテゴリ切り替えタブ */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4 overflow-x-auto">
        {Object.keys(gxQuestionData).map((category) => (
          <motion.button
            key={category}
            onClick={() => changeCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
              ${activeCategory === category
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: animateQuestions ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {gxQuestionData[activeCategory].map((question, index) => (
          <motion.div 
            key={question.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <Checkbox 
              id={question.id}
              checked={answers[question.id] || false}
              onCheckedChange={(checked) => handleQuestionChange(question.id, checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor={question.id} className="text-sm font-medium">
              {question.text}
            </Label>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="flex justify-between mt-8 pt-4 border-t">
        <div className="text-sm text-gray-500">
          現在の回答数: {Object.values(answers).filter(Boolean).length} / 
          {Object.keys(gxQuestionData).reduce((sum, cat) => sum + gxQuestionData[cat].length, 0)}
        </div>
        
        <Button 
          onClick={completeAssessment}
          className="bg-green-600 hover:bg-green-700"
        >
          診断を完了する <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.section>
  );
};

// GX対応度診断の質問データ
const gxQuestionData: Record<string, Array<{id: string, text: string}>> = {
  "ガバナンスと戦略": [
    { id: "gov1", text: "経営層がGXやサステナビリティに関するコミットメントを表明していますか？" },
    { id: "gov2", text: "GXに関する中長期目標や戦略が策定されていますか？" },
    { id: "gov3", text: "取締役会や経営会議でGXに関する議題が定期的に議論されていますか？" },
    { id: "gov4", text: "GX推進のための専門部署や責任者が設置されていますか？" },
    { id: "gov5", text: "気候変動リスクと機会を事業戦略に組み込んでいますか？" }
  ],
  "CO2排出量管理": [
    { id: "co21", text: "Scope 1（直接排出）の温室効果ガス排出量を測定していますか？" },
    { id: "co22", text: "Scope 2（エネルギー起源の間接排出）の温室効果ガス排出量を測定していますか？" },
    { id: "co23", text: "Scope 3（その他の間接排出）の温室効果ガス排出量を測定していますか？" },
    { id: "co24", text: "科学的根拠に基づく排出量削減目標（SBT）を設定していますか？" },
    { id: "co25", text: "カーボンニュートラルに向けた具体的な実行計画がありますか？" }
  ],
  "エネルギー管理": [
    { id: "ene1", text: "事業所・施設のエネルギー使用量を継続的に測定・管理していますか？" },
    { id: "ene2", text: "省エネルギー施策を計画的に実施していますか？" },
    { id: "ene3", text: "再生可能エネルギーを導入していますか？" },
    { id: "ene4", text: "エネルギー効率の高い設備・機器への更新計画がありますか？" },
    { id: "ene5", text: "社有車のEV化やエコドライブの推進を行っていますか？" }
  ],
  "資源循環": [
    { id: "res1", text: "廃棄物の発生量を測定し、削減目標を設定していますか？" },
    { id: "res2", text: "リサイクル率向上のための取り組みを行っていますか？" },
    { id: "res3", text: "製品設計段階から廃棄物削減やリサイクル性を考慮していますか？" },
    { id: "res4", text: "使用原材料の環境負荷低減に取り組んでいますか？" },
    { id: "res5", text: "循環型ビジネスモデルへの転換を検討していますか？" }
  ],
  "情報開示と社内浸透": [
    { id: "dis1", text: "GXやサステナビリティに関する情報を積極的に開示していますか？" },
    { id: "dis2", text: "TCFD（気候関連財務情報開示タスクフォース）に沿った情報開示を行っていますか？" },
    { id: "dis3", text: "ESG評価機関からの評価を受けていますか？" },
    { id: "dis4", text: "従業員へのGX教育・啓発活動を実施していますか？" },
    { id: "dis5", text: "ステークホルダーとのGXに関する対話を行っていますか？" }
  ]
};

export default GxAssessmentQuestionSection;
