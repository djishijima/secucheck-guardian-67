
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SecurityScanner from '@/components/SecurityScanner';
import SecurityEducation from '@/components/SecurityEducation';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle, Check, X } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState('results');

  // 脆弱性スキャン結果のサンプルデータ
  const scanResults = [
    {
      id: 1,
      url: 'https://example.co.jp/wp-admin/',
      type: 'WordPress管理画面露出',
      severity: 'critical',
      description: '管理画面が外部から直接アクセス可能な状態になっています。不正アクセスのリスクが非常に高いです。',
      recommendation: '.htaccessによるIPアドレス制限を実装するか、管理画面URLを変更してください。'
    },
    {
      id: 2,
      url: 'https://example.co.jp/contact.php',
      type: 'SQLインジェクション脆弱性',
      severity: 'high',
      description: 'コンタクトフォームのパラメータが適切にサニタイズされておらず、SQLインジェクション攻撃が可能です。',
      recommendation: 'プリペアドステートメントを使用するか、適切なエスケープ処理を実装してください。'
    },
    {
      id: 3,
      url: 'https://example.co.jp/login',
      type: '脆弱なパスワードポリシー',
      severity: 'medium',
      description: 'パスワードポリシーが弱く、簡単なパスワードを許容しています。ブルートフォース攻撃に弱い状態です。',
      recommendation: '最低8文字以上、英数字記号混在のパスワードポリシーを実装してください。'
    },
    {
      id: 4,
      url: 'https://example.co.jp',
      type: '古いWordPressバージョン',
      severity: 'medium',
      description: 'WordPressのバージョンが5.8.2と古く、既知の脆弱性が存在します。',
      recommendation: '最新バージョン（6.4.3）へのアップデートを推奨します。'
    },
    {
      id: 5,
      url: 'https://example.co.jp/images/',
      type: 'ディレクトリリスティング有効',
      severity: 'low',
      description: 'ディレクトリの内容が閲覧可能な状態になっており、非公開ファイルが露出するリスクがあります。',
      recommendation: 'ApacheのOptions -Indexesディレクティブを設定してください。'
    }
  ];

  // スキャン概要の統計データ
  const scanStats = {
    totalIssues: scanResults.length,
    criticalIssues: scanResults.filter(r => r.severity === 'critical').length,
    highIssues: scanResults.filter(r => r.severity === 'high').length,
    mediumIssues: scanResults.filter(r => r.severity === 'medium').length,
    lowIssues: scanResults.filter(r => r.severity === 'low').length,
    scanDate: '2024年6月10日 15:30',
    targetUrl: 'https://example.co.jp',
    scanDuration: '2分35秒'
  };

  // 深刻度に応じたバッジカラーを取得
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 hover:bg-red-700';
      case 'high': return 'bg-orange-500 hover:bg-orange-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // 深刻度の日本語表記を取得
  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical': return '致命的';
      case 'high': return '重大';
      case 'medium': return '中程度';
      case 'low': return '軽度';
      default: return '不明';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">セキュリティスキャン結果</h1>
            <div className="flex gap-4 flex-wrap">
              <Button 
                variant={activeTab === 'results' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('results')}
              >
                脆弱性レポート
              </Button>
              <Button 
                variant={activeTab === 'summary' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('summary')}
              >
                スキャン概要
              </Button>
              <Button 
                variant={activeTab === 'education' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('education')}
              >
                セキュリティ対策
              </Button>
            </div>
          </motion.div>
          
          {activeTab === 'results' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {scanResults.length > 0 ? (
                <div className="space-y-6">
                  <Alert variant="destructive" className="bg-red-50 border-red-300">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle>注意: 重大な脆弱性が検出されました</AlertTitle>
                    <AlertDescription>
                      {scanStats.criticalIssues}件の致命的な脆弱性と{scanStats.highIssues}件の重大な脆弱性が見つかりました。
                      早急な対応が必要です。
                    </AlertDescription>
                  </Alert>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">深刻度</TableHead>
                        <TableHead>脆弱性タイプ</TableHead>
                        <TableHead className="hidden md:table-cell">URL</TableHead>
                        <TableHead>対策</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scanResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>
                            <Badge className={getSeverityColor(result.severity)}>
                              {getSeverityLabel(result.severity)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div>{result.type}</div>
                            <div className="text-sm text-gray-500 mt-1">{result.description}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell break-all">
                            <code className="text-xs">{result.url}</code>
                          </TableCell>
                          <TableCell>{result.recommendation}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">脆弱性は検出されませんでした</h3>
                  <p className="text-gray-600 mt-2">現在のスキャンでは問題は見つかりませんでした。定期的なスキャンを継続することをお勧めします。</p>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'summary' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>スキャン概要</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">スキャン日時</dt>
                      <dd>{scanStats.scanDate}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">対象URL</dt>
                      <dd>{scanStats.targetUrl}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">スキャン所要時間</dt>
                      <dd>{scanStats.scanDuration}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>脆弱性サマリー</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div className="flex justify-between items-center">
                      <dt className="font-medium text-gray-500">致命的</dt>
                      <dd>
                        <Badge className="bg-red-600">{scanStats.criticalIssues}</Badge>
                      </dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="font-medium text-gray-500">重大</dt>
                      <dd>
                        <Badge className="bg-orange-500">{scanStats.highIssues}</Badge>
                      </dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="font-medium text-gray-500">中程度</dt>
                      <dd>
                        <Badge className="bg-yellow-500">{scanStats.mediumIssues}</Badge>
                      </dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="font-medium text-gray-500">軽度</dt>
                      <dd>
                        <Badge className="bg-blue-500">{scanStats.lowIssues}</Badge>
                      </dd>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <dt className="font-medium text-gray-900">合計</dt>
                      <dd className="font-bold">{scanStats.totalIssues}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>コンプライアンス評価</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">個人情報保護法コンプライアンス</h4>
                        <p className="text-sm text-gray-500">個人情報の取り扱いにおける脆弱性が検出されました。適切な保護対策が必要です。</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">改正電子帳簿保存法</h4>
                        <p className="text-sm text-gray-500">電子帳簿のセキュリティ対策は適切に実施されています。</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">SECURITY ACTION（IPA）</h4>
                        <p className="text-sm text-gray-500">IPAの「SECURITY ACTION」制度の二つ星基準を満たしていません。</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SecurityEducation />
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
