
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getScoreEvaluation, getProgressColor } from './ResultsUtils';

interface CategoryScoresProps {
  categoryScores: Record<string, number>;
}

const CategoryScores: React.FC<CategoryScoresProps> = ({ categoryScores }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(categoryScores).map(([category, score]) => (
        <Card key={category} className="border-gray-200 hover:border-green-200 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-1">
              <span className={`${getScoreEvaluation(score).color} font-semibold`}>
                {score}%
              </span>
              <span className="text-xs text-gray-500">
                {getScoreEvaluation(score).text}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(score)}`} 
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoryScores;
