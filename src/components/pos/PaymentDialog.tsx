import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
  total: number;
  onConfirmPayment: () => void;
}

export function PaymentDialog({
  open,
  onOpenChange,
  paymentMethod,
  onPaymentMethodChange,
  total = 0, // Provide default value to prevent undefined
  onConfirmPayment,
}: PaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Método de Pagamento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dinheiro" id="dinheiro" />
              <Label htmlFor="dinheiro">Dinheiro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix">PIX</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credito" id="credito" />
              <Label htmlFor="credito">Cartão de Crédito</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="debito" id="debito" />
              <Label htmlFor="debito">Cartão de Débito</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cheque" id="cheque" />
              <Label htmlFor="cheque">Cheque</Label>
            </div>
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={onConfirmPayment}>
              <CreditCard className="mr-2 h-4 w-4" />
              Pagar R$ {total.toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}