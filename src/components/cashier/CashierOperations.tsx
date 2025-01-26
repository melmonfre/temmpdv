import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpFromLine,
  ArrowDownToLine,
  RefreshCcw,
  FileCheck,
} from "lucide-react";
import { CashierDialog } from "./CashierDialogs";

interface CashierOperationsProps {
  onOperation: (type: string) => void;
}

export function CashierOperations({ onOperation }: CashierOperationsProps) {
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);

  const handleOperation = (type: string) => {
    setCurrentOperation(type);
    onOperation(type);
  };

  return (
    <>
      <div className="space-x-2">
        <Button
          variant="outline"
          onClick={() => handleOperation("Sangria")}
        >
          <ArrowUpFromLine className="mr-2 h-4 w-4" />
          Sangria
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOperation("Retirada de Troco")}
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Retirada
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOperation("Troca")}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Troca
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOperation("Cheque")}
        >
          <FileCheck className="mr-2 h-4 w-4" />
          Cheque
        </Button>
      </div>

      <CashierDialog
        type={currentOperation as "Sangria" | "Retirada de Troco" | "Troca" | "Cheque"}
        open={!!currentOperation}
        onOpenChange={(open) => !open && setCurrentOperation(null)}
      />
    </>
  );
}