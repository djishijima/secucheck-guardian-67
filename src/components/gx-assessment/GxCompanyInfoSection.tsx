
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, { message: '会社名を入力してください' }),
  industry: z.string().min(1, { message: '業種を選択してください' }),
  employees: z.string().min(1, { message: '従業員数を選択してください' }),
  revenue: z.string().min(1, { message: '年間売上を選択してください' }),
  contact: z.string().email({ message: '有効なメールアドレスを入力してください' }).or(z.string().length(0))
});

interface GxCompanyInfoSectionProps {
  companyInfo: any;
  onSubmit: (data: any) => void;
}

const GxCompanyInfoSection: React.FC<GxCompanyInfoSectionProps> = ({
  companyInfo,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: companyInfo
  });
  
  return (
    <motion.section 
      className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center text-green-700">
        <Building2 className="mr-2 h-5 w-5 text-green-600" />
        企業情報
      </h2>
      <p className="text-gray-600 mb-6">診断を始めるには、以下の企業情報を入力してください。</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">会社名 <span className="text-red-500">*</span></Label>
          <Input 
            id="name" 
            {...register('name')} 
            placeholder="例: 株式会社文唱堂印刷"
            className="mt-1"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="industry">業種 <span className="text-red-500">*</span></Label>
            <select 
              id="industry" 
              {...register('industry')} 
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm mt-1"
            >
              <option value="">選択してください</option>
              <option value="製造業">製造業</option>
              <option value="印刷・出版">印刷・出版</option>
              <option value="卸売・小売">卸売・小売</option>
              <option value="運輸・物流">運輸・物流</option>
              <option value="情報通信">情報通信</option>
              <option value="金融・保険">金融・保険</option>
              <option value="不動産">不動産</option>
              <option value="サービス業">サービス業</option>
              <option value="建設">建設</option>
              <option value="電気・ガス・水道">電気・ガス・水道</option>
              <option value="その他">その他</option>
            </select>
            {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="employees">従業員数 <span className="text-red-500">*</span></Label>
            <select 
              id="employees" 
              {...register('employees')} 
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm mt-1"
            >
              <option value="">選択してください</option>
              <option value="10名未満">10名未満</option>
              <option value="10〜50名">10〜50名</option>
              <option value="51〜100名">51〜100名</option>
              <option value="101〜300名">101〜300名</option>
              <option value="301〜1000名">301〜1000名</option>
              <option value="1001名以上">1001名以上</option>
            </select>
            {errors.employees && <p className="text-red-500 text-sm mt-1">{errors.employees.message}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="revenue">年間売上高 <span className="text-red-500">*</span></Label>
          <select 
            id="revenue" 
            {...register('revenue')} 
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm mt-1"
          >
            <option value="">選択してください</option>
            <option value="1億円未満">1億円未満</option>
            <option value="1億円〜10億円">1億円〜10億円</option>
            <option value="10億円〜50億円">10億円〜50億円</option>
            <option value="50億円〜100億円">50億円〜100億円</option>
            <option value="100億円〜500億円">100億円〜500億円</option>
            <option value="500億円以上">500億円以上</option>
          </select>
          {errors.revenue && <p className="text-red-500 text-sm mt-1">{errors.revenue.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="contact">担当者メールアドレス（任意）</Label>
          <Input 
            id="contact" 
            type="email"
            {...register('contact')} 
            placeholder="例: contact@example.com"
            className="mt-1"
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
        </div>
        
        <Button 
          type="submit"
          className="mt-6 w-full sm:w-auto bg-green-600 hover:bg-green-700"
        >
          次へ進む <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </motion.section>
  );
};

export default GxCompanyInfoSection;
