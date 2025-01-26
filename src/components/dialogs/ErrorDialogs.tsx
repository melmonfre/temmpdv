import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, XCircle, AlertTriangle } from "lucide-react";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  type?: "error" | "warning" | "validation";
}

export function ErrorDialog({
  open,
  onOpenChange,
  title,
  description,
  type = "error",
}: ErrorDialogProps) {
  const icons = {
    error: <XCircle className="h-6 w-6 text-destructive" />,
    warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    validation: <AlertCircle className="h-6 w-6 text-blue-500" />,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            {icons[type]}
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="py-4">{description}</div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Predefined error dialogs for common scenarios
export function InvalidSupervisorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ErrorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Credenciais Inválidas"
      description="O código ou senha do supervisor está incorreto. Por favor, verifique e tente novamente."
      type="error"
    />
  );
}

export function InsufficientFundsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ErrorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Saldo Insuficiente"
      description="Não há saldo suficiente no caixa para realizar esta operação."
      type="error"
    />
  );
}

export function RegisterClosedDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ErrorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Caixa Fechado"
      description="O caixa precisa estar aberto para realizar esta operação."
      type="warning"
    />
  );
}

export function SystemErrorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ErrorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Erro do Sistema"
      description="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
      type="error"
    />
  );
}

export function ValidationErrorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ErrorDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Dados Inválidos"
      description="Por favor, verifique se todos os campos foram preenchidos corretamente."
      type="validation"
    />
  );
}