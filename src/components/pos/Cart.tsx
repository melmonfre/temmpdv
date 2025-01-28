import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  total?: number;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, total }: CartProps) {
  const calculatedTotal = total ?? items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-medium">{item.productName}</h3>
              <p className="text-sm text-gray-500">
                R$ {item.price.toFixed(2)} cada
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-4 border-t">
        <span className="font-medium">Total:</span>
        <span className="text-xl font-bold">R$ {calculatedTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}