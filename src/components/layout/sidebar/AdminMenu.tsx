import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Package, label: "Produtos", path: "/admin/produtos" },
  { icon: Users, label: "Funcionários", path: "/admin/funcionarios" },
  { icon: DollarSign, label: "Financeiro", path: "/admin/financeiro" },
  { icon: Settings, label: "Configurações", path: "/admin/configuracoes" },
];

export function AdminMenu() {
  const location = useLocation();

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