import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEmployees from "./pages/admin/Employees";
import AdminProducts from "./pages/admin/Products";
import AdminSales from "./pages/admin/Sales";
import AdminFinance from "./pages/admin/Finance";
import AdminSettings from "./pages/admin/Settings";
import CustomerCart from "./pages/customer/Cart";
import CustomerCheckout from "./pages/customer/Checkout";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerOrders from "./pages/customer/Orders";
import CustomerStore from "./pages/customer/Store";
import CustomerProfile from "./pages/customer/Profile";
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeePOS from "./pages/employee/POS";
import EmployeeSales from "./pages/employee/Sales";
import EmployeeCashier from "./pages/employee/Cashier";
import SupervisorDashboard from "./pages/supervisor/Dashboard";
import SupervisorOperations from "./pages/supervisor/Operations";
import SupervisorEmployees from "./pages/supervisor/Employees";
import SelfServiceStore from "./pages/self-service/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/funcionarios" element={<AdminEmployees />} />
          <Route path="/admin/produtos" element={<AdminProducts />} />
          <Route path="/admin/vendas" element={<AdminSales />} />
          <Route path="/admin/financeiro" element={<AdminFinance />} />
          <Route path="/admin/configuracoes" element={<AdminSettings />} />

          {/* Supervisor routes */}
          <Route path="/supervisor" element={<SupervisorDashboard />} />
          <Route path="/supervisor/operacoes" element={<SupervisorOperations />} />
          <Route path="/supervisor/funcionarios" element={<SupervisorEmployees />} />

          {/* Employee routes */}
          <Route path="/funcionario" element={<EmployeeDashboard />} />
          <Route path="/funcionario/pdv" element={<EmployeePOS />} />
          <Route path="/funcionario/vendas" element={<EmployeeSales />} />
          <Route path="/funcionario/caixa" element={<EmployeeCashier />} />

          {/* Customer routes */}
          <Route path="/cliente" element={<CustomerDashboard />} />
          <Route path="/cliente/loja" element={<CustomerStore />} />
          <Route path="/cliente/pedidos" element={<CustomerOrders />} />
          <Route path="/cliente/carrinho" element={<CustomerCart />} />
          <Route path="/cliente/checkout" element={<CustomerCheckout />} />
          <Route path="/cliente/perfil" element={<CustomerProfile />} />

          {/* Self-service routes */}
          <Route path="/autoatendimento" element={<SelfServiceStore />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}