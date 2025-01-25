export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';
  };
  token: string;
}