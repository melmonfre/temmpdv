import { Layout } from '@/components/layout/Layout'
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

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/supervisor/funcionarios')({
  component: SupervisorEmployees,
})

export default function SupervisorEmployees() {
  const { data: employees, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: api.getUsers,
  })

  const cashiers = employees?.filter((emp) => emp.role === 'CASHIER') || []

  if (isLoading) {
    return (
      <Layout role="supervisor">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout role="supervisor">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Funcionários</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Documento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cashiers.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.document}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}
