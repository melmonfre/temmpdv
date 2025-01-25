import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/types";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  total: number;
  onFinishSale: () => void;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  total,
  onFinishSale
}: CartProps) {
  const { toast } = useToast();

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      toast({
        title: "Quantidade inválida",
        description: "A quantidade mínima é 1",
        variant: "destructive"
      });
      return;
    }
    onUpdateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    onRemoveItem(productId);
    toast({
      title: "Item removido",
      description: "O item foi removido do carrinho"
    });
  };

  const handleFinishSale = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho para finalizar a venda",
        variant: "destructive"
      });
      return;
    }
    onFinishSale();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Carrinho
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <CartItemCard
              key={item.product.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}

          {items.length === 0 && (
            <EmptyCart />
          )}

          <CartTotal total={total} />

          <Button
            className="w-full"
            size="lg"
            onClick={handleFinishSale}
            disabled={items.length === 0}
          >
            Finalizar Venda
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemove: (productId: number) => void;
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">
              R$ {item.product.price.toFixed(2)} cada
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemove(item.product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyCart() {
  return (
    <p className="text-center text-muted-foreground py-8">
      Nenhum produto no carrinho
    </p>
  );
}

interface CartTotalProps {
  total: number;
}

function CartTotal({ total }: CartTotalProps) {
  return (
    <div className="pt-4 border-t">
      <div className="flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}