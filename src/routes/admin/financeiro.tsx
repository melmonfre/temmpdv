import { Layout } from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { Sale } from "@/types";

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/financeiro')({
  component: Finance,
})

export default function Finance() {
  const { data: sales } = useQuery({
    queryKey: ['sales'],
    queryFn: api.getSales,
  })

  const totalRevenue = sales?.reduce((acc, sale) => acc + sale.total, 0) || 0
  const totalSales = sales?.length || 0
  const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0

  const recentTransactions = sales?.slice(0, 5) || []

  return (
    <Layout role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Financeiro</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Receita Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalRevenue)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalSales}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(averageTicket)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>#{transaction.id}</TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>{transaction.employeeName}</TableCell>
                    <TableCell>
                      {transaction.paymentMethod === 'CREDIT' && 'Crédito'}
                      {transaction.paymentMethod === 'DEBIT' && 'Débito'}
                      {transaction.paymentMethod === 'CASH' && 'Dinheiro'}
                      {transaction.paymentMethod === 'PIX' && 'PIX'}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(transaction.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
