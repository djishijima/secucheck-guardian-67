
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GxAssessmentHeader from '@/components/gx-assessment/GxAssessmentHeader';
import GxProgressIndicator from '@/components/gx-assessment/GxProgressIndicator';
import GxCompanyInfoSection from '@/components/gx-assessment/GxCompanyInfoSection';
import GxAssessmentQuestionSection from '@/components/gx-assessment/GxAssessmentQuestionSection';
import GxAssessmentResults from '@/components/gx-assessment/GxAssessmentResults';
import { useToast } from '@/components/ui/use-toast';

const GxAssessment = () => {
  const [progress, setProgress] = useState<number>(10);
  const [step, setStep] = useState<'company-info' | 'questions' | 'results'>('company-info');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    industry: '',
    employees: '',
    revenue: '',
    contact: ''
  });
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const { toast } = useToast();

  const handleCompanyInfoSubmit = (info: any) => {
    setCompanyInfo(info);
    setProgress(40);
    setStep('questions');
    window.scrollTo(0, 0);
    toast({
      title: "企業情報を保存しました",
      description: "診断質問に回答してください",
    });
  };

  const handleAssessmentComplete = () => {
    setProgress(100);
    setStep('results');
    window.scrollTo(0, 0);
    
    // 簡易的な結果算出ロジック
    const totalQuestions = Object.keys(gxQuestionData).reduce(
      (sum, category) => sum + gxQuestionData[category].length, 0
    );
    const answeredYes = Object.values(answers).filter(Boolean).length;
    const score = Math.round((answeredYes / totalQuestions) * 100);
    
    // 結果の生成
    setAssessmentResults({
      overallScore: score,
      categoryScores: calculateCategoryScores(answers),
      company: companyInfo,
      recommendations: generateRecommendations(score),
    });
    
    toast({
      title: "診断が完了しました",
      description: "結果をご確認ください",
    });
  };

  // カテゴリごとのスコア計算
  const calculateCategoryScores = (answers: Record<string, boolean>) => {
    const categoryScores: Record<string, number> = {};
    
    Object.entries(gxQuestionData).forEach(([category, questions]) => {
      const categoryQuestions = questions.map(q => q.id);
      const answeredYes = categoryQuestions.filter(id => answers[id]).length;
      categoryScores[category] = Math.round((answeredYes / categoryQuestions.length) * 100);
    });
    
    return categoryScores;
  };

  // 推奨事項の生成
  const generateRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        "GX対応のリーダーとして、より高度な取り組みを進めましょう",
        "他社へのGXノウハウの共有や業界標準の策定に貢献できます",
        "長期的な気候変動シナリオに基づく事業戦略の検討を進めましょう"
      ];
    } else if (score >= 60) {
      return [
        "Scope 3排出量の測定と削減計画の策定を検討しましょう",
        "再生可能エネルギーの導入比率を高める取り組みを強化しましょう",
        "サプライチェーン全体でのGX推進を働きかけましょう"
      ];
    } else if (score >= 40) {
      return [
        "Scope 1・2排出量の測定と削減目標の策定を優先しましょう",
        "社内のGX推進体制を整備し、責任者を明確にしましょう",
        "環境配慮型の製品・サービス開発を検討しましょう"
      ];
    } else {
      return [
        "まずは基本的なGXの理解と社内啓発から始めましょう",
        "エネルギー使用量やCO2排出量の現状把握に取り組みましょう",
        "短期的に実現可能な省エネ施策から着手しましょう"
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <GxAssessmentHeader />
        <GxProgressIndicator progress={progress} />

        {step === 'company-info' && (
          <GxCompanyInfoSection 
            companyInfo={companyInfo}
            onSubmit={handleCompanyInfoSubmit}
          />
        )}
        
        {step === 'questions' && (
          <GxAssessmentQuestionSection 
            answers={answers}
            setAnswers={setAnswers}
            onComplete={handleAssessmentComplete}
          />
        )}
        
        {step === 'results' && assessmentResults && (
          <GxAssessmentResults results={assessmentResults} />
        )}
      </main>
      
      <Footer />
    </div>
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

export default GxAssessment;
