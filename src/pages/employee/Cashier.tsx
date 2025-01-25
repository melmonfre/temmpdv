import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OpenRegisterDialog } from "@/components/cashier/OpenRegisterDialog";
import { useToast } from "@/hooks/use-toast";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  History,
  ArrowUpFromLine,
  ArrowDownToLine,
  RefreshCcw,
  FileCheck,
} from "lucide-react";

export default function Cashier() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if register was opened today
    const lastOpenDate = localStorage.getItem("lastRegisterOpenDate");
    const today = new Date().toDateString();
    
    if (lastOpenDate !== today) {
      setShowOpenDialog(true);
    } else {
      setIsRegisterOpen(true);
    }
  }, []);

  const handleOpenRegister = (initialAmount: number) => {
    localStorage.setItem("lastRegisterOpenDate", new Date().toDateString());
    localStorage.setItem("initialAmount", initialAmount.toString());
    setIsRegisterOpen(true);
    setShowOpenDialog(false);
    
    toast({
      title: "Caixa aberto",
      description: `Caixa aberto com R$ ${initialAmount.toFixed(2)} de troco inicial.`,
    });
  };

  const handleOperation = (type: string) => {
    // Implement operation handling logic here
    toast({
      title: "Operação registrada",
      description: `${type} realizada com sucesso.`,
    });
  };

  if (!isRegisterOpen) {
    return (
      <Layout role="employee">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Caixa Fechado</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">O caixa precisa ser aberto para iniciar as operações.</p>
              <Button onClick={() => setShowOpenDialog(true)}>
                Abrir Caixa
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="employee">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Caixa</h1>
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saldo em Caixa
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 1.234,56</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vendas do Dia
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total em Cartões
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 856,00</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total em Dinheiro
              </CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 378,56</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <OpenRegisterDialog
        open={showOpenDialog}
        onOpenChange={setShowOpenDialog}
        onConfirm={handleOpenRegister}
      />
    </Layout>
  );
}