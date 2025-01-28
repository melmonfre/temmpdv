import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { LayoutRole } from "@/types";

interface LayoutProps {
  children: React.ReactNode;
  role: LayoutRole;
}

export function Layout({ children, role }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role={role} />
      <Header />
      <main className="pt-16 lg:pl-64">
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
}