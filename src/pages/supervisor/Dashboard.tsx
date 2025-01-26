import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export default function SupervisorDashboard() {
  const { data: pendingOperations, isLoading } = useQuery({
    queryKey: ['supervisor-operations'],
    queryFn: api.getPendingSupervisorOperations
  });

  if (isLoading) {
    return (
      <Layout role="supervisor">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="supervisor">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard do Supervisor</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Operações Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingOperations?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Alertas de Caixa</h2>
          {pendingOperations?.map((operation) => (
            <Alert key={operation.id} variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Atenção Necessária - Caixa {operation.registerId}</AlertTitle>
              <AlertDescription>
                {operation.type === "Sangria" && "Sangria pendente de aprovação"}
                {operation.type === "Retirada de Troco" && "Retirada de troco pendente"}
                {operation.type === "Troca" && "Troca pendente de aprovação"}
                {operation.type === "Cheque" && "Cheque pendente de aprovação"}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </Layout>
  );
}