import { Leaf, Cpu, BarChart3, Truck, Languages, Palette, Target, ShieldCheck, GraduationCap } from 'lucide-react';

export interface ProductCategories {
  function?: string;
  technology?: string;
  challenge?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price?: number;
  categories?: ProductCategories;
  tags: string[];
  iconName?: string; // Store icon name instead of the React component
  image?: string;
  link: string;
}

// Helper function to get icon by name when needed
export const getIconByName = (iconName: string) => {
  switch (iconName) {
    case 'Leaf': return Leaf;
    case 'Cpu': return Cpu;
    case 'BarChart3': return BarChart3;
    case 'Truck': return Truck;
    case 'Languages': return Languages;
    case 'Palette': return Palette;
    case 'Target': return Target;
    case 'ShieldCheck': return ShieldCheck;
    case 'GraduationCap': return GraduationCap;
    default: return Leaf;
  }
};

export const existingProducts: Product[] = [
  {
    id: 1,
    title: "エコプリンティング",
    description: "環境に配慮した素材と工程による印刷サービス。CO2排出量を従来比30%削減し、持続可能な企業活動に貢献します。",
    price: 15000,
    categories: {
      function: "印刷・出版サービス",
      technology: "バイオマテリアル製品",
      challenge: "ESG対応支援"
    },
    tags: ["環境配慮", "SDGs", "CO2削減"],
    iconName: "Leaf",
    link: "/eco-printing"
  },
  {
    id: 2,
    title: "GXプリントオンデマンド",
    description: "グリーントランスフォーメーションを推進する高品質印刷。バイオマスインクと再生可能エネルギーによる製造で環境負荷を最小限に。",
    price: 18000,
    categories: {
      function: "印刷・出版サービス",
      technology: "バイオマテリアル製品",
      challenge: "カーボンフットプリント削減"
    },
    tags: ["GX", "環境配慮", "オンデマンド"],
    iconName: "BarChart3",
    link: "/gx-printing"
  },
  {
    id: 3,
    title: "AI翻訳・多言語印刷パッケージ",
    description: "40以上の言語に対応するAI翻訳と印刷をワンストップで提供。グローバルビジネスの拡大をサポートします。",
    price: 48000,
    categories: {
      function: "印刷・出版サービス",
      technology: "AI活用製品",
      challenge: "サステナブルブランディング"
    },
    tags: ["AI", "翻訳", "グローバル"],
    iconName: "Languages",
    link: "#"
  },
  {
    id: 4,
    title: "GXロジスティクス",
    description: "エコフレンドリーな配送システムで、印刷から配送までのカーボンフットプリントを最小化。電気自動車と最適化された配送ルートで環境負荷を削減。",
    price: 22000,
    categories: {
      function: "物流・配送サービス",
      technology: "再生可能エネルギー製品",
      challenge: "カーボンフットプリント削減"
    },
    tags: ["GX", "物流", "カーボンニュートラル"],
    iconName: "Truck",
    link: "/gx-logistics"
  }
];

export const gxAiProducts: Product[] = [
  {
    id: 5,
    title: "GXエコデザインAI",
    description: "AIを活用して環境に配慮した製品デザインを最適化。素材選定や製造プロセスにおけるCO2排出量削減とサステナブルなパッケージデザインの自動生成。",
    price: 25000,
    categories: {
      function: "デザイン・マーケティング",
      technology: "AI活用製品",
      challenge: "サステナブルブランディング"
    },
    tags: ["GX", "AI", "LCA"],
    iconName: "Palette",
    link: "/gx-eco-design"
  },
  {
    id: 6,
    title: "GX AIエネルギーマネジメント",
    description: "AIを活用して企業のエネルギー使用状況をリアルタイムで最適化。再生可能エネルギーの利用比率を最大化し、効率的な運用を提案します。",
    price: 30000,
    categories: {
      function: "エネルギー管理",
      technology: "AI活用製品",
      challenge: "カーボンフットプリント削減"
    },
    tags: ["GX", "AI", "カーボンニュートラル"],
    iconName: "Cpu",
    link: "/gx-energy-management"
  },
  {
    id: 7,
    title: "GXサステナブルマーケティングAI",
    description: "消費者の環境意識データを分析し、サステナビリティに特化したマーケティング戦略を提供。市場トレンド予測とESGレポート作成を支援します。",
    price: 35000,
    categories: {
      function: "デザイン・マーケティング",
      technology: "AI活用製品",
      challenge: "サステナブルブランディング"
    },
    tags: ["GX", "AI", "ESG"],
    iconName: "Target",
    link: "/gx-sustainable-marketing"
  },
  {
    id: 8,
    title: "GXサプライチェーンAI監査",
    description: "サプライチェーン全体での環境負荷やCO2排出量をAIが監査。Scope1〜3に対応した排出量診断と改善プランを提供します。",
    price: 40000,
    categories: {
      function: "監査・分析",
      technology: "AI活用製品",
      challenge: "ESG対応支援"
    },
    tags: ["GX", "AI", "サプライチェーン"],
    iconName: "ShieldCheck",
    link: "/gx-supply-chain-audit"
  },
  {
    id: 9,
    title: "GX教育・研修AIプラットフォーム",
    description: "AIを活用した従業員向けのサステナビリティ教育・研修プラットフォーム。個別学習プランの作成と進捗管理を自動化します。",
    price: 20000,
    categories: {
      function: "教育・研修",
      technology: "AI活用製品",
      challenge: "ESG対応支援"
    },
    tags: ["GX", "AI", "人材育成"],
    iconName: "GraduationCap",
    link: "/gx-education-platform"
  }
];

export const allProducts: Product[] = [...existingProducts, ...gxAiProducts];

export const filterProducts = (products: Product[], activeCategory: string) => {
  if (activeCategory === "all") {
    return products;
  }
  
  const [type, value] = activeCategory.split(':');
  if (type && value) {
    return products.filter(product => 
      product.categories && product.categories[type] === value
    );
  }
  
  return products;
};
