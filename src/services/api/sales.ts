import { Sale } from "@/types";
import { delay } from "./utils";

// Mock sales data
const mockSales: Sale[] = [
  { id: 1, items: [{ id: 1, productId: 1, productName: 'Coca-Cola 350ml', quantity: 5, price: 5.0, subtotal: 25.0 }], total: 25.0, employeeId: 3, employeeName: 'Pedro Oliveira', date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), status: 'COMPLETED', paymentMethod: 'CREDIT' },
  { id: 2, items: [{ id: 2, productId: 2, productName: 'Pão Francês', quantity: 10, price: 1.5, subtotal: 15.0 }], total: 15.0, employeeId: 4, employeeName: 'Ana Costa', date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), status: 'COMPLETED', paymentMethod: 'CASH' },
  { id: 3, items: [{ id: 3, productId: 3, productName: 'Arroz 5kg', quantity: 3, price: 22.9, subtotal: 68.7 }], total: 68.7, employeeId: 3, employeeName: 'Pedro Oliveira', date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'COMPLETED', paymentMethod: 'DEBIT' },
  { id: 4, items: [{ id: 4, productId: 4, productName: 'Leite Integral 1L', quantity: 6, price: 6.5, subtotal: 39.0 }], total: 39.0, employeeId: 5, employeeName: 'Carlos Ferreira', date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), status: 'COMPLETED', paymentMethod: 'PIX' },
  { id: 5, items: [{ id: 5, productId: 5, productName: 'Feijão Carioca 1kg', quantity: 4, price: 8.9, subtotal: 35.6 }], total: 35.6, employeeId: 3, employeeName: 'Pedro Oliveira', date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), status: 'COMPLETED', paymentMethod: 'CREDIT' },
  { id: 6, items: [{ id: 6, productId: 1, productName: 'Coca-Cola 350ml', quantity: 12, price: 5.0, subtotal: 60.0 }], total: 60.0, employeeId: 4, employeeName: 'Ana Costa', date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), status: 'COMPLETED', paymentMethod: 'CREDIT' },
  { id: 7, items: [{ id: 7, productId: 2, productName: 'Pão Francês', quantity: 20, price: 1.5, subtotal: 30.0 }], total: 30.0, employeeId: 5, employeeName: 'Carlos Ferreira', date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), status: 'COMPLETED', paymentMethod: 'CASH' },
  { id: 8, items: [{ id: 8, productId: 3, productName: 'Arroz 5kg', quantity: 2, price: 22.9, subtotal: 45.8 }], total: 45.8, employeeId: 3, employeeName: 'Pedro Oliveira', date: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(), status: 'COMPLETED', paymentMethod: 'DEBIT' },
  { id: 9, items: [{ id: 9, productId: 6, productName: 'Sabão em Pó 1kg', quantity: 3, price: 12.9, subtotal: 38.7 }], total: 38.7, employeeId: 4, employeeName: 'Ana Costa', date: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(), status: 'COMPLETED', paymentMethod: 'PIX' },
  { id: 10, items: [{ id: 10, productId: 7, productName: 'Açúcar 1kg', quantity: 8, price: 5.5, subtotal: 44.0 }], total: 44.0, employeeId: 3, employeeName: 'Pedro Oliveira', date: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString(), status: 'COMPLETED', paymentMethod: 'CREDIT' },
  { id: 11, items: [{ id: 11, productId: 8, productName: 'Óleo de Soja 900ml', quantity: 5, price: 7.9, subtotal: 39.5 }], total: 39.5, employeeId: 5, employeeName: 'Carlos Ferreira', date: new Date(Date.now() - 1000 * 60 * 60 * 300).toISOString(), status: 'COMPLETED', paymentMethod: 'DEBIT' },
  { id: 12, items: [{ id: 12, productId: 1, productName: 'Coca-Cola 350ml', quantity: 24, price: 5.0, subtotal: 120.0 }], total: 120.0, employeeId: 4, employeeName: 'Ana Costa', date: new Date(Date.now() - 1000 * 60 * 60 * 360).toISOString(), status: 'COMPLETED', paymentMethod: 'CREDIT' },
];

export const salesApi = {
  async getSales(): Promise<Sale[]> {
    await delay(500);
    return mockSales;
  },
};