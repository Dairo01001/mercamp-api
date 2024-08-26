export interface User {
  id: string;
  username: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface CreateUserResponse {
  id: string;
  username: string;
  email: string;
}
