export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  userId: string;
  createdAt: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  storeName: string;
  businessType: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
