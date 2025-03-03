
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getScoreEvaluation, getProgressColor } from './ResultsUtils';

interface OverallScoreCardProps {
  score: number;
  company: {
    name: string;
    industry: string;
    employees?: string;
  };
}

const OverallScoreCard: React.FC<OverallScoreCardProps> = ({ score, company }) => {
  return (
    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>総合スコア</span>
          <span className={`${getScoreEvaluation(score).color} font-bold text-2xl`}>
            {score}%
          </span>
        </CardTitle>
        <CardDescription>
          {company.name} ({company.industry}){company.employees ? ` - ${company.employees}` : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className={`h-4 rounded-full ${getProgressColor(score)}`} 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          評価: <span className={getScoreEvaluation(score).color}>
            {getScoreEvaluation(score).text}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default OverallScoreCard;
