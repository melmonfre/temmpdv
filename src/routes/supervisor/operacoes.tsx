import { Layout } from '@/components/layout/Layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { SupervisorOperation } from '@/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { Check, X } from 'lucide-react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/supervisor/operacoes')({
  component: SupervisorOperations,
})

export default function SupervisorOperations() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [selectedOperation, setSelectedOperation] =
    useState<SupervisorOperation | null>(null)
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)

  const { data: operations, isLoading } = useQuery({
    queryKey: ['supervisor-operations'],
    queryFn: () => api.getPendingAuthorizations(),
    refetchInterval: 5000,
  })

  const approveMutation = useMutation({
    mutationFn: (id: number) => api.approveAuthorization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supervisor-operations'] })
      toast({
        title: 'Operação aprovada',
        description: 'A solicitação foi aprovada com sucesso.',
      })
      setApproveDialogOpen(false)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (id: number) => api.rejectAuthorization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supervisor-operations'] })
      toast({
        title: 'Operação rejeitada',
        description: 'A solicitação foi rejeitada.',
      })
      setRejectDialogOpen(false)
    },
  })

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
        <h1 className="text-3xl font-bold">Autorizações Pendentes</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operations?.map((operation) => (
              <TableRow key={operation.id}>
                <TableCell>{operation.type}</TableCell>
                <TableCell>R$ {operation.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {format(new Date(operation.timestamp), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>{operation.status}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => {
                      setSelectedOperation(operation)
                      setApproveDialogOpen(true)
                    }}
                    disabled={operation.status !== 'PENDING'}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedOperation(operation)
                      setRejectDialogOpen(true)
                    }}
                    disabled={operation.status !== 'PENDING'}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Rejeitar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <AlertDialog
          open={approveDialogOpen}
          onOpenChange={setApproveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Aprovação</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja aprovar esta operação?
                {selectedOperation && (
                  <div className="mt-2">
                    <p>Tipo: {selectedOperation.type}</p>
                    <p>Valor: R$ {selectedOperation.amount.toFixed(2)}</p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  selectedOperation &&
                  approveMutation.mutate(selectedOperation.id)
                }
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Rejeição</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja rejeitar esta operação?
                {selectedOperation && (
                  <div className="mt-2">
                    <p>Tipo: {selectedOperation.type}</p>
                    <p>Valor: R$ {selectedOperation.amount.toFixed(2)}</p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  selectedOperation &&
                  rejectMutation.mutate(selectedOperation.id)
                }
                className="bg-destructive hover:bg-destructive/90"
              >
                Rejeitar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  )
}
