import { Layout } from '@/components/layout/Layout'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { CartItem, Product } from '@/types'
import { ProductSearch } from '@/components/pos/ProductSearch'
import { Cart } from '@/components/pos/Cart'
import { PaymentDialog } from '@/components/pos/PaymentDialog'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/funcionario/pdv')({
  component: POS,
})

export default function POS() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('')

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
  })

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.includes(searchTerm),
  )

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.productId === product.id,
      )
      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item,
        )
      }
      // Create new cart item with all required properties
      const newItem: CartItem = {
        id: Date.now(), // Using timestamp as temporary ID
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        subtotal: product.price,
        product: product, // Additional property for UI purposes
      }
      return [...currentCart, newItem]
    })
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.price,
            }
          : item,
      ),
    )
  }

  const removeFromCart = (productId: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.productId !== productId),
    )
  }

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0)

  const handleFinishSale = () => {
    if (cart.length === 0) {
      toast({
        title: 'Carrinho vazio',
        description: 'Adicione produtos ao carrinho para finalizar a venda',
        variant: 'destructive',
      })
      return
    }
    setShowPaymentDialog(true)
  }

  const handlePayment = () => {
    if (!paymentMethod) {
      toast({
        title: 'Selecione um método de pagamento',
        description:
          'É necessário selecionar um método de pagamento para continuar',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Venda finalizada',
      description: `Total: R$ ${total.toFixed(2)} - Pagamento: ${paymentMethod}`,
    })
    setCart([])
    setShowPaymentDialog(false)
    setPaymentMethod('')
  }

  if (isLoading) {
    return (
      <Layout role="employee">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout role="employee">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">PDV</h1>
          <ProductSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filteredProducts={filteredProducts || []}
            onProductSelect={addToCart}
          />
        </div>

        <div className="space-y-6">
          <Cart
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            total={total}
            onFinishSale={handleFinishSale}
          />
        </div>
      </div>

      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        total={total}
        onConfirmPayment={handlePayment}
      />
    </Layout>
  )
}
