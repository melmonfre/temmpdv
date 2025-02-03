import { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { EmployeeDialog } from '@/components/employees/EmployeeDialog'
import { EmployeeSearch } from '@/components/employees/EmployeeSearch'
import { EmployeeCard } from '@/components/employees/EmployeeCard'
import { User } from '@/types'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/funcionarios')({
  component: Employees,
})

export default function Employees() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null)

  const {
    data: employees,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: api.getUsers,
  })

  const filteredEmployees = employees?.filter(
    (employee) =>
      employee.role === 'EMPLOYEE' &&
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleDelete = async (employeeId: number) => {
    try {
      await api.deleteUser(employeeId)
      toast({
        title: 'Funcionário excluído',
        description: 'O funcionário foi excluído com sucesso.',
      })
      refetch()
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o funcionário.',
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (employee: User) => {
    setSelectedEmployee(employee)
    setDialogOpen(true)
  }

  const handleNewEmployee = () => {
    setSelectedEmployee(null)
    setDialogOpen(true)
  }

  if (isLoading) {
    return (
      <Layout role="admin">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Funcionários</h1>
          <Button onClick={handleNewEmployee}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Funcionário
          </Button>
        </div>

        <EmployeeSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees?.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <EmployeeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          employee={selectedEmployee || undefined}
        />
      </div>
    </Layout>
  )
}
