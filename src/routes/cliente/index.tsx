import { Layout } from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Package } from 'lucide-react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cliente/')({
  component: CustomerDashboard,
})

const stats = [
  {
    title: 'Pedidos Realizados',
    value: '5',
    icon: ShoppingCart,
  },
  {
    title: 'Em Andamento',
    value: '2',
    icon: Package,
  },
]

export default function CustomerDashboard() {
  return (
    <Layout role="customer">
      <h1 className="text-3xl font-heading font-bold mb-6">Minha Conta</h1>
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
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Layout>
  )
}
