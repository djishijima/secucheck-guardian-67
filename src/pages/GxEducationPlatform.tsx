
import React from 'react';
import { GraduationCap, BookOpen, BarChart, Users, Award, FileText } from 'lucide-react';
import ProductPageLayout from '@/components/products/ProductPageLayout';

const GxEducationPlatform = () => {
  const benefits = [
    "従業員のサステナビリティ意識と知識の向上",
    "個人の理解度に合わせた効率的な学習",
    "ESGやSDGsに関する最新情報の継続的な取得",
    "全社的なサステナビリティ文化の醸成",
    "環境目標達成に必要なスキルの体系的な育成"
  ];

  const features = [
    {
      title: "パーソナライズド学習",
      description: "AIが各従業員の知識レベルや学習スタイルを分析し、最適な学習コンテンツとペースを提案します。",
      icon: <Users className="h-12 w-12" />
    },
    {
      title: "最新ESG/GXコンテンツ",
      description: "環境・社会・ガバナンスに関する最新の知識や事例を常にアップデート。実践的なスキルの習得を支援します。",
      icon: <BookOpen className="h-12 w-12" />
    },
    {
      title: "進捗管理ダッシュボード",
      description: "学習の進捗や理解度を視覚的に表示し、管理者は組織全体の知識レベルを把握できます。",
      icon: <BarChart className="h-12 w-12" />
    },
    {
      title: "認定・資格システム",
      description: "学習の達成度に応じた社内認定や資格を発行し、モチベーションを高めます。外部資格取得の準備にも活用可能です。",
      icon: <Award className="h-12 w-12" />
    }
  ];

  // Use icon instead of placeholder image
  return (
    <ProductPageLayout
      title="GX教育・研修AIプラットフォーム"
      subtitle="サステナビリティを推進する人材を育成"
      description="AIを活用した従業員向けのサステナビリティ教育・研修プラットフォームです。個別学習プランをAIが作成し、従業員ごとの理解度に応じて調整。ESGやGXに関する最新知識と実践的スキルを効率的に習得できます。"
      imageUrl=""
      benefits={benefits}
      features={features}
      ctaText="GX教育・研修AIプラットフォームに問い合わせる"
      ctaLink="/contact"
    />
  );
};

export default GxEducationPlatform;
