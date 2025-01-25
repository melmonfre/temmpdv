import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const stats = [
  {
    title: "Vendas Hoje",
    value: "R$ 2.350,00",
    icon: ShoppingCart,
    trend: "+12%",
  },
  {
    title: "Produtos",
    value: "1.234",
    icon: Package,
    trend: "+3%",
  },
  {
    title: "Funcionários",
    value: "12",
    icon: Users,
    trend: "0%",
  },
  {
    title: "Lucro Mensal",
    value: "R$ 45.678,00",
    icon: DollarSign,
    trend: "+8%",
  },
];

export default function AdminDashboard() {
  return (
    <Layout role="admin">
      <h1 className="text-3xl font-heading font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <span
                    className={
                      stat.trend.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {stat.trend}
                  </span>{" "}
                  em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
}