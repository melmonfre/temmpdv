import { useState, useEffect } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OpenRegisterDialog } from '@/components/cashier/OpenRegisterDialog'
import { CashierOperations } from '@/components/cashier/CashierOperations'
import { FinancialCards } from '@/components/cashier/FinancialCards'
import { useToast } from '@/hooks/use-toast'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/funcionario/caixa')({
  component: Cashier,
})

export default function Cashier() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [showOpenDialog, setShowOpenDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const lastOpenDate = localStorage.getItem('lastRegisterOpenDate')
    const today = new Date().toDateString()

    if (lastOpenDate !== today) {
      setIsRegisterOpen(false)
    } else {
      setIsRegisterOpen(true)
    }
  }, [])

  const handleOpenRegister = (initialAmount: number) => {
    localStorage.setItem('lastRegisterOpenDate', new Date().toDateString())
    localStorage.setItem('initialAmount', initialAmount.toString())
    setIsRegisterOpen(true)
    setShowOpenDialog(false)

    toast({
      title: 'Caixa aberto',
      description: `Caixa aberto com R$ ${initialAmount.toFixed(2)} de troco inicial.`,
    })
  }

  const handleOperation = (type: string) => {
    // This function is now handled by the CashierDialog component
    console.log(`Operation ${type} initiated`)
  }

  if (!isRegisterOpen) {
    return (
      <Layout role="employee">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Caixa Fechado</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">
                O caixa precisa ser aberto para iniciar as operações.
              </p>
              <Button onClick={() => setShowOpenDialog(true)}>
                Abrir Caixa
              </Button>
            </CardContent>
          </Card>
        </div>

        <OpenRegisterDialog
          open={showOpenDialog}
          onOpenChange={setShowOpenDialog}
          onConfirm={handleOpenRegister}
        />
      </Layout>
    )
  }

  return (
    <Layout role="employee">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Caixa</h1>
          <CashierOperations onOperation={handleOperation} />
        </div>

        <FinancialCards />
      </div>
    </Layout>
  )
}
