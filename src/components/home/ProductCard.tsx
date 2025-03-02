
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  MessageSquare,
  Leaf,
  Languages,
  Truck
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    icon?: React.ReactNode;
    image?: string;
    link: string;
  };
}

// アイコンを製品IDに基づいて選択する関数
const getProductIcon = (productId: number) => {
  switch (productId) {
    case 1:
      return <Leaf className="w-16 h-16 text-green-600" />;
    case 2:
      return <Leaf className="w-16 h-16 text-green-600" />;
    case 3:
      return <Languages className="w-16 h-16 text-blue-600" />;
    case 4:
      return <Truck className="w-16 h-16 text-green-600" />;
    default:
      return <Leaf className="w-16 h-16 text-gray-600" />;
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-gray-200 hover:border-green-300 transition-all">
        <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-50">
          {product.icon || getProductIcon(product.id)}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{product.title}</CardTitle>
          </div>
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className={`text-xs ${
                tag === 'GX' ? 'bg-green-100 text-green-800' : 
                tag === 'AI' ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 text-sm line-clamp-3">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t pt-4">
          <p className="font-semibold">¥{product.price.toLocaleString()}</p>
          <div className="flex gap-2">
            <Link to={product.link}>
              <Button size="sm" variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" /> 詳細
              </Button>
            </Link>
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" /> {product.title}お問合せ
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
