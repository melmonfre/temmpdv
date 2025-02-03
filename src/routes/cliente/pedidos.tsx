import { Layout } from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cliente/pedidos')({
  component: CustomerOrders,
})

export default function CustomerOrders() {
  return (
    <Layout role="customer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedido #1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span>Em processamento</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Data:</span>
                  <span>22/01/2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span>R$ 150,00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
