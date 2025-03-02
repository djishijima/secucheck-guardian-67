
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry: '製品について',
    message: '',
    privacyPolicy: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormState(prev => ({ ...prev, privacyPolicy: checked }));
  };

  const handleRadioChange = (value: string) => {
    setFormState(prev => ({ ...prev, inquiry: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.privacyPolicy) {
      toast.error("プライバシーポリシーに同意してください。");
      return;
    }
    
    setIsSubmitting(true);
    
    // ここで実際のAPIリクエストを送信する代わりに、送信成功をシミュレート
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("お問い合わせを受け付けました。担当者からご連絡いたします。");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">お問い合わせ</h1>
                <p className="text-lg opacity-90">
                  文唱堂印刷の製品やサービスについてのご質問、お見積もりのご依頼など、お気軽にお問い合わせください。
                  専門スタッフが丁寧にご対応いたします。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* お問い合わせフォーム */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-6">お問い合わせフォーム</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">お名前 <span className="text-red-500">*</span></Label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="山田 太郎"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">メールアドレス <span className="text-red-500">*</span></Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="example@mail.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">電話番号</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="03-1234-5678"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">会社名</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                            placeholder="株式会社〇〇"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>お問い合わせ内容 <span className="text-red-500">*</span></Label>
                        <RadioGroup defaultValue="製品について" value={formState.inquiry} onValueChange={handleRadioChange}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="製品について" id="product" />
                              <Label htmlFor="product" className="cursor-pointer">製品について</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="お見積もり" id="quote" />
                              <Label htmlFor="quote" className="cursor-pointer">お見積もり</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="GX・AI技術" id="technology" />
                              <Label htmlFor="technology" className="cursor-pointer">GX・AI技術</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="採用情報" id="recruitment" />
                              <Label htmlFor="recruitment" className="cursor-pointer">採用情報</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="取材・広報" id="press" />
                              <Label htmlFor="press" className="cursor-pointer">取材・広報</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="その他" id="other" />
                              <Label htmlFor="other" className="cursor-pointer">その他</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">メッセージ <span className="text-red-500">*</span></Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="お問い合わせ内容を詳しくお書きください。"
                          rows={5}
                          required
                        />
                      </div>
                      
                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox 
                          id="privacy" 
                          checked={formState.privacyPolicy}
                          onCheckedChange={handleCheckboxChange}
                        />
                        <Label htmlFor="privacy" className="text-sm cursor-pointer">
                          プライバシーポリシーに同意します。当社は、お客様の個人情報を適切に管理し、お問い合わせへの回答以外の目的では使用いたしません。
                        </Label>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          送信中...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> 送信する
                        </span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">お問い合わせありがとうございます</h2>
                    <p className="text-gray-600 mb-6">
                      内容を確認後、担当者からご連絡いたします。通常、1営業日以内にご返信いたします。
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      新しいお問い合わせ
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* お問い合わせ情報 */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">お問い合わせ先</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Eメール</h3>
                      <p className="text-gray-600">info@bunshodoh.co.jp</p>
                      <p className="text-sm text-gray-500 mt-1">24時間受付・通常1営業日以内に返信</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">電話</h3>
                      <p className="text-gray-600">03-1234-5678</p>
                      <p className="text-sm text-gray-500 mt-1">平日 9:00〜18:00（土日祝休）</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">所在地</h3>
                      <p className="text-gray-600">〒123-4567</p>
                      <p className="text-gray-600">東京都千代田区〇〇町1-2-3</p>
                      <p className="text-gray-600">文唱堂印刷ビル</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">営業時間</h3>
                      <p className="text-gray-600">月曜〜金曜: 9:00〜18:00</p>
                      <p className="text-gray-600">土日祝: 休業</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h3 className="font-medium text-gray-900 mb-2">お問い合わせの流れ</h3>
                  <ol className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                      フォームから必要事項を入力してご送信
                    </li>
                    <li className="flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                      担当者から折り返しご連絡（通常1営業日以内）
                    </li>
                    <li className="flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">3</span>
                      お客様のご要望に合わせたご提案
                    </li>
                    <li className="flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">4</span>
                      必要に応じて詳細なお見積もりをご提示
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* 地図セクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">アクセスマップ</h2>
          <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-gray-700">地図はダミーです。実際のマップを埋め込む場合は、</p>
              <p className="text-gray-700">Google MapsなどのAPIを利用して表示できます。</p>
            </div>
          </div>
        </section>
        
        {/* FAQ セクション */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">よくあるご質問</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg text-gray-900">納期はどのくらいかかりますか？</h3>
              <p className="text-gray-600 mt-2">
                製品やサービスによって異なりますが、標準的な印刷物は5〜7営業日、特殊な加工が必要な場合は10〜14営業日程度いただいております。
                急ぎの場合は、お問い合わせの際にご相談ください。
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg text-gray-900">最小ロット数はありますか？</h3>
              <p className="text-gray-600 mt-2">
                オンデマンド印刷では1部からご注文いただけます。ただし、オフセット印刷など一部の印刷方式では、
                コスト効率の観点から最小ロット数を設定している場合があります。詳細はお問い合わせください。
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg text-gray-900">GX対応の印刷物は通常より高額ですか？</h3>
              <p className="text-gray-600 mt-2">
                環境に配慮した素材や製法を使用するため、若干のコスト増が発生する場合もありますが、
                当社では技術革新によりコスト差を最小限に抑える努力をしています。また、長期的には企業イメージの向上や
                環境対応によるビジネス機会の創出など、多くのメリットがあります。
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg text-gray-900">AI技術の導入にはどのくらいの期間がかかりますか？</h3>
              <p className="text-gray-600 mt-2">
                既存のAIプロダクトであれば即日から数日で導入可能です。カスタマイズが必要な場合は、
                要件の複雑さによって2週間〜1ヶ月程度かかる場合があります。具体的な状況についてはお問い合わせください。
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
