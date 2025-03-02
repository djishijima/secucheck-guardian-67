
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";

interface TabButtonProps {
  value: string;
  icon: React.ReactNode;
  label: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ value, icon, label, activeTab, setActiveTab }) => (
  <TabsTrigger 
    value={value} 
    className={`flex items-center gap-2 px-4 py-3 ${activeTab === value ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700' : ''}`}
    onClick={() => setActiveTab(value)}
  >
    {icon}
    <span>{label}</span>
  </TabsTrigger>
);

export default TabButton;
