import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  role: "admin" | "employee" | "customer" | "supervisor";
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