export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'CLIENT' | 'ADMIN' | 'OPERATOR';
  enabled: boolean;
  active: boolean;
  profileImage?: string;
  preferredLanguage?: string;
  createdAt?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  preferredLanguage?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
