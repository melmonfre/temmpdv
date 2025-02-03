import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/supervisor" },
  { icon: ClipboardList, label: "Operações", path: "/supervisor/operacoes" },
  { icon: Users, label: "Funcionários", path: "/supervisor/funcionarios" },
];

export function SupervisorMenu() {
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