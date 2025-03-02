import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Leaf, Check, Globe, ArrowRight, RefreshCw, DownloadCloud, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

// SDGsの目標（簡略化したリスト）
const sdgGoals = [
  { id: 1, name: "貧困をなくそう", color: "bg-red-500" },
  { id: 2, name: "飢餓をゼロに", color: "bg-yellow-500" },
  { id: 3, name: "すべての人に健康と福祉を", color: "bg-green-500" },
  { id: 4, name: "質の高い教育をみんなに", color: "bg-blue-500" },
  { id: 5, name: "ジェンダー平等を実現しよう", color: "bg-orange-500" },
  { id: 6, name: "安全な水とトイレを世界中に", color: "bg-sky-500" },
  { id: 7, name: "エネルギーをみんなに、そしてクリーンに", color: "bg-yellow-400" },
  { id: 8, name: "働きがいも経済成長も", color: "bg-red-400" },
  { id: 9, name: "産業と技術革新の基盤をつくろう", color: "bg-orange-400" },
  { id: 10, name: "人や国の不平等をなくそう", color: "bg-pink-500" },
  { id: 11, name: "住み続けられるまちづくりを", color: "bg-amber-500" },
  { id: 12, name: "つくる責任つかう責任", color: "bg-yellow-600" },
  { id: 13, name: "気候変動に具体的な対策を", color: "bg-green-600" },
  { id: 14, name: "海の豊かさを守ろう", color: "bg-blue-600" },
  { id: 15, name: "陸の豊かさも守ろう", color: "bg-lime-600" },
  { id: 16, name: "平和と公正をすべての人に", color: "bg-indigo-500" },
  { id: 17, name: "パートナーシップで目標を達成しよう", color: "bg-blue-700" },
];

// GX・サステナビリティ診断の質問
const sustainabilityQuestions = [
  {
    category: "環境への取り組み",
    questions: [
      { id: "env1", text: "温室効果ガス排出量の測定と削減目標を設定していますか？" },
      { id: "env2", text: "エネルギー効率化や再生可能エネルギーの導入を進めていますか？" },
      { id: "env3", text: "廃棄物の削減とリサイクルに取り組んでいますか？" },
      { id: "env4", text: "環境に配慮した原材料の調達ポリシーがありますか？" },
      { id: "env5", text: "製品・サービスのライフサイクルアセスメントを実施していますか？" },
    ]
  },
  {
    category: "社会的責任",
    questions: [
      { id: "soc1", text: "従業員の多様性と包括性を促進する施策がありますか？" },
      { id: "soc2", text: "公正な労働条件と人権尊重のポリシーを実施していますか？" },
      { id: "soc3", text: "地域社会への貢献活動を行っていますか？" },
      { id: "soc4", text: "サプライチェーン全体での社会的責任を促進していますか？" },
      { id: "soc5", text: "製品・サービスの安全性と品質を確保する取り組みがありますか？" },
    ]
  },
  {
    category: "ガバナンス",
    questions: [
      { id: "gov1", text: "サステナビリティに関する明確な方針と目標を設定していますか？" },
      { id: "gov2", text: "ESG（環境・社会・ガバナンス）情報の透明な開示を行っていますか？" },
      { id: "gov3", text: "サステナビリティに関する取締役会・経営陣の監督体制がありますか？" },
      { id: "gov4", text: "倫理的なビジネス行動とコンプライアンスを確保していますか？" },
      { id: "gov5", text: "ステークホルダーとの対話を通じてサステナビリティ戦略を改善していますか？" },
    ]
  },
  {
    category: "イノベーション",
    questions: [
      { id: "inn1", text: "環境や社会課題を解決する製品・サービスの開発に取り組んでいますか？" },
      { id: "inn2", text: "サステナビリティを推進するためのデジタル技術やAIの活用を検討していますか？" },
      { id: "inn3", text: "サーキュラーエコノミー（循環経済）の原則に基づくビジネスモデルを追求していますか？" },
      { id: "inn4", text: "サステナブルな製品・サービスの市場拡大に向けた戦略がありますか？" },
      { id: "inn5", text: "サステナビリティ関連の研究開発投資を行っていますか？" },
    ]
  }
];

const SustainabilityCheck = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedSdgs, setSelectedSdgs] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(sustainabilityQuestions[0].category);
  const [animateQuestions, setAnimateQuestions] = useState(true);
  const { toast } = useToast();
  
  // SDG選択のトグル処理
  const toggleSdg = (id: number) => {
    const newSelected = selectedSdgs.includes(id)
      ? selectedSdgs.filter(sdgId => sdgId !== id)
      : [...selectedSdgs, id];
    
    setSelectedSdgs(newSelected);
    
    // 選択時のトースト通知
    if (!selectedSdgs.includes(id)) {
      const selectedGoal = sdgGoals.find(goal => goal.id === id);
      toast({
        title: `SDG ${id} を選択しました`,
        description: `「${selectedGoal?.name}」に取り組んでいることを記録しました`,
        duration: 3000,
      });
    }
  };
  
  // 質問への回答を設定
  const handleQuestionChange = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
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
  
  // 診断を実行
  const runDiagnostics = () => {
    if (!companyName.trim()) {
      toast({
        title: "入力エラー",
        description: "企業名を入力してください",
        variant: "destructive",
      });
      return;
    }
    
    setShowResults(true);
    
    toast({
      title: "診断完了",
      description: "サステナビリティ診断が完了しました",
      duration: 5000,
    });
  };
  
  // 診断をリセット
  const resetDiagnostics = () => {
    setCompanyName('');
    setIndustry('');
    setSelectedSdgs([]);
    setAnswers({});
    setShowResults(false);
    setActiveCategory(sustainabilityQuestions[0].category);
    
    toast({
      title: "リセット完了",
      description: "診断がリセットされました",
      duration: 3000,
    });
  };
  
  // フォームの進捗状況を計算
  const calculateProgress = () => {
    const totalSections = 3; // 基本情報、SDGs、質問
    let completedSections = 0;
    
    // 基本情報のチェック
    if (companyName.trim()) completedSections += 1;
    
    // SDGsのチェック
    if (selectedSdgs.length > 0) completedSections += 1;
    
    // 質問回答のチェック
    if (Object.values(answers).some(value => value === true)) completedSections += 1;
    
    return (completedSections / totalSections) * 100;
  };
  
  // カテゴリごとのスコアを計算
  const calculateCategoryScore = (category: string) => {
    const categoryQuestions = sustainabilityQuestions.find(c => c.category === category)?.questions || [];
    const answeredQuestions = categoryQuestions.filter(q => answers[q.id] === true);
    return (answeredQuestions.length / categoryQuestions.length) * 100;
  };
  
  // 総合スコアを計算
  const calculateTotalScore = () => {
    const totalQuestions = sustainabilityQuestions.flatMap(c => c.questions).length;
    const answeredYes = Object.values(answers).filter(v => v === true).length;
    return (answeredYes / totalQuestions) * 100;
  };
  
  // レポート生成のサンプルテキスト
  const generateReportText = () => {
    return `
# ${companyName} サステナビリティ診断レポート

## 企業概要
- 企業名: ${companyName}
- 業種: ${industry}

## 取り組み中のSDGs
${selectedSdgs.map(id => `- 目標${id}: ${sdgGoals.find(g => g.id === id)?.name}`).join('\n')}

## 診断結果
総合スコア: ${calculateTotalScore().toFixed(1)}%

### カテゴリ別評価
- 環境への取り組み: ${calculateCategoryScore('環境への取り組み').toFixed(1)}%
- 社会的責任: ${calculateCategoryScore('社会的責任').toFixed(1)}%
- ガバナンス: ${calculateCategoryScore('ガバナンス').toFixed(1)}%
- イノベーション: ${calculateCategoryScore('イノベーション').toFixed(1)}%

## 改善提案
${calculateTotalScore() < 50 
  ? '基本的なサステナビリティ戦略の策定とESG情報の開示体制構築が優先課題です。'
  : calculateTotalScore() < 80 
    ? '既存の取り組みを体系化し、測定可能な目標設定と定期的な進捗確認の仕組み作りが重要です。'
    : '先進的な取り組みをさらに発展させ、業界全体への波及効果を高める取り組みが期待されます。'}

## 次のステップ
1. サステナビリティ戦略の見直しと強化
2. 特定した課題に対する具体的なアクションプランの作成
3. 進捗を測定するKPIの設定と定期的なモニタリング
4. ステークホルダーとの対話強化と情報開示の充実

文唱堂印刷のGX x AIソリューションが、貴社のサステナビリティレポート作成と戦略推進をサポートします。
    `;
  };
  
  // 現在のカテゴリの質問を取得
  const getCurrentCategoryQuestions = () => {
    return sustainabilityQuestions.find(category => category.category === activeCategory)?.questions || [];
  };
  
  // スコアに基づいた色を返す
  const getScoreColor = (score: number) => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white shadow-xl">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                  <Leaf className="mr-3 h-8 w-8" />
                  サステナビリティ診断ツール
                </h1>
                <p className="text-lg opacity-90 mb-4">
                  貴社のSDGs取り組み状況やサステナビリティへの対応レベルを診断し、サステナビリティレポート作成の準備をサポートします。
                  簡単な質問に答えるだけで、現状の評価と改善ポイントをAIが分析します。
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {!showResults ? (
          <>
            {/* 進捗バー */}
            <motion.div 
              className="mb-6 bg-white p-4 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">診断の進捗状況</span>
                <span className="text-sm font-medium">{Math.round(calculateProgress())}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </motion.div>
            
            {/* 基本情報入力セクション */}
            <motion.section 
              className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center text-green-700">
                <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
                基本情報
              </h2>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="companyName" className="font-medium">企業名</Label>
                  <Input 
                    id="companyName" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="株式会社〇〇"
                    className="mt-1 transition-all focus:ring-2 focus:ring-green-500"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Label htmlFor="industry" className="font-medium">業種</Label>
                  <Input 
                    id="industry" 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="製造業、サービス業など"
                    className="mt-1 transition-all focus:ring-2 focus:ring-green-500"
                  />
                </motion.div>
              </div>
            </motion.section>
            
            {/* SDGs選択セクション */}
            <motion.section 
              className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center text-green-700">
                <Globe className="mr-2 h-5 w-5 text-green-600" />
                取り組み中のSDGs
              </h2>
              <p className="text-gray-600 mb-6">該当するSDGsを選択してください（複数選択可）</p>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {sdgGoals.map((goal) => (
                  <motion.div 
                    key={goal.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      show: { opacity: 1, scale: 1 }
                    }}
                    onClick={() => toggleSdg(goal.id)}
                    className={`
                      flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all
                      ${selectedSdgs.includes(goal.id) 
                        ? 'ring-2 ring-green-600 bg-green-50 shadow-sm transform -translate-y-1' 
                        : 'hover:bg-gray-100 hover:shadow'}
                    `}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${goal.color}`}>
                      {goal.id}
                    </div>
                    <span className="text-sm">{goal.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
            
            {/* 診断質問セクション */}
            <motion.section 
              className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center text-green-700">
                <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
                サステナビリティ診断
              </h2>
              <p className="text-gray-600 mb-6">各質問に対して、該当する場合はチェックを入れてください</p>
              
              {/* カテゴリ切り替えタブ */}
              <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
                {sustainabilityQuestions.map((category) => (
                  <motion.button
                    key={category.category}
                    onClick={() => changeCategory(category.category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${activeCategory === category.category
                        ? 'bg-green-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.category}
                  </motion.button>
                ))}
              </div>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: animateQuestions ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {getCurrentCategoryQuestions().map((question, index) => (
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
                    <div className="flex-1">
                      <Label htmlFor={question.id} className="text-sm font-medium flex items-center gap-2">
                        {question.text}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-xs">この項目は「{activeCategory}」カテゴリの重要な指標です。取り組みがある場合はチェックしてください。</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Button 
                  onClick={runDiagnostics}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                  size="lg"
                >
                  診断を実行 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.section>
          </>
        ) : (
          <>
            {/* 診断結果セクション */}
            <motion.section 
              className="mb-10 bg-white p-6 rounded-xl shadow-lg border border-green-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center text-green-700">
                  <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
                  診断結果
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetDiagnostics}
                  className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                >
                  <RefreshCw className="h-4 w-4" /> 診断をやり直す
                </Button>
              </div>
              
              <motion.div 
                className="mb-6 bg-green-50 p-6 rounded-lg border border-green-100"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2 md:mb-0">総合スコア</h3>
                  <div className="flex items-center">
                    <motion.div 
                      className="text-3xl font-bold text-green-700"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      {calculateTotalScore().toFixed(1)}%
                    </motion.div>
                  </div>
                </div>
                <div className="w-full bg-white rounded-full h-4 mb-4 overflow-hidden shadow-inner">
                  <motion.div 
                    className={`h-4 rounded-full ${getScoreColor(calculateTotalScore())}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${calculateTotalScore()}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                  ></motion.div>
                </div>
              </motion.div>
              
              <div className="space-y-6 mb-8">
                {sustainabilityQuestions.map((category, index) => (
                  <motion.div 
                    key={category.category} 
                    className="bg-white p-4 rounded-lg border hover:border-green-200 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    whileHover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", y: -2 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{category.category}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs font-bold
                          ${calculateCategoryScore(category.category) < 40 ? 'bg-red-100 text-red-700' :
                            calculateCategoryScore(category.category) < 70 ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-green-100 text-green-700'}
                        `}>
                          {calculateCategoryScore(category.category).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${
                          calculateCategoryScore(category.category) < 40 ? 'bg-red-500' :
                          calculateCategoryScore(category.category) < 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateCategoryScore(category.category)}%` }}
                        transition={{ delay: 0.2 + (index * 0.1) + 0.3, duration: 0.8 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg mb-6 border border-green-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="font-semibold mb-3 text-green-800">診断コメント</h3>
                <p className="text-gray-700">
                  {calculateTotalScore() < 30 ? (
                    'サステナビリティへの取り組みはまだ初期段階です。基本的な方針の策定から始めることをお勧めします。文唱堂印刷のGX支援サービスがお役に立てます。'
                  ) : calculateTotalScore() < 60 ? (
                    'いくつかの分野で取り組みを進めていますが、体系的なアプローチが必要です。特に弱い分野を重点的に強化しましょう。当社のサステナビリティコンサルティングで改善策をご提案できます。'
                  ) : calculateTotalScore() < 80 ? (
                    '全体的に良好な取り組みが見られます。さらなる発展のため、先進的な取り組みへのチャレンジを検討してください。文唱堂印刷のGXレポート作成支援で、あなたの成果を効果的に伝えましょう。'
                  ) : (
                    'サステナビリティへの取り組みは非常に進んでいます。業界リーダーとして、イノベーティブな取り組みを続けてください。文唱堂印刷のGX×AIソリューションで、さらなる価値創造をサポートします。'
                  )}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <h3 className="font-semibold flex items-center mb-3 text-blue-800">
                  <Check className="mr-1 h-4 w-4 text-blue-600" />
                  改善のためのアクションプラン
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {calculateCategoryScore('環境への取り組み') < 60 && (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      環境パフォーマンスの測定方法を確立し、具体的な削減目標を設定しましょう
                    </motion.li>
                  )}
                  {calculateCategoryScore('社会的責任') < 60 && (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      従業員の多様性と包括性を高める具体的な施策を検討してください
                    </motion.li>
                  )}
                  {calculateCategoryScore('ガバナンス') < 60 && (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      ESG情報の開示を体系化し、透明性を高める仕組みを整備しましょう
                    </motion.li>
                  )}
                  {calculateCategoryScore('イノベーション') < 60 && (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      サステナビリティを推進するための新たな製品・サービス開発を検討してください
                    </motion.li>
                  )}
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    サステナビリティに関する社内研修を定期的に実施し、全社的な意識向上を図りましょう
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 }}
                  >
                    ステークホルダーとの対話を通じて、重要課題（マテリアリティ）を特定・更新しましょう
                  </motion.li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Button
                  className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 
                  hover:to-emerald-700 shadow-lg hover:shadow-xl transform transition-all 
                  duration-300 hover:-translate-y-1"
                  size="lg"
                >
                  <DownloadCloud className="h-4 w-4" />
                  サステナビリティレポート作成支援を依頼
                </Button>
                
                <Button
                  variant="outline"
                  className="gap-2 border-green-200 hover:bg-green-50 hover:border-green-300
                  shadow hover
