
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, AtSign, Mail, Send, Paperclip, MessagesSquare, 
  Phone, Video, EllipsisVertical, Search, Bell, Users, Settings, 
  Facebook, Instagram, Twitter, PanelLeft, Loader2 
} from "lucide-react";

// モックデータ - 実際の実装ではAPIから取得します
const platforms = [
  { id: 'all', name: 'すべて', icon: <MessagesSquare className="h-5 w-5" />, color: 'bg-purple-500', count: 42 },
  { id: 'line', name: 'LINE', icon: <MessageSquare className="h-5 w-5" />, color: 'bg-green-500', count: 18 },
  { id: 'facebook', name: 'Facebook', icon: <Facebook className="h-5 w-5" />, color: 'bg-blue-600', count: 7 },
  { id: 'instagram', name: 'Instagram', icon: <Instagram className="h-5 w-5" />, color: 'bg-pink-600', count: 5 },
  { id: 'twitter', name: 'Twitter', icon: <Twitter className="h-5 w-5" />, color: 'bg-blue-400', count: 9 },
  { id: 'email', name: 'メール', icon: <Mail className="h-5 w-5" />, color: 'bg-gray-500', count: 3 }
];

const conversations = [
  {
    id: 1,
    name: '山田 太郎',
    avatar: 'https://i.pravatar.cc/150?img=1',
    platform: 'line',
    lastMessage: 'プロジェクトの進捗はどうですか？',
    time: '14:30',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: '佐藤 花子',
    avatar: 'https://i.pravatar.cc/150?img=5',
    platform: 'facebook',
    lastMessage: '資料を確認しました。明日の会議で詳細を説明します。',
    time: '13:15',
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: '鈴木 健太',
    avatar: 'https://i.pravatar.cc/150?img=3',
    platform: 'email',
    lastMessage: '【重要】契約書の確認をお願いします',
    time: '昨日',
    unread: 1,
    online: false
  },
  {
    id: 4,
    name: '高橋 美咲',
    avatar: 'https://i.pravatar.cc/150?img=8',
    platform: 'instagram',
    lastMessage: '新製品のデザイン案を送ります。',
    time: '昨日',
    unread: 0,
    online: true
  },
  {
    id: 5,
    name: '田中 誠',
    avatar: 'https://i.pravatar.cc/150?img=6',
    platform: 'twitter',
    lastMessage: 'キャンペーンの反応が良いです！',
    time: '月曜日',
    unread: 0,
    online: false
  },
  {
    id: 6,
    name: 'マーケティングチーム',
    avatar: '',
    platform: 'line',
    isGroup: true,
    lastMessage: '次回のミーティングは金曜日10時からです。',
    time: '月曜日',
    unread: 3,
    participants: 8
  }
];

// 選択された会話のメッセージ
const messages = [
  {
    id: 1,
    sender: 'them',
    name: '山田 太郎',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'おはようございます。プロジェクトの進捗はどうですか？',
    time: '14:20',
    platform: 'line'
  },
  {
    id: 2,
    sender: 'me',
    name: '自分',
    content: 'おはようございます。現在90%完了しています。',
    time: '14:22',
    platform: 'line'
  },
  {
    id: 3,
    sender: 'them',
    name: '山田 太郎',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'それは良いですね。完了予定はいつですか？',
    time: '14:25',
    platform: 'line'
  },
  {
    id: 4,
    sender: 'me',
    name: '自分',
    content: '明日の午前中には完了予定です。ドキュメントも作成中です。',
    time: '14:28',
    platform: 'line'
  },
  {
    id: 5,
    sender: 'them',
    name: '山田 太郎',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'ありがとうございます。明日の会議で発表できますね。',
    time: '14:30',
    platform: 'line'
  }
];

const Index = () => {
  const [currentPlatform, setCurrentPlatform] = useState('all');
  const [selectedChat, setSelectedChat] = useState<number | null>(1); // 最初のチャットを選択
  const [newMessage, setNewMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  // プラットフォームによるフィルタリング
  const filteredConversations = currentPlatform === 'all' 
    ? conversations 
    : conversations.filter(convo => convo.platform === currentPlatform);

  // 選択された会話
  const selectedConversation = conversations.find(c => c.id === selectedChat);

  // 新しいメッセージの送信
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // 実際の実装ではここでメッセージを送信するAPIを呼び出します
    console.log('送信メッセージ:', newMessage);
    setNewMessage('');
  };

  // プラットフォーム接続のシミュレーション
  const handleConnectPlatform = () => {
    setIsConnecting(true);
    // 実際の実装ではOAuthなどの認証フローを開始します
    setTimeout(() => {
      setIsConnecting(false);
      // ここでモーダルやトーストで接続成功メッセージを表示
    }, 2000);
  };

  // プラットフォームアイコンの取得
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'line': return <MessageSquare className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  // プラットフォームカラーの取得
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'line': return 'bg-green-500';
      case 'facebook': return 'bg-blue-600';
      case 'instagram': return 'bg-pink-600';
      case 'twitter': return 'bg-blue-400';
      case 'email': return 'bg-gray-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow flex">
        {/* サイドバートグルボタン（モバイル用） */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-20 left-4 md:hidden z-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>

        {/* サイドバー */}
        <motion.div 
          className={`bg-white border-r w-full md:w-80 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden md:block'}`}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">チャット</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Users className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="検索"
                className="pl-9"
              />
            </div>
            
            <div className="mb-4 overflow-x-auto pb-2 flex gap-2">
              {platforms.map(platform => (
                <Button 
                  key={platform.id}
                  variant={currentPlatform === platform.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPlatform(platform.id)}
                  className="flex-shrink-0"
                >
                  {platform.icon}
                  <span className="ml-1">{platform.name}</span>
                  {platform.count > 0 && (
                    <Badge className="ml-1 h-5 min-w-5 px-1.5" variant="secondary">
                      {platform.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            <Separator className="my-4" />
            
            <div className="space-y-1">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(convo => (
                  <div 
                    key={convo.id}
                    className={`p-3 rounded-md flex items-start gap-3 cursor-pointer ${selectedChat === convo.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedChat(convo.id)}
                  >
                    <div className="relative flex-shrink-0">
                      {convo.isGroup ? (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                      ) : (
                        <Avatar className="w-10 h-10">
                          <img src={convo.avatar} alt={convo.name} className="object-cover" />
                        </Avatar>
                      )}
                      {convo.online && !convo.isGroup && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                      <div className={`absolute -top-1 -right-1 ${getPlatformColor(convo.platform)} rounded-full p-0.5`}>
                        {getPlatformIcon(convo.platform)}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900 truncate">{convo.name}</h3>
                        <span className="text-xs text-gray-500">{convo.time}</span>
                      </div>
                      {convo.isGroup && (
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{convo.participants}名</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                    </div>
                    {convo.unread > 0 && (
                      <Badge className="ml-2 flex-shrink-0">
                        {convo.unread}
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  選択したプラットフォームに会話はありません
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* チャットエリア */}
        {selectedChat ? (
          <motion.div 
            className="flex-grow flex flex-col bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* チャットヘッダー */}
            {selectedConversation && (
              <div className="border-b p-4 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {selectedConversation.isGroup ? (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                    ) : (
                      <Avatar className="w-10 h-10">
                        <img src={selectedConversation.avatar} alt={selectedConversation.name} />
                      </Avatar>
                    )}
                    <div className={`absolute -top-1 -right-1 ${getPlatformColor(selectedConversation.platform)} rounded-full p-0.5`}>
                      {getPlatformIcon(selectedConversation.platform)}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold">{selectedConversation.name}</h2>
                    <div className="flex items-center text-xs text-gray-500">
                      {selectedConversation.online ? (
                        <span className="flex items-center">
                          <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                          オンライン
                        </span>
                      ) : (
                        <span>オフライン</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* メッセージエリア */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] flex ${message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                      {message.sender === 'them' && (
                        <Avatar className="w-8 h-8">
                          <img src={message.avatar} alt={message.name} />
                        </Avatar>
                      )}
                      <div>
                        {message.sender === 'them' && (
                          <span className="text-xs text-gray-500 ml-2 mb-1 block">{message.name}</span>
                        )}
                        <div className="flex items-start gap-1">
                          <div className={`relative rounded-lg p-3 ${
                            message.sender === 'me' 
                              ? 'bg-blue-600 text-white rounded-br-none' 
                              : 'bg-white text-gray-800 rounded-bl-none border'
                          }`}>
                            <p>{message.content}</p>
                            <span className={`text-xs block mt-1 text-right ${
                              message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.time}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 ${getPlatformColor(message.platform)} rounded-full p-0.5 scale-75`}>
                            {getPlatformIcon(message.platform)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* メッセージ入力エリア */}
            <div className="border-t p-4 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  placeholder="メッセージを入力..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" disabled={newMessage.trim() === ''}>
                  <Send className="h-5 w-5 mr-1" />
                  送信
                </Button>
              </form>
            </div>
          </motion.div>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md px-4">
              <MessagesSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">チャットを選択してください</h2>
              <p className="text-gray-600 mb-6">左側のリストからチャットを選択するか、新しい会話を始めてください。</p>
              <Button onClick={() => setSidebarOpen(true)}>チャットを選択</Button>
            </div>
          </div>
        )}
        
        {/* プラットフォーム接続タブ */}
        <Tabs defaultValue="accounts" className="border-l w-full md:w-80 flex-shrink-0 bg-white hidden lg:flex lg:flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-4">接続管理</h2>
            <TabsList className="w-full">
              <TabsTrigger value="accounts" className="flex-1">アカウント</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">設定</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="accounts" className="flex-grow overflow-y-auto p-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">接続済みアカウント</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500 p-1.5 rounded-full">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <span>LINE</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                      接続済み
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-600 p-1.5 rounded-full">
                        <Facebook className="h-4 w-4 text-white" />
                      </div>
                      <span>Facebook</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                      接続済み
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">サービスを接続</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-pink-600 p-1.5 rounded-full">
                        <Instagram className="h-4 w-4 text-white" />
                      </div>
                      <span>Instagram</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleConnectPlatform} disabled={isConnecting}>
                      {isConnecting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          接続中
                        </>
                      ) : "接続"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-400 p-1.5 rounded-full">
                        <Twitter className="h-4 w-4 text-white" />
                      </div>
                      <span>Twitter</span>
                    </div>
                    <Button size="sm" variant="outline">接続</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-500 p-1.5 rounded-full">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span>メール</span>
                    </div>
                    <Button size="sm" variant="outline">接続</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="flex-grow overflow-y-auto p-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">通知設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">デスクトップ通知</span>
                  <Button variant="outline" size="sm">有効</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">メール通知</span>
                  <Button variant="outline" size="sm">無効</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">サウンド</span>
                  <Button variant="outline" size="sm">有効</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
