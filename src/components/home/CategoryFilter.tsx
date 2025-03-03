
import React from 'react';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  activeCategory, 
  setActiveCategory 
}) => {
  const functionCategories = [
    {id: "all", name: "すべて"},
    {id: "function:印刷・出版サービス", name: "印刷・出版サービス"},
    {id: "function:物流・配送サービス", name: "物流・配送サービス"},
    {id: "function:エネルギー管理", name: "エネルギー管理"},
    {id: "function:デザイン・マーケティング", name: "デザイン・マーケティング"},
    {id: "function:教育・研修", name: "教育・研修"},
    {id: "function:監査・分析", name: "監査・分析"}
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {functionCategories.map(category => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category.id
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
