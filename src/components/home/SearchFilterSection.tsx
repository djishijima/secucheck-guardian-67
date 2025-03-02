
import React from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchFilterSection = () => {
  return (
    <section className="mb-10">
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="GXまたはAI製品を検索..."
            className="pl-10 w-full"
          />
        </div>
        <div className="flex gap-2 w-full md:w-1/3 justify-end">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> フィルター
          </Button>
          <Button variant="outline" className="gap-2">
            <ShoppingCart className="h-4 w-4" /> カート
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer">すべて</Badge>
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">AI製品</Badge>
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">GX製品</Badge>
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">印刷サービス</Badge>
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">データ分析</Badge>
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">サステナブル</Badge>
      </div>
    </section>
  );
};

export default SearchFilterSection;
