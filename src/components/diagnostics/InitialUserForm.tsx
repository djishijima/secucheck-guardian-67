
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building, User } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const formSchema = z.object({
  companyName: z.string().min(1, '会社名を入力してください'),
  userName: z.string().min(1, 'お名前を入力してください'),
  diagnosticType: z.string().min(1, '診断サービスを選択してください')
});

type FormValues = z.infer<typeof formSchema>;

const InitialUserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      userName: '',
      diagnosticType: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would save to a database
      console.log('Saving user data:', values);
      
      // Store in localStorage for now to persist across pages
      localStorage.setItem('diagnosticUserData', JSON.stringify({
        companyName: values.companyName,
        userName: values.userName,
        timestamp: new Date().toISOString()
      }));
      
      // Navigate to the selected diagnostic service
      switch (values.diagnosticType) {
        case 'sustainability':
          navigate('/sustainability-check');
          break;
        case 'dx':
          navigate('/comprehensive-diagnostics');
          break;
        case 'gx':
          navigate('/gx-assessment');
          break;
        case 'scope1':
          navigate('/scope-one');
          break;
        case 'scope2':
          navigate('/scope-two');
          break;
        default:
          navigate('/diagnostic-landing');
      }
      
      toast.success('お客様情報を保存しました', {
        description: '選択された診断サービスへ移動します',
      });
    } catch (error) {
      toast.error('エラーが発生しました', {
        description: 'しばらくしてからもう一度お試しください',
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">診断サービスを始める</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  会社名 <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="株式会社〇〇" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  お名前 <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="山田 太郎" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="diagnosticType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>診断サービスを選択 <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="診断サービスを選択してください" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sustainability">サステナビリティ診断</SelectItem>
                    <SelectItem value="dx">サステナブルDX診断</SelectItem>
                    <SelectItem value="gx">GX対応度診断</SelectItem>
                    <SelectItem value="scope1">Scope 1排出量診断</SelectItem>
                    <SelectItem value="scope2">Scope 2排出量診断</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 gap-2" 
            disabled={isSubmitting}
          >
            診断を開始する
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default InitialUserForm;
