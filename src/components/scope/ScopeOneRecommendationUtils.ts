
import { ScopeOneDataType } from '@/data/scopeOneData';

export const generateScopeOneRecommendations = (data: ScopeOneDataType): string[] => {
  const recommendations: string[] = [];
  
  // カテゴリごとに最大の排出源を特定
  const maxCategory = data.categories.reduce((prev, current) => 
    (current.value > prev.value) ? current : prev
  );
  
  // 基本的な推奨事項
  recommendations.push("継続的なモニタリングと測定を実施し、排出源の可視化を進めましょう");
  
  // カテゴリ別推奨事項
  if (maxCategory.name === '社有車') {
    recommendations.push("EVへの切り替えやエコドライブ研修を実施し、車両からの排出を削減しましょう");
    recommendations.push("配送ルートの最適化やテレワークの促進で移動距離を削減しましょう");
  } else if (maxCategory.name === '定置燃焼機器') {
    recommendations.push("高効率設備への更新や運転条件の最適化で燃料消費を削減しましょう");
    recommendations.push("再生可能エネルギーや低炭素燃料への切り替えを検討しましょう");
  } else if (maxCategory.name === '空調設備') {
    recommendations.push("定期的な点検・メンテナンスで冷媒漏れを防止しましょう");
    recommendations.push("低GWP冷媒への切り替えや設備更新時の最新技術導入を検討しましょう");
  } else {
    recommendations.push("各排出源の詳細分析と削減計画の策定を行いましょう");
  }
  
  // 前年度比較による推奨事項
  if (data.yearOverYear.length >= 2) {
    const currentYear = data.yearOverYear[data.yearOverYear.length - 1].value;
    const previousYear = data.yearOverYear[data.yearOverYear.length - 2].value;
    const reduction = (1 - currentYear / previousYear) * 100;
    
    if (reduction <= 0) {
      recommendations.push("排出量が増加傾向にあります。早急に削減計画の見直しが必要です");
    } else if (reduction < 5) {
      recommendations.push("削減ペースを加速するため、より積極的な対策の実施を検討しましょう");
    } else {
      recommendations.push("現在の削減ペースを維持・加速するため、成功事例を他の領域にも展開しましょう");
    }
  }
  
  // 目標に対する進捗状況に基づく推奨事項
  const firstTarget = data.reductionTargets[0];
  if (firstTarget) {
    const currentTotal = data.total;
    const targetValue = firstTarget.target;
    
    if (currentTotal > targetValue) {
      const gap = ((currentTotal - targetValue) / targetValue * 100).toFixed(1);
      recommendations.push(`${firstTarget.year}の削減目標達成まで${gap}%の追加削減が必要です。具体的なアクションプランを検討しましょう`);
    } else {
      recommendations.push(`${firstTarget.year}の削減目標に対して順調に進捗しています。次の目標に向けた準備を始めましょう`);
    }
  }
  
  return recommendations;
};
