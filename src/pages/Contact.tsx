
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(2, { message: 'お名前は2文字以上でお願いします' }),
  email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'メッセージは10文字以上でお願いします' }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: '利用規約への同意が必要です' }),
});

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast({
      title: 'お問い合わせを送信しました',
      description: '担当者からの連絡をお待ちください',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">お問い合わせ</h1>
          <p className="text-gray-600 mb-8">文唱堂印刷のGX x AI製品についてのご質問や資料請求はこちらからお願いします。</p>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block mb-2">お名前 <span className="text-red-500">*</span></Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <Label htmlFor="email" className="block mb-2">メールアドレス <span className="text-red-500">*</span></Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <Label htmlFor="company" className="block mb-2">会社名</Label>
                <Input id="company" {...register('company')} />
              </div>
              
              <div>
                <Label htmlFor="message" className="block mb-2">お問い合わせ内容 <span className="text-red-500">*</span></Label>
                <Textarea id="message" rows={5} {...register('message')} />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="agreeToTerms" {...register('agreeToTerms')} />
                <Label htmlFor="agreeToTerms" className="text-sm leading-none mt-0.5">
                  利用規約とプライバシーポリシーに同意します <span className="text-red-500">*</span>
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>}
              
              <Button type="submit" className="w-full md:w-auto">送信する</Button>
            </form>
            
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">その他のお問い合わせ方法</h3>
              <div className="space-y-2">
                <p><strong>電話:</strong> 03-3851-0111（平日 9:00-18:00）</p>
                <p><strong>メール:</strong> info@bunshodoh.co.jp</p>
                <p><strong>住所:</strong> 〒101-0025 東京都千代田区神田佐久間町3-37</p>
                <p><strong>FAX:</strong> 03-3861-1979</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
