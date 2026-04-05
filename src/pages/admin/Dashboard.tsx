import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Package, ShoppingCart, Users, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useMemo } from "react";

const stats = [
  { title: "Vendas Hoje", value: "R$ 2.350,00", icon: ShoppingCart, trend: "+12%" },
  { title: "Produtos", value: "1.234", icon: Package, trend: "+3%" },
  { title: "Funcionários", value: "12", icon: Users, trend: "0%" },
  { title: "Lucro Mensal", value: "R$ 45.678,00", icon: DollarSign, trend: "+8%" },
];

export default function AdminDashboard() {
  const { data: sales, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: api.getSales,
  });

  const ranking = useMemo(() => {
    if (!sales) return [];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentSales = sales.filter(
      (s) => s.status === "COMPLETED" && new Date(s.date) >= thirtyDaysAgo
    );

    const employeeMap = new Map<number, { name: string; totalSales: number; totalValue: number }>();
    recentSales.forEach((sale) => {
      const existing = employeeMap.get(sale.employeeId);
      if (existing) {
        existing.totalSales += 1;
        existing.totalValue += sale.total;
      } else {
        employeeMap.set(sale.employeeId, {
          name: sale.employeeName,
          totalSales: 1,
          totalValue: sale.total,
        });
      }
    });

    return Array.from(employeeMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.totalValue - a.totalValue);
  }, [sales]);

  const getMedalInfo = (index: number) => {
    if (index === 0) return { label: "Ouro", emoji: "🥇", bgClass: "bg-yellow-50 border-yellow-300 dark:bg-yellow-950/30 dark:border-yellow-700", textClass: "text-yellow-700 dark:text-yellow-400" };
    if (index === 1) return { label: "Prata", emoji: "🥈", bgClass: "bg-gray-50 border-gray-300 dark:bg-gray-800/30 dark:border-gray-600", textClass: "text-gray-600 dark:text-gray-300" };
    if (index === 2) return { label: "Bronze", emoji: "🥉", bgClass: "bg-amber-50 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700", textClass: "text-amber-700 dark:text-amber-400" };
    return null;
  };

  return (
    <Layout role="admin">
      <h1 className="text-3xl font-heading font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"}>
                    {stat.trend}
                  </span>{" "}
                  em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Ranking de Vendas — Últimos 30 dias</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
          ) : ranking.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Nenhuma venda registrada nos últimos 30 dias.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Funcionário</TableHead>
                  <TableHead className="text-right">Vendas</TableHead>
                  <TableHead className="text-right">Total Vendido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ranking.map((employee, index) => {
                  const medal = getMedalInfo(index);
                  return (
                    <TableRow key={employee.id} className={medal ? `${medal.bgClass} border` : ""}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {medal ? (
                            <span className="text-xl">{medal.emoji}</span>
                          ) : (
                            <span className="text-muted-foreground font-medium ml-1">{index + 1}º</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={`font-semibold ${medal ? medal.textClass : ""}`}>{employee.name}</span>
                          {medal && <span className={`text-xs ${medal.textClass} opacity-75`}>{medal.label}</span>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{employee.totalSales}</TableCell>
                      <TableCell className="text-right font-bold">
                        {employee.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
