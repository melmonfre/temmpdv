import { Product } from "@/types";
import { delay } from "./utils";

// Mock products data
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
    barcode: '7894900010016',
    cost: 8.0,
    minStock: 10
  },
  {
    id: 3,
    name: 'Batata Frita',
    description: 'Porção de batata frita crocante',
    price: 12.0,
    stock: 30,
    category: 'Acompanhamentos',
    imageUrl: '/placeholder.svg',
    barcode: '7894900010017',
    cost: 5.0,
    minStock: 15
  },
  {
    id: 4,
    name: 'Água Mineral 500ml',
    description: 'Água mineral sem gás',
    price: 3.0,
    stock: 200,
    category: 'Bebidas',
    imageUrl: '/placeholder.svg',
    barcode: '7894900010018',
    cost: 1.0,
    minStock: 50
  },
  {
    id: 5,
    name: 'Sorvete',
    description: 'Sorvete de chocolate com cobertura',
    price: 8.0,
    stock: 40,
    category: 'Sobremesas',
    imageUrl: '/placeholder.svg',
    barcode: '7894900010019',
    cost: 4.0,
    minStock: 10
  }
];

export const productApi = {
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
};