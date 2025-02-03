import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductSearch } from "@/components/pos/ProductSearch";
import { Cart } from "@/components/pos/Cart";
import { PaymentDialog } from "@/components/pos/PaymentDialog";
import { CartItem, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/funcionario/pdv")({
  component: POS,
});

export default function POS() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const productsData = await api.getProducts();
        setProducts(productsData);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os produtos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm)
  );

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        subtotal: product.price,
      };
      setCartItems([...cartItems, newItem]);
    }

    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao carrinho`,
    });
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.price,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    toast({
      title: "Produto removido",
      description: "Item removido do carrinho",
    });
  };

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <Layout role="employee">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ProductSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filteredProducts={filteredProducts}
            onProductSelect={handleAddToCart}
            isLoading={isLoading}
          />
        </div>
        <div className="space-y-4">
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            total={total}
          />
          <Button
            className="w-full"
            size="lg"
            onClick={() => setIsPaymentOpen(true)}
            disabled={cartItems.length === 0}
          >
            Finalizar Venda
          </Button>
        </div>
      </div>

      <PaymentDialog
        open={isPaymentOpen}
        onOpenChange={setIsPaymentOpen}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        total={total}
        onConfirmPayment={() => {
          setCartItems([]);
          setIsPaymentOpen(false);
          toast({
            title: "Venda finalizada",
            description: "Venda realizada com sucesso!",
          });
        }}
      />
    </Layout>
  );
}
