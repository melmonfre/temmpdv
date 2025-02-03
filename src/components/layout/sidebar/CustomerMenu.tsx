import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Store,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Início", path: "/cliente" },
  { icon: Store, label: "Loja Online", path: "/cliente/loja" },
  { icon: ShoppingCart, label: "Carrinho", path: "/cliente/carrinho" },
  { icon: ShoppingBag, label: "Meus Pedidos", path: "/cliente/pedidos" },
];

export function CustomerMenu() {


  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors",
              {
                "bg-primary text-white": location.pathname === item.path,
                "hover:bg-gray-100": location.pathname !== item.path,
              }
            )}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}