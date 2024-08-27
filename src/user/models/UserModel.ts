export interface ICreateUserRequest {
  email: string;
  username: string;
  password: string;
}

export interface INewUser {
  email: string;
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatedUserResponse {
  id: string;
  username: string;
  email: string;
}
