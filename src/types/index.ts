export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';
  phone?: string;
  address?: string;
  document?: string;
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