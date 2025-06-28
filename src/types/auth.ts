export interface User {
  id: string;
  email: string;
  role: 'admin' | 'technicien' | 'client' | 'fournisseur';
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  role: 'admin' | 'technicien' | 'client' | 'fournisseur';
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
}