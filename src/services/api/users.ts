import { User } from "@/types";
import { delay } from "./utils";

// Mock users data
const mockUsers: User[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'ADMIN',
    phone: '11999999999',
    document: '123.456.789-00'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    role: 'SUPERVISOR',
    phone: '11988888888',
    document: '987.654.321-00'
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    role: 'CASHIER',
    phone: '11977777777',
    document: '456.789.123-00'
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana@example.com',
    role: 'CASHIER',
    phone: '11966666666',
    document: '789.123.456-00'
  },
  {
    id: 5,
    name: 'Carlos Ferreira',
    email: 'carlos@example.com',
    role: 'CASHIER',
    phone: '11955555555',
    document: '321.654.987-00'
  }
];

export const userApi = {
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
};