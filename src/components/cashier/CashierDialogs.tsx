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

interface CashierDialogProps {
  type: "Sangria" | "Retirada de Troco" | "Troca" | "Cheque";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CashierDialog({ type, open, onOpenChange }: CashierDialogProps) {
  const [amount, setAmount] = useState("");
  const [supervisorCode, setSupervisorCode] = useState("");
  const [supervisorPassword, setSupervisorPassword] = useState("");
  const { toast } = useToast();

  const handleConfirm = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast({
        title: "Erro",
        description: "Por favor, insira um valor válido.",
        variant: "destructive",
      });
      return;
    }

    if (!supervisorCode || !supervisorPassword) {
      toast({
        title: "Erro",
        description: "Por favor, insira as credenciais do supervisor.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would typically validate supervisor credentials with API
      // For now, we'll just show a success message
      toast({
        title: "Operação realizada",
        description: `${type} no valor de R$ ${Number(amount).toFixed(2)} registrada com sucesso.`,
      });

      setAmount("");
      setSupervisorCode("");
      setSupervisorPassword("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Credenciais do supervisor inválidas.",
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
            />
          </div>
          <div className="space-y-2">
            <Label>Código do Supervisor</Label>
            <Input
              type="number"
              value={supervisorCode}
              onChange={(e) => setSupervisorCode(e.target.value)}
              placeholder="Digite o código do supervisor"
            />
          </div>
          <div className="space-y-2">
            <Label>Senha do Supervisor</Label>
            <Input
              type="password"
              value={supervisorPassword}
              onChange={(e) => setSupervisorPassword(e.target.value)}
              placeholder="Digite a senha do supervisor"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}