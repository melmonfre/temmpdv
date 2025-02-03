import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/funcionario" },
  { icon: ShoppingCart, label: "PDV", path: "/funcionario/pdv" },
  { icon: DollarSign, label: "Caixa", path: "/funcionario/caixa" },
];

export function EmployeeMenu() {


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