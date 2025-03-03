
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InquiryDialogProps {
  buttonLabel?: string;
  buttonClassName?: string;
}

const InquiryDialog: React.FC<InquiryDialogProps> = ({ 
  buttonLabel = "お問い合わせ",
  buttonClassName = "w-full sm:w-auto gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [openInquiryDialog, setOpenInquiryDialog] = useState(false);
  const { toast } = useToast();
  
  // お問い合わせ送信処理
  const handleSubmitInquiry = () => {
    // 実際のプロジェクトではここでAPIリクエストを行う
    toast({
      title: "お問い合わせを送信しました",
      description: "担当者が確認次第、ご連絡いたします。",
    });
    setOpenInquiryDialog(false);
    setInquiryName('');
    setInquiryEmail('');
    setInquiryMessage('');
  };
  
  return (
    <Dialog open={openInquiryDialog} onOpenChange={setOpenInquiryDialog}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={buttonClassName}
        >
          <Mail className="h-4 w-4" />
          <span>{buttonLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>診断結果についてのお問い合わせ</DialogTitle>
          <DialogDescription>
            診断結果についてご質問や詳細な情報が必要な場合は、こちらからお問い合わせください。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              お名前
            </Label>
            <Input
              id="name"
              value={inquiryName}
              onChange={(e) => setInquiryName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              メールアドレス
            </Label>
            <Input
              id="email"
              type="email"
              value={inquiryEmail}
              onChange={(e) => setInquiryEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              お問い合わせ内容
            </Label>
            <Textarea
              id="message"
              value={inquiryMessage}
              onChange={(e) => setInquiryMessage(e.target.value)}
              className="col-span-3"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmitInquiry}>送信する</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryDialog;
