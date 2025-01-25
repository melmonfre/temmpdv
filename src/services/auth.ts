import { LoginCredentials, AuthResponse } from "@/types/auth";

// Simula um delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dados mockados para simular diferentes tipos de usuário
const mockUsers = [
  { id: 1, name: 'Admin', email: 'admin@example.com', role: 'ADMIN' as const },
  { id: 2, name: 'Funcionário', email: 'funcionario@example.com', role: 'EMPLOYEE' as const },
  { id: 3, name: 'Cliente', email: 'cliente@example.com', role: 'CUSTOMER' as const },
];

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(500); // Simula delay da rede
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    // Em produção, a senha seria validada pelo backend
    return {
      user,
      token: 'mock-jwt-token'
    };
  }
};