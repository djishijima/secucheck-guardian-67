
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  company: z.string().min(1, '会社名を入力してください'),
  industry: z.string().min(1, '業種を選択してください'),
  size: z.string().min(1, '企業規模を選択してください'),
});

type FormValues = z.infer<typeof formSchema>;

const LeadCaptureForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      company: '',
      industry: '',
      size: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    // Mock API call - in a real app, this would send the data to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', values);
      
      toast.success('診断リクエストを受け付けました', {
        description: '診断結果は3営業日以内にメールでお送りします',
        duration: 5000,
      });
      
      form.reset();
    } catch (error) {
      toast.error('エラーが発生しました', {
        description: 'しばらく経ってからもう一度お試しください',
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス *</FormLabel>
              <FormControl>
                <Input placeholder="example@company.co.jp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>会社名 *</FormLabel>
              <FormControl>
                <Input placeholder="株式会社〇〇" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>業種 *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="製造業">製造業</SelectItem>
                    <SelectItem value="小売業">小売業</SelectItem>
                    <SelectItem value="サービス業">サービス業</SelectItem>
                    <SelectItem value="IT・情報通信">IT・情報通信</SelectItem>
                    <SelectItem value="建設・不動産">建設・不動産</SelectItem>
                    <SelectItem value="金融・保険">金融・保険</SelectItem>
                    <SelectItem value="医療・福祉">医療・福祉</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>企業規模 *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="大企業（従業員300人以上）">大企業（従業員300人以上）</SelectItem>
                    <SelectItem value="中堅企業（従業員100〜299人）">中堅企業（従業員100〜299人）</SelectItem>
                    <SelectItem value="中小企業（従業員10〜99人）">中小企業（従業員10〜99人）</SelectItem>
                    <SelectItem value="小規模（従業員10人未満）">小規模（従業員10人未満）</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              送信中...
            </>
          ) : (
            <>
              無料診断を申し込む
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LeadCaptureForm;
