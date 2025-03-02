
import { gxQuestionData } from './GxQuestionData';

// カテゴリごとのスコア計算
export const calculateCategoryScores = (answers: Record<string, boolean>) => {
  const categoryScores: Record<string, number> = {};
  
  Object.entries(gxQuestionData).forEach(([category, questions]) => {
    const categoryQuestions = questions.map(q => q.id);
    const answeredYes = categoryQuestions.filter(id => answers[id]).length;
    categoryScores[category] = Math.round((answeredYes / categoryQuestions.length) * 100);
  });
  
  return categoryScores;
};

// 推奨事項の生成
export const generateRecommendations = (score: number) => {
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

// 総合スコアの計算
export const calculateOverallScore = (answers: Record<string, boolean>) => {
  const totalQuestions = Object.keys(gxQuestionData).reduce(
    (sum, category) => sum + gxQuestionData[category].length, 0
  );
  const answeredYes = Object.values(answers).filter(Boolean).length;
  return Math.round((answeredYes / totalQuestions) * 100);
};

// 結果オブジェクトの生成
export const generateResultsObject = (score: number, categoryScores: Record<string, number>, companyInfo: any) => {
  return {
    overallScore: score,
    categoryScores: categoryScores,
    company: companyInfo,
    recommendations: generateRecommendations(score),
  };
};
