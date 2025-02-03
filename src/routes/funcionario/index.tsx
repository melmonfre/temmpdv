import { Layout } from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, DollarSign } from 'lucide-react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/funcionario/')({
  component: EmployeeDashboard,
})

const stats = [
  {
    title: 'Vendas Hoje',
    value: 'R$ 1.250,00',
    icon: ShoppingCart,
    trend: '+8%',
  },
  {
    title: 'Saldo em Caixa',
    value: 'R$ 2.500,00',
    icon: DollarSign,
    trend: '+15%',
  },
]

export default function EmployeeDashboard() {
  return (
    <Layout role="employee">
      <h1 className="text-3xl font-heading font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon
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
                      stat.trend.startsWith('+')
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {stat.trend}
                  </span>{' '}
                  em relação ao dia anterior
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Layout>
  )
}
