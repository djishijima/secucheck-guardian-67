
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Database, AlertCircle } from 'lucide-react';

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
              <div className="space-y-3">
                <p>
                  クロスサイトスクリプティング（XSS）は、攻撃者がウェブページに悪意のあるクライアント側スクリプトを注入することを可能にする脆弱性です。
                </p>
                <div>
                  <h4 className="font-semibold">主な種類:</h4>
                  <ul className="list-disc pl-5 text-sm mt-1">
                    <li><span className="font-medium">反射型XSS:</span> 悪意のあるスクリプトが、リクエストの一部としてサーバーに送信され、サーバーの応答内で「反射」されます。</li>
                    <li><span className="font-medium">格納型XSS:</span> 悪意のあるスクリプトがデータベースに保存され、そのデータが他のユーザーに表示されるたびに実行されます。</li>
                    <li><span className="font-medium">DOM型XSS:</span> クライアント側のJavaScriptがDOMを動的に変更することにより発生します。</li>
                  </ul>
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
              <div className="space-y-3">
                <p>
                  SQLインジェクションは、アプリケーションがユーザー入力をデータベースクエリに安全でない方法で組み込む場合に発生する脆弱性です。
                </p>
                <div>
                  <h4 className="font-semibold">攻撃の例:</h4>
                  <pre className="bg-gray-100 p-2 rounded-md text-xs mt-1 overflow-x-auto">
                    <code>SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'</code>
                  </pre>
                  <p className="text-xs mt-1">
                    この例では、「--」以降のクエリが無効化され、パスワードチェックなしでログインが可能になります。
                  </p>
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
