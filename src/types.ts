export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserData {
  name?: string;
  email?: string;
  new_password?: string;
  current_password?: string;
}
