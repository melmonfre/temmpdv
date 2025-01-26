import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminMenu } from "./sidebar/AdminMenu";
import { EmployeeMenu } from "./sidebar/EmployeeMenu";
import { CustomerMenu } from "./sidebar/CustomerMenu";

type UserRole = "admin" | "employee" | "customer" | "supervisor";

interface SidebarProps {
  role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const MenuComponent = {
    admin: AdminMenu,
    employee: EmployeeMenu,
    customer: CustomerMenu,
    supervisor: AdminMenu, // Temporarily using AdminMenu for supervisor until a specific menu is created
  }[role];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      <div
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-40",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          },
          "lg:translate-x-0"
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-heading font-bold text-primary mb-8">
            TEMM CODE
          </h1>
          <MenuComponent />
        </div>
      </div>
    </>
  );
}