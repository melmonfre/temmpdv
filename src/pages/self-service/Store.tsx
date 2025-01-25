import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { CartItem, Product } from "@/types";
import { ProductSearch } from "@/components/pos/ProductSearch";
import { Cart } from "@/components/pos/Cart";
import { PaymentDialog } from "@/components/pos/PaymentDialog";

export default function SelfServiceStore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts
  });

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.includes(searchTerm)
  );

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.productId === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
            : item
        );
      }
      const newItem: CartItem = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        subtotal: product.price,
        product: product
      };
      return [...currentCart, newItem];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.price }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.productId !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const handleFinishSale = () => {
    setShowPaymentDialog(true);
  };

  const handlePayment = () => {
    if (!paymentMethod) return;
    
    // TODO: Implement payment processing
    setCart([]);
    setShowPaymentDialog(false);
    setPaymentMethod("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Autoatendimento</h1>
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
    </div>
  );
}