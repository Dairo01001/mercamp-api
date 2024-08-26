export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
}

export interface INewUser {
  email: string;
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatedUserResponse {
  id: string;
  username: string;
  email: string;
}
