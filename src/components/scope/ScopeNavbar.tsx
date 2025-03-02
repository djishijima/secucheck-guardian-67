
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { LineChart, BarChart3, PieChart } from 'lucide-react';

interface ScopeNavbarProps {
  currentPath: string;
  onShowForm: () => void;
}

const ScopeNavbar: React.FC<ScopeNavbarProps> = ({ currentPath, onShowForm }) => {
  return (
    <div className="mb-8">
      <Card className="border-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Link to="/scope-one">
              <Button 
                variant={currentPath === "/scope-one" ? "default" : "outline"}
                className={currentPath === "/scope-one" 
                  ? "bg-blue-600 hover:bg-blue-700 flex items-center gap-2" 
                  : "border-blue-200 text-blue-700 flex items-center gap-2"}
              >
                <LineChart className="h-4 w-4" />
                Scope 1
              </Button>
            </Link>
            <Link to="/scope-two">
              <Button 
                variant={currentPath === "/scope-two" ? "default" : "outline"}
                className={currentPath === "/scope-two" 
                  ? "bg-blue-600 hover:bg-blue-700 flex items-center gap-2" 
                  : "border-blue-200 text-blue-700 flex items-center gap-2"}
              >
                <BarChart3 className="h-4 w-4" />
                Scope 2
              </Button>
            </Link>
            <Link to="/scope-three">
              <Button 
                variant={currentPath === "/scope-three" ? "default" : "outline"}
                className={currentPath === "/scope-three" 
                  ? "bg-blue-600 hover:bg-blue-700 flex items-center gap-2" 
                  : "border-blue-200 text-blue-700 flex items-center gap-2"}
              >
                <PieChart className="h-4 w-4" />
                Scope 3
              </Button>
            </Link>
            <div className="ml-auto">
              {currentPath && (
                <Button 
                  onClick={onShowForm}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  自社データを入力する
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScopeNavbar;
