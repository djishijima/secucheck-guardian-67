
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DiagnosticCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  link: string;
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ title, description, features, icon, link }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    transition={{ duration: 0.2 }}
  >
    <Card className="mb-6 hover:border-green-300 transition-all duration-300">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-3 rounded-lg shadow-sm">
          {icon}
        </div>
        <div className="space-y-1.5 text-left">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-none pl-0 mb-4 space-y-2 text-gray-700 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {link && (
          <Link to={link}>
            <Button variant="default" className="mt-2 w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 gap-2">
              診断を受ける
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default DiagnosticCard;
