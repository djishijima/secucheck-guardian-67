
import { useToast } from "@/components/ui/use-toast";

export const useReportActions = () => {
  const { toast } = useToast();
  
  const downloadReport = () => {
    toast({
      title: "レポートのダウンロード",
      description: "Scope 1排出量の詳細レポートがダウンロードされました。",
      duration: 3000,
    });
  };

  return {
    downloadReport
  };
};
