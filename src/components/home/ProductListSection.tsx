
import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProducts, filterProducts } from './productData';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import GxAiPromoSection from './GxAiPromoSection';

const ProductListSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProducts = filterProducts(allProducts, activeCategory);

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-green-600" />
          製品・サービス
        </h2>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          すべての製品を見る →
        </Link>
      </div>
      
      <CategoryFilter 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      <ProductGrid products={filteredProducts} />
      
      <GxAiPromoSection />
    </section>
  );
};

export default ProductListSection;
