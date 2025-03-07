
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  MessageSquare,
  Leaf,
  Languages,
  Truck,
  Cpu,
  Target,
  ShieldCheck,
  GraduationCap,
  PaintBucket
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

interface ProductCategories {
  function?: string;
  technology?: string;
  challenge?: string;
}

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price?: number; // Make price optional
    category?: string;
    categories?: ProductCategories;
    tags: string[];
    icon?: React.ReactNode;
    image?: string;
    link: string;
  };
}

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
    case 5:
      return <PaintBucket className="w-16 h-16 text-green-600" />;
    case 6:
      return <Cpu className="w-16 h-16 text-blue-600" />;
    case 7:
      return <Target className="w-16 h-16 text-purple-600" />;
    case 8:
      return <ShieldCheck className="w-16 h-16 text-teal-600" />;
    case 9:
      return <GraduationCap className="w-16 h-16 text-amber-600" />;
    default:
      return <Leaf className="w-16 h-16 text-gray-600" />;
  }
};

const getCategoryBadgeStyle = (categoryType: string, value: string) => {
  if (categoryType === 'function') {
    return 'bg-blue-100 text-blue-800';
  } else if (categoryType === 'technology') {
    return 'bg-purple-100 text-purple-800';
  } else if (categoryType === 'challenge') {
    return 'bg-green-100 text-green-800';
  }
  return 'bg-gray-100 text-gray-800';
};

const getValidProductLink = (link: string): string => {
  const validRoutes = [
    '/eco-printing',
    '/gx-printing',
    '/gx-logistics',
    '/gx-eco-design',
    '/gx-energy-management',
    '/gx-sustainable-marketing',
    '/gx-supply-chain-audit',
    '/gx-education-platform',
    '/comprehensive-diagnostics'
  ];
  
  return validRoutes.includes(link) ? link : '/contact';
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasImageOrIcon = product.image || product.icon;
  
  const validLink = getValidProductLink(product.link);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
        <div className="w-full h-40 overflow-hidden flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
          {product.image ? (
            <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
          ) : (
            product.icon || getProductIcon(product.id)
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{product.title}</CardTitle>
          </div>
          
          {product.categories && (
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(product.categories).map(([type, value]) => (
                <Badge 
                  key={`${type}-${value}`} 
                  className={`text-xs ${getCategoryBadgeStyle(type, value)}`}
                >
                  {value}
                </Badge>
              ))}
            </div>
          )}
          
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
        <CardFooter className="flex justify-center items-center border-t pt-4 gap-2">
          <Link to={validLink}>
            <Button size="sm" variant="outline" className="hover:-translate-y-1 transition-transform">
              <ExternalLink className="mr-2 h-4 w-4" /> 詳細
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="sm" className="hover:-translate-y-1 transition-transform">
              <MessageSquare className="mr-2 h-4 w-4" /> お問合せ
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
