
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-gray-200 hover:border-indigo-300 transition-all">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{product.title}</CardTitle>
          </div>
          <div className="flex gap-1 mt-2">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 text-sm">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t pt-4">
          <p className="font-semibold">¥{product.price.toLocaleString()}</p>
          <Button size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" /> カートに追加
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
