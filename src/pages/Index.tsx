
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">ようこそ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">これは新しいプロジェクトの初期ページです。</p>
            <p className="mb-6">ここから必要な機能を追加していくことができます。</p>
            <Button>開始する</Button>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
