export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER' | 'SUPERVISOR' | 'CASHIER';
  phone?: string;
  address?: string;
  document?: string;
  userCode?: number;
  password?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  barcode?: string;
  cost?: number;
  minStock?: number;
}

export interface Sale {
  id: number;
  items: SaleItem[];
  total: number;
  customerId?: number;
  customerName?: string;
  employeeId: number;
  employeeName: string;
  date: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  paymentMethod: 'CREDIT' | 'DEBIT' | 'CASH' | 'PIX';
}

export interface SaleItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CartItem extends SaleItem {
  product: Product;
}

export interface SupervisorOperation {
  id: number;
  type: "Sangria" | "Retirada de Troco" | "Troca" | "Cheque";
  registerId: number;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  timestamp: string;
}

export interface RegisterOperation {
  id: number;
  type: string;
  amount: number;
  supervisorId?: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  timestamp: string;
}
