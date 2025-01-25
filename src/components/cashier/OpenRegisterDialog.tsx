import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface OpenRegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (initialAmount: number) => void;
}

export function OpenRegisterDialog({
  open,
  onOpenChange,
  onConfirm,
}: OpenRegisterDialogProps) {
  const [initialAmount, setInitialAmount] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(initialAmount);
    
    if (isNaN(amount) || amount < 0) {
      toast({
        variant: "destructive",
        title: "Valor inválido",
        description: "Por favor, insira um valor válido para o troco inicial.",
      });
      return;
    }

    onConfirm(amount);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Abrir Caixa</DialogTitle>
          <DialogDescription>
            Informe o valor inicial de troco para começar as operações do dia.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="initialAmount">Valor inicial do troco</Label>
            <Input
              id="initialAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Abrir Caixa</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}