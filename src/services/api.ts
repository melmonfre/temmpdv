import { User, Product, Sale } from '@/types';

// Simulando delay da rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock de produtos
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante Coca-Cola Lata 350ml',
    price: 5.0,
    stock: 100,
    category: 'Bebidas',
    imageUrl: '/placeholder.svg',
    barcode: '7894900010015',
    cost: 3.5,
    minStock: 20
  },
  {
    id: 2,
    name: 'X-Burger',
    description: 'Hambúrguer com queijo, alface e tomate',
    price: 15.0,
    stock: 50,
    category: 'Lanches',
    imageUrl: '/placeholder.svg',
    cost: 8.0,
    minStock: 10
  },
  // Adicione mais produtos mock aqui
];

// Mock de usuários
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    phone: '11999999999',
    document: '123.456.789-00'
  },
  {
    id: 2,
    name: 'Funcionário',
    email: 'funcionario@example.com',
    role: 'EMPLOYEE',
    phone: '11988888888',
    document: '987.654.321-00'
  },
  // Adicione mais usuários mock aqui
];

// Mock de vendas
const mockSales: Sale[] = [
  {
    id: 1,
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Coca-Cola 350ml',
        quantity: 2,
        price: 5.0,
        subtotal: 10.0
      }
    ],
    total: 10.0,
    employeeId: 2,
    employeeName: 'Funcionário',
    date: new Date().toISOString(),
    status: 'COMPLETED',
    paymentMethod: 'CREDIT'
  },
  // Adicione mais vendas mock aqui
];

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    await delay(500);
    return mockProducts;
  },

  async getProduct(id: number): Promise<Product> {
    await delay(500);
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Produto não encontrado');
    return product;
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    await delay(500);
    const newProduct = {
      id: mockProducts.length + 1,
      ...product
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produto não encontrado');
    mockProducts[index] = { ...mockProducts[index], ...product };
    return mockProducts[index];
  },

  async deleteProduct(id: number): Promise<void> {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produto não encontrado');
    mockProducts.splice(index, 1);
  },

  // Users/Employees
  async getUsers(): Promise<User[]> {
    await delay(500);
    return mockUsers;
  },

  async getUser(id: number): Promise<User> {
    await delay(500);
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    await delay(500);
    const newUser = {
      id: mockUsers.length + 1,
      ...user
    };
    mockUsers.push(newUser);
    return newUser;
  },

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    await delay(500);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Usuário não encontrado');
    mockUsers[index] = { ...mockUsers[index], ...user };
    return mockUsers[index];
  },

  async deleteUser(id: number): Promise<void> {
    await delay(500);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Usuário não encontrado');
    mockUsers.splice(index, 1);
  },

  // Sales
  async getSales(): Promise<Sale[]> {
    await delay(500);
    return mockSales;
  },

  async createSale(sale: Omit<Sale, 'id'>): Promise<Sale> {
    await delay(500);
    const newSale = {
      id: mockSales.length + 1,
      ...sale
    };
    mockSales.push(newSale);
    return newSale;
  }
};