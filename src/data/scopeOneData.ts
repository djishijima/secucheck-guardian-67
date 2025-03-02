
// Define types for our data structure
export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  value: number;
}

export interface YearlyData {
  year: string;
  value: number;
}

export interface ReductionTarget {
  year: string;
  target: number;
  status: string;
}

export interface ScopeOneDataType {
  total: number;
  unit: string;
  categories: CategoryData[];
  monthlyTrend: MonthlyData[];
  yearOverYear: YearlyData[];
  reductionTargets: ReductionTarget[];
  notes?: string;
}

// Default Scope 1 emission data
export const defaultScopeOneData: ScopeOneDataType = {
  total: 245.8,
  unit: 'tCO2e',
  categories: [
    { name: '社有車', value: 68.2, percentage: 27.7, color: 'bg-purple-500' },
    { name: '定置燃焼機器', value: 125.4, percentage: 51.0, color: 'bg-indigo-500' },
    { name: '空調設備', value: 42.3, percentage: 17.2, color: 'bg-sky-500' },
    { name: 'その他', value: 9.9, percentage: 4.1, color: 'bg-teal-500' },
  ],
  monthlyTrend: [
    { month: '4月', value: 22.3 },
    { month: '5月', value: 20.1 },
    { month: '6月', value: 21.5 },
    { month: '7月', value: 25.6 },
    { month: '8月', value: 24.8 },
    { month: '9月', value: 20.9 },
    { month: '10月', value: 21.3 },
    { month: '11月', value: 22.1 },
    { month: '12月', value: 23.5 },
    { month: '1月', value: 24.8 },
    { month: '2月', value: 19.2 },
    { month: '3月', value: 19.7 },
  ],
  yearOverYear: [
    { year: '2020年度', value: 295.6 },
    { year: '2021年度', value: 268.9 },
    { year: '2022年度', value: 245.8 },
  ],
  reductionTargets: [
    { year: '2023年度', target: 220.0, status: '進行中' },
    { year: '2024年度', target: 200.0, status: '計画中' },
    { year: '2025年度', target: 180.0, status: '計画中' },
    { year: '2030年度', target: 100.0, status: '計画中' },
  ],
  notes: 'このデータは2022年度末までの測定値に基づいています。削減目標は前年比で約10%の削減を目指しています。'
};
