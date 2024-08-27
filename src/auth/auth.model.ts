export interface IAuth {
  email: string;
  password: string;
}

export interface ISignInReponse {
  token: string;
  refreshToken: string;
}
