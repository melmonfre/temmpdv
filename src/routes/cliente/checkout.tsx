import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cliente/checkout')({
  component: Checkout,
})

export default function Checkout() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showAddressDialog, setShowAddressDialog] = useState(false)

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryMethod(value)
    if (value === 'delivery') {
      setShowAddressDialog(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!deliveryMethod) {
      toast({
        title: 'Selecione o método de entrega',
        description:
          'É necessário selecionar um método de entrega para continuar',
        variant: 'destructive',
      })
      return
    }
    if (!paymentMethod) {
      toast({
        title: 'Selecione o método de pagamento',
        description:
          'É necessário selecionar um método de pagamento para continuar',
        variant: 'destructive',
      })
      return
    }

    // TODO: Implement payment gateway integration
    toast({
      title: 'Pedido realizado com sucesso!',
      description: 'Você receberá um e-mail com os detalhes do pedido.',
    })
    navigate('/cliente')
  }

  return (
    <Layout role="customer">
      <div className="space-y-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Método de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={handleDeliveryMethodChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Retirada no Local</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Entrega</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Forma de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credito" id="credito" />
                  <Label htmlFor="credito">Cartão de Crédito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debito" id="debito" />
                  <Label htmlFor="debito">Cartão de Débito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix">PIX</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span>R$ 10,00</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/cliente/carrinho')}
              >
                Voltar ao Carrinho
              </Button>
              <Button type="submit">Finalizar Pedido</Button>
            </CardFooter>
          </Card>
        </form>

        <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Endereço de Entrega</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Rua</Label>
                <Input id="street" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input id="complement" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" required />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setShowAddressDialog(false)}>
                Confirmar Endereço
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}
