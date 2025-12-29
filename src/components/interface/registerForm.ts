export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string; 
}

export interface AuthResponse {
  message: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
  statusMsg?: string; 
  errors?: {
    msg: string;
    param: string;
    location: string;
  };
}
