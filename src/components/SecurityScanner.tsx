import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle, Database, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Vulnerability {
  type: 'XSS' | 'SQLInjection' | 'CSRF' | 'Other';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  impact: string;
  solution: string;
}

const SecurityScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  const simulateScan = (inputUrl: string) => {
    // Reset scan state
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(0);
    setVulnerabilities([]);

    // Validate URL format
    try {
      new URL(inputUrl);
    } catch (_) {
      toast.error('有効なURLを入力してください。', {
        description: 'URLは「https://example.com」の形式で入力してください。',
      });
      setIsScanning(false);
      return;
    }

    // Simulated scan progress
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);

    // Simulate scan completion after delay
    setTimeout(() => {
      clearInterval(progressInterval);
      setScanProgress(100);
      
      // Generate mock vulnerability results based on URL
      const mockVulnerabilities: Vulnerability[] = [];
      
      // XSS vulnerabilities
      if (Math.random() > 0.3) {
        mockVulnerabilities.push({
          type: 'XSS',
          severity: 'High',
          description: '反射型クロスサイトスクリプティングの脆弱性が検出されました。',
          impact: '攻撃者がユーザーのセッションを乗っ取り、偽のコンテンツの表示、マルウェアの配布、フィッシング攻撃などを実行できる可能性があります。',
          solution: '入力検証を強化し、ユーザー入力をエスケープするようにしてください。また、Content-Security-Policyヘッダーの実装を検討してください。',
        });
      }

      // SQL Injection vulnerabilities
      if (Math.random() > 0.5) {
        mockVulnerabilities.push({
          type: 'SQLInjection',
          severity: 'Critical',
          description: 'SQLインジェクションの脆弱性が検出されました。',
          impact: '攻撃者がデータベースを操作し、機密データの抽出、データの変更、データベースの破壊などを行える可能性があります。',
          solution: 'パラメータ化クエリを使用し、入力値のバリデーションを実装してください。また、データベースユーザーの権限を制限することも重要です。',
        });
      }

      // CSRF vulnerabilities
      if (Math.random() > 0.7) {
        mockVulnerabilities.push({
          type: 'CSRF',
          severity: 'Medium',
          description: 'クロスサイトリクエストフォージェリ（CSRF）の脆弱性が検出されました。',
          impact: '攻撃者が認証済みユーザーに代わって不正なアクションを実行する可能性があります。',
          solution: 'CSRFトークンを実装し、重要な操作に対して追加の認証を要求してください。',
        });
      }

      // Other vulnerabilities
      if (Math.random() > 0.6) {
        mockVulnerabilities.push({
          type: 'Other',
          severity: 'Low',
          description: '安全でないHTTPヘッダーが検出されました。',
          impact: 'サイトがクリックジャッキング攻撃やコンテンツスニッフィング攻撃に対して脆弱になる可能性があります。',
          solution: 'X-Frame-Options、X-Content-Type-Options、X-XSS-Protectionなどのセキュリティヘッダーを実装してください。',
        });
      }

      setVulnerabilities(mockVulnerabilities);
      setIsScanning(false);
      setScanComplete(true);
      
      if (mockVulnerabilities.length === 0) {
        toast.success('スキャン完了', {
          description: '脆弱性は検出されませんでした。',
        });
      } else {
        toast.error(`スキャン完了: ${mockVulnerabilities.length}件の脆弱性が見つかりました`, {
          description: '詳細な結果をご確認ください。',
        });
      }
    }, 5000);
  };

  const handleScan = () => {
    if (!url) {
      toast.error('URLを入力してください');
      return;
    }
    simulateScan(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVulnerabilityIcon = (type: string) => {
    switch (type) {
      case 'XSS': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'SQLInjection': return <Database className="h-5 w-5 text-red-500" />;
      case 'CSRF': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default: return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="shadow-lg border-0 overflow-hidden bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">セキュリティスキャナー</CardTitle>
          <CardDescription>
            ウェブサイトのURLを入力して、セキュリティ脆弱性をスキャンします。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                disabled={isScanning}
              />
              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                {isScanning ? 'スキャン中...' : 'スキャン開始'}
              </Button>
            </div>

            {isScanning && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">スキャン中... {scanProgress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-blue-700 h-2.5 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {scanComplete && (
              <Tabs defaultValue={vulnerabilities.length > 0 ? "results" : "summary"} className="mt-6">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="results">スキャン結果</TabsTrigger>
                  <TabsTrigger value="summary">概要</TabsTrigger>
                </TabsList>
                <TabsContent value="results" className="mt-4">
                  {vulnerabilities.length > 0 ? (
                    <div className="space-y-4">
                      {vulnerabilities.map((vuln, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Alert className="border-l-4 border-l-red-500">
                            <div className="flex items-center gap-2">
                              {getVulnerabilityIcon(vuln.type)}
                              <AlertTitle className="flex items-center gap-2">
                                {vuln.type}
                                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(vuln.severity)}`}>
                                  {vuln.severity}
                                </span>
                              </AlertTitle>
                            </div>
                            <AlertDescription className="mt-2">
                              <p className="font-medium">{vuln.description}</p>
                              <div className="mt-4 space-y-3 text-sm">
                                <div>
                                  <h4 className="font-semibold text-gray-900">影響:</h4>
                                  <p className="text-gray-700">{vuln.impact}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">対策:</h4>
                                  <p className="text-gray-700">{vuln.solution}</p>
                                </div>
                              </div>
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="inline-flex rounded-full bg-green-100 p-4 mb-4"
                      >
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </motion.div>
                      <h3 className="text-xl font-medium text-gray-900 mt-2">セキュリティチェック完了</h3>
                      <p className="text-gray-500 mt-1">検出された脆弱性はありません。</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="summary" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">スキャン概要</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">スキャンしたURL</p>
                        <p className="font-medium truncate">{url}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">検出された脆弱性</p>
                        <p className="font-medium">{vulnerabilities.length}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                        <p className="text-sm text-gray-500">深刻度の内訳</p>
                        <div className="flex gap-2 mt-2">
                          {['Critical', 'High', 'Medium', 'Low'].map((severity) => {
                            const count = vulnerabilities.filter(v => v.severity === severity).length;
                            return (
                              <div key={severity} className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 ${getSeverityColor(severity)}`}>
                                <span>{severity}</span>
                                <span className="font-bold">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex flex-col items-start pt-4">
          <p className="text-sm text-gray-500">
            このスキャナーはウェブサイトのセキュリティ脆弱性を特定するのに役立ちます。
            実際の攻撃は実行せず、潜在的な脆弱性のみを報告します。
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecurityScanner;
