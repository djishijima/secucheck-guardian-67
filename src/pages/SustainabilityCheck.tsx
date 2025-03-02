
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Leaf, Check, Globe, ArrowRight, RefreshCw, DownloadCloud } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
  
  // SDG選択のトグル処理
  const toggleSdg = (id: number) => {
    if (selectedSdgs.includes(id)) {
      setSelectedSdgs(selectedSdgs.filter(sdgId => sdgId !== id));
    } else {
      setSelectedSdgs([...selectedSdgs, id]);
    }
  };
  
  // 質問への回答を設定
  const handleQuestionChange = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  // 診断を実行
  const runDiagnostics = () => {
    setShowResults(true);
  };
  
  // 診断をリセット
  const resetDiagnostics = () => {
    setCompanyName('');
    setIndustry('');
    setSelectedSdgs([]);
    setAnswers({});
    setShowResults(false);
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
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
        </section>

        {!showResults ? (
          <>
            {/* 基本情報入力セクション */}
            <section className="mb-10 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
                基本情報
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">企業名</Label>
                  <Input 
                    id="companyName" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="株式会社〇〇"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry">業種</Label>
                  <Input 
                    id="industry" 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="製造業、サービス業など"
                    className="mt-1"
                  />
                </div>
              </div>
            </section>
            
            {/* SDGs選択セクション */}
            <section className="mb-10 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Globe className="mr-2 h-5 w-5 text-green-600" />
                取り組み中のSDGs
              </h2>
              <p className="text-gray-600 mb-4">該当するSDGsを選択してください（複数選択可）</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {sdgGoals.map((goal) => (
                  <div 
                    key={goal.id}
                    onClick={() => toggleSdg(goal.id)}
                    className={`
                      flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all
                      ${selectedSdgs.includes(goal.id) ? 'ring-2 ring-green-600 bg-green-50' : 'hover:bg-gray-100'}
                    `}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${goal.color}`}>
                      {goal.id}
                    </div>
                    <span className="text-sm">{goal.name}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* 診断質問セクション */}
            <section className="mb-10 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
                サステナビリティ診断
              </h2>
              <p className="text-gray-600 mb-6">各質問に対して、該当する場合はチェックを入れてください</p>
              
              <div className="space-y-8">
                {sustainabilityQuestions.map((category) => (
                  <div key={category.category} className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">{category.category}</h3>
                    
                    {category.questions.map((question) => (
                      <div key={question.id} className="flex items-start space-x-2">
                        <Checkbox 
                          id={question.id}
                          checked={answers[question.id] || false}
                          onCheckedChange={(checked) => handleQuestionChange(question.id, checked as boolean)}
                          className="mt-1"
                        />
                        <Label htmlFor={question.id} className="text-sm font-normal">
                          {question.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={runDiagnostics}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  診断を実行 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* 診断結果セクション */}
            <motion.section 
              className="mb-10 bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
                  診断結果
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetDiagnostics}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" /> 診断をやり直す
                </Button>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">総合スコア</span>
                  <span className="font-bold">{calculateTotalScore().toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${calculateTotalScore()}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {sustainabilityQuestions.map((category) => (
                  <div key={category.category} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{category.category}</span>
                      <span className="text-sm font-medium">{calculateCategoryScore(category.category).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          calculateCategoryScore(category.category) < 40 ? 'bg-red-500' :
                          calculateCategoryScore(category.category) < 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${calculateCategoryScore(category.category)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">診断コメント</h3>
                <p className="text-sm text-gray-700">
                  {calculateTotalScore() < 30 ? (
                    'サステナビリティへの取り組みはまだ初期段階です。基本的な方針の策定から始めることをお勧めします。'
                  ) : calculateTotalScore() < 60 ? (
                    'いくつかの分野で取り組みを進めていますが、体系的なアプローチが必要です。特に弱い分野を重点的に強化しましょう。'
                  ) : calculateTotalScore() < 80 ? (
                    '全体的に良好な取り組みが見られます。さらなる発展のため、先進的な取り組みへのチャレンジを検討してください。'
                  ) : (
                    'サステナビリティへの取り組みは非常に進んでいます。業界リーダーとして、イノベーティブな取り組みを続けてください。'
                  )}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-8">
                <h3 className="font-semibold flex items-center mb-2">
                  <Check className="mr-1 h-4 w-4 text-green-600" />
                  改善のためのアクションプラン
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {calculateCategoryScore('環境への取り組み') < 60 && (
                    <li>環境パフォーマンスの測定方法を確立し、具体的な削減目標を設定しましょう</li>
                  )}
                  {calculateCategoryScore('社会的責任') < 60 && (
                    <li>従業員の多様性と包括性を高める具体的な施策を検討してください</li>
                  )}
                  {calculateCategoryScore('ガバナンス') < 60 && (
                    <li>ESG情報の開示を体系化し、透明性を高める仕組みを整備しましょう</li>
                  )}
                  {calculateCategoryScore('イノベーション') < 60 && (
                    <li>サステナビリティを推進するための新たな製品・サービス開発を検討してください</li>
                  )}
                  <li>サステナビリティに関する社内研修を定期的に実施し、全社的な意識向上を図りましょう</li>
                  <li>ステークホルダーとの対話を通じて、重要課題（マテリアリティ）を特定・更新しましょう</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="gap-2 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <DownloadCloud className="h-4 w-4" />
                  サステナビリティレポート作成支援を依頼
                </Button>
                
                <Button
                  variant="outline"
                  className="gap-2"
                  size="lg"
                >
                  <Leaf className="h-4 w-4" />
                  GX戦略コンサルティングを予約
                </Button>
              </div>
            </motion.section>
            
            {/* レポートプレビューセクション */}
            <motion.section 
              className="mb-10 bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
                サステナビリティレポート プレビュー
              </h2>
              <p className="text-gray-600 mb-4">このデータを元に作成できるレポートのサンプルです</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 overflow-auto max-h-96">
                <pre className="text-sm whitespace-pre-wrap">{generateReportText()}</pre>
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="gap-2"
                  size="sm"
                >
                  <DownloadCloud className="h-4 w-4" />
                  レポートをダウンロード
                </Button>
              </div>
            </motion.section>
          </>
        )}

        {/* CTAセクション */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">サステナビリティ経営を始めましょう</h2>
            <p className="max-w-2xl mx-auto mb-6 text-gray-700">
              文唱堂印刷のGX x AIサービスでは、サステナビリティレポートの作成から環境負荷の可視化、ESG投資対応まで、
              企業のサステナビリティ経営を総合的にサポートします。
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <ClipboardCheck className="mr-2 h-5 w-5" /> 
              無料相談を予約する
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SustainabilityCheck;
