
export interface ScopeTwoDataType {
  total: number;
  unit: string;
  categories: {
    name: string;
    value: number;
    percentage: number;
    color: string;
  }[];
  monthlyTrend: {
    month: string;
    value: number;
  }[];
  yearOverYear: {
    year: string;
    value: number;
  }[];
  locations: {
    name: string;
    value: number;
    percentage: number;
  }[];
  reductionTargets: {
    year: string;
    target: number;
    status: string;
  }[];
}

export const defaultScopeTwoData: ScopeTwoDataType = {
  total: 532.7,
  unit: 'tCO2e',
  categories: [
    { name: '電力', value: 468.5, percentage: 87.9, color: 'bg-purple-500' },
    { name: '熱供給', value: 45.8, percentage: 8.6, color: 'bg-pink-500' },
    { name: '蒸気', value: 18.4, percentage: 3.5, color: 'bg-red-500' },
  ],
  monthlyTrend: [
    { month: '4月', value: 44.5 },
    { month: '5月', value: 42.8 },
    { month: '6月', value: 43.2 },
    { month: '7月', value: 49.7 },
    { month: '8月', value: 51.2 },
    { month: '9月', value: 47.3 },
    { month: '10月', value: 43.5 },
    { month: '11月', value: 42.8 },
    { month: '12月', value: 44.6 },
    { month: '1月', value: 43.9 },
    { month: '2月', value: 41.2 },
    { month: '3月', value: 38.0 },
  ],
  yearOverYear: [
    { year: '2020年度', value: 628.3 },
    { year: '2021年度', value: 571.5 },
    { year: '2022年度', value: 532.7 },
  ],
  locations: [
    { name: '本社', value: 215.6, percentage: 40.5 },
    { name: '工場A', value: 187.8, percentage: 35.3 },
    { name: '営業所', value: 76.3, percentage: 14.3 },
    { name: 'データセンター', value: 42.2, percentage: 7.9 },
    { name: 'その他拠点', value: 10.8, percentage: 2.0 },
  ],
  reductionTargets: [
    { year: '2023年度', target: 480.0, status: '進行中' },
    { year: '2024年度', target: 430.0, status: '計画中' },
    { year: '2025年度', target: 370.0, status: '計画中' },
    { year: '2030年度', target: 250.0, status: '計画中' },
  ]
};
