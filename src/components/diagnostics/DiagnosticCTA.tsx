
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const DiagnosticCTA: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className="text-center mt-12"
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/sustainability-check">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 gap-2">
              無料の自己診断ツールを試してみる
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-green-800 text-white">
          <p>所要時間約5分の自己診断を無料でお試しいただけます</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </motion.div>
);

export default DiagnosticCTA;
