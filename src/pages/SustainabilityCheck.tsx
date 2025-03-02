
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";

// Import refactored components
import SustainabilityHeader from '@/components/sustainability/SustainabilityHeader';
import ProgressIndicator from '@/components/sustainability/ProgressIndicator';
import BasicInfoSection from '@/components/sustainability/BasicInfoSection';
import SdgSelectionSection from '@/components/sustainability/SdgSelectionSection';
import DiagnosticQuestionSection from '@/components/sustainability/DiagnosticQuestionSection';
import DiagnosticResults from '@/components/sustainability/DiagnosticResults';

const SustainabilityCheck = () => {
  const [progress, setProgress] = useState<number>(10);
  const [step, setStep] = useState<'company-info' | 'sdgs' | 'questions' | 'results'>('company-info');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    industry: ''
  });
  const [selectedSdgs, setSelectedSdgs] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCompanyInfoSubmit = (info: {name: string, industry: string}) => {
    setCompanyInfo(info);
    setProgress(30);
    setStep('sdgs');
    window.scrollTo(0, 0);
    toast({
      title: "企業情報を保存しました",
      description: "関連するSDGsを選択してください",
    });
  };
  
  const handleSdgsSubmit = (sdgs: number[]) => {
    setSelectedSdgs(sdgs);
    setProgress(50);
    setStep('questions');
    window.scrollTo(0, 0);
    toast({
      title: "SDGsを保存しました",
      description: "診断質問に回答してください",
    });
  };

  const handleAnswersUpdate = (newAnswers: Record<string, boolean>) => {
    setAnswers(newAnswers);
    
    // 回答数に基づいて進捗状況を更新
    const totalQuestions = sustainabilityQuestions.reduce(
      (sum, category) => sum + category.questions.length, 0
    );
    const answeredCount = Object.keys(newAnswers).length;
    const newProgress = Math.min(50 + Math.round((answeredCount / totalQuestions) * 50), 99);
    setProgress(newProgress);
  };

  const handleDiagnosticComplete = () => {
    setProgress(100);
    setStep('results');
    window.scrollTo(0, 0);
    
    // 簡易的な結果算出ロジック
    const totalQuestions = sustainabilityQuestions.reduce(
      (sum, category) => sum + category.questions.length, 0
    );
    const answeredYes = Object.values(answers).filter(Boolean).length;
    const score = Math.round((answeredYes / totalQuestions) * 100);
    
    // 結果の生成
    setDiagnosticResults({
      overallScore: score,
      categoryScores: calculateCategoryScores(answers),
      company: companyInfo,
      selectedSdgs: selectedSdgs,
      recommendations: generateRecommendations(score),
    });
    
    toast({
      title: "診断が完了しました",
      description: "結果をご確認ください",
    });
  };
  
  // 詳細診断ページへの移動関数
  const handleDetailedDiagnostics = () => {
    navigate("/comprehensive-diagnostics", { 
      state: { fromSustainabilityCheck: true } 
    });
  };
  
  // コンサルタントへの相談フォームへの移動関数
  const handleConsultantContact = () => {
    navigate("/contact");
  };

  // カテゴリごとのスコア計算
  const calculateCategoryScores = (answers: Record<string, boolean>) => {
    const categoryScores: Record<string, number> = {};
    
    sustainabilityQuestions.forEach((category) => {
      const categoryQuestionIds = category.questions.map(q => q.id);
      const answeredYes = categoryQuestionIds.filter(id => answers[id]).length;
      categoryScores[category.category] = Math.round((answeredYes / categoryQuestionIds.length) * 100);
    });
    
    return categoryScores;
  };

  // 推奨事項の生成
  const generateRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        "サステナビリティ推進のリーダーとして、より高度な取り組みを進めましょう",
        "他社へのサステナビリティノウハウの共有や業界標準の策定に貢献できます",
        "長期的な社会課題解決に向けた事業戦略の検討を進めましょう"
      ];
    } else if (score >= 60) {
      return [
        "バリューチェーン全体でのサステナビリティ推進を強化しましょう",
        "社会課題解決に貢献する新たな製品・サービス開発を検討しましょう",
        "ステークホルダーとのより積極的な対話を進めましょう"
      ];
    } else if (score >= 40) {
      return [
        "サステナビリティ推進体制を整備し、責任者を明確にしましょう",
        "重要課題（マテリアリティ）の特定と目標設定を行いましょう",
        "社内啓発活動を強化し、全社的な理解を深めましょう"
      ];
    } else {
      return [
        "まずは基本的なサステナビリティの理解から始めましょう",
        "自社事業に関連する社会課題の把握に取り組みましょう",
        "短期的に実現可能な取り組みから着手しましょう"
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <SustainabilityHeader />
        <ProgressIndicator progress={progress} />

        {step === 'company-info' && (
          <BasicInfoSection 
            companyName={companyInfo.name}
            setCompanyName={(name) => setCompanyInfo({...companyInfo, name})}
            industry={companyInfo.industry}
            setIndustry={(industry) => setCompanyInfo({...companyInfo, industry})}
            onSubmit={() => handleCompanyInfoSubmit(companyInfo)}
          />
        )}
        
        {step === 'sdgs' && (
          <SdgSelectionSection 
            selectedSdgs={selectedSdgs}
            setSelectedSdgs={setSelectedSdgs}
            onSubmit={() => handleSdgsSubmit(selectedSdgs)}
          />
        )}
        
        {step === 'questions' && (
          <DiagnosticQuestionSection 
            answers={answers}
            setAnswers={handleAnswersUpdate}
            onComplete={handleDiagnosticComplete}
          />
        )}
        
        {step === 'results' && diagnosticResults && (
          <DiagnosticResults 
            companyName={companyInfo.name}
            industry={companyInfo.industry}
            selectedSdgs={selectedSdgs}
            answers={answers}
            results={diagnosticResults}
            onDetailedDiagnostics={handleDetailedDiagnostics}
            onConsultantContact={handleConsultantContact}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// サステナビリティ診断の質問データ
const sustainabilityQuestions = [
  {
    category: "環境への取り組み",
    questions: [
      { id: "env1", text: "環境方針や目標を文書化し、社内外に公開していますか？" },
      { id: "env2", text: "CO2排出量を測定し、削減目標を設定していますか？" },
      { id: "env3", text: "省エネルギーや再生可能エネルギー導入の取り組みを行っていますか？" },
      { id: "env4", text: "廃棄物削減やリサイクル推進の取り組みを行っていますか？" },
      { id: "env5", text: "環境に配慮した製品・サービス開発を行っていますか？" }
    ]
  },
  {
    category: "社会的責任",
    questions: [
      { id: "soc1", text: "人権尊重の方針を明文化し、実践していますか？" },
      { id: "soc2", text: "ダイバーシティ＆インクルージョンを推進していますか？" },
      { id: "soc3", text: "従業員の健康と安全を確保する取り組みを行っていますか？" },
      { id: "soc4", text: "地域社会への貢献活動を行っていますか？" },
      { id: "soc5", text: "サプライチェーン全体での社会的責任を推進していますか？" }
    ]
  },
  {
    category: "ガバナンス",
    questions: [
      { id: "gov1", text: "コンプライアンス体制を整備し、定期的な研修を実施していますか？" },
      { id: "gov2", text: "サステナビリティに関する責任者や専門部署を設置していますか？" },
      { id: "gov3", text: "ESG情報の開示を積極的に行っていますか？" },
      { id: "gov4", text: "リスク管理にサステナビリティ要素を組み込んでいますか？" },
      { id: "gov5", text: "社外ステークホルダーとの対話を定期的に行っていますか？" }
    ]
  },
  {
    category: "イノベーション",
    questions: [
      { id: "inn1", text: "社会課題解決につながる製品・サービス開発を行っていますか？" },
      { id: "inn2", text: "サステナビリティを考慮したビジネスモデルの変革を検討していますか？" },
      { id: "inn3", text: "オープンイノベーションや外部連携を積極的に行っていますか？" },
      { id: "inn4", text: "デジタル技術を活用したサステナビリティ推進を行っていますか？" },
      { id: "inn5", text: "社会課題解決に貢献する研究開発投資を行っていますか？" }
    ]
  }
];

export default SustainabilityCheck;
