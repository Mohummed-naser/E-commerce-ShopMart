export interface SuccessLoginResponse {
  message: string;
  user: UserResponse;
  token: string;
}
export interface failedLoginResponse {
  statusMsg: string;
  message: string;
}
export interface UserResponse {
  name: string;
  email: string;
  role: string;
  token?: string;
}
