import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

interface CashierDialogProps {
  type: "Sangria" | "Retirada de Troco" | "Troca" | "Cheque";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CashierDialog({ type, open, onOpenChange }: CashierDialogProps) {
  const [amount, setAmount] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: authStatus } = useQuery({
    queryKey: ['supervisor-auth', requestId],
    queryFn: async () => requestId ? await api.checkAuthorizationStatus(requestId) : null,
    enabled: !!requestId,
    refetchInterval: 2000,
  });

  if (authStatus?.status === 'APPROVED') {
    toast({
      title: "Operação autorizada",
      description: `${type} no valor de R$ ${Number(amount).toFixed(2)} foi autorizada.`,
    });
    setRequestId(null);
    onOpenChange(false);
  }

  if (authStatus?.status === 'REJECTED') {
    toast({
      title: "Operação negada",
      description: "O supervisor negou esta operação.",
      variant: "destructive",
    });
    setRequestId(null);
    onOpenChange(false);
  }

  const handleRequest = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast({
        title: "Erro",
        description: "Por favor, insira um valor válido.",
        variant: "destructive",
      });
      return;
    }

    try {
      const request = await api.requestAuthorization({
        type,
        amount: Number(amount),
        timestamp: new Date().toISOString(),
      });
      
      setRequestId(request.id);
      
      toast({
        title: "Solicitação enviada",
        description: "Aguardando autorização do supervisor...",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a solicitação.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Valor</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              disabled={!!requestId}
            />
          </div>
          
          {requestId && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Aguardando autorização do supervisor...</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleRequest} disabled={!!requestId}>
            Solicitar Autorização
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}